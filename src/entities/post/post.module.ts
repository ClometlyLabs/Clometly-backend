import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';

import { Post } from './entities/post.entity';
import { Profile } from '../profile/entities/profile.entity';
import { Attachment } from '../attachment/entities/attachment.entity';
import { AttachmentModule } from '../attachment/attachment.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    TypeOrmModule.forFeature([Post, Profile, Attachment]),
    AuthModule,
    AttachmentModule,
  ],
})
export class PostModule {}
