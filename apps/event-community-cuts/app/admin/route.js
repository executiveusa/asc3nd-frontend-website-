/**
 * Staff dashboard — /admin
 *
 * Password-protected via the ADMIN_PASSWORD env var.
 * Shows RSVP + supporter counts, recent submissions, and CSV export links.
 * Server-rendered (no client JS needed). Minimal inline styles using the
 * locked ASC3ND color tokens.
 *
 * Access: /admin?p=<ADMIN_PASSWORD> or enter the password in the form.
 */
import { listRsvps, listSupporters, countRsvps } from '../../lib/supabase-server.js';
import { checkEventStatus, EVENT_CONFIG } from '../../lib/event-config.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  for (const part of cookieHeader.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key) cookies[key] = decodeURIComponent(rest.join('='));
  }
  return cookies;
}

function checkAuth(request) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return { authed: false, reason: 'no_password_set' };

  // Check query param ?p= (for direct links)
  const url = new URL(request.url);
  const queryP = url.searchParams.get('p');
  if (queryP === adminPassword) {
    return { authed: true, setCookie: `asc3nd_admin=${encodeURIComponent(adminPassword)}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400; Path=/` };
  }

  // Check cookie
  const cookies = parseCookies(request.headers.get('cookie'));
  if (cookies.asc3nd_admin === adminPassword) {
    return { authed: true };
  }

  return { authed: false };
}

function csvEscape(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function rsvpsToCsv(rsvps) {
  const headers = ['confirmation_code', 'guardian_name', 'email', 'phone', 'children_count', 'age_range', 'arrival_window', 'preferred_language', 'updates', 'accessibility_contact', 'status', 'created_at'];
  const rows = rsvps.map(r => [
    r.confirmation_code, r.guardian_name, r.email, r.phone, r.children_count,
    r.age_range, r.arrival_window, r.preferred_language,
    Array.isArray(r.updates) ? r.updates.join('; ') : '',
    r.accessibility_contact, r.status, r.created_at
  ].map(csvEscape).join(','));
  return [headers.join(','), ...rows].join('\n');
}

function supportersToCsv(supporters) {
  const headers = ['confirmation_code', 'name', 'email', 'phone', 'participation', 'updates', 'preferred_language', 'created_at'];
  const rows = supporters.map(s => [
    s.confirmation_code, s.name, s.email, s.phone, s.participation,
    Array.isArray(s.updates) ? s.updates.join('; ') : '',
    s.preferred_language, s.created_at
  ].map(csvEscape).join(','));
  return [headers.join(','), ...rows].join('\n');
}

export async function GET(request) {
  const auth = checkAuth(request);

  const headers = {
    'content-type': 'text/html; charset=utf-8',
    'cache-control': 'no-store',
  };
  if (auth.setCookie) headers['set-cookie'] = auth.setCookie;

  // Login form
  if (!auth.authed) {
    const noPassword = auth.reason === 'no_password_set';
    return new Response(`<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ASC3ND Admin</title>
<style>body{font-family:system-ui,sans-serif;background:#F5F1E8;color:#050505;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.box{max-width:360px;width:90%;padding:32px;background:#fff;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,0.1)}
h1{font-size:20px;margin:0 0 8px}p{font-size:14px;color:#666;margin:0 0 20px}
input{width:100%;padding:12px;border:1px solid #ccc;border-radius:6px;font-size:16px;margin-bottom:12px}
button{width:100%;padding:12px;background:#F5A617;color:#050505;border:none;border-radius:6px;font-size:16px;font-weight:700;cursor:pointer}
.alert{background:#fee;color:#c00;padding:12px;border-radius:6px;font-size:13px;margin-bottom:16px}
</style></head>
<body><div class="box">
<h1>ASC3ND Staff</h1>
${noPassword ? '<div class="alert">ADMIN_PASSWORD env var is not set. Set it in Vercel to enable the dashboard.</div>' : '<p>Enter the staff password to view submissions.</p>'}
${noPassword ? '' : `<form method="GET" action="/admin"><input type="password" name="p" placeholder="Password" autofocus><button type="submit">Login</button></form>`}
</div></body></html>`, { headers });
  }

  // Authed — load data
  const [rsvps, supporters, totalCount] = await Promise.all([
    listRsvps(200),
    listSupporters(200),
    countRsvps(),
  ]);

  const eventStatus = checkEventStatus();
  const capacity = EVENT_CONFIG.maxRsvps;
  const remaining = capacity ? Math.max(0, capacity - totalCount) : 'unlimited';

  const totalChildren = rsvps.reduce((sum, r) => sum + (r.children_count || 0), 0);
  const languageCounts = rsvps.reduce((acc, r) => {
    acc[r.preferred_language] = (acc[r.preferred_language] || 0) + 1;
    return acc;
  }, {});
  const arrivalCounts = rsvps.reduce((acc, r) => {
    const w = r.arrival_window || 'unspecified';
    acc[w] = (acc[w] || 0) + 1;
    return acc;
  }, {});
  const supporterCounts = supporters.reduce((acc, s) => {
    acc[s.participation] = (acc[s.participation] || 0) + 1;
    return acc;
  }, {});

  const formatTime = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' +
           d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const rsvpRows = rsvps.map(r => `<tr>
    <td><strong>${r.confirmation_code || ''}</strong></td>
    <td>${r.guardian_name || ''}</td>
    <td>${r.email || ''}</td>
    <td>${r.phone || ''}</td>
    <td style="text-align:center">${r.children_count || 0}</td>
    <td>${r.age_range || ''}</td>
    <td>${r.arrival_window || '—'}</td>
    <td>${r.preferred_language || 'en'}</td>
    <td>${Array.isArray(r.updates) ? r.updates.join(', ') : ''}</td>
    <td>${formatTime(r.created_at)}</td>
  </tr>`).join('');

  const supporterRows = supporters.map(s => `<tr>
    <td><strong>${s.confirmation_code || ''}</strong></td>
    <td>${s.name || ''}</td>
    <td>${s.email || ''}</td>
    <td>${s.phone || ''}</td>
    <td><span class="tag">${s.participation || ''}</span></td>
    <td>${Array.isArray(s.updates) ? s.updates.join(', ') : ''}</td>
    <td>${formatTime(s.created_at)}</td>
  </tr>`).join('');

  return new Response(`<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>ASC3ND Staff Dashboard</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#F5F1E8;color:#050505;line-height:1.5}
.header{background:#050505;color:#F5F1E8;padding:16px 24px;display:flex;align-items:center;justify-content:space-between}
.header h1{font-size:18px;font-weight:700}
.header a{color:#F5A617;text-decoration:none;font-size:14px}
.container{max-width:1100px;margin:0 auto;padding:24px 20px}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px;margin-bottom:32px}
.stat{background:#fff;border-radius:6px;padding:20px;text-align:center}
.stat .num{font-size:32px;font-weight:900;color:#050505}
.stat .label{font-size:12px;color:#888;text-transform:uppercase;letter-spacing:0.05em;margin-top:4px}
.section{background:#fff;border-radius:6px;padding:24px;margin-bottom:24px;overflow-x:auto}
.section h2{font-size:16px;font-weight:700;margin-bottom:16px;padding-bottom:8px;border-bottom:2px solid #F5A617}
table{width:100%;border-collapse:collapse;font-size:13px}
th{text-align:left;padding:8px 12px;background:#F5F1E8;font-weight:600;white-space:nowrap}
td{padding:8px 12px;border-top:1px solid #eee}
tr:hover{background:#fafafa}
.tag{display:inline-block;padding:2px 8px;background:#F5A617;color:#050505;border-radius:3px;font-size:11px;font-weight:600}
.export-btn{display:inline-block;padding:8px 16px;background:#050505;color:#F5F1E8;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600;margin-top:12px}
.export-btn:hover{background:#333}
.mini-stats{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.mini-stat{background:#F5F1E8;padding:6px 12px;border-radius:4px;font-size:13px}
.mini-stat strong{color:#050505}
.event-status{display:inline-block;padding:4px 12px;border-radius:4px;font-size:13px;font-weight:600;margin-bottom:16px}
.event-open{background:#d4edda;color:#155724}
.event-closed{background:#f8d7da;color:#721c24}
</style></head>
<body>
<div class="header">
  <h1>ASC3ND — Community Cuts Dashboard</h1>
  <a href="/admin?logout=1">Logout</a>
</div>
<div class="container">

  <div class="event-status ${eventStatus.open ? 'event-open' : 'event-closed'}">
    ${eventStatus.open ? '✓ RSVP OPEN' : '✗ RSVP CLOSED'} · Capacity: ${totalCount}/${capacity || '∞'} · ${remaining} spots remaining
  </div>

  <div class="stats">
    <div class="stat"><div class="num">${totalCount}</div><div class="label">Family RSVPs</div></div>
    <div class="stat"><div class="num">${totalChildren}</div><div class="label">Children Expected</div></div>
    <div class="stat"><div class="num">${supporters.length}</div><div class="label">Supporters</div></div>
    <div class="stat"><div class="num">${remaining}</div><div class="label">Spots Left</div></div>
  </div>

  <div class="section">
    <h2>Family RSVPs (${rsvps.length})</h2>
    <div class="mini-stats">
      <span class="mini-stat">EN: <strong>${languageCounts.en || 0}</strong></span>
      <span class="mini-stat">ES: <strong>${languageCounts.es || 0}</strong></span>
      ${Object.entries(arrivalCounts).map(([k, v]) => `<span class="mini-stat">${k}: <strong>${v}</strong></span>`).join('')}
    </div>
    <table>
      <thead><tr><th>Code</th><th>Name</th><th>Email</th><th>Phone</th><th>Kids</th><th>Age</th><th>Arrival</th><th>Lang</th><th>Updates</th><th>Received</th></tr></thead>
      <tbody>${rsvpRows || '<tr><td colspan="10" style="text-align:center;color:#999;padding:24px">No RSVPs yet</td></tr>'}</tbody>
    </table>
    <a class="export-btn" href="/admin/export?type=rsvps&p=${process.env.ADMIN_PASSWORD || ''}">Export RSVPs as CSV</a>
  </div>

  <div class="section">
    <h2>Supporter Interest (${supporters.length})</h2>
    <div class="mini-stats">
      ${Object.entries(supporterCounts).map(([k, v]) => `<span class="mini-stat">${k}: <strong>${v}</strong></span>`).join('') || '<span class="mini-stat">No supporters yet</span>'}
    </div>
    <table>
      <thead><tr><th>Code</th><th>Name</th><th>Email</th><th>Phone</th><th>Type</th><th>Updates</th><th>Received</th></tr></thead>
      <tbody>${supporterRows || '<tr><td colspan="7" style="text-align:center;color:#999;padding:24px">No supporters yet</td></tr>'}</tbody>
    </table>
    <a class="export-btn" href="/admin/export?type=supporters&p=${process.env.ADMIN_PASSWORD || ''}">Export Supporters as CSV</a>
  </div>

</div>
</body></html>`, { headers });
}
