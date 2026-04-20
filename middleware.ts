import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Stub magic-link validation for MVP.
// Phase 3: replace with full HMAC token verification using jose.
//
// To enable: set REQUIRE_MAGIC_LINK=true in env and issue tokens via
// the /api/admin/generate-link route (see src/app/api/admin/generate-link).

const REQUIRE_MAGIC_LINK = process.env.REQUIRE_MAGIC_LINK === 'true';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip auth for root, API routes, static assets
  if (
    pathname === '/' ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/photos/') ||
    pathname.startsWith('/logo/')
  ) {
    return NextResponse.next();
  }

  if (!REQUIRE_MAGIC_LINK) {
    return NextResponse.next();
  }

  const token = request.nextUrl.searchParams.get('t');

  if (!token) {
    return NextResponse.redirect(new URL('/?auth=required', request.url));
  }

  // Phase 3: verify HMAC token here
  // const isValid = await verifyToken(token, slug);
  // if (!isValid) return NextResponse.redirect(new URL('/?auth=invalid', request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
