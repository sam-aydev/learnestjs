import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/user.service';
import { PropertyModule } from 'src/property/property.module';

@Module({
  controllers: [UsersController],
  providers: [UserService],
  imports: [PropertyModule],
})
export class UsersModule {}
