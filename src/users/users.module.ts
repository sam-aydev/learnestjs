import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/user.service';
import { PropertyModule } from 'src/property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';

@Module({
  controllers: [UsersController],
  providers: [UserService, UsersCreateManyProvider],
  imports: [forwardRef(() => PropertyModule), TypeOrmModule.forFeature([User])],
  exports: [UserService],
})
export class UsersModule {}
