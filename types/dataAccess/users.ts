import { UserRole } from '@prisma/client';

export interface IGetUserByIdResult {
  id: string;
  role: UserRole;
  name: string | null;
  email: string | null;
  image: string | null;
}

export interface IUpdateUserParams {
  name: string;
  role: UserRole;
}

export interface IGetUsersRepository {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
}
