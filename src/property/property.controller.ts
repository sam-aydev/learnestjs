import {
  Body,
  Controller,
  Delete,
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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PropertyService } from './property.service';
import { PatchPropertyDto } from './dto/patchProperty.dto';

@Controller('property')
@ApiTags('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}
  @Get()
  public findAll() {
    return this.propertyService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your property is created!',
  })
  @Post()
  @HttpCode(202)
  public createProperty(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertyService.create(createPropertyDto);
  }

  @Delete(':id')
  public deleteProperty(@Param('id', ParseIntPipe) id: number) {
    return this.propertyService.delete(id);
  }

  @Patch()
  @HttpCode(202)
  public updateProperty(@Body() updatePropertyDto: PatchPropertyDto) {
    return this.propertyService.update(updatePropertyDto);
  }

  // @Get(':id')
  // findOne(
  //   @Param('id', ParseIntPipe) id: string,
  //   @Query('sort', ParseBoolPipe) sort,
  // ) {
  //   console.log(typeof sort);
  //   return `${id} - ${sort}`;
  // }
}
