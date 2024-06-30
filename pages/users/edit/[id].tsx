import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { loadTranslations } from '@/lib/i18n';

import DashboardLayout from '@/components/atoms/DashboardLayout';
import ContentSection from '@/components/atoms/ContentSection';
import { ContextLayout } from '@/components/custom/layout';
import { UserNav } from '@/components/atoms/UserNav';
import { UserForm } from '@/components/atoms/UserForm';
import { routes } from '@/lib/contants';

export default function EditUser() {
  const { t } = useTranslation();
  const { query } = useRouter();

  console.log('query: ', query);

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
          <ContentSection title={t('editUser.title')} goBackUrl={routes.users}>
            <UserForm />
          </ContentSection>
        </ContextLayout.Body>
      </DashboardLayout>
    </ContextLayout>
  );
}

export async function getStaticPaths() {
  const paths = [
    { params: { id: 'clxwmjate0008xgvbccum3cmv' } },
    { params: { id: '0vlxwmcum3ccvjate008xgmbc' } },
  ];

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
  return loadTranslations(context.locale);
};
