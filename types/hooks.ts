import { OnChangeFn, SortingState } from '@tanstack/react-table';

import { TPageOrder } from './graphql/pagination';

export interface IUseSorting {
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
  order: TPageOrder;
  field: string;
}
