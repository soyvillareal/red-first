import {
  type MovementConcept,
  type Movements,
  PrismaClient,
} from '@prisma/client';

import {
  type ICreateUserRepository,
  type IGetMovementsRepository,
} from '@/types/dataAccess/movements';
import { type IPaginationParams } from '@/types/graphql/pagination';
import { TValidsMovementTypes } from '@/types/graphql/resolvers';
import dayjs from 'dayjs';

export class MovementsRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public createMovement = async ({
    userId,
    amount,
    concept,
    date,
  }: ICreateUserRepository): Promise<Movements | null> => {
    try {
      const createdMovement = await this.prisma.movements.create({
        data: {
          userId,
          amount,
          concept,
          date: dayjs(date).toDate(),
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
      let whereQuery: Record<string, unknown> = {};
      if (queryValue !== undefined && queryValue !== '') {
        whereQuery = {
          amount: {
            contains: queryValue,
            mode: 'insensitive',
          },
        };
      }
      const movements = await this.prisma.movements.findMany({
        select: {
          id: true,
          userId: true,
          amount: true,
          concept: true,
          date: true,
        },
        where: {
          userId,
          concept: filterType || undefined,
          ...whereQuery,
        },
        skip,
        take: limit,
        orderBy: {
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
      let whereQuery: Record<string, unknown> = {};
      if (queryValue !== undefined && queryValue !== '') {
        whereQuery = {
          amount: {
            contains: queryValue,
            mode: 'insensitive',
          },
        };
      }
      const totalMovements = await this.prisma.movements.count({
        where: {
          userId,
          concept: filterType || undefined,
          ...whereQuery,
        },
      });

      return totalMovements;
    } catch (error) {
      return null;
    }
  };
}
