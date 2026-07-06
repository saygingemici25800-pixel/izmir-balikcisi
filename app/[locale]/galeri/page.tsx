import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Gallery } from '@/components/Gallery/Gallery';
import { PageShell } from '@/components/PageShell/PageShell';
import { alternatesFor, localeUrl } from '@/lib/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: { absolute: t('galleryTitle') },
    description: t('galleryDescription'),
    alternates: alternatesFor(locale, '/galeri'),
    openGraph: {
      title: t('galleryOgTitle'),
      description: t('galleryDescription'),
      url: localeUrl(locale, '/galeri'),
      type: 'website',
    },
  };
}

export default async function GaleriPage({
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
      current={{ label: tn('galeri'), path: '/galeri' }}
    >
      <Gallery />
    </PageShell>
  );
}
