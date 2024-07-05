import { z } from 'zod';
import { TFunction } from 'next-i18next';
import { MovementConcept } from '@prisma/client';

export const movementFormSchema = (t: TFunction) =>
  z.object({
    amount: z.string().min(1, {
      message: t(`responseCodes.ENTER_VALID_AMOUNT`),
    }),
    concept: z.nativeEnum(MovementConcept, {
      required_error: t(`responseCodes.ENTER_VALID_CONCEPT`),
    }),
    date: z.date({
      required_error: t(`responseCodes.ENTER_VALID_DATE`),
    }),
  });
