# Gate 7 Atomic Rollback Log

## Baseline

Rollback folder:

`client-preview/rollback/2026-07-06-1527-before-gate-7-polish/`

Created after Gate 7A evidence capture and before any visual implementation gates.

## Before Inventory

Active preview root includes:
- `index.html`
- `blog.html`
- `merch.html`
- `styles.css`
- `app.js`
- `llms.txt`
- `robots.txt`
- `sitemap.xml`
- `vercel.json`
- `README-CLIENT-PREVIEW.md`
- `BLOCKERS-FOR-LATER.md`
- `assets/`
- `openspec/`
- `screenshots/`
- `skills/`

## After Inventory

Gate 7A/7B added audit and safety artifacts only:
- `audit/gate-7a-brutal-audit.md`
- `audit/gate-7a-capture.cjs`
- `audit/gate-7a-evidence.json`
- `audit/screenshots/gate-7a/`
- `openspec/changes/gate-7-polish/`
- `beads/checkpoints/0014-gate-7-visual-audit.md`
- `beads/checkpoints/0015-gate-7-rollback-proof.md`
- `beads/checkpoints/0016-gate-7-polish-plan.md`
- `beads/checkpoints/0017-gate-7-link-audit.md`
- `beads/checkpoints/0018-gate-7-visual-approval.md`
- `rollback/atomic-log.md`

No visual source files were changed in Gate 7A/7B.

## Future Edit Allowlist

Future visual gates may edit only:
- `index.html`
- `blog.html`
- `merch.html`
- `styles.css`
- `app.js`
- `assets/`
- `audit/`
- `screenshots/`
- `openspec/changes/gate-7-polish/`
- `beads/checkpoints/`

Never edit without explicit approval:
- `skills/caveman/`
- env or secret files
- production deployment settings
- files outside `client-preview/`

## Inverse Rollback Command

Use only after explicit human approval:

```powershell
$root = 'C:\Users\execu\Documents\ASC3ND FRONTEND WEBSITE\client-preview'
$rollback = Join-Path $root 'rollback\2026-07-06-1527-before-gate-7-polish'
Copy-Item -Path (Join-Path $rollback '*') -Destination $root -Recurse -Force
```
