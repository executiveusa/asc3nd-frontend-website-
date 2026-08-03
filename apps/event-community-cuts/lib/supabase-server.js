function requireConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!url || !key) {
    const err = new Error('supabase_not_configured');
    err.code = 'supabase_not_configured';
    throw err;
  }
  return { url, key };
}

function headers(key) {
  return {
    Authorization: `Bearer ${key}`,
    apikey: key,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  };
}

const CONFIRMATION_CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generateConfirmationCode(prefix = 'ASC3ND') {
  let code = '';
  for (let i = 0; i < 6; i += 1) {
    code += CONFIRMATION_CHARSET[Math.floor(Math.random() * CONFIRMATION_CHARSET.length)];
  }
  return `${prefix}-${code}`;
}

export async function insertRsvp(payload) {
  const { url, key } = requireConfig();
  const res = await fetch(`${url}/rest/v1/rsvps`, {
    method: 'POST',
    headers: headers(key),
    body: JSON.stringify(payload),
    cache: 'no-store',
  });
  if (res.status === 409) {
    return { duplicate: true, status: 409 };
  }
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`supabase_insert_failed:${res.status}`);
    err.code = 'supabase_insert_failed';
    err.detail = text;
    err.status = res.status;
    throw err;
  }
  const rows = await res.json();
  return { duplicate: false, row: rows[0], status: 201 };
}

export async function insertSupporter(payload) {
  const { url, key } = requireConfig();
  const res = await fetch(`${url}/rest/v1/supporters`, {
    method: 'POST',
    headers: headers(key),
    body: JSON.stringify(payload),
    cache: 'no-store',
  });
  if (res.status === 409) {
    return { duplicate: true, status: 409 };
  }
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`supabase_insert_failed:${res.status}`);
    err.code = 'supabase_insert_failed';
    err.detail = text;
    err.status = res.status;
    throw err;
  }
  const rows = await res.json();
  return { duplicate: false, row: rows[0], status: 201 };
}

export async function findRsvpByIdempotencyKey(idempotencyKey) {
  const { url, key } = requireConfig();
  const res = await fetch(
    `${url}/rest/v1/rsvps?idempotency_key=eq.${encodeURIComponent(idempotencyKey)}&select=confirmation_code,id`,
    {
      headers: { Authorization: `Bearer ${key}`, apikey: key },
      cache: 'no-store',
    },
  );
  if (!res.ok) return null;
  const rows = await res.json();
  return rows[0] || null;
}

export async function findSupporterByIdempotencyKey(idempotencyKey) {
  const { url, key } = requireConfig();
  const res = await fetch(
    `${url}/rest/v1/supporters?idempotency_key=eq.${encodeURIComponent(idempotencyKey)}&select=confirmation_code,id`,
    {
      headers: { Authorization: `Bearer ${key}`, apikey: key },
      cache: 'no-store',
    },
  );
  if (!res.ok) return null;
  const rows = await res.json();
  return rows[0] || null;
}
