import { forwardRef, Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './property.entity';
import { MetaOption } from 'src/metaoptions/meta-option.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [PropertyService],
  controllers: [PropertyController],
  exports: [PropertyService],
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Property, MetaOption]),
  ],
})
export class PropertyModule {}
