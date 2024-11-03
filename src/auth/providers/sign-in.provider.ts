import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/users/providers/user.service';
import { SignInDto } from '../dto/signIn.dto';
import { HashingProvider } from './hashing.provider/hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { ActiveUserData } from '../interfaces/active-user-data.interfaces';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,

    private readonly hashingProvider: HashingProvider,

    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private generateTokensProvider: GenerateTokensProvider,
  ) {}

  public async SignIn(signInDto: SignInDto) {
    //Find the User by email Id
    let user = undefined;
    try {
      user = await this.usersService.findUserByEmail(signInDto.email);
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not connect database',
      });
    }
    let isEqual: boolean = false;

    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not compatre pasword',
      });
    }

    if (!isEqual) {
      throw new UnauthorizedException('incorrect password');
    }

    // Send confirmation
    return await this.generateTokensProvider.generateTokens(user);
  }
}
