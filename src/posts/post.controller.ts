import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(Number(id));
  }

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }
}
