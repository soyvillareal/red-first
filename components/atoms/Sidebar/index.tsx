import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useSession } from 'next-auth/react';

import { ContextLayout } from '@/components/custom/layout';
import { Button } from '@/components/custom/Button';
import { Nav } from '@/components/atoms/Nav';
import { cn } from '@/lib/utils';
import { MenuIcon } from '@/components/icons/MenuIcon';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { ChevronsLeftIcon } from '@/components/icons/ChevronsLeftIcon';
import { LogoIcon } from '@/components/icons/LogoIcon';
import { EUserRole } from '@/types';
import { routes } from '@/lib/contants';
import UserDropdown from '@/components/atoms/UserDropdown';

import { sidelinks } from './Sidebar.constants';
import { SidebarProps } from './Sidebar.types';

export const Sidebar = ({
  className,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) => {
  const session = useSession();
  const { t } = useTranslation();
  const [navOpened, setNavOpened] = useState(false);

  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [navOpened]);

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${
          isCollapsed ? 'md:w-[64px]' : 'md:w-64'
        }`,
        className,
      )}
    >
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${
          navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'
        } w-full bg-black md:hidden`}
      />

      <ContextLayout fixed className={navOpened ? 'h-svh' : ''}>
        <ContextLayout.Header
          sticky
          className="z-50 flex justify-between px-4 py-3 shadow-sm md:px-4"
        >
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle Navigation"
              aria-controls="sidebar-menu"
              aria-expanded={navOpened}
              onClick={() => setNavOpened((prev) => !prev)}
            >
              {navOpened ? <CloseIcon /> : <MenuIcon />}
            </Button>
            <div className={`flex items-center ${!isCollapsed ? 'gap-2' : ''}`}>
              <LogoIcon className="w-[160px] sm:w-[190px]" />
            </div>
          </div>
          <div className="flex md:hidden">
            <UserDropdown />
          </div>
        </ContextLayout.Header>

        <Nav
          id="sidebar-menu"
          className={`z-40 h-full flex-1 overflow-auto ${
            navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen md:py-2'
          }`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={sidelinks(t).filter(
            (item) =>
              session.data?.user.roles.includes(EUserRole.ADMIN) ||
              [routes.movements].includes(item.href) === true,
          )}
        />

        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size="icon"
          variant="outline"
          className="absolute -right-5 top-1/2 z-50 hidden rounded-full md:inline-flex"
        >
          <ChevronsLeftIcon
            className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </Button>
      </ContextLayout>
    </aside>
  );
};
