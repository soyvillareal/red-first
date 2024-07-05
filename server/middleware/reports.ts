import dayjs from 'dayjs';
import { MiddlewareFn } from 'type-graphql';

import { IGraphQLContext } from '@/types';

import { responseCodes } from '../utils';
import { ReportsRepository } from '../dataAccess/reports';

const reportsRepository = new ReportsRepository();

export const checkGetMovementsChart: MiddlewareFn<IGraphQLContext> = async (
  { args },
  next,
) => {
  try {
    const { year } = args;

    const parsedYear = year ? dayjs(year, 'YYYY') : dayjs();
    const startDate = parsedYear.startOf('year').toDate();
    const endDate = parsedYear.endOf('year').toDate();

    const foundMovements = await reportsRepository.findMovementsPerRange(
      startDate,
      endDate,
    );

    if (foundMovements === null) {
      throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
    }

    if (foundMovements === 0) {
      throw new Error(responseCodes.REPORTS.NOT_FOUND);
    }

    return next();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
  }
};
