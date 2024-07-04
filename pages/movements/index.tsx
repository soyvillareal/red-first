import { useCallback, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useLazyQuery } from '@apollo/client';

import { ContextLayout } from '@/components/custom/layout';
import DashboardLayout from '@/components/atoms/DashboardLayout';
import { DataTable } from '@/components/atoms/Table/DataTable';
import { UserNav } from '@/components/atoms/UserNav';
import { routes } from '@/lib/contants';
import { loadTranslations } from '@/lib/i18n';
import { MovementsQuery } from '@/lib/apollo';

import { columnsFn } from './movements.constants';
import { Button } from '@/components/custom/Button';
import {
  IPageOptionsDataMeta,
  IPaginationArgs,
} from '@/types/graphql/pagination';
import {
  TValidsMovementTypes,
  type IGetMovementsWithTotal,
} from '@/types/graphql/resolvers';
import { usePagination } from '@/hooks/usePagination';
import { useSorting } from '@/hooks/useSorting';
import { ColumnFiltersState } from '@tanstack/react-table';
import { useDebounce } from '@/hooks/useDebounce';
import DataTableFooterSkeleton from '@/components/skeleton/DataTableFooterSkeleton';

const Movements = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { pagination, onPaginationChange, page, limit } = usePagination();
  const { sorting, onSortingChange, field, order } =
    useSorting<TValidsMovementTypes>('date');

  const { debouncedValue, debouncedLoading } =
    useDebounce<ColumnFiltersState>(columnFilters);

  const [
    getMovementsQuery,
    { data: movementQueryData, loading: movementQueryLoading },
  ] = useLazyQuery<
    {
      getMovements: IPageOptionsDataMeta<IGetMovementsWithTotal>;
    },
    IPaginationArgs<TValidsMovementTypes>
  >(MovementsQuery);

  useEffect(() => {
    const filterConcept = debouncedValue.find(
      (filter) => filter.id === 'concept'
    )?.value as string[];

    const queryValue = debouncedValue.find((filter) => filter.id === 'userName')
      ?.value as string;

    getMovementsQuery({
      variables: {
        page,
        limit,
        order,
        filterType: filterConcept ? filterConcept[0] : null,
        queryValue: queryValue || '',
        fieldOrder: field,
      },
    });
  }, [page, field, limit, order, debouncedValue]);

  const handleClick = useCallback(() => {
    router.push(routes.newMovement);
  }, [router]);

  return (
    <ContextLayout>
      <DashboardLayout>
        <ContextLayout.Header sticky>
          <div className='ml-auto flex items-center space-x-4'>
            <UserNav />
          </div>
        </ContextLayout.Header>
        <ContextLayout.Body>
          <div className='mb-4 flex items-center justify-between space-y-2'>
            <h2 className='text-2xl font-bold tracking-tight'>
              {t('movements.title')}
            </h2>
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <DataTable
              data={movementQueryData?.getMovements.data.movements || []}
              columns={columnsFn(t)}
              toolbarOptions={{
                searchKey: 'userName',
                filters: ['concept'],
              }}
              loading={movementQueryLoading || debouncedLoading}
              footerChildren={
                <div className='mt-5 border rounded-md flex justify-between items-center p-4'>
                  {movementQueryLoading || debouncedLoading ? (
                    <DataTableFooterSkeleton />
                  ) : (
                    <span>{movementQueryData?.getMovements.data.total}</span>
                  )}
                  <Button onClick={handleClick}>{t('common.new')}</Button>
                </div>
              }
              pageCount={movementQueryData?.getMovements.meta.pageCount || 0}
              values={{
                sorting,
                pagination,
                columnFilters,
              }}
              events={{
                onSortingChange,
                onPaginationChange,
                onColumnFiltersChange: setColumnFilters,
              }}
            />
          </div>
        </ContextLayout.Body>
      </DashboardLayout>
    </ContextLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return loadTranslations(context.locale);
};

export default Movements;
