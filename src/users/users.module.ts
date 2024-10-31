import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/user.service';
import { PropertyModule } from 'src/property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import { AuthModule } from 'src/auth/auth.module';
import { HashingProvider } from 'src/auth/providers/hashing.provider/hashing.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';

@Module({
  controllers: [UsersController],
  providers: [UserService, UsersCreateManyProvider, CreateUserProvider, FindOneUserByEmailProvider],
  imports: [
    forwardRef(() => PropertyModule),
    forwardRef(() => AuthModule),

    TypeOrmModule.forFeature([User]),
  ],
  exports: [UserService],
})
export class UsersModule {}
