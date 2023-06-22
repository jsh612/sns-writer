import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum CategoryTypeEnum {
  //개발-기초
  'basic' = 1139820,
}

registerEnumType(CategoryTypeEnum, {
  name: 'CategoryTypeEnum',
});

@ObjectType()
export class CategoryTypeModel {
  @Field(() => CategoryTypeEnum, { description: '카테고리 타입' })
  categoryType: CategoryTypeEnum;
}

@ObjectType()
export class CreatePostInput {
  @Field(() => String, { description: 'title' })
  title: string;

  @Field(() => String, { description: 'searchText' })
  searchText: string;

  @Field(() => CategoryTypeEnum, { description: 'category' })
  category: CategoryTypeEnum;

  @Field(() => [String], { description: 'tag', nullable: true })
  tag?: string[];
}

@ObjectType()
export class Category {
  @Field(() => String, { description: 'id' })
  'id': string;
  @Field(() => String, { description: 'name' })
  'name': string;
  @Field(() => String, { description: 'parent' })
  'parent': string;
  @Field(() => String, { description: 'label' })
  'label': string;
  @Field(() => String, { description: 'entries' })
  'entries': string;
}
