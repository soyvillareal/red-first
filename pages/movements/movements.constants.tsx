import { TFunction } from 'next-i18next';
import { ColumnDef } from '@tanstack/react-table';

import MoneyIcon from '@/components/icons/MoneyIcon';
import { DataTableColumnHeader } from '@/components/atoms/Table/DataTableColumnHeader';

import { MoneySchema } from './movements.schema';
import { EMovementType } from '@/lib/types';

export const types = [
  {
    value: EMovementType.INCOME,
    label: 'movements.income',
    icon: MoneyIcon,
  },
  {
    value: EMovementType.EXPENSE,
    label: 'movements.expense',
    icon: MoneyIcon,
  },
];

export const columnsFn = (t: TFunction): ColumnDef<MoneySchema>[] => {
  return [
    {
      accessorKey: 'amount',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          i18nTitle='movements.amount'
          hasDropdown
        />
      ),
      cell: ({ row }) => {
        return (
          <div className='flex w-[100px] items-center'>
            <span>{row.getValue('amount')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'userName',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          i18nTitle='movements.userName'
          hasDropdown
        />
      ),
      cell: ({ row }) => {
        return (
          <div className='flex items-center'>
            <span>{row.getValue('userName')}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'concept',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          i18nTitle='movements.concept'
          hasDropdown
        />
      ),
      cell: ({ row }) => {
        const type = types.find(
          (type) => type.value === row.getValue('concept')
        );

        if (type === undefined) {
          return null;
        }

        return (
          <div className='flex w-[100px] items-center'>
            {type.icon && (
              <type.icon
                className={`mr-2 h-4 w-4 ${
                  type.value === 'expense' ? 'text-primary' : 'text-green'
                }`}
              />
            )}
            <span>{t(type.label)}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'date',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          i18nTitle='movements.date'
          hasDropdown
        />
      ),
      cell: ({ row }) => {
        return (
          <div className='flex items-center'>
            <span>{row.getValue('date')}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
  ];
};
