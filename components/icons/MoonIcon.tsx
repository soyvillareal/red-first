import React from 'react';
import { IIconsProps } from './icons.types';

const MoonIcon = ({ className, width = 20, height = 20 }: IIconsProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill='currentColor'
      viewBox='0 0 0.6 0.6'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0.263 0.184a0.135 0.135 0 0 1 0.078 -0.096c0.028 -0.012 0.022 -0.054 -0.008 -0.057C0.194 0.014 0.065 0.106 0.036 0.243c-0.031 0.146 0.062 0.29 0.208 0.321s0.289 -0.062 0.32 -0.208a0.27 0.27 0 0 0 0.006 -0.065c-0.001 -0.031 -0.042 -0.04 -0.056 -0.013a0.135 0.135 0 0 1 -0.147 0.067 0.135 0.135 0 0 1 -0.104 -0.16m-0.007 0.321c-0.113 -0.024 -0.186 -0.136 -0.162 -0.25a0.211 0.211 0 0 1 0.142 -0.157 0.195 0.195 0 0 0 -0.032 0.073c-0.022 0.105 0.045 0.209 0.15 0.232a0.195 0.195 0 0 0 0.139 -0.023c-0.038 0.092 -0.137 0.146 -0.237 0.125'
      />
    </svg>
  );
};

export default MoonIcon;
