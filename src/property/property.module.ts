import { forwardRef, Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './property.entity';
import { MetaOption } from 'src/metaoptions/meta-option.entity';
import { UsersModule } from 'src/users/users.module';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreatePostProvider } from './providers/create-post.provider';

@Module({
  providers: [PropertyService, CreatePostProvider],
  controllers: [PropertyController],
  exports: [PropertyService],
  imports: [
    forwardRef(() => UsersModule),
    TagsModule,
    PaginationModule,
    TypeOrmModule.forFeature([Property, MetaOption]),
  ],
})
export class PropertyModule {}
