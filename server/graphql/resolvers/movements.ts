import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import dayjs from 'dayjs';
import { MovementConcept } from '@prisma/client';

import {
  type IGetMovements,
  type IGetMovementsWithTotal,
  type IPaginationMovementsArgs,
  type IPaginationMovementsParams,
  type TValidsMovementTypes,
} from '@/types/graphql/resolvers';
import { type IPageOptionsDataMeta } from '@/types/graphql/pagination';
import { indexBy, numberWithCurrency } from '@/lib/utils';
import {
  checkCreateMovement,
  checkGetMovements,
} from '@/server/middleware/movements';
import {
  checkIsAdmin,
  checkIsLogged,
  checkIsUser,
  checkPagination,
} from '@/server/middleware';
import { type IGraphQLContext } from '@/types';
import { MovementsRepository } from '@/server/dataAccess/movements';
import {
  PaginatedMovements,
  PaginationMovementsArgs,
} from '@/server/graphql/schemas/movements';
import {
  getSkipped,
  mockPagination,
  pageMeta,
  responseCodes,
} from '@/server/utils';
import { UsersRepository } from '@/server/dataAccess/users';
import { IGetUsersMovementByIds } from '@/types/dataAccess/users';

@Resolver()
export class MovementsResolvers {
  protected movementsRepository: MovementsRepository;
  protected usersRepository: UsersRepository;

  constructor() {
    this.movementsRepository = new MovementsRepository();
    this.usersRepository = new UsersRepository();
  }

  @Mutation(() => String, {
    name: 'createMovement',
    description: 'Create movement',
  })
  @UseMiddleware(checkIsLogged, checkCreateMovement, checkIsAdmin)
  async createMovement(
    @Arg('amount', () => String) amount: string,
    @Arg('date', () => String) date: string,
    @Arg('concept', () => MovementConcept) concept: MovementConcept,
    @Ctx() context: IGraphQLContext,
  ) {
    try {
      const userId = context?.session?.user.id;

      if (userId === undefined) {
        throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
      }

      const createdMovement = await this.movementsRepository.createMovement({
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
  @UseMiddleware(checkIsLogged, checkPagination, checkGetMovements, checkIsUser)
  async getMovements(
    @Arg('pagination', () => PaginationMovementsArgs)
    paginationArgs: IPaginationMovementsArgs<TValidsMovementTypes>,
  ): Promise<IPageOptionsDataMeta<IGetMovementsWithTotal>> {
    try {
      const { page, limit, order, filterType, userId, fieldOrder } =
        paginationArgs;

      const filterConcept = filterType as MovementConcept | null;

      const totalMovements = await this.movementsRepository.getTotalMovements(
        filterConcept,
        userId,
      );

      if (totalMovements === null) {
        throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
      }

      if (totalMovements === 0) {
        throw new Error(responseCodes.MOVEMENTS.NOT_FOUND);
      }

      const pageFilterOptions: IPaginationMovementsParams<TValidsMovementTypes> =
        {
          limit,
          skip: getSkipped(totalMovements, page, limit),
          order,
          filterType: filterConcept,
          userId,
          fieldOrder,
        };

      const movements = await this.movementsRepository.getMovements(
        pageFilterOptions,
      );

      if (movements === null) {
        throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
      }

      const users = await this.usersRepository.getUsersReportByIds(
        movements.map((movement) => movement.userId),
      );

      if (users === null) {
        throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
      }

      const indexedUsers = indexBy<IGetUsersMovementByIds>(users, 'id');

      let sumMovements = BigInt(0);
      const parsedMovements: IGetMovements[] = [];
      for (let i = 0; i < movements.length; i++) {
        const movement = movements[i];
        const decimalValueAsString = movement.amount.toString();
        const currentAmount = BigInt(decimalValueAsString);

        const userInfo = indexedUsers[movement.userId];

        parsedMovements.push({
          id: movement.id,
          userName: userInfo.name ?? '',
          amount: numberWithCurrency(decimalValueAsString),
          concept: movement.concept,
          date: dayjs(movement.date).format('YYYY-MM-DD'),
        });
        sumMovements += currentAmount;
      }

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
        },
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
        },
      );
    }
  }
}
