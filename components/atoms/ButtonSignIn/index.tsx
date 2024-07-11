import { signIn } from 'next-auth/react';
import { useCallback } from 'react';

import { Button } from '@/components/custom/Button';
import SignInIcon from '@/components/icons/SignInIcon';
import { cn } from '@/lib/utils';

import { IButtonSignInProps } from './ButtonSignIn.types';

const ButtonSignIn = ({
  className,
  textButton,
  hasIcon = false,
}: IButtonSignInProps) => {
  const handleClickSignUp = useCallback(() => {
    signIn('auth0', undefined, { screen_hint: 'signup' });
  }, []);

  return (
    <Button
      variant="link"
      onClick={handleClickSignUp}
      className={cn(
        'block p-3 p-3 md:px-6 pt-2 text-white bg-primary rounded-full baseline hover:bg-accent pb-2',
        className,
      )}
    >
      {hasIcon && (
        <span className="block sm:hidden text-white">
          <SignInIcon />
        </span>
      )}
      <span className={cn(hasIcon ? 'hidden sm:block' : '')}>{textButton}</span>
    </Button>
  );
};

export default ButtonSignIn;
