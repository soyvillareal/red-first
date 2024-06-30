import { useTranslation } from 'next-i18next';

import { Button } from '@/components/custom/Button';
import { Input } from '@/components/ui/input';
import CloseIcon from '@/components/icons/CloseIcon';
import { types } from '@/pages/movements/movements.constants';

import { DataTableFacetedFilter } from './DataTableFacetedFilter';
import { DataTableViewOptions } from './DataTableViewOptions';
import { DataTableToolbarProps } from './Table.types';

export function DataTableToolbar<TData>({
  table,
  toolbarOptions,
}: DataTableToolbarProps<TData>) {
  const { t } = useTranslation();

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder={t('table.search')}
          value={
            (table
              .getColumn(toolbarOptions.searchKey as string)
              ?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table
              .getColumn(toolbarOptions.searchKey as string)
              ?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {toolbarOptions.filters?.map((filter, i) => {
            if (table.getColumn(filter as string)) {
              return (
                <DataTableFacetedFilter
                  key={i}
                  column={table.getColumn(filter as string)}
                  title='Types'
                  options={types}
                />
              );
            }

            return null;
          })}
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            {t('table.reset')}
            <CloseIcon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
