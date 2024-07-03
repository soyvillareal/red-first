import {
  type IPageMetaParameters,
  type IPageOptionsDataMeta,
} from '@/types/graphql/pagination';
import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: 'info', // Nivel mínimo para registrar
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }), // Para capturar el stack de errores
    format.splat(),
    format.json()
  ),
  // Puedes configurar diferentes transportes según el entorno
  transports: [
    // En desarrollo, escribe todos los logs en la consola
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple() // Formato simple para la consola
      ),
    }),
    // En producción, podrías querer escribir los logs en un archivo
    // new transports.File({ filename: 'error.log', level: 'error' }),
    // new transports.File({ filename: 'combined.log' }),
  ],
});

export const numberWithCurrency = (amount: string | bigint): string => {
  const amountNumber = BigInt(amount) || 0;
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  }).format(amountNumber);
};

export const pageMeta = <T>(
  data: T,
  { pageOptions: { limit = 10, page }, itemCount }: IPageMetaParameters
): IPageOptionsDataMeta<T> => {
  const pageCount = Math.ceil(itemCount / limit);
  let newPage = page;
  if (page < 1 || page > pageCount) {
    newPage = 1;
  }

  const objectData: IPageOptionsDataMeta<typeof data> = {
    data: data,
    meta: {
      page: newPage,
      limit,
      itemCount: itemCount,
      pageCount: pageCount,
      hasPreviousPage: newPage > 1,
      hasNextPage: newPage < pageCount,
    },
  };

  return objectData;
};

export const getSkipped = (itemCount: number, page = 1, limit = 10): number => {
  const pageCount = Math.ceil(itemCount / limit);
  if (page < 1 || page > pageCount) {
    throw new Error('Page number not found!');
  }

  return (page - 1) * limit;
};

export const mockPagination = <T>(
  error: string,
  dataMock: T
): IPageOptionsDataMeta<T> => {
  return {
    data: dataMock,
    meta: {
      page: 1,
      limit: 10,
      itemCount: 0,
      pageCount: 0,
      hasPreviousPage: false,
      hasNextPage: false,
      errorMessage: error,
    },
  };
};

export const responseCodes = {
  ERROR: {
    SOMETHING_WENT_WRONG: 'SOMETHING_WENT_WRONG',
    SESSION_UNDEFINED: 'SESSION_UNDEFINED',
    USER_NOT_LOGGED_IN: 'USER_NOT_LOGGED_IN',
    INVALID_DATE_FORMAT: 'INVALID_DATE_FORMAT',
    INVALID_FILTER_TYPE: 'INVALID_FILTER_TYPE',
    INVALID_FIELD_ORDER: 'INVALID_FIELD_ORDER',
  },
  PAGINATION: {
    PAGE_UNDEFINED: 'PAGE_UNDEFINED',
    PAGE_MUST_BE_NUMBER: 'PAGE_MUST_BE_NUMBER',
    LIMIT_INVALID: 'LIMIT_INVALID',
    ORDER_INVALID: 'ORDER_INVALID',
  },
  MOVEMENTS: {
    NOT_FOUND: 'MOVEMENTS_NOT_FOUND',
    AMOUNT_ZERO: 'AMOUNT_ZERO',
    AMOUNT_NEGATIVE: 'AMOUNT_NEGATIVE',
    AMOUNT_TOO_HIGH: 'AMOUNT_TOO_HIGH',
    MOVEMENT_CREATED_SUCCESSFULLY: 'MOVEMENT_CREATED_SUCCESSFULLY',
  },
};
