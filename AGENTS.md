# AGENTS.md — Asc3nd Frontend Repo
> READ THIS FIRST before editing any file in this repo.

---

## ⚠️ THERE ARE TWO SEPARATE REPOS. DO NOT CONFUSE THEM.

| Repo | Purpose | Local Path |
|------|---------|------------|
| **asc3nd-frontend-website** (THIS REPO) | Public-facing website + event pages | `E:\ACTIVE PROJECTS-PIPELINE\...\asc3nd-frontend-website--main` |
| **ascend-social-purpose-agentic-systems** | Agentic OS / backend / ICM system | `E:\ACTIVE PROJECTS-PIPELINE\...\ascend-social-purpose-agentic-systems--main(1)` |

**Never edit the agentic systems repo when working on the landing page or event pages.**

---

## This Repo Contains Two Separate Apps

### App 1 — `apps/site/` — Asc3nd Collective Main Website
- **What it is:** The public nonprofit homepage for Asc3nd Collective
- **URL:** https://asc3nd-frontend-website.vercel.app
- **Vercel project:** `asc3nd-frontend-website` (team: `the-pauli-effect`)
- **Stack:** Next.js 16, Vanilla CSS, Google Fonts (Barlow), NO Tailwind
- **Brand:** Black `#000`, Gold `#F5A617`, White `#fff`
- **Key files:**
  - `apps/site/app/page.jsx` — Homepage
  - `apps/site/app/globals.css` — Full design system
  - `apps/site/components/PublicNav.jsx` — Sticky nav
  - `apps/site/public/images/` — Site images
- **DO NOT** put Community Cuts event content here

---

### App 2 — `apps/event-community-cuts/` — Community Cuts for Kids Event Page
- **What it is:** Standalone event landing page for the Community Cuts for Kids back-to-school event
- **Event:** Sunday, August 30, 2026 · 12–3PM · Tangles & Locs, 7425 Hardeson Rd, Everett WA
- **Key files:**
  - `apps/event-community-cuts/app/page.jsx` — Event landing page
  - `apps/event-community-cuts/app/event.module.css` — Event styles
  - `apps/event-community-cuts/app/visual-fixes.module.css` — Venue photo stack CSS
  - `apps/event-community-cuts/app/EventInterestForm.jsx` — RSVP form
  - `apps/event-community-cuts/public/images/` — Event venue images
    - `tangles-locs-exterior.jpg` — Main venue exterior photo (Tangles & Locs salon)
    - `tangles-locs-01.webp` through `tangles-locs-04.webp` — Additional venue shots
- **DO NOT** put nonprofit org content here

---

## Deploy Rules (CRITICAL)

```
# Deploy from repo ROOT, not from apps/site:
cd "E:\ACTIVE PROJECTS-PIPELINE\...\asc3nd-frontend-website--main"
npx vercel --prod

# DO NOT run from apps/site — doubles the path and breaks the build
```

- Vercel auto-deploys `apps/site` on push to `main`
- The `apps/event-community-cuts` app is separate — check its deployment status

---

## Image Swap Protocol
When a user provides a new image to replace an existing one:
1. Identify WHICH app the image belongs to (`apps/site` or `apps/event-community-cuts`)
2. Copy the image to that app's `public/images/` folder
3. Update only that app's `page.jsx` reference
4. Never cross-pollinate images between apps

---

## Branch: `review/glm-turbo-krug-spanish-routes`
Contains pending work on Spanish routes and page stubs — not merged to main yet.
