import { useTranslation } from 'next-i18next';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { EMovementConcept } from '@/types';
import { parsedNumber } from '@/lib/utils';

import { MovementsChartProps } from './MovementsChart.types';

export function MovementsChart({ movements }: MovementsChartProps) {
  const { t } = useTranslation();

  return (
    <ResponsiveContainer width='100%' height={400}>
      <BarChart
        data={movements}
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
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: string) => {
            return t(`months.${value}`);
          }}
        />
        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={parsedNumber}
        />
        <Tooltip
          formatter={(value: number, name: string) => {
            return [parsedNumber(value), t(`movements.${name}`)];
          }}
        />
        <Bar dataKey={EMovementConcept.INCOME} fill='#82ca9d' />
        <Bar dataKey={EMovementConcept.EXPENSE} fill='#ff4040' />
      </BarChart>
    </ResponsiveContainer>
  );
}
