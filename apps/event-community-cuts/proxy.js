import { NextResponse } from 'next/server';

/**
 * Middleware/proxy — sets locale header only.
 * Supabase auth session refresh happens lazily in the admin routes
 * via getStaffSession(), not in the middleware. This keeps the proxy
 * lightweight and avoids the @supabase/ssr dependency at build time.
 */
export function proxy(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-page-locale', request.nextUrl.pathname.startsWith('/es') ? 'es' : 'en');
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/', '/es/:path*'],
};
