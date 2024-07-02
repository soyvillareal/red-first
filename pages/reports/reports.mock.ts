import { EMovementConcept } from '@/types';
import { ReportsPageProps } from './reports.types';

export const dataMock: ReportsPageProps = {
  balance: '$45,231.89',
  movements: 265,
  movementsChart: [
    {
      name: 'jan',
      income: Math.floor(Math.random() * 5000) + 1000,
      expense: -Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'feb',
      income: Math.floor(Math.random() * 5000) + 1000,
      expense: -Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'mar',
      income: Math.floor(Math.random() * 5000) + 1000,
      expense: -Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'apr',
      income: Math.floor(Math.random() * 5000) + 1000,
      expense: -Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'may',
      income: Math.floor(Math.random() * 5000) + 1000,
      expense: -Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'jun',
      income: Math.floor(Math.random() * 5000) + 1000,
      expense: -Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'jul',
      income: Math.floor(Math.random() * 5000) + 1000,
      expense: -Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'aug',
      income: Math.floor(Math.random() * 5000) + 1000,
      expense: -Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'sep',
      income: Math.floor(Math.random() * 5000) + 1000,
      expense: -Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'oct',
      income: Math.floor(Math.random() * 5000) + 1000,
      expense: -Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'nov',
      income: Math.floor(Math.random() * 5000) + 1000,
      expense: -Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'dec',
      income: Math.floor(Math.random() * 5000) + 1000,
      expense: -Math.floor(Math.random() * 5000) + 1000,
    },
  ],
  recentMovements: [
    {
      id: 'f3ad6e74-a09a-4fef-8f21-b10a0dd558e1',
      name: 'Olivia Martin',
      email: 'olivia.martin@email.com',
      avatar: '/avatars/01.png',
      movement: '-$1,999.00',
      type: EMovementConcept.EXPENSE,
    },
    {
      id: 'b1f1e7c6-54ea-4df2-9eee-1e386c89ba25',
      name: 'Jackson Lee',
      email: 'jackson.lee@email.com',
      avatar: '/avatars/02.png',
      movement: '+$39.00',
      type: EMovementConcept.INCOME,
    },
    {
      id: '437d2358-9757-4e31-90d9-f919980cdea6',
      name: 'Isabella Nguyen',
      email: 'isabella.nguyen@email.com',
      avatar: '/avatars/03.png',
      movement: '+$299.00',
      type: EMovementConcept.INCOME,
    },
    {
      id: '4cf2bc26-d4b7-4965-8625-ed879f86ac3e',
      name: 'William King',
      email: 'will@email.com',
      avatar: '/avatars/04.png',
      movement: '+$99.00',
      type: EMovementConcept.INCOME,
    },
    {
      id: '52e3edbb-37d6-48c0-bad0-bf1022267db6',
      name: 'William King',
      email: 'Sofia Davis',
      avatar: '/avatars/05.png',
      movement: '-$399.00',
      type: EMovementConcept.EXPENSE,
    },
  ],
};
