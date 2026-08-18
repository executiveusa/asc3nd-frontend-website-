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

/**
 * Count total RSVPs — used for capacity checks + health endpoint.
 */
export async function countRsvps() {
  const { url, key } = requireConfig();
  const res = await fetch(`${url}/rest/v1/rsvps?select=id&limit=0`, {
    headers: { Authorization: `Bearer ${key}`, apikey: key, 'Prefer': 'count=exact' },
    cache: 'no-store',
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(`supabase_count_failed:${res.status}`);
    err.code = "supabase_count_failed";
    err.detail = text;
    err.status = res.status;
    throw err;
  }
  const range = res.headers.get('content-range') || '';
  const match = range.match(/\/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Fetch recent RSVPs for the staff dashboard + CSV export.
 */
export async function listRsvps(limit = 100) {
  const { url, key } = requireConfig();
  const res = await fetch(
    `${url}/rest/v1/rsvps?select=*&order=created_at.desc&limit=${limit}`,
    { headers: { Authorization: `Bearer ${key}`, apikey: key }, cache: 'no-store' },
  );
  if (!res.ok) return [];
  return res.json();
}

/**
 * Fetch recent supporters for the staff dashboard + CSV export.
 */
export async function listSupporters(limit = 100) {
  const { url, key } = requireConfig();
  const res = await fetch(
    `${url}/rest/v1/supporters?select=*&order=created_at.desc&limit=${limit}`,
    { headers: { Authorization: `Bearer ${key}`, apikey: key }, cache: 'no-store' },
  );
  if (!res.ok) return [];
  return res.json();
}

// ── Admin operations ──

const VALID_STATUSES = ['RECEIVED', 'CONFIRMED', 'ATTENDED', 'NO_SHOW', 'CANCELLED'];

export async function findRsvpById(id) {
  const { url, key } = requireConfig();
  const res = await fetch(
    `${url}/rest/v1/rsvps?id=eq.${encodeURIComponent(id)}&select=*&limit=1`,
    { headers: { Authorization: `Bearer ${key}`, apikey: key }, cache: 'no-store' },
  );
  if (!res.ok) return null;
  const rows = await res.json();
  return rows[0] || null;
}

export async function updateRsvpStatus(id, status) {
  const { url, key } = requireConfig();
  if (!VALID_STATUSES.includes(status)) throw new Error('invalid_status');
  const res = await fetch(`${url}/rest/v1/rsvps?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${key}`, apikey: key, 'Content-Type': 'application/json', Prefer: 'return=representation' },
    body: JSON.stringify({ status }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('update_failed');
  const rows = await res.json();
  return rows[0] || null;
}

export async function updateRsvpNotes(id, notes) {
  const { url, key } = requireConfig();
  const res = await fetch(`${url}/rest/v1/rsvps?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${key}`, apikey: key, 'Content-Type': 'application/json', Prefer: 'return=representation' },
    body: JSON.stringify({ staff_notes: String(notes).slice(0, 1000) }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('update_failed');
  const rows = await res.json();
  return rows[0] || null;
}

export async function deleteRsvp(id) {
  const { url, key } = requireConfig();
  const res = await fetch(`${url}/rest/v1/rsvps?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${key}`, apikey: key, Prefer: 'return=representation' },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('delete_failed');
  const rows = await res.json();
  return rows[0] || null;
}

export async function findRsvpByConfirmationCode(code) {
  const { url, key } = requireConfig();
  const res = await fetch(
    `${url}/rest/v1/rsvps?confirmation_code=eq.${encodeURIComponent(code.toUpperCase())}&select=*&limit=1`,
    { headers: { Authorization: `Bearer ${key}`, apikey: key }, cache: 'no-store' },
  );
  if (!res.ok) return null;
  const rows = await res.json();
  return rows[0] || null;
}

export async function findRsvpsByName(partialName) {
  const { url, key } = requireConfig();
  const res = await fetch(
    `${url}/rest/v1/rsvps?guardian_name=ilike.%${encodeURIComponent(partialName)}%&select=*&order=created_at.desc&limit=10`,
    { headers: { Authorization: `Bearer ${key}`, apikey: key }, cache: 'no-store' },
  );
  if (!res.ok) return [];
  return res.json();
}

export async function countByStatus() {
  const { url, key } = requireConfig();
  const all = await listRsvps(500);
  return {
    total: all.length,
    received: all.filter(r => r.status === 'RECEIVED').length,
    confirmed: all.filter(r => r.status === 'CONFIRMED').length,
    attended: all.filter(r => r.status === 'ATTENDED').length,
    no_show: all.filter(r => r.status === 'NO_SHOW').length,
    cancelled: all.filter(r => r.status === 'CANCELLED').length,
  };
}
