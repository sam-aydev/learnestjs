import { IntersectionType } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'common/pagination/dto/pagination-query.dto';

class GetPropertyBaseDto {
  @IsOptional()
  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate: Date;
}

export class GetPropertyDto extends IntersectionType(
  GetPropertyBaseDto,
  PaginationQueryDto,
) {}
