import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class updateUserDto {
  @IsOptional()
  @IsNotEmpty({ message: 'fullname should not empty' })
  @IsString({ message: 'fullname must be a string' })
  @MinLength(6, { message: 'fullname must be at least 6 characters long' })
  fullname: string;

  @IsOptional()
  @IsNotEmpty({ message: 'email should not empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsOptional()
  @IsNotEmpty({ message: 'password should not empty' })
  @IsString({ message: 'password must be a string' })
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  @MaxLength(20, { message: 'password should not more than 20 characters' })
  password: string;

  //personal_details
  @IsOptional()
  @IsNotEmpty({ message: 'gender should not empty' })
  @IsString({ message: 'gender must be a string' })
  @IsIn(['male', 'female'], { message: 'gender should male or female' })
  gender: string;

  @IsOptional()
  @IsNotEmpty({ message: 'age should not empty' })
  @IsNumber({}, { message: 'age must be a number' })
  age: number;

  @IsOptional()
  @IsNotEmpty({ message: 'phone no. should not empty' })
  @IsString({ message: 'phone no. must be a string' })
  phone: string;

  @IsOptional()
  @IsNotEmpty({ message: 'address should not empty' })
  @IsString({ message: 'address must be a string' })
  address: string;

  //employment_details
  @IsOptional()
  @IsNotEmpty({ message: 'designation should not empty' })
  @IsString({ message: 'designation must be a string' })
  designation: string;

  @IsOptional()
  @IsNotEmpty({ message: 'salary should not empty' })
  @IsNumber({}, { message: 'salary must be a number' })
  salary: number;

  @IsOptional()
  @IsNotEmpty({ message: 'joindate should not empty' })
  @IsDateString({}, { message: 'joindate must be a date' })
  joindate: string;

  @IsOptional()
  @IsNotEmpty({ message: 'department should not empty' })
  @IsString({ message: 'department must be a string' })
  department: string;
}
