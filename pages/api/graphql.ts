import 'reflect-metadata';
import {
  ApolloServer,
  BaseContext,
  GraphQLRequestContext,
  GraphQLRequestContextDidEncounterErrors,
  GraphQLRequestContextWillSendResponse,
  GraphQLRequestListener,
} from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { buildSchema, registerEnumType } from 'type-graphql';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { MovementConcept } from '@prisma/client';
import * as expressRateLimit from 'express-rate-limit';

import { EUserRoleRoleNormalized, IGraphQLContext } from '@/types';
import { MovementsResolvers } from '@/server/graphql/resolvers/movements';
import { UsersResolvers } from '@/server/graphql/resolvers/users';
import { ReportsResolvers } from '@/server/graphql/resolvers/reports';

import { authOptions } from './auth/[...nextauth]';
import { adaptNextRequest } from '@/server/adapters/graphql';
import { env } from '@/lib/env';
import { logger as loggerFn } from '@/server/utils';

export const initializeApolloServer = async () => {
  registerEnumType(MovementConcept, {
    name: 'EMovementConcept',
    description: 'Movements concepts',
    valuesConfig: {
      expense: { description: 'Expense' },
      income: { description: 'Income' },
    },
  });

  registerEnumType(EUserRoleRoleNormalized, {
    name: 'EUserRole',
    description: 'User roles',
    valuesConfig: {
      admin: { description: 'Administrator' },
      user: { description: 'User' },
    },
  });

  const schema = await buildSchema({
    resolvers: [MovementsResolvers, UsersResolvers, ReportsResolvers],
  });

  const logger = loggerFn();

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        requestDidStart(
          requestContext: GraphQLRequestContext<BaseContext>,
        ): Promise<void | GraphQLRequestListener<BaseContext>> {
          logger.info('Request started', {
            query: requestContext.request.query,
          });

          return new Promise((resolve) => {
            resolve({
              didEncounterErrors(
                requestContext: GraphQLRequestContextDidEncounterErrors<BaseContext>,
              ) {
                logger.error('An error occurred', {
                  errors: requestContext.errors,
                });

                return Promise.resolve();
              },
              willSendResponse(
                requestContext: GraphQLRequestContextWillSendResponse<BaseContext>,
              ): Promise<void> {
                logger.info('Response', { response: requestContext.response });

                return Promise.resolve();
              },
            });
          });
        },
      },
    ],
  });
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
};

const rateLimiter = expressRateLimit.rateLimit({
  windowMs: parseInt(env.TIME_TO_WAIT_LIMIT) * 60 * 1000,
  max: parseInt(env.MAX_REQUESTS_LIMIT),
  handler: (req, res) => {
    res.status(429).json('Too many requests, please try again later.');
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { req: adaptedReq, res: adaptedRes } = adaptNextRequest(req, res);
  rateLimiter(adaptedReq, adaptedRes, async () => {
    const handle = await initializeApolloServer();
    return handle(req, res);
  });
}
