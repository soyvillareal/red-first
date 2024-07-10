import { IGetMovementsChart } from '@/types/graphql/resolvers';

export interface IGetMovementsQueryParams {
  year?: string;
}

export interface IMovementsChartProps {
  data: IGetMovementsChart[] | undefined;
  loading: boolean;
}
