import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { getSession } from 'next-auth/react';

import DashboardLayout from '@/components/atoms/DashboardLayout';
import ContentSection from '@/components/atoms/ContentSection';
import { ContextLayout } from '@/components/custom/layout';
import { UserNav } from '@/components/atoms/UserNav';
import { MovementForm } from '@/components/atoms/MovementForm';
import { routes } from '@/lib/contants';
import { loadTranslations } from '@/lib/i18n';

export default function NewMovement() {
  const { t } = useTranslation();

  return (
    <ContextLayout>
      <DashboardLayout
        seo={{
          title: t('SEO.NEW_MOVEMENT.title'),
          description: t('SEO.NEW_MOVEMENT.description'),
          keywords: t('SEO.NEW_MOVEMENT.keywords'),
        }}
      >
        <ContextLayout.Header sticky>
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </ContextLayout.Header>

        <ContextLayout.Body>
          <ContentSection
            title={t('newMovement.title')}
            goBackUrl={routes.movements}
          >
            <MovementForm />
          </ContentSection>
        </ContextLayout.Body>
      </DashboardLayout>
    </ContextLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  const translations = await loadTranslations(context.locale);

  if (session === null) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...translations.props,
    },
  };
};
