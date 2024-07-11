import dayjs from 'dayjs';

import {
  IGetAdditionalMovements,
  IGetMovementsChart,
  IGetRecentMovements,
  IParsedMovementsChart,
  TValidMonthsKeys,
} from '@/types/graphql/resolvers';
import { IGetUsersReportByIds } from '@/types/dataAccess/users';
import { responseCodes } from '@/server/utils';
import { fillArray, indexBy, numberWithCurrency } from '@/lib/utils';
import { ReportsRepository } from '@/server/dataAccess/reports';
import { UsersRepository } from '@/server/dataAccess/users';

const reportsRepository = new ReportsRepository();
const usersRepository = new UsersRepository();

export const yearsSSR = async (): Promise<string[]> => {
  const years = await reportsRepository.getValidYears();
  if (years === null) {
    throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
  }
  return years.map((year) => year.year);
};

export const movementsChartSSR = async (
  year?: string,
): Promise<IGetMovementsChart[]> => {
  const parsedYear = year ? dayjs(year, 'YYYY') : dayjs();
  const startDate = parsedYear.startOf('year').toDate();
  const endDate = parsedYear.endOf('year').toDate();

  const movements = await reportsRepository.getChartMovements(
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
      const decimalValueAsString = movement.amount.toString();
      if (movement.concept === 'income') {
        parsedMovementsChart[monthIndex].income += BigInt(decimalValueAsString);
      } else if (movement.concept === 'expense') {
        parsedMovementsChart[monthIndex].expense +=
          BigInt(decimalValueAsString);
      }
    }
  });

  return parsedMovementsChart.map((movement) => ({
    name: movement.name,
    income: movement.income.toString(),
    expense: (-movement.expense).toString(),
  }));
};

export const additionalMovementsSSR =
  async (): Promise<IGetAdditionalMovements> => {
    const recentMovements = await reportsRepository.getRecentMovements();

    if (recentMovements === null) {
      throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
    }

    const users = await usersRepository.getUsersReportByIds(
      recentMovements.map((movement) => movement.userId),
    );

    if (users === null) {
      throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
    }

    const indexedUsers = indexBy<IGetUsersReportByIds>(users, 'id');

    const recentMovementsParsed: IGetRecentMovements[] = recentMovements.map(
      (movement) => {
        let newAmount = numberWithCurrency(movement.amount.toString());

        if (movement.concept === 'expense') {
          newAmount = `-${newAmount}`;
        }

        const userInfo = indexedUsers[movement.userId];

        return {
          id: movement.id,
          name: userInfo.name ?? '',
          email: userInfo.email ?? '',
          image: userInfo.image ?? '',
          movement: newAmount,
          concept: movement.concept,
        };
      },
    );

    const startOfMonth = dayjs().startOf('month').toDate();
    const endOfMonth = dayjs().endOf('month').toDate();

    const countMovements = await reportsRepository.countMovementByRange(
      startOfMonth,
      endOfMonth,
    );

    if (countMovements === null) {
      throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
    }

    const totalIncome = await reportsRepository.getIncome();

    if (totalIncome === null) {
      throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
    }

    const totalExpenses = await reportsRepository.getExpenses();

    if (totalExpenses === null) {
      throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
    }

    const balance = BigInt(totalIncome ?? 0) - BigInt(totalExpenses ?? 0);

    return {
      balance: numberWithCurrency(balance ?? '0'),
      movements: countMovements,
      recentMovements: recentMovementsParsed,
    };
  };
