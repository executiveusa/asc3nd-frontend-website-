#!/usr/bin/env node
import { runMonitorCycle } from '../monitoring/asc3nd-monitor.mjs';
import { evaluateFailoverCandidate, generateProposedCutoverPlan, generateRollbackPlan } from './failover-controller.mjs';
import fs from 'node:fs';
import path from 'node:path';

const FAILOVER_LOG_DIR = '/opt/monitoring/asc3nd/failover';
if (!fs.existsSync(FAILOVER_LOG_DIR)) fs.mkdirSync(FAILOVER_LOG_DIR, { recursive: true });

async function runPreflight() {
  console.log('=== ASC3ND FAILOVER PREFLIGHT INSPECTION ===');
  const report = await runMonitorCycle();

  const telemetry = {
    prodRootOk: report.probes.prod_root.ok,
    prodHealthOk: report.probes.prod_health.ok,
    prodRootFailures: report.probes.prod_root.consecutiveFailures,
    prodHealthFailures: report.probes.prod_health.consecutiveFailures,
    sovereignReadyOk: report.probes.staging_ready.ok,
    sovereignContainerRunning: report.vps.containerStatus === 'running',
    backupAgeHours: report.backup.latestBackup ? parseFloat(report.backup.latestBackup.ageHours) : 999,
    backupHasChecksum: report.backup.latestBackup?.hasChecksum || false
  };

  const decision = evaluateFailoverCandidate(telemetry);
  const cutoverPlan = generateProposedCutoverPlan();
  const rollbackPlan = generateRollbackPlan();

  const incidentId = 'incident-' + Date.now();
  const incidentRecord = {
    incidentId,
    timestamp: new Date().toISOString(),
    telemetry,
    decision,
    cutoverPlan,
    rollbackPlan
  };

  const recordPath = path.join(FAILOVER_LOG_DIR, `${incidentId}.json`);
  fs.writeFileSync(recordPath, JSON.stringify(incidentRecord, null, 2), 'utf8');

  console.log('Preflight Decision:', JSON.stringify(decision, null, 2));
  console.log('Proposed Cutover Plan:', JSON.stringify(cutoverPlan, null, 2));
  console.log('Rollback Plan:', JSON.stringify(rollbackPlan, null, 2));
  console.log('Evidence recorded to:', recordPath);
}

runPreflight();
