import { PrismaClient } from '@prisma/client';

import {
  type IGetUsersRepository,
  type IUpdateUserParams,
  type IGetUserByIdResult,
  IGetAccountDataResult,
} from '@/types/dataAccess/users';
import { type TValidsUserTypes } from '@/types/graphql/resolvers';
import { type IPaginationParams } from '@/types/graphql/pagination';

export class UsersRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public updateUser = async (
    userId: string,
    { name, role }: IUpdateUserParams
  ): Promise<boolean> => {
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          roles: {
            set: [role],
          },
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  public getUserById = async (
    userId: string
  ): Promise<IGetUserByIdResult | undefined | null> => {
    try {
      const foundUser = await this.prisma.user.findUnique({
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          roles: true,
        },
        where: {
          id: userId,
        },
      });

      if (foundUser === null) {
        return undefined;
      }

      return foundUser;
    } catch (error) {
      return null;
    }
  };

  public getTotalUsers = async (
    queryValue?: string
  ): Promise<number | null> => {
    try {
      const totalUsers = await this.prisma.user.count({
        where: {
          OR: [
            {
              name: {
                contains: queryValue,
                mode: 'insensitive',
              },
            },
            {
              email: {
                contains: queryValue,
                mode: 'insensitive',
              },
            },
          ],
        },
      });

      return totalUsers;
    } catch (error) {
      return null;
    }
  };

  public getUsers = async ({
    limit,
    skip,
    order,
    queryValue,
    fieldOrder = 'name',
  }: IPaginationParams<TValidsUserTypes>): Promise<
    IGetUsersRepository[] | null
  > => {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
        where: {
          OR: [
            {
              name: {
                contains: queryValue,
                mode: 'insensitive',
              },
            },
            {
              email: {
                contains: queryValue,
                mode: 'insensitive',
              },
            },
          ],
        },
        skip,
        take: limit,
        orderBy: {
          [fieldOrder]: order,
        },
      });

      return users;
    } catch (error) {
      return null;
    }
  };

  public getAccountData = async (
    userId: string
  ): Promise<IGetAccountDataResult | undefined | null> => {
    try {
      const foundUser = await this.prisma.account.findUnique({
        select: {
          id: true,
          access_token: true,
          providerAccountId: true,
          type: true,
          scope: true,
        },
        where: {
          userId,
        },
      });

      if (foundUser === null) {
        return undefined;
      }

      return foundUser;
    } catch (error) {
      return null;
    }
  };
}
