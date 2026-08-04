/**
 * CSV export — /admin/export?type=rsvps|supporters
 * Password-protected (same ADMIN_PASSWORD as the dashboard).
 * Returns a CSV file download.
 */
import { listRsvps, listSupporters } from '../../../lib/supabase-server.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function csvEscape(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function checkAuth(request) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  const url = new URL(request.url);
  return url.searchParams.get('p') === adminPassword;
}

export async function GET(request) {
  if (!checkAuth(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const url = new URL(request.url);
  const type = url.searchParams.get('type') || 'rsvps';
  const date = new Date().toISOString().slice(0, 10);

  if (type === 'supporters') {
    const supporters = await listSupporters(500);
    const headers = ['confirmation_code', 'name', 'email', 'phone', 'participation', 'updates', 'preferred_language', 'created_at'];
    const rows = supporters.map(s => [
      s.confirmation_code, s.name, s.email, s.phone, s.participation,
      Array.isArray(s.updates) ? s.updates.join('; ') : '',
      s.preferred_language, s.created_at
    ].map(csvEscape).join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    return new Response(csv, {
      headers: {
        'content-type': 'text/csv; charset=utf-8',
        'content-disposition': `attachment; filename="asc3nd-supporters-${date}.csv"`,
      },
    });
  }

  // Default: rsvps
  const rsvps = await listRsvps(500);
  const headers = ['confirmation_code', 'guardian_name', 'email', 'phone', 'children_count', 'age_range', 'arrival_window', 'preferred_language', 'updates', 'accessibility_contact', 'status', 'created_at'];
  const rows = rsvps.map(r => [
    r.confirmation_code, r.guardian_name, r.email, r.phone, r.children_count,
    r.age_range, r.arrival_window, r.preferred_language,
    Array.isArray(r.updates) ? r.updates.join('; ') : '',
    r.accessibility_contact, r.status, r.created_at
  ].map(csvEscape).join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  return new Response(csv, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="asc3nd-rsvps-${date}.csv"`,
    },
  });
}
