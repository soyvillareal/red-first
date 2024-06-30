import React from 'react';
import { IIconsProps } from './icons.types';

const CloseIcon = ({ className, width = 24, height = 24 }: IIconsProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      width={width}
      height={height}
      viewBox='0 0 1.56 1.56'
      enableBackground='new 0 0 52 52'
      xmlSpace='preserve'
      fill='currentColor'
    >
      <path d='m0.93 0.762 0.39 -0.393c0.018 -0.018 0.018 -0.045 0 -0.063l-0.06 -0.063c-0.018 -0.018 -0.045 -0.018 -0.063 0L0.804 0.636c-0.012 0.012 -0.03 0.012 -0.042 0L0.369 0.24c-0.018 -0.018 -0.045 -0.018 -0.063 0l-0.063 0.063c-0.018 0.018 -0.018 0.045 0 0.063l0.393 0.393c0.012 0.012 0.012 0.03 0 0.042L0.24 1.197c-0.018 0.018 -0.018 0.045 0 0.063l0.063 0.063c0.018 0.018 0.045 0.018 0.063 0L0.759 0.93c0.012 -0.012 0.03 -0.012 0.042 0l0.393 0.393c0.018 0.018 0.045 0.018 0.063 0L1.32 1.26c0.018 -0.018 0.018 -0.045 0 -0.063L0.93 0.804c-0.012 -0.012 -0.012 -0.03 0 -0.042' />
    </svg>
  );
};

export default CloseIcon;
