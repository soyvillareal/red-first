import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { signIn, useSession } from 'next-auth/react';

import { Button } from '@/components/custom/Button';
import { UserNavSkeleton } from '@/components/skeleton/UserNavSkeleton';
import UserDropdown from '@/components/atoms/UserDropdown';
import ButtonSignIn from '@/components/atoms/ButtonSignIn';

export const UserNav = () => {
  const { t } = useTranslation();
  const { status } = useSession();

  const handleClickSignIn = useCallback(() => {
    signIn('auth0');
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
      <ButtonSignIn textButton={t('common.signUp')} hasIcon />
    </div>
  );
};
