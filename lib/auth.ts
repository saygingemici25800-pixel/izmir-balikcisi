import 'server-only';
import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE = 'admin_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    'dev-insecure-secret-change-me'
  );
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
}

function makeToken(): string {
  const payload = String(Date.now() + MAX_AGE * 1000); // expiry
  return `${payload}.${sign(payload)}`;
}

function valid(token: string | undefined): boolean {
  if (!token) return false;
  const i = token.lastIndexOf('.');
  if (i < 0) return false;
  const payload = token.slice(0, i);
  const sig = token.slice(i + 1);
  const expected = sign(payload);
  if (sig.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  const exp = Number(payload);
  return Number.isFinite(exp) && exp > Date.now();
}

/** Read-only — safe in server components. */
export function isAuthed(): boolean {
  return valid(cookies().get(COOKIE)?.value);
}

/** Constant-time password check against the env secret. */
export function checkPassword(input: string): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || typeof input !== 'string' || input.length !== pw.length) return false;
  return crypto.timingSafeEqual(Buffer.from(input), Buffer.from(pw));
}

/** Write — only valid inside a server action / route handler. */
export function setSession(): void {
  cookies().set(COOKIE, makeToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export function clearSession(): void {
  cookies().set(COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
}
