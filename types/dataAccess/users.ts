import { type EUserRole } from '@/types';

export interface IGetUserByIdResult {
  id: string;
  roles: string[];
  name: string | null;
  email: string | null;
  image: string | null;
}

export interface IUpdateUserParams {
  name: string;
  role: EUserRole;
}

export interface IGetUsersRepository {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
}

export interface IGetAccountDataResult {
  id: string;
  access_token: string | null;
  providerAccountId: string;
  type: string;
  scope: string | null;
}

export interface IGetAccountDataByProviderIdResult {
  id: string;
  userId: string;
}

export interface IGetUsersReportByIds {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

export interface IGetUsersMovementByIds {
  id: string;
  name: string | null;
}

export interface IFindByNameOrEmail {
  id: string;
  name: string;
}
