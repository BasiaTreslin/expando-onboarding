import { SignJWT, jwtVerify } from 'jose';

export const SESSION_COOKIE = 'expando_session';
const SESSION_TTL_SECONDS = 90 * 24 * 60 * 60; // 90 days

// Fallback used only when SESSION_SECRET env var is missing (e.g. local dev).
// You MUST set SESSION_SECRET in Vercel → Project Settings → Environment Variables.
const DEV_FALLBACK =
  'expando-dev-fallback-secret-do-not-use-in-production-set-SESSION_SECRET-env';

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET || DEV_FALLBACK;
  return new TextEncoder().encode(secret);
}

export async function signSession(slug: string): Promise<string> {
  return await new SignJWT({ slug })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS)
    .sign(getSecret());
}

export async function verifySession(token: string): Promise<{ slug: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (typeof payload.slug === 'string' && payload.slug.length > 0) {
      return { slug: payload.slug };
    }
    return null;
  } catch {
    return null;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: SESSION_TTL_SECONDS,
    path: '/',
  };
}
