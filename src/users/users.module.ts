import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/user.service';
import { PropertyModule } from 'src/property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  controllers: [UsersController],
  providers: [UserService],
  imports: [forwardRef(() => PropertyModule), TypeOrmModule.forFeature([User])],
  exports: [UserService],
})
export class UsersModule {}
