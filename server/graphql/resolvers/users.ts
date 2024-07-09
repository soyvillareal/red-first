import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';

import { UsersRepository } from '@/server/dataAccess/users';
import {
  checkIsAdmin,
  checkIsLogged,
  checkPagination,
} from '@/server/middleware';
import { IGetUsers, TValidsUserTypes } from '@/types/graphql/resolvers';
import {
  EUserRole,
  EUserRoleRoleNormalized,
  type IGraphQLContext,
} from '@/types';
import {
  getSkipped,
  mockPagination,
  pageMeta,
  responseCodes,
  updateUserRoleInProvider,
} from '@/server/utils';
import {
  IPageOptionsDataMeta,
  type IPaginationArgs,
  IPaginationParams,
} from '@/types/graphql/pagination';
import { checkGetUsers, checkUpdateUser } from '@/server/middleware/users';
import {
  FindUserByNameOrEmail,
  PaginatedUsers,
} from '@/server/graphql/schemas/users';
import { PaginationArgs } from '@/server/graphql/schemas/pagination';

@Resolver()
export class UsersResolvers {
  protected usersRepository: UsersRepository;
  protected parsedRoles = {
    [EUserRoleRoleNormalized.admin]: EUserRole.ADMIN,
    [EUserRoleRoleNormalized.user]: EUserRole.USER,
  };

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  @Mutation(() => String, {
    name: 'updateUser',
    description: 'Update user',
  })
  @UseMiddleware(checkIsLogged, checkUpdateUser, checkIsAdmin)
  async updateUser(
    @Arg('userId', () => String, { nullable: false }) userId: string,
    @Arg('name', () => String) name: string,
    @Arg('role', () => EUserRoleRoleNormalized) role: EUserRoleRoleNormalized,
    @Ctx() context: IGraphQLContext,
  ) {
    try {
      const userEditorId = context?.session?.user.id as string;

      if (userEditorId === userId) {
        const foundUserEditor = await this.usersRepository.getUserById(
          userEditorId,
        );

        if (foundUserEditor === null) {
          throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
        }

        if (foundUserEditor === undefined) {
          throw new Error(responseCodes.USERS.NOT_FOUND);
        }

        if (
          foundUserEditor.roles.includes(EUserRole.ADMIN) === true &&
          role === EUserRoleRoleNormalized.user
        ) {
          throw new Error(responseCodes.USERS.NOT_AUTHORIZED_TO_THIS_ACTION);
        }
      }

      const foundAccount = await this.usersRepository.getAccountData(userId);

      if (foundAccount === null) {
        throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
      }

      if (foundAccount === undefined) {
        throw new Error(responseCodes.USERS.NOT_FOUND);
      }

      const updatedRole = await updateUserRoleInProvider(
        foundAccount.providerAccountId,
        role,
      );

      if (updatedRole === false) {
        throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
      }

      const createdMovement = await this.usersRepository.updateUser(userId, {
        name,
        role: this.parsedRoles[role],
      });

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
  @UseMiddleware(checkIsLogged, checkPagination, checkGetUsers, checkIsAdmin)
  async getUsers(
    @Arg('pagination', () => PaginationArgs)
    paginationArgs: IPaginationArgs<TValidsUserTypes>,
  ): Promise<IPageOptionsDataMeta<IGetUsers[]>> {
    try {
      const { page, limit, order, queryValue, fieldOrder } = paginationArgs;

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
          phone: user.phone ?? '--',
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
        [],
      );
    }
  }

  @Query(() => [FindUserByNameOrEmail], {
    name: 'findUserByNameOrEmail',
    description: 'Find user by name or email',
  })
  async findUserByNameOrEmail(
    @Arg('queryValue', () => String) queryValue: string,
  ): Promise<FindUserByNameOrEmail[]> {
    try {
      const users = await this.usersRepository.findUserByNameOrEmail(
        queryValue,
      );

      if (users === null) {
        throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
      }

      if (users.length === 0) {
        throw new Error(responseCodes.USERS.NOT_FOUND);
      }

      return users;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
    }
  }
}
