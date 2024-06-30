import Link from 'next/link';

import LogoWhiteIcon from './icons/LogoWhiteIcon';
import FacebookIcon from './icons/FacebookIcon';
import YoutubeIcon from './icons/YoutubeIcon';
import XIcon from './icons/XIcon';
import PinterestIcon from './icons/PinterestIcon';
import InstagramIcon from './icons/InstagramIcon';

const Footer = () => {
  return (
    <div className='bg-secondary-foreground'>
      {/* Flex Container */}
      <div className='container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0'>
        {/* Logo and social links container */}
        <div className='flex flex-col-reverse items-center justify-center space-y-12 md:flex-col md:space-y-0 md:items-start h-8 mt-8 md:mt-0'>
          {/* Social Links Container */}
          <div className='flex justify-center items-center space-x-4'>
            {/* Link 1 */}
            <Link href='#'>
              <FacebookIcon className='h-5' />
            </Link>
            {/* Link 2 */}
            <Link href='#'>
              <YoutubeIcon className='h-5' />
            </Link>
            {/* Link 3 */}
            <Link href='#'>
              <XIcon className='h-5' />
            </Link>
            {/* Link 4 */}
            <Link href='#'>
              <PinterestIcon className='h-5' />
            </Link>
            {/* Link 5 */}
            <Link href='#'>
              <InstagramIcon className='h-5' />
            </Link>
          </div>
        </div>

        {/* Input Container */}
        <div className='flex justify-center items-center'>
          <div className='text-white text-center md:block h-5'>
            Copyright © 2022, All Rights Reserved
          </div>
        </div>

        {/* Logo */}
        <div className='flex flex-row justify-center items-center gap-3'>
          <LogoWhiteIcon />
        </div>
      </div>
    </div>
  );
};

export default Footer;
