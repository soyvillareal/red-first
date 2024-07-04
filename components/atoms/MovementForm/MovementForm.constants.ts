import { MovementConcept } from '@prisma/client';

import { TMovementFormInputs } from './MovementForm.types';

// This can come from your database or API.
export const defaultValues: Partial<TMovementFormInputs> = {
  amount: '',
  concept: MovementConcept.income,
  date: new Date(),
};
