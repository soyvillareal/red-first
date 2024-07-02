export interface IPageMeta {
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

export interface IPaginationArgs {
  page: number;
  limit: number;
  order: 'asc' | 'desc';
}

export interface IPaginationParams {
  limit: number;
  skip: number;
  order: 'asc' | 'desc';
}
