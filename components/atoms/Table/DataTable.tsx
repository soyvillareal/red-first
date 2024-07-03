import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import {
  ColumnFiltersState,
  SortingState,
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

import { DataTableToolbar } from './DataTableToolbar';
import { DataTablePagination } from './DataTablePagination';
import { DataTableProps } from './Table.types';
import { Skeleton } from '@/components/ui/skeleton';
import { fillArray } from '@/lib/utils';

export function DataTable<TData, TValue>({
  columns,
  data,
  toolbarOptions,
  footerChildren,
  pageCount,
  loading = false,
  values: { sorting, pagination, columnFilters },
  events: { onSortingChange, onPaginationChange, onColumnFiltersChange },
}: DataTableProps<TData, TValue>) {
  const { t } = useTranslation();

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

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
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className='space-y-4'>
      <DataTableToolbar table={table} toolbarOptions={toolbarOptions} />
      <div className='rounded-md border bg-primary-foreground'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              fillArray(10).map((_, i) =>
                table.getHeaderGroups().map((headerGroup, i) => (
                  <TableRow key={i}>
                    {headerGroup.headers.map((_, i) => (
                      <TableCell key={i}>
                        <Skeleton className='w-[75px] h-[15px] rounded-[4px]' />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  {t('common.noResults')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {footerChildren}
      <DataTablePagination table={table} />
    </div>
  );
}
