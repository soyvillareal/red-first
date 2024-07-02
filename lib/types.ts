import { IncomingHttpHeaders } from 'http';

export enum EMovementConcept {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export enum EUserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface LocalStorageProps<T> {
  key: string;
  defaultValue: T;
  parseValue?: boolean;
}

export interface GraphQLContext {
  headers: IncomingHttpHeaders;
  session?: any;
}
