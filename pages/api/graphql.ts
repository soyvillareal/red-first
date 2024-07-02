import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { buildSchema } from 'type-graphql';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { IGraphQLContext } from '@/types';
import { Resolvers } from '@/server/graphql/resolvers';

import { authOptions } from './auth/[...nextauth]';

async function initializeApolloServer() {
  const schema = await buildSchema({
    resolvers: [Resolvers],
  });

  const server = new ApolloServer({ schema });
  return startServerAndCreateNextHandler(server, {
    context: async (
      req: NextApiRequest,
      res: NextApiResponse
    ): Promise<IGraphQLContext> => {
      const session = await getServerSession(req, res, authOptions);

      if (session === null) {
        throw new Error('Session is undefined!');
      }

      const newContext: IGraphQLContext = {
        headers: req.headers,
        session,
      };

      return newContext;
    },
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const handle = await initializeApolloServer();
  return handle(req, res);
}
