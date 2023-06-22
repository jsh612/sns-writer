import { Controller, Get, Query } from '@nestjs/common';
import { WriteService } from './write.service';
import { SubjectService } from '../subject/subject.service';
import { CategoryTypeEnum } from './write.model';

@Controller('write')
export class WriteController {
  constructor(
    private writeService: WriteService,
    private subjectService: SubjectService,
  ) {}

  @Get()
  async createPost(
    @Query('title') title: string,
    @Query('title') searchText: string,
    @Query('category') category: CategoryTypeEnum,
    @Query('tag') tag: string[],
  ) {
    await this.writeService.createPost({ title, searchText, category, tag });
  }

  @Get('/subject')
  async createSubjects(@Query('title') title: string) {
    await this.subjectService.createSubject(title);
  }
}
