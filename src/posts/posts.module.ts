import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PersistedOrder as Post } from './persistedorder.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RocketTest } from './rocket.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService, RocketTest],
})
export class PostModule {}
