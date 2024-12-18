import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString({ message: 'Username must be a string' })
  @MaxLength(20, { message: 'Username must be less than 20  characters' })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['ADMIN', 'MOD', 'USER'], {
    message: 'Role must be ADMIN, MOD, USER',
  })
  role: string;

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

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsDateString()
  birthdate?: Date;

  @IsOptional()
  @IsInt()
  dni?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  private?: boolean;

  @IsOptional()
  @IsString()
  instagram_link?: string;

  @IsOptional()
  @IsString()
  facebook_link?: string;

  @IsOptional()
  @IsString()
  twitter_link?: string;

  @IsOptional()
  @IsString()
  linkedin_link?: string;

  @IsOptional()
  @IsString()
  github_link?: string;
}
