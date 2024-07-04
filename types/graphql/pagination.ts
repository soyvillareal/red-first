import { MovementConcept } from '@prisma/client';
import { type IGraphQLErrorContext } from '@/types';

export type TPageOrder = 'asc' | 'desc';

export interface IPageMeta extends IGraphQLErrorContext {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IPageOptionsDataMeta<T> {
  data: T;
  meta: IPageMeta;
}

export interface IPageOptionsMeta {
  meta: IPageMeta;
}

export interface IPageOptions {
  page: number;
  limit?: number;
}
export interface IPageMetaParameters {
  pageOptions: IPageOptions;
  itemCount: number;
}

export interface IPaginationArgs<T = unknown> {
  page: number;
  limit: number;
  order: TPageOrder;
  filterType: string | null;
  queryValue?: string;
  fieldOrder: T;
}

export interface IPaginationParams<T> {
  limit: number;
  skip: number;
  order: TPageOrder;
  filterType: MovementConcept | null;
  queryValue?: string;
  fieldOrder?: T;
}
