import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { Profile } from '../profile/entities/profile.entity';
import { AttachmentService } from '../attachment/attachment.service';
import { AttachmentInterface } from './interface/media.interface';
import { Attachment } from '../attachment/entities/attachment.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(Attachment)
    private readonly attachmentRepository: Repository<Attachment>,
  ) {}

  async createPost(
    profileId: string,
    content: string,
    attachments: AttachmentInterface[],
  ) {
    const post = this.postRepository.create({
      content,
      author: { id: profileId },
      attachments: attachments?.map((file) =>
        this.attachmentRepository.create(file),
      ),
    });

    return await this.postRepository.save(post);
  }
}
