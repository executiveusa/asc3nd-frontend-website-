# Tasks — Asc3nd Preview Polish

Grouped phases. Each is a targeted diff, never a full-file rewrite. Commit +
beads checkpoint after each phase. No `--prod` deploy at any phase.

## Phase 0 — Baseline & rollback (DONE)
- [x] Baseline commit `a0b2b843e6b227714d9a8a5ce6651727656cd041` on master
- [x] Branch `codex/asc3nd-preview-polish`
- [x] Rollback snapshot `client-preview__BASELINE_20260705-224557`
- [x] OpenSpec artifacts created

## Phase 1 — Content architecture
- [ ] Replace generic blog posts with real PNW nonprofit content (WA grant
      cycles, AI-for-nonprofits, mentorship, donor trust, volunteer coord),
      backdated across 30 days, EN + ES.
- [ ] Tighten program/pillar copy to Pacific Northwest nonprofit voice.
- [ ] No fake stats, deadlines, partners, awards.

## Phase 2 — Homepage polish
- [ ] Refine hero spacing, gradient, and image treatment to flyer fidelity.
- [ ] Sharpen section rhythm (padding, eyebrows, headings).
- [ ] Replace text-abbreviated socials (IG/FB/X/TT/IN) with inline SVG icons.
- [ ] Flag-based language toggle (🇺🇸/🇲🇽), remove "MX" chip label.

## Phase 3 — Stories + Merch pages
- [ ] Create `blog.html` with full post grid + category filter.
- [ ] Create `merch.html` with seven product cards + commerce-engine note.
- [ ] Update nav links Stories→blog.html, Merch→merch.html (both langs).
- [ ] Homepage Stories/Merch sections become teasers with "view all" CTAs.

## Phase 4 — Interactions
- [ ] Light/dark theme toggle with localStorage persistence.
- [ ] Active-section tracking in nav (IntersectionObserver).
- [ ] Refined reveal-on-scroll; scroll progress bar already present.
- [ ] Modal focus trap + restore; overlay/Escape close already present.
- [ ] Card hover lift, button press states, reduced-motion guard.

## Phase 5 — Accessibility & Krug pass
- [ ] Semantic landmarks, heading order, alt text.
- [ ] Visible focus states, color contrast AA on both themes.
- [ ] Every viewport answers: what / who / do / next / trust.

## Phase 6 — Browser QA
- [ ] `node --check client-preview/app.js`
- [ ] `rg` banned-token scan (no `.frame`, `lorem`, `TODO`, `href="#"`, etc.)
- [ ] Serve via `python -m http.server 4173 --directory client-preview`
- [ ] Verify index/blog/merch/llms.txt/robots/sitemap load.
- [ ] Capture desktop + mobile screenshots of hero, stories, merch, contact,
      modal, dark mode, mobile nav.

## Phase 7 — Final report
- [ ] Return Gate/Phase/Files/QA/Blockers/Rollback/Ready report.
