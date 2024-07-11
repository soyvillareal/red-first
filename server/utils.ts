import { ManagementClient } from 'auth0';
import { createLogger, format, transports } from 'winston';

import { env } from '@/lib/env';
import {
  type IPageMetaParameters,
  type IPageOptionsDataMeta,
} from '@/types/graphql/pagination';
import { defaultLimit } from '@/lib/contants';

export const logger = createLogger({
  level: 'info', // Nivel mínimo para registrar
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }), // Para capturar el stack de errores
    format.splat(),
    format.json(),
  ),
  // Puedes configurar diferentes transportes según el entorno
  transports: [
    // En desarrollo, escribe todos los logs en la consola
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(), // Formato simple para la consola
      ),
    }),
    // En producción, podrías querer escribir los logs en un archivo
    // new transports.File({ filename: 'error.log', level: 'error' }),
    // new transports.File({ filename: 'combined.log' }),
  ],
});

export const pageMeta = <T>(
  data: T,
  {
    pageOptions: { limit = defaultLimit, page },
    itemCount,
  }: IPageMetaParameters,
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

export const getSkipped = (
  itemCount: number,
  page = 1,
  limit = defaultLimit,
): number => {
  const pageCount = Math.ceil(itemCount / limit);
  if (page < 1 || page > pageCount) {
    throw new Error('Page number not found!');
  }

  return (page - 1) * limit;
};

export const mockPagination = <T>(
  error: string,
  dataMock: T,
): IPageOptionsDataMeta<T> => ({
  data: dataMock,
  meta: {
    page: 1,
    limit: defaultLimit,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
    errorMessage: error,
  },
});

export const updateUserRoleInProvider = async (
  providerAccountId: string,
  role: string,
): Promise<boolean> => {
  try {
    const auth0 = new ManagementClient({
      domain: env.AUTH0_DOMAIN,
      audience: env.AUTH0_AUDIENCE,
      clientId: env.AUTH0_CLIENT_ID,
      clientSecret: env.AUTH0_CLIENT_SECRET,
    });

    const rolesProvider = await auth0.roles.getAll();

    if (rolesProvider === undefined) {
      return false;
    }

    const newRole = rolesProvider.data.find((rol) => rol.name === role);

    if (newRole === undefined) {
      return false;
    }

    const deletedRoleInProvider = await auth0.users.deleteRoles(
      { id: providerAccountId },
      {
        roles: rolesProvider.data.map((rol) => rol.id),
      },
    );

    if (deletedRoleInProvider.status !== 204) {
      return false;
    }

    const createdRoleInProvider = await auth0.users.assignRoles(
      { id: providerAccountId },
      {
        roles: [newRole.id],
      },
    );

    if (createdRoleInProvider.status !== 204) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

export const responseCodes = {
  ERROR: {
    SOMETHING_WENT_WRONG: 'SOMETHING_WENT_WRONG',
    USER_NOT_LOGGED_IN: 'USER_NOT_LOGGED_IN',
    INVALID_DATE_FORMAT: 'INVALID_DATE_FORMAT',
    INVALID_FILTER_TYPE: 'INVALID_FILTER_TYPE',
    INVALID_FIELD_ORDER: 'INVALID_FIELD_ORDER',
  },
  UNAUTHORIZED: {
    NOT_AUTHORIZED: 'NOT_AUTHORIZED',
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
  USERS: {
    NOT_AUTHORIZED_TO_THIS_ACTION: 'NOT_AUTHORIZED_TO_THIS_ACTION',
    NOT_FOUND: 'USERS_NOT_FOUND',
    NAME_EMPTY: 'NAME_EMPTY',
    NAME_TOO_SHORT: 'NAME_TOO_SHORT',
    NAME_TOO_LONG: 'NAME_TOO_LONG',
    USER_UPDATED_SUCCESSFULLY: 'USER_UPDATED_SUCCESSFULLY',
  },
  REPORTS: {
    NOT_FOUND: 'MOVEMENTS_NOT_FOUND',
  },
};
