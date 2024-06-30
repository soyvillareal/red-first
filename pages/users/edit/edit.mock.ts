import { EUserRole } from '@/lib/types';
import { EditUserProps } from './edit.types';

export const mockData: EditUserProps = {
  name: 'John Doe',
  role: EUserRole.ADMIN,
};
