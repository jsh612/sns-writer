import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SubjectService } from '../subject/subject.service';
import { Category } from './write.model';
import { WriteService } from './write.service';

@Resolver()
export class WriteResolver {
  constructor(
    private writeService: WriteService,
    private subjectServcie: SubjectService,
  ) {}

  @Mutation(() => String)
  async createPost(
    @Args('title', { description: '제목', type: () => String }) title: string,
    @Args('searchText', { description: 'Gpt 검색어', type: () => String })
    searchText: string,
    @Args('category', { description: '카테고리', type: () => String })
    category: string,
    @Args('tag', { description: 'tag', type: () => [String] })
    tag: string[],
  ) {
    await this.writeService.createPost({ title, searchText, category, tag });
    return '완료';
  }

  @Mutation(() => String)
  async createSubjects(
    @Args('title', { description: '제목', type: () => String }) title: string,
  ) {
    await this.subjectServcie.createSubject(title);
  }

  @Query(() => [Category], { description: '카테고리 목록 조회' })
  async getCategories() {
    const categories = await this.writeService.getCategories();
    console.log('categories', categories);
    return categories;
  }
}
