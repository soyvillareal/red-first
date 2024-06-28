import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useUser } from '@auth0/nextjs-auth0/client';

import LogoIcon from './icons/LogoIcon';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Navbar = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  return (
    <nav className='relative container mx-auto p-6'>
      {/* Flex Container */}
      <div className='flex items-center justify-between'>
        {/* Logo */}
        <div className='pt-2'>
          <LogoIcon className='sm:w-[300px]' />
        </div>

        {user ? (
          <div className='flex col-row items-center justify-center md:gap-2 py-3 px-5 text-white bg-primary rounded-full baseline'>
            {user.picture && (
              <Avatar>
                <AvatarImage src={user.picture} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
            <Link
              href='/api/auth/logout'
              className='text-white hover:underline mr-4'
            >
              {t('common.logOut')}
            </Link>
          </div>
        ) : (
          <div className='flex col-row items-center justify-center gap-4 md:gap-8'>
            {/* Login button */}
            <Link href='/api/auth/login' className='hover:text-muted'>
              {t('common.signIn')}
            </Link>
            {/* Register button */}
            <Link
              href='/api/auth/signup'
              className='hidden p-3 px-6 pt-2 text-white bg-primary rounded-full baseline hover:bg-accent md:block'
            >
              {t(user ? 'dashboard.title' : 'common.signUp')}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
