import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

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
