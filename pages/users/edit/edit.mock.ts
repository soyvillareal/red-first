import { EUserRole } from '@/types';
import { EditUserProps } from './edit.types';

export const mockData: EditUserProps = {
  name: 'John Doe',
  role: EUserRole.ADMIN,
};
