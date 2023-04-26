import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { PersistedOrder } from './persistedorder.entity';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PersistedOrder)
    private postsRepository: Repository<PersistedOrder>,
  ) {}

  getAllPosts(): any {
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id: id },
    });
    if (post) {
      return post;
    }
    return;
  }

  async getPostByMessageIdId(id: string) {
    const post = await this.postsRepository.findOne({
      where: { messageId: id },
    });
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async createPost(post: PersistedOrder) {
    const newPost = this.postsRepository.create(post);
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async updatePost(id: number, post: PersistedOrder) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOne({
      where: { id: id },
    });
    if (updatedPost) {
      return updatedPost;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
