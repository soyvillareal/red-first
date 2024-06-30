import { z } from 'zod';
import { movementFormSchema } from './MovementForm.schema';

export type MovementFormValues = z.infer<typeof movementFormSchema>;
