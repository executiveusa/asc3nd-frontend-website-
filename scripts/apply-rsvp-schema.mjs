import { readFileSync } from 'node:fs';

const vault = readFileSync('E:\\THE PAULI FILES\\Cosmos_Vault.env', 'utf8');
const getToken = (name) => {
  const m = vault.match(new RegExp(`^${name}=(.+)$`, 'm'));
  return m ? m[1].trim() : null;
};

const st = getToken('SUPABASE_API_TOKEN');
const projectId = 'sxkemnqvxlgewrjplcag';
const sqlPath = 'apps/event-community-cuts/db/rsvp-schema.sql';
const sql = readFileSync(sqlPath, 'utf8');

const res = await fetch(`https://api.supabase.com/v1/projects/${projectId}/database/query`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${st}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: sql }),
});

const text = await res.text();
console.log('status:', res.status);
try {
  const j = JSON.parse(text);
  console.log(JSON.stringify(j, null, 2));
} catch {
  console.log(text.substring(0, 2000));
}
