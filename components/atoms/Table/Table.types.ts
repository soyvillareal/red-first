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

export interface DataTablePaginationProps<TData> {
  loading: boolean;
  table: Table<TData>;
}

export interface DataTableToolbarOptions<TData> {
  searchKey: keyof TData;
  filters?: (keyof TData)[];
}

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  toolbarOptions: DataTableToolbarOptions<TData>;
  hasUserFilter?: boolean;
  hasSearchInput?: boolean;
  refetchData?: () => Promise<ApolloQueryResult<unknown>>;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
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
  toolbarOptions: DataTableToolbarOptions<TData>;
  hasUserFilter?: boolean;
  hasSearchInput?: boolean;
  footerChildren?: React.ReactNode;
  refetchData?: () => Promise<ApolloQueryResult<unknown>>;
}

export interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  i18nTitle: string;
  hasDropdown?: boolean;
}

export interface DataTableComponentType {
  className?: string;
}

export interface DataTableFacetedFilterOptions {
  label: string;
  value: string;
  icon?: ComponentType<DataTableComponentType>;
}

export interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: DataTableFacetedFilterOptions[];
}

export interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}
