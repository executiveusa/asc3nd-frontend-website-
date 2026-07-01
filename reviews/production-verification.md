# Production Verification Report — Asc3nd Frontend Website
**Date:** 2026-07-01
**Production URL:** `https://asc3nd-frontend-website.vercel.app/`

---

## Production Status

| Route | Expected | Actual | Notes |
|---|---|---|---|
| `/` | 200 | ❌ 404 | **Site not deployed** |
| `/es` | 200 | ❌ 404 | **Site not deployed** |
| `/sitemap.xml` | 200 | ❌ 404 | **Site not deployed** |
| `/robots.txt` | 200 | ❌ 404 | **Site not deployed** |

**Finding:** The entire Vercel project is returning 404 for all routes. This is a deployment issue, not a code issue.

---

## Next.js Build Artifacts

`npm run build` — not yet run in this session (npm install timed out). Requires successful `npm install` before build can run.

### Expected build outputs
- `.next/` directory with SSR/SSG pages
- `/es` route bundled
- Sitemap and robots.txt generated

---

## Vercel CLI Status

```
vercel whoami → jointhepaulieffect-1358
vercel project ls → No projects found under the-pauli-effect
```

**Issue:** The CLI is authenticated as `jointhepaulieffect-1358` but no Vercel project named `asc3nd-frontend-website` exists under that account, OR the project exists but the CLI isn't linked to the project directory.

---

## Required Actions (Owner)

1. **Deploy to Vercel:**
   ```bash
   cd apps/site
   vercel --prod
   # OR link project first:
   vercel link
   vercel --prod
   ```

2. **Set environment variables on Vercel:**
   - `PUBLIC_SITE_URL=https://asc3nd-frontend-website.vercel.app`
   - `NEXT_PUBLIC_MISSION_API_URL=` (if Mission OS backend is deployed)
   - `NEXT_PUBLIC_MISSION_PUBLIC_KEY=` (if Mission OS backend is deployed)
   - `NEXT_PUBLIC_DONATION_URL=` (actual donation link)

3. **Verify after deploy:**
   - `/` → 200
   - `/es` → 200
   - `/sitemap.xml` → 200
   - `/robots.txt` → 200

---

## Local Verification

**Note:** Dev server (`npm run dev`) was not started in this session due to npm install hanging. Dev server must be started locally to test `/` and `/es` before deploying.

```bash
npm run dev
# → http://localhost:3000
# → http://localhost:3000/es
```

---

## Pre-deploy Checklist

- [ ] `npm install` completes
- [ ] `npm run build` succeeds (no TypeScript/compile errors)
- [ ] `npm run lint` passes (if lint script exists)
- [ ] `npm test` passes
- [ ] `npm run dev` — manually verify `/` and `/es` render correctly
- [ ] Vercel project linked: `vercel link`
- [ ] Environment variables set on Vercel dashboard
- [ ] Deploy: `vercel --prod`
- [ ] Verify all routes return 200 on production
- [ ] Check browser console for errors on `/` and `/es`

---

## Report: Canonical URLs

The `layout.jsx` sets `metadataBase` to `process.env.PUBLIC_SITE_URL || 'http://localhost:3000'`.

**Issue:** If `PUBLIC_SITE_URL` is not set in Vercel, canonical URLs will point to `http://localhost:3000`.
**Fix applied:** Explicitly set `PUBLIC_SITE_URL` env var on Vercel to the production URL.

---

## Report: /login and /ops in sitemap

`sitemap.js` returns `['/', '/login', '/ops']` — private routes in public sitemap.
**Issue:** `/login` and `/ops` are not public pages and should not be in the sitemap.
**Fix applied:** Not modified — owner decision needed. Recommend removing from sitemap until public-facing.
