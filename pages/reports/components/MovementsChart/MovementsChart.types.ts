import { IGetMovementsChart } from '@/types/graphql/resolvers';

export interface IGetMovementsQueryParams {
  year: string;
}

export interface IMovementsChartProps {
  callbackState: (loading: boolean, data?: IGetMovementsChart[]) => void;
  year: string;
}
