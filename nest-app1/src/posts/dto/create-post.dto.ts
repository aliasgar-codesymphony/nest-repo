import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'title is required' })
  @IsString({ message: 'title must be a string' })
  @MinLength(3, { message: 'title must be at least 3 characters long' })
  @MaxLength(50, { message: 'title cannot be longer than 50 words' })
  title: string;

  @IsNotEmpty({ message: 'content is required' })
  @IsString({ message: 'content must be a string' })
  @MinLength(5, { message: 'content must be at least 5 characters long' })
  @MaxLength(200, { message: 'content cannot be longer than 200 words' })
  content: string;

  @IsNotEmpty({ message: 'authorName is required' })
  @IsString({ message: 'authorName must be a string' })
  @MinLength(3, { message: 'authorName must be at least 3 characters long' })
  @MaxLength(50, { message: 'authorName cannot be longer than 50 words' })
  authorName: string;
}
