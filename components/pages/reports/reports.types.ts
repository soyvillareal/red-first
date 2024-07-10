import {
  IGetAdditionalMovements,
  IGetMovementsChart,
  IGetRecentMovements,
} from '@/types/graphql/resolvers';

export interface IReportsCSV {
  balance?: string;
  movements?: number;
  movementsChart?: IGetMovementsChart[];
  recentMovements?: IGetRecentMovements[];
}

export interface IDashboardProps {
  yearsData: string[] | undefined;
  movementsChartData: IGetMovementsChart[] | undefined;
  additionalMovementsData: IGetAdditionalMovements | undefined;
}
