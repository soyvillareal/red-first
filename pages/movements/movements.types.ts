import { z } from 'zod';

import { movementSchema } from './movements.schema';

export type MovementsItem = z.infer<typeof movementSchema>;

export interface MovementsProps {
  total: string;
  movements: MovementsItem[];
}
