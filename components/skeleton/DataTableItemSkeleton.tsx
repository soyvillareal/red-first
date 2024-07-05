import { fillArray } from '@/lib/utils';

import { TableCell, TableRow } from '../ui/table';
import { Skeleton } from '../ui/skeleton';
import { IDataTableItemSkeletonProps } from './skeleton.types';

function DataTableItemSkeleton<TData>({
  table,
}: IDataTableItemSkeletonProps<TData>) {
  return fillArray(10).map(() =>
    table.getHeaderGroups().map((headerGroup, i) => (
      <TableRow key={i}>
        {headerGroup.headers.map((_, i) => (
          <TableCell key={i}>
            <Skeleton className="w-[75px] h-[15px] rounded-[4px]" />
          </TableCell>
        ))}
      </TableRow>
    )),
  );
}

export default DataTableItemSkeleton;
