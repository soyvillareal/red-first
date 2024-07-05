import { v4 as uuidv4 } from 'uuid';

import { fillArray } from '@/lib/utils';
import { TableCell, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

import { IDataTableItemSkeletonProps } from './skeleton.types';

export function DataTableItemSkeleton<TData>({
  table,
}: IDataTableItemSkeletonProps<TData>) {
  return fillArray(10).map(() =>
    table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={uuidv4()}>
        {headerGroup.headers.map(() => (
          <TableCell key={uuidv4()}>
            <Skeleton className="w-[75px] h-[15px] rounded-[4px]" />
          </TableCell>
        ))}
      </TableRow>
    )),
  );
}
