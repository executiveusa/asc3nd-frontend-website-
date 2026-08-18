# ASC3ND Disaster Recovery Runbook

## Outcome
Restore `asc3nd.org` from GitHub plus approved secrets/backups without depending on Vercel as the sole production provider.

## Canonical sources
- Code: `executiveusa/asc3nd-frontend-website-`
- Production app: `apps/event-community-cuts`
- Health: `/api/health`
- Readiness: `/api/ready`
- Primary sovereign runtime target: Coolify/VPS
- Standby runtime target: Vercel during transition
- DNS/edge target: Cloudflare

## Incident classes

### Provider outage
1. Confirm `asc3nd.org/api/ready` failure from an external monitor.
2. Verify whether the failure is isolated to the current origin.
3. If standby is healthy, request/approve traffic failover.
4. Do not mutate the database during failover unless separately approved.
5. Record active Git SHA, origin, timestamps, and evidence.

### Application failure
1. Compare deployed SHA to approved production SHA.
2. Read application/container logs.
3. Verify `/api/health` and `/api/ready` separately.
4. Roll back only to an already-verified image/commit after approval.

### Database failure
1. Do not treat liveness success as full service health.
2. `/api/ready` must return non-200 when the production database is unavailable.
3. Preserve the current database before restore/migration actions.
4. Restore only from a verified offsite backup with an explicit recovery point.

## Recovery from zero
1. Clone the canonical repository at the approved recovery SHA.
2. Load secret values from the approved secret store; never from Git history or chat logs.
3. Build with `Dockerfile.coolify`.
4. Start on the sovereign runtime and keep it off the production domain.
5. Verify container health and `/api/ready`.
6. Verify forms/auth against the intended production backend.
7. Run smoke tests against the temporary origin.
8. Approve traffic cutover.
9. Update/fail over edge routing only after the standby passes readiness.
10. Record deployment SHA, origin, DNS state, database identity, and evidence.

## Backup law
A backup is not accepted as operational until a restore test succeeds. Database backups and Coolify configuration backups must exist outside the production VPS.

## Prohibited autonomous actions
Agents may diagnose and report. Agents may not change DNS, deploy production, rotate secrets, migrate production data, delete resources, or create paid resources without explicit approval.
