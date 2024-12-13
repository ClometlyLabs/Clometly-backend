import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ValidRoles } from '../interface/ValidRoles';

export class CreateUserDto {
  // @IsString()
  // first_names: string;

  // @IsString()
  // last_names: string;

  @IsNotEmpty()
  @IsString({ message: 'Username must be a string' })
  @MaxLength(20, { message: 'Username must be less than 20  characters' })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  role: ValidRoles;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20, { message: 'Password must be less than 20 characters' })
  password: string;
}

export class CreateProfileDto {
  @IsString()
  first_names: string;

  @IsString()
  last_names: string;
}
