import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/user.service';
import { SignInDto } from './dto/signIn.dto';
import { SignInProvider } from './providers/sign-in.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly signInProvider: SignInProvider,

    private readonly refreshTokenProvider: RefreshTokensProvider,
  ) {}

  public async SignIn(signInDto: SignInDto) {
    return await this.signInProvider.SignIn(signInDto);
  }

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokenProvider.refreshTokens(refreshTokenDto);
  }
}
