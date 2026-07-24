import { NextResponse } from 'next/server';

export function proxy(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-page-locale', request.nextUrl.pathname.startsWith('/es') ? 'es' : 'en');
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/', '/es/:path*'],
};
