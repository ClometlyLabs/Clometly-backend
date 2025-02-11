import {
  Body,
  Post,
  Request,
  UseGuards,
  Controller,
  UploadedFiles,
  UseInterceptors,
  Get,
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

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          if (file.mimetype.startsWith('image/')) {
            cb(null, './uploads/images');
          } else if (file.mimetype.startsWith('video/')) {
            cb(null, './upload/videos');
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

    return await this.postService.createPost(
      req.user.profileId,
      content,
      mediaFiles,
    );
  }

  @Get('test')
  async test(@Request() req: any) {
    console.log(req);
  }
}
