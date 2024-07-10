import { type MovementConcept, type Movements } from '@prisma/client';

import {
  type ICreateUserRepository,
  type IGetMovementsRepository,
} from '@/types/dataAccess/movements';
import {
  type IPaginationMovementsParams,
  type TValidsMovementTypes,
} from '@/types/graphql/resolvers';
import dayjs from 'dayjs';
import prisma from '@/lib/db';

export class MovementsRepository {
  protected prisma = prisma;
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

  public getMovements = async ({
    limit,
    skip,
    order,
    userId,
    filterType,
    fieldOrder = 'date',
  }: IPaginationMovementsParams<TValidsMovementTypes>): Promise<
    IGetMovementsRepository[] | null
  > => {
    try {
      const movements = await this.prisma.movements.findMany({
        select: {
          id: true,
          userId: true,
          amount: true,
          concept: true,
          date: true,
        },
        where: {
          concept: filterType || undefined,
          userId: userId || undefined,
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
    filterType: MovementConcept | null,
    userId: string | null,
  ): Promise<number | null> => {
    try {
      const totalMovements = await this.prisma.movements.count({
        where: {
          concept: filterType || undefined,
          userId: userId || undefined,
        },
      });

      return totalMovements;
    } catch (error) {
      return null;
    }
  };
}
