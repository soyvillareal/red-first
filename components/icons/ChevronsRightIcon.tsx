import React from 'react';
import { IIconsProps } from './icons.types';

const ChevronsRightIcon = ({
  className,
  width = 24,
  height = 24,
}: IIconsProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox='0 0 0.48 0.48'
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
    >
      <path d='m0.111 0.069 0.15 0.15a0.03 0.03 0 0 1 0 0.042l-0.15 0.15a0.03 0.03 0 0 1 -0.042 -0.042L0.198 0.24 0.069 0.111a0.03 0.03 0 0 1 0.042 -0.042m0.15 0 0.15 0.15a0.03 0.03 0 0 1 0 0.042l-0.15 0.15a0.03 0.03 0 0 1 -0.042 -0.042L0.348 0.24 0.219 0.111a0.03 0.03 0 0 1 0.042 -0.042' />
    </svg>
  );
};

export default ChevronsRightIcon;
