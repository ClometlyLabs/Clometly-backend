import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ClotsService } from './clots.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('clots')
export class ClotsController {
  constructor(private readonly clotsService: ClotsService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './uploads/videos',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${path.extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadVideo(
    @UploadedFile() video: Express.Multer.File,
    // @Body() body: { thumbnail: Express.Multer.File },
  ) {
    await this.clotsService.extractVideoMetadata(video);

    // return this.clotsService.createClot({
    //   url: `/uploads/videos/${video.filename}`,
    //   thumbnail_url: body.thumbnail
    //     ? `/uploads/thumbnails/${body.thumbnail.filename}`
    //     : null,
    //   duration: videoMetadata.duration,
    //   format: videoMetadata.format,
    //   resolutions: Object.values(videoMetadata.resolutions),
    // });
  }
}
