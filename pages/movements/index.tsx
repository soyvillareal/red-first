import { useCallback, useEffect } from 'react';
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

import { mockData } from './movements.mock';
import { columnsFn } from './movements.constants';
import { Button } from '@/components/custom/Button';
import { IGetMovementsWithTotal } from '@/types/graphql/resolvers';

const MovementQuery = gql`
  query GetMovements {
    getMovements {
      movements {
        id
        userName
        amount
        concept
        date
      }
      total
    }
  }
`;

const Money = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [
    getMovementsQuery,
    { data: movementQueryData, loading: movementQueryLoading },
  ] = useLazyQuery<{
    getMovements: IGetMovementsWithTotal;
  }>(MovementQuery);

  useEffect(() => {
    getMovementsQuery();
  }, []);

  const handleClick = useCallback(() => {
    router.push(routes.newMovement);
  }, [router]);

  return (
    <ContextLayout>
      <DashboardLayout>
        {/* ===== Top Heading ===== */}
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
                data={movementQueryData?.getMovements.movements}
                columns={columnsFn(t)}
                toolbarOptions={{
                  searchKey: 'userName',
                  filters: ['concept'],
                }}
                footerChildren={
                  <div className='mt-5 border rounded-md flex justify-between items-center p-4'>
                    <span>{movementQueryData?.getMovements.total}</span>
                    <Button onClick={handleClick}>{t('common.new')}</Button>
                  </div>
                }
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

export default Money;
