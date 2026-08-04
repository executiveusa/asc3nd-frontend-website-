/**
 * Check-in mode — /admin/checkin
 * Supabase Auth + shared-password fallback. Phone-optimized.
 */
import { listRsvps } from '../../../lib/supabase-server.js';
import { validateSession } from '../../../lib/admin-auth.js';
import { getStaffSession } from '../../../lib/supabase-auth-server.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const headers = { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' };

  const staffSession = await getStaffSession();
  const sharedAuthed = validateSession(request.headers.get('cookie'));
  if (!staffSession.isStaff && !sharedAuthed) {
    return new Response('<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=/auth/login"></head></html>', { status: 302, headers });
  }

  const allRsvps = await listRsvps(500);
  const attended = allRsvps.filter(r => r.status === 'ATTENDED').length;
  const total = allRsvps.length;
  const staffName = staffSession.fullName || 'Staff';

  return new Response(`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"><title>ASC3ND Check-in</title><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:system-ui,-apple-system,sans-serif;background:#050505;color:#F5F1E8;min-height:100vh}.header{position:sticky;top:0;background:#050505;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.15);z-index:10;display:flex;justify-content:space-between;align-items:center}.header a{color:#F5A617;text-decoration:none;font-size:14px}.count{text-align:center;padding:24px 20px}.count .num{font-size:48px;font-weight:900;color:#F5A617}.count .label{font-size:14px;color:#888}.search{padding:0 20px 20px}.search input{width:100%;padding:18px;font-size:24px;text-align:center;border:2px solid #F5A617;border-radius:8px;background:#111;color:#fff;letter-spacing:0.05em;text-transform:uppercase}.search input::placeholder{text-transform:none;letter-spacing:normal;color:#555;font-size:16px}.search p{text-align:center;font-size:13px;color:#555;margin-top:8px}#result{padding:0 20px}.card{background:#111;border-radius:8px;padding:20px;margin-bottom:12px}.card .name{font-size:22px;font-weight:700;margin-bottom:8px}.card .detail{font-size:15px;color:#999;margin-bottom:4px}.card .status{display:inline-block;padding:4px 12px;border-radius:4px;font-size:12px;font-weight:700;margin-top:8px}.status-attended{background:#1a5c2e;color:#7eea9f}.status-received{background:#333;color:#aaa}.btn-checkin{display:block;width:100%;padding:18px;margin-top:12px;background:#F5A617;color:#050505;border:none;border-radius:8px;font-size:18px;font-weight:700;cursor:pointer}.btn-checkin:disabled{opacity:0.5}.error{text-align:center;color:#c55;padding:20px;font-size:16px}.signed-in{color:rgba(255,255,255,0.4);font-size:12px}</style></head><body>
<div class="header"><a href="/admin">&larr; Dashboard</a><span class="signed-in">${staffName}</span><a href="/admin?logout=1">Sign Out</a></div>
<div class="count"><div class="num">${attended} / ${total}</div><div class="label">Checked In</div></div>
<div class="search"><form id="lookup-form" onsubmit="return false"><input type="text" id="code-input" placeholder="Enter confirmation code or name" autocomplete="off" autofocus><p>Type ASC3ND-XXXXXX or search by name</p></form></div>
<div id="result"></div>
<script>const API='/api/admin';const resultDiv=document.getElementById('result');const codeInput=document.getElementById('code-input');let st;codeInput.addEventListener('input',e=>{clearTimeout(st);const val=e.target.value.trim();if(val.length<3){resultDiv.innerHTML='';return;}st=setTimeout(async()=>{const isCode=/^asc3nd/i.test(val);try{const body=isCode?{action:'checkin-lookup',code:val}:{action:'checkin-name',name:val};const res=await fetch(API,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});const data=await res.json();if(!data.ok&&data.error==='unauthorized'){window.location.href='/auth/login';return;}if(!data.ok&&data.error==='not_found'){resultDiv.innerHTML='<div class="error">No RSVP found.</div>';return;}const rsvps=data.rsvp?[data.rsvp]:(data.results||[]);if(rsvps.length===0){resultDiv.innerHTML='<div class="error">No matches.</div>';return;}resultDiv.innerHTML=rsvps.map(r=>{const att=r.status==='ATTENDED';return '<div class="card"><div class="name">'+esc(r.guardian_name)+'</div><div class="detail">'+r.children_count+' children'+(r.age_range?' / '+r.age_range:'')+'</div>'+(r.arrival_window?'<div class="detail">Arrival: '+r.arrival_window+'</div>':'')+(r.preferred_language==='es'?'<div class="detail">Spanish-speaking</div>':'')+(Array.isArray(r.updates)&&r.updates.length?'<div class="detail">Requested: '+r.updates.join(', ')+'</div>':'')+'<span class="status '+(att?'status-attended':'status-received')+'">'+r.status+'</span>'+(att?'':'<button class="btn-checkin" data-id="'+r.id+'">Mark as Attended</button>')+'</div>';}).join('');document.querySelectorAll('.btn-checkin').forEach(btn=>{btn.addEventListener('click',async()=>{btn.disabled=true;btn.textContent='Checking in...';const res=await fetch(API,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({action:'checkin-mark',id:btn.dataset.id})});const data=await res.json();if(data.ok){btn.parentElement.style.opacity='0.5';btn.textContent='Done!';if(navigator.vibrate)navigator.vibrate(100);setTimeout(()=>{codeInput.value='';resultDiv.innerHTML='';codeInput.focus();},800);}else{btn.disabled=false;btn.textContent='Try Again';}});});}catch{resultDiv.innerHTML='<div class="error">Connection error.</div>';}},300);});function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}</script>
</body></html>`, { headers });
}
