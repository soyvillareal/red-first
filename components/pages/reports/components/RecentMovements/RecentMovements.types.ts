import { IGetRecentMovements } from '@/types/graphql/resolvers';

export interface IRecentMovementsProps {
  movements: IGetRecentMovements[] | undefined;
}
