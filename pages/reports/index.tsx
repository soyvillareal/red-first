import { useCallback, useEffect, useState } from 'react';
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
import { currencySite, propsToCSV } from '@/lib/utils';
import { AdditionalMovementsChartQuery } from '@/lib/apollo';
import { Skeleton } from '@/components/ui/skeleton';
import {
  IGetAdditionalMovements,
  IGetMovementsChart,
} from '@/types/graphql/resolvers';
import { useLazyQuery } from '@apollo/client';

import { RecentMovements } from './components/RecentMovements';
import { MovementsChart } from './components/MovementsChart';
import { IReportsCSV } from './reports.types';
import SelectorYear from './components/SelectorYear';

export default function Dashboard() {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState('2024');
  const [movementsChartLoading, setMovementsChartLoading] =
    useState<boolean>(false);
  const [reportData, setReportData] = useState<IReportsCSV | null>(null);

  const [
    getAdditionalMovements,
    {
      data: additionalMovementQueryData,
      loading: additionalMovementQueryLoading,
    },
  ] = useLazyQuery<{
    getAdditionalMovements: IGetAdditionalMovements;
  }>(AdditionalMovementsChartQuery);

  useEffect(() => {
    (async () => {
      try {
        const additionalMovements = await getAdditionalMovements();

        if (additionalMovements.data) {
          setReportData((prev) => ({
            ...prev,
            balance: additionalMovements.data?.getAdditionalMovements.balance,
            movements:
              additionalMovements.data?.getAdditionalMovements.movements,
            recentMovements:
              additionalMovements.data?.getAdditionalMovements.recentMovements,
          }));
        }
      } catch (error) {
        console.log('error', error);
      }
    })();
  }, []);

  const handleClickDownload = useCallback(() => {
    if (reportData !== null) {
      propsToCSV(
        {
          balance: reportData.balance,
          movements: reportData.movements,
          movementsChart: reportData.movementsChart,
          recentMovements: reportData.recentMovements,
        },
        t
      );
    }
  }, [t, reportData]);

  const handleCallback = useCallback(
    (loading: boolean, data?: IGetMovementsChart[]) => {
      setMovementsChartLoading(loading);
      setReportData((prev) => ({
        ...prev,
        movementsChart: data,
      }));
    },
    []
  );

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
              <Button
                onClick={handleClickDownload}
                disabled={
                  reportData === null ||
                  movementsChartLoading === true ||
                  additionalMovementQueryLoading === true
                }
              >
                {t('common.download')}
              </Button>
            </div>
          </div>
          <div className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
              <Card className='flex flex-col justify-between'>
                <CardHeader className='flex-row justify-between items-center'>
                  <CardTitle className='text-secondary-foreground'>
                    {t('dashboard.movements', {
                      replace: {
                        currency: currencySite,
                      },
                    })}
                  </CardTitle>
                  <SelectorYear
                    value={selectedYear}
                    onValueChange={(value) => {
                      setSelectedYear(value);
                    }}
                  />
                </CardHeader>
                <CardContent className='pl-6 pb-10'>
                  <MovementsChart
                    callbackState={handleCallback}
                    year={selectedYear}
                  />
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
                    {additionalMovementQueryLoading ? (
                      <div className='flex items-center gap-2'>
                        <span className='text-secondary-foreground text-2xl font-bold'>
                          $
                        </span>
                        <Skeleton className='w-80 h-6 rounded-[4px]' />
                      </div>
                    ) : (
                      <div className='text-secondary-foreground text-2xl font-bold'>
                        {
                          additionalMovementQueryData?.getAdditionalMovements
                            .balance
                        }
                      </div>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className='text-secondary-foreground'>
                      {t('dashboard.recentMovements')}
                    </CardTitle>
                    {additionalMovementQueryLoading ? (
                      <div className='flex items-center'>
                        <Skeleton className='w-80 h-4 rounded-[2px]' />
                      </div>
                    ) : (
                      <CardDescription className='text-secondary-foreground'>
                        {t('dashboard.youMadeMovementsMonth', {
                          replace: {
                            movements:
                              additionalMovementQueryData
                                ?.getAdditionalMovements.movements,
                          },
                        })}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <RecentMovements
                      isLoading={additionalMovementQueryLoading}
                      movements={
                        additionalMovementQueryData?.getAdditionalMovements
                          .recentMovements
                      }
                    />
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
