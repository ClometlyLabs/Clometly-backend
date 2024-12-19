import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Ingrese un email' })
  @IsEmail({}, { message: 'Ingrese un email válido' })
  email: string;

  @IsNotEmpty({ message: 'Ingrese una contraseña' })
  password: string;
}
