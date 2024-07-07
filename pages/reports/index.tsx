import { useCallback, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { useLazyQuery } from '@apollo/client';
import { getSession } from 'next-auth/react';

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
import { DashboardLayout } from '@/components/atoms/DashboardLayout';
import { Dollar2Icon } from '@/components/icons/Dollar2Icon';
import { loadTranslations } from '@/lib/i18n';
import { cn, currencySite, propsToCSV } from '@/lib/utils';
import { AdditionalMovementsChartQuery } from '@/lib/apollo';
import {
  IGetAdditionalMovements,
  IGetMovementsChart,
} from '@/types/graphql/resolvers';
import { ReportBalanceSkeleton } from '@/components/skeleton/ReportBalanceSkeleton';
import { ReportMovementsSkeleton } from '@/components/skeleton/ReportMovementsSkeleton';
import { EUserRole } from '@/types';

import RecentMovements from '@/components/pages/reports/components/RecentMovements';
import MovementsChart from '@/components/pages/reports/components/MovementsChart';
import { IReportsCSV } from '@/components/pages/reports/reports.types';
import SelectorYear from '@/components/pages/reports/components/SelectorYear';

export const Dashboard = () => {
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
      const additionalMovements = await getAdditionalMovements();

      if (additionalMovements.data) {
        setReportData((prev) => ({
          ...prev,
          balance: additionalMovements.data?.getAdditionalMovements.balance,
          movements: additionalMovements.data?.getAdditionalMovements.movements,
          recentMovements:
            additionalMovements.data?.getAdditionalMovements.recentMovements,
        }));
      }
    })();
  }, [getAdditionalMovements]);

  const handleClickDownload = useCallback(() => {
    if (reportData !== null) {
      propsToCSV(
        {
          balance: reportData.balance,
          movements: reportData.movements,
          movementsChart: reportData.movementsChart,
          recentMovements: reportData.recentMovements,
        },
        t,
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
    [],
  );

  return (
    <ContextLayout>
      <DashboardLayout
        seo={{
          title: t('SEO.REPORTS.title'),
          description: t('SEO.REPORTS.description'),
          keywords: t('SEO.REPORTS.keywords'),
        }}
      >
        <ContextLayout.Header>
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </ContextLayout.Header>
        <ContextLayout.Body>
          <div className="mb-2 flex items-center justify-between space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              {t('dashboard.title')}
            </h1>
            <div className="flex items-center space-x-2">
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
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <Card className="flex flex-col justify-between">
                <CardHeader className="flex-row justify-between items-center">
                  <CardTitle className="text-secondary-foreground">
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
                <CardContent className="pl-6 pb-10">
                  <MovementsChart
                    callbackState={handleCallback}
                    year={selectedYear}
                  />
                </CardContent>
              </Card>
              <div>
                <Card className="border-b-0">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-secondary-foreground text-sm font-medium">
                      {t('dashboard.balance')}
                    </CardTitle>
                    <Dollar2Icon className="h-4 w-4 text-secondary-foreground" />
                  </CardHeader>
                  <CardContent>
                    {additionalMovementQueryLoading ? (
                      <ReportBalanceSkeleton />
                    ) : (
                      <div
                        className={cn(
                          'text-secondary-foreground text-2xl font-bold',
                          additionalMovementQueryData?.getAdditionalMovements.balance.includes(
                            '-',
                          )
                            ? 'text-red'
                            : 'text-green',
                        )}
                      >
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
                    <CardTitle className="text-secondary-foreground">
                      {t('dashboard.recentMovements')}
                    </CardTitle>
                    {additionalMovementQueryLoading ? (
                      <ReportMovementsSkeleton />
                    ) : (
                      <CardDescription className="text-secondary-foreground">
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
};

export default Dashboard;

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

  if (session.user.roles.includes(EUserRole.ADMIN) === false) {
    return {
      props: {
        ...translations.props,
      },
      redirect: {
        destination: '/404',
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
