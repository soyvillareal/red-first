import { MovementConcept, Prisma, PrismaClient } from '@prisma/client';

import {
  type IGetBalanceResult,
  type IGetMovementsChartRepository,
  type IGetRecentMovementsRepository,
  type IGetValidYearsResult,
} from '@/types/dataAccess/reports';

export class ReportsRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public findMovementsPerRange = async (
    startDate: Date,
    endDate: Date,
  ): Promise<number | null> => {
    try {
      const count = await this.prisma.movements.count({
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      return count;
    } catch (error) {
      return null;
    }
  };

  public getChartMovements = async (
    startDate: Date,
    endDate: Date,
  ): Promise<IGetMovementsChartRepository[] | null> => {
    try {
      const movements = await this.prisma.movements.findMany({
        select: {
          amount: true,
          concept: true,
          date: true,
        },
        where: {
          date: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        },
      });

      return movements;
    } catch (error) {
      return null;
    }
  };

  public getRecentMovements = async (): Promise<
    IGetRecentMovementsRepository[] | null
  > => {
    try {
      const movements = await this.prisma.movements.findMany({
        select: {
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
          amount: true,
          concept: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 5,
      });

      return movements;
    } catch (error) {
      return null;
    }
  };

  public countMovementByRange = async (
    startDate: Date,
    endDate: Date,
  ): Promise<number | null> => {
    try {
      const count = await this.prisma.movements.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      return count;
    } catch (error) {
      return null;
    }
  };

  public getIncome = async (): Promise<string | undefined | null> => {
    try {
      const [{ count }] = await this.prisma.$queryRaw<IGetBalanceResult[]>(
        Prisma.raw(
          `SELECT SUM(CAST(amount AS NUMERIC)) as count FROM movements WHERE concept = '${MovementConcept.income}'`,
        ),
      );

      if (count === null) {
        return undefined;
      }

      return count;
    } catch (error) {
      return null;
    }
  };

  public getExpenses = async (): Promise<string | undefined | null> => {
    try {
      const [{ count }] = await this.prisma.$queryRaw<IGetBalanceResult[]>(
        Prisma.raw(
          `SELECT SUM(CAST(amount AS NUMERIC)) as count FROM movements WHERE concept = '${MovementConcept.expense}'`,
        ),
      );

      if (count === null) {
        return undefined;
      }

      return count;
    } catch (error) {
      return null;
    }
  };

  public getValidYears = async (): Promise<IGetValidYearsResult[] | null> => {
    try {
      const years = await this.prisma.$queryRaw<IGetValidYearsResult[]>(
        Prisma.raw(
          `SELECT EXTRACT(YEAR FROM date) as year FROM movements GROUP BY year ORDER BY year DESC`,
        ),
      );

      return years;
    } catch (error) {
      return null;
    }
  };
}
