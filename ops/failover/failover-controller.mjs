import fs from 'node:fs';
import path from 'node:path';

export const FAILOVER_STATES = Object.freeze([
  'HEALTHY',
  'DEGRADED',
  'FAILOVER_CANDIDATE',
  'AWAITING_HUMAN_APPROVAL',
  'FAILOVER_APPROVED',
  'FAILED_OVER',
  'ROLLBACK_CANDIDATE',
  'ROLLBACK_APPROVED',
  'PRIMARY_RESTORED'
]);

export function evaluateFailoverCandidate(telemetry) {
  const {
    prodRootOk = true,
    prodHealthOk = true,
    prodRootFailures = 0,
    prodHealthFailures = 0,
    sovereignReadyOk = true,
    sovereignContainerRunning = true,
    backupAgeHours = 0.0,
    backupHasChecksum = true
  } = telemetry;

  const isPrimaryDown = (!prodRootOk || prodRootFailures >= 2) && (!prodHealthOk || prodHealthFailures >= 2);
  const isSovereignHealthy = sovereignReadyOk && sovereignContainerRunning;
  const isBackupHealthy = backupAgeHours <= 24.0 && backupHasChecksum;

  // Rule: If primary is healthy, state is HEALTHY or DEGRADED
  if (!isPrimaryDown) {
    if (!prodRootOk || !prodHealthOk) {
      return { state: 'DEGRADED', candidate: false, reason: 'primary_single_failure_or_recovering' };
    }
    return { state: 'HEALTHY', candidate: false, reason: 'all_systems_operational' };
  }

  // Primary is DOWN. Evaluate Sovereign Prerequisites for Failover Candidate
  if (!isSovereignHealthy) {
    return {
      state: 'DEGRADED',
      candidate: false,
      failClosed: true,
      reason: 'FAIL_CLOSED_NO_CUTOVER: Sovereign standby /api/ready or container is unhealthy'
    };
  }

  if (!isBackupHealthy) {
    return {
      state: 'DEGRADED',
      candidate: false,
      failClosed: true,
      reason: 'FAIL_CLOSED_NO_CUTOVER: Database backup is older than 24h SLA or corrupt'
    };
  }

  // All 5 prerequisites met: Candidate promoted to AWAITING_HUMAN_APPROVAL
  return {
    state: 'AWAITING_HUMAN_APPROVAL',
    candidate: true,
    failClosed: false,
    reason: 'Primary failure confirmed; sovereign standby verified healthy; backup fresh; awaiting human approval'
  };
}

export function generateProposedCutoverPlan() {
  return {
    action: 'DNS_CUTOVER_TO_SOVEREIGN_VPS',
    targetVpsIp: '31.220.58.212',
    changes: [
      {
        recordType: 'A',
        name: 'asc3nd.org',
        currentContent: '76.76.21.21 (Vercel)',
        proposedContent: '31.220.58.212 (Hostinger Sovereign VPS)',
        ttl: 300,
        proxied: false
      },
      {
        recordType: 'CNAME',
        name: 'www.asc3nd.org',
        currentContent: 'asc3nd.org',
        proposedContent: 'asc3nd.org',
        ttl: 300,
        proxied: false
      }
    ],
    vpsReverseProxyCommand: 'cat << EOF > /etc/caddy/asc3nd-production.Caddyfile\nasc3nd.org, www.asc3nd.org {\n    reverse_proxy asc3nd-community-cuts-staging:3001\n}\nEOF\ncaddy reload',
    rollbackReference: 'ops/failover/rollback-preflight.mjs'
  };
}

export function generateRollbackPlan() {
  return {
    action: 'RESTORE_PRIMARY_VERCEL_DNS',
    primaryOriginIp: '76.76.21.21',
    steps: [
      '1. Verify Vercel deployment returns HTTP 200 on direct origin inspection',
      '2. Verify Supabase REST connectivity from Vercel',
      '3. Obtain human approval for rollback',
      '4. Restore DNS A record for asc3nd.org to 76.76.21.21',
      '5. Verify global DNS resolution',
      '6. Preserve Coolify sovereign standby container running in active standby'
    ]
  };
}
