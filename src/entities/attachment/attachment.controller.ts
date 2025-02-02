import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('attachments')
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteAttachment(@Param('id') id: string) {
    await this.attachmentService.deleteAttachment(id);
    return { message: 'Archivo eliminado correctamente' };
  }
}
