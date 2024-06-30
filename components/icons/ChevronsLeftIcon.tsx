import React from 'react';
import { IIconsProps } from './icons.types';

const ChevronsLeftIcon = ({
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
    >
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m0.069 0.219 0.15 -0.15a0.03 0.03 0 0 1 0.045 0.04l-0.002 0.003L0.132 0.24l0.129 0.129a0.03 0.03 0 0 1 -0.04 0.045l-0.003 -0.002 -0.15 -0.15a0.03 0.03 0 0 1 -0.002 -0.04zl0.15 -0.15zm0.15 0 0.15 -0.15a0.03 0.03 0 0 1 0.045 0.04l-0.002 0.003L0.282 0.24l0.129 0.129a0.03 0.03 0 0 1 -0.04 0.045l-0.003 -0.002 -0.15 -0.15a0.03 0.03 0 0 1 -0.002 -0.04zl0.15 -0.15z'
      />
    </svg>
  );
};

export default ChevronsLeftIcon;
