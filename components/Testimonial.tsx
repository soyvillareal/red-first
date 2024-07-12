import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

import { EUserRole } from '@/types';
import { routes } from '@/lib/contants';
import avatarAnisha from '@/public/images/avatar-anisha.png';
import avatarAli from '@/public/images/avatar-ali.png';
import avatarRichard from '@/public/images/avatar-richard.png';

import ButtonSignIn from './atoms/ButtonSignIn';

export const Testimonial = () => {
  const { t } = useTranslation();
  const { data: sessionData, status } = useSession();

  return (
    <section id="testimonials">
      <div className="max-w-6xl px-5 mx-auto mt-16 text-center">
        <h2 className="text-4xl font-bold text-center">
          {t('landing.whatsDifferentAbout')}
        </h2>
        <div className="flex flex-col mt-24 md:flex-row md:space-x-6">
          <div className="flex flex-col items-center p-6 space-y-6 rounded-lg bg-card-foreground md:w-1/3">
            <Image
              className="w-16 -mt-14"
              src={avatarAnisha.src}
              width={64}
              height={64}
              alt={t('common.avatar')}
            />
            <h5 className="text-lg font-bold text-muted">Anisha Li</h5>
            <p className="text-sm text-muted">
              “{t('landing.hasBoostedWorkflowAbility')}”
            </p>
          </div>
          <div className="hidden flex-col items-center p-6 space-y-6 rounded-lg bg-card-foreground md:flex md:w-1/3">
            <Image
              className="w-16 -mt-14"
              src={avatarAli.src}
              width={64}
              height={64}
              alt={t('common.avatar')}
            />
            <h5 className="text-lg font-bold text-muted">Ali Bravo</h5>
            <p className="text-sm text-muted">
              “{t('landing.weHaveBeenAbleCancel')}”
            </p>
          </div>
          <div className="hidden flex-col items-center p-6 space-y-6 rounded-lg bg-card-foreground md:flex md:w-1/3">
            <Image
              className="w-16 -mt-14"
              src={avatarRichard.src}
              width={64}
              height={64}
              alt={t('common.avatar')}
            />
            <h5 className="text-lg font-bold text-muted">Richard Watts</h5>
            <p className="text-sm text-muted">
              “{t('landing.hasBoostedMyAccountsAbility')}”
            </p>
          </div>
        </div>
        <div className="my-16">
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
            <div className="flex flex-row items-center justify-center p-3 px-6 pt-2 baseline">
              <ButtonSignIn
                className="!no-underline"
                textButton={t('landing.joinUs')}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
