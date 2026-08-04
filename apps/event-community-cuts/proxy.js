import { NextResponse } from 'next/server';

/**
 * Middleware/proxy — sets locale header + refreshes Supabase auth sessions.
 * Falls back gracefully if Supabase env vars are not set.
 */
export async function proxy(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-page-locale', request.nextUrl.pathname.startsWith('/es') ? 'es' : 'en');

  // If Supabase env vars aren't configured, skip auth refresh
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Dynamic import so the build doesn't fail if @supabase/ssr isn't installed yet
  let supabaseResponse = NextResponse.next({ request: { headers: requestHeaders } });

  try {
    const { createServerClient } = await import('@supabase/ssr');

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request: { headers: requestHeaders } });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    });

    await supabase.auth.getUser();
  } catch {
    // Supabase not available — continue without auth refresh
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/', '/es/:path*', '/admin/:path*', '/auth/:path*'],
};
