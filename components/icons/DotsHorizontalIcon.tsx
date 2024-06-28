import React from 'react';
import { IIconsProps } from './icons.types';

const DotsHorizontalIcon = ({
  className,
  width = 20,
  height = 20,
}: IIconsProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox='0 -0.18 0.48 0.48'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
    >
      <g
        id='Free-Icons'
        stroke='none'
        strokeWidth='1'
        fill='none'
        fillRule='evenodd'
      >
        <g
          transform='translate(-1119 -756)'
          fill='#000000'
          fillRule='nonzero'
          id='Group'
        >
          <g transform='translate(1115 746)' id='Shape'>
            <path d='M0.18 0.3a0.06 0.06 0 1 0 0 0.12 0.06 0.06 0 0 0 0 -0.12' />
            <path d='M0.36 0.3a0.06 0.06 0 1 0 0 0.12 0.06 0.06 0 0 0 0 -0.12' />
            <path d='M0.54 0.3a0.06 0.06 0 1 0 0 0.12 0.06 0.06 0 0 0 0 -0.12' />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default DotsHorizontalIcon;
