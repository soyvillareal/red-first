import { forwardRef, useCallback } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { LoaderIcon } from '@/components/icons/LoaderIcon';

import { ButtonProps } from './Button.types';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary-80',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive-90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary-80',
        ghost: 'hover:bg-secondary hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      disabled,
      loading = false,
      hasMargin = true,
      leftSection,
      rightSection,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    const renderLeftLoading = useCallback(() => {
      if (
        (leftSection && loading) ||
        (leftSection === undefined && rightSection === undefined && loading)
      ) {
        return (
          <LoaderIcon
            className={cn('h-4 w-4 animate-spin', hasMargin ? 'mr-2' : '')}
          />
        );
      }
      return null;
    }, [leftSection, loading, rightSection, hasMargin]);

    const renderRighttLoading = useCallback(() => {
      if (rightSection && loading) {
        return <LoaderIcon className="ml-2 h-4 w-4 animate-spin" />;
      }
      return null;
    }, [rightSection, loading]);

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={loading || disabled}
        ref={ref}
        {...props}
      >
        {renderLeftLoading()}
        {loading === false && leftSection && (
          <div className="mr-2">{leftSection}</div>
        )}
        {children}
        {loading === false && rightSection && (
          <div className="ml-2">{rightSection}</div>
        )}
        {renderRighttLoading()}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
