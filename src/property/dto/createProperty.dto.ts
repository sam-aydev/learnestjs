import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { propertyType } from '../enums/propertyType.enum';
import { propertyStatus } from '../enums/propertyStatus.enum';
import { CreatePropertyMetaOptions } from './createproperty-metaoptions.dto';
import { Type } from 'class-transformer';

export class CreatePropertyDto {
  @ApiProperty({
    description: 'This is the name for the property',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @IsInt()
  @ApiProperty()
  @IsOptional()
  area: number;

  @IsEnum(propertyType)
  @ApiProperty({
    description: 'This is the type for the property',
    enum: propertyType,
  })
  propertyType: propertyType;

  propertyStatus: propertyStatus;

  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({
    description: 'other tags of the property',
  })
  propertyTags?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePropertyMetaOptions)
  metaOptions: CreatePropertyMetaOptions[];
}
