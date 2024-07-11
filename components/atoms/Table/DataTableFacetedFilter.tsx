import { useTranslation } from 'next-i18next';
import { useCallback, useMemo } from 'react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/custom/Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { PlusCircledIcon } from '@/components/icons/PlusCircledIcon';

import { IDataTableFacetedFilterProps } from './Table.types';

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: IDataTableFacetedFilterProps<TData, TValue>) {
  const { t } = useTranslation();
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = useMemo(
    () => new Set(column?.getFilterValue() as string[]),
    [column],
  );

  const handleSelect = useCallback(
    (value: string, selected: boolean) => {
      if (selected) {
        selectedValues.delete(value);
      } else {
        selectedValues.clear();
        selectedValues.add(value);
      }
      const filterValues = Array.from(selectedValues);
      column?.setFilterValue(filterValues.length ? filterValues : undefined);
    },
    [selectedValues, column],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {t('table.selected', {
                      replace: { size: selectedValues.size },
                    })}
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {t(option.label)}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty className="px-6 py-3 text-center">
              {t('common.noResultsFound')}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    className="cursor-pointer"
                    onSelect={() => handleSelect(option.value, isSelected)}
                  >
                    <div
                      className={cn(
                        'mt-[2px] mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-secondary text-primary-foreground'
                          : 'bg-background opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4')} />
                    </div>
                    {option.icon && (
                      <option.icon
                        className={cn(
                          'mt-[2px] mr-2 h-4 w-4 text-muted-foreground',
                          option.value === 'expense'
                            ? 'text-red'
                            : 'text-green',
                        )}
                      />
                    )}
                    <span className="text-secondary">{t(option.label)}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem className="flex flex-row justify-center items-center">
                    <Button
                      variant="ghost"
                      onClick={() => column?.setFilterValue(undefined)}
                      className="justify-center text-center"
                    >
                      {t('table.clearFilters')}
                    </Button>
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
