import { EMovementConcept } from '@/types';

export interface RecentMovementItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  movement: string;
  type: EMovementConcept;
}

export interface RecentMovementsProps {
  movements: RecentMovementItem[];
}
