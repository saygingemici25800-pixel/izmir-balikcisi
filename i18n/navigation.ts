import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Locale-aware navigation primitives. These keep the active locale prefix on
 * internal links and return the pathname WITHOUT the prefix (so existing
 * `pathname === '/'` / scroll-spy logic keeps working across locales).
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
