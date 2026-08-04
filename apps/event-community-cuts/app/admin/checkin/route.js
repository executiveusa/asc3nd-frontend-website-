/**
 * Check-in mode — /admin/checkin
 *
 * Phone-optimized full-screen page for event-day check-in.
 * Staff enters a confirmation code or searches by name →
 * sees family details → taps "Mark as Attended".
 *
 * Shows real-time attendance count.
 * Uses the same ADMIN_PASSWORD protection as the main dashboard.
 */
import { countRsvps, listRsvps } from '../../../lib/supabase-server.js';
import { EVENT_CONFIG } from '../../../lib/event-config.js';

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
  const url = new URL(request.url);
  const queryP = url.searchParams.get('p');
  if (queryP === adminPassword) {
    return { authed: true, setCookie: `asc3nd_admin=${encodeURIComponent(adminPassword)}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400; Path=/` };
  }
  const cookies = parseCookies(request.headers.get('cookie'));
  if (cookies.asc3nd_admin === adminPassword) return { authed: true };
  return { authed: false };
}

export async function GET(request) {
  const auth = checkAuth(request);
  const headers = { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' };
  if (auth.setCookie) headers['set-cookie'] = auth.setCookie;

  const ADMIN_PASS = process.env.ADMIN_PASSWORD || '';
  const apiUrl = `/api/admin`;

  if (!auth.authed) {
    return new Response(`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ASC3ND Check-in</title>
<style>body{font-family:system-ui,sans-serif;background:#050505;color:#F5F1E8;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.box{max-width:360px;width:90%;padding:32px}h1{font-size:20px;margin:0 0 8px;color:#F5A617}p{font-size:14px;color:#888;margin:0 0 20px}
input{width:100%;padding:14px;border:1px solid #333;border-radius:6px;font-size:18px;background:#111;color:#fff;margin-bottom:12px}
button{width:100%;padding:14px;background:#F5A617;color:#050505;border:none;border-radius:6px;font-size:18px;font-weight:700}</style>
</head><body><div class="box"><h1>ASC3ND Check-in</h1><p>Enter the staff password.</p>
<form method="GET" action="/admin/checkin"><input type="password" name="p" placeholder="Password" autofocus><button type="submit">Login</button></form>
</div></body></html>`, { headers });
  }

  const allRsvps = await listRsvps(500);
  const attended = allRsvps.filter(r => r.status === 'ATTENDED').length;
  const total = allRsvps.length;
  const capacity = EVENT_CONFIG.maxRsvps || total;

  return new Response(`<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>ASC3ND Check-in</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#050505;color:#F5F1E8;min-height:100vh}
.header{position:sticky;top:0;background:#050505;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.15);z-index:10}
.header a{color:#F5A617;text-decoration:none;font-size:14px}
.count{text-align:center;padding:24px 20px}
.count .num{font-size:48px;font-weight:900;color:#F5A617}
.count .label{font-size:14px;color:#888}
.search{padding:0 20px 20px}
.search input{width:100%;padding:18px;font-size:24px;text-align:center;border:2px solid #F5A617;border-radius:8px;background:#111;color:#fff;letter-spacing:0.05em;text-transform:uppercase}
.search input::placeholder{text-transform:none;letter-spacing:normal;color:#555;font-size:16px}
.search p{text-align:center;font-size:13px;color:#555;margin-top:8px}
#result{padding:0 20px}
.card{background:#111;border-radius:8px;padding:20px;margin-bottom:12px}
.card .name{font-size:22px;font-weight:700;margin-bottom:8px}
.card .detail{font-size:15px;color:#999;margin-bottom:4px}
.card .status{display:inline-block;padding:4px 12px;border-radius:4px;font-size:12px;font-weight:700;margin-top:8px}
.status-attended{background:#1a5c2e;color:#7eea9f}
.status-received{background:#333;color:#aaa}
.btn-checkin{display:block;width:100%;padding:18px;margin-top:12px;background:#F5A617;color:#050505;border:none;border-radius:8px;font-size:18px;font-weight:700;cursor:pointer}
.btn-checkin:disabled{opacity:0.5}
.error{text-align:center;color:#c55;padding:20px;font-size:16px}
.hidden{display:none}
</style></head>
<body>
<div class="header"><a href="/admin?p=${ADMIN_PASS}">&larr; Back to Dashboard</a></div>
<div class="count"><div class="num">${attended} / ${total}</div><div class="label">Checked In</div></div>
<div class="search">
  <form id="lookup-form">
    <input type="text" id="code-input" placeholder="Enter confirmation code or name" autocomplete="off" autofocus>
    <p>Type ASC3ND-XXXXXX or search by name</p>
  </form>
</div>
<div id="result"></div>

<script>
const ADMIN_PASS = ${JSON.stringify(ADMIN_PASS)};
const API = '/api/admin?p=' + ADMIN_PASS;
const resultDiv = document.getElementById('result');
const codeInput = document.getElementById('code-input');

codeInput.addEventListener('input', async (e) => {
  const val = e.target.value.trim();
  if (val.length < 3) { resultDiv.innerHTML = ''; return; }
  // Determine if it looks like a code or a name
  const isCode = /^asc3nd/i.test(val);
  try {
    const body = isCode
      ? { action: 'checkin-lookup', code: val }
      : { action: 'checkin-name', name: val };
    const res = await fetch(API, { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify(body) });
    const data = await res.json();
    if (!data.ok && data.error === 'not_found') {
      resultDiv.innerHTML = '<div class="error">No RSVP found with that code.</div>';
      return;
    }
    if (!data.ok && data.results !== undefined) {
      resultDiv.innerHTML = '';
      return;
    }
    const rsvps = data.rsvp ? [data.rsvp] : (data.results || []);
    if (rsvps.length === 0) { resultDiv.innerHTML = '<div class="error">No matches found.</div>'; return; }
    resultDiv.innerHTML = rsvps.map(r => {
      const attended = r.status === 'ATTENDED';
      return '<div class="card">' +
        '<div class="name">' + esc(r.guardian_name) + '</div>' +
        '<div class="detail">' + r.children_count + ' children' + (r.age_range ? ' / ' + r.age_range : '') + '</div>' +
        (r.arrival_window ? '<div class="detail">Arrival: ' + r.arrival_window + '</div>' : '') +
        (r.preferred_language === 'es' ? '<div class="detail">Spanish-speaking</div>' : '') +
        (Array.isArray(r.updates) && r.updates.length ? '<div class="detail">Requested: ' + r.updates.join(', ') + '</div>' : '') +
        '<span class="status ' + (attended ? 'status-attended' : 'status-received') + '">' + r.status + '</span>' +
        (attended ? '' : '<button class="btn-checkin" data-id="' + r.id + '">Mark as Attended</button>') +
      '</div>';
    }).join('');
    // Wire up the buttons
    document.querySelectorAll('.btn-checkin').forEach(btn => {
      btn.addEventListener('click', async () => {
        btn.disabled = true; btn.textContent = 'Checking in...';
        const res = await fetch(API, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ action:'checkin-mark', id: btn.dataset.id }) });
        const data = await res.json();
        if (data.ok) { btn.parentElement.style.opacity = '0.5'; btn.textContent = 'Done!'; setTimeout(()=>{codeInput.value='';resultDiv.innerHTML='';codeInput.focus();}, 1000); }
        else { btn.disabled = false; btn.textContent = 'Try Again'; }
      });
    });
  } catch(err) { resultDiv.innerHTML = '<div class="error">Connection error.</div>'; }
});

function esc(s) { return String(s||'').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
</script>
</body></html>`, { headers });
}
