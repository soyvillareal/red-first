import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { getSession } from 'next-auth/react';

import { DashboardLayout } from '@/components/atoms/DashboardLayout';
import { ContentSection } from '@/components/atoms/ContentSection';
import { MovementForm } from '@/components/atoms/MovementForm';
import { routes } from '@/lib/contants';
import { loadTranslations } from '@/lib/i18n';
import { EUserRole } from '@/types';

const NewMovement = () => {
  const { t } = useTranslation();

  return (
    <DashboardLayout
      seo={{
        title: t('SEO.NEW_MOVEMENT.title'),
        description: t('SEO.NEW_MOVEMENT.description'),
        keywords: t('SEO.NEW_MOVEMENT.keywords'),
      }}
    >
      <ContentSection
        title={t('newMovement.title')}
        goBackUrl={routes.movements}
      >
        <MovementForm />
      </ContentSection>
    </DashboardLayout>
  );
};

export default NewMovement;

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

  if (session.user.roles.includes(EUserRole.ADMIN) === false) {
    return {
      props: {
        ...translations.props,
      },
      redirect: {
        destination: '/404',
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
