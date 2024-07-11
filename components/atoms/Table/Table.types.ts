import { ApolloQueryResult } from '@apollo/client';
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  SortingState,
  Table,
} from '@tanstack/react-table';
import { ComponentType } from 'react';

export interface IDataTableFilterUsersProps<TData> {
  table: Table<TData>;
}

export interface IDataTablePaginationProps<TData> {
  loading: boolean;
  table: Table<TData>;
}

export interface IDataTableToolbarOptions<TData> {
  searchKey: keyof TData;
  totalValues?: string;
  filters?: (keyof TData)[];
}

export interface IDataTableToolbarProps<TData> {
  table: Table<TData>;
  toolbarOptions: IDataTableToolbarOptions<TData>;
  hasUserFilter?: boolean;
  hasSearchInput?: boolean;
  refetchData?: () => Promise<ApolloQueryResult<unknown>>;
}

export type TColumnsWithKeys<TData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  accessorKey: string;
};

export interface IDataTableProps<TData, TValue> {
  columns: TColumnsWithKeys<TData, TValue>[];
  data: TData[];
  pageCount: number;
  loading?: boolean;
  values: {
    sorting: SortingState;
    pagination: PaginationState;
    columnFilters: ColumnFiltersState;
  };
  events: {
    onSortingChange: OnChangeFn<SortingState>;
    onPaginationChange: OnChangeFn<PaginationState>;
    onColumnFiltersChange: OnChangeFn<ColumnFiltersState>;
  };
  toolbarOptions: IDataTableToolbarOptions<TData>;
  hasUserFilter?: boolean;
  hasSearchInput?: boolean;
  footerChildren?: React.ReactNode;
  refetchData?: () => Promise<ApolloQueryResult<unknown>>;
}

export interface IDataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  i18nTitle: string;
  hasDropdown?: boolean;
}

export interface IDataTableComponentType {
  className?: string;
}

export interface IDataTableFacetedFilterOptions {
  label: string;
  value: string;
  icon?: ComponentType<IDataTableComponentType>;
}

export interface IDataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: IDataTableFacetedFilterOptions[];
}

export interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}
