import { MovementsProps } from './movements.types';

export const mockData: MovementsProps = {
  total: '$102183',
  movements: [
    {
      concept: 'income',
      amount: '$45890',
      date: '2022-01-01',
      userName: 'John Doe',
    },
    {
      concept: 'expense',
      amount: '$56293',
      date: '2023-04-06',
      userName: 'Jane Doe',
    },
  ],
};
