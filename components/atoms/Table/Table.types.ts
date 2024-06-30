import { Column, ColumnDef, Table } from '@tanstack/react-table';
import { ComponentType } from 'react';

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
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
