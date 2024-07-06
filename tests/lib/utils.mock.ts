import {
  IGetMovementsChart,
  IGetRecentMovements,
} from '@/types/graphql/resolvers';

export const movementsChartMock: IGetMovementsChart[] = [
  { name: 'jan', expense: '100', income: '200' },
  { name: 'feb', expense: '200', income: '300' },
  {
    name: 'mar',
    expense: '300',
    income: '400',
  },
  {
    name: 'apr',
    expense: '400',
    income: '500',
  },
  {
    name: 'may',
    expense: '500',
    income: '600',
  },
  {
    name: 'jun',
    expense: '600',
    income: '700',
  },
  {
    name: 'jul',
    expense: '700',
    income: '800',
  },
  {
    name: 'aug',
    expense: '800',
    income: '900',
  },
  {
    name: 'sep',
    expense: '900',
    income: '1000',
  },
  {
    name: 'oct',
    expense: '1000',
    income: '1100',
  },
  {
    name: 'nov',
    expense: '1100',
    income: '1200',
  },
  {
    name: 'dec',
    expense: '1200',
    income: '1300',
  },
];

export const recentMovementsMock: IGetRecentMovements[] = [
  {
    name: 'Jane Doe',
    email: 'jane.doe@gmail.com',
    concept: 'income',
    id: '123e456',
    image: 'https://example.com/image.jpg',
    movement: '1000',
  },
  {
    name: 'John Doe',
    email: 'jonh.doe@gmail.com',
    concept: 'expense',
    id: '123e457',
    image: 'https://example.com/image.jpg',
    movement: '500',
  },
  {
    name: 'John Smith',
    email: 'john.smith@gmail.com',
    concept: 'expense',
    id: '123e458',
    image: 'https://example.com/image.jpg',
    movement: '250',
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@gmail.com',
    concept: 'income',
    id: '123e459',
    image: 'https://example.com/image.jpg',
    movement: '750',
  },
];
