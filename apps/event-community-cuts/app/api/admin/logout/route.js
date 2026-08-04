/**
 * Admin logout — POST /api/admin/logout
 * Clears the session cookie.
 */
import { destroySession, checkOrigin } from '../../../../lib/admin-auth.js';

export const runtime = 'nodejs';

export async function POST(request) {
  if (!checkOrigin(request)) {
    return Response.json({ ok: false, error: 'forbidden' }, { status: 403 });
  }

  const cookieHeader = destroySession(request.headers.get('cookie'));
  return Response.json({ ok: true }, {
    status: 200,
    headers: {
      'set-cookie': cookieHeader,
      'cache-control': 'no-store',
    },
  });
}
