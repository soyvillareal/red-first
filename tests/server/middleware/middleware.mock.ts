import { EUserRole, IGraphQLContext } from '@/types';
import { ResolverData } from 'type-graphql';

export const mockResolver: ResolverData<IGraphQLContext> = {
  context: {
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
    headers: expect.any(Object),
  },
  args: expect.any(Object),
  info: {
    fieldName: expect.any(String),
    fieldNodes: expect.arrayContaining([expect.any(Object)]),
    returnType: expect.any(Object),
    parentType: expect.any(Object),
    schema: expect.any(Object),
    fragments: expect.any(Object),
    path: expect.any(Object),
    rootValue: expect.any(Object),
    operation: expect.any(Object),
    variableValues: expect.any(Object),
  },
  root: expect.any(Object),
};
