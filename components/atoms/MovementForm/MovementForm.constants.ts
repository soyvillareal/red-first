import { EMovementType } from '@/lib/types';

import { MovementFormValues } from './MovementForm.types';

// This can come from your database or API.
export const defaultValues: Partial<MovementFormValues> = {
  amount: 0,
  concept: EMovementType.INCOME,
  date: new Date(),
};
