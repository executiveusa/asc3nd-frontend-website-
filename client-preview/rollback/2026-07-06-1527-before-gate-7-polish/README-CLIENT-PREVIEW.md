# Asc3nd Client Preview

A standalone static preview for Asc3nd Collective — a flyer-faithful,
multi-page, bilingual sales demo of the public site vision. This is the
clickable product the client reviews before approving production work.

## What's in here

Three pages, all sharing `styles.css` and `app.js`:

- `index.html` — homepage: hero, mission, pillars, programs, Stories teaser
  (4 posts), Merch teaser (3 products), get-involved band, contact, footer.
- `blog.html` — Stories archive: page hero, category filter chips, full
  8-post grid, editorial disclaimer.
- `merch.html` — Merch: page hero, 7 product cards, commerce-engine note.

Supporting files: `llms.txt`, `robots.txt`, `sitemap.xml`, `vercel.json`,
`assets/` (logo + site reference image), `screenshots/` (QA proof),
`openspec/` (change contract + provenance), `skills/caveman/` (token-skill
reference for future builder agents).

## What is real

- Static page structure, three real routes.
- Flyer-faithful brand: black/gold/white, Barlow Condensed, ASC**3**ND
  wordmark, "Empowering youth. Elevating futures. Building community."
- Light/dark theme toggle (persists across pages, honors
  prefers-color-scheme).
- English / Mexican Spanish flag toggle (persists; never shows "MX" label).
- Donate → https://www.givelively.org/ on every CTA.
- Social → 5 exact signup URLs (IG/FB/X/TikTok/LinkedIn) as inline SVG icons.
- Sticky header, scroll progress, reveal-on-scroll, active-section nav.
- Working modals (Events/Volunteer/Privacy/Terms) with focus trap +
  Escape/overlay/X close.
- Local contact validation, mailto draft, copyable summary.
- AI-readable `llms.txt`, sitemap, robots.
- Reduced-motion support, skip-to-content link, focus-visible outlines.

## What is simulated (honestly labeled in-UI)

- Contact submission (local validation only).
- Newsletter signup (notice only).
- Merch checkout (concept cards, "coming soon", no fake inventory).
- Printify integration.
- Live event calendar.
- Production legal/privacy review.

## How to view locally

From the parent folder (`C:\Users\execu\Documents\ASC3ND FRONTEND WEBSITE`):

```
python -m http.server 4173 --directory client-preview
```

Open:
- http://localhost:4173/
- http://localhost:4173/blog.html
- http://localhost:4173/merch.html
- http://localhost:4173/llms.txt

## Deploy

Vercel static deployment from `client-preview/`:

```
vercel --cwd client-preview --yes
```

Do NOT use `--prod` unless production deployment is explicitly approved.

## Verification

QA captured via headless Playwright (see `screenshots/capture.js`):
- 9 routes return 200.
- Homepage: 4 blog teasers, 3 store teasers, 4 pillars, 5 programs, 5 social
  SVGs.
- Blog: 8 cards + 9 filter chips.
- Merch: 7 cards.
- Dark theme applies; ES toggle sets `lang="es-MX"` with accented copy.
- Events modal opens; mobile menu toggles.
- Zero console / page errors.

## Next phase after visual approval

See `BLOCKERS-FOR-LATER.md` — generate merch mockups, reconcile into the real
Next app, wire commerce + contact backends, final legal + a11y pass.
