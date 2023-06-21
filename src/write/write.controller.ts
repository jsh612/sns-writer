import { Controller, Get, Query } from '@nestjs/common';
import { WriteService } from './write.service';

@Controller('write')
export class WriteController {
  constructor(private writeService: WriteService) {}

  @Get()
  async createPost(@Query('title') title: string) {
    await this.writeService.createPost(title);
  }
}
