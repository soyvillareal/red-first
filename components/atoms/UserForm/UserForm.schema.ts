import { z } from 'zod';

import { EUserRole } from '@/types';

export const userFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  role: z.nativeEnum(EUserRole, {
    required_error: 'Please select a valid concept.',
  }),
});
