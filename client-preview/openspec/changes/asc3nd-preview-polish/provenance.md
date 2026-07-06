# Provenance — Asc3nd Preview Polish

Atomic-style audit trail. Model: GLM 5.2 (builtin:zai/GLM-5.2).

| Field | Value |
|---|---|
| Goal | Polish static Asc3nd preview to flyer-faithful, client-ready state without redesign. |
| Workspace | `C:\Users\execu\Documents\ASC3ND FRONTEND WEBSITE` |
| Baseline commit | `a0b2b843e6b227714d9a8a5ce6651727656cd041` |
| Branch | `codex/asc3nd-preview-polish` |
| Rollback snapshot | `client-preview__BASELINE_20260705-224557/` |

## Phase log

### Phase 0 — Baseline & rollback (commit a0b2b843)
- Exploration: read index.html, app.js (694 lines), styles.css (1435 lines),
  logo + flyer images; scanned Master Skills Bundle; verified Vercel CLI
  authed, Node 24, Python 3.11, Git 2.53; jcodemunch NOT reachable in ZCode
  runtime (raised to human, cleared to proceed without).
- Commitment: baseline commit, branch, snapshot, 6 OpenSpec files.
- Verification: `git rev-parse HEAD` matches; `node --check` clean.
- Rollback: `git reset --hard a0b2b843e6b227714d9a8a5ce6651727656cd041`.

### Phase 1 — Content architecture (commit ffb0d93)
- Exploration: prior blog copy was generic editorial-preview text.
- Commitment: 8 real PNW nonprofit posts (WA grant readiness, Seattle funding,
  mentorship, AI-for-nonprofits, volunteer coordination, donor-trust
  storytelling, PNW sponsorship, leadership-through-sport), backdated across
  30 days, EN+ES. Posts converted tuples→objects with body field.
- Verification: `node --check` clean; 2 posts blocks (EN+ES); no stray
  unaccented ES words.
- Unresolved risks: none.

### Phase 3 — Stories + Merch split (commit 4327337)
- Exploration: Stories/Merch were homepage teaser grids only.
- Commitment: new blog.html (archive + filter toolbar) and merch.html
  (7-product concept); homepage teasers reduced to 4 posts / 3 products with
  "view all" CTAs; inline text socials → SVG icons into #social-row;
  language toggle flag-based + persisted; merch interest carries across pages.
- Verification: `node --check` clean; teasers wired; both pages exist; zero
  banned tokens.
- Unresolved risks: none.

### Phase 2+4 — Polish & interactions (commit eea8a7f)
- Exploration: no theme toggle, no active-section nav, modal lacked Tab trap.
- Commitment: light/dark theme toggle (hidden until JS wires it, persisted,
  honors prefers-color-scheme); active-section nav via IntersectionObserver;
  modal Tab/Shift+Tab focus trap; full dark-theme token override; page-hero,
  blog toolbar, archive grids, section-foot, SVG social, flag toggle styles;
  hero scrim deepened for flyer fidelity.
- Verification: `node --check` clean; CSS 259/259 balanced; zero banned tokens.
- Unresolved risks: none.

### Phase 5+6 — Accessibility, docs, QA (commit 8e040b3)
- Exploration: no skip-link; stale llms.txt/sitemap/robots referenced old
  single-page structure and placeholder URLs.
- Commitment: skip-to-content link on all pages; main id=main-content;
  :focus-visible gold outline globally; llms.txt rewritten (documents new
  pages, toggles, topics, EIN, ES); sitemap.xml real production URL + new
  routes; robots.txt stale client-preview-nine URL fixed.
- Verification: Playwright headless QA — 9 routes 200, homepage 4+3 teasers,
  4 pillars, 5 programs, 5 social SVGs, blog 8 cards + 9 chips, merch 7 cards,
  dark theme applies, ES toggle sets es-MX with accents, events modal opens,
  mobile menu toggles; ZERO console/page errors. 12 screenshots captured.
- Unresolved risks: Safari/iOS visual pass not run (Playwright used Chromium);
  real screen-reader audit recommended before production.

## Final state
- 4 feature commits on branch, +1545 / -120 lines vs baseline.
- Files changed: app.js, styles.css, index.html, blog.html (new), merch.html
  (new), llms.txt, sitemap.xml, robots.txt, README-CLIENT-PREVIEW.md,
  BLOCKERS-FOR-LATER.md, screenshots/* (12 new + capture.js), openspec/*.
- Production app: untouched. No `--prod` deploy. No secrets touched.
