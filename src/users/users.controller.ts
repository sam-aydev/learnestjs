import { Controller, Get } from '@nestjs/common';
import { UserService } from './providers/user.service';

@Controller('users')
export class UsersController {
  private readonly userService: UserService;
  @Get()
  findAll() {
    return this.userService.findAll;
  }
}
