import React from 'react';

import { IIconsProps } from './icons.types';

export const DotsHorizontalIcon = ({
  className,
  width = 20,
  height = 20,
}: IIconsProps) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 7.68 7.68"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4.68 3.84a0.84 0.84 0 1 1 -0.84 -0.84 0.841 0.841 0 0 1 0.84 0.84M1.44 3a0.84 0.84 0 1 0 0.84 0.84 0.841 0.841 0 0 0 -0.84 -0.84m4.8 0a0.84 0.84 0 1 0 0.84 0.84 0.841 0.841 0 0 0 -0.84 -0.84" />
  </svg>
);
