# Instance Hardening Prompt — Current Deployed Site

Use this prompt when inspecting and hardening the current deployed Asc3nd site.

## Objective

Turn the current Vercel deployment into a credible nonprofit-facing demo and the backend into a repeatable deployment system.

## First actions

1. Open the deployed URL.
2. Test public pages on desktop and mobile widths.
3. Log in using the configured demo credentials only in staging/demo.
4. Walk every ops route.
5. Submit each public bridge form from a custom frontend origin.
6. Confirm CRM contact, interaction, pipeline, task, approval, ICM output, and audit event where expected.
7. Generate Hostinger handoff for the tenant.
8. Run automated tests and release gate.

## Steve Krug audit checklist

For each page, answer:

- What is the page?
- What can I do here?
- What is the primary action?
- What does the system need from me?
- What happens after I click?
- Can a tired nonprofit director understand this in five seconds?
- Are there too many choices?
- Is the copy local, specific, and believable?
- Is the empty state helpful?
- Is the error state recoverable?

## Required findings format

Every finding must use:

```text
ID:
Severity: blocker | high | medium | low
Lens: UX | copy | security | data | ICM | deployment | CRM | bridge | accessibility
File(s):
Problem:
Why it matters for nonprofits:
Fix:
Test:
Acceptance criteria:
```

## Current known gaps to verify

- Public site still sells the operating system more than Asc3nd’s mission.
- Public site needs real Asc3nd copy, people served, program pathways, donor/volunteer/sponsor CTAs.
- Public forms need to be visible on the public site, not just documented in the bridge page.
- Login should not expose demo credentials in production.
- Frontend API env must use `NEXT_PUBLIC_MISSION_API_URL` consistently.
- Public bridge CORS must support tenant-specific frontend domains.
- Production state must move from JSON to Postgres.
- RBAC is not yet sufficient for youth-serving nonprofit operations.
- Approval must create outbox execution work, not just approved status.
- ICM runner must actually execute stages and index artifacts.
- Hostinger deployment must be smoke-tested end to end.
