import { useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { RefreshCcw } from 'lucide-react';
import { v4 as uuid } from 'uuid';

import { Button } from '@/components/custom/Button';
import { Input } from '@/components/ui/input';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { types } from '@/components/pages/movements/movements.constants';

import { DataTableFacetedFilter } from './DataTableFacetedFilter';
import { DataTableViewOptions } from './DataTableViewOptions';
import { DataTableToolbarProps } from './Table.types';
import { SearchUserPopover } from './SearchUserPopover';
import ExcelIcon from '@/components/icons/ExcelIcon';
import { tableToCSV } from '@/lib/utils';

export function DataTableToolbar<TData>({
  table,
  toolbarOptions,
  hasUserFilter = false,
  hasSearchInput = false,
  refetchData,
}: DataTableToolbarProps<TData>) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const isFiltered = table.getState().columnFilters.length > 0;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      table
        .getColumn(toolbarOptions.searchKey as string)
        ?.setFilterValue(event.target.value);
    },
    [table, toolbarOptions.searchKey],
  );

  const handleClickExcel = useCallback(() => {
    const columns = table.getAllColumns().map((column) => column.id);
    const rows = table.getRowModel().rows.map((row) => row.original);

    tableToCSV<TData>(columns, rows, t);
  }, [t, table]);

  const handleClickRefetch = useCallback(async () => {
    if (refetchData) {
      setIsLoading(true);
      await refetchData();
      setIsLoading(false);
    }
  }, [refetchData]);

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
      <Button
        className="w-12 px-1 mr-1"
        onClick={handleClickExcel}
        variant="outline"
        size="sm"
        disabled={table.getRowModel().rows.length === 0 && isLoading === false}
      >
        <ExcelIcon />
      </Button>
      {refetchData && (
        <Button
          className="w-12 mr-1"
          onClick={handleClickRefetch}
          loading={isLoading}
          hasMargin={false}
          variant="outline"
          size="sm"
        >
          {isLoading === false && <RefreshCcw size={16} />}
        </Button>
      )}
      <DataTableViewOptions table={table} />
    </div>
  );
}
