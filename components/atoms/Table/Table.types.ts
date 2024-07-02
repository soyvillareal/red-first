import { Column, ColumnDef, Table } from '@tanstack/react-table';
import { ComponentType } from 'react';

export interface IAsyncPagination {
  page: number;
  limit: number;
  order: 'asc' | 'desc';
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  events: {
    nextPage: () => void;
    previousPage: () => void;
    lastPage: () => void;
    firstPage: () => void;
  };
}

export interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  asyncPagination: IAsyncPagination | null;
}

export interface DataTableToolbarOptions<TData> {
  searchKey: keyof TData;
  filters?: (keyof TData)[];
}

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  toolbarOptions: DataTableToolbarOptions<TData>;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  asyncPagination: IAsyncPagination | null;
  toolbarOptions: DataTableToolbarOptions<TData>;
  footerChildren?: React.ReactNode;
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
