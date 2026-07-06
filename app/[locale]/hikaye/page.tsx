import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { About } from '@/components/About/About';
import { Philosophy } from '@/components/Philosophy/Philosophy';
import { PageShell } from '@/components/PageShell/PageShell';
import { alternatesFor, localeUrl } from '@/lib/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: { absolute: t('storyTitle') },
    description: t('storyDescription'),
    alternates: alternatesFor(locale, '/hikaye'),
    openGraph: {
      title: t('storyOgTitle'),
      description: t('storyDescription'),
      url: localeUrl(locale, '/hikaye'),
      type: 'article',
    },
  };
}

export default async function HikayePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const tn = await getTranslations({ locale, namespace: 'nav' });
  return (
    <PageShell
      locale={locale}
      homeLabel={tn('home')}
      current={{ label: tn('hikaye'), path: '/hikaye' }}
    >
      <About />
      <Philosophy />
    </PageShell>
  );
}
