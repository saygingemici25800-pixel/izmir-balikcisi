import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/Hero/Hero';
import { About } from '@/components/About/About';
import { MenuScroll } from '@/components/MenuScroll/MenuScroll';
import { Gallery } from '@/components/Gallery/Gallery';
import { Contact } from '@/components/Contact/Contact';
import { Footer } from '@/components/Footer/Footer';
import { getContent } from '@/lib/content';

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const { menu } = await getContent();

  return (
    <>
      <Hero />

      <About />

      <MenuScroll menu={menu} />

      <Gallery />

      <Contact />

      <Footer />
    </>
  );
}
