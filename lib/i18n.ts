import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const loadTranslations = async (locale: string | undefined) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en')),
  },
  revalidate: 60 * 60 * 24, // 24 hours
});
