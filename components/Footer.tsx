import Link from 'next/link';

import LogoWhiteIcon from './icons/LogoWhiteIcon';
import FacebookIcon from './icons/FacebookIcon';
import YoutubeIcon from './icons/YoutubeIcon';
import XIcon from './icons/XIcon';
import PinterestIcon from './icons/PinterestIcon';
import InstagramIcon from './icons/InstagramIcon';

const Footer = () => {
  return (
    <div className='bg-veryDarkBlue'>
      {/* Flex Container */}
      <div className='container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0'>
        {/* Logo and social links container */}
        <div className='flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start'>
          {/* Social Links Container */}
          <div className='flex justify-center space-x-4'>
            {/* Link 1 */}
            <Link href='#'>
              <FacebookIcon className='h-8' />
            </Link>
            {/* Link 2 */}
            <Link href='#'>
              <YoutubeIcon className='h-8' />
            </Link>
            {/* Link 3 */}
            <Link href='#'>
              <XIcon className='h-8' />
            </Link>
            {/* Link 4 */}
            <Link href='#'>
              <PinterestIcon className='h-8' />
            </Link>
            {/* Link 5 */}
            <Link href='#'>
              <InstagramIcon className='h-8' />
            </Link>
          </div>
        </div>

        {/* Input Container */}
        <div className='flex flex-col justify-between mb-12'>
          <div className='text-white text-center md:block'>
            Copyright © 2022, All Rights Reserved
          </div>
        </div>

        {/* Logo */}
        <div className="flex flex-row justify-center">
          <LogoWhiteIcon className='h-8' />
        </div>
      </div>
    </div>
  );
};

export default Footer;
