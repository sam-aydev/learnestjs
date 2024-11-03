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
import { Type } from 'class-transformer';
import { MetaOptionDto } from 'src/metaoptions/dto/metaoption.dto';

export class CreatePropertyDto {
  @ApiProperty({
    description: 'This is the name for the property',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @IsInt()
  @ApiProperty()
  @IsOptional()
  area?: number;

  @IsEnum(propertyType)
  @ApiProperty({
    description: 'This is the type for the property',
    enum: propertyType,
  })
  propertyType: propertyType;

  @IsEnum(propertyStatus)
  propertyStatus: propertyStatus;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'array of id of tags',
  })
  tags?: number[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MetaOptionDto)
  metaOptions: MetaOptionDto | null;

  // @ApiProperty({
  //   type: 'integer',
  //   required: true,
  // })
  // @IsInt()
  // @IsNotEmpty()
  // authorId: number;
}
