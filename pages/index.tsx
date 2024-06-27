import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonial from '../components/Testimonial';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
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
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en')),
    },
    revalidate: 60 * 60 * 24 // 24 hours
  };
};
