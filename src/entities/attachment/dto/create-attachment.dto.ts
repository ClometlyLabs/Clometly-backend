import { IsNotEmpty } from 'class-validator';

export class CreateAttachmentDto {
  @IsNotEmpty()
  file_url: string;

  @IsNotEmpty()
  file_type: 'Image' | 'Video' | 'Document';
}
