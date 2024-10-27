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
import { GetPropertyDto } from './dto/get-property.dto';

@Controller('property')
@ApiTags('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}
  @Get()
  public findAll(getPropertyDto: GetPropertyDto) {
    return this.propertyService.findAll(getPropertyDto);
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

  @Get('/:id')
  findOne(
    @Param('id', ParseIntPipe) id: string,
    @Query() getPropertyDto: GetPropertyDto,
  ) {
    console.log(getPropertyDto);
    return getPropertyDto;
  }
}
