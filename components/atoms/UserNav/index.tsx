import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { signIn, useSession } from 'next-auth/react';

import { Button } from '@/components/custom/Button';
import { UserNavSkeleton } from '@/components/skeleton/UserNavSkeleton';
import UserDropdown from '@/components/atoms/UserDropdown';
import SignInIcon from '@/components/icons/SignInIcon';

export const UserNav = () => {
  const { t } = useTranslation();
  const { status } = useSession();

  const handleClickSignIn = useCallback(() => {
    signIn('auth0');
  }, []);

  const handleClickSignUp = useCallback(() => {
    signIn('auth0', undefined, { screen_hint: 'signup' });
  }, []);

  return status === 'loading' ? (
    <UserNavSkeleton />
  ) : status === 'authenticated' ? (
    <UserDropdown />
  ) : (
    <div className="flex col-row items-center justify-center gap-4 md:gap-8">
      <Button
        variant="link"
        onClick={handleClickSignIn}
        className="hover:text-muted p-0 mr-0 h-auto"
      >
        {t('common.signIn')}
      </Button>
      <Button
        variant="link"
        onClick={handleClickSignUp}
        className="block p-3 p-3 md:px-6 pt-2 text-white bg-primary rounded-full baseline hover:bg-accent pb-2"
      >
        <span className="block sm:hidden text-white">
          <SignInIcon />
        </span>
        <span className="hidden sm:block">{t('common.signUp')}</span>
      </Button>
    </div>
  );
};
