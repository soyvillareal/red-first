import dayjs from 'dayjs';
import { MiddlewareFn } from 'type-graphql';
import { MovementConcept } from '@prisma/client';

import { IGraphQLContext } from '@/types';
import { type TValidsMovementTypes } from '@/types/graphql/resolvers';
import { responseCodes } from '@/server/utils';

export const checkCreateMovement: MiddlewareFn<IGraphQLContext> = async (
  { args },
  next,
) => {
  try {
    const { amount, date } = args;

    const amountNumber = BigInt(amount);
    // Validating the maximun and minimum value for BigInt in Postgres
    // const MIN_BIGINT = BigInt('-9223372036854775808');
    const MAX_BIGINT = BigInt('9223372036854775807');

    if (amountNumber < 0) {
      throw new Error(responseCodes.MOVEMENTS.AMOUNT_NEGATIVE);
    }

    if (amountNumber === BigInt(0)) {
      throw new Error(responseCodes.MOVEMENTS.AMOUNT_ZERO);
    }

    if (amountNumber >= MAX_BIGINT) {
      throw new Error(responseCodes.MOVEMENTS.AMOUNT_TOO_HIGH);
    }

    if (dayjs(date, 'YYYY-MM-DD', true).format('YYYY-MM-DD') !== date) {
      throw new Error(responseCodes.ERROR.INVALID_DATE_FORMAT);
    }

    return next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
  }
};

export const checkGetMovements: MiddlewareFn<IGraphQLContext> = async (
  { args },
  next,
) => {
  try {
    const { filterType, fieldOrder } = args.pagination;

    let filterConcept = null;
    if (filterType !== null && filterType !== undefined) {
      filterConcept = filterType as MovementConcept;
      if (Object.values(MovementConcept).includes(filterConcept) === false) {
        throw new Error(responseCodes.ERROR.INVALID_FILTER_TYPE);
      }
    }

    const fieldsValids: TValidsMovementTypes[] = [
      'amount',
      'userName',
      'concept',
      'date',
    ];

    if (fieldsValids.includes(fieldOrder) === false) {
      throw new Error(responseCodes.ERROR.INVALID_FIELD_ORDER);
    }

    return next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
  }
};
