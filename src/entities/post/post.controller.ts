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

import { extname } from 'path';
import { diskStorage } from 'multer';

import { AuthGuard } from '../auth/guards/auth.guard';
import { PostService } from './post.service';
import { AttachmentInterface } from './interface/media.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          if (file.mimetype.startsWith('image/')) {
            cb(null, './uploads/images');
          } else if (file.mimetype.startsWith('video/')) {
            cb(null, './uploads/videos');
          } else {
            cb(new Error('Only images and videos are allowed'), '');
          }
        },
        filename(req, file, callback) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter(req, file, callback) {
        if (
          !file.mimetype.startsWith('image/') &&
          !file.mimetype.startsWith('video/')
        ) {
          return callback(
            new Error('Solo se admiten archivos de fotos y videos.'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
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

  @Get('test')
  async test(@Request() req: any) {
    console.log(req);
  }
}
