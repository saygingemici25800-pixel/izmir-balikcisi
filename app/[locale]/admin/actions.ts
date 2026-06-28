'use server';

import { redirect } from 'next/navigation';
import { checkPassword, setSession, clearSession, isAuthed } from '@/lib/auth';
import { writeContent, type SiteContent, type Seasonal } from '@/lib/content';

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

/** Never trust the client — coerce to the schema before persisting. */
function sanitize(input: SiteContent): SiteContent {
  const menu = (Array.isArray(input?.menu) ? input.menu : []).slice(0, 50).map((c) => ({
    id: str(c?.id, 60) || slug(str(c?.title, 60)),
    title: str(c?.title, 80),
    subtitle: c?.subtitle ? str(c.subtitle, 240) : undefined,
    items: (Array.isArray(c?.items) ? c.items : []).slice(0, 120).map((i) => {
      const daily = Boolean(i?.daily);
      return {
        name: str(i?.name, 120),
        desc: str(i?.desc, 600),
        price: daily ? undefined : str(i?.price, 20) || undefined,
        unit: i?.unit ? str(i.unit, 8) : undefined,
        daily,
        tags: Array.isArray(i?.tags)
          ? i.tags.map((t) => str(t, 30)).filter(Boolean).slice(0, 8)
          : undefined,
        img: i?.img ? str(i.img, 600) : undefined,
        featured: Boolean(i?.featured),
      };
    }),
  }));

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
