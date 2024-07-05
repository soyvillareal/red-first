import dayjs from 'dayjs';
import { Arg, Query, Resolver, UseMiddleware } from 'type-graphql';

import {
  type IGetAdditionalMovements,
  type IGetMovementsChart,
  type IGetRecentMovements,
  type IParsedMovementsChart,
  type TValidMonthsKeys,
} from '@/types/graphql/resolvers';
import { numberWithCurrency } from '@/lib/utils';
import { responseCodes } from '@/server/utils';
import { ReportsRepository } from '@/server/dataAccess/reports';
import { fillArray } from '@/lib/utils';
import { checkIsAdmin, checkIsLogged } from '@/server/middleware';
import { checkGetMovementsChart } from '@/server/middleware/reports';

import { GetAditionalMovements, MovementsChart } from '../schemas/reports';

@Resolver()
export class ReportsResolvers {
  protected reportsRepository: ReportsRepository;

  constructor() {
    this.reportsRepository = new ReportsRepository();
  }

  @Query(() => [MovementsChart], {
    name: 'getMovementsChart',
    description: 'Get movements report by month.',
  })
  @UseMiddleware(checkIsLogged, checkGetMovementsChart, checkIsAdmin)
  async getMovementsChart(
    @Arg('year', () => String, {
      nullable: true,
    })
    year?: string,
  ): Promise<IGetMovementsChart[]> {
    try {
      const parsedYear = year ? dayjs(year, 'YYYY') : dayjs();
      const startDate = parsedYear.startOf('year').toDate();
      const endDate = parsedYear.endOf('year').toDate();

      const movements = await this.reportsRepository.getChartMovements(
        startDate,
        endDate,
      );

      if (movements === null) {
        throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
      }

      const parsedMovementsChart: IParsedMovementsChart[] = fillArray(12).map(
        (_, index) => {
          const month = dayjs().month(index).startOf('month');
          return {
            name: month.format('MMM').toLowerCase() as TValidMonthsKeys,
            income: BigInt(0),
            expense: BigInt(0),
          };
        },
      );

      movements.forEach((movement) => {
        const movementDate = dayjs(movement.date);
        if (movementDate.year() === parsedYear.year()) {
          const monthIndex = movementDate.month();
          if (movement.concept === 'income') {
            parsedMovementsChart[monthIndex].income += BigInt(movement.amount);
          } else if (movement.concept === 'expense') {
            parsedMovementsChart[monthIndex].expense += BigInt(movement.amount);
          }
        }
      });

      return parsedMovementsChart.map((movement) => ({
        name: movement.name,
        income: movement.income.toString(),
        expense: (-movement.expense).toString(),
      }));
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
    }
  }

  @Query(() => GetAditionalMovements, {
    name: 'getAdditionalMovements',
    description: 'Get additional movements report.',
  })
  @UseMiddleware(checkIsLogged, checkIsAdmin)
  async getAdditionalMovements(): Promise<IGetAdditionalMovements> {
    try {
      const recentMovements = await this.reportsRepository.getRecentMovements();

      if (recentMovements === null) {
        throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
      }

      const recentMovementsParsed: IGetRecentMovements[] = recentMovements.map(
        (movement) => {
          let newAmount = numberWithCurrency(movement.amount);

          if (movement.concept === 'expense') {
            newAmount = `-${newAmount}`;
          }
          return {
            id: movement.id,
            name: movement.user.name ?? '',
            email: movement.user.email ?? '',
            image: movement.user.image ?? '',
            movement: newAmount,
            concept: movement.concept,
          };
        },
      );

      const startOfMonth = dayjs().startOf('month').toDate();
      const endOfMonth = dayjs().endOf('month').toDate();

      const countMovements = await this.reportsRepository.countMovementByRange(
        startOfMonth,
        endOfMonth,
      );

      if (countMovements === null) {
        throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
      }

      const totalIncome = await this.reportsRepository.getIncome();

      if (totalIncome === null) {
        throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
      }

      const totalExpenses = await this.reportsRepository.getExpenses();

      if (totalExpenses === null) {
        throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
      }

      const balance = BigInt(totalIncome ?? 0) - BigInt(totalExpenses ?? 0);

      return {
        balance: numberWithCurrency(balance ?? '0'),
        movements: countMovements,
        recentMovements: recentMovementsParsed,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
    }
  }
  @Query(() => [String], {
    name: 'getValidYears',
    description: 'Get valid years for movements report.',
  })
  @UseMiddleware(checkIsLogged, checkIsAdmin)
  async getValidYears(): Promise<string[]> {
    try {
      const years = await this.reportsRepository.getValidYears();
      if (years === null) {
        throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
      }
      return years.map((year) => year.year);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
    }
  }
}
