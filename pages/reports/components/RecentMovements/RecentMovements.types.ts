import { EMovementType } from '@/lib/types';

export interface RecentMovementItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  movement: string;
  type: EMovementType;
}

export interface RecentMovementsProps {
  movements: RecentMovementItem[];
}
