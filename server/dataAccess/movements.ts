import { Movements, PrismaClient } from '@prisma/client';

import {
  type IGetMovementsRepository,
  type ICreateUserRepository,
  type IGetMovementsParams,
} from '@/types/dataAccess/movements';
import { IPaginationParams } from '@/types/graphql/pagination';

export class MovementsRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public createUser = async ({
    userId,
    amount,
    concept,
    date,
  }: ICreateUserRepository): Promise<Movements | null> => {
    try {
      const createdMovement = await this.prisma.movements.create({
        data: {
          user: { connect: { id: userId } },
          amount: parseFloat(amount),
          concept,
          date: new Date(date),
        },
      });

      return createdMovement;
    } catch (error) {
      return null;
    }
  };

  public getMovements = async (
    { userId }: IGetMovementsParams,
    { limit, skip, order }: IPaginationParams
  ): Promise<IGetMovementsRepository[] | null> => {
    try {
      const movements = await this.prisma.movements.findMany({
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
        skip,
        take: limit,
        orderBy: {
          id: order,
        },
      });

      return movements;
    } catch (error) {
      return null;
    }
  };

  public getTotalMovements = async (userId: string): Promise<number | null> => {
    try {
      const totalMovements = await this.prisma.movements.count({
        where: {
          userId,
        },
      });

      return totalMovements;
    } catch (error) {
      return null;
    }
  };

  public getSumMovements = async (
    { userId }: IGetMovementsParams,
    { limit, skip, order }: IPaginationParams
  ): Promise<bigint | undefined | null> => {
    try {
      const totalMovements = await this.prisma.movements.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          userId,
        },
        skip,
        take: limit,
        orderBy: {
          id: order,
        },
      });

      if (totalMovements === null) {
        return undefined;
      }

      return totalMovements._sum.amount ?? undefined;
    } catch (error) {
      return null;
    }
  };
}
