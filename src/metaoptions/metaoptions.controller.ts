import { Body, Controller, Post } from '@nestjs/common';
import { MetaOptionDto } from './dto/metaoption.dto';
import { MetaoptionsService } from './metaoptions.service';

@Controller('metaoptions')
export class MetaoptionsController {
  constructor(private readonly metaOptionService: MetaoptionsService) {}

  @Post()
  public create(@Body() createMetaOption: MetaOptionDto) {
    return this.metaOptionService.create(createMetaOption);
  }
}
