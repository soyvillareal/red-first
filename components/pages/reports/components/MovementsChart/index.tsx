import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { MovementConcept } from '@prisma/client';
import { useLazyQuery } from '@apollo/client';

import { fillArray, formatNumber, numberWithCurrency } from '@/lib/utils';
import { MovementsChartQuery } from '@/lib/apollo';
import { type IGetMovementsChart } from '@/types/graphql/resolvers';
import { MovementsChartSkeleton } from '@/components/skeleton/MovementsChartSkeleton';

import {
  type IGetMovementsQueryParams,
  type IMovementsChartProps,
} from './MovementsChart.types';

const MovementsChart = ({ callbackState, year }: IMovementsChartProps) => {
  const { t } = useTranslation();

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

  useEffect(() => {
    (async () => {
      callbackState(true);
      const movements = await getMovementsQuery({
        variables: {
          year: year,
        },
      });

      if (movements.data) {
        callbackState(false, movements.data.getMovementsChart);
      } else {
        callbackState(false);
      }
    })();
  }, [getMovementsQuery, callbackState, year]);

  const [minValue, maxValue, ticks] = useMemo(() => {
    let maxAbsValue = 0;
    if (movementQueryData?.getMovementsChart) {
      // Find the largest absolute value among all income and expenses
      maxAbsValue = Math.max(
        ...movementQueryData.getMovementsChart.flatMap((item) => [
          Math.abs(Number(item.income)),
          Math.abs(Number(item.expense)),
        ]),
      );
    }

    // Ensures that the Y axis range is symmetric around 0
    const minValue = -maxAbsValue;
    const maxValue = maxAbsValue;
    // Decide how many intermediate ticks you want between the minimum/maximum and 0
    const numTicks = 3; // For example, 5 ticks between the minimum and 0, and between 0 and the maximum

    // Generate intermediate ticks
    const step = maxAbsValue / numTicks;
    const positiveTicks = fillArray(numTicks).map((i) => (i + 1) * step);

    // The order of the negative ticks is reversed and 1 is subtracted to avoid problems with unique keys.
    const negativeTicks = positiveTicks.map((tick) => -(tick - 1)).reverse();

    const ticks = [minValue, ...negativeTicks, 0, ...positiveTicks, maxValue];

    // The maximum value is the largest absolute value
    // The minimum value is the negative of the largest absolute value
    // This ensures that the Y axis range is symmetric around 0
    return [minValue, maxValue, ticks];
  }, [movementQueryData?.getMovementsChart]);

  const renderChartData = useCallback(() => {
    return movementQueryLoading ? (
      <MovementsChartSkeleton />
    ) : (
      <BarChart
        data={movementQueryData?.getMovementsChart}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickFormatter={(value: string) => t(`months.${value}`)}
        />
        <YAxis
          ticks={ticks}
          fontSize={12}
          tickFormatter={(value) => formatNumber(value)}
          domain={[minValue, maxValue]}
        />
        <Tooltip
          formatter={(value: string, name: string) => [
            numberWithCurrency(value),
            t(`movements.${name}`),
          ]}
          labelClassName="text-gray-500"
          wrapperClassName="bg-white border border-gray-200 shadow-md rounded-lg p-2"
        />
        <Bar
          dataKey={MovementConcept.income}
          fill="var(--green)"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey={MovementConcept.expense}
          fill="var(--red)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    );
  }, [
    t,
    ticks,
    maxValue,
    minValue,
    movementQueryData?.getMovementsChart,
    movementQueryLoading,
  ]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      {movementQueryError ? (
        <p className="flex items-center justify-center h-full text-gray-500">
          {t('common.noData')}
        </p>
      ) : (
        renderChartData()
      )}
    </ResponsiveContainer>
  );
};

export default MovementsChart;
