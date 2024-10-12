import { Module } from '@nestjs/common';
import { MetaoptionsController } from './metaoptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from './meta-option.entity';
import { MetaoptionsService } from './metaoptions.service';

@Module({
  controllers: [MetaoptionsController],
  imports: [TypeOrmModule.forFeature([MetaOption])],
  providers: [MetaoptionsService],
})
export class MetaoptionsModule {}
