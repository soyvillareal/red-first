import { OnChangeFn, SortingState } from '@tanstack/react-table';

import { TPageOrder } from './graphql/pagination';

export interface IUseSorting<T> {
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
  order: TPageOrder;
  field: T;
}
