import { MovementConcept } from '@prisma/client';

export interface IGetMovementsChartRepository {
  amount: string;
  concept: MovementConcept;
  date: Date;
}

export interface IGetRecentMovementsRepository {
  id: string;
  amount: string;
  concept: MovementConcept;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
}

export interface IGetBalanceResult {
  count: string;
}

export interface IGetValidYearsResult {
  year: string;
}
