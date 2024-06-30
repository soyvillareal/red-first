import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useUser } from '@auth0/nextjs-auth0/client';

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

export const UserNav = () => {
  const { t, i18n } = useTranslation();
  const { user } = useUser();
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          {user && user.picture && (
            <Avatar className='w-10 h-10'>
              <AvatarImage src={user.picture} />
              {user.name && (
                <AvatarFallback>{getNameInitials(user.name)}</AvatarFallback>
              )}
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        {user && (
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'>{user.name}</p>
              {user?.email && (
                <p className='text-xs leading-none text-destructive-foreground'>
                  {user.email}
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
          <Link
            href={routes.logout}
            className='flex flex-row justify-center items-center text-white hover:underline mr-4 ml-1'
          >
            <LogOutIcon width={17} height={16} />
            <span className='ml-2'>{t('common.logOut')}</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
