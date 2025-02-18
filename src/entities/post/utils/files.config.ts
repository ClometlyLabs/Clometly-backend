import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const attachmentConfig = {
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
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(null, uniqueSuffix + extname(file.originalname));
    },
  }),
  fileFilter(req, file, callback) {
    if (
      !file.mimetype.startsWith('image/') &&
      !file.mimetype.startsWith('video/')
    ) {
      return callback(
        new BadRequestException('Solo se admiten archivos de fotos y videos.'),
        false,
      );
    }
    callback(null, true);
  },
};
