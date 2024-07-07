import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Button } from '@/components/custom/Button';
import { defaultLanguage } from '@/lib/i18nConfig';

const NotFoundError = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">404</h1>
        <span className="font-medium">{t('notFound.title')}</span>
        <p className="text-center text-muted-foreground">
          {t('notFound.description')}
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            {t('common.goBack')}
          </Button>
          <Button onClick={() => router.push('/')}>
            {t('common.backToHome')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundError;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? defaultLanguage, [
        'common',
        'notFound',
      ])),
    },
  };
};
