import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { saveAs } from 'file-saver';

import { IReportsCSV } from '@/pages/reports/reports.types';
import { TFunction } from 'next-i18next';

export const currencySite = 'COP';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getNameInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('');
};

export const propsToCSV = (data: IReportsCSV, t: TFunction) => {
  let csvContent = '\uFEFF';

  if (data.movementsChart) {
    csvContent += `${t('reportCSV.movements')}\n`;
    csvContent += `"${t('reportCSV.name')}";"${t('reportCSV.income')}";"${t(
      'reportCSV.expense'
    )}"\n`;
    for (let i = 0; i < data.movementsChart.length; i++) {
      const movementChart = data.movementsChart[i];

      csvContent += `${[
        `"${movementChart.name}"`,
        `"${numberWithCurrency(movementChart.expense)}"`,
        `"${numberWithCurrency(movementChart.income)}"`,
      ].join(';')}\r\n`;
    }
  }

  if (data.recentMovements) {
    csvContent += '\r\n';
    csvContent += `${t('reportCSV.recentMovements')}\n`;
    csvContent += `"${t('reportCSV.name')}";"${t('reportCSV.email')}";"${t(
      'reportCSV.movement'
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

export const fillArray = (length: number) => {
  return Array.from({ length }, (_, i) => i);
};

export const numberWithCurrency = (amount: string | bigint): string => {
  const amountNumber = BigInt(amount) || 0;
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currencySite,
  }).format(amountNumber);
};

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
