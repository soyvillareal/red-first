import { GetStaticProps } from 'next';
import { loadTranslations } from '@/lib/i18n';

import DashboardLayout from '@/components/DashboardLayout';
import ContentSection from '@/components/ContentSection';
import { ContextLayout } from '@/components/custom/layout';
import { UserNav } from '@/components/UserNav';

import { MovementForm } from './MovementForm';

export default function NewMovement() {
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
          <ContentSection title='Nuevo movimiento' goBackUrl='/movements'>
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
