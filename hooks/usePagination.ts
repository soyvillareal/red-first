import { useState } from 'react';
import { PaginationState } from '@tanstack/react-table';

export function usePagination(initialSize = 10) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: initialSize,
    pageIndex: 0,
  });
  const { pageSize, pageIndex } = pagination;

  return {
    // Table state
    onPaginationChange: setPagination,
    pagination,
    // API
    limit: pageSize,
    page: pageIndex + 1,
  };
}
