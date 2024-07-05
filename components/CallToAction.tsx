import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useSession } from 'next-auth/react';

import { routes } from '@/lib/contants';

const CallToAction = () => {
  const { t } = useTranslation();
  const session = useSession();

  return (
    <section id="cta" className="bg-primary">
      {/* Flex Container */}
      <div className="container flex flex-col items-center justify-between px-6 py-24 mx-auto space-y-12 md:py-12 md:flex-row md:space-y-0">
        {/* Heading */}
        <h2 className="text-5xl font-bold leading-tight text-center text-white md:text-4xl md:max-w-xl md:text-left">
          {t('landing.simplify_your_accounts')}
        </h2>
        {/* Button */}
        <div>
          {session.status === 'authenticated' ? (
            <Link
              href={routes.reports}
              className="p-3 px-6 pt-2 text-primary bg-white rounded-full shadow-2xl baseline hover:bg-gray-900"
            >
              {t('dashboard.title')}
            </Link>
          ) : (
            <Link
              href={routes.signUp}
              className="p-3 px-6 pt-2 text-primary bg-white rounded-full shadow-2xl baseline hover:bg-gray-900"
            >
              {t('common.signUp')}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
