import { type MovementConcept } from '@prisma/client';

export interface ICreateUserRepository {
  userId: string;
  amount: string;
  concept: MovementConcept;
  date: string;
}

export interface IGetMovementsRepository {
  id: string;
  userId: string;
  amount: string;
  concept: MovementConcept;
  date: Date;
}
