import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthentication } from './providers/google-authentication';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { Auth } from '../decorator/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';

@Auth(AuthType.None)
@Controller('auth/google-authentication')
export class GoogleAuthenticationController {
  constructor(
    private readonly googleAuthenticationService: GoogleAuthentication,
  ) {}

  @Post()
  public authenticate(@Body() googleTokeDto: GoogleTokenDto) {
    return this.googleAuthenticationService.authentication(googleTokeDto);
  }
}
