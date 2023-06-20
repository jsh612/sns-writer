import { Controller, Post } from '@nestjs/common';
import { WriteService } from './write.service';

@Controller('write')
export class WriteController {
  constructor(private writeService: WriteService) {}

  @Post()
  async writePost() {
    await this.writeService.writePost();
  }
}
