import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clot } from './entities/clot.entity';

@Injectable()
export class ClotsService {
  constructor(
    @InjectRepository(Clot)
    private clotsRepository: Repository<Clot>,
  ) {}

  async extractVideoMetadata(video: Express.Multer.File): Promise<{
    duration: number;
    format: string;
    resolutions: Record<string, string>;
  }> {
    return new Promise((resolve, reject) => {
      ffmpeg(`${video.path}`).ffprobe((err, metadata) => {
        if (err) {
          return reject(err);
        }

        const duration = metadata.format.duration ?? 0;
        const format = metadata.format.format_name ?? 'unknown';

        const resolutions: Record<string, string> = {};
        metadata.streams.forEach((stream) => {
          if (stream.height && stream.width) {
            const resolution = `${stream.width}x${stream.height}`;
            resolutions[resolution] =
              `${video.path.replace('videos', 'thumbnails')}-${resolution}.jpg`;
          }
        });

        console.log({ duration, format, resolutions });
      });
    });
  }

  async createClot(data: Partial<Clot>) {
    const clot = this.clotsRepository.create(data);
    return this.clotsRepository.save(clot);
  }
}
