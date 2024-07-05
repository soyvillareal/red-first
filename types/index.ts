import { DocumentNode } from '@apollo/client';
import { IncomingHttpHeaders } from 'http';
import { type DefaultSession, type Profile } from 'next-auth';

export enum EUserRoleRoleNormalized {
  admin = 'admin',
  user = 'user',
}

export enum EUserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export type TProfileWithRoles = Record<string, string> & Profile;

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
