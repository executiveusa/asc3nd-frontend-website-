import dns from 'node:dns/promises';
import { probeHttp } from '../monitoring/asc3nd-monitor.mjs';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const INCIDENT_ID = 'DRILL-' + Date.now();
const START_TIME = new Date().toISOString();
const EVIDENCE_DIR = '/opt/monitoring/asc3nd/failover';
if (!fs.existsSync(EVIDENCE_DIR)) fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

console.log('=== ASC3ND LIVE CONTROLLED DISASTER DRILL EXECUTOR ===');
console.log('Incident ID:', INCIDENT_ID);
console.log('Start Time UTC:', START_TIME);
console.log('Target Sovereign VPS IP: 31.220.58.212');
console.log('Baseline Vercel Origin IP: 76.76.21.21');

async function checkDns() {
  try {
    const res = await dns.resolve4('asc3nd.org');
    return res[0] || 'none';
  } catch (e) {
    return 'error:' + e.message;
  }
}

export async function runDrillValidation() {
  const currentIp = await checkDns();
  console.log('Current Public DNS Resolution for asc3nd.org:', currentIp);

  console.log('\n--- Probing Production Endpoints ---');
  const rootRes = await probeHttp('https://asc3nd.org/');
  const esRes = await probeHttp('https://asc3nd.org/es');
  const healthRes = await probeHttp('https://asc3nd.org/api/health');
  const readyRes = await probeHttp('https://asc3nd.org/api/ready');

  console.log('Root / Status:', rootRes.status, 'Latency:', rootRes.latency + 'ms');
  console.log('Locale /es Status:', esRes.status, 'Latency:', esRes.latency + 'ms');
  console.log('Health /api/health Status:', healthRes.status, 'DB:', healthRes.json?.db, 'RSVP Count:', healthRes.json?.rsvpCount);
  console.log('Ready /api/ready Status:', readyRes.status, 'Ready:', readyRes.json?.ready);

  let containerLogs = '';
  try {
    containerLogs = execSync('docker logs --tail 20 asc3nd-community-cuts-staging 2>&1', { encoding: 'utf8' });
  } catch {}

  const drillReport = {
    incidentId: INCIDENT_ID,
    startTimeUtc: START_TIME,
    evaluationTimeUtc: new Date().toISOString(),
    observedDnsIp: currentIp,
    targetSovereignIp: '31.220.58.212',
    isDnsSwitchedToVps: currentIp === '31.220.58.212',
    probes: {
      root: rootRes,
      es: esRes,
      health: healthRes,
      ready: readyRes
    },
    checks: {
      rootHttp200: rootRes.status === 200,
      esHttp200: esRes.status === 200,
      healthHttp200: healthRes.status === 200,
      dbConnected: healthRes.json?.db === 'connected',
      rsvpCountPreserved: healthRes.json?.rsvpCount === 9,
      readyHttp200: readyRes.status === 200
    },
    containerLogsSnippet: containerLogs.split('\n').slice(-10).join('\n')
  };

  const recordPath = path.join(EVIDENCE_DIR, INCIDENT_ID + '.json');
  fs.writeFileSync(recordPath, JSON.stringify(drillReport, null, 2), 'utf8');
  console.log('\nEvidence recorded to:', recordPath);
  return drillReport;
}

runDrillValidation();
