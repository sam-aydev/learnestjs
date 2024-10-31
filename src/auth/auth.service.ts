import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/user.service';
import { SignInDto } from './dto/signIn.dto';
import { SignInProvider } from './providers/sign-in.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly signInProvider: SignInProvider,
  ) {}

  public async SignIn(signInDto: SignInDto) {
    return await this.signInProvider.SignIn(signInDto);
  }
}
