import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';

import { UsersRepository } from '@/server/dataAccess/users';
import { checkIsLogged, checkPagination } from '@/server/middleware';
import {
  IGetUsers,
  TValidsUserTypes,
  type IUpdateUserArgs,
} from '@/types/graphql/resolvers';
import { type IGraphQLContext } from '@/types';
import {
  getSkipped,
  mockPagination,
  pageMeta,
  responseCodes,
} from '@/server/utils';
import {
  IPageOptionsDataMeta,
  IPaginationParams,
  type IPaginationArgs,
} from '@/types/graphql/pagination';
import { checkGetUsers, checkUpdateUser } from '@/server/middleware/users';

import { PaginatedUsers, UpdateUserArgs } from '../schemas/users';
import { PaginationArgs } from '../schemas/pagination';

@Resolver()
export class UsersResolvers {
  protected usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  @Mutation(() => String)
  @UseMiddleware(checkIsLogged, checkUpdateUser)
  async updateUser(
    @Arg('user', () => UpdateUserArgs)
    { userId: toEditUserId, name, role }: IUpdateUserArgs,
    @Ctx() context: IGraphQLContext
  ) {
    try {
      const userId = context.session.user.id;

      const createdMovement = await this.usersRepository.updateUser(
        toEditUserId,
        {
          name,
          role,
        }
      );

      if (createdMovement === null) {
        throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
      }

      return responseCodes.USERS.USER_UPDATED_SUCCESSFULLY;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
    }
  }

  @Query(() => PaginatedUsers, {
    name: 'getUsers',
    description: 'Get users',
  })
  @UseMiddleware(checkIsLogged, checkPagination, checkGetUsers)
  async getUsers(
    @Arg('pagination', () => PaginationArgs)
    paginationArgs: IPaginationArgs<TValidsUserTypes>,
    @Ctx() context: IGraphQLContext
  ): Promise<IPageOptionsDataMeta<IGetUsers[]>> {
    try {
      const { page, limit, order, filterType, queryValue, fieldOrder } =
        paginationArgs;
      const userId = context.session.user.id;

      const totalUsers = await this.usersRepository.getTotalUsers(queryValue);

      if (totalUsers === null) {
        throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
      }

      if (totalUsers === 0) {
        throw new Error(responseCodes.USERS.NOT_FOUND);
      }

      const pageFilterOptions: IPaginationParams<TValidsUserTypes> = {
        limit,
        skip: getSkipped(totalUsers, page, limit),
        order,
        filterType: null,
        queryValue,
        fieldOrder,
      };

      const users = await this.usersRepository.getUsers(pageFilterOptions);

      if (users === null) {
        throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
      }

      const parsedUsers: IGetUsers[] = users.map((user) => {
        return {
          id: user.id,
          name: user.name ?? '',
          email: user.email ?? '',
          phone: user.phone ?? '',
        };
      });

      const entities = pageMeta<IGetUsers[]>(parsedUsers, {
        itemCount: totalUsers,
        pageOptions: {
          limit,
          page,
        },
      });

      return entities;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return mockPagination<IGetUsers[]>(error.message, []);
      }
      return mockPagination<IGetUsers[]>(
        responseCodes.ERROR.SOMETHING_WENT_WRONG,
        []
      );
    }
  }
}
