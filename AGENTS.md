# AGENTS.md — ASC3ND Frontend Repository

> Mandatory boot sequence before any edit, build, PR, or deployment.

## Central source of truth

This repository does **not** own the contract, task ledger, agent workflow, or client strategy source of truth.

Before working here, read in `executiveusa/ascend-social-purpose-agentic-systems-`:

1. `AGENTS.md`
2. `control-plane/README.md`
3. `control-plane/repo-registry.json`
4. `control-plane/task-ledger.json`
5. `control-plane/architecture.md`
6. the active folder under `icm/asc3nd-contract-closeout/`

Use JCodeMunch MCP first for targeted repository discovery. Claim the task in the central ledger before editing. This repository may only implement work explicitly routed here.

If the request belongs elsewhere, stop with:

```text
REPOSITORY_BOUNDARY_STOP
Requested work: <summary>
Current repository: executiveusa/asc3nd-frontend-website-
Reason it does not belong here: <reason>
Correct destination: <repository>
Required handoff artifact: <issue/PR/file/schema/media manifest>
```

## Repository boundary

This repository owns only:

- the public ASC3ND website;
- the Community Cuts event funnel;
- server-side API routes required by those frontends;
- frontend tests, accessibility, performance, and deployment configuration.

It does not own:

- the paid social-strategy contract ledger;
- client workbook answers;
- raw interview footage or transcript archive;
- brand master ownership;
- reusable agent-platform implementation;
- Postiz publishing strategy;
- a second RSVP database.

---

## There are two primary repositories. Do not confuse them.

| Repo | Purpose |
|---|---|
| `executiveusa/asc3nd-frontend-website-` (THIS REPO) | Public-facing website and event pages |
| `executiveusa/ascend-social-purpose-agentic-systems-` | Central control plane, reusable agentic OS, ICM stages, task and contract ledgers |

Never edit the agentic systems repository when implementing a landing-page change. Never place contract or workflow truth inside this frontend.

---

## This repository contains two separate apps

### App 1 — `apps/site/` — ASC3ND main website
- Public nonprofit homepage
- Vercel project historically named `asc3nd-frontend-website`
- Next.js, Vanilla CSS, Barlow
- Key files: `apps/site/app/page.jsx`, `apps/site/app/globals.css`, `apps/site/components/PublicNav.jsx`
- Do not place Community Cuts event content here.

### App 2 — `apps/event-community-cuts/` — Community Cuts event page
- Sunday, August 30, 2026
- 12:00 PM–3:00 PM
- Tangles & Locs, 7425 Hardeson Rd, Everett, WA 98203
- Key files: `apps/event-community-cuts/app/page.jsx`, `event.module.css`, `visual-fixes.module.css`, `EventInterestForm.jsx`
- Do not place general nonprofit website content here.

---

## Deployment law

1. Run `npm run guard:repo`.
2. Verify Git owner/repository identity.
3. Verify intended app/build/output identity.
4. Verify Vercel project and production-domain identity.
5. Preview first.
6. Production requires recorded human approval.

Do not rely on similar ASC3ND project names. Do not deploy from a nested app directory unless the approved Vercel project is explicitly configured for that root.

## Image and asset protocol

1. Identify the owning app.
2. Confirm the asset belongs to this repository rather than the brand-kit repository.
3. Copy only an approved export into the app's `public/images/` directory.
4. Preserve logo and QR masters; do not regenerate them.
5. Update only the owning app.
6. Test all breakpoints and QR scanning where applicable.

## Safety

- No service-role key in client code.
- No production data migration from this repository without explicit routing and approval.
- No public publishing or external messages.
- No youth-sensitive data in logs, fixtures, screenshots, or analytics.
- No completion claim without test evidence.