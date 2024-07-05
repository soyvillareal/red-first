import React from 'react';

import { IIconsProps } from './icons.types';

export const ChevronDownIcon = ({
  className,
  width = 24,
  height = 24,
}: IIconsProps) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" fill="white" fillOpacity="0.01" />
    <path
      d="M37 18L25 30L13 18"
      stroke="#000000"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
