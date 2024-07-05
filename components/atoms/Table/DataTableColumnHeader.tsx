import { useTranslation } from 'next-i18next';

import { Button } from '@/components/custom/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import ArrowUpIcon from '@/components/icons/ArrowUpIcon';
import CaretSortIcon from '@/components/icons/CaretSortIcon';
import EyeNoneIcon from '@/components/icons/EyeNoneIcon';
import { cn } from '@/lib/utils';

import { DataTableColumnHeaderProps } from './Table.types';

export function DataTableColumnHeader<TData, TValue>({
  i18nTitle,
  className,
  column,
  hasDropdown = false,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const { t } = useTranslation();

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{t(i18nTitle)}</div>;
  }

  return hasDropdown ? (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{t(i18nTitle)}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <CaretSortIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            {t('table.asc')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            {t('table.desc')}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            {t('table.hide')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <div className="flex flex-row justify-start items-center h-8">
      <span className="font-medium text-xs">{t(i18nTitle)}</span>
    </div>
  );
}
