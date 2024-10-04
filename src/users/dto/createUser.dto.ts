import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4, {
    message: 'First name should not be less than 4 characters',
  })
  @MaxLength(70, {
    message: 'First name should not be less than 10 characters',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4, {
    message: 'Last name should not be less than 4 characters',
  })
  @MaxLength(70, {
    message: 'Last name should not be less than 10 characters',
  })
  lastName?: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password should not be less than 6 characters',
  })
  @MaxLength(12, {
    message: 'Password should not be less than 12 characters',
  })
  password: string;
}
