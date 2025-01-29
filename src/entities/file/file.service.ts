import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from './entities/attachment.entity';
import { join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

@Injectable()
export class FileService {
  private readonly uploadPath = join(__dirname, '..', '..', 'uploads'); // Carpeta de almacenamiento

  constructor(
    @InjectRepository(Attachment)
    private attachmentRepository: Repository<Attachment>,
  ) {
    // Crear la carpeta de uploads si no existe
    if (!existsSync(this.uploadPath)) {
      mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async saveFileLocally(file: Express.Multer.File): Promise<string> {
    const filePath = join(this.uploadPath, file.originalname); // Ruta completa del archivo
    writeFileSync(filePath, file.buffer); // Guardar el archivo en el servidor
    return `/uploads/${file.originalname}`; // Ruta accesible al cliente
  }

  async saveAttachment(
    fileUrl: string,
    fileType: 'Image' | 'Video' | 'Document',
    entityType: string,
    entityId: string,
  ): Promise<Attachment> {
    const attachment = this.attachmentRepository.create({
      file_url: fileUrl,
      file_type: fileType,
      entity_type: entityType,
      entity_id: entityId,
    });

    return this.attachmentRepository.save(attachment);
  }
}
