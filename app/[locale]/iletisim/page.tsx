import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Contact } from '@/components/Contact/Contact';
import { PageShell } from '@/components/PageShell/PageShell';
import { alternatesFor, localeUrl } from '@/lib/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: { absolute: t('contactTitle') },
    description: t('contactDescription'),
    alternates: alternatesFor(locale, '/iletisim'),
    openGraph: {
      title: t('contactOgTitle'),
      description: t('contactDescription'),
      url: localeUrl(locale, '/iletisim'),
      type: 'website',
    },
  };
}

export default async function IletisimPage({
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
      current={{ label: tn('iletisim'), path: '/iletisim' }}
    >
      <Contact />
    </PageShell>
  );
}
