import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';

import Navbar from '@/components/atoms/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonial from '@/components/Testimonial';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import { loadTranslations } from '@/lib/i18n';
import { SEO } from '@/lib/utils';

const Home = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Head>
        <title>{t('SEO.title')}</title>
        <meta name="description" content={t('SEO.description')} />
        <meta name="keywords" content={t('SEO.keywords')} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={SEO.twitter.site} />
        <meta name="twitter:title" content={t('SEO.twitter.title')} />
        <meta name="twitter:description" content={t('SEO.twitter.title')} />
        <meta name="twitter:image" content={SEO.twitter.image} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content={SEO.twitter.creator} />
        <meta property="og:type" content={SEO.openGraph.type} />
        <meta property="og:locale" content={SEO.openGraph.locale} />
        <meta property="og:url" content={SEO.openGraph.url} />
        <meta property="og:site_name" content={t('SEO.openGraph.site_name')} />
        <meta property="og:title" content={t('SEO.openGraph.title')} />
        <meta
          property="og:description"
          content={t('SEO.openGraph.description')}
        />
        <meta property="og:site_name" content={t('SEO.openGraph.site_name')} />
        <meta property="og:url" content={SEO.openGraph.url} />
        <meta property="og:image" content={SEO.openGraph.image.url} />
        <meta property="og:image:width" content={SEO.openGraph.image.width} />
        <meta property="og:image:height" content={SEO.openGraph.image.height} />
        <link rel="canonical" href={SEO.url} />
      </Head>
      <>
        <Navbar />
        <Hero />
        <Features />
        <Testimonial />
        <CallToAction />
        <Footer />
      </>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return loadTranslations(context.locale);
};

export default Home;
