# Gate 7 Polish Proposal

## Summary

Gate 7 is a strict, rollback-protected polish sequence for the recovered Asc3nd static preview. The current preview is functional and flyer-faithful, but it is not yet visually approved for client presentation at the desired standard.

This change exists to move from recovered preview to polished preview without repeating the prior screenshot-wrapper failure.

## Goals

- Preserve the black/gold/white Asc3nd flyer identity.
- Preserve static-only boundaries: no backend, no fake checkout, no fake production claims.
- Improve visual hierarchy, section pacing, card design, trust cues, light/dark theme quality, and motion.
- Keep Donate primary and Volunteer/Contact secondary but obvious.
- Keep implementation gates small and independently verifiable.

## Non-Goals

- No production deploy.
- No `npm install`.
- No Next app edits.
- No secrets or env files.
- No copy rewrite unless required to fix a clarity bug.
- No GSAP adoption before Gate 7H.

## Evidence

- Gate 7A audit: `client-preview/audit/gate-7a-brutal-audit.md`
- Evidence JSON: `client-preview/audit/gate-7a-evidence.json`
- Screenshots: `client-preview/audit/screenshots/gate-7a/`
- Rollback: `client-preview/rollback/2026-07-06-1527-before-gate-7-polish/`
