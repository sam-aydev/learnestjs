import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePropertyMetaOptions {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  value: any;
}
