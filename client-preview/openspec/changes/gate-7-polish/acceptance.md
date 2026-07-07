# Gate 7 Acceptance

## Global Acceptance

- No edits outside `client-preview/`.
- No edits to `skills/caveman/` unless explicitly approved.
- No production deploy and no `--prod`.
- No `npm install`.
- No secrets, env files, or private local paths in public files.
- Rollback folder exists before visual implementation.

## Visual Acceptance

- The site remains flyer-faithful: black/gold/white, youth-centered, clear Donate path.
- The first viewport answers what the site is, who it serves, and what to do next.
- Donate points to `https://www.givelively.org/`.
- Stories and Merch remain on their own pages.
- Blog and merch cards feel credible, not filler.
- Light and dark themes both feel intentional.
- Motion is subtle, useful, and reduced-motion aware.

## Verification Acceptance

- Browser-visible proof is required before claiming a visual gate complete.
- Screenshot-wrapper regression remains absent: no `.frame`, no `.preview-image`.
- Required resources load: `/llms.txt`, `/robots.txt`, `/sitemap.xml`.
- Required modals open and close by X, Close button, Escape, and overlay.
- Contact preview validates locally and never claims backend submission.
- Final Gate 7I must include fresh desktop and mobile screenshots.
