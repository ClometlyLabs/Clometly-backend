import {
  Get,
  Param,
  Patch,
  UseGuards,
  Controller,
  UseInterceptors,
  BadRequestException,
  Request,
  Body,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { extname } from 'path';
import { diskStorage } from 'multer';

import { AuthGuard } from '../auth/guards/auth.guard';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Patch('upload-profile')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FilesInterceptor('image', 1, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          if (!file.mimetype.startsWith('image/')) {
            cb(new BadRequestException('Only images are allowed'), '');
          }
          cb(null, './uploads/images');
        },
        filename(req, file, callback) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter(req, file, callback) {
        if (!file.mimetype.startsWith('image/')) {
          return callback(
            new BadRequestException('Only images are allowed'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadProfileImage(
    @Request() req,
    @UploadedFiles() image: Express.Multer.File,
  ) {
    const { user } = req;
    if (!image) throw new BadRequestException('Seleccione una imagen.');
    const imageUrl = `/uploads/images/${image[0].filename}`;
    return this.profileService.uploadProfileImage(user.profileId, imageUrl);
  }
  @Get(':username')
  async getProfile(@Param('username') username: string) {
    return this.profileService.getProfile(username);
  }
}
