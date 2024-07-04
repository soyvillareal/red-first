import { z } from 'zod';
import { userFormSchema } from './UserForm.schema';

export type TUserFormInputs = z.infer<ReturnType<typeof userFormSchema>>;

export interface IUserFormProps {
  userId: string;
  userData: TUserFormInputs;
}
