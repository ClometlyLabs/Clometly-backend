import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsAdult } from '../validators/isAdult.validator';

export class CreateProfileDto {
  @IsNotEmpty({ message: 'Ingrese su nombre/s' })
  @IsString({ message: 'El nombre debe ser un texto' })
  first_names: string;

  @IsNotEmpty({ message: 'Ingrese su apellido/s' })
  @IsString({ message: 'El apellido debe ser un texto' })
  last_names: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsNotEmpty({ message: 'Ingrese su fecha de nacimiento' })
  @IsDateString({}, { message: 'Ingrese una fecha válida' })
  @IsAdult({ message: 'Debes tener más de 18 años' })
  birthdate?: Date;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty({ message: 'Ingrese su número de teléfono' })
  phone?: string;

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
