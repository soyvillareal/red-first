import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => (
  <Html lang="en">
    <Head>
      <meta charSet="utf-8" />
      <meta name="robots" content="index, follow" />
      <meta name="google" content="notranslate" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
