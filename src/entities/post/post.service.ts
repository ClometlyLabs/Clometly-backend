import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
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

  async deletePost(id: string, profileId: string) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!post) throw new NotFoundException('No se encontró la publicación.');

    if (post.author.id != profileId)
      throw new ForbiddenException('No tienes permitido esta acción.');

    await this.postRepository.delete(id);
    return 'Publicación eliminada correctamente.';
  }

  async getPosts() {
    return await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('author.user', 'user')
      .leftJoinAndSelect('post.attachments', 'attachments')
      .select([
        'post',
        'author.id',
        'author.first_names',
        'author.last_names',
        'author.profilePic',
        'user.username',
        'attachments',
      ])
      .orderBy('post.created_at', 'DESC')
      .getMany();
  }
}
