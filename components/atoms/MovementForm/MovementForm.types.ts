import { z } from 'zod';

import { movementFormSchema } from './MovementForm.schema';

export type TMovementFormInputs = z.infer<
  ReturnType<typeof movementFormSchema>
>;
