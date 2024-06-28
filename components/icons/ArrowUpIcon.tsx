import React from 'react';
import { IIconsProps } from './icons.types';

const ArrowUpIcon = ({ className, width = 24, height = 24 }: IIconsProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill='#000000'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 1.56 1.56'
      enableBackground='new 0 0 52 52'
      xmlSpace='preserve'
    >
      <path d='M1.242 0.63c0.024 -0.024 0.024 -0.057 0 -0.081l-0.45 -0.441c-0.024 -0.024 -0.06 -0.024 -0.084 0l-0.45 0.441c-0.024 0.024 -0.024 0.057 0 0.081l0.084 0.081c0.024 0.024 0.06 0.024 0.084 0l0.141 -0.138c0.024 -0.024 0.066 -0.006 0.066 0.027v0.81c0 0.03 0.027 0.06 0.06 0.06h0.12c0.033 0 0.06 -0.033 0.06 -0.06V0.6c0 -0.036 0.042 -0.051 0.066 -0.027l0.141 0.138c0.024 0.024 0.06 0.024 0.084 0z' />
    </svg>
  );
};

export default ArrowUpIcon;
