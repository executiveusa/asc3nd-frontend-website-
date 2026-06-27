# Architecture

Current version: **v0.7 Frontend Landing** (see `README.md` for version history).

## Product rule

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

## Core services

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

## Adapter strategy

All expensive or risky external systems are adapters:

- Pi agent runtime: `POST /api/agent/run` currently dry-runs and routes model tier.
- Absurd durable workflows: `POST /api/workflows/run` writes stage outputs and can be swapped to Absurd.
- Sandcastle sandbox: intended for code/browser execution under approval.
- Composio/MCP: connect email, calendar, drive, CRM, grant portals.
- Postiz: campaign payload exists; scheduling is blocked until approved.
- Twilio/voice: webhook logs calls; outbound calling must be approval-gated.

## Why ICM

ICM keeps the system durable across models. Better models improve execution; the operating system remains readable folders, stage contracts, references, and outputs.
