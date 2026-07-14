import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import MenuFull from '@/components/MenuFull/MenuFull';
import { PageShell } from '@/components/PageShell/PageShell';
import { getContent } from '@/lib/content';
import { alternatesFor, localeUrl } from '@/lib/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: { absolute: t('menuTitle') },
    description: t('menuDescription'),
    alternates: alternatesFor(locale, '/menu'),
    openGraph: {
      title: t('menuOgTitle'),
      description: t('menuDescription'),
      url: localeUrl(locale, '/menu'),
      type: 'website',
    },
  };
}

export default async function MenuPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const { menu } = await getContent();
  const tn = await getTranslations({ locale, namespace: 'nav' });
  return (
    <PageShell
      locale={locale}
      homeLabel={tn('home')}
      current={{ label: tn('menu'), path: '/menu' }}
    >
      <MenuFull menu={menu} locale={locale} />
    </PageShell>
  );
}
