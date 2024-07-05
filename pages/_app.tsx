import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { SessionProvider } from 'next-auth/react';
import { ApolloProvider } from '@apollo/client';

import nextI18NextConfig from '@/next-i18next.config';
import apolloClient from '@/lib/apollo';

const App = ({ Component, pageProps }: AppProps) => {
  const { session } = pageProps;

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
};

export default appWithTranslation(App, nextI18NextConfig);
