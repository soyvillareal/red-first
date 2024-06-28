import { Layout } from '@/components/custom/layout';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { tasks } from './data/tasks';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useTranslation } from 'next-i18next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

const Money = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <div className='ml-auto flex items-center space-x-4'>
          <div className='flex col-row items-center justify-center md:gap-2 py-3 px-5 text-white bg-primary rounded-full baseline'>
            {user && user.picture && (
              <Avatar>
                <AvatarImage src={user.picture} />
                <AvatarFallback>CN</AvatarFallback>
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
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={tasks} columns={columns} />
        </div>
      </Layout.Body>
    </Layout>
  );
};

export default Money;
