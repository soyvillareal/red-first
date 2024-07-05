import { useState } from 'react';
import { SortingState } from '@tanstack/react-table';

import { IUseSorting } from '@/types/hooks';
import { TPageOrder } from '@/types/graphql/pagination';

export function useSorting<T extends string>(
  initialField: T,
  initialOrder: TPageOrder = 'asc',
): IUseSorting<T> {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: initialField,
      desc: initialOrder === 'desc',
    },
  ]);

  return {
    sorting,
    onSortingChange: setSorting,
    order: !sorting.length ? initialOrder : sorting[0].desc ? 'desc' : 'asc',
    field: (sorting.length ? sorting[0].id : initialField) as T,
  };
}
