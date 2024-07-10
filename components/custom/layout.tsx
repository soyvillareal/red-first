import * as React from 'react';

import {
  type IBodyProps,
  type IHeaderProps,
  type ILayoutProps,
} from '@/components/custom/custom.types';
import { cn } from '@/lib/utils';

const LayoutContext = React.createContext<{
  offset: number;
  fixed: boolean;
} | null>(null);

const ContextLayout = ({
  className,
  fixed = false,
  ...props
}: ILayoutProps) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    const div = divRef.current;

    if (!div) return;
    const onScroll = () => setOffset(div.scrollTop);

    // clean up code
    div.removeEventListener('scroll', onScroll);
    div.addEventListener('scroll', onScroll, { passive: true });
    return () => div.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <LayoutContext.Provider value={{ offset, fixed }}>
      <div
        ref={divRef}
        data-layout="layout"
        className={cn(
          'h-full overflow-auto',
          fixed && 'flex flex-col',
          className,
        )}
        {...props}
      />
    </LayoutContext.Provider>
  );
};
ContextLayout.displayName = 'Layout';

const Header = React.forwardRef<HTMLDivElement, IHeaderProps>(
  ({ className, sticky, ...props }, ref) => {
    // Check if Layout.Header is used within Layout
    const contextVal = React.useContext(LayoutContext);
    if (contextVal === null) {
      throw new Error(
        `Layout.Header must be used within ${ContextLayout.displayName}.`,
      );
    }

    return (
      <div
        ref={ref}
        data-layout="header"
        className={cn(
          `z-10 flex h-[75px] items-center gap-4 bg-background p-4 md:px-8`,
          contextVal.offset > 10 && sticky ? 'shadow' : 'shadow-none',
          contextVal.fixed && 'flex-none',
          sticky && 'sticky top-0',
          className,
        )}
        {...props}
      />
    );
  },
);
Header.displayName = 'Header';

const Body = React.forwardRef<HTMLDivElement, IBodyProps>(
  ({ className, ...props }, ref) => {
    // Check if Layout.Body is used within Layout
    const contextVal = React.useContext(LayoutContext);
    if (contextVal === null) {
      throw new Error(
        `Layout.Body must be used within ${ContextLayout.displayName}.`,
      );
    }

    return (
      <div
        ref={ref}
        data-layout="body"
        className={cn(
          'px-4 pt-4 md:pt-0 pb-6 md:overflow-hidden md:px-8',
          contextVal && contextVal.fixed && 'flex-1',
          className,
        )}
        {...props}
      />
    );
  },
);
Body.displayName = 'Body';

ContextLayout.Header = Header;
ContextLayout.Body = Body;
ContextLayout.className = Body;

export { ContextLayout };
