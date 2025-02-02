import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'Ingrese un titulo.' })
  title: string;

  @IsNotEmpty({ message: 'Escribe algo para publicar.' })
  content: string;

  @IsOptional()
  files?: Express.Multer.File[];
}
