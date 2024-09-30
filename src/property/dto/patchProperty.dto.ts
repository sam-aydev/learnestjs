import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './createProperty.dto';

export class PatchPropertyDto extends PartialType(CreatePropertyDto) {}
