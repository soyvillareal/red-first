import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { routes } from '@/lib/contants';

export const Hero = () => {
  const { t } = useTranslation();
  const session = useSession();

  return (
    <section id="hero">
      {/* Flex Container */}
      <div className="container flex flex-col-reverse items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0 md:flex-row">
        {/* Left Item */}
        <div className="flex flex-col mb-32 space-y-12 md:w-1/2">
          <h1 className="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left">
            {t('landing.your_best_friend')}
          </h1>
          <p className="max-w-sm text-center text-muted md:text-left">
            {t('landing.makes_it_easy')}
          </p>
          <div className="flex justify-center md:justify-start">
            {session.status === 'authenticated' ? (
              <Link
                href={routes.reports}
                className="p-3 px-6 pt-2 text-white bg-primary rounded-full baseline hover:bg-accent"
              >
                {t('dashboard.title')}
              </Link>
            ) : (
              <Link
                href={routes.signUp}
                className="p-3 px-6 pt-2 text-white bg-primary rounded-full baseline hover:bg-accent"
              >
                {t('common.signUp')}
              </Link>
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
