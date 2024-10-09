import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './property.entity';

@Module({
  providers: [PropertyService],
  controllers: [PropertyController],
  exports: [PropertyService],
  imports: [TypeOrmModule.forFeature([Property])],
})
export class PropertyModule {}
