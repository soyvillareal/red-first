import { z } from 'zod';

import { EMovementConcept } from '@/lib/types';

export const movementFormSchema = z.object({
  amount: z.string(),
  concept: z.nativeEnum(EMovementConcept, {
    required_error: 'Please select a valid concept.',
  }),
  date: z.date({
    required_error: 'A date of birth is required.',
  }),
});
