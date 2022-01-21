import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateCommentModel } from 'src/contracts/proxy-sa';

export class CreateCommentDTO implements CreateCommentModel {
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  lastName?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  firstName?: string;

  @IsString()
  @MinLength(4)
  @MaxLength(1000)
  message: string;
}
