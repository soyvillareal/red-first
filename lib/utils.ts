import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { saveAs } from 'file-saver';

import { ReportsPageProps } from '@/pages/reports/reports.types';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getNameInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('');
};

export const parsedNumber = (value: number) => {
  if (value < 0) {
    return `-$${-value}`;
  }
  return `+$${value}`;
};

export const propsToCSV = (data: ReportsPageProps) => {
  let csvContent = '';

  csvContent += 'Movements\n';
  csvContent += '"Name";"Income";"Expense"\n';
  for (let i = 0; i < data.movementsChart.length; i++) {
    const movementChart = data.movementsChart[i];

    csvContent += `${[
      `"${movementChart.name}"`,
      `"${parsedNumber(movementChart.expense)}"`,
      `"${parsedNumber(movementChart.income)}"`,
    ].join(';')}\r\n`;
  }

  csvContent += '\r\n';
  csvContent += 'Recent Movements\n';
  csvContent += '"Name";"Email";"Movement"\n';
  for (let i = 0; i < data.recentMovements.length; i++) {
    const recentMovement = data.recentMovements[i];

    csvContent += `${[
      `"${recentMovement.name}"`,
      `"${recentMovement.email}"`,
      `"${recentMovement.movement}"`,
    ].join(';')}\r\n`;
  }

  csvContent += '\r\n';
  csvContent += `"Recent Movements:";"${data.movements}"`;

  csvContent += '\r\n';
  csvContent += `"Balance:";"${data.balance}"`;

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'report.csv');
};
