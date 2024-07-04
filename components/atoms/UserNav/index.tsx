import { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { signOut, useSession } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/custom/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LanguageIcon from '@/components/icons/LanguageIcon';
import LogOutIcon from '@/components/icons/LogOutIcon';
import LayoutDashboardIcon from '@/components/icons/LayoutDashboardIcon';
import { cn, getNameInitials } from '@/lib/utils';
import { dashboardRoutes, routes } from '@/lib/contants';
import { languages } from '@/lib/i18nConfig';
import UserNavSkeleton from '@/components/skeleton/UserNavSkeleton';

export const UserNav = () => {
  const { t, i18n } = useTranslation();
  const { data: sessionData, status, update } = useSession();
  const router = useRouter();
  const { pathname, query, asPath } = router;

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value);

    const newPathname = `/${value}${pathname}`;

    router.push({ pathname: newPathname, query }, asPath, {
      locale: value,
      scroll: false,
    });
  };

  const handleClickSignOut = useCallback(() => {
    signOut();
  }, []);

  return status === 'loading' ? (
    <UserNavSkeleton />
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative w-8 h-8 rounded-full'>
          {sessionData && sessionData.user.image && (
            <Avatar className='w-10 h-10'>
              <AvatarImage src={sessionData.user.image} />
              {sessionData.user.name && (
                <AvatarFallback>
                  {getNameInitials(sessionData.user.name)}
                </AvatarFallback>
              )}
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        {sessionData && sessionData && (
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'>
                {sessionData.user.name}
              </p>
              {sessionData.user?.email && (
                <p className='text-xs leading-none text-destructive-foreground'>
                  {sessionData.user.email}
                </p>
              )}
            </div>
          </DropdownMenuLabel>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={routes.reports}
            className={cn(
              'flex flex-row justify-center items-center text-white hover:underline mr-4 ml-1',
              Object.values(dashboardRoutes).includes(pathname)
                ? 'underline'
                : ''
            )}
          >
            <LayoutDashboardIcon width={17} height={16} />
            <span className='ml-2'>{t('dashboard.title')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className='cursor-pointer hover:underline'>
            <LanguageIcon width={21} height={20} />
            <span className='ml-2'>
              {t('languages.title', {
                replace: {
                  lang: i18n.resolvedLanguage,
                },
              })}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {languages.map((language, i) => (
                <DropdownMenuItem
                  key={i}
                  onClick={() => changeLanguage(language)}
                  className={cn(
                    i18n.resolvedLanguage === language
                      ? 'underline'
                      : 'hover:text-white'
                  )}
                >
                  {t(`languages.${language}`)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            variant='link'
            onClick={handleClickSignOut}
            className='flex flex-row justify-center items-center text-white hover:underline mr-4 ml-1 p-0 mr-0 h-auto'
          >
            <LogOutIcon width={17} height={16} />
            <span className='ml-2'>{t('common.logOut')}</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
