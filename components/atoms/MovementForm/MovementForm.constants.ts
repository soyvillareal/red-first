import { EMovementType } from '@/lib/types';

import { MovementFormInputs } from './MovementForm.types';

// This can come from your database or API.
export const defaultValues: Partial<MovementFormInputs> = {
  amount: 0,
  concept: EMovementType.INCOME,
  date: new Date(),
};
