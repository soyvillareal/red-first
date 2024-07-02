import { Field, InputType, ObjectType } from 'type-graphql';
import {
  type IPaginationArgs,
  type IPageMeta,
  type IPageOptionsMeta,
} from '@/types/graphql/pagination';

@ObjectType()
export class PageMeta implements IPageMeta {
  @Field(() => Number)
  page: number;

  @Field(() => Number)
  limit: number;

  @Field(() => Number)
  itemCount: number;

  @Field(() => Number)
  pageCount: number;

  @Field(() => Boolean)
  hasPreviousPage: boolean;

  @Field(() => Boolean)
  hasNextPage: boolean;
}

@ObjectType()
export class PageOptionsMeta implements IPageOptionsMeta {
  @Field(() => PageMeta)
  meta: IPageMeta;
}

@InputType()
export class PaginationArgs implements IPaginationArgs {
  @Field(() => Number)
  page: number;

  @Field(() => Number, { defaultValue: 10 })
  limit: number;

  @Field(() => String, { defaultValue: 'asc' })
  order: 'asc' | 'desc';
}
