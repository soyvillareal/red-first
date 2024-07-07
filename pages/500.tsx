import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { cn } from '@/lib/utils';
import { Button } from '@/components/custom/Button';
import { defaultLanguage } from '@/lib/i18nConfig';

interface GeneralErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  minimal?: boolean;
}

const GeneralError = ({ className, minimal = false }: GeneralErrorProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className={cn('h-svh w-full', className)}>
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        {!minimal && (
          <h1 className="text-[7rem] font-bold leading-tight">500</h1>
        )}
        <span className="font-medium">{t('internalError.title')}</span>
        <p className="text-center text-muted-foreground">
          {t('internalError.description')}
        </p>
        {!minimal && (
          <div className="mt-6 flex gap-4">
            <Button variant="outline" onClick={() => router.back()}>
              {t('common.goBack')}
            </Button>
            <Button onClick={() => router.push('/')}>
              {t('common.backToHome')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralError;

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
