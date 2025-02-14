import {
  IsString,
  IsArray,
  IsOptional,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';
import { AttachmentInterface } from '../interface/media.interface';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty({ message: 'Escribe algo para hacer una publicación' })
  content: string;

  @IsArray()
  @IsOptional()
  @MaxLength(5, {
    message: 'Solo puedes subir hasta 5 archivos por publicación',
  })
  attachments?: AttachmentInterface[];
}
