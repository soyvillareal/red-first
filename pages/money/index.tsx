import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { ContextLayout } from '@/components/custom/layout';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { DataTable } from './components/DataTable';
import { mockData } from './data/data.mock';
import DashboardLayout from '@/components/DashboardLayout';
import { loadTranslations } from '@/lib/i18n';
import { columnsFn } from './constants';

const Money = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  return (
    <ContextLayout>
      <DashboardLayout>
        {/* ===== Top Heading ===== */}
        <ContextLayout.Header sticky>
          <div className='ml-auto flex items-center space-x-4'>
            <div className='flex col-row items-center justify-center md:gap-2 py-3 px-5 text-white bg-primary rounded-full baseline'>
              {user && user.picture && (
                <Avatar>
                  <AvatarImage src={user.picture} />
                  <AvatarFallback>{user.nickname}</AvatarFallback>
                </Avatar>
              )}
              <Link
                href='/api/auth/logout'
                className='text-white hover:underline mr-4'
              >
                {t('common.logOut')}
              </Link>
            </div>
          </div>
        </ContextLayout.Header>

        <ContextLayout.Body>
          <div className='mb-4 flex items-center justify-between space-y-2'>
            <h2 className='text-2xl font-bold tracking-tight'>
              {t('money.incomeExpenses')}
            </h2>
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <DataTable data={mockData} columns={columnsFn(t)} />
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
