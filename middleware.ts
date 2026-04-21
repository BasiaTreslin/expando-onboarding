import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession, SESSION_COOKIE } from '@/lib/auth';

const PUBLIC_PATHS = new Set(['/login', '/api/login', '/api/logout']);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  // Read session
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;

  // Root: redirect to login (or personal page if already signed in)
  if (pathname === '/') {
    if (session) {
      return NextResponse.redirect(new URL(`/${session.slug}`, req.url));
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Everything else requires a session
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Extract first path segment as slug
  const urlSlug = pathname.split('/')[1];

  // A user may only see their own page
  if (urlSlug && urlSlug !== session.slug) {
    return NextResponse.redirect(new URL(`/${session.slug}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next.js internals and static assets
  matcher: ['/((?!_next/static|_next/image|favicon.ico|photos|logo).*)'],
};
