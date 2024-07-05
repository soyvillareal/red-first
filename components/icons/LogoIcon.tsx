import React from 'react';

import { IIconsProps } from './icons.types';

const LogoIcon = ({ className, width = 200, height = 52 }: IIconsProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 170 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <circle cx="10" cy="10" r="5" fill="#FF5722" />
        <circle cx="10" cy="25" r="5" fill="#FF5722" />
        <circle cx="25" cy="10" r="5" fill="#FF5722" />
        <circle cx="25" cy="25" r="5" fill="#FF5722" />
      </g>
      <text
        x="39"
        y="29"
        fontFamily="Arial, sans-serif"
        fontSize="30"
        fill="#2C3E50"
      >
        Red First
      </text>
    </svg>
  );
};

export default LogoIcon;
