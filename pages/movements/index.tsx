import { useCallback, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useLazyQuery } from '@apollo/client';
import { ColumnFiltersState } from '@tanstack/react-table';
import { getSession, useSession } from 'next-auth/react';

import { DashboardLayout } from '@/components/atoms/DashboardLayout';
import { DataTable } from '@/components/atoms/Table/DataTable';
import { routes } from '@/lib/contants';
import { loadTranslations } from '@/lib/i18n';
import { MovementsQuery } from '@/lib/apollo';
import { Button } from '@/components/custom/Button';
import { type IPageOptionsDataMeta } from '@/types/graphql/pagination';
import {
  type IGetMovementsWithTotal,
  IPaginationMovementsArgs,
  TValidsMovementTypes,
} from '@/types/graphql/resolvers';
import { usePagination } from '@/hooks/usePagination';
import { useSorting } from '@/hooks/useSorting';
import { useDebounce } from '@/hooks/useDebounce';
import { DataTableFooterSkeleton } from '@/components/skeleton/DataTableFooterSkeleton';

import { columnsFn } from '@/components/pages/movements/movements.constants';
import { ShowErrors } from '@/components/custom/ShowErrors';
import { EUserRole } from '@/types';

const Movements = () => {
  const { t } = useTranslation();
  const { data: sessionData } = useSession();
  const router = useRouter();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { pagination, onPaginationChange, page, limit } = usePagination();
  const { sorting, onSortingChange, field, order } =
    useSorting<TValidsMovementTypes>('date');

  const { debouncedValue, debouncedLoading } =
    useDebounce<ColumnFiltersState>(columnFilters);

  const [
    getMovementsQuery,
    {
      data: movementQueryData,
      loading: movementQueryLoading,
      error: movementQueryError,
      refetch: refetchMovements,
    },
  ] = useLazyQuery<
    {
      getMovements: IPageOptionsDataMeta<IGetMovementsWithTotal>;
    },
    IPaginationMovementsArgs<TValidsMovementTypes>
  >(MovementsQuery);

  useEffect(() => {
    const filterConcept = debouncedValue.find(
      (filter) => filter.id === 'concept',
    )?.value as string[];

    const filterUsername = debouncedValue.find(
      (filter) => filter.id === 'userName',
    )?.value as string[];

    getMovementsQuery({
      variables: {
        page,
        limit,
        order,
        filterType: filterConcept ? filterConcept[0] : null,
        userId: filterUsername ? filterUsername[0] : null,
        fieldOrder: field,
      },
    });
  }, [getMovementsQuery, page, field, limit, order, debouncedValue]);

  const handleClick = useCallback(() => {
    router.push(routes.newMovement);
  }, [router]);

  return (
    <DashboardLayout
      seo={{
        title: t('SEO.MOVEMENTS.title'),
        description: t('SEO.MOVEMENTS.description'),
        keywords: t('SEO.MOVEMENTS.keywords'),
      }}
    >
      <div className="mb-4 flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          {t('movements.title')}
        </h2>
      </div>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          data={movementQueryData?.getMovements.data.movements || []}
          columns={columnsFn(t)}
          toolbarOptions={{
            searchKey: 'userName',
            filters: ['concept'],
            totalValues: movementQueryData?.getMovements.data.total,
          }}
          loading={movementQueryLoading || debouncedLoading}
          footerChildren={
            <div className="mt-5 border rounded-md flex justify-between items-center p-4">
              {movementQueryLoading || debouncedLoading ? (
                <DataTableFooterSkeleton />
              ) : (
                <span>{movementQueryData?.getMovements.data.total}</span>
              )}
              {sessionData?.user.roles.includes(EUserRole.ADMIN) === true && (
                <Button onClick={handleClick}>{t('common.new')}</Button>
              )}
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
          refetchData={refetchMovements}
          hasUserFilter
        />
      </div>
      <ShowErrors error={movementQueryError} />
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  const translations = await loadTranslations(context.locale);

  if (session === null) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...translations.props,
    },
  };
};

export default Movements;
