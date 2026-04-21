import { NextResponse } from 'next/server';
import { verifyCredentials } from '@/data/newHires';
import { signSession, SESSION_COOKIE, sessionCookieOptions } from '@/lib/auth';

export async function POST(req: Request) {
  let body: { username?: string; password?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const username = typeof body.username === 'string' ? body.username : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!username || !password) {
    return NextResponse.json({ error: 'Missing username or password' }, { status: 400 });
  }

  const slug = await verifyCredentials(username, password);
  if (!slug) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  }

  const token = await signSession(slug);
  const response = NextResponse.json({ slug });
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
  return response;
}
