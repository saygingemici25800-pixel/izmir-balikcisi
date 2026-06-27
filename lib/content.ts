import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import { unstable_cache, revalidateTag } from 'next/cache';
import { MENU, type MenuCategory, type MenuItem } from './menu';

export type { MenuCategory, MenuItem };

export type Seasonal = {
  title: string;
  dateRange: string;
  fish: string[];
  active: boolean;
};

export type SiteContent = {
  menu: MenuCategory[];
  seasonal: Seasonal;
  updatedAt: string;
};

const CONTENT_TAG = 'site-content';
const BLOB_PATH = 'site-content.json';
const FILE_PATH = path.join(process.cwd(), '.data', 'content.json');

/** Initial content — seeded from the static menu the first time it's read. */
export const DEFAULT_CONTENT: SiteContent = {
  menu: MENU,
  seasonal: {
    title: 'Mevsim Balıkları',
    dateRange: 'Aralık – Şubat',
    fish: ['Lüfer', 'Palamut', 'Kalkan', 'İstavrit', 'Çinekop'],
    active: true,
  },
  updatedAt: '1989-01-01T00:00:00.000Z',
};

const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

/** Defensive coercion so a malformed store can never crash the site. */
function normalize(input: unknown): SiteContent {
  const obj = (input ?? {}) as Partial<SiteContent>;
  const menu = Array.isArray(obj.menu) ? (obj.menu as MenuCategory[]) : DEFAULT_CONTENT.menu;
  const s = (obj.seasonal ?? {}) as Partial<Seasonal>;
  return {
    menu,
    seasonal: {
      title: typeof s.title === 'string' ? s.title : DEFAULT_CONTENT.seasonal.title,
      dateRange: typeof s.dateRange === 'string' ? s.dateRange : DEFAULT_CONTENT.seasonal.dateRange,
      fish: Array.isArray(s.fish) ? s.fish.filter((f) => typeof f === 'string') : [],
      active: typeof s.active === 'boolean' ? s.active : true,
    },
    updatedAt: typeof obj.updatedAt === 'string' ? obj.updatedAt : DEFAULT_CONTENT.updatedAt,
  };
}

async function readRaw(): Promise<SiteContent> {
  try {
    if (useBlob()) {
      const { head } = await import('@vercel/blob');
      const meta = await head(BLOB_PATH, { token: process.env.BLOB_READ_WRITE_TOKEN });
      const res = await fetch(meta.url, { cache: 'no-store' });
      if (!res.ok) return DEFAULT_CONTENT;
      return normalize(await res.json());
    }
    const raw = await fs.readFile(FILE_PATH, 'utf8');
    return normalize(JSON.parse(raw));
  } catch {
    // not provisioned yet → serve the seed (site stays fully functional)
    return DEFAULT_CONTENT;
  }
}

/** Cached read, tagged so admin saves can revalidate it instantly. */
export const getContent = unstable_cache(readRaw, ['site-content'], { tags: [CONTENT_TAG] });

/** Persist new content (Blob in prod, local file in dev) and revalidate. */
export async function writeContent(content: SiteContent): Promise<void> {
  const data: SiteContent = { ...content, updatedAt: new Date().toISOString() };
  const json = JSON.stringify(data, null, 2);
  if (useBlob()) {
    const { put } = await import('@vercel/blob');
    await put(BLOB_PATH, json, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
  } else {
    await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
    await fs.writeFile(FILE_PATH, json, 'utf8');
  }
  revalidateTag(CONTENT_TAG);
}

/* ── Selectors (operate on dynamic content) ─────────────────────────────── */
export const featuredItems = (menu: MenuCategory[]): MenuItem[] =>
  menu.flatMap((c) => c.items.filter((i) => i.featured));

export const itemCount = (menu: MenuCategory[]): number =>
  menu.reduce((n, c) => n + c.items.length, 0);
