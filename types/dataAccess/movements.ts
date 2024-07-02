import { type MovementConcept } from '@prisma/client';

export interface ICreateUserRepository {
  userId: string;
  amount: string;
  concept: MovementConcept;
  date: string;
}

export interface IGetMovementsRepository {
  id: string;
  amount: bigint;
  concept: MovementConcept;
  date: Date;
  user: {
    name: string | null;
  };
}

export interface IGetMovementsParams {
  userId: string;
}
