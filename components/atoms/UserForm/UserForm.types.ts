import { z } from 'zod';
import { userFormSchema } from './UserForm.schema';

export type UserFormInputs = z.infer<typeof userFormSchema>;

export interface UserFormProps {
  userData: UserFormInputs;
}
