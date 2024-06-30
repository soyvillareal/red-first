export enum EMovementType {
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