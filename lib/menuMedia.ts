/**
 * Product media (poster + short silent video) for menu items.
 * Keyed by the item's Turkish name so it also works for menus edited in the
 * admin panel (Vercel Blob) — as long as the TR name stays the same.
 *
 * Files: public/menu-media/posters/<slug>.webp · public/menu-media/videos/<slug>.mp4
 */
const MEDIA_BY_NAME: Record<string, string> = {
  'Balık Çorbası': 'balik-corbasi',
  'Atom Borani': 'atom',
  'Havuç Tarator': 'bademli-havuc-tarator',
  'Haydari': 'haydari',
  'Kuru Cacık': 'cacik',
  'Fava Tekmil': 'fava-tekmil',
  'Enginar': 'enginar',
  'Acılı Ezme': 'antep-ezme',
  'Patlıcan Salatası': 'patlican-salatasi',
  'Şakşuka': 'saksuka',
  'Deniz Börülcesi': 'deniz-borulcesi',
  'Kaya Koruğu': 'kaya-korugu',
  'Karışık Ot Tabağı': 'karisik-ot',
  'Kıbrıs Meze': 'kibris-meze',
  'Izgara Zeytin': 'izgara-zeytin',
  'Pancar': 'elmali-pancar',
  'Mevsim Salata': 'mevsim-salata',
  'Çiroz': 'ciroz',
  'Levrek Marin': 'levrek-marin',
  'Karides Marin': 'karides-marin',
  'Deniz Mahsülleri Salatası': 'karisik-deniz-mahsulu',
  'Kalamar Tava': 'kalamar-tava',
  'Kalamar Izgara': 'kalamar-izgara',
  'Karides Tava': 'karide-tava',
  'Ahtapot Izgara': 'ahtapot-izgara',
  'Balıkçı Böreği': 'balikci-boregi',
  'Yoğurtlu Sıcak Ot': 'yogurtlu-sicak-ot',
  'Laos Şiş': 'lahos-sis',
  'Levrek Lokum': 'levrek-lokum',
  'Deniz Çupra KG': 'cupra-izgara',
  'Izgara Köfte': 'izgara-kofte',
};

const norm = (s: string) => s.trim().toLocaleLowerCase('tr-TR').replace(/\s+/g, ' ');
const INDEX = new Map(Object.entries(MEDIA_BY_NAME).map(([k, v]) => [norm(k), v]));

export type MenuMedia = { slug: string; poster: string; video: string };

export const menuMediaFor = (trName: string | undefined): MenuMedia | null => {
  if (!trName) return null;
  const slug = INDEX.get(norm(trName));
  if (!slug) return null;
  return {
    slug,
    poster: `/menu-media/posters/${slug}.webp`,
    video: `/menu-media/videos/${slug}.mp4`,
  };
};

/** Every slug in use — the list of files that must exist under public/menu-media. */
export const MENU_MEDIA_SLUGS = Object.values(MEDIA_BY_NAME);
