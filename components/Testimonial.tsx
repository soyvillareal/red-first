import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import avatarAnisha from '../public/images/avatar-anisha.png';
import avatarAli from '../public/images/avatar-ali.png';
import avatarRichard from '../public/images/avatar-richard.png';
import { useUser } from '@auth0/nextjs-auth0/client';
import { routes } from '@/lib/contants';

const Testimonial = () => {
  const { t } = useTranslation();
  const { user } = useUser();

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
          <div className='flex flex-col items-center p-6 space-y-6 rounded-lg bg-card-foreground md:w-1/3'>
            <img
              src={avatarAnisha.src}
              className='w-16 -mt-14'
              alt={t('common.avatar')}
            />
            <h5 className='text-lg font-bold text-muted'>Anisha Li</h5>
            <p className='text-sm text-muted'>
              “{t('landing.hasBoostedWorkflowAbility')}”
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className='hidden flex-col items-center p-6 space-y-6 rounded-lg bg-card-foreground md:flex md:w-1/3'>
            <img
              src={avatarAli.src}
              className='w-16 -mt-14'
              alt={t('common.avatar')}
            />
            <h5 className='text-lg font-bold text-muted'>Ali Bravo</h5>
            <p className='text-sm text-muted'>
              “{t('landing.weHaveBeenAbleCancel')}”
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className='hidden flex-col items-center p-6 space-y-6 rounded-lg bg-card-foreground md:flex md:w-1/3'>
            <img
              src={avatarRichard.src}
              className='w-16 -mt-14'
              alt={t('common.avatar')}
            />
            <h5 className='text-lg font-bold text-muted'>Richard Watts</h5>
            <p className='text-sm text-muted'>
              “{t('landing.hasBoostedMyAccountsAbility')}”
            </p>
          </div>
        </div>
        {/* Button */}
        <div className='my-16'>
          {user ? (
            <Link
              href={routes.reports}
              className='p-3 px-6 pt-2 text-white bg-primary rounded-full baseline hover:bg-accent'
            >
              {t('dashboard.title')}
            </Link>
          ) : (
            <Link
              href={routes.signUp}
              className='p-3 px-6 pt-2 text-white bg-primary rounded-full baseline hover:bg-accent'
            >
              {t('common.signUp')}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
