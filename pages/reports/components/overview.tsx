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

import { mockData } from './Overview.mock';
import { EMovementType } from '@/lib/types';

export function Overview() {
  return (
    <ResponsiveContainer width='100%' height={400}>
      <BarChart
        data={mockData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) => {
            if (value < 0) {
              return `$${-value}`;
            }
            return `$${value}`;
          }}
        />
        <Tooltip />
        <Bar dataKey={EMovementType.INCOME} fill='#82ca9d' />
        <Bar dataKey={EMovementType.EXPENSE} fill='#ff4040' />
      </BarChart>
    </ResponsiveContainer>
  );
}
