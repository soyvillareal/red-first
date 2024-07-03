import { z } from 'zod';
import { TFunction } from 'next-i18next';

import { EMovementConcept } from '@/types';

export const movementFormSchema = (t: TFunction) => {
  return z.object({
    amount: z.string().min(1, {
      message: t(`responseCodes.ENTER_VALID_AMOUNT`),
    }),
    concept: z.nativeEnum(EMovementConcept, {
      required_error: t(`responseCodes.ENTER_VALID_CONCEPT`),
    }),
    date: z.date({
      required_error: t(`responseCodes.ENTER_VALID_DATE`),
    }),
  });
};
