import React from 'react';
import { IIconsProps } from './icons.types';

const MenuIcon = ({ className, width = 24, height = 24 }: IIconsProps) => {
  return (
    <svg
      fill='#000000'
      className={className}
      width={width}
      height={height}
      viewBox='0 0 15.36 15.36'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>menu</title>
      <path d='M1.92 2.88h11.52v1.44H1.92zm0 4.08h11.52v1.44H1.92zm0 4.08h11.52v1.44H1.92z' />
    </svg>
  );
};

export default MenuIcon;
