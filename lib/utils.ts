import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { saveAs } from 'file-saver';
import { type TFunction } from 'next-i18next';
import { ApolloClient, ApolloError, DocumentNode } from '@apollo/client';

import { type IReportsCSV } from '@/components/pages/reports/reports.types';
import {
  type TNoStandardCache,
  type TNoStandardQueryDefinitions,
} from '@/types';

export const currencySite = 'COP';

export const SEO = {
  url: 'https://redfirst.com',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://redfirst.com',
    image: {
      url: '/og-image.png',
      width: '1200',
      height: '630',
    },
  },
  twitter: {
    card: 'summary',
    site: '@redfirst',
    creator: '@redfirst',
    image: '/og-image.png',
  },
};

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getNameInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('');

export const numberWithCurrency = (amount: string | bigint): string => {
  let amountNumber: bigint | number = 0;
  try {
    amountNumber = BigInt(amount);
  } catch {
    amountNumber = 0;
  }
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currencySite,
  }).format(amountNumber);
};

export const propsToCSV = (data: IReportsCSV, t: TFunction) => {
  let csvContent = '\uFEFF';

  if (data.movementsChart) {
    csvContent += `${t('reportCSV.movements')}\n`;
    csvContent += `"${t('reportCSV.name')}";"${t('reportCSV.income')}";"${t(
      'reportCSV.expense',
    )}"\n`;
    for (let i = 0; i < data.movementsChart.length; i++) {
      const movementChart = data.movementsChart[i];

      csvContent += `${[
        `"${t(`months.${movementChart.name}`)}"`,
        `"${numberWithCurrency(movementChart.expense)}"`,
        `"${numberWithCurrency(movementChart.income)}"`,
      ].join(';')}\r\n`;
    }
  }

  if (data.recentMovements) {
    csvContent += '\r\n';
    csvContent += `${t('reportCSV.recentMovements')}\n`;
    csvContent += `"${t('reportCSV.name')}";"${t('reportCSV.email')}";"${t(
      'reportCSV.movement',
    )}"\n`;
    for (let i = 0; i < data.recentMovements.length; i++) {
      const recentMovement = data.recentMovements[i];

      csvContent += `${[
        `"${recentMovement.name}"`,
        `"${recentMovement.email}"`,
        `"${recentMovement.movement}"`,
      ].join(';')}\r\n`;
    }
  }

  if (data.movements) {
    csvContent += '\r\n';
    csvContent += `"${t('reportCSV.recentMovements')}:";"${data.movements}"`;
  }
  if (data.balance) {
    csvContent += '\r\n';
    csvContent += `"${t('reportCSV.balance')}:";"${data.balance}"`;
  }

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'report.csv');
};

export const tableToCSV = <T>(columns: string[], rows: T[], t: TFunction) => {
  let csvContent = '\uFEFF';

  csvContent += `${columns
    .filter((column) => column !== 'actions')
    .map((column) => t(`table.${column}`))
    .join(';')}\r\n`;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i] as Record<string, string | number>;

    const rowContent = [];

    for (let j = 0; j < columns.length; j++) {
      const column = columns[j];
      if (column !== 'actions') {
        if (column === 'concept') {
          rowContent.push(t(`movements.${row[column]}`));
        } else {
          rowContent.push(row[column]);
        }
      }
    }
    csvContent += `${rowContent.join(';')}\r\n`;
  }

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'report.csv');
};

export const fillArray = (length: number) =>
  Array.from({ length }, (_, i) => i);

export const formatNumber = (num: number, precision = 1): string => {
  if (num === null) return '0';

  const map = [
    { suffix: 'T', threshold: 1e12 },
    { suffix: 'B', threshold: 1e9 },
    { suffix: 'M', threshold: 1e6 },
    { suffix: 'K', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ];

  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
    return formatted;
  }

  return num.toString();
};

export const lowercaseFirstLetter = (str: string) =>
  str.charAt(0).toLowerCase() + str.slice(1);

// No standard way to extract query variables from Apollo Client cache
export const findQueryVariables = <T = Record<string, string>>(
  client: ApolloClient<object>,
  queryDocument: DocumentNode,
  keyTopLevel?: string,
): Partial<T> => {
  const cache = client.cache.extract() as TNoStandardCache;
  const queryName = lowercaseFirstLetter(
    (queryDocument.definitions[0] as TNoStandardQueryDefinitions)?.name?.value,
  );

  let queryWithVariables = Object.keys(cache).find((key) =>
    new RegExp(`^${queryName}\\(.*\\)$`).test(key),
  );
  if (queryWithVariables === undefined && cache?.ROOT_QUERY !== undefined) {
    queryWithVariables = Object.keys(cache.ROOT_QUERY).find((key) =>
      new RegExp(`^${queryName}\\(.*\\)$`).test(key),
    );
  }

  if (queryWithVariables === undefined) {
    return {} as T;
  }

  const matches = queryWithVariables.match(/\(([^)]+)\)/);

  if (matches) {
    const jsonString = matches[1];

    try {
      const jsonObj = JSON.parse(jsonString);
      if (keyTopLevel) {
        return jsonObj[keyTopLevel];
      }
      return jsonObj;
    } catch (e) {
      return {} as T;
    }
  }

  return {} as T;
};

export const indexBy = <T>(arr: T[], key: keyof T) =>
  arr.reduce((acc, curr) => {
    const currKey = curr[key] as unknown as string;
    acc[currKey] = curr;
    return acc;
  }, {} as Record<string, T>);

export const findGraphQLErrors = (error: ApolloError): string[] => {
  const errors = error.graphQLErrors.map((err) => err.message);
  return errors;
};
