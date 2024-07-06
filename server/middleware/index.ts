import { MiddlewareFn } from 'type-graphql';

import { EUserRole, IGraphQLContext } from '@/types';
import { responseCodes } from '@/server/utils';
import { pageSizes } from '@/lib/contants';

export const checkIsLogged: MiddlewareFn<IGraphQLContext> = async (
  { context },
  next,
) => {
  try {
    if (context?.session?.user === undefined) {
      throw new Error(responseCodes.ERROR.USER_NOT_LOGGED_IN);
    }

    return next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
  }
};

export const checkIsAdmin: MiddlewareFn<IGraphQLContext> = async (
  { context },
  next,
) => {
  try {
    if (context?.session?.user === undefined) {
      throw new Error(responseCodes.ERROR.USER_NOT_LOGGED_IN);
    }

    if (
      context.session.user?.roles === undefined ||
      context.session.user?.roles.includes(EUserRole.ADMIN) === false
    ) {
      throw new Error(responseCodes.UNAUTHORIZED.NOT_AUTHORIZED);
    }

    return next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
  }
};

export const checkIsUser: MiddlewareFn<IGraphQLContext> = async (
  { context },
  next,
) => {
  try {
    if (context?.session?.user === undefined) {
      throw new Error(responseCodes.ERROR.USER_NOT_LOGGED_IN);
    }

    if (
      context.session.user.roles.includes(EUserRole.USER) === false &&
      context.session.user.roles.includes(EUserRole.ADMIN) === false
    ) {
      throw new Error(responseCodes.UNAUTHORIZED.NOT_AUTHORIZED);
    }

    return next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
  }
};

export const checkPagination: MiddlewareFn = async ({ args }, next) => {
  try {
    const { page, limit, order } = args.pagination;

    if (page === undefined) {
      throw new Error(responseCodes.PAGINATION.PAGE_UNDEFINED);
    }

    if (typeof page !== 'number') {
      throw new Error(responseCodes.PAGINATION.PAGE_MUST_BE_NUMBER);
    }

    if (pageSizes.includes(limit) === false) {
      throw new Error(responseCodes.PAGINATION.LIMIT_INVALID);
    }

    if (['asc', 'desc'].includes(order) === false) {
      throw new Error(responseCodes.PAGINATION.ORDER_INVALID);
    }

    return next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
  }
};
