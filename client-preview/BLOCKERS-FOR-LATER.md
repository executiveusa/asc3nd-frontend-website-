# Blockers for Later

Post-approval implementation notes for the full production build. These are
internal planning notes, NOT client-facing warnings. The static preview itself
is complete and client-ready (see README-CLIENT-PREVIEW.md).

## Production app reconciliation
- Static preview is not the Next.js app. The real Next app still needs
  reconciliation after visual approval.
- Next/npm Windows workspace blocker was previously observed; WSL or a CI
  build path is the likely fix.
- Blog posts are JS data in app.js; production should move to markdown/CMS.
- Sitemap/robots/llms.txt metadata should move into the Next app routes.

## Commerce (Merch page)
- Real Printify API not wired (server-side adapter required).
- Real checkout not wired.
- Real merch mockup images still need generation; current cards use the
  branded logo placeholder with a gold border frame.
- Printify/Shopify/Etsy seller accounts not yet created.

## Backend (Contact + Newsletter)
- Real contact backend not wired (preview validates locally + mailto draft).
- Real newsletter backend not wired (preview shows notice only).
- Real GiveLively campaign URL pending — donate currently points to the
  GiveLively homepage as a placeholder.

## Content + Legal
- Final legal/privacy review still needed before production launch.
- Blog posts are original editorial; each funder's current grant cycle must be
  re-verified at publication time.
- EIN 99-1881891 shown as provided — confirm with client before public launch.

## Accessibility + QA
- Playwright headless QA passed (interaction matrix, zero console errors).
- Final manual accessibility audit with real screen readers recommended.
- Cross-browser Safari/iOS Safari visual pass not yet run (Playwright used
  Chromium).
