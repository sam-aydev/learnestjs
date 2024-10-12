import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty } from 'class-validator';

export class MetaOptionDto {
  @ApiProperty()
  @IsJSON()
  @IsNotEmpty()
  metaValue: string;
}
