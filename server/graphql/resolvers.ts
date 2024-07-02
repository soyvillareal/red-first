import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import dayjs from 'dayjs';

import { type IGraphQLContext } from '../../types';
import { MovementsRepository } from '../dataAccess/movements';
import { CreateMovementArgs, PaginatedMovements } from './schemas/movements';
import { PaginationArgs } from './schemas/pagination';
import { getSkipped, numberWithCurrency, pageMeta } from '../utils';
import { checkIsLogged, checkPagination } from '../middleware';
import {
  IGetMovementsWithTotal,
  type IGetMovements,
} from '@/types/graphql/resolvers';
import { type IPageOptionsDataMeta } from '@/types/graphql/pagination';

@Resolver()
export class Resolvers {
  protected movementsRepository: MovementsRepository;

  constructor() {
    this.movementsRepository = new MovementsRepository();
  }

  @Mutation(() => String)
  @UseMiddleware(checkIsLogged)
  async createMovement(
    @Arg('movements', () => CreateMovementArgs)
    { amount, concept, date }: CreateMovementArgs,
    @Ctx() context: IGraphQLContext
  ) {
    try {
      const userId = context.session.user.id;

      const createdMovement = await this.movementsRepository.createUser({
        userId,
        amount,
        concept,
        date,
      });

      if (createdMovement === null) {
        throw new Error('Whoops! Something went wrong!');
      }

      return 'Movement created successfully!';
    } catch (error) {
      return 'Whoops! Something went wrong!';
    }
  }

  @Query(() => PaginatedMovements, {
    name: 'getMovements',
    description: 'Get movements',
  })
  @UseMiddleware(checkIsLogged, checkPagination)
  async getMovements(
    @Arg('pagination', () => PaginationArgs) paginationArgs: PaginationArgs,
    @Ctx() context: IGraphQLContext
  ): Promise<IPageOptionsDataMeta<IGetMovementsWithTotal> | string> {
    try {
      const { page, limit, order } = paginationArgs;
      const userId = context.session.user.id;

      const totalMovements = await this.movementsRepository.getTotalMovements(
        userId
      );

      if (totalMovements === null) {
        throw new Error(`Whoops! Something went wrong!`);
      }

      if (totalMovements === 0) {
        throw new Error('No movements found!');
      }

      const pageFilterOptions = {
        limit,
        skip: getSkipped(totalMovements, page, limit),
        order,
      };

      const sumMovements = await this.movementsRepository.getSumMovements(
        {
          userId,
        },
        pageFilterOptions
      );

      if (sumMovements === null) {
        throw new Error(`Whoops! Something went wrong!`);
      }

      if (sumMovements === undefined) {
        throw new Error('No movements found!');
      }

      const movements = await this.movementsRepository.getMovements(
        {
          userId,
        },
        pageFilterOptions
      );

      if (movements === null) {
        throw new Error(`Whoops! Something went wrong!`);
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
          amount: numberWithCurrency(movement.amount),
          concept: movement.concept,
          date: dayjs(movement.date).format('YYYY-MM-DD'),
        };
      });

      const entities = pageMeta<IGetMovementsWithTotal>(
        {
          movements: parsedMovements,
          total: numberWithCurrency(sumMovements),
        },
        {
          itemCount: totalMovements,
          pageOptions: {
            limit,
            page,
          },
        }
      );

      return entities;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return error.message;
      }
      return 'Whoops! Something went wrong!';
    }
  }
}
