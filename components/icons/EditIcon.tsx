import React from 'react';
import { IIconsProps } from './icons.types';

const EditIcon = ({ className, width = 20, height = 20 }: IIconsProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill='currentColor'
      viewBox='0 0 0.72 0.72'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M0.63 0.36a0.03 0.03 0 0 0 -0.03 0.03v0.18a0.03 0.03 0 0 1 -0.03 0.03H0.15a0.03 0.03 0 0 1 -0.03 -0.03V0.15a0.03 0.03 0 0 1 0.03 -0.03h0.18a0.03 0.03 0 0 0 0 -0.06H0.15a0.09 0.09 0 0 0 -0.09 0.09v0.42a0.09 0.09 0 0 0 0.09 0.09h0.42a0.09 0.09 0 0 0 0.09 -0.09v-0.18a0.03 0.03 0 0 0 -0.03 -0.03m-0.45 0.023V0.51a0.03 0.03 0 0 0 0.03 0.03h0.127a0.03 0.03 0 0 0 0.021 -0.009l0.208 -0.208L0.651 0.24a0.03 0.03 0 0 0 0 -0.043l-0.127 -0.129a0.03 0.03 0 0 0 -0.043 0l-0.085 0.085 -0.208 0.208a0.03 0.03 0 0 0 -0.009 0.021m0.323 -0.251 0.085 0.085 -0.043 0.043 -0.085 -0.085ZM0.24 0.395l0.178 -0.178 0.085 0.085L0.325 0.48H0.24Z' />
    </svg>
  );
};

export default EditIcon;
