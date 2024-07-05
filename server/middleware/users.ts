import { MiddlewareFn } from 'type-graphql';

import { IGraphQLContext } from '@/types';
import { TValidsUserTypes } from '@/types/graphql/resolvers';

import { responseCodes } from '../utils';

export const checkUpdateUser: MiddlewareFn<IGraphQLContext> = async (
  { args },
  next,
) => {
  try {
    const { name } = args.user;

    if (name === '') {
      throw new Error(responseCodes.USERS.NAME_EMPTY);
    }

    if (name.length <= 2) {
      throw new Error(responseCodes.USERS.NAME_TOO_SHORT);
    }

    if (name.length >= 30) {
      throw new Error(responseCodes.USERS.NAME_TOO_LONG);
    }

    return next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
  }
};

export const checkGetUsers: MiddlewareFn<IGraphQLContext> = async (
  { args },
  next,
) => {
  try {
    const { fieldOrder } = args.pagination;

    const fieldsValids: TValidsUserTypes[] = ['name', 'email', 'phone'];

    if (fieldsValids.includes(fieldOrder) === false) {
      throw new Error(responseCodes.ERROR.INVALID_FIELD_ORDER);
    }

    return next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
  }
};
