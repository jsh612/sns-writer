import { Controller, Get, Query } from '@nestjs/common';
import { WriteService } from './write.service';
import { SubjectService } from '../subject/subject.service';

@Controller('write')
export class WriteController {
  constructor(
    private writeService: WriteService,
    private subjectService: SubjectService,
  ) {}

  @Get()
  async createPost(@Query('title') title: string) {
    await this.writeService.createPost(title);
  }

  @Get('/subject')
  async createSubjects(@Query('title') title: string) {
    await this.subjectService.createSubject(title);
  }
}
