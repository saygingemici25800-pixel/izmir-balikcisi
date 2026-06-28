import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import MenuFull from '@/components/MenuFull/MenuFull';
import { getContent } from '@/lib/content';
import { SITE } from '@/lib/constants';
import { routing } from '@/i18n/routing';

const localePath = (locale: string, path = '') =>
  `${SITE.url}${locale === routing.defaultLocale ? '' : '/' + locale}${path}`;

const hreflang = (path: string) => ({
  tr: `${SITE.url}${path}`,
  en: `${SITE.url}/en${path}`,
  ar: `${SITE.url}/ar${path}`,
  'x-default': `${SITE.url}${path}`,
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: { absolute: t('menuTitle') },
    description: t('menuDescription'),
    alternates: { canonical: localePath(locale, '/menu'), languages: hreflang('/menu') },
    openGraph: {
      title: t('menuOgTitle'),
      description: t('menuDescription'),
      url: localePath(locale, '/menu'),
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
  return <MenuFull menu={menu} />;
}
