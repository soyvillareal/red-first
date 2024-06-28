import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function loadTranslations(locale: string | undefined) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en')),
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
}
