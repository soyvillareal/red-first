import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { buildSchema, registerEnumType } from 'type-graphql';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { MovementConcept } from '@prisma/client';

import { IGraphQLContext } from '@/types';
import { MovementsResolvers } from '@/server/graphql/resolvers/movements';
import { UsersResolvers } from '@/server/graphql/resolvers/users';
import { ReportsResolvers } from '@/server/graphql/resolvers/reports';

import { authOptions } from './auth/[...nextauth]';

async function initializeApolloServer() {
  registerEnumType(MovementConcept, {
    name: 'EMovementConcept',
    description: 'Movements concepts',
    valuesConfig: {
      expense: { description: 'Expense' },
      income: { description: 'Income' },
    },
  });

  const schema = await buildSchema({
    resolvers: [MovementsResolvers, UsersResolvers, ReportsResolvers],
  });

  const server = new ApolloServer({ schema });
  return startServerAndCreateNextHandler(server, {
    context: async (
      req: NextApiRequest,
      res: NextApiResponse,
    ): Promise<IGraphQLContext> => {
      const session = await getServerSession(req, res, authOptions);

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
  res: NextApiResponse,
) {
  const handle = await initializeApolloServer();
  return handle(req, res);
}
