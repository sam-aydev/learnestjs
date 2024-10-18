import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateManyUserDto } from './dto/create-many-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll() {
    return 'users';
  }

  // @Post()
  // public tryOut(@Body() createUserDto: CreateUserDto) {
  //   return createUserDto;
  // }

  @Post()
  public createUsers(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('create-many')
  public createManyUsers(@Body() createManyUsersDto: CreateManyUserDto) {
    return this.userService.createMany(createManyUsersDto);
  }
}
