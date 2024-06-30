import { EUserRole } from '@/lib/types';

import { UserFormValues } from './UserForm.types';

// This can come from your database or API.
export const defaultValues: Partial<UserFormValues> = {
  name: '',
  role: EUserRole.USER,
};
