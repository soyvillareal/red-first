import { TFunction } from 'next-i18next';
import { DocumentNode } from '@apollo/client';
import { IncomingHttpHeaders } from 'http';
import { type DefaultSession, type Profile } from 'next-auth';
import { type AdapterUser } from 'next-auth/adapters';

export enum EUserRoleRoleNormalized {
  admin = 'admin',
  user = 'user',
}

export enum EUserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export type TProfileWithRoles = Record<string, string | string[]> & Profile;
export type TSessionWithRoles = Record<string, string | string[]> & AdapterUser;

export interface LocalStorageProps<T> {
  key: string;
  defaultValue: T;
  parseValue?: boolean;
}

export type INextAuthUserSession = DefaultSession['user'] & {
  id: string;
  roles: EUserRole[];
};

export interface IGraphQLContextSession {
  user: INextAuthUserSession;
  expires: string;
  accessToken?: string;
}

export interface IGraphQLContext {
  headers: IncomingHttpHeaders;
  session: IGraphQLContextSession | null;
}

export interface IGraphQLErrorContext {
  errorMessage?: string | undefined;
}

export type TNoStandardCache = {
  ROOT_QUERY?: Record<string, string> | undefined;
} & Record<string, string>;

export type TNoStandardQueryDefinitions = {
  name: {
    value: string;
  };
} & DocumentNode['definitions'][0];

export interface IGAEvent {
  action: string;
  category: string;
  label: string;
  value: number;
}

export interface ITableToCSV<T> {
  columns: string[];
  rows: T[];
  total?: string;
  t: TFunction;
}
