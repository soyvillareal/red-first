import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import {
  OnChangeFn,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTableItemSkeleton } from '@/components/skeleton/DataTableItemSkeleton';

import { DataTableToolbar } from './DataTableToolbar';
import { DataTablePagination } from './DataTablePagination';
import { IDataTableProps } from './Table.types';

export function DataTable<TData, TValue>({
  columns,
  data,
  toolbarOptions,
  hasUserFilter,
  hasSearchInput,
  footerChildren,
  pageCount,
  loading = false,
  refetchData,
  values: { sorting, pagination, columnFilters },
  events: { onSortingChange, onPaginationChange, onColumnFiltersChange },
}: IDataTableProps<TData, TValue>) {
  const { t } = useTranslation();

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const handleColumnVisibilityChange: OnChangeFn<VisibilityState> = (
    updaterOrValue,
  ) => {
    const columnKeys = columns.map((column) => column.accessorKey);
    const newVisibility =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(columnVisibility)
        : updaterOrValue;

    const visibleColumnsCount = Object.keys(newVisibility).filter(
      (column) =>
        columnKeys.includes(column) === true && newVisibility[column] === false,
    ).length;

    if (visibleColumnsCount < columnKeys.length) {
      setColumnVisibility(newVisibility);
    }
  };

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      sorting,
      pagination,
      columnVisibility,
      columnFilters,
    },
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    onSortingChange: onSortingChange,
    onPaginationChange: onPaginationChange,
    onColumnFiltersChange: onColumnFiltersChange,
    onColumnVisibilityChange: handleColumnVisibilityChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        toolbarOptions={toolbarOptions}
        hasUserFilter={hasUserFilter}
        hasSearchInput={hasSearchInput}
        refetchData={refetchData}
      />
      <div className="rounded-md border bg-primary-foreground">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="min-w-[120px]"
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <DataTableItemSkeleton table={table} />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="min-w-[120px]" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {t('common.noResults')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {footerChildren}
      <DataTablePagination loading={loading} table={table} />
    </div>
  );
}
