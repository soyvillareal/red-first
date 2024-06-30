import { z } from 'zod';
import { userFormSchema } from './UserForm.schema';

export type UserFormValues = z.infer<typeof userFormSchema>;
