import {
  type MovementConcept,
  type Movements,
  PrismaClient,
} from '@prisma/client';

import {
  type ICreateUserRepository,
  type IGetMovementsRepository,
  type IGetTotalAmountsResult,
} from '@/types/dataAccess/movements';
import { type IPaginationParams } from '@/types/graphql/pagination';
import { TValidsMovementTypes } from '@/types/graphql/resolvers';

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
          amount,
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
    userId: string,
    {
      limit,
      skip,
      order,
      queryValue,
      filterType,
      fieldOrder = 'date',
    }: IPaginationParams<TValidsMovementTypes>,
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
          concept: filterType || undefined,
          OR: [
            {
              amount: {
                contains: queryValue,
                mode: 'insensitive',
              },
            },
            {
              user: {
                name: {
                  contains: queryValue,
                  mode: 'insensitive',
                },
              },
            },
          ],
        },
        skip,
        take: limit,
        orderBy:
          fieldOrder === 'userName'
            ? {
                user: {
                  name: order,
                },
              }
            : {
                [fieldOrder]: order,
              },
      });

      return movements;
    } catch (error) {
      return null;
    }
  };

  public getTotalMovements = async (
    userId: string,
    filterType: MovementConcept | null,
    queryValue?: string,
  ): Promise<number | null> => {
    try {
      const totalMovements = await this.prisma.movements.count({
        where: {
          userId,
          concept: filterType || undefined,
          OR: [
            {
              amount: {
                contains: queryValue,
                mode: 'insensitive',
              },
            },
            {
              user: {
                name: {
                  contains: queryValue,
                  mode: 'insensitive',
                },
              },
            },
          ],
        },
      });

      return totalMovements;
    } catch (error) {
      return null;
    }
  };

  public getTotalAmounts = async (
    userId: string,
    {
      limit,
      skip,
      order,
      filterType,
      queryValue,
      fieldOrder = 'date',
    }: IPaginationParams<TValidsMovementTypes>,
  ): Promise<IGetTotalAmountsResult[] | undefined | null> => {
    try {
      const totalAmounts = await this.prisma.movements.findMany({
        select: {
          amount: true,
        },
        where: {
          userId,
          concept: filterType || undefined,
          OR: [
            {
              amount: {
                contains: queryValue,
                mode: 'insensitive',
              },
            },
            {
              user: {
                name: {
                  contains: queryValue,
                  mode: 'insensitive',
                },
              },
            },
          ],
        },
        skip,
        take: limit,
        orderBy:
          fieldOrder === 'userName'
            ? {
                user: {
                  name: order,
                },
              }
            : {
                [fieldOrder]: order,
              },
      });

      if (totalAmounts === null) {
        return undefined;
      }

      return totalAmounts;
    } catch (error) {
      return null;
    }
  };
}
