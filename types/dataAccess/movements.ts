import { type MovementConcept } from '@prisma/client';
import { type Decimal } from '@prisma/client/runtime/library';

export interface ICreateUserRepository {
  userId: string;
  amount: string;
  concept: MovementConcept;
  date: string;
}

export interface IGetMovementsRepository {
  id: string;
  userId: string;
  amount: Decimal;
  concept: MovementConcept;
  date: Date;
}
