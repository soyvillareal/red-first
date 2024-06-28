'use client';

import React, { PropsWithChildren } from 'react';
import Sidebar from '@/components/Sidebar';
import useIsCollapsed from '@/hooks/useIsCollapsed';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
    </div>
  );
};

export default DashboardLayout;
