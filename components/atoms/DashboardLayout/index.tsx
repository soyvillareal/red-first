'use client';

import React, { PropsWithChildren } from 'react';

import Sidebar from '@/components/atoms/Sidebar';
import useIsCollapsed from '@/hooks/useIsCollapsed';
import { Toaster } from '@/components/ui/toaster';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();

  return (
    <div className='relative h-full overflow-hidden bg-background'>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id='content'
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${
          isCollapsed ? 'md:ml-14' : 'md:ml-64'
        } h-full`}
      >
        {children}
      </main>
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
