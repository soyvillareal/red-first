import Head from 'next/head';
import { GetStaticProps } from 'next';

import Navbar from '@/components/atoms/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonial from '@/components/Testimonial';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import { loadTranslations } from '@/lib/i18n';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Red First</title>
        <link rel='icon' href='/favicon.ico' />
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
