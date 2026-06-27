# Asc3nd Social Purpose OS

A repeatable, self-hostable AI operating system for Seattle nonprofits, youth programs, sports organizations, and social-purpose companies.

This is not just a website scaffold. It is a deployable product template with three separated layers:

1. **Custom public frontend** — client-specific website and AI-readable discovery layer.
2. **Reusable operations console** — onboarding, opportunities, grants, campaigns, calls, approvals, outcomes, founder second brain.
3. **Reusable backend operating system** — ICM workspaces, durable workflow seams, agent routing, safety, integrations, and audit logging.

The backend is designed to remain shared and repeatable. For each new client, customize the public site copy, theme, logo, mission files, and tenant config while keeping the backend stable.

---

## v0.7 Frontend Landing

This release adds a production-grade public frontend landing site for Asc3nd Collective:

- **Next.js 16** public site with Seattle youth/sports/mentorship mission copy
- **Mission OS preview dashboard** showing approval queue and decision status
- **Public bridge** — volunteer, sponsor, donor, program, and contact flows
- **AI-readable discovery** — `llms.txt`, `robots.txt`, sitemap, JSON-LD
- **Outcome-based navigation** — plain-language buttons (Find Funding, Prepare Application, Grow Donors, Report Impact)
- **Design system** — Seattle forest palette, warm gold, civic mint, accessible cream

Live URL: https://asc3nd.org (deployed via Vercel)

---

## Hard-truth production review

Read these before using the system for paid production:

- `docs/GOLD-STANDARD-AUDIT.md` — self-review, design critique, and golden-standard backlog.
- `docs/PRODUCTION-GAPS.md` — non-negotiable production gaps.
- `docs/SITE-AUDIT-AND-GAPS-2026-06-26.md` — latest site audit findings.
- `npm run doctor` — checks ICM, flywheel vendor overlay, scripts, and deployment scaffolds.

## Local quick start

```bash
npm install
npm run dev:web
```

Open:

- Public site: http://localhost:3000
- Login: http://localhost:3000/login
- Ops cockpit: http://localhost:3000/ops
- API health: http://localhost:4000/api/health

Default demo login comes from `.env`:

```text
admin@asc3nd.local / change-this-password
```

## Full stack dev (web + API)

```bash
npm run dev
```

Runs both the Next.js site and the Mission API concurrently.

## VPS quick start with the flywheel

On a fresh Ubuntu VPS, run ACFS first, then this repo:

```bash
# 1. Install the agentic coding flywheel on the VPS.
curl -fsSL "https://raw.githubusercontent.com/Dicklesworthstone/agentic_coding_flywheel_setup/main/install.sh?$(date +%s)" | bash -s -- --yes --mode vibe

# 2. Upload or git clone this repo into /data/projects.
cd /data/projects/asc3nd-social-purpose-os
cp .env.example .env
nano .env

# 3. Launch.
bash scripts/bootstrap-vps.sh
```

## What is production-ready here

- Running Next.js 16 frontend and Node API.
- Docker Compose deployment (web, API, Rust services, optional integrations).
- File-backed tenant store for local/demo mode.
- ICM workspace generation and stage contracts.
- Opportunity scoring engine.
- Approval queue and audit log.
- Postiz, Pi, Absurd, Sandcastle, Composio, LiteLLM, Twilio adapter seams.
- Founder Second Brain and Obsidian-compatible vault structure.
- LLM export/import normalizer for ChatGPT/Claude/generic markdown-style exports.
- AI-readable `llms.txt`, `robots.txt`, sitemap, and JSON-LD.
- TDD test scaffolds for safety, routing, ICM, and opportunities.
- Rust service source for production core (mission-core-rs, mission-connect-rs, mission-worker-rs, mission-policy-rs, mission-icm-rs).
- JS SDK and tenant-kit for client frontends.
- `missionctl` repeatable tenant/deploy control plane.
- Hostinger VPS handoff generator with tenant-specific bundles.
- AdamsReview-lite multi-lens release artifact.

## What still needs keys or real services

The app runs without external keys in dry-run mode. To perform real submits, posts, calls, or agent execution, connect credentials for Postiz, Composio/MCP, Twilio, LiteLLM, Pi, Absurd, and Sandcastle. Human approval gates remain mandatory for money, youth data, legal/compliance, public publishing, and external communication.

---

## Architecture

See `docs/ARCHITECTURE.md` for the full architecture overview.

### Product rule

The backend stays reusable. Frontends and tenant `_config` files are customized.

```text
Client website         Reusable ops console        Reusable backend
apps/site/public   +   apps/site/ops pages    ->   services/mission-api
       |                        |                         |
       |                        v                         v
       |                 outcome buttons            ICM tenant folders
       |                        |                         |
       v                        v                         v
AI-readable pages       approval queue             Pi / Absurd / Sandcastle seams
```

### Core services

- `apps/site`: public website + private operations UI (Next.js 16).
- `services/mission-api`: API, onboarding, opportunity engine, approvals, campaigns, voice logs, ICM writes.
- `services/mission-core-rs`: authoritative tenant/CRM/approval core.
- `services/mission-connect-rs`: public frontend bridge for custom websites.
- `services/mission-worker-rs`: outbox worker and scheduled durable jobs.
- `services/mission-policy-rs`: deterministic action-risk classifier.
- `services/mission-icm-rs`: filesystem-safe ICM stage runner.
- `packages/core`: reusable business logic and tests.
- `packages/mission-sdk-js`: JS SDK for any client frontend.
- `packages/tenant-kit`: frontend config/theme/llms helpers.
- `icm/tenant-template`: canonical workspace template.
- `deploy`: Docker/Hostinger VPS deployment.

### Adapter strategy

All expensive or risky external systems are adapters:

- Pi agent runtime: `POST /api/agent/run` currently dry-runs and routes model tier.
- Absurd durable workflows: `POST /api/workflows/run` writes stage outputs and can be swapped to Absurd.
- Sandcastle sandbox: intended for code/browser execution under approval.
- Composio/MCP: connect email, calendar, drive, CRM, grant portals.
- Postiz: campaign payload exists; scheduling is blocked until approved.
- Twilio/voice: webhook logs calls; outbound calling must be approval-gated.

### Why ICM

ICM keeps the system durable across models. Better models improve execution; the operating system remains readable folders, stage contracts, references, and outputs.

---

## Tenant loop

```bash
node missionctl/missionctl.mjs tenant create northwest-youth --org "Northwest Youth"
node missionctl/missionctl.mjs frontend scaffold northwest-youth
node missionctl/missionctl.mjs smoke northwest-youth
npm run verify
```

## Hostinger handoff

```bash
node missionctl/missionctl.mjs tenant create asc3nd \
  --org "Asc3nd Collective" \
  --domain "https://asc3nd.org" \
  --api "https://api.asc3nd.org"

node missionctl/missionctl.mjs frontend scaffold asc3nd

node missionctl/missionctl.mjs hostinger handoff asc3nd \
  --domain "asc3nd.org" \
  --api-domain "api.asc3nd.org" \
  --email "admin@asc3nd.org" \
  --vps-ip "<HOSTINGER_VPS_IP>"
```

Primary handoff file: `HOSTINGER-VPS-HANDOFF.md`

Tenant bundle: `handoff/asc3nd/` (HOSTINGER-VPS-HANDOFF.md, .env.production, frontend.env, Caddyfile, docker-compose.production.yml, smoke-test.sh)

---

## Version history

### v0.7 Frontend Landing (current)
- Production-grade Next.js 16 public frontend for Asc3nd Collective
- Seattle youth/sports/mentorship mission copy
- Mission OS preview dashboard with approval queue
- Public bridge flows (volunteer, sponsor, donor, program, contact)
- AI-readable discovery (llms.txt, robots.txt, sitemap, JSON-LD)
- Outcome-based navigation with plain-language buttons
- Design system: Seattle forest palette, warm gold, civic mint

### v0.5 Production Handoff
- Hostinger VPS handoff generator
- Tenant-specific production env bundle
- Caddy and Docker production templates
- Frontend bridge env handoff
- Public bridge idempotency and honeypot guard
- Public submissions become CRM contacts, interactions, pipeline items, staff tasks, and audit events
- AdamsReview-lite release artifact

### v0.4 Production Core
- Rust service source for production core
- Mission Connect frontend bridge
- Nonprofit CRM helpers
- JS SDK and tenant-kit
- `missionctl` control plane
- Postgres migration
- Repeatable tenant/front-end scaffolding

---

## Repo structure

```text
apps/site/              Next.js public site + ops console
client-frontends/       Per-client frontend customizations
config/                 Model policy + tool allowlist
db/                     Postgres schema + migrations
deploy/                 Docker, Caddy, nginx, Dockerfiles
docs/                   Architecture, audits, runbooks, handoff
flywheel/               Agentic coding flywheel integration notes
handoff/                Tenant-specific deployment bundles
icm/                    ICM workspace template + tenant instances
packages/core/          Reusable business logic + tests
packages/mission-sdk-js/ JS SDK for client frontends
packages/tenant-kit/    Frontend config/theme/llms helpers
plugins/                LLM export/import, Obsidian vault
prompts/                Architect + builder system prompts
services/mission-api/   Node API service
services/mission-core-rs/      Rust tenant/CRM core
services/mission-connect-rs/   Rust public bridge
services/mission-worker-rs/    Rust outbox worker
services/mission-policy-rs/    Rust safety classifier
services/mission-icm-rs/       Rust ICM runner
tests/e2e/              End-to-end Playwright tests
vendor/acfs/            Vendored agentic coding flywheel
missionctl/             Repeatable tenant/deploy control plane
scripts/                Bootstrap, deploy, doctor, release
```

---

## Safety

See `docs/SAFETY.md` for youth-serving guardrails.

Approval classes:
- Green: internal read-only summary.
- Yellow: draft or recommendation.
- Orange: external communication, publishing, sponsor/donor contact, or browser action.
- Red: money, legal/compliance, youth records, grant submission, sensitive data.

Hard rules:
- No automatic grant submission.
- No automatic legal/financial filing.
- No automatic outbound youth/family/donor communication.
- No publishing without review.
- No browser automation on grant portals without a human-approved task plan.
- No unrestricted MCP tools.
- No cross-tenant file access.

---

## Testing

```bash
npm test          # unit tests (vitest)
npm run build     # production build
npm run smoke     # Playwright e2e smoke tests
npm run doctor    # ICM/flywheel/deployment structure checks
npm run verify    # test + build + doctor + adamsreview + missionctl doctor
```

---

## License

Proprietary — Asc3nd Collective.
