import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import MenuPreview from '@/components/sections/MenuPreview';
import WhyAlcoholFree from '@/components/sections/WhyAlcoholFree';
import Gallery from '@/components/sections/Gallery';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <MenuPreview />
      <WhyAlcoholFree />
      <Gallery />
      <Contact />
    </main>
  );
}

