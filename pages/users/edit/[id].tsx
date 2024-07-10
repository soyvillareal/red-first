import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { getSession } from 'next-auth/react';

import { loadTranslations } from '@/lib/i18n';
import { DashboardLayout } from '@/components/atoms/DashboardLayout';
import { ContentSection } from '@/components/atoms/ContentSection';
import { UserForm } from '@/components/atoms/UserForm';
import { routes } from '@/lib/contants';
import { UsersRepository } from '@/server/dataAccess/users';
import { EUserRole, EUserRoleRoleNormalized } from '@/types';

import {
  type IEditServerSideParams,
  type IEditUserProps,
} from '@/components/pages/users/edit/edit.types';

const EditUser = ({ user }: IEditUserProps) => {
  const { t } = useTranslation();

  const {
    id,
    name,
    roles: [role],
  } = user;

  return (
    <DashboardLayout
      seo={{
        title: t('SEO.EDIT_USER.title'),
        description: t('SEO.EDIT_USER.description'),
        keywords: t('SEO.EDIT_USER.keywords'),
      }}
    >
      <ContentSection title={t('editUser.title')} goBackUrl={routes.users}>
        <UserForm
          userId={id}
          userData={{
            name: name ?? '',
            role: role as EUserRoleRoleNormalized,
          }}
        />
      </ContentSection>
    </DashboardLayout>
  );
};

export default EditUser;

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
