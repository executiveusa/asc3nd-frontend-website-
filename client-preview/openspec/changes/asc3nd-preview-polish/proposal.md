# Proposal — Asc3nd Preview Polish

## Why
The recovered static preview is structurally healthy (clean I18n, working
modals, validation, correct donate + social links, no banned tokens) but still
feels like a recovered template rather than a flyer-faithful, client-ready
nonprofit preview. Three gaps remain:

1. Stories and Merch are crammed onto the homepage as teaser grids — they
   should be real pages so each can carry the depth the client is paying for.
2. The blog copy is generic editorial preview text ("Editorial guide", "No fake
   statistics") rather than real Pacific Northwest nonprofit content (WA grant
   cycles, AI-for-nonprofits operations, mentorship) backdated across 30 days.
3. The interaction layer lacks the Webflow-grade polish (sticky scroll state,
   active-section tracking, refined reveal, theme toggle, flag toggle) that
   would make this read as a premium movement, not a template.

## What
Polish the static Asc3nd client preview end to end, in place, without
redesigning it. Deliver:

- Homepage (`index.html`) tightened to flyer identity: hero, trust strip, who
  we are, programs, Stories teaser, Merch teaser, contact, footer.
- New Stories page (`blog.html`) with real backdated PNW nonprofit posts.
- New Merch page (`merch.html`) with the seven-product fundraising concept.
- Light/dark theme toggle with persistence; flag-based language toggle.
- Microinteractions: sticky header, scroll progress, reveal-on-scroll, active
  nav, modal polish, card lift, button press states.
- Steve Krug accessibility pass: every viewport answers what/who/do/next/trust.

## Risk
- Visual regression away from flyer identity (the failure mode of the last
  model run). Mitigation: flyer tokens are locked in `project.md`; every edit
  is a targeted diff, never a rewrite; rollback snapshot exists.
- Broken links / dead CTAs. Mitigation: interaction matrix in verification.
- Browser-only interaction failures (JS-dependent reveal, theme persistence).
  Mitigation: graceful no-JS fallback; `prefers-reduced-motion` honored.

## Out of scope
- Production Next app changes.
- Live Printify / Shopify / Etsy / checkout.
- Real email/contact backend.
- Product mockup image generation (branded placeholders remain).
- Production deploy / `--prod`.
