# Implementation Next: Production Sprint

Current version: **v0.7 Frontend Landing**. This doc tracks the remaining production sprint work.

## v0.7 status

Shipped:
- Production Next.js 16 public frontend for Asc3nd Collective
- Seattle youth/sports/mentorship mission copy
- Mission OS preview dashboard with approval queue
- Public bridge flows (volunteer, sponsor, donor, program, contact)
- AI-readable discovery (llms.txt, robots.txt, sitemap, JSON-LD)
- Outcome-based navigation with plain-language buttons
- Design system: Seattle forest palette, warm gold, civic mint
- Repo pushed to GitHub (`main` branch)

## P0: Postgres and tenant security

- Implement `PostgresTenantStore` matching the `JsonTenantStore` interface.
- Add `DATABASE_URL` support behind `STORAGE_MODE=postgres`.
- Add migration runner using plain SQL first.
- Add tests proving tenant A cannot read or write tenant B files, DB rows, vault notes, or approval records.

## P0: ICM execution bridge

- Build `runIcmStage({ tenantId, stage, task })`.
- It should read AGENT.md, workspace CONTEXT.md, stage CONTEXT.md, scoped Layer 3 references, and Layer 4 prior outputs.
- It should write `output/result.md`, `output/audit.json`, and optional `approval-request.json`.
- It should never load the whole workspace.

## P0: Flywheel enforcement

- Keep ACFS as host bootstrap and task discipline.
- Every task should create or update a bead.
- Every change runs `npm test`, `npm run build`, and `npm run doctor` before release.
- Tenant-specific changes must stay in `apps/site/tenant.config.js`, public assets, and `icm/tenants/<tenant>/_config`.

## P0: Public site mission proof

- Add real program copy, service pathways, people served, donor value, volunteer path, sponsor path.
- Add credibility proof (logos, numbers, partner quotes).
- Wire actual public forms (volunteer, sponsor, donor, parent/program, contact) into the public site UI.
- Add deployment proof (live Vercel URL, screenshot, status badge).

## P1: Adapter hardening

- Pi: command adapter with timeout, cwd restriction, and output capture.
- Absurd: durable queue for scans, report generation, and campaign drafting.
- Sandcastle: sandbox executor for browser tasks and untrusted code.
- Composio/MCP: tenant-scoped allowlist, read/write split, tool-prompt injection checks.
- Postiz: schedule only approved campaign IDs.
- Voice: log calls automatically; require approval for outbound calls.

## P1: Staff product polish

- Add first-run wizard with checklist cards.
- Add role views: founder, program director, volunteer coordinator, board member.
- Add Evidence Room uploads.
- Add sponsor pipeline.
- Add report export to markdown/PDF later.

## P1: Rust service integration

- Wire Rust services (mission-core-rs, mission-connect-rs, mission-worker-rs, mission-policy-rs, mission-icm-rs) into the Docker Compose production flow.
- Add integration tests proving Rust services handle tenant boundary enforcement at the network layer.
- Add health checks and observability for Rust services.
