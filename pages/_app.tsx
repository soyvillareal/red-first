import '@/styles/globals.css';

import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import { SessionProvider } from 'next-auth/react';
import { ApolloProvider } from '@apollo/client';

import nextI18NextConfig from '@/next-i18next.config';
import { apolloClient } from '@/lib/apollo';
import { pageview } from '@/lib/ga';

const App = ({ Component, pageProps }: AppProps) => {
  const { session } = pageProps;

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
};

export default appWithTranslation(App, nextI18NextConfig);
