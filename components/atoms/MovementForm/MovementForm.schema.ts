import { z } from 'zod';

import { EMovementType } from '@/lib/types';

export const movementFormSchema = z.object({
  amount: z
    .number()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  concept: z.nativeEnum(EMovementType, {
    required_error: 'Please select a valid concept.',
  }),
  date: z.date({
    required_error: 'A date of birth is required.',
  }),
});
