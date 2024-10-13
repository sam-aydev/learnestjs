import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './createProperty.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class PatchPropertyDto extends PartialType(CreatePropertyDto) {
  @ApiProperty({
    description: 'The id of the property that needs to be updated',
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
