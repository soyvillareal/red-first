import { DocumentNode } from '@apollo/client';
import { IncomingHttpHeaders } from 'http';
import { DefaultSession } from 'next-auth';

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
