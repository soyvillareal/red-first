import React from 'react';
import { IIconsProps } from './icons.types';

const PlusCircledIcon = ({ className, width = 20, height = 20 }: IIconsProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox='0 0 0.72 0.72'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M0.66 0.36c0 0.166 -0.134 0.3 -0.3 0.3S0.06 0.526 0.06 0.36 0.194 0.06 0.36 0.06s0.3 0.134 0.3 0.3m-0.06 0a0.24 0.24 0 1 1 -0.48 0 0.24 0.24 0 0 1 0.48 0M0.21 0.39a0.03 0.03 0 1 1 0 -0.06h0.12V0.21a0.03 0.03 0 1 1 0.06 0v0.12l0.12 0a0.03 0.03 0 0 1 0 0.06L0.39 0.39v0.12a0.03 0.03 0 1 1 -0.06 0v-0.12z'
        fill='#000000'
      />
    </svg>
  );
};

export default PlusCircledIcon;
