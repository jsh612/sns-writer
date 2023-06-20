import { Controller, Get, Post } from '@nestjs/common';
import { WriteService } from './write.service';

@Controller('write')
export class WriteController {
  constructor(private writeService: WriteService) {}

  @Get()
  async createPost() {
    await this.writeService.createPost();
  }
  @Post()
  async writePost() {
    await this.writeService.writePost();
  }
}
