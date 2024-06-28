import React from 'react';
import { IIconsProps } from './icons.types';

const CheckIcon = ({ className, width = 24, height = 24 }: IIconsProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox='0 0 0.72 0.72'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
    >
      <g
        id='页面-1'
        stroke='none'
        strokeWidth='1'
        fill='none'
        fillRule='evenodd'
      >
        <g id='System' transform='translate(-192 -48)'>
          <g id='check_fill' transform='translate(192 48)'>
            <path
              d='M0.72 0v0.72H0V0zM0.378 0.698l0 0 -0.002 0.001 -0.001 0 0 0 -0.002 -0.001q0 0 -0.001 0l0 0 -0.001 0.013 0 0.001 0 0 0.003 0.002 0 0 0 0 0.003 -0.002 0 0 0 -0.001 -0.001 -0.013q0 0 -0.001 -0.001m0.008 -0.003 0 0 -0.006 0.003 0 0 0 0 0.001 0.013 0 0 0 0 0.006 0.003q0.001 0 0.001 0l0 0 -0.001 -0.018q0 -0.001 -0.001 -0.001m-0.021 0a0.001 0.001 0 0 0 -0.001 0l0 0 -0.001 0.018q0 0.001 0.001 0.001l0 0 0.006 -0.003 0 0 0 0 0.001 -0.013 0 0 0 0z'
              id='MingCute'
              fillRule='nonzero'
            />
            <path
              d='M0.646 0.153a0.045 0.045 0 0 1 0 0.064L0.309 0.554a0.048 0.048 0 0 1 -0.068 0L0.074 0.387a0.045 0.045 0 1 1 0.064 -0.064l0.138 0.138L0.583 0.153a0.045 0.045 0 0 1 0.064 0'
              id='路径'
              fill='#09244B'
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default CheckIcon;
