import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

/**
 * Middleware/proxy — refreshes Supabase auth sessions on every request.
 * Also sets the locale header for the page.
 */
export async function proxy(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-page-locale', request.nextUrl.pathname.startsWith('/es') ? 'es' : 'en');

  let supabaseResponse = NextResponse.next({
    request: { headers: requestHeaders },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request: { headers: requestHeaders },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refresh session — this updates the cookie if needed
  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: ['/', '/es/:path*',', /admin/:path*'],
};
