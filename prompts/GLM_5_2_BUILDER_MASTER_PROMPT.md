# Master Builder Prompt — GLM 5.2 / GLM Coding Models

You are the builder for Asc3nd Social Purpose OS, a repeatable AI operating system for Northwest nonprofits. Follow this prompt exactly.

## Goal

Harden the existing system from deployable scaffold into production-grade repeatable nonprofit infrastructure.

The product model is:

- shared backend operating system;
- custom frontend per nonprofit;
- reusable public frontend bridge;
- nonprofit CRM;
- ICM folder architecture;
- human approval gates;
- Hostinger VPS flywheel deployment;
- Rust for sensitive/deterministic services;
- Next.js for public site/admin UI.

## Read first

Inspect these files before changing code:

```text
AGENTS.md
HEART_AND_SOUL.md
docs/ARCHITECTURE.md
docs/FRONTEND-BRIDGE-CONTRACT.md
docs/REPEATABLE-DEPLOYMENT.md
docs/SAFETY.md
docs/RUST-BOUNDARIES.md
docs/V0.5-PRODUCTION-HANDOFF.md
prompts/ASC3ND_ARCHITECT_SYSTEM_PROMPT.md
icm/tenant-template/AGENT.md
icm/tenant-template/CONTEXT.md
icm/tenant-template/_config/heart-and-soul.md
services/mission-api/server.js
missionctl/missionctl.mjs
packages/core/src/bridge.js
packages/core/src/crm.js
packages/core/src/safety.js
packages/core/src/icm.js
packages/mission-sdk-js/src/index.js
apps/site/app/page.jsx
apps/site/app/ops/page.jsx
apps/site/app/ops/crm/page.jsx
apps/site/app/ops/bridge/page.jsx
```

## Build rules

1. Work test-first.
2. Do not remove ICM.
3. Do not turn the system into a hidden swarm.
4. Do not customize backend code for only one client.
5. Keep nontechnical language in the UI.
6. Treat youth data, money, legal, grant, donor, and outbound communication actions as high risk.
7. Prefer Rust for deterministic safety, tenant boundary, ICM path, outbox, and public bridge work.
8. Keep Next.js for UX and frontend customization.

## Immediate P0 tasks

### P0-1: Fix production bridge configuration

Issue: The frontend API client must consistently use `NEXT_PUBLIC_MISSION_API_URL`. Public bridge CORS must allow custom tenant frontend origins at the public CORS layer, then enforce tenant origin allowlist inside the route.

Acceptance:

- `NEXT_PUBLIC_MISSION_API_URL` works for all ops API calls.
- Public frontend at a tenant domain can submit forms if tenant `allowedOrigins` includes it.
- Unknown origins are rejected by tenant verification.
- Tests prove idempotency, origin rejection, and duplicate replay.

### P0-2: Replace demo-state JSON with Postgres repositories

Create repository layer:

```text
packages/db/src/connection.ts
packages/db/src/repos/tenants.repo.ts
packages/db/src/repos/contacts.repo.ts
packages/db/src/repos/crm.repo.ts
packages/db/src/repos/approvals.repo.ts
packages/db/src/repos/outbox.repo.ts
packages/db/src/repos/audit.repo.ts
packages/db/src/repos/icm.repo.ts
```

Acceptance:

- API state survives restart.
- Existing tests run against test database or repository abstraction.
- JSON dry-run remains only behind `MISSION_STORAGE=json`.
- Production refuses JSON mode.

### P0-3: Real CRM flow

Public bridge submissions must create:

- contact;
- interaction;
- pipeline item;
- staff task;
- audit event;
- optional approval if the submission asks for high-risk action.

Acceptance:

- Volunteer form goes to Volunteer pipeline.
- Contact form goes to General Inbox pipeline.
- Program application goes to Youth/Program pipeline.
- Donation intent goes to Donor pipeline.
- Sponsor message goes to Sponsor pipeline.
- All create tasks and audit events.

### P0-4: Approval-to-outbox execution

Approvals must not simply mark approved. Approval creates an execution package and outbox event. Worker executes only approved events.

Acceptance:

- Orange/red actions cannot execute without approval.
- Red actions require signer role.
- Approved action creates `outbox_events` row.
- Worker marks success/failure and logs result.
- Failed events retry safely with idempotency.

### P0-5: ICM runner hardening

Create or complete the ICM runner that:

- validates tenant paths;
- reads Layer 0-4 context;
- refuses path traversal;
- writes `result.md`, `audit.json`, `approval-request.json` when needed;
- indexes artifact metadata into the database;
- never loads unrelated tenant files.

Acceptance:

- `missionctl icm run asc3nd 02_opportunity_scan` works.
- Tests prove path traversal refusal.
- Stage output is auditable.

### P0-6: Role-based access control

Add roles:

```text
owner
executive_director
program_director
staff
board_member
volunteer_manager
finance
read_only
```

Acceptance:

- Board cannot see private youth notes.
- Volunteer manager cannot view finance records.
- Staff cannot approve red grant/legal/financial actions.
- Tenant A cannot access Tenant B.

## UX hardening tasks

1. Replace generic copy with Asc3nd-specific mission language.
2. Remove technical labels from staff navigation unless in developer/system mode.
3. Add role-specific home states: Founder, Program Director, Board, Volunteer Lead.
4. Add public site sections for:
   - who Asc3nd serves;
   - youth/sports/mentorship outcomes;
   - how donors help;
   - volunteer pathway;
   - sponsor pathway;
   - partner/school pathway;
   - AI-readable impact and funding readiness.
5. Add public forms wired through the Mission SDK:
   - volunteer interest;
   - sponsor inquiry;
   - program/parent inquiry;
   - donor conversation;
   - general message.

## Design audit requirements

Apply the design workflow quality gate:

- clarity ≥ 8.5;
- hierarchy ≥ 8.5;
- accessibility ≥ WCAG AA;
- one primary action per section;
- 44px minimum interactive targets;
- form errors are plain-language and actionable;
- empty states explain what to do next;
- mobile navigation is usable.

## Commands to run

```bash
npm ci
npm test
npm run build
npm run doctor
npm run adamsreview
node missionctl/missionctl.mjs doctor
node missionctl/missionctl.mjs tenant create test-northwest-youth --org "Test Northwest Youth" --domain "https://test.example.org" --api "https://api.test.example.org"
node missionctl/missionctl.mjs frontend scaffold test-northwest-youth
node missionctl/missionctl.mjs smoke test-northwest-youth
```

If Rust toolchain is available:

```bash
cargo check --workspace
cargo test --workspace
cargo clippy --workspace -- -D warnings
```

## Done criteria

A release is acceptable only if:

- tests pass;
- build passes;
- doctor passes;
- AdamsReview-style gate returns no blockers;
- a new tenant can be created;
- a custom frontend can submit through bridge;
- CRM receives the submission;
- approval/outbox/audit are created where required;
- hostinger handoff is generated;
- all new behavior is documented.

## Forbidden shortcuts

- Do not claim Postgres production readiness if JSON files still own state.
- Do not leave placeholder integrations labeled as live.
- Do not bypass approvals for convenience.
- Do not hardcode Asc3nd into shared backend paths except as default seed/demo tenant.
- Do not store tokens in unsafe long-lived browser storage for production without documenting migration to httpOnly cookies.
- Do not expose internal tool names to staff-facing UX unless in System Health.
