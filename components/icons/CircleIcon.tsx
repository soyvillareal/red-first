import React from 'react';

import { IIconsProps } from './icons.types';

export const CircleIcon = ({
  className,
  width = 24,
  height = 24,
}: IIconsProps) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 0.45 0.45"
    version="1.1"
    id="circle"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path d="M0.42 0.225a0.195 0.195 0 1 1 -0.39 0 0.195 0.195 0 0 1 0.39 0" />
  </svg>
);
