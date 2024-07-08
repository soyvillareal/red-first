import { type MovementConcept } from '@prisma/client';
import { type Decimal } from '@prisma/client/runtime/library';

export interface IGetMovementsChartRepository {
  amount: Decimal;
  concept: MovementConcept;
  date: Date;
}

export interface IGetRecentMovementsRepository {
  id: string;
  userId: string;
  amount: Decimal;
  concept: MovementConcept;
}

export interface IGetBalanceResult {
  count: string;
}

export interface IGetValidYearsResult {
  year: string;
}
