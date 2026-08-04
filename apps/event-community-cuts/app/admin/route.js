/**
 * Staff dashboard — /admin
 *
 * Auth: Supabase Auth session OR shared password fallback.
 * Redirects to /auth/login if not authenticated.
 */
import { listRsvps, listSupporters, countRsvps } from '../../lib/supabase-server.js';
import { checkEventStatus, EVENT_CONFIG } from '../../lib/event-config.js';
import { validateSession, destroySession } from '../../lib/admin-auth.js';
import { getStaffSession } from '../../lib/supabase-auth-server.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function esc(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export async function GET(request) {
  const headers = { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' };

  // Handle logout
  const url = new URL(request.url);
  if (url.searchParams.get('logout')) {
    const clearCookie = destroySession(request.headers.get('cookie'));
    headers['set-cookie'] = clearCookie;
    return new Response('<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=/auth/login"></head></html>', { status: 302, headers });
  }

  // Auth check: Supabase Auth OR shared password session
  let staffSession = { user: null, isStaff: false, isAdmin: false };
  try {
    staffSession = await getStaffSession(request);
  } catch {
    // Supabase auth not configured or unreachable — fall through to shared password
  }
  const sharedAuthed = validateSession(request.headers.get('cookie'));
  const authed = staffSession.isStaff || sharedAuthed;

  if (!authed) {
    // Redirect to Supabase login
    return new Response('<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=/auth/login"></head></html>', { status: 302, headers });
  }

  // Also support the old shared-password login form as fallback
  if (url.searchParams.get('login') === '1' && !authed) {
    return new Response('<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=/auth/login"></head></html>', { status: 302, headers });
  }

  // Load data
  const [rsvps, supporters, totalCount] = await Promise.all([listRsvps(200), listSupporters(200), countRsvps()]);
  const eventStatus = checkEventStatus();
  const capacity = EVENT_CONFIG.maxRsvps;
  const remaining = capacity ? Math.max(0, capacity - totalCount) : 'unlimited';
  const totalChildren = rsvps.reduce((sum, r) => sum + (r.children_count || 0), 0);
  const languageCounts = rsvps.reduce((acc, r) => { acc[r.preferred_language] = (acc[r.preferred_language] || 0) + 1; return acc; }, {});
  const arrivalCounts = rsvps.reduce((acc, r) => { const w = r.arrival_window || 'unspecified'; acc[w] = (acc[w] || 0) + 1; return acc; }, {});
  const supporterCounts = supporters.reduce((acc, s) => { acc[s.participation] = (acc[s.participation] || 0) + 1; return acc; }, {});

  const formatTime = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const rsvpRows = rsvps.map(r => {
    const sc = r.status === 'ATTENDED' ? '#1a5c2e' : r.status === 'NO_SHOW' ? '#5c1a1a' : '#333';
    const sf = r.status === 'ATTENDED' ? '#7eea9f' : r.status === 'NO_SHOW' ? '#e88' : '#aaa';
    return `<tr data-id="${esc(r.id)}"><td><strong>${esc(r.confirmation_code)}</strong></td><td>${esc(r.guardian_name)}</td><td>${esc(r.email)}</td><td>${esc(r.phone)}</td><td style="text-align:center">${r.children_count||0}</td><td>${esc(r.age_range)}</td><td>${esc(r.arrival_window)||'\u2014'}</td><td>${esc(r.preferred_language)||'en'}</td><td>${Array.isArray(r.updates)?esc(r.updates.join(', ')):''}</td><td><select class="status-select" data-id="${esc(r.id)}" style="background:${sc};color:${sf};border:none;border-radius:4px;padding:4px 8px;font-size:11px;font-weight:700;cursor:pointer"><option value="RECEIVED" ${r.status==='RECEIVED'?'selected':''}>RECEIVED</option><option value="CONFIRMED" ${r.status==='CONFIRMED'?'selected':''}>CONFIRMED</option><option value="ATTENDED" ${r.status==='ATTENDED'?'selected':''}>ATTENDED</option><option value="NO_SHOW" ${r.status==='NO_SHOW'?'selected':''}>NO_SHOW</option><option value="CANCELLED" ${r.status==='CANCELLED'?'selected':''}>CANCELLED</option></select></td><td><input type="text" class="notes-input" data-id="${esc(r.id)}" value="${esc(r.staff_notes||'')}" placeholder="Add note..." style="width:120px;padding:4px 6px;font-size:12px;border:1px solid #ddd;border-radius:4px"></td><td>${formatTime(r.created_at)}</td><td><button class="delete-btn" data-id="${esc(r.id)}" data-name="${esc(r.guardian_name)}" style="padding:4px 8px;background:#c33;color:#fff;border:none;border-radius:4px;font-size:11px;cursor:pointer">Delete</button></td></tr>`;
  }).join('');

  const supporterRows = supporters.map(s => `<tr><td><strong>${esc(s.confirmation_code)}</strong></td><td>${esc(s.name)}</td><td>${esc(s.email)}</td><td>${esc(s.phone)}</td><td><span class="tag">${esc(s.participation)}</span></td><td>${Array.isArray(s.updates)?esc(s.updates.join(', ')):''}</td><td>${formatTime(s.created_at)}</td></tr>`).join('');

  const staffName = staffSession.fullName || staffSession.user?.email || 'Staff';

  return new Response(`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ASC3ND Staff Dashboard</title><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:system-ui,-apple-system,sans-serif;background:#F5F1E8;color:#050505;line-height:1.5}.header{background:#050505;color:#F5F1E8;padding:16px 24px;display:flex;align-items:center;justify-content:space-between}.header h1{font-size:18px;font-weight:700}.header a{color:#F5A617;text-decoration:none;font-size:14px}.container{max-width:1100px;margin:0 auto;padding:24px 20px}.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px;margin-bottom:32px}.stat{background:#fff;border-radius:6px;padding:20px;text-align:center}.stat .num{font-size:32px;font-weight:900}.stat .label{font-size:12px;color:#888;text-transform:uppercase;letter-spacing:0.05em;margin-top:4px}.section{background:#fff;border-radius:6px;padding:24px;margin-bottom:24px;overflow-x:auto}.section h2{font-size:16px;font-weight:700;margin-bottom:16px;padding-bottom:8px;border-bottom:2px solid #F5A617}table{width:100%;border-collapse:collapse;font-size:13px}th{text-align:left;padding:8px 12px;background:#F5F1E8;font-weight:600;white-space:nowrap}td{padding:8px 12px;border-top:1px solid #eee}tr:hover{background:#fafafa}.tag{display:inline-block;padding:2px 8px;background:#F5A617;color:#050505;border-radius:3px;font-size:11px;font-weight:600}.export-btn{display:inline-block;padding:8px 16px;background:#050505;color:#F5F1E8;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600;margin-top:12px;cursor:pointer;border:none}.mini-stats{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.mini-stat{background:#F5F1E8;padding:6px 12px;border-radius:4px;font-size:13px}.event-status{display:inline-block;padding:4px 12px;border-radius:4px;font-size:13px;font-weight:600;margin-bottom:16px}.event-open{background:#d4edda;color:#155724}.event-closed{background:#f8d7da;color:#721c24}.welcome{color:rgba(255,255,255,0.5);font-size:13px;margin-left:auto;padding-right:16px}</style></head><body>
<div class="header"><h1>ASC3ND \u2014 Community Cuts Dashboard</h1><span class="welcome">Signed in: ${esc(staffName)}</span><div style="display:flex;gap:16px;align-items:center"><a href="/admin/checkin" style="background:#F5A617;color:#050505;padding:6px 14px;border-radius:6px;font-weight:700;font-size:13px;text-decoration:none">Check-in</a><a href="/admin?logout=1" style="color:#888;font-size:13px">Sign Out</a></div></div>
<div class="container"><div class="event-status ${eventStatus.open?'event-open':'event-closed'}">${eventStatus.open?'\u2713 RSVP OPEN':'\u2717 RSVP CLOSED'} \u00b7 ${totalCount}/${capacity||'\u221e'} \u00b7 ${remaining} spots left</div>
<div class="stats"><div class="stat"><div class="num">${totalCount}</div><div class="label">Family RSVPs</div></div><div class="stat"><div class="num">${totalChildren}</div><div class="label">Children Expected</div></div><div class="stat"><div class="num">${supporters.length}</div><div class="label">Supporters</div></div><div class="stat"><div class="num">${remaining}</div><div class="label">Spots Left</div></div></div>
<div class="section"><h2>Family RSVPs (${rsvps.length})</h2><div class="mini-stats"><span class="mini-stat">EN: <strong>${languageCounts.en||0}</strong></span><span class="mini-stat">ES: <strong>${languageCounts.es||0}</strong></span>${Object.entries(arrivalCounts).map(([k,v])=>`<span class="mini-stat">${k}: <strong>${v}</strong></span>`).join('')}</div><table><thead><tr><th>Code</th><th>Name</th><th>Email</th><th>Phone</th><th>Kids</th><th>Age</th><th>Arrival</th><th>Lang</th><th>Updates</th><th>Status</th><th>Notes</th><th>Received</th><th>Actions</th></tr></thead><tbody>${rsvpRows||'<tr><td colspan="13" style="text-align:center;color:#999;padding:24px">No RSVPs yet</td></tr>'}</tbody></table><button class="export-btn" onclick="window.location.href='/admin/export?type=rsvps'">Export CSV</button></div>
<div class="section"><h2>Supporter Interest (${supporters.length})</h2><div class="mini-stats">${Object.entries(supporterCounts).map(([k,v])=>`<span class="mini-stat">${k}: <strong>${v}</strong></span>`).join('')||'<span class="mini-stat">None yet</span>'}</div><table><thead><tr><th>Code</th><th>Name</th><th>Email</th><th>Phone</th><th>Type</th><th>Updates</th><th>Received</th></tr></thead><tbody>${supporterRows||'<tr><td colspan="7" style="text-align:center;color:#999;padding:24px">No supporters yet</td></tr>'}</tbody></table><button class="export-btn" onclick="window.location.href='/admin/export?type=supporters'">Export CSV</button></div></div>
<script>const API='/api/admin';document.querySelectorAll('.status-select').forEach(sel=>{sel.addEventListener('change',async e=>{const id=e.target.dataset.id,status=e.target.value;e.target.style.opacity='0.5';const r=await fetch(API,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({action:'status',id,status})});const d=await r.json();e.target.style.opacity='1';if(d.ok){const c={ATTENDED:['#1a5c2e','#7eea9f'],NO_SHOW:['#5c1a1a','#e88'],CANCELLED:['#555','#aaa'],RECEIVED:['#333','#aaa'],CONFIRMED:['#333','#aaa']};const[bg,fg]=c[status]||['#333','#aaa'];e.target.style.background=bg;e.target.style.color=fg;}});});let nt;document.querySelectorAll('.notes-input').forEach(inp=>{inp.addEventListener('input',e=>{clearTimeout(nt);const id=e.target.dataset.id,notes=e.target.value;nt=setTimeout(async()=>{e.target.style.borderColor='#F5A617';await fetch(API,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({action:'notes',id,notes})});e.target.style.borderColor='#ddd';},800);});});document.querySelectorAll('.delete-btn').forEach(btn=>{btn.addEventListener('click',async e=>{const id=e.target.dataset.id,name=e.target.dataset.name;if(!confirm('Delete RSVP for "'+name+'"?'))return;const typed=prompt('Type the name to confirm:');if(!typed||typed.trim().toLowerCase()!==name.trim().toLowerCase()){alert('Name mismatch.');return;}e.target.textContent='Deleting...';e.target.disabled=true;const r=await fetch(API,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({action:'delete',id,confirmName:typed})});const d=await r.json();if(d.ok){const row=document.querySelector('tr[data-id="'+id+'"]');if(row){row.style.opacity='0';setTimeout(()=>row.remove(),300);}}else{alert('Failed');e.target.textContent='Delete';e.target.disabled=false;}});});</script>
</body></html>`, { headers });
}
