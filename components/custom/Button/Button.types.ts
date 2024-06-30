import { type VariantProps } from 'class-variance-authority';

import { buttonVariants } from '@/components/custom/Button';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftSection?: JSX.Element;
  rightSection?: JSX.Element;
}
