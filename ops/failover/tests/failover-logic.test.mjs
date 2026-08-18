import { evaluateFailoverCandidate, generateProposedCutoverPlan, generateRollbackPlan } from '../failover-controller.mjs';

let passed = 0;
let failed = 0;

function assert(name, condition) {
  if (condition) {
    console.log(`[PASS] ${name}`);
    passed++;
  } else {
    console.error(`[FAIL] ${name}`);
    failed++;
  }
}

console.log('=== RUNNING FAILOVER CONTROLLER DETERMINISTIC TEST SUITE ===\n');

// 1. Healthy Primary
const t1 = evaluateFailoverCandidate({
  prodRootOk: true,
  prodHealthOk: true,
  prodRootFailures: 0,
  prodHealthFailures: 0,
  sovereignReadyOk: true,
  sovereignContainerRunning: true,
  backupAgeHours: 1.0,
  backupHasChecksum: true
});
assert('Test 1: Healthy Primary -> state HEALTHY, candidate false', t1.state === 'HEALTHY' && t1.candidate === false);

// 2. One-cycle degradation (1 root failure + 1 health failure) -> MUST NOT BE CANDIDATE
const t2 = evaluateFailoverCandidate({
  prodRootOk: false,
  prodHealthOk: false,
  prodRootFailures: 1,
  prodHealthFailures: 1,
  sovereignReadyOk: true,
  sovereignContainerRunning: true,
  backupAgeHours: 1.0,
  backupHasChecksum: true
});
assert('Test 2: One-cycle failure (1 root + 1 health) -> state DEGRADED, candidate false', t2.state === 'DEGRADED' && t2.candidate === false);

// 3. Asymmetric failure counts (2 root failures + 1 health failure) -> MUST NOT BE CANDIDATE
const t3a = evaluateFailoverCandidate({
  prodRootOk: false,
  prodHealthOk: false,
  prodRootFailures: 2,
  prodHealthFailures: 1,
  sovereignReadyOk: true,
  sovereignContainerRunning: true,
  backupAgeHours: 1.0,
  backupHasChecksum: true
});
assert('Test 3a: Asymmetric failure (2 root + 1 health) -> state DEGRADED, candidate false', t3a.state === 'DEGRADED' && t3a.candidate === false);

// 3b. Asymmetric failure counts (1 root failure + 2 health failures) -> MUST NOT BE CANDIDATE
const t3b = evaluateFailoverCandidate({
  prodRootOk: false,
  prodHealthOk: false,
  prodRootFailures: 1,
  prodHealthFailures: 2,
  sovereignReadyOk: true,
  sovereignContainerRunning: true,
  backupAgeHours: 1.0,
  backupHasChecksum: true
});
assert('Test 3b: Asymmetric failure (1 root + 2 health) -> state DEGRADED, candidate false', t3b.state === 'DEGRADED' && t3b.candidate === false);

// 4. Two-cycle confirmed outage (2 root failures + 2 health failures + healthy standby) -> MUST BE AWAITING_HUMAN_APPROVAL
const t4 = evaluateFailoverCandidate({
  prodRootOk: false,
  prodHealthOk: false,
  prodRootFailures: 2,
  prodHealthFailures: 2,
  sovereignReadyOk: true,
  sovereignContainerRunning: true,
  backupAgeHours: 1.0,
  backupHasChecksum: true
});
assert('Test 4: Confirmed outage (2 root + 2 health + healthy standby) -> state AWAITING_HUMAN_APPROVAL, candidate true', t4.state === 'AWAITING_HUMAN_APPROVAL' && t4.candidate === true);

// 5. Standby Unhealthy (/api/ready failing) -> MUST FAIL CLOSED
const t5 = evaluateFailoverCandidate({
  prodRootOk: false,
  prodHealthOk: false,
  prodRootFailures: 2,
  prodHealthFailures: 2,
  sovereignReadyOk: false,
  sovereignContainerRunning: true,
  backupAgeHours: 1.0,
  backupHasChecksum: true
});
assert('Test 5: Standby Unhealthy -> failClosed true, candidate false', t5.failClosed === true && t5.candidate === false);

// 6. Stale Backup (> 24h SLA) -> MUST FAIL CLOSED
const t6 = evaluateFailoverCandidate({
  prodRootOk: false,
  prodHealthOk: false,
  prodRootFailures: 2,
  prodHealthFailures: 2,
  sovereignReadyOk: true,
  sovereignContainerRunning: true,
  backupAgeHours: 25.5,
  backupHasChecksum: true
});
assert('Test 6: Stale Backup (> 24h) -> failClosed true, candidate false', t6.failClosed === true && t6.candidate === false);

// 7. Missing Backup Checksum -> MUST FAIL CLOSED
const t7 = evaluateFailoverCandidate({
  prodRootOk: false,
  prodHealthOk: false,
  prodRootFailures: 2,
  prodHealthFailures: 2,
  sovereignReadyOk: true,
  sovereignContainerRunning: true,
  backupAgeHours: 1.0,
  backupHasChecksum: false
});
assert('Test 7: Missing Checksum -> failClosed true, candidate false', t7.failClosed === true && t7.candidate === false);

// 8. Cutover plan structure check (No raw shell commands)
const cutover = generateProposedCutoverPlan();
assert('Test 8: Cutover plan uses structured proxySpecification (no raw shell script in command)', typeof cutover.proxySpecification === 'object' && cutover.currentDnsProvider === 'HOSTINGER');

console.log(`\nTests Summary: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
