import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { Profile } from '../profile/entities/profile.entity';
import { AttachmentService } from '../attachment/attachment.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,

    private readonly attachmentService: AttachmentService,
  ) {}

  async createPost(
    postDto: CreatePostDto,
    id: string,
    files: Express.Multer.File[],
  ) {
    const author = await this.profileRepository.findOne({ where: { id } });
    if (!author) throw new NotFoundException('No se encontró autor aparente.');

    const post = this.postRepository.create({
      ...postDto,
      author: { id: author.id },
    });

    if (files && files.length > 0) {
      for (const file of files) {
        await this.attachmentService.saveAttachment(file, post.id);
      }
    }

    await this.postRepository.save(post);
    return post;
  }
}
