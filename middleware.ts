import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Locale negotiation + routing. Remembers the choice via the NEXT_LOCALE
// cookie (set automatically) and falls back to Accept-Language, then default.
export default createMiddleware(routing);

export const config = {
  // Run on every path EXCEPT api routes, Next internals and files with an
  // extension (e.g. /fonts/x.woff2, /icon.svg). Admin lives under [locale] so
  // it IS matched and resolves to the default locale at /admin.
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
