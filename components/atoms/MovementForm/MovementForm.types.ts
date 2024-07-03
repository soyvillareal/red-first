import { z } from 'zod';
import { movementFormSchema } from './MovementForm.schema';

export type MovementFormInputs = z.infer<ReturnType<typeof movementFormSchema>>;
