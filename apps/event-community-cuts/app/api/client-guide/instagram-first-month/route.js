const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const GUIDE_SLUG = 'instagram-first-month';

function headers() {
  return {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    'Content-Type': 'application/json',
  };
}

export async function GET() {
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return Response.json({ ok: false, error: 'supabase_not_configured' }, { status: 503 });
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/asc3nd_client_guides?slug=eq.${GUIDE_SLUG}&is_published=eq.true&select=slug,title,version,content,theme,updated_at&limit=1`,
    { headers: headers(), cache: 'no-store' },
  );

  if (!res.ok) {
    return Response.json({ ok: false, error: 'guide_fetch_failed' }, { status: 502 });
  }

  const rows = await res.json();
  if (!rows[0]) return Response.json({ ok: false, error: 'guide_not_found' }, { status: 404 });

  return Response.json({ ok: true, guide: rows[0] });
}

export async function POST(request) {
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return Response.json({ ok: false, error: 'supabase_not_configured' }, { status: 503 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const clientKey = String(payload?.clientKey || '').trim();
  const state = payload?.state;
  if (!clientKey || clientKey.length > 100 || !state || typeof state !== 'object') {
    return Response.json({ ok: false, error: 'invalid_payload' }, { status: 400 });
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/asc3nd_client_guide_progress?on_conflict=guide_slug,client_key`, {
    method: 'POST',
    headers: {
      ...headers(),
      Prefer: 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify({
      guide_slug: GUIDE_SLUG,
      client_key: clientKey,
      state,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    return Response.json({ ok: false, error: 'progress_save_failed' }, { status: 502 });
  }

  const rows = await res.json();
  return Response.json({ ok: true, progress: rows[0] || null });
}
