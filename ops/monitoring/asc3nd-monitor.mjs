import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execSync } from 'node:child_process';
import { dispatchAlert } from './alert-dispatcher.mjs';

const LOG_DIR = process.env.MONITOR_LOG_DIR || '/opt/monitoring/asc3nd';
const STATE_FILE = path.join(LOG_DIR, 'state.json');
const EVIDENCE_FILE = path.join(LOG_DIR, 'evidence.jsonl');
const LATEST_STATUS_FILE = path.join(LOG_DIR, 'latest-status.json');
const BACKUP_DIR = process.env.BACKUP_DIR || '/opt/backups/asc3nd/database';

if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

let state = { consecutiveFailures: {}, lastRun: null };
if (fs.existsSync(STATE_FILE)) {
  try { state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); } catch {}
}

export async function probeHttp(targetUrl, timeoutMs = 8000) {
  const started = Date.now();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(targetUrl, {
      signal: controller.signal,
      headers: { 'User-Agent': 'ASC3ND-Sovereign-Monitor/1.0' }
    });
    clearTimeout(timeoutId);
    const latency = Date.now() - started;
    let json = null;
    let text = '';
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      json = await res.json().catch(() => null);
    } else {
      text = await res.text().catch(() => '');
    }

    return {
      url: targetUrl,
      ok: res.ok,
      status: res.status,
      latency,
      json,
      length: text.length || JSON.stringify(json || '').length,
      error: res.ok ? null : `HTTP ${res.status}`
    };
  } catch (err) {
    clearTimeout(timeoutId);
    return {
      url: targetUrl,
      ok: false,
      status: 0,
      latency: Date.now() - started,
      json: null,
      length: 0,
      error: err.name === 'AbortError' ? 'TIMEOUT' : err.message
    };
  }
}

export function checkVpsResources() {
  const cpus = os.cpus().length;
  const loadAvg = os.loadavg();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMemPercent = Math.round(((totalMem - freeMem) / totalMem) * 100);

  let diskUsedPercent = 0;
  let diskFreeGb = 0;
  try {
    const dfOut = execSync('df -k / | tail -1', { encoding: 'utf8' }).trim();
    const parts = dfOut.split(/\\s+/);
    diskUsedPercent = parseInt(parts[4].replace('%', ''), 10);
    diskFreeGb = Math.round(parseInt(parts[3], 10) / (1024 * 1024));
  } catch {
    diskUsedPercent = -1;
  }

  let containerStatus = 'unknown';
  try {
    containerStatus = execSync("docker inspect -f '{{.State.Status}}' asc3nd-community-cuts-staging 2>/dev/null || echo 'not_found'", { encoding: 'utf8' }).trim();
  } catch {
    containerStatus = 'docker_error';
  }

  return {
    cpus,
    loadAvg: [loadAvg[0].toFixed(2), loadAvg[1].toFixed(2), loadAvg[2].toFixed(2)],
    totalMemMb: Math.round(totalMem / (1024 * 1024)),
    freeMemMb: Math.round(freeMem / (1024 * 1024)),
    usedMemPercent,
    diskUsedPercent,
    diskFreeGb,
    containerStatus
  };
}

export function checkBackupFreshness() {
  if (!fs.existsSync(BACKUP_DIR)) {
    return { ok: false, reason: 'backup_directory_missing', count: 0 };
  }

  const files = fs.readdirSync(BACKUP_DIR).filter(f => f.endsWith('.dump'));
  if (files.length === 0) {
    return { ok: false, reason: 'no_dump_files_found', count: 0 };
  }

  let newestFile = null;
  let newestMtime = 0;

  for (const f of files) {
    const full = path.join(BACKUP_DIR, f);
    const stat = fs.statSync(full);
    if (stat.mtimeMs > newestMtime) {
      newestMtime = stat.mtimeMs;
      newestFile = {
        name: f,
        path: full,
        size: stat.size,
        mtime: new Date(stat.mtimeMs).toISOString(),
        ageHours: ((Date.now() - stat.mtimeMs) / (1000 * 60 * 60)).toFixed(1),
        hasChecksum: fs.existsSync(full + '.sha256') || fs.existsSync(full.replace('.dump', '.sha256'))
      };
    }
  }

  const isFresh = newestFile && parseFloat(newestFile.ageHours) <= 24.0;
  const isHealthy = isFresh && newestFile.size > 0 && newestFile.hasChecksum;

  return {
    ok: isHealthy,
    latestBackup: newestFile,
    isFresh,
    reason: isHealthy ? 'healthy' : (!isFresh ? 'backup_older_than_24h' : 'missing_checksum_or_empty')
  };
}

export async function runMonitorCycle(options = {}) {
  const timestamp = new Date().toISOString();
  const alerts = [];

  const targets = options.customTargets || [
    { id: 'prod_root', url: 'https://asc3nd.org/', threshold: 2 },
    { id: 'prod_health', url: 'https://asc3nd.org/api/health', threshold: 2 },
    { id: 'staging_root', url: 'https://asc3nd-community-cuts-staging.31.220.58.212.sslip.io/', threshold: 2 },
    { id: 'staging_health', url: 'https://asc3nd-community-cuts-staging.31.220.58.212.sslip.io/api/health', threshold: 2 },
    { id: 'staging_ready', url: 'https://asc3nd-community-cuts-staging.31.220.58.212.sslip.io/api/ready', threshold: 1 }
  ];

  const probeResults = {};
  for (const t of targets) {
    const res = await probeHttp(t.url);
    const prevCount = state.consecutiveFailures[t.id] || 0;
    const currentCount = res.ok ? 0 : prevCount + 1;
    state.consecutiveFailures[t.id] = currentCount;

    probeResults[t.id] = {
      ...res,
      consecutiveFailures: currentCount
    };

    if (!res.ok && currentCount >= t.threshold) {
      alerts.push({
        level: 'CRITICAL',
        target: t.id,
        url: t.url,
        failures: currentCount,
        error: res.error,
        latency: res.latency,
        timestamp,
        force: options.forceAlerts || false
      });
    }
  }

  const vps = checkVpsResources();
  if (vps.diskUsedPercent > 85) {
    alerts.push({ level: 'WARNING', target: 'vps_disk', error: `Disk usage ${vps.diskUsedPercent}% > 85%`, timestamp });
  }
  if (vps.usedMemPercent > 90) {
    alerts.push({ level: 'WARNING', target: 'vps_ram', error: `RAM usage ${vps.usedMemPercent}% > 90%`, timestamp });
  }
  if (vps.containerStatus !== 'running') {
    alerts.push({ level: 'CRITICAL', target: 'staging_container', error: `Container state: ${vps.containerStatus}`, timestamp });
  }

  const backup = checkBackupFreshness();
  if (!backup.ok) {
    alerts.push({ level: 'CRITICAL', target: 'database_backup', error: backup.reason, timestamp, force: options.forceAlerts || false });
  }

  for (const a of alerts) {
    await dispatchAlert(a);
  }

  const cycleReport = {
    timestamp,
    status: alerts.length === 0 ? 'HEALTHY' : 'DEGRADED',
    probes: probeResults,
    vps,
    backup,
    alerts
  };

  fs.appendFileSync(EVIDENCE_FILE, JSON.stringify(cycleReport) + '\n', 'utf8');
  fs.writeFileSync(LATEST_STATUS_FILE, JSON.stringify(cycleReport, null, 2), 'utf8');

  state.lastRun = timestamp;
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');

  return cycleReport;
}

if (process.argv[1] && process.argv[1].endsWith('asc3nd-monitor.mjs')) {
  runMonitorCycle().then((report) => {
    console.log(JSON.stringify(report, null, 2));
  }).catch((e) => {
    console.error('Monitor fatal error:', e);
    process.exit(1);
  });
}
