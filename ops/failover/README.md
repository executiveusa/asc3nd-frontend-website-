# ASC3ND Controlled Failover Architecture

## Philosophy: Detection & Preparation Without Automatic DNS Mutation
The ASC3ND failover controller detects production degradation, verifies standby readiness, records structured evidence, and produces the exact DNS operation needed to cut over. **Traffic mutations require human approval.**

## State Machine
`HEALTHY` → `DEGRADED` → `FAILOVER_CANDIDATE` → `AWAITING_HUMAN_APPROVAL` → `FAILOVER_APPROVED` → `FAILED_OVER` → `ROLLBACK_CANDIDATE` → `ROLLBACK_APPROVED` → `PRIMARY_RESTORED`

## Candidate Gating Rules
A failover candidate is triggered ONLY if:
1. Primary root fails ≥ 2 consecutive checks
2. Primary `/api/health` fails ≥ 2 consecutive checks
3. Sovereign standby `/api/ready` returns HTTP 200 (database connected)
4. Latest PostgreSQL backup is < 24 hours old with verified checksum
5. Sovereign Docker container is `running`

If sovereign standby is unhealthy: **FAIL CLOSED — NO CUTOVER**.
