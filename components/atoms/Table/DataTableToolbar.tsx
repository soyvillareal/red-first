import { useTranslation } from 'next-i18next';
import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import { Button } from '@/components/custom/Button';
import { Input } from '@/components/ui/input';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { types } from '@/components/pages/movements/movements.constants';

import { DataTableFacetedFilter } from './DataTableFacetedFilter';
import { DataTableViewOptions } from './DataTableViewOptions';
import { DataTableToolbarProps } from './Table.types';
import { SearchUserPopover } from './SearchUserPopover';

export function DataTableToolbar<TData>({
  table,
  toolbarOptions,
  hasUserFilter = false,
  hasSearchInput = false,
}: DataTableToolbarProps<TData>) {
  const { t } = useTranslation();

  const isFiltered = table.getState().columnFilters.length > 0;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      table
        .getColumn(toolbarOptions.searchKey as string)
        ?.setFilterValue(event.target.value);
    },
    [table, toolbarOptions.searchKey],
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        {hasSearchInput && (
          <Input
            placeholder={t('table.search')}
            value={
              (table
                .getColumn(toolbarOptions.searchKey as string)
                ?.getFilterValue() as string) ?? ''
            }
            onChange={handleChange}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        <div className="flex gap-x-2">
          {toolbarOptions.filters?.map((filter) => {
            if (table.getColumn(filter as string)) {
              return (
                <DataTableFacetedFilter
                  key={uuid()}
                  column={table.getColumn(filter as string)}
                  title={t('table.types')}
                  options={types}
                />
              );
            }
            return null;
          })}
          {hasUserFilter && (
            <SearchUserPopover column={table.getColumn('userName')} />
          )}
        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            {t('table.reset')}
            <CloseIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
