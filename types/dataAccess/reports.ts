import { MovementConcept } from '@prisma/client';

export interface IGetMovementsChartRepository {
  amount: string;
  concept: MovementConcept;
  date: Date;
}

export interface IGetRecentMovementsRepository {
  id: string;
  userId: string;
  amount: string;
  concept: MovementConcept;
}

export interface IGetBalanceResult {
  count: string;
}

export interface IGetValidYearsResult {
  year: string;
}
