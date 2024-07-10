import { Field, InputType, ObjectType } from 'type-graphql';

import {
  type IPageMeta,
  type IPageOptionsMeta,
  type IPaginationArgs,
  type TPageOrder,
} from '@/types/graphql/pagination';
import { IGraphQLErrorContext } from '@/types';

@ObjectType('GraphQLErrorContext')
export class GraphQLErrorContext implements IGraphQLErrorContext {
  @Field(() => String, { nullable: true })
  errorMessage?: string | undefined;
}

@ObjectType('PageMeta')
export class PageMeta extends GraphQLErrorContext implements IPageMeta {
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

@ObjectType('PageOptionsMeta')
export class PageOptionsMeta implements IPageOptionsMeta {
  @Field(() => PageMeta)
  meta: IPageMeta;
}

@InputType('PaginationArgs')
export class PaginationArgs implements IPaginationArgs {
  @Field(() => Number)
  page: number;

  @Field(() => Number, { defaultValue: 10 })
  limit: number;

  @Field(() => String, { defaultValue: 'asc' })
  order: TPageOrder;

  @Field(() => String, { nullable: true })
  filterType: string | null;

  @Field(() => String, { nullable: true })
  queryValue?: string | undefined;

  @Field(() => String)
  fieldOrder: string;
}
