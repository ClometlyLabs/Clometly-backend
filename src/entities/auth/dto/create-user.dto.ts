import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  @IsString({ message: 'El nombre de usuario debe ser un texto' })
  @MaxLength(20, {
    message: 'El nombre de usuario debe ser menor de 20 digitos',
  })
  username: string;

  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'Ingrese un email válido' })
  email: string;

  @IsOptional()
  @IsIn(['ADMIN', 'MOD', 'USER'], {
    message: 'Seleccione un rol válido',
  })
  role: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe ser de minimo 6 digitos' })
  @MaxLength(20, { message: 'La contraseña es de maximo de 20 digitos' })
  password: string;
}
