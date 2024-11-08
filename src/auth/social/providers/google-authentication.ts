import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UserService } from 'src/users/providers/user.service';
import { User } from 'src/users/user.entity';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';

@Injectable()
export class GoogleAuthentication implements OnModuleInit {
  private oauthClient: OAuth2Client;
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly generateTokenProviders: GenerateTokensProvider,
  ) {}
  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authentication(googleTokenDto: GoogleTokenDto) {
    try {
      // Verify the Google TOken sent by the user
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });
      console.log(loginTicket);
      // Extract the payload from Google JWT
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = loginTicket.getPayload();

      // Find the user in the database using the GoogleId
      const user = await this.userService.findOneUserByGoogleId(googleId);

      // If googleId exists generate token
      if (user) {
        return this.generateTokenProviders.generateTokens(user);
      }
      // If not create a new user
      const newUser = await this.userService.createGoogleUser({
        email,
        firstName,
        googleId,
        lastName,
      });
      return this.generateTokenProviders.generateTokens(newUser);
    } catch (error) {
      // throw unauthorized exception
      throw new UnauthorizedException(error);
    }
  }
}
