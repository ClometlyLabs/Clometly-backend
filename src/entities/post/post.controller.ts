import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Body,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('new-post')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname +
              '-' +
              uniqueSuffix +
              path.extname(file.originalname),
          );
        },
      }),
    }),
  )
  async addPost(
    @Body() postDto: CreatePostDto,
    @Req() req: any,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const author = req.user.profileId;
    return await this.postService.createPost(postDto, author, files);
  }
}
