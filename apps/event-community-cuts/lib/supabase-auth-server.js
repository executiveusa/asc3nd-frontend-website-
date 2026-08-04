import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Server-side Supabase client for auth sessions.
 * Reads/refreshes the auth cookie from Next.js headers.
 */
export async function createAuthClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component — session refresh happens in middleware
          }
        },
      },
    },
  );
}

/**
 * Get the current authenticated user (or null).
 * Use this in any server component or route to check auth.
 */
export async function getCurrentUser() {
  const supabase = await createAuthClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Check if the current user is staff (has a staff_profiles row).
 * Returns { user, isStaff, isAdmin } or { user: null, isStaff: false }.
 */
export async function getStaffSession() {
  const user = await getCurrentUser();
  if (!user) return { user: null, isStaff: false, isAdmin: false };

  // Check if user has a staff profile
  const supabase = await createAuthClient();
  const { data: profile } = await supabase
    .from('staff_profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  if (!profile) return { user, isStaff: false, isAdmin: false };

  return {
    user,
    isStaff: true,
    isAdmin: profile.role === 'admin',
    fullName: profile.full_name,
  };
}
