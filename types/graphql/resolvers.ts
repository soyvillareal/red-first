import { type MovementConcept } from '@prisma/client';

import { type EUserRoleRoleNormalized } from '@/types';
import { TPageOrder } from './pagination';

export interface IGetUsers {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface IUpdateUserArgs {
  userId: string;
  name: string;
  role: EUserRoleRoleNormalized;
}

export type TValidsUserTypes = keyof Omit<IGetUsers, 'id'>;

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

export type TValidsMovementTypes = keyof Omit<IGetMovements, 'id' | 'userName'>;

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

export interface IFindUserByNameOrEmail {
  id: string;
  name: string;
}

export interface IPaginationMovementsParams<T> {
  limit: number;
  skip: number;
  order: TPageOrder;
  filterType: MovementConcept | null;
  userId: string | null;
  fieldOrder?: T;
}

export interface IPaginationMovementsArgs<T = unknown> {
  page: number;
  limit: number;
  order: TPageOrder;
  filterType: string | null;
  userId: string | null;
  fieldOrder: T;
}
