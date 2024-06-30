import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';

import { ContextLayout } from '@/components/custom/layout';
import { Button } from '@/components/custom/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UserNav } from '@/components/atoms/UserNav';
import DashboardLayout from '@/components/atoms/DashboardLayout';
import Dollar2Icon from '@/components/icons/Dollar2Icon';
import { loadTranslations } from '@/lib/i18n';

import { RecentMovements } from './components/RecentMovements';
import { MovementsChart } from './components/MovementsChart';
import { dataMock as props } from './reports.mock';

export default function Dashboard() {
  const { t } = useTranslation();

  const { balance, movements, movementsChart, recentMovements } = props;

  return (
    <ContextLayout>
      <DashboardLayout>
        <ContextLayout.Header>
          <div className='ml-auto flex items-center space-x-4'>
            <UserNav />
          </div>
        </ContextLayout.Header>
        <ContextLayout.Body>
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <h1 className='text-2xl font-bold tracking-tight'>
              {t('dashboard.title')}
            </h1>
            <div className='flex items-center space-x-2'>
              <Button>{t('common.download')}</Button>
            </div>
          </div>
          <div className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
              <Card>
                <CardHeader>
                  <CardTitle className='text-secondary-foreground'>
                    {t('dashboard.movements')}
                  </CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <MovementsChart movements={movementsChart} />
                </CardContent>
              </Card>
              <div>
                <Card className='border-b-0'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-secondary-foreground text-sm font-medium'>
                      {t('dashboard.balance')}
                    </CardTitle>
                    <Dollar2Icon className='h-4 w-4 text-secondary-foreground' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-secondary-foreground text-2xl font-bold'>
                      {balance}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className='text-secondary-foreground'>
                      {t('dashboard.recentMovements')}
                    </CardTitle>
                    <CardDescription className='text-secondary-foreground'>
                      {t('dashboard.youMadeMovementsMonth', {
                        replace: {
                          movements,
                        },
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentMovements movements={recentMovements} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </ContextLayout.Body>
      </DashboardLayout>
    </ContextLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return loadTranslations(context.locale);
};
