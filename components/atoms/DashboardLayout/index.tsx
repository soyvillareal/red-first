'use client';

import Head from 'next/head';
import React, { PropsWithChildren } from 'react';

import { Sidebar } from '@/components/atoms/Sidebar';
import { useIsCollapsed } from '@/hooks/useIsCollapsed';
import { Toaster } from '@/components/ui/toaster';

import { IDashboardLayoutProps } from './DashboardLayout.types';

export const DashboardLayout = ({
  children,
  seo,
}: PropsWithChildren<IDashboardLayoutProps>) => {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();

  return (
    <div className="relative h-full overflow-hidden bg-background">
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
      </Head>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id="content"
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
