/**
 * Supabase login route — POST /api/admin/login-supabase
 *
 * Takes email + password, calls Supabase Auth REST API directly,
 * sets the access token as a cookie. No client library needed.
 */
import { signInWithEmail, getStaffProfile } from '../../../../lib/supabase-auth-server.js';
import { checkRateLimit, getClientIp } from '../../../../lib/rate-limit.js';

export const runtime = 'nodejs';

export async function POST(request) {
  // Rate limit
  const ip = getClientIp(request);
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    return Response.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let input;
  try { input = await request.json(); } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  if (!input.email || !input.password) {
    return Response.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }

  const result = await signInWithEmail(input.email, input.password);

  if (result.error) {
    return Response.json({ ok: false, error: result.error }, { status: 401 });
  }

  // Check if user is staff
  const profile = await getStaffProfile(result.user.id);
  if (!profile) {
    return Response.json({ ok: false, error: 'not_staff', message: 'This account does not have staff access.' }, { status: 403 });
  }

  // Set the access token as a cookie (7 day expiry)
  const cookie = `sb-access-token=${result.access_token}; HttpOnly; Secure; SameSite=Strict; Max-Age=604800; Path=/`;
  return Response.json({ ok: true, name: profile.full_name }, {
    status: 200,
    headers: { 'set-cookie': cookie, 'cache-control': 'no-store' },
  });
}
