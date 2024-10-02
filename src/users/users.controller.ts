import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  private readonly userService: UserService;
  // @Get()
  // findAll() {
  //   return this.userService.findAll;
  // }

  @Post()
  public tryOut(@Body() createUserDto: CreateUserDto) {
    return createUserDto;
  }

  @Post('/:id?')
  public createUsers(@Body() createUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
