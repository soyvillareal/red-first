import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useUser } from '@auth0/nextjs-auth0/client';

import LogoIcon from '@/components/icons/LogoIcon';
import { UserNav } from '@/components/atoms/UserNav';
import { routes } from '@/lib/contants';

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
          <UserNav />
        ) : (
          <div className='flex col-row items-center justify-center gap-4 md:gap-8'>
            {/* Login button */}
            <Link href={routes.login} className='hover:text-muted'>
              {t('common.signIn')}
            </Link>
            {/* Register button */}
            <Link
              href={routes.signUp}
              className='hidden p-3 px-6 pt-2 text-white bg-primary rounded-full baseline hover:bg-accent md:block'
            >
              {t('common.signUp')}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
