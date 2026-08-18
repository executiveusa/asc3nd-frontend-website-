#!/usr/bin/env node
import { probeHttp } from '../monitoring/asc3nd-monitor.mjs';
import { generateRollbackPlan } from './failover-controller.mjs';

export async function runRollbackPreflight(options = {}) {
  console.log('=== ASC3ND ROLLBACK PREFLIGHT INSPECTION ===');
  const primaryRootUrl = options.customRootUrl || 'https://asc3nd.org/';
  const primaryHealthUrl = options.customHealthUrl || 'https://asc3nd.org/api/health';

  console.log(`Probing primary root: ${primaryRootUrl}`);
  const rootRes = await probeHttp(primaryRootUrl);
  console.log(`Root Status: HTTP ${rootRes.status}, latency: ${rootRes.latency}ms`);

  console.log(`Probing primary health: ${primaryHealthUrl}`);
  const healthRes = await probeHttp(primaryHealthUrl);
  console.log(`Health Status: HTTP ${healthRes.status}, latency: ${healthRes.latency}ms, DB: ${healthRes.json?.db || 'unknown'}`);

  const isDbConnected = healthRes.json?.db === 'connected';
  const isPrimaryRestored = rootRes.ok && healthRes.ok && isDbConnected;

  const plan = generateRollbackPlan();

  const preflightReport = {
    timestamp: new Date().toISOString(),
    primaryRoot: { url: primaryRootUrl, ok: rootRes.ok, status: rootRes.status, latency: rootRes.latency },
    primaryHealth: { url: primaryHealthUrl, ok: healthRes.ok, status: healthRes.status, latency: healthRes.latency, db: healthRes.json?.db || 'unknown' },
    isPrimaryRestored,
    recommendation: isPrimaryRestored ? 'READY_FOR_ROLLBACK_APPROVAL' : 'PRIMARY_STILL_UNHEALTHY',
    rollbackPlan: plan,
    dnsMutationOccurred: false
  };

  console.log('\nRollback Preflight Report:');
  console.log(JSON.stringify(preflightReport, null, 2));
  return preflightReport;
}

if (process.argv[1] && process.argv[1].endsWith('rollback-preflight.mjs')) {
  runRollbackPreflight().catch(e => { console.error('Rollback preflight error:', e); process.exit(1); });
}
