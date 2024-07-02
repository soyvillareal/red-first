import { MiddlewareFn } from 'type-graphql';
import { IGraphQLContext } from '@/types';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export const checkIsLogged: MiddlewareFn<IGraphQLContext> = async (
  { context },
  next
) => {
  try {
    if (context?.session === undefined) {
      throw new Error('Session is undefined!');
    }

    if (context?.session?.user === undefined) {
      throw new Error('The user is not logged in!');
    }

    return next();
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw err;
  }
};

export const checkPagination: MiddlewareFn = async ({ args }, next) => {
  try {
    const { page, limit, order } = args.pagination;

    if (page === undefined) {
      throw new Error('Page is undefined!');
    }

    if (typeof page !== 'number') {
      throw new Error('Page must be a number!');
    }

    const validPagination: number[] = [10, 20, 30, 40, 50];

    if (validPagination.includes(limit) === false) {
      throw new Error(`Limit can by: ${validPagination.join(', ')}`);
    }

    if (['asc', 'desc'].includes(order) === false) {
      throw new Error('Order can be: asc or desc');
    }

    return next();
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw err;
  }
};
