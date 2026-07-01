# Design Violations Report — Asc3nd Frontend Website
**Date:** 2026-07-01
**Scope:** `/` and `/es` (report-only, no fixes without approval)

---

## Issues Found

### 1. Nav overcrowding — HIGH
**Severity:** UX / clarity
**Location:** `PublicNav.jsx` desktop nav
**Issue:** 8 nav links + Donate CTA before hamburger kicks in. Includes duplicate "About Us" and "Our Mission" both pointing to `#mission`.
**Impact:** Scrolling required to see Donate CTA on smaller laptops. Decision fatigue from 8+ equal choices.
**Fix owner decision:** Remove duplicate or consolidate.

### 2. Equal CTA weight — MEDIUM
**Severity:** Conversion
**Location:** Hero section
**Issue:** "DONATE TODAY" (gold) and "VOLUNTEER WITH US" (outline) appear equally weighted in hero.
**Impact:** Unclear primary conversion goal.
**Fix owner decision:** Make Donate larger/bolder or move Volunteer to CTA band below.

### 3. "Learn more" circular link — LOW
**Severity:** UX confusion
**Location:** Who We Are section, "Learn more about us →" button
**Issue:** Points to `#mission` which is the same section heading. No destination change.
**Fix owner decision:** Change to link to `#programs` or `#get-involved`.

### 4. Body copy in uppercase — MEDIUM
**Severity:** Accessibility / readability
**Location:** Programs section headings (e.g., "EDUCATION SUPPORT")
**Issue:** All-caps program titles reduce readability for dyslexic users and feel shouty.
**Fix owner decision:** Title case or proper case preferred over ALL CAPS per accessibility guidance.

### 5. Footer clutter — MEDIUM
**Severity:** UX / cognitive load
**Location:** Footer columns
**Issue:** 4 footer columns + subscribe form + social icons + legal links = too much on one screen.
**Fix owner decision:** Reduce to 3 columns or collapse subscribe into a simple single-line input.

### 6. EIN hardcoded — INFO
**Severity:** Accuracy
**Location:** `tenant.config.js` `ein: '99-1881891'`
**Issue:** EIN shown in footer as hardcoded value from tenant config. Not verified against IRS.
**Note:** Do not change without owner confirmation of actual EIN.

### 7. Fake/placeholder social links — INFO
**Severity:** Trust
**Location:** Footer social icons
**Issue:** Instagram, Facebook, YouTube, TikTok, LinkedIn links all point to base URLs with no Asc3nd-specific handles confirmed.
**Fix owner decision:** Confirm actual social handles before linking publicly.

### 8. "EIN:" in footer with no context — LOW
**Severity:** Trust
**Location:** Footer
**Issue:** EIN shown without explanation of what it is or why it's there. Visitor may not know what EIN means.
**Fix owner decision:** Add "(Tax ID)" label or remove.

### 9. Nav links: Events + Stories — HIGH (broken anchors)
**Severity:** Broken UX
**Location:** Nav and footer quick links
**Issue:** `#events` and `#stories` anchors exist in nav/footer but no corresponding page sections exist.
**Impact:** Clicking these links scrolls to nothing or same section — silent failure.
**Fix owner decision:** Implement sections or remove links.

### 10. Design template feel — LOW
**Severity:** Brand distinctiveness
**Location:** Overall page structure
**Issue:** Hero → pillars → who → programs → CTA → footer pattern is common nonprofit template structure.
**Note:** This is not a violation — just an observation. Distinctive brand differentiation requires full design brief, outside this build scope.

---

## Issues NOT found (confirmed clean)

- ✅ No fake stats or fabricated impact numbers
- ✅ No glowing neon gradients or generic AI-design defaults
- ✅ No gold contrast failures (gold on dark background tested — passes)
- ✅ No placeholder content with obvious lorem ipsum
- ✅ No staff ops/admin links visible on public pages
- ✅ No rainbow color cycling in UI

---

## No Fixes Applied (Report Only)

All issues above are documented for owner approval. No design changes made under this build scope except those required for the `/es` route and language toggle.
