# Tasks — Asc3nd Preview Polish

Grouped phases. Each was a targeted diff, never a full-file rewrite. Commit +
checkpoint after each phase. No `--prod` deploy at any phase.

## Phase 0 — Baseline & rollback (DONE)
- [x] Baseline commit `a0b2b843e6b227714d9a8a5ce6651727656cd041` on master
- [x] Branch `codex/asc3nd-preview-polish`
- [x] Rollback snapshot `client-preview__BASELINE_20260705-224557`
- [x] OpenSpec artifacts created

## Phase 1 — Content architecture (DONE, ffb0d93)
- [x] Replace generic blog posts with real PNW nonprofit content (WA grant
      cycles, AI-for-nonprofits, mentorship, donor trust, volunteer coord),
      backdated across 30 days, EN + ES.
- [x] Tighten program/pillar copy to Pacific Northwest nonprofit voice.
- [x] No fake stats, deadlines, partners, awards.

## Phase 2 — Homepage polish (DONE, eea8a7f)
- [x] Refine hero spacing, gradient, and image treatment to flyer fidelity.
- [x] Sharpen section rhythm (padding, eyebrows, headings).
- [x] Replace text-abbreviated socials (IG/FB/X/TT/IN) with inline SVG icons.
- [x] Flag-based language toggle (🇺🇸/🇲🇽), remove "MX" chip label.

## Phase 3 — Stories + Merch pages (DONE, 4327337)
- [x] Create `blog.html` with full post grid + category filter.
- [x] Create `merch.html` with seven product cards + commerce-engine note.
- [x] Update nav links Stories→blog.html, Merch→merch.html (both langs).
- [x] Homepage Stories/Merch sections become teasers with "view all" CTAs.

## Phase 4 — Interactions (DONE, eea8a7f)
- [x] Light/dark theme toggle with localStorage persistence.
- [x] Active-section tracking in nav (IntersectionObserver).
- [x] Refined reveal-on-scroll; scroll progress bar already present.
- [x] Modal focus trap + restore; overlay/Escape close already present.
- [x] Card hover lift, button press states, reduced-motion guard.

## Phase 5 — Accessibility & Krug pass (DONE, 8e040b3)
- [x] Semantic landmarks, heading order, alt text.
- [x] Visible focus states (:focus-visible gold outline), skip-link.
- [x] Every viewport answers: what / who / do / next / trust.

## Phase 6 — Browser QA (DONE, 8e040b3)
- [x] `node --check client-preview/app.js`
- [x] banned-token scan (no `.frame`, `lorem`, `TODO`, `href="#"`, etc.)
- [x] Serve via `python -m http.server 4173 --directory client-preview`
- [x] Verify index/blog/merch/llms.txt/robots/sitemap load (9 routes 200).
- [x] Capture desktop + mobile screenshots of hero, stories, merch, contact,
      modal, dark mode, mobile nav (12 captured).

## Phase 7 — Final report (DONE)
- [x] Return Gate/Phase/Files/QA/Blockers/Rollback/Ready report.
