import { useTranslation } from 'next-i18next';
import { signIn, useSession } from 'next-auth/react';

import LogoIcon from '@/components/icons/LogoIcon';
import { UserNav } from '@/components/atoms/UserNav';
import { Button } from '@/components/ui/button';
import { useCallback } from 'react';

const Navbar = () => {
  const { t } = useTranslation();
  const session = useSession();

  const handleClickSignIn = useCallback(() => {
    signIn('auth0');
  }, []);

  const handleClickSignUp = useCallback(() => {
    signIn('auth0', undefined, { screen_hint: 'signup' });
  }, []);

  return (
    <nav className='relative container mx-auto p-6'>
      {/* Flex Container */}
      <div className='flex items-center justify-between'>
        {/* Logo */}
        <div className='pt-2'>
          <LogoIcon className='sm:w-[300px]' />
        </div>
        {session.status === 'authenticated' ? (
          <UserNav />
        ) : (
          <div className='flex col-row items-center justify-center gap-4 md:gap-8'>
            <Button
              variant='link'
              onClick={handleClickSignIn}
              className='hover:text-muted p-0 mr-0 h-auto'
            >
              {t('common.signIn')}
            </Button>
            <Button
              variant='link'
              onClick={handleClickSignUp}
              className='hidden p-3 px-6 pt-2 text-white bg-primary rounded-full baseline hover:bg-accent md:block pb-2'
            >
              {t('common.signUp')}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
