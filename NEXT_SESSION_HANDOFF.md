# NEXT_SESSION_HANDOFF.md — Asc3nd Collective Frontend
**Updated:** 2026-07-02 | **Outgoing model:** Gemini 2.0 Flash (Antigravity) | **Incoming model:** Gemini 2.5 Pro

---

## 🟢 SITE IS LIVE

| URL | Status |
|---|---|
| **https://asc3nd-frontend-website.vercel.app** | ✅ LIVE — Production alias |
| https://asc3nd-frontend-website-jj4p0wp3t-the-pauli-effect.vercel.app | ✅ Latest deploy |
| https://asc3nd.org | ⚠️ DNS not resolving yet — needs domain pointed to Vercel |

---

## Project Identity

| Field | Value |
|---|---|
| **Org** | Asc3nd Collective — Seattle youth nonprofit |
| **Vercel Team** | `the-pauli-effect` |
| **Vercel Project** | `asc3nd-frontend-website` |
| **Vercel Project ID** | `prj_0MLyBEnhrRChPaGd1P5wkArwpqpe` |
| **GitHub Repo** | https://github.com/executiveusa/asc3nd-frontend-website- |
| **Local Repo** | `E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\asc3nd-frontend-website--main\asc3nd-frontend-website--main` |

---

## Stack

- **Framework:** Next.js 16.2.9 (App Router, Turbopack)
- **Monorepo root:** `package.json` (workspaces: `apps/*`, `packages/*`)
- **Site app:** `apps/site/` — this is the deployed Next.js app
- **SDK package:** `packages/mission-sdk-js/` — `@asc3nd/mission-sdk-js`
- **CSS:** Vanilla CSS in `apps/site/app/globals.css` — NO Tailwind
- **Font:** Barlow Condensed (headings) + Barlow (body) via Google Fonts
- **Palette:** Black `#000`, Gold `#F5A617`, White `#fff`

---

## Vercel Deploy Config (CRITICAL — took many iterations to get right)

- **Vercel Dashboard Root Directory:** `apps/site` ← SET IN DASHBOARD, not just vercel.json
- **`apps/site/vercel.json`:**
  ```json
  {
    "version": 2,
    "framework": "nextjs",
    "installCommand": "cd ../.. && npm install",
    "buildCommand": "npm run build",
    "outputDirectory": ".next"
  }
  ```
- **Deploy command (from repo root):** `npx vercel --prod`
- **DO NOT run `npx vercel --prod` from `apps/site/`** — doubles the path

---

## Current State of Code

### Key files changed this session
| File | What it does |
|---|---|
| `apps/site/app/page.jsx` | Full homepage — hero, pillars, who-we-are, 5 programs, CTA band, footer |
| `apps/site/app/globals.css` | Full design system — all `hp-*` and `a3-*` classes, tokens |
| `apps/site/components/PublicNav.jsx` | Sticky black nav, 8 links, gold DONATE button, mobile hamburger |
| `apps/site/components/SubscribeForm.jsx` | `'use client'` newsletter form — extracted to fix Server Component error |
| `apps/site/app/es/page.jsx` | Spanish homepage — same layout, Spanish content from `content/site.es` |
| `apps/site/app/layout.jsx` | Root layout — Inter font, dark bg, wraps in SmoothScrollProvider |
| `apps/site/app/layout-client.jsx` | Client wrapper for Lenis smooth scroll |
| `apps/site/vercel.json` | Build config for Vercel |
| `vercel.json` (root) | Minimal `{"version":2}` — Vercel dashboard handles rootDirectory |

### Design reference
- **Flyer image:** `apps/site/public/images/asc3nd-site-reference.jpg` (used as hero bg + program card images)
- **Screenshot of live site:** `site_live.png` (repo root)
- **Brand:** Black background, gold `#F5A617` accents, white text, ALL CAPS headings in Barlow Condensed 900

---

## What Still Needs Work

### High priority
1. **`asc3nd.org` DNS** — point the domain to Vercel in DNS settings. In Vercel: Settings → Domains → Add `asc3nd.org`
2. **Hero image** — currently using flyer reference image as background. Needs a real hero photo of youth/community
3. **Donation URL** — `tenantSite.donationUrl` in `tenant.config.js` points to a placeholder. Update to real donation platform (Zeffy, PayPal, etc.)
4. **Social links** — currently pointing to `instagram.com`, `facebook.com` etc. — update to real handles in `page.jsx` and `es/page.jsx`

### Medium priority
5. **Email subscribe** — `SubscribeForm` submits to nowhere (`e.preventDefault()` only). Wire to Mailchimp/ConvertKit/etc.
6. **Events section** — referenced in nav but no `/events` page exists
7. **Stories section** — referenced in nav but no `/stories` page exists
8. **Contact page** — footer links to `#contact` anchor only, no dedicated `/contact` page
9. **`/privacy` and `/terms` pages** — footer links exist, pages don't

### Design audit
10. Run the `impeccable` CLI audit against UDEC axes (spacing, rhythm, contrast)
11. Mobile QA — test hamburger nav on real device
12. Check hero image loading performance (currently unoptimized JPG)

---

## How to Deploy Updates

```powershell
# From repo root:
cd "E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\asc3nd-frontend-website--main\asc3nd-frontend-website--main"

# Make changes, then:
git add -A
git commit -m "feat/fix: description"
git push origin main
# Vercel auto-deploys on push to main

# OR manual deploy:
npx vercel --prod
```

---

## Content System

- `apps/site/tenant.config.js` — org name, EIN, donation URL, tagline, region
- `apps/site/content/site.es.js` — Spanish translations for `/es` route
- All page content is hardcoded in `page.jsx` for now (not CMS-driven)

---

## Known Issues / Watch Out For

- `@asc3nd/mission-sdk-js` is a local workspace package — install must run from repo root (`cd ../.. && npm install`), NOT from `apps/site` alone
- No Tailwind installed — do NOT use `className="bg-[...]"` or any Tailwind utilities
- `page.jsx` and `es/page.jsx` are Server Components (they export `metadata`) — any interactivity must be in separate `'use client'` components
- The `SmoothScrollProvider` uses Lenis — if scroll behavior feels broken, check `components/SmoothScrollProvider.jsx`

---

## Git Log (recent)
```
e612dd1 fix: extract SubscribeForm as client component
e047ba5 fix(vercel): clean config — dashboard rootDirectory=apps/site
5d002c1 fix(vercel): point builds src at next.config.mjs
2a7382e fix(vercel): use builds API with @vercel/next
c18d281 fix(vercel): correct build config
498fde1 feat: add new screenshot images for site (#3)
7030ade Design/flyer redesign v1 (#4)
```
