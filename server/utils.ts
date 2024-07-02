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

export const numberWithCurrency = (amount: bigint): string => {
  const amountNumber = parseFloat(amount.toString()) || 0;
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

  const objectData: IPageOptionsDataMeta<typeof data> = {
    data: data,
    meta: {
      page,
      limit,
      itemCount: itemCount,
      pageCount: pageCount,
      hasPreviousPage: page > 1,
      hasNextPage: page < pageCount,
    },
  };
  if (page < 1 || page > pageCount) {
    throw new Error('Cursor not found!');
  }

  return objectData;
};

export const getSkipped = (itemCount: number, page = 1, limit = 10): number => {
  const pageCount = Math.ceil(itemCount / limit);
  if (page < 1 || page > pageCount) {
    throw new Error('Page number not found!');
  }

  return (page - 1) * limit;
};
