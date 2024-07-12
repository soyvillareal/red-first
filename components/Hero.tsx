import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { routes } from '@/lib/contants';
import ButtonSignIn from '@/components/atoms/ButtonSignIn';
import { EUserRole } from '@/types';

export const Hero = () => {
  const { t } = useTranslation();
  const { data: sessionData, status } = useSession();

  return (
    <section id="hero">
      <div className="container flex flex-col-reverse items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0 md:flex-row">
        <div className="flex flex-col mb-16 space-y-12 md:w-1/2">
          <h1 className="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left">
            {t('landing.your_best_friend')}
          </h1>
          <p className="max-w-sm text-center text-muted md:text-left">
            {t('landing.makes_it_easy')}
          </p>
          <div className="flex justify-center md:justify-start">
            {status === 'authenticated' ? (
              <Link
                href={
                  sessionData?.user.roles.includes(EUserRole.ADMIN)
                    ? routes.reports
                    : routes.movements
                }
                className="p-3 px-6 pt-2 text-white bg-primary rounded-full baseline hover:bg-accent"
              >
                {t('dashboard.title')}
              </Link>
            ) : (
              <ButtonSignIn
                className="!no-underline"
                textButton={t('landing.joinUs')}
              />
            )}
          </div>
        </div>
        <div className="md:w-1/2">
          <Image
            src="images/illustration-intro.svg"
            alt={t('landing.description')}
            className="w-auto h-auto"
            width={400}
            height={400}
            fetchPriority="high"
            priority
          />
        </div>
      </div>
    </section>
  );
};
