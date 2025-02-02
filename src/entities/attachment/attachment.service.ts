import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from './entities/attachment.entity';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AttachmentService {
  private uploadDir = path.join(__dirname, '..', '..', '..', 'uploads'); // Carpeta de subida

  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentRepository: Repository<Attachment>,
  ) {}

  async saveAttachment(file: Express.Multer.File, postId: string) {
    const fileUrl = `/uploads/${file.filename}`;
    const fileType = file.mimetype.startsWith('image')
      ? 'Image'
      : file.mimetype.startsWith('video')
        ? 'Video'
        : 'Document';

    const attachment = this.attachmentRepository.create({
      file_url: fileUrl,
      file_type: fileType,
      post: { id: postId },
    });

    return await this.attachmentRepository.save(attachment);
  }

  async deleteAttachment(id: string) {
    const attachment = await this.attachmentRepository.findOne({
      where: { id },
    });
    if (!attachment) return;

    const filePath = path.join(
      this.uploadDir,
      attachment.file_url.split('/uploads/')[1],
    );
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Eliminar archivo físico
    }

    await this.attachmentRepository.delete(id);
  }
}
