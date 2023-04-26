import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Data } from './messagedata.dto';
import { PersistedOrder } from './persistedorder.entity';
import { RocketTest } from './rocket.service';
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private rocketTest: RocketTest,
  ) {}
  logger = new Logger(PostController.name);

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(Number(id));
  }

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Post('simple')
  @HttpCode(200)
  async create(
    @Body('data', new ValidationPipe())
    data: Data,
  ) {
    this.logger.log(
      `Actual Flow To Consume The Scheduled Message ${data.msgId}`,
    );
    this.logger.log(data.body.eventName);
  }

  @Post('rocket')
  @HttpCode(200)
  async postToMQ(
    @Body('data', new ValidationPipe())
    data: Data,
  ) {
    this.logger.log(`hitting the postto mq ${data.msgId}`);
    await this.rocketTest.sendToTopic(data);
    return 'posted the message to topic';
  }

  @Post('checkcancelled')
  @HttpCode(200)
  async checkCancled(
    @Body('data', new ValidationPipe())
    data: Data,
  ) {
    this.logger.log(
      `consuming the message which is of no use now ${data.msgId}`,
    );
    const canceledExists = await this.postService.getPostByMessageIdId(
      data.body.messageId,
    );
    if (canceledExists) this.logger.log(canceledExists);
    else this.logger.log('Cancelled Event for this Message Does not Exist');
    return 'checked the cancelled event';
  }

  @Post('createcanceledevent')
  @HttpCode(200)
  async createCanceledEvent(
    @Body('data', new ValidationPipe())
    data: Data,
  ) {
    const postObj = new PersistedOrder();
    postObj.eventName = data.body.eventName;
    postObj.messageId = data.body.messageId;
    const newpostObject = await this.postService.createPost(postObj);
    this.logger.log(`new canceled event id: ${newpostObject.id}`);
    return 'created cancel event';
  }
}
