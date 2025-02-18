import {
  Get,
  Body,
  Post,
  Param,
  Delete,
  Request,
  UseGuards,
  Controller,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from '../auth/guards/auth.guard';
import { PostService } from './post.service';
import { AttachmentInterface } from './interface/media.interface';
import { attachmentConfig } from './utils/files.config';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('files', 5, attachmentConfig))
  async addPost(
    @Request() req,
    @Body('content') content: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const mediaFiles: AttachmentInterface[] = files?.map((file) => ({
      url: file.mimetype.startsWith('image/')
        ? `/uploads/images/${file.filename}`
        : `/uploads/videos/${file.filename}`,
      type: file.mimetype.startsWith('image/') ? 'Image' : 'Video',
    }));

    if (!content && (!files || files.length === 0)) {
      throw new BadRequestException(
        'Debe proporcionar contenido de texto o al menos un archivo.',
      );
    }

    return await this.postService.createPost(
      req.user.profileId,
      content,
      mediaFiles,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async removePost(@Request() req, @Param('id') id: string) {
    return await this.postService.deletePost(id, req.user.profileId);
  }

  @Get()
  async getPosts() {
    return await this.postService.getPosts();
  }

  @Get('test')
  async test(@Request() req: any) {
    console.log(req);
  }
}
