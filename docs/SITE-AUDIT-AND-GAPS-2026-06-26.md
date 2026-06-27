# Site Audit + Gaps — 2026-06-26 (updated v0.7)

## Scope

Inspected the uploaded repository for the deployed Asc3nd site and ran local validation. The live Vercel URL could not be fetched from the available web tool during this pass, so this audit is based on the submitted source zip plus local test/build/runtime checks.

## Validation performed

```text
npm ci                         passed
npm test                       passed, 20/20
npm run build                  passed
npm run doctor                 passed
npm run adamsreview            release_candidate
/api/health                    passed locally
/api/auth/login                passed locally
/api/tenant/provision          passed locally
/api/public/:tenant/volunteer  passed locally from allowed origin
```

## v0.7 fixes applied

1. `apps/site/lib/api.js` now respects `NEXT_PUBLIC_MISSION_API_URL` before falling back to `NEXT_PUBLIC_API_URL`.
2. `apps/site/app/login/page.jsx` no longer prefills demo credentials in production builds.
3. `services/mission-api/server.js` now separates private API CORS from public bridge CORS so tenant frontends can reach public endpoints while the route still enforces tenant origin allowlists.
4. Added prompt, architect, skill, and audit files for transferring the system mind to GLM builders and future agents.
5. **v0.7: Production Next.js 16 public frontend** with Seattle youth/sports/mentorship mission copy, Mission OS preview dashboard, public bridge flows, AI-readable discovery, outcome-based navigation, and design system.
6. **v0.7: Repo pushed to GitHub** (`main` branch) at `https://github.com/executiveusa/asc3nd-frontend-website-`.
7. **v0.7: README and docs updated** to reflect current architecture, version history, and repo structure.

## Senior architect gaps

### Blocker/high

1. **State is still JSON-backed in the Node API.** Production must use Postgres repositories and refuse JSON state in production.
2. **Public website needs more Asc3nd mission proof.** The homepage now explains the organization, but still needs real program copy, service pathways, people served, donor value, volunteer path, sponsor path, and credibility proof.
3. **Public forms are not yet visible on the public site.** The bridge exists, but the frontend should include actual volunteer, sponsor, donor, parent/program, and contact flows rendered as UI.
4. **Approval is not yet a real execution lifecycle.** Approval must create outbox events; workers must execute approved events and log result.
5. **RBAC is too thin.** Youth-serving nonprofits need strict role separation.
6. **ICM runner is not yet a true runtime.** ICM files exist, but stage execution, artifact indexing, and approval generation need to be real.
7. **Live adapter status is mostly dry-run.** Pi, Absurd, Sandcastle, Postiz, Composio/MCP, voice, and model routing need real credential gates and live smoke tests.
8. **Rust services not yet wired into production Docker Compose.** Source exists in `services/mission-*-rs/` but the production compose file still runs the Node API only.

### Medium

1. Staff nav still exposes `ICM Files` and `Flywheel`; keep these under System/Admin mode.
2. Ops pages need more empty-state education and less abstract system language.
3. Design is clean but not yet Apple-native. Reduce glow, tighten spacing, add lighter role-based home screens, and use calmer Seattle civic visuals.
4. `llms.txt` exists but should become tenant-specific and generated from real mission/program content.
5. `missionctl` should create real DNS/handoff checklists and validate CORS/public origins before handoff.

## Steve Krug audit summary

| Area | Current state | Needed improvement |
|---|---|---|
| Homepage | clear product idea | needs real Asc3nd-specific mission and proof |
| Login | simple | remove production demo feel, clarify demo/staging |
| Today | closest to nontechnical goal | needs role-specific next actions |
| CRM | promising | needs live create/edit/move flows, not just display |
| Bridge | useful for developers | should move technical details into developer mode |
| Opportunities | useful | needs real local database and evidence checklist |
| Reports | useful scaffold | needs board-ready export and approval trail |
| ICM/Flywheel | architecturally important | hide from regular staff |

## Next release target

v0.6 should be: `Real Flows + Real Asc3nd Copy`.

Acceptance:

- public site has real Asc3nd pages and forms;
- forms submit through Mission SDK;
- CRM records can be edited and moved;
- Postgres repository layer replaces JSON in production;
- approval creates outbox event;
- role-based views exist;
- ICM runner can execute at least one stage end to end;
- Hostinger handoff smoke test is updated for the deployed domain.
