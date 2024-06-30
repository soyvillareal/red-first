import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';

import { loadTranslations } from '@/lib/i18n';
import DashboardLayout from '@/components/atoms/DashboardLayout';
import ContentSection from '@/components/atoms/ContentSection';
import { ContextLayout } from '@/components/custom/layout';
import { UserNav } from '@/components/atoms/UserNav';
import { MovementForm } from '@/components/atoms/MovementForm';
import { routes } from '@/lib/contants';

export default function NewMovement() {
  const { t } = useTranslation();

  return (
    <ContextLayout>
      <DashboardLayout>
        {/* ===== Top Heading ===== */}
        <ContextLayout.Header sticky>
          <div className='ml-auto flex items-center space-x-4'>
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

export const getStaticProps: GetStaticProps = async (context) => {
  return loadTranslations(context.locale);
};
