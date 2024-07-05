import { IGetRecentMovements } from '@/types/graphql/resolvers';

export interface IRecentMovementsProps {
  isLoading: boolean;
  movements: IGetRecentMovements[] | undefined;
}
