import { PrismaClient } from '@prisma/client';

import { type IGetUserByIdResult } from '@/types/dataAccess/users';

export class UsersRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public getUserById = async (
    userId: string
  ): Promise<IGetUserByIdResult | null> => {
    try {
      const foundUser = await this.prisma.user.findUnique({
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
        where: {
          id: userId,
        },
      });

      return foundUser;
    } catch (error) {
      return null;
    }
  };
}
