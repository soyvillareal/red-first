import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const CallToAction = () => {
  const { t } = useTranslation();
  return (
    <section id='cta' className='bg-brightRed'>
      {/* Flex Container */}
      <div className='container flex flex-col items-center justify-between px-6 py-24 mx-auto space-y-12 md:py-12 md:flex-row md:space-y-0'>
        {/* Heading */}
        <h2 className='text-5xl font-bold leading-tight text-center text-white md:text-4xl md:max-w-xl md:text-left'>
          {t('landing.simplify_your_accounts')}
        </h2>
        {/* Button */}
        <div>
          <Link
            href='#'
            className='p-3 px-6 pt-2 text-brightRed bg-white rounded-full shadow-2xl baseline hover:bg-gray-900'
          >
            {t('common.signUp')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
