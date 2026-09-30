import { MENU, type Localized } from './menu';
import { MEDIA_BY_NAME } from './menuMedia';

/**
 * Gallery data — real venue photos + product shots (menu posters).
 * Captions are localized; food captions come straight from the menu so they
 * always match the dish names on /menu.
 */
export type GalleryShot = { src: string; cap: Localized };

const L = (tr: string, en: string, ar: string): Localized => ({ tr, en, ar });

export const VENUE: GalleryShot[] = [
  { src: '/images/mekan/giris.webp', cap: L('Giriş', 'Entrance', 'المدخل') },
  { src: '/images/mekan/salon.webp', cap: L('Salon', 'Dining room', 'الصالة') },
  { src: '/images/mekan/sef-sofrasi.webp', cap: L('Şefin sofrası', "The chef's table", 'مائدة الشيف') },
  { src: '/images/mekan/teras.webp', cap: L('Teras', 'Terrace', 'التراس') },
  { src: '/images/mekan/salon-detay.webp', cap: L('Kemerler', 'Arches', 'الأقواس') },
  { src: '/images/mekan/ahsap-detay.webp', cap: L('Ahşap ve mavi', 'Wood & blue', 'الخشب والأزرق') },
  { src: '/images/mekan/tabela.webp', cap: L('Tabela', 'The sign', 'اللافتة') },
];

// Sharper, upscaled copies exist for a few dishes — prefer them.
const UPSCALED = new Set(['levrek-lokum', 'ahtapot-izgara', 'cupra-izgara', 'karisik-deniz-mahsulu']);

const SLUG_TO_NAME = new Map(Object.entries(MEDIA_BY_NAME).map(([name, slug]) => [slug, name]));
const ITEM_BY_TR = new Map(MENU.flatMap((c) => c.items).map((i) => [i.name.tr, i.name]));

const dish = (slug: string): GalleryShot => {
  const tr = SLUG_TO_NAME.get(slug) ?? slug;
  return {
    src: UPSCALED.has(slug) ? `/images/yemek/${slug}.webp` : `/menu-media/posters/${slug}.webp`,
    cap: ITEM_BY_TR.get(tr) ?? L(tr, tr, tr),
  };
};

export const MEZE: GalleryShot[] = [
  'karisik-deniz-mahsulu', 'atom', 'bademli-havuc-tarator', 'haydari', 'cacik', 'fava-tekmil',
  'enginar', 'antep-ezme', 'patlican-salatasi', 'saksuka', 'deniz-borulcesi', 'kaya-korugu',
  'karisik-ot', 'kibris-meze', 'elmali-pancar', 'mevsim-salata', 'ciroz', 'levrek-marin', 'karides-marin',
].map(dish);

export const SEA: GalleryShot[] = [
  'levrek-lokum', 'ahtapot-izgara', 'cupra-izgara', 'kalamar-tava', 'kalamar-izgara', 'karide-tava',
  'lahos-sis', 'balikci-boregi', 'yogurtlu-sicak-ot', 'balik-corbasi', 'izgara-zeytin', 'izgara-kofte',
].map(dish);

/** Home teaser — a mixed selection (venue first, then signature dishes). */
export const TEASER: GalleryShot[] = [
  VENUE[0], SEA[0], MEZE[0], VENUE[1], SEA[1], MEZE[1],
  VENUE[2], SEA[2], MEZE[3], VENUE[3], SEA[3], MEZE[7],
  VENUE[4], SEA[6], MEZE[9], VENUE[5], SEA[5], MEZE[12],
];
