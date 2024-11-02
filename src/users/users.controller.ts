import {
  Body,
  Controller,
  Get,
  Post,
  SetMetadata,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './providers/user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateManyUserDto } from './dto/create-many-user.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

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

  // @UseGuards(AccessTokenGuard)
  @Post()
  @Auth(AuthType.Bearer)
  public createUsers(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('create-many')
  public createManyUsers(@Body() createManyUsersDto: CreateManyUserDto) {
    return this.userService.createMany(createManyUsersDto);
  }
}
