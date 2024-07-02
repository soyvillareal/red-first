import { EMovementConcept } from '@/types';

import { MovementFormInputs } from './MovementForm.types';

// This can come from your database or API.
export const defaultValues: Partial<MovementFormInputs> = {
  amount: '',
  concept: EMovementConcept.INCOME,
  date: new Date(),
};
