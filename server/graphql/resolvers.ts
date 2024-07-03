import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import dayjs from 'dayjs';

import { EMovementConcept, type IGraphQLContext } from '../../types';
import { MovementsRepository } from '../dataAccess/movements';
import { CreateMovementArgs, PaginatedMovements } from './schemas/movements';
import { PaginationArgs } from './schemas/pagination';
import {
  responseCodes,
  getSkipped,
  mockPagination,
  numberWithCurrency,
  pageMeta,
} from '../utils';
import { checkIsLogged, checkPagination } from '../middleware';
import { type IGetMovementsWithTotal } from '@/types/graphql/resolvers';
import {
  type IPaginationParams,
  type IPageOptionsDataMeta,
} from '@/types/graphql/pagination';
import {
  checkCreateMovement,
  checkGetMovements,
} from '../middleware/movements';

@Resolver()
export class Resolvers {
  protected movementsRepository: MovementsRepository;

  constructor() {
    this.movementsRepository = new MovementsRepository();
  }

  @Mutation(() => String)
  @UseMiddleware(checkIsLogged, checkCreateMovement)
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
        throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
      }

      return responseCodes.MOVEMENTS.MOVEMENT_CREATED_SUCCESSFULLY;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
    }
  }

  @Query(() => PaginatedMovements, {
    name: 'getMovements',
    description: 'Get movements',
  })
  @UseMiddleware(checkIsLogged, checkPagination, checkGetMovements)
  async getMovements(
    @Arg('pagination', () => PaginationArgs) paginationArgs: PaginationArgs,
    @Ctx() context: IGraphQLContext
  ): Promise<IPageOptionsDataMeta<IGetMovementsWithTotal>> {
    try {
      const { page, limit, order, filterType, queryValue, fieldOrder } =
        paginationArgs;
      const userId = context.session.user.id;

      let filterConcept = filterType as EMovementConcept | null;

      const totalMovements = await this.movementsRepository.getTotalMovements(
        userId,
        filterConcept,
        queryValue
      );

      if (totalMovements === null) {
        throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
      }

      if (totalMovements === 0) {
        throw new Error(responseCodes.MOVEMENTS.NOT_FOUND);
      }

      const pageFilterOptions: IPaginationParams = {
        limit,
        skip: getSkipped(totalMovements, page, limit),
        order,
        filterType: filterConcept,
        queryValue,
        fieldOrder,
      };

      const totalAmounts = await this.movementsRepository.getTotalAmounts(
        {
          userId,
        },
        pageFilterOptions
      );

      if (totalAmounts === null) {
        throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
      }

      if (totalAmounts === undefined) {
        throw new Error(responseCodes.MOVEMENTS.NOT_FOUND);
      }

      const sumMovements = totalAmounts.reduce((acc, current) => {
        const currentAmount = BigInt(current.amount);
        return acc + currentAmount;
      }, BigInt(0));

      const movements = await this.movementsRepository.getMovements(
        {
          userId,
        },
        pageFilterOptions
      );

      if (movements === null) {
        throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
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
        return mockPagination<IGetMovementsWithTotal>(error.message, {
          movements: [],
          total: numberWithCurrency('0'),
        });
      }
      return mockPagination<IGetMovementsWithTotal>(
        responseCodes.ERROR.SOMETHING_WENT_WRONG,
        {
          movements: [],
          total: numberWithCurrency(BigInt(0)),
        }
      );
    }
  }
}
