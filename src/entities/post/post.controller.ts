import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { PostService } from './post.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('new-post')
  @UseGuards(AuthGuard)
  async addPost(@Body() postDto: CreatePostDto, @Req() req: any) {
    const author = req.user.profileId;
    return await this.postService.createPost(postDto, author);
  }
}
