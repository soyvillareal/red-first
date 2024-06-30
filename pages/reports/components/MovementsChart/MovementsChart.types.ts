export interface MovementChartItem {
  name:
    | 'jan'
    | 'feb'
    | 'mar'
    | 'apr'
    | 'may'
    | 'jun'
    | 'jul'
    | 'aug'
    | 'sep'
    | 'oct'
    | 'nov'
    | 'dec';
  income: number;
  expense: number;
}

export interface MovementsChartProps {
  movements: MovementChartItem[];
}
