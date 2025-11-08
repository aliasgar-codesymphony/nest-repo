import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'fullname should not empty' })
  @IsString({ message: 'fullname must be a string' })
  @MinLength(6, { message: 'fullname must be at least 6 characters long' })
  fullname: string;

  @IsNotEmpty({ message: 'email should not empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'password should not empty' })
  @IsString({ message: 'password must be a string' })
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  @MaxLength(20, { message: 'password should not more than 20 characters' })
  password: string;
}
