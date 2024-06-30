import { MovementChartItem } from './components/MovementsChart/MovementsChart.types';
import { RecentMovementItem } from './components/RecentMovements/RecentMovements.types';

export interface ReportsPageProps {
  balance: string;
  movements: number;
  movementsChart: MovementChartItem[];
  recentMovements: RecentMovementItem[];
}
