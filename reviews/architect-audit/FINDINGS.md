# Architect Findings — Current Stage

## A001 — Public bridge CORS vs tenant origin

Severity: high  
Status: fixed in this pass  
Files: `services/mission-api/server.js`

Problem: Global CORS blocked tenant frontend domains before the public bridge route could enforce tenant-specific origins.

Fix: Split private API CORS from public bridge CORS. Public bridge accepts preflight from arbitrary origins but actual route still enforces tenant `allowedOrigins` plus public key.

## A002 — API env mismatch

Severity: high  
Status: fixed in this pass  
Files: `apps/site/lib/api.js`

Problem: Handoff files use `NEXT_PUBLIC_MISSION_API_URL`, while API client only read `NEXT_PUBLIC_API_URL`.

Fix: API client now checks `NEXT_PUBLIC_MISSION_API_URL` first.

## A003 — Production login demo feel

Severity: medium  
Status: fixed in this pass  
Files: `apps/site/app/login/page.jsx`

Problem: Login prefilled demo credentials, which is useful locally but wrong for production.

Fix: Prefill only outside production.

## A004 — Public mission copy

Severity: high  
Status: open

Problem: The homepage explains the product more than Asc3nd's mission.

Fix: Build Asc3nd-specific public site copy and forms using `docs/COPY-PERSONALIZATION-BRIEF.md`.

## A005 — Production truth storage

Severity: blocker  
Status: open

Problem: JSON-backed state remains the main API storage in Node.

Fix: Replace with Postgres repository layer and disallow JSON in production.

## A006 — Real workflow execution

Severity: high  
Status: open

Problem: Approval, outbox, live adapters, and ICM stage execution are not yet fully wired.

Fix: Implement approval-to-outbox lifecycle, worker execution, ICM runner, and adapter smoke tests.
