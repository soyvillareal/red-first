import { IncomingHttpHeaders } from 'http';
import { DefaultSession } from 'next-auth';

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

export type INextAuthUserSession = DefaultSession['user'] & {
  id: string;
};

export interface IGraphQLContextSession {
  user: INextAuthUserSession;
  expires: string;
  accessToken?: string;
}

export interface IGraphQLContext {
  headers: IncomingHttpHeaders;
  session: IGraphQLContextSession;
}
