import { z } from 'zod';
import { movementFormSchema } from './MovementForm.schema';

export type MovementFormInputs = z.infer<typeof movementFormSchema>;
