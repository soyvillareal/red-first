import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { loadTranslations } from '@/lib/i18n';

import DashboardLayout from '@/components/atoms/DashboardLayout';
import ContentSection from '@/components/atoms/ContentSection';
import { ContextLayout } from '@/components/custom/layout';
import { UserNav } from '@/components/atoms/UserNav';
import { UserForm } from '@/components/atoms/UserForm';
import { routes } from '@/lib/contants';

import { UsersRepository } from '@/server/dataAccess/users';
import { type IEditServerSideParams, type IEditUserProps } from './edit.types';
import { EUserRole, EUserRoleRoleNormalized } from '@/types';
import { getSession } from 'next-auth/react';

export default function EditUser({ user }: IEditUserProps) {
  const { t } = useTranslation();

  const {
    id,
    name,
    roles: [role],
  } = user;

  return (
    <ContextLayout>
      <DashboardLayout>
        <ContextLayout.Header sticky>
          <div className='ml-auto flex items-center space-x-4'>
            <UserNav />
          </div>
        </ContextLayout.Header>
        <ContextLayout.Body>
          <ContentSection title={t('editUser.title')} goBackUrl={routes.users}>
            <UserForm
              userId={id}
              userData={{
                name: name ?? '',
                role: role as EUserRoleRoleNormalized,
              }}
            />
          </ContentSection>
        </ContextLayout.Body>
      </DashboardLayout>
    </ContextLayout>
  );
}

export const getServerSideProps: GetServerSideProps<
  IEditUserProps,
  IEditServerSideParams
> = async (context) => {
  const userId = context.params?.id;
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

  if (userId === null || userId === undefined) {
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

  try {
    const userRepository = new UsersRepository();

    const foundUser = await userRepository.getUserById(userId);

    if (foundUser === null || foundUser === undefined) {
      return {
        redirect: {
          destination: '/404', // Cambia esto por tu ruta deseada
          permanent: false,
        },
      };
    }

    return {
      props: {
        user: foundUser,
        ...translations.props,
      },
    };
  } catch (error) {
    return {
      props: {
        ...translations.props,
      },
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }
};
