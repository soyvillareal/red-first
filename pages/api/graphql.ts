import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { buildSchema } from 'type-graphql';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { GraphQLContext } from '@/lib/types';
import { Resolvers } from '@/lib/graphql/resolvers';

import { authOptions } from './auth/[...nextauth]';

// Define una función asíncrona para inicializar el esquema y el servidor
async function initializeApolloServer() {
  const schema = await buildSchema({
    resolvers: [Resolvers],
  });

  const server = new ApolloServer({ schema });
  return startServerAndCreateNextHandler(server, {
    context: async (req: NextApiRequest, res: NextApiResponse): Promise<GraphQLContext> => {
      const session = await getServerSession(req, res, authOptions);
      return { headers: req.headers, session };
    },
  });
}

// Exporta una función que maneje las solicitudes, utilizando la inicialización del servidor
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const handle = await initializeApolloServer();
  return handle(req, res);
}
