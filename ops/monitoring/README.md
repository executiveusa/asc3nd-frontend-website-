# ASC3ND Sovereign Health & Recovery Monitoring

Zero-dependency, production-safe monitoring layer designed for sovereign failover readiness.

## Targets Monitored
1. **Production**:
   - `https://asc3nd.org/` (HTTP 200)
   - `https://asc3nd.org/api/health` (HTTP 200, database connected)
2. **Sovereign Staging**:
   - `https://asc3nd-community-cuts-staging.31.220.58.212.sslip.io/` (HTTP 200)
   - `/api/health` (HTTP 200)
   - `/api/ready` (HTTP 200, fails closed with 503 on database disconnect)
3. **VPS Infrastructure**:
   - CPU Load Average
   - Memory utilization (alert > 90%)
   - Disk utilization (alert > 85%)
   - Docker container state (`asc3nd-community-cuts-staging`)
4. **Data Protection Freshness**:
   - Validates PostgreSQL native archive in `/opt/backups/asc3nd/database/`
   - Checks size > 0, SHA-256 checksum existence, and age <= 24 hours.

## Evidence & Logs
- Evidence log: `/opt/monitoring/asc3nd/evidence.jsonl` (structured JSON Lines)
- Latest status: `/opt/monitoring/asc3nd/latest-status.json`
- Active alerts log: `/opt/monitoring/asc3nd/alerts.log`
- State tracking: `/opt/monitoring/asc3nd/state.json`
