import { useTranslation } from 'next-i18next';

import { Button } from '@/components/custom/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import ChevronsLeftIcon from '@/components/icons/ChevronsLeftIcon';
import ChevronsRightIcon from '@/components/icons/ChevronsRightIcon';
import { pageSizes } from '@/lib/contants';

import { DataTablePaginationProps } from './Table.types';
import { useCallback } from 'react';

export function DataTablePagination<TData>({
  table,
  asyncPagination,
}: DataTablePaginationProps<TData>) {
  const { t } = useTranslation();

  const handleNextPage = useCallback(() => {
    if (asyncPagination) {
      asyncPagination.events.nextPage();
    } else {
      table.nextPage();
    }
  }, []);

  const handlePreviusPage = useCallback(() => {
    if (asyncPagination) {
      asyncPagination.events.previousPage();
    } else {
      table.setPageIndex(table.getPageCount() - 1);
    }
  }, []);

  const handleFirstPage = useCallback(() => {
    if (asyncPagination) {
      asyncPagination.events.firstPage();
    } else {
      table.setPageIndex(0);
    }
  }, []);

  const handleLastPage = useCallback(() => {
    if (asyncPagination) {
      asyncPagination.events.lastPage();
    } else {
      table.setPageIndex(table.getPageCount() - 1);
    }
  }, []);

  return (
    <div className='flex items-center justify-between overflow-auto px-2'>
      <div className='hidden flex-1 text-sm text-foreground sm:block'>
        {t('table.rowSelected', {
          replace: {
            selected: table.getFilteredSelectedRowModel().rows.length,
            total: table.getFilteredRowModel().rows.length,
          },
        })}
      </div>
      <div className='flex items-center sm:space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='hidden text-sm font-medium sm:block'>
            {t('table.rowsPerPage')}
          </p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {pageSizes.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
          {t('table.pageOf', {
            replace: {
              page: table.getState().pagination.pageIndex + 1,
              pages: table.getPageCount(),
            },
          })}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={handleFirstPage}
            disabled={asyncPagination?.hasPreviousPage === false} // !table.getCanPreviousPage() ||
          >
            <span className='sr-only'>{t('table.goToFirstPage')}</span>
            <ChevronsLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={handlePreviusPage}
            disabled={asyncPagination?.hasPreviousPage === false} // !table.getCanPreviousPage() ||
          >
            <span className='sr-only'>{t('table.goToPreviusPage')}</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={handleNextPage}
            disabled={asyncPagination?.hasNextPage === false} // !table.getCanNextPage() ||
          >
            <span className='sr-only'>{t('table.goToNextPage')}</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={handleLastPage}
            disabled={asyncPagination?.hasNextPage === false} // !table.getCanNextPage() ||
          >
            <span className='sr-only'>{t('table.goToLastPage')}</span>
            <ChevronsRightIcon className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
