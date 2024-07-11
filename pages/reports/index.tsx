import { useCallback, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useLazyQuery } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { getSession } from 'next-auth/react';
import dayjs from 'dayjs';

import { Button } from '@/components/custom/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardLayout } from '@/components/atoms/DashboardLayout';
import { loadTranslations } from '@/lib/i18n';
import { currencySite, propsToCSV } from '@/lib/utils';
import { IGetMovementsChart } from '@/types/graphql/resolvers';
import { EUserRole } from '@/types';
import MovementsChart from '@/components/pages/reports/components/MovementsChart';
import {
  IDashboardProps,
  IReportsCSV,
} from '@/components/pages/reports/reports.types';
import SelectorYear from '@/components/pages/reports/components/SelectorYear';
import { ShowErrors } from '@/components/custom/ShowErrors';
import AdditionalMovements from '@/components/pages/reports/components/AdditionalMovements';
import {
  additionalMovementsSSR,
  movementsChartSSR,
  yearsSSR,
} from '@/server/ssr/reports';
import { MovementsChartQuery } from '@/lib/apollo';
import { IGetMovementsQueryParams } from '@/components/pages/reports/components/MovementsChart/MovementsChart.types';

export const Dashboard = ({
  yearsData,
  movementsChartData,
  additionalMovementsData,
}: IDashboardProps) => {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState<string>(
    yearsData ? yearsData[0] : dayjs().format('YYYY'),
  );
  const [reportData, setReportData] = useState<IReportsCSV | null>(null);

  const [
    getMovementsQuery,
    {
      data: movementQueryData,
      loading: movementQueryLoading,
      error: movementQueryError,
    },
  ] = useLazyQuery<
    {
      getMovementsChart: IGetMovementsChart[];
    },
    IGetMovementsQueryParams
  >(MovementsChartQuery);

  const handleClickYears = useCallback(
    (year: string) => {
      (async () => {
        setSelectedYear(year);
        const movements = await getMovementsQuery({
          variables: {
            year,
          },
        });

        if (movements?.data?.getMovementsChart) {
          setReportData((prev) => ({
            ...prev,
            movementsChart: movements.data?.getMovementsChart,
          }));
        }
      })();
    },
    [getMovementsQuery],
  );

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

  useEffect(() => {
    setReportData({
      movementsChart: movementsChartData,
      movements: additionalMovementsData?.movements,
      balance: additionalMovementsData?.balance,
      recentMovements: additionalMovementsData?.recentMovements,
    });
  }, [movementsChartData, additionalMovementsData]);

  return (
    <DashboardLayout
      seo={{
        title: t('SEO.REPORTS.title'),
        description: t('SEO.REPORTS.description'),
        keywords: t('SEO.REPORTS.keywords'),
      }}
    >
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          {t('dashboard.title')}
        </h1>
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleClickDownload}
            disabled={reportData === null || movementQueryLoading === true}
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
                yearsData={yearsData}
                value={selectedYear}
                onValueChange={handleClickYears}
              />
            </CardHeader>
            <CardContent className="pl-6 pb-10">
              <MovementsChart
                data={
                  movementQueryData?.getMovementsChart || movementsChartData
                }
                loading={movementQueryLoading}
              />
            </CardContent>
          </Card>
          <AdditionalMovements data={additionalMovementsData} />
        </div>
      </div>
      <ShowErrors error={movementQueryError} />
    </DashboardLayout>
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

  const years = await yearsSSR();
  const movementsChart = await movementsChartSSR();
  const additionalMovements = await additionalMovementsSSR();

  return {
    props: {
      ...translations.props,
      yearsData: JSON.parse(JSON.stringify(years)),
      movementsChartData: movementsChart,
      additionalMovementsData: additionalMovements,
    },
  };
};
