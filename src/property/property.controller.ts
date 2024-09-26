import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';

@Controller('property')
export class PropertyController {
  @Get()
  findAll() {
    return 'All properties';
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: string,
    @Query('sort', ParseBoolPipe) sort,
  ) {
    console.log(typeof sort);
    return `${id} - ${sort}`;
  }

  @Post()
  @HttpCode(202)
  create(@Body() name: CreatePropertyDto) {
    return name;
  }
}
