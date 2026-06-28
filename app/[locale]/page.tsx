import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/Hero/Hero';
import { Marquee } from '@/components/Marquee/Marquee';
import { About } from '@/components/About/About';
import { MenuScroll } from '@/components/MenuScroll/MenuScroll';
import { Manifesto } from '@/components/Manifesto/Manifesto';
import { SocialProof } from '@/components/SocialProof/SocialProof';
import { Gallery } from '@/components/Gallery/Gallery';
import { Contact } from '@/components/Contact/Contact';
import { Footer } from '@/components/Footer/Footer';
import { SisterCta } from '@/components/SisterCta/SisterCta';
import { getContent, featuredItems } from '@/lib/content';

// Marquee tones (styling) stay in code; the phrases come from messages.
type Tone = 'gold' | 'thin' | undefined;
const TONES_A: Tone[] = [undefined, 'gold', undefined, 'thin', undefined, 'gold', undefined];
const TONES_B: Tone[] = [undefined, 'gold', undefined, 'thin', undefined, 'gold'];
const TONES_C: Tone[] = [undefined, 'gold', undefined, 'thin', 'gold'];

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('marquee');
  const { menu } = await getContent();
  const dishes = featuredItems(menu).filter((d) => d.img);

  const band = (key: 'a' | 'b' | 'c', tones: Tone[]) =>
    (t.raw(key) as string[]).map((text, i) => (tones[i] ? { text, tone: tones[i] } : { text }));

  return (
    <>
      <Hero />

      <Marquee items={band('a', TONES_A)} duration={42} />

      <About />

      <Marquee items={band('b', TONES_B)} duration={36} reverse />

      <MenuScroll dishes={dishes} />

      <Gallery />

      <Manifesto />

      <SocialProof />

      <Marquee items={band('c', TONES_C)} duration={44} />

      <SisterCta />

      <Contact />

      <Footer />
    </>
  );
}
