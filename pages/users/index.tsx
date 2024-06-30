import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';

import { ContextLayout } from '@/components/custom/layout';

import { DataTable } from '@/components/atoms/Table/DataTable';
import DashboardLayout from '@/components/atoms/DashboardLayout';
import { UserNav } from '@/components/atoms/UserNav';
import { loadTranslations } from '@/lib/i18n';

import { mockData } from './users.mock';
import { columns } from './users.constants';

const Money = () => {
  const { t } = useTranslation();

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
              {t('users.title')}
            </h2>
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <DataTable
              data={mockData}
              columns={columns}
              toolbarOptions={{
                searchKey: 'name',
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

export default Money;
