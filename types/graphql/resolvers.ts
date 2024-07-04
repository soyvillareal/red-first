import { MovementConcept, UserRole } from '@prisma/client';

export interface IGetUsers {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface IUpdateUserArgs {
  userId: string;
  name: string;
  role: UserRole;
}

export type TValidsUserTypes = keyof Omit<IGetUsers, 'id'>;

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

export type TValidsMovementTypes = keyof Omit<IGetMovements, 'id'>;

export type TValidMonthsKeys =
  | 'jan'
  | 'feb'
  | 'mar'
  | 'apr'
  | 'may'
  | 'jun'
  | 'jul'
  | 'aug'
  | 'sep'
  | 'oct'
  | 'nov'
  | 'dec';

export interface IGetMovementsChart {
  name: TValidMonthsKeys;
  income: string;
  expense: string;
}

export interface IParsedMovementsChart {
  name: TValidMonthsKeys;
  income: bigint;
  expense: bigint;
}

export interface IGetRecentMovements {
  id: string;
  name: string;
  email: string;
  image: string;
  movement: string;
  concept: MovementConcept;
}

export interface IGetAdditionalMovements {
  balance: string;
  movements: number;
  recentMovements: IGetRecentMovements[];
}