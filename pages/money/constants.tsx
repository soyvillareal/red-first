import { TFunction } from 'next-i18next';
import { ColumnDef } from '@tanstack/react-table';

import MoneyIcon from '@/components/icons/MoneyIcon';

import { Task } from './data/schema';
import { DataTableColumnHeader } from './components/DataTableColumnHeader';

export const types = [
  {
    value: 'income',
    label: 'money.income',
    icon: MoneyIcon,
  },
  {
    value: 'expense',
    label: 'money.expense',
    icon: MoneyIcon,
  },
];

export const columnsFn = (t: TFunction): ColumnDef<Task>[] => {
  return [
    {
      accessorKey: 'concept',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} i18nTitle='table.concept' />
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
      accessorKey: 'amount',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} i18nTitle='table.amount' />
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
      accessorKey: 'date',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} i18nTitle='table.date' />
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
    {
      accessorKey: 'userName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} i18nTitle='table.userName' />
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
  ];
};
