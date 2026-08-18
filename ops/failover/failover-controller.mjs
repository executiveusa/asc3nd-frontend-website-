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

/**
 * Evaluates telemetry against strict failover gating rules.
 * Rule: Candidate requires >= 2 consecutive failures on BOTH root and health endpoints AND current failure.
 */
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

  // STRICT REQUIREMENT: Both root and health must have >= 2 consecutive failures AND be currently failing
  const isPrimaryOutageConfirmed = (!prodRootOk && prodRootFailures >= 2) && (!prodHealthOk && prodHealthFailures >= 2);
  const isSovereignHealthy = sovereignReadyOk && sovereignContainerRunning;
  const isBackupHealthy = backupAgeHours <= 24.0 && backupHasChecksum;

  if (!isPrimaryOutageConfirmed) {
    if (!prodRootOk || !prodHealthOk || prodRootFailures > 0 || prodHealthFailures > 0) {
      return {
        state: 'DEGRADED',
        candidate: false,
        failClosed: false,
        reason: 'primary_single_or_asymmetric_failure: threshold not reached (requires >= 2 consecutive failures on both / and /api/health)'
      };
    }
    return { state: 'HEALTHY', candidate: false, failClosed: false, reason: 'all_systems_operational' };
  }

  // Primary outage confirmed (both >= 2 failures). Evaluate Sovereign Standby Prerequisites
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
      reason: 'FAIL_CLOSED_NO_CUTOVER: Database backup is older than 24h SLA or missing checksum'
    };
  }

  // All 5 prerequisites met: Promote to AWAITING_HUMAN_APPROVAL
  return {
    state: 'AWAITING_HUMAN_APPROVAL',
    candidate: true,
    failClosed: false,
    reason: 'Primary confirmed down (>= 2 consecutive failures on / and /api/health); standby healthy; backup fresh; awaiting human approval'
  };
}

/**
 * Generates structured cutover specification (NO executable shell strings).
 */
export function generateProposedCutoverPlan() {
  return {
    action: 'DNS_CUTOVER_TO_SOVEREIGN_VPS',
    currentDnsProvider: 'HOSTINGER',
    futureMigrationTarget: 'CLOUDFLARE',
    targetVpsIp: '31.220.58.212',
    targetDomains: ['asc3nd.org', 'www.asc3nd.org'],
    dnsChanges: [
      {
        recordType: 'A',
        name: 'asc3nd.org',
        currentContent: '76.76.21.21 (Vercel)',
        proposedContent: '31.220.58.212 (Hostinger Sovereign VPS)',
        ttl: 300,
        dnsAuthority: 'Hostinger DNS (solar.dns-parking.com / lunar.dns-parking.com)'
      },
      {
        recordType: 'CNAME',
        name: 'www.asc3nd.org',
        currentContent: 'asc3nd.org',
        proposedContent: 'asc3nd.org',
        ttl: 300,
        dnsAuthority: 'Hostinger DNS'
      }
    ],
    proxySpecification: {
      targetDomains: ['asc3nd.org', 'www.asc3nd.org'],
      targetContainer: 'asc3nd-community-cuts-staging',
      targetInternalPort: 3001,
      proxyConfigPath: '/etc/caddy/asc3nd-production.Caddyfile'
    },
    rollbackReference: 'ops/failover/rollback-preflight.mjs'
  };
}

export function generateRollbackPlan() {
  return {
    action: 'RESTORE_PRIMARY_VERCEL_DNS',
    currentDnsProvider: 'HOSTINGER',
    primaryOriginIp: '76.76.21.21',
    steps: [
      '1. Verify Vercel deployment returns HTTP 200 on direct origin inspection',
      '2. Verify Supabase REST connectivity from Vercel',
      '3. Obtain human approval for rollback',
      '4. Restore DNS A record for asc3nd.org to 76.76.21.21 in Hostinger DNS panel',
      '5. Verify global DNS resolution',
      '6. Preserve Coolify sovereign standby container running in active standby'
    ]
  };
}
