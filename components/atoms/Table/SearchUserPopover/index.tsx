import { useTranslation } from 'next-i18next';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';

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
import { DataTableFacetedFilterOptions } from '@/components/atoms/Table/Table.types';

import {
  DataTableFacetedFilterProps,
  IFindUserByNameOrEmailParams,
} from './SearchUserPopover.types';
import { useLazyQuery } from '@apollo/client';
import { FindUserByNameOrEmail } from '@/lib/apollo';
import { IFindUserByNameOrEmail } from '@/types/graphql/resolvers';
import { useDebounce } from '@/hooks/useDebounce';
import CommandListSkeleton from '@/components/skeleton/CommandListSkeleton';

export function SearchUserPopover<TData, TValue>({
  column,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const { t } = useTranslation();
  const [queryValue, setQueryValue] = useState<string | null>(null);
  const [users, setUsers] = useState<DataTableFacetedFilterOptions[]>([]);

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

  const { debouncedValue, debouncedLoading } = useDebounce(queryValue, 500);

  const [findUserByNameOrEmail, { loading: findUserByNameOrEmailLoading }] =
    useLazyQuery<
      {
        findUserByNameOrEmail: IFindUserByNameOrEmail[];
      },
      IFindUserByNameOrEmailParams
    >(FindUserByNameOrEmail);

  const handleSearch = async (event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setQueryValue(target.value);
  };

  useEffect(() => {
    (async () => {
      if (debouncedValue !== null) {
        const response = await findUserByNameOrEmail({
          variables: {
            queryValue: debouncedValue,
          },
        });

        if (response.data) {
          setUsers(
            response.data.findUserByNameOrEmail.map(
              (item): DataTableFacetedFilterOptions => {
                return {
                  value: item.id,
                  label: item.name,
                };
              },
            ),
          );
        }
      }
    })();
  }, [findUserByNameOrEmail, debouncedValue]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {t('table.users')}
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
                  users
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
        <Command shouldFilter={false}>
          <CommandInput
            onChangeCapture={handleSearch}
            value={queryValue || ''}
            placeholder={t('common.writeSomething')}
          />
          <CommandList>
            <CommandEmpty>{t('common.noResultsFound')}</CommandEmpty>
            {findUserByNameOrEmailLoading || debouncedLoading ? (
              <CommandListSkeleton />
            ) : (
              <CommandGroup>
                {users.map((option) => {
                  const isSelected = selectedValues.has(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      className="cursor-pointer"
                      onSelect={() => handleSelect(option.value, isSelected)}
                    >
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
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
                            'mr-2 h-4 w-4 text-muted-foreground',
                            option.value === 'expense'
                              ? 'text-red'
                              : 'text-green',
                          )}
                        />
                      )}
                      <span>{t(option.label)}</span>
                      {facets?.get(option.value) && (
                        <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                          {facets.get(option.value)}
                        </span>
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}

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
