import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import dayjs from 'dayjs';
import { PrismaClient } from '@prisma/client';

import { CreateMovementArgs, GetMovementsWithTotal } from './definitions';
import { type GraphQLContext } from '../types';

const prisma = new PrismaClient();

@Resolver()
export class Resolvers {
  @Mutation(() => Boolean)
  //   @UseMiddleware(checkJWT, checkIsLogged, checkCreateUserWords)
  async createMovement(
    @Arg('movements', () => CreateMovementArgs)
    { amount, concept, date }: CreateMovementArgs,
    @Ctx() context: GraphQLContext
  ) {
    try {
      const userId = context.session.user?.id as string;

      if (userId === undefined) {
        console.error(
          'UserID is undefined. User must be logged in to create a movement.'
        );
        throw new Error(
          'Authentication error: User must be logged in to create a movement.'
        );
      }

      const createdMovement = await prisma.movements.create({
        data: {
          user: { connect: { id: userId } },
          amount: parseFloat(amount),
          concept,
          date: new Date(date),
        },
      });

      if (createdMovement === undefined) {
        throw new Error('Whoops! Something went wrong!');
      }

      return true;
    } catch (error) {
      console.log('error: ', error);
      return false;
    }
  }

  @Query(() => GetMovementsWithTotal, { nullable: true })
  //   @UseMiddleware(checkJWT, checkIsLogged, checkGetUserWordsByType)
  async getMovements(@Ctx() context: GraphQLContext) {
    try {
      const userId = context.session.user?.id as string;

      const totalMovements = await prisma.movements.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          userId,
        },
      });

      const movements = await prisma.movements.findMany({
        select: {
          id: true,
          amount: true,
          concept: true,
          date: true,
          user: {
            select: {
              name: true,
            },
          },
        },
        where: {
          userId,
        },
        orderBy: {
          date: 'desc',
        },
      });

      if (
        movements === null ||
        movements === undefined ||
        movements.length === 0
      ) {
        throw new Error(`No results found!`);
      }

      const parsedMovements = movements.map((movement) => {
        let userName = '';
        if (
          movement.user !== null &&
          movement.user !== undefined &&
          movement.user.name !== null &&
          movement.user.name !== undefined
        ) {
          userName = movement.user.name;
        }

        return {
          id: movement.id,
          userName,
          amount: movement.amount.toString(),
          concept: movement.concept,
          date: dayjs(movement.date).format('YYYY-MM-DD'),
        };
      });

      return {
        total: totalMovements._sum.amount?.toString() ?? '0',
        movements: parsedMovements,
      };
    } catch (error) {
      console.log('error: ', error);
      return null;
    }
  }

  @Query(() => Boolean)
  async isServerAlive() {
    return true;
  }
}
