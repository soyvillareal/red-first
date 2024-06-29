import { useTranslation } from 'next-i18next';
import { Row } from '@tanstack/react-table';

import { usersSchema } from '../data/schema';
import Link from 'next/link';
import EditIcon from '@/components/icons/EditIcon';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = usersSchema.parse(row.original);

  return (
    <Link href={`/users/edit/${task.id}`}>
      <EditIcon />
    </Link>
  );
}
