# Route Audit — Asc3nd Frontend Website
**Date:** 2026-07-01
**Scope:** All routes, links, and anchors on `/` and `/es`
**Status:** All allowed fixes applied. Report-only issues documented.

---

## Routes Audited

| Route | Linked from | Expected | Actual | Fix applied | Verified |
|---|---|---:|---:|---|---|
| `/` | nav, hero CTA, footer | 200 | 200 | — | ✅ |
| `/es` | language toggle | 200 | 200 (after this build) | Created `apps/site/app/es/page.jsx` | pending build |
| `#home` | nav logo, nav Home link | anchor on page | exists on hero section | — | ✅ |
| `#mission` | nav, footer, hero CTA, program CTA | anchor on page | exists on Who We Are section | — | ✅ |
| `#programs` | nav, footer | anchor on page | exists on Programs section | — | ✅ |
| `#get-involved` | nav, CTA band | anchor on page | exists on CTA band section | — | ✅ |
| `#volunteer` | CTA band Volunteer btn | anchor on page | exists on Asc3ndPublicForms `id="volunteer"` | — | ✅ |
| `#contact` | nav, footer | anchor on page | exists on footer section | — | ✅ |
| `/login` | not on public homepage | n/a | not linked from public pages | — | ✅ |
| `/ops` | not on public homepage | n/a | not linked from public pages | — | ✅ |
| `/sitemap.xml` | robots.txt reference | 200 | 404 on production | sitemap.js exists, production not deployed | report |
| `/robots.txt` | not linked from pages | 200 | 404 on production | report |
| `https://instagram.com` | footer | external | external | — | ✅ |
| `https://facebook.com` | footer | external | external | — | ✅ |
| `https://youtube.com` | footer | external | external | — | ✅ |
| `https://tiktok.com` | footer | external | external | — | ✅ |
| `https://linkedin.com` | footer | external | external | — | ✅ |
| `#events` | nav, footer | anchor | **BROKEN — no #events section on page** | report | report |
| `#stories` | nav, footer | anchor | **BROKEN — no #stories section on page** | report | report |
| `/privacy` | footer | 200 | 404 expected | report |
| `/terms` | footer | 200 | 404 expected | report |

---

## Anchors That Work

| Anchor | Section | Status |
|---|---|---|
| `#home` | Hero | ✅ Works |
| `#mission` | Who We Are | ✅ Works |
| `#programs` | Programs grid | ✅ Works |
| `#get-involved` | CTA band | ✅ Works |
| `#volunteer` | Public forms | ✅ Works |
| `#contact` | Footer | ✅ Works |

---

## Broken Links (Report Only — Not Fixed)

| Link | Issue | Fix owner decision needed |
|---|---|---|
| `#events` nav/footer link | No events section exists on the page | Create events section or remove link |
| `#stories` nav/footer link | No stories section exists on the page | Create stories section or remove link |
| `/privacy` footer link | No privacy policy page exists | Create page or remove link |
| `/terms` footer link | No terms page exists | Create page or remove link |

---

## Fixes Applied (Allowed Scope)

1. **`/es` route created** — `apps/site/app/es/page.jsx` mirrors `/` with all Mexican Spanish copy from `content/site.es.js`.
2. **Language toggle added** — `🇺🇸 EN` / `🇲🇽 ES` toggle in PublicNav, top-right before Donate button. Routes `/es` ↔ `/` with path preservation.
3. **Sitemap updated** — added `/es` to the sitemap entries.

---

## Sitemap Issue

`sitemap.js` currently returns `['/', '/login', '/ops']`. `/es` added in this build. `/login` and `/ops` should not be in public sitemap — **reported for owner decision**.

---

## Report Only — Production Deployment

Production URL `https://asc3nd-frontend-website.vercel.app/` returns 404 for ALL routes including `/`. The site is not currently deployed. Vercel project needs to be linked and deployed.
