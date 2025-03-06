import {
  Get,
  Body,
  Param,
  Patch,
  Request,
  UseGuards,
  Controller,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from '../auth/guards/auth.guard';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { validateImage, imageUploadOptions } from './utils';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Patch('upload-icon')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image', imageUploadOptions))
  async changeProfilePicture(
    @Request() req,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const { user } = req;

    if (!image) throw new BadRequestException('Seleccione una imagen.');

    const imagePath = `./uploads/images/${image.filename}`;

    await validateImage(imagePath);

    const imageUrl = `/uploads/images/${image.filename}`;
    return this.profileService.uploadProfileImage(user.profileId, imageUrl);
  }

  @Get(':id')
  async getProfile(@Param('id') id: string) {
    return this.profileService.getProfile(id);
  }

  @Patch('update-profile')
  @UseGuards(AuthGuard)
  async changeProfileInfo(@Request() req, @Body() updateDto: UpdateProfileDto) {
    const { user } = req;
    return this.profileService.updateProfile(user.profileId, updateDto);
  }
}
