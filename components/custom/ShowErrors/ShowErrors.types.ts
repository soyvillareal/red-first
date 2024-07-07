import { ApolloError } from '@apollo/client';

export interface IShowErrorsProps {
  error: ApolloError | undefined;
}
