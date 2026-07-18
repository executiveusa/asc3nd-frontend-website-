# AGENTS.md — Asc3nd Social Purpose OS

## Product architecture rule

The backend is reusable product infrastructure. Do not customize backend code for a single client unless the change improves the shared product.

Customize tenants through:

- public frontend copy/theme/assets
- `llms.txt`
- onboarding profile
- ICM `_config` files
- ICM stage references

## ICM rule

Do not replace ICM with a hidden swarm. The operating system is the folder structure:

- `AGENT.md`
- `CONTEXT.md`
- numbered `stages/*/CONTEXT.md`
- `_config` reference files
- `output` working artifacts

## Safety rule

No automated red/orange action without human approval. Youth, grant submissions, public claims, donor outreach, legal/financial work, outbound calls, and browser applications are approval-gated.

## Coding loop

1. Read docs and existing conventions.
2. Add or update a failing test.
3. Implement in `packages/core` first when possible.
4. Wire API in `services/mission-api`.
5. Wire UI in `apps/site`.
6. Run `npm test` and smoke tests.
7. Update docs and ICM template.

## Architect prompt layer

Before any serious hardening pass, read:

- `HEART_AND_SOUL.md`
- `prompts/ASC3ND_ARCHITECT_SYSTEM_PROMPT.md`
- `prompts/GLM_5_2_BUILDER_MASTER_PROMPT.md`
- `docs/SKILL-MAP-AND-OPERATING-LOOP.md`
- `docs/SITE-AUDIT-AND-GAPS-2026-06-26.md`

These files define the transferable agent identity, GLM builder contract, nonprofit UX lens, and production hardening loop.

## Persona and writing rule

Before planning, reviewing, or creating public-facing copy, read:

- `docs/PAULI-DIGITAL-COFOUNDER-PERSONA.md`

The locked Digital Cofounder persona governs agent judgment and writing behavior. It requires direct recommendations, factual specificity, human-centered design, and a Humanizer-style audit for common AI writing patterns.

The persona does not override:

- client strategy and current reality
- safety, dignity, privacy, accessibility, or legal requirements
- verified facts and evidence
- repository-local architecture rules
- Asc3nd's approved brand voice

For public copy, use this review order:

`facts -> audience reality -> client voice -> human writing audit -> Steve Krug clarity -> safety/accessibility -> preview -> Jeremy + Digital Cofounder review`

Do not treat technical readiness as permission to publish.

## Nonprofit UX rule

Staff-facing pages must use outcome language. Hide tool names unless the user is in system/developer mode.

Preferred labels:

- Find Funding
- Prepare Application
- Grow Donors
- Coordinate Volunteers
- Report Impact
- Review Before Sending
- Publish Story
- Prepare Board Update

Avoid staff-facing labels such as Pi, MCP, Sandcastle, Absurd, vector DB, model routing, and flywheel except in System Health.

## Review loop

Every change must be reviewed through these lenses:

1. correctness
2. security
3. tenant isolation
4. youth/privacy safety
5. Steve Krug usability
6. Apple-level restraint
7. nonprofit pain point solved
8. ICM integrity
9. repeatable deployment
10. Hostinger/flywheel readiness
