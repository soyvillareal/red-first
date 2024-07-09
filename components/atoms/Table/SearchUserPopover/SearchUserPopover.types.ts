import { Column } from '@tanstack/react-table';

export interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
}

export interface IFindUserByNameOrEmailParams {
  queryValue: string;
}
