import {
  Controller,
  Post,
  UploadedFile,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('entityType') entityType: string, // Ej: 'Post', 'Message'
    @Body('entityId') entityId: string, // UUID de la entidad
  ) {
    // Guardar el archivo localmente
    const fileUrl = await this.fileService.saveFileLocally(file);

    // Registrar el archivo en la base de datos
    const attachment = await this.fileService.saveAttachment(
      fileUrl,
      file.mimetype.startsWith('image') ? 'Image' : 'Video',
      entityType,
      entityId,
    );

    return attachment;
  }
}
