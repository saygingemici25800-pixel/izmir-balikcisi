'use server';

import { redirect } from 'next/navigation';
import { checkPassword, setSession, clearSession, isAuthed } from '@/lib/auth';
import { writeContent, type SiteContent, type Seasonal, type Localized } from '@/lib/content';

export async function loginAction(_prev: string | null, formData: FormData): Promise<string | null> {
  const password = String(formData.get('password') ?? '');
  if (!checkPassword(password)) return 'Şifre hatalı. Tekrar deneyin.';
  setSession();
  redirect('/admin');
}

export async function logoutAction(): Promise<void> {
  clearSession();
  redirect('/admin/login');
}

const str = (v: unknown, max = 2000): string =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

const slug = (s: string): string =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'kategori';

/** Coerce a localized field (tr/en/ar) — EN/AR fall back to TR. */
const locStr = (v: unknown, max = 200): Localized => {
  const o = (v ?? {}) as Record<string, unknown>;
  const tr = str(o.tr, max);
  return { tr, en: str(o.en, max) || tr, ar: str(o.ar, max) || tr };
};

/** Never trust the client — coerce to the schema before persisting. */
function sanitize(input: SiteContent): SiteContent {
  const menu = (Array.isArray(input?.menu) ? input.menu : []).slice(0, 50).map((c) => {
    const title = locStr(c?.title, 80);
    const sub = locStr(c?.subtitle, 240);
    const items = (Array.isArray(c?.items) ? c.items : []).slice(0, 200).map((i) => {
      const daily = Boolean(i?.daily);
      return {
        name: locStr(i?.name, 200),
        price: daily ? undefined : str(i?.price, 20) || undefined,
        unit: i?.unit ? str(i.unit, 8) : undefined,
        daily,
        img: i?.img ? str(i.img, 600) : undefined,
        featured: Boolean(i?.featured),
      };
    });
    return {
      id: str(c?.id, 60) || slug(title.tr || title.en),
      title,
      subtitle: sub.tr || sub.en || sub.ar ? sub : undefined,
      items,
    };
  });

  const s = (input?.seasonal ?? {}) as Partial<Seasonal>;
  return {
    menu,
    seasonal: {
      title: str(s.title, 60) || 'Mevsim Balıkları',
      dateRange: str(s.dateRange, 60),
      fish: Array.isArray(s.fish) ? s.fish.map((f) => str(f, 40)).filter(Boolean).slice(0, 40) : [],
      active: Boolean(s.active),
    },
    updatedAt: new Date().toISOString(),
  };
}

export async function saveContentAction(
  content: SiteContent
): Promise<{ ok: boolean; error?: string }> {
  if (!isAuthed()) return { ok: false, error: 'Oturum geçersiz. Tekrar giriş yapın.' };
  if (!content || !Array.isArray(content.menu) || !content.seasonal) {
    return { ok: false, error: 'Geçersiz veri.' };
  }
  try {
    await writeContent(sanitize(content));
    return { ok: true };
  } catch {
    return { ok: false, error: 'Kaydedilemedi. Tekrar deneyin.' };
  }
}
