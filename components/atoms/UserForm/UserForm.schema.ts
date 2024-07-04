import { z } from 'zod';
import { TFunction } from 'next-i18next';
import { UserRole } from '@prisma/client';

export const userFormSchema = (t: TFunction) => {
  return z.object({
    name: z
      .string()
      .min(2, {
        message: t('editUser.nameMusBeLeast'),
      })
      .max(30, {
        message: t('editUser.nameMustBeLonger'),
      }),
    role: z.nativeEnum(UserRole, {
      required_error: t('editUser.enterValidConcept'),
    }),
  });
};
