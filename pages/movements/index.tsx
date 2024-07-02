import { useCallback, useEffect, useMemo, useState } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { gql, useLazyQuery } from '@apollo/client';

import { ContextLayout } from '@/components/custom/layout';
import DashboardLayout from '@/components/atoms/DashboardLayout';
import { DataTable } from '@/components/atoms/Table/DataTable';
import { UserNav } from '@/components/atoms/UserNav';
import { routes } from '@/lib/contants';
import { loadTranslations } from '@/lib/i18n';

import { columnsFn } from './movements.constants';
import { Button } from '@/components/custom/Button';
import {
  IPageOptionsDataMeta,
  IPaginationArgs,
} from '@/types/graphql/pagination';
import { type IGetMovementsWithTotal } from '@/types/graphql/resolvers';
import { IAsyncPagination } from '@/components/atoms/Table/Table.types';

const MovementQuery = gql`
  query GetMovements($page: Float!, $limit: Float!, $order: String!) {
    getMovements(pagination: { page: $page, limit: $limit, order: $order }) {
      data {
        total
        movements {
          id
          userName
          amount
          concept
          date
        }
      }
      meta {
        page
        limit
        itemCount
        pageCount
        hasPreviousPage
        hasNextPage
      }
    }
  }
`;

const Movements = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [page, setPage] = useState<number>(1);

  const [
    getMovementsQuery,
    { data: movementQueryData, loading: movementQueryLoading },
  ] = useLazyQuery<
    {
      getMovements: IPageOptionsDataMeta<IGetMovementsWithTotal>;
    },
    IPaginationArgs
  >(MovementQuery);

  useEffect(() => {
    getMovementsQuery({
      variables: {
        page,
        limit: 10,
        order: 'asc',
      },
    });
  }, [page]);

  const handleClick = useCallback(() => {
    router.push(routes.newMovement);
  }, [router]);

  const asyncPaginationOptions = useMemo<IAsyncPagination | null>(() => {
    if (movementQueryData === undefined) {
      return null;
    }

    return {
      page: movementQueryData.getMovements.meta.page,
      limit: movementQueryData.getMovements.meta.limit,
      hasNextPage: movementQueryData.getMovements.meta.hasNextPage,
      hasPreviousPage: movementQueryData.getMovements.meta.hasPreviousPage,
      order: 'asc',
      events: {
        firstPage() {
          setPage(1);
        },
        nextPage() {
          setPage((prev) => prev + 1);
        },
        previousPage() {
          setPage((prev) => prev - 1);
        },
        lastPage() {
          setPage(movementQueryData.getMovements.meta.pageCount);
        },
      },
    };
  }, [movementQueryData]);

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
            {movementQueryData?.getMovements && (
              <DataTable
                data={movementQueryData?.getMovements.data.movements}
                columns={columnsFn(t)}
                toolbarOptions={{
                  searchKey: 'userName',
                  filters: ['concept'],
                }}
                footerChildren={
                  <div className='mt-5 border rounded-md flex justify-between items-center p-4'>
                    <span>{movementQueryData.getMovements.data.total}</span>
                    <Button onClick={handleClick}>{t('common.new')}</Button>
                  </div>
                }
                asyncPagination={asyncPaginationOptions}
              />
            )}
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
