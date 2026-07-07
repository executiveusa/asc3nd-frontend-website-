# Bead 0020 - Final Hero Audit Deploy

Date: 2026-07-06
Local commit inspected before deploy: 3b03b8a
Previous known production rollback target: https://client-preview-emcn8mis2-the-pauli-effect.vercel.app
Production alias: https://client-preview-nine.vercel.app/

Scope:
- Final homepage hero swap to `assets/hero-asc3nd-seattle.png`.
- Gate 7 audit closure for hero, nav, routes, modals, contact preview, merch, stories, theme, language, static resources, reduced motion, and regression checks.
- Production deploy after local QA passes.

Rollback:
- Preferred Vercel rollback target: `https://client-preview-emcn8mis2-the-pauli-effect.vercel.app`
- CLI rollback path: promote the previous deployment in Vercel or redeploy the prior local commit if the final production verification fails.
