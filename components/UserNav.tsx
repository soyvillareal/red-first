import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/custom/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const UserNav = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          {user && user.picture && (
            <Avatar className='h-8 w-8'>
              <AvatarImage src={user.picture} />
              <AvatarFallback>{user.nickname}</AvatarFallback>
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
                <p className='text-xs leading-none text-muted-foreground'>
                  {user.email}
                </p>
              )}
            </div>
          </DropdownMenuLabel>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href='/api/auth/logout'
            className='text-white hover:underline mr-4'
          >
            {t('common.logOut')}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
