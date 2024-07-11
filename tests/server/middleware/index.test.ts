import {
  checkIsAdmin,
  checkIsLogged,
  checkPagination,
} from '@/server/middleware';
import { responseCodes } from '@/server/utils';
import { EUserRole, IGraphQLContext, INextAuthUserSession } from '@/types';
import { ResolverData } from 'type-graphql';
import { mockResolver } from './middleware.mock';
import { defaultLimit } from '@/lib/contants';

describe('checkIsLogged Middleware', () => {
  it('should throw USER_NOT_LOGGED_IN if user is not in session', async () => {
    const resolverNotLoggedIn: ResolverData<IGraphQLContext> = {
      ...mockResolver,
      context: {
        ...mockResolver.context,
        session: expect.any(Object),
      },
    };
    const next = jest.fn();

    await expect(checkIsLogged(resolverNotLoggedIn, next)).rejects.toThrow(
      responseCodes.ERROR.USER_NOT_LOGGED_IN,
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if user is in session', async () => {
    const resolverUser: ResolverData<IGraphQLContext> = {
      ...mockResolver,
      context: {
        ...mockResolver.context,
        session: {
          user: {
            id: expect.any(String),
            name: expect.any(String),
            email: expect.any(String),
            image: expect.any(String),
            roles: [EUserRole.ADMIN],
          },
          expires: expect.any(String),
          accessToken: expect.any(String),
        },
      },
    };
    const next = jest.fn();

    await checkIsLogged(resolverUser, next);
    expect(next).toHaveBeenCalled();
  });
});

describe('checkIsAdmin Middleware', () => {
  it('should throw USER_NOT_LOGGED_IN if user is not in session', async () => {
    const resolverNotLoggedIn: ResolverData<IGraphQLContext> = {
      ...mockResolver,
      context: {
        ...mockResolver.context,
        session: {
          user: undefined as unknown as INextAuthUserSession,
          expires: expect.any(String),
          accessToken: expect.any(String),
        },
      },
    };
    const next = jest.fn();

    await expect(checkIsAdmin(resolverNotLoggedIn, next)).rejects.toThrow(
      responseCodes.ERROR.USER_NOT_LOGGED_IN,
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should throw NOT_AUTHORIZED if user is not an admin', async () => {
    const mockUnauthorized: ResolverData<IGraphQLContext> = {
      ...mockResolver,
      context: {
        ...mockResolver.context,
        session: {
          user: {
            id: expect.any(String),
            name: expect.any(String),
            email: expect.any(String),
            image: expect.any(String),
            roles: [EUserRole.USER],
          },
          expires: expect.any(String),
          accessToken: expect.any(String),
        },
      },
    };

    const next = jest.fn();

    await expect(checkIsAdmin(mockUnauthorized, next)).rejects.toThrow(
      responseCodes.UNAUTHORIZED.NOT_AUTHORIZED,
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if user is an admin', async () => {
    const next = jest.fn();

    await checkIsAdmin(mockResolver, next);
    expect(next).toHaveBeenCalled();
  });
});

describe('checkPagination Middleware', () => {
  const next = jest.fn();

  it('should throw PAGE_UNDEFINED if page is undefined', async () => {
    const resolverPagination: ResolverData<IGraphQLContext> = {
      ...mockResolver,
      args: {
        pagination: { limit: defaultLimit, order: 'asc' },
      },
    };

    await expect(checkPagination(resolverPagination, next)).rejects.toThrow(
      responseCodes.PAGINATION.PAGE_UNDEFINED,
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should page through if page is not number', async () => {
    const resolverPagination: ResolverData<IGraphQLContext> = {
      ...mockResolver,
      args: {
        pagination: { page: '1', limit: defaultLimit, order: 'asc' },
      },
    };

    await expect(checkPagination(resolverPagination, next)).rejects.toThrow(
      responseCodes.PAGINATION.PAGE_MUST_BE_NUMBER,
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should limit through if limit is not valid', async () => {
    const resolverPagination: ResolverData<IGraphQLContext> = {
      ...mockResolver,
      args: {
        pagination: { limit: 9999, page: 1, order: 'asc' },
      },
    };

    await expect(checkPagination(resolverPagination, next)).rejects.toThrow(
      responseCodes.PAGINATION.LIMIT_INVALID,
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should order through if order is not valid', async () => {
    const resolverPagination: ResolverData<IGraphQLContext> = {
      ...mockResolver,
      args: {
        pagination: { limit: defaultLimit, page: 1, order: 'invalid' },
      },
    };

    await expect(checkPagination(resolverPagination, next)).rejects.toThrow(
      responseCodes.PAGINATION.ORDER_INVALID,
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next if all it's ok", async () => {
    const resolverPagination: ResolverData<IGraphQLContext> = {
      ...mockResolver,
      args: {
        pagination: { limit: defaultLimit, page: 1, order: 'asc' },
      },
    };

    await checkPagination(resolverPagination, next);
    expect(next).toHaveBeenCalled();
  });
});
