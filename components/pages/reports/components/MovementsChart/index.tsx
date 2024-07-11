import { useCallback, useMemo } from 'react';
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

import { fillArray, formatNumber, numberWithCurrency } from '@/lib/utils';
import { MovementsChartSkeleton } from '@/components/skeleton/MovementsChartSkeleton';

import { type IMovementsChartProps } from './MovementsChart.types';

const MovementsChart = ({
  loading,
  data: movementData,
}: IMovementsChartProps) => {
  const { t } = useTranslation();

  const [minValue, maxValue, ticks] = useMemo(() => {
    let maxAbsValue = 0;
    if (movementData) {
      // Find the largest absolute value among all income and expenses
      maxAbsValue = Math.max(
        ...movementData.flatMap((item) => [
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
  }, [movementData]);

  const renderChartData = useCallback(() => {
    return loading ? (
      <MovementsChartSkeleton />
    ) : (
      <BarChart
        data={movementData}
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
          stroke="var(--border)"
          fontSize={12}
          tickFormatter={(value: string) => t(`months.${value}`)}
        />
        <YAxis
          ticks={ticks}
          stroke="var(--border)"
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
  }, [t, ticks, maxValue, minValue, movementData, loading]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      {movementData === undefined ? (
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
