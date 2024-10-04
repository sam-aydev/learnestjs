import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('property')
@ApiTags('property')
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
  public createProperty(@Body() createPropertyDto: CreatePropertyDto) {
    return 'you success';
  }

  @Patch()
  @HttpCode(202)
  public patchUser(@Body() body) {
    return 'patched';
  }
}
