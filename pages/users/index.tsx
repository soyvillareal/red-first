import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { useLazyQuery } from '@apollo/client';
import { ColumnFiltersState } from '@tanstack/react-table';

import { ContextLayout } from '@/components/custom/layout';
import { DataTable } from '@/components/atoms/Table/DataTable';
import DashboardLayout from '@/components/atoms/DashboardLayout';
import { UserNav } from '@/components/atoms/UserNav';
import { loadTranslations } from '@/lib/i18n';
import { useDebounce } from '@/hooks/useDebounce';
import { usePagination } from '@/hooks/usePagination';
import { useSorting } from '@/hooks/useSorting';
import {
  IPageOptionsDataMeta,
  IPaginationArgs,
} from '@/types/graphql/pagination';
import { UserQuery } from '@/lib/apollo';

import { columns } from './users.constants';
import { IGetUsers, TValidsUserTypes } from '@/types/graphql/resolvers';

const Users = () => {
  const { t } = useTranslation();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { pagination, onPaginationChange, page, limit } = usePagination();
  const { sorting, onSortingChange, field, order } = useSorting('name');

  const { debouncedValue, debouncedLoading } =
    useDebounce<ColumnFiltersState>(columnFilters);

  const [
    getMovementsQuery,
    { data: userQueryData, loading: userQueryLoading },
  ] = useLazyQuery<
    {
      getUsers: IPageOptionsDataMeta<IGetUsers[]>;
    },
    IPaginationArgs<TValidsUserTypes>
  >(UserQuery);

  useEffect(() => {
    const queryValue = debouncedValue.find((filter) => filter.id === 'name')
      ?.value as string;

    getMovementsQuery({
      variables: {
        page,
        limit,
        order,
        filterType: null,
        queryValue: queryValue || '',
        fieldOrder: field,
      },
    });
  }, [page, field, limit, order, debouncedValue]);

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
              {t('users.title')}
            </h2>
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <DataTable
              data={userQueryData?.getUsers.data || []}
              columns={columns}
              toolbarOptions={{
                searchKey: 'name',
              }}
              loading={userQueryLoading || debouncedLoading}
              pageCount={userQueryData?.getUsers.meta.pageCount || 0}
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

export default Users;
