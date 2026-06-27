# Next Session Handoff

**Date:** 2026-06-26
**Version:** v0.7.0 (Frontend Landing)
**Repo:** https://github.com/executiveusa/asc3nd-frontend-website- (branch `main`)
**Release:** https://github.com/executiveusa/asc3nd-frontend-website-/releases/tag/v0.7.0

---

## Where we left off

All code is pushed to `main` and synced with GitHub. The v0.7.0 release is tagged and published. Working tree is clean.

### What was done in this session
1. Pushed all code to GitHub (`main` branch)
2. Deleted stale `master` remote branch
3. Resolved README merge conflict (kept project README over auto-generated one)
4. Updated README and all docs to reflect v0.7 state
5. Created GitHub release v0.7.0
6. Verified no secrets (.env) were committed

### Current running state
- Next.js dev server running on http://localhost:3000 (PID 2656, started in prior session)
- Landing page is live and working

---

## What to do next (priority order)

### P0 — Production hardening (before any paid client delivery)

1. **Postgres migration**
   - Implement `PostgresTenantStore` matching `JsonTenantStore` interface
   - Add `DATABASE_URL` support behind `STORAGE_MODE=postgres`
   - Wire existing `db/schema.sql` migration runner
   - Add tenant isolation tests (tenant A cannot read tenant B data)

2. **Public site mission proof**
   - Add real program copy, service pathways, people served, donor value, volunteer path, sponsor path
   - Add credibility proof (logos, numbers, partner quotes)
   - Wire actual public forms into the public site UI (volunteer, sponsor, donor, parent/program, contact)

3. **Approval execution lifecycle**
   - Approval must create outbox events
   - Workers must execute approved events and log results
   - Wire into ICM stage `05_approval_gate`

4. **RBAC hardening**
   - Youth-serving nonprofits need strict role separation
   - Add roles: founder, program director, volunteer coordinator, board member, communications lead

5. **Rust service integration**
   - Wire `services/mission-*-rs/` into Docker Compose production flow
   - Add integration tests for tenant boundary enforcement at network layer
   - Add health checks and observability

### P1 — Adapter hardening (real credentials)

6. **Pi agent runtime** — command adapter with timeout, cwd restriction, output capture
7. **Absurd** — durable queue for scans, report generation, campaign drafting
8. **Sandcastle** — sandbox executor for browser tasks and untrusted code
9. **Composio/MCP** — tenant-scoped allowlist, read/write split, tool-prompt injection checks
10. **Postiz** — schedule only approved campaign IDs
11. **Voice** — log calls automatically; require approval for outbound calls

### P1 — Staff product polish

12. First-run wizard with checklist cards
13. Role-based views (founder, program director, volunteer coordinator, board member)
14. Evidence Room uploads
15. Sponsor pipeline
16. Report export to markdown/PDF

### P2 — ICM runner as true runtime

17. Build `runIcmStage({ tenantId, stage, task })`
18. Read AGENT.md, workspace CONTEXT.md, stage CONTEXT.md, scoped references, prior outputs
19. Write `output/result.md`, `output/audit.json`, optional `approval-request.json`
20. Never load the whole workspace

---

## Key files to read first

- `README.md` — full architecture and version history
- `docs/ARCHITECTURE.md` — system architecture
- `docs/IMPLEMENTATION-NEXT.md` — detailed sprint plan
- `docs/PRODUCTION-GAPS.md` — non-negotiable production gaps
- `docs/SITE-AUDIT-AND-GAPS-2026-06-26.md` — latest audit findings
- `docs/SAFETY.md` — youth-serving guardrails
- `AGENTS.md` — product architecture rules and ICM operating system

## Key commands

```bash
npm install          # install deps
npm run dev          # full stack (web + API concurrently)
npm run dev:web      # frontend only
npm test             # unit tests
npm run build        # production build
npm run smoke        # e2e smoke tests
npm run doctor       # ICM/flywheel/deployment checks
npm run verify       # test + build + doctor + adamsreview + missionctl
```

## Environment

- Vercel project ID: `prj_0MLyBEnhrRChPaGd1P5wkArpe`
- Local dev: http://localhost:3000 (public site), /login (cockpit), /ops (console), :4000/api/health
- Demo login: `admin@asc3nd.local` / `change-this-password` (from .env)

## Safety reminders

- `.env` is git-committed — never push secrets
- No automatic grant submission, legal/financial filing, or outbound youth/family/donor communication
- Human approval gates are mandatory for money, youth data, legal/compliance, public publishing
- Rotate any secrets that may have been exposed in the workspace
