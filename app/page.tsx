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

export default function Page() {
  return (
    <>
      <Hero />

      <Marquee
        items={[
          { text: 'Taze tabaklar' },
          { text: 'Sıfır alkol', tone: 'gold' },
          { text: 'Aile dostu' },
          { text: 'Fethiye · Muğla', tone: 'thin' },
          { text: 'Bahar 2026' },
          { text: 'Açık · 10.30—22.30', tone: 'gold' },
          { text: 'Otuz beş yıl' }
        ]}
        duration={42}
      />

      <About />

      <Marquee
        items={[
          { text: 'Bugünün tabakları' },
          { text: 'Levrek · Çupra · Kalkan', tone: 'gold' },
          { text: 'Karides güveç' },
          { text: 'Hamsi tava', tone: 'thin' },
          { text: 'Ahtapot carpaccio' },
          { text: 'Yatay kaydır →', tone: 'gold' }
        ]}
        duration={36}
        reverse
      />

      <MenuScroll />

      <Manifesto />

      <SocialProof />

      <Marquee
        items={[
          { text: 'Neden alkolsüz?' },
          { text: 'Çünkü zaten yeter.', tone: 'gold' },
          { text: 'Birbirini bul' },
          { text: 'Bir tabak, bir akşam', tone: 'thin' },
          { text: 'Otuz beş yıllık sofra', tone: 'gold' }
        ]}
        duration={44}
      />

      <Gallery />

      <SisterCta />

      <Contact />

      <Footer />
    </>
  );
}
