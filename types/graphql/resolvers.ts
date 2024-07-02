import { MovementConcept } from '@prisma/client';

export interface ICreateMovementArgs {
  amount: string;
  concept: MovementConcept;
  date: string;
}

export interface IGetMovements {
  id: string;
  concept: MovementConcept;
  amount: string;
  userName: string;
  date: string;
}

export interface IGetMovementsWithTotal {
  movements: IGetMovements[];
  total: string;
}
