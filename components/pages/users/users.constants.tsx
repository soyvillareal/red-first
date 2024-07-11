import { TColumnsWithKeys } from '@/components/atoms/Table/Table.types';
import { DataTableColumnHeader } from '@/components/atoms/Table/DataTableColumnHeader';

import { UserSchema, usersSchema } from './users.schema';
import EditUserButton from './components/EditUserButton';

const columns: TColumnsWithKeys<UserSchema>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        i18nTitle="table.name"
        hasDropdown
      />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span>{row.getValue('name')}</span>
      </div>
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        i18nTitle="table.email"
        hasDropdown
      />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span>{row.getValue('email')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        i18nTitle="table.phone"
        hasDropdown
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <span>{row.getValue('phone')}</span>
      </div>
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} i18nTitle="table.action" />
    ),
    cell: ({ row }) => {
      const user = usersSchema.parse(row.original);

      return <EditUserButton userId={user.id} />;
    },
  },
];

export default columns;
