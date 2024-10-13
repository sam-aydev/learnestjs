import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tags.entity';
import { TagsService } from './tags.service';
import { Property } from 'src/property/property.entity';

@Module({
  controllers: [TagsController],
  imports: [TypeOrmModule.forFeature([Tag, Property])],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
