import React from 'react';

import { IIconsProps } from './icons.types';

const ChevronLeftIcon = ({
  className,
  width = 24,
  height = 24,
}: IIconsProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 0.6 0.6"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.36 0.48a0.03 0.03 0 0 1 -0.021 -0.009l-0.15 -0.15a0.03 0.03 0 0 1 0 -0.042l0.15 -0.15a0.03 0.03 0 1 1 0.042 0.042L0.252 0.3l0.129 0.129A0.03 0.03 0 0 1 0.36 0.48"
        fill="#5C5F62"
      />
    </svg>
  );
};

export default ChevronLeftIcon;
