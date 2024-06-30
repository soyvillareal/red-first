import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { UserProvider } from '@auth0/nextjs-auth0/client';

import nextI18NextConfig from '@/next-i18next.config.js';
import { routes } from '@/lib/contants';

const App = ({ Component, pageProps }: AppProps) => {
  const { user } = pageProps;

  return (
    <UserProvider user={user} loginUrl={routes.login}>
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default appWithTranslation(App, nextI18NextConfig);
