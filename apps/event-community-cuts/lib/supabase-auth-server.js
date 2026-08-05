/**
 * Supabase Auth via raw REST API (no @supabase/supabase-js dependency).
 *
 * Uses fetch() to call Supabase's auth endpoints directly.
 * The anon key is safe for client-side auth.
 * The service_role key is used only server-side for admin operations.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

function authHeaders(key) {
  return {
    'apikey': key,
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json',
  };
}

/**
 * Sign in with email + password. Returns session + user.
 */
export async function signInWithEmail(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: authHeaders(ANON_KEY),
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const body = await res.text();
    return { error: 'invalid_credentials', status: res.status };
  }
  return res.json(); // { access_token, refresh_token, user, ... }
}

/**
 * Get user by access token (from the session cookie).
 *
 * Supabase requires the project's anon key as `apikey` for ALL requests,
 * plus the user's access token as `Authorization: Bearer` to identify them.
 * Sending the access token as the apikey returns 401 "Invalid API key".
 */
export async function getUserByToken(accessToken) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: {
      'apikey': ANON_KEY,
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) return null;
  return res.json();
}

/**
 * Check if a user has a staff profile.
 * Uses the service_role key (server-side only).
 */
export async function getStaffProfile(userId) {
  if (!SERVICE_KEY) return null;
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/staff_profiles?id=eq.${userId}&select=role,full_name&limit=1`,
    { headers: authHeaders(SERVICE_KEY) },
  );
  if (!res.ok) return null;
  const rows = await res.json();
  return rows[0] || null;
}

/**
 * Get the full staff session from a request's cookies.
 * The auth cookie is named 'sb-access-token' (set by the login route).
 * Returns { user, isStaff, isAdmin, fullName } or { user: null, isStaff: false }.
 */
export async function getStaffSession(request) {
  // Defensive: if Supabase isn't configured, return no session
  if (!SUPABASE_URL || !ANON_KEY) {
    return { user: null, isStaff: false, isAdmin: false, fullName: null };
  }

  // Read cookie safely
  let token = null;
  try {
    const cookieHeader = request?.headers?.get?.('cookie') || '';
    if (cookieHeader) {
      const match = cookieHeader.match(/(?:^|;\s*)sb-access-token=([^;]+)/);
      token = match ? match[1] : null;
    }
  } catch {
    return { user: null, isStaff: false, isAdmin: false, fullName: null };
  }

  if (!token) return { user: null, isStaff: false, isAdmin: false, fullName: null };

  const user = await getUserByToken(token);
  if (!user) return { user: null, isStaff: false, isAdmin: false };

  const profile = await getStaffProfile(user.id);
  if (!profile) return { user, isStaff: false, isAdmin: false };

  return {
    user,
    isStaff: true,
    isAdmin: profile.role === 'admin',
    fullName: profile.full_name,
  };
}
