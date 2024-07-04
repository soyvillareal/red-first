import { useEffect, useMemo } from 'react';
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

import {
  type IMovementsChartProps,
  type IGetMovementsQueryParams,
} from './MovementsChart.types';
import { Skeleton } from '@/components/ui/skeleton';

export function MovementsChart({ callbackState, year }: IMovementsChartProps) {
  const { t } = useTranslation();

  const [
    getMovementsQuery,
    { data: movementQueryData, loading: movementQueryLoading },
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
  }, [year]);

  const [minValue, maxValue, ticks] = useMemo(() => {
    let maxAbsValue = 0;
    if (movementQueryData?.getMovementsChart) {
      // Find the largest absolute value among all income and expenses
      maxAbsValue = Math.max(
        ...movementQueryData.getMovementsChart.flatMap((item) => [
          Math.abs(Number(item.income)),
          Math.abs(Number(item.expense)),
        ])
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

  return (
    <ResponsiveContainer width='100%' height={400}>
      {movementQueryLoading ? (
        <Skeleton className='w-full h-full' />
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
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey='name'
            stroke='#888888'
            fontSize={12}
            tickFormatter={(value: string) => {
              return t(`months.${value}`);
            }}
          />
          <YAxis
            ticks={ticks}
            fontSize={12}
            tickFormatter={(value) => formatNumber(value)}
            domain={[minValue, maxValue]}
          />
          <Tooltip
            formatter={(value: string, name: string) => {
              return [numberWithCurrency(value), t(`movements.${name}`)];
            }}
          />
          <Bar dataKey={MovementConcept.income} fill='#82ca9d' />
          <Bar dataKey={MovementConcept.expense} fill='#ff4040' />
        </BarChart>
      )}
    </ResponsiveContainer>
  );
}
