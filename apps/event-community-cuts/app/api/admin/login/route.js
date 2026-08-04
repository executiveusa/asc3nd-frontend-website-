/**
 * Admin login — POST /api/admin/login
 *
 * Validates the password server-side, creates a session token,
 * sets it as an HttpOnly cookie. The password is NEVER sent to the browser.
 *
 * Includes rate limiting (5 attempts per IP per 10 minutes).
 */
import { validatePassword, createSession, checkOrigin } from '../../../../lib/admin-auth.js';
import { checkRateLimit, getClientIp } from '../../../../lib/rate-limit.js';

export const runtime = 'nodejs';

export async function POST(request) {
  // CSRF defense
  if (!checkOrigin(request)) {
    return Response.json({ ok: false, error: 'forbidden' }, { status: 403 });
  }

  // Rate limit login attempts
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return Response.json({
      ok: false,
      error: 'rate_limited',
      message: 'Too many attempts. Please wait a few minutes.',
    }, { status: 429 });
  }

  let input;
  try {
    input = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const password = input.password;
  if (!password || typeof password !== 'string') {
    return Response.json({ ok: false, error: 'missing_password' }, { status: 400 });
  }

  if (!validatePassword(password)) {
    return Response.json({ ok: false, error: 'invalid_password' }, { status: 401 });
  }

  // Success — create session + set cookie
  const cookieHeader = createSession(ip);
  return Response.json({ ok: true }, {
    status: 200,
    headers: {
      'set-cookie': cookieHeader,
      'cache-control': 'no-store',
    },
  });
}
