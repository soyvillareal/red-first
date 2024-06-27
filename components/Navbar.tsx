import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import LogoIcon from './icons/LogoIcon';

const Navbar = () => {
  const { t } = useTranslation();
  return (
    <nav className='relative container mx-auto p-6'>
      {/* Flex Container */}
      <div className='flex items-center justify-between'>
        {/* Logo */}
        <div className='pt-2'>
          <LogoIcon className='sm:w-[300px]' />
        </div>

        <div className='flex col-row items-center justify-center gap-4 md:gap-8'>
          {/* Login button */}
          <Link href='#' className='hover:text-darkGrayishBlue'>
            {t('common.signIn')}
          </Link>
          {/* Register button */}
          <Link
            href='#'
            className='hidden p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight md:block'
          >
            {t('common.signUp')}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
