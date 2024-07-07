import { IGetRecentMovements } from '@/types/graphql/resolvers';
import { ApolloError } from '@apollo/client';

export interface IRecentMovementsProps {
  isLoading: boolean;
  error: ApolloError | undefined;
  movements: IGetRecentMovements[] | undefined;
}
