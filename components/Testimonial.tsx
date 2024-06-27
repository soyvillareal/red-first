import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import avatarAnisha from '../public/images/avatar-anisha.png';
import avatarAli from '../public/images/avatar-ali.png';
import avatarRichard from '../public/images/avatar-richard.png';

const Testimonial = () => {
  const { t } = useTranslation();

  return (
    <section id='testimonials'>
      {/* Container to heading and testm blocks */}
      <div className='max-w-6xl px-5 mx-auto mt-32 text-center'>
        {/* Heading */}
        <h2 className='text-4xl font-bold text-center'>
          {t('landing.whatsDifferentAbout')}
        </h2>
        {/* Testimonials Container */}
        <div className='flex flex-col mt-24 md:flex-row md:space-x-6'>
          {/* Testimonial 1 */}
          <div className='flex flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:w-1/3'>
            <img src={avatarAnisha.src} className='w-16 -mt-14' alt='' />
            <h5 className='text-lg font-bold'>Anisha Li</h5>
            <p className='text-sm text-darkGrayishBlue'>
              “{t('landing.hasBoostedWorkflowAbility')}”
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className='hidden flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:flex md:w-1/3'>
            <img src={avatarAli.src} className='w-16 -mt-14' alt='' />
            <h5 className='text-lg font-bold'>Ali Bravo</h5>
            <p className='text-sm text-darkGrayishBlue'>
              “{t('landing.weHaveBeenAbleCancel')}”
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className='hidden flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:flex md:w-1/3'>
            <img src={avatarRichard.src} className='w-16 -mt-14' alt='' />
            <h5 className='text-lg font-bold'>Richard Watts</h5>
            <p className='text-sm text-darkGrayishBlue'>
              “{t('landing.hasBoostedMyAccountsAbility')}”
            </p>
          </div>
        </div>
        {/* Button */}
        <div className='my-16'>
          <Link
            href='#'
            className='p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight'
          >
            {t('common.signUp')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
