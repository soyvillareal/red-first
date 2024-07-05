import { ParsedUrlQuery } from 'querystring';

import { TUserFormInputs } from '@/components/atoms/UserForm/UserForm.types';
import { IGetUserByIdResult } from '@/types/dataAccess/users';

export type TEditUserProps = TUserFormInputs;

export interface IEditUserProps {
  user: IGetUserByIdResult;
}

export interface IEditServerSideParams extends ParsedUrlQuery {
  id: string;
}
