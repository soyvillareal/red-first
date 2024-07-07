import {
  IGetMovementsChart,
  IGetRecentMovements,
} from '@/types/graphql/resolvers';

export interface IReportsCSV {
  balance?: string;
  movements?: number;
  movementsChart?: IGetMovementsChart[];
  recentMovements?: IGetRecentMovements[];
}
