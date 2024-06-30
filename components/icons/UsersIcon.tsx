import React from 'react';
import { IIconsProps } from './icons.types';

const UsersIcon = ({ className, width = 24, height = 24 }: IIconsProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill='currentColor'
      viewBox='0 0 0.45 0.45'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M0.165 0a0.105 0.105 0 1 0 0 0.21A0.105 0.105 0 1 0 0.165 0' />
      <path d='M0.105 0.27a0.105 0.105 0 0 0 -0.105 0.105v0.075h0.33v-0.075a0.105 0.105 0 0 0 -0.105 -0.105z' />
      <path d='M0.375 0.3H0.36v0.15h0.09v-0.075a0.075 0.075 0 0 0 -0.075 -0.075' />
      <path d='M0.345 0.12a0.075 0.075 0 1 0 0 0.15 0.075 0.075 0 0 0 0 -0.15' />
    </svg>
  );
};

export default UsersIcon;
