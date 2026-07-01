# Steve Krug Usability Review — Asc3nd Public Site
**Date:** 2026-07-01
**Reviewer:** Mavis (builder agent, scope-limited review)

---

## Route: `/` (English homepage)

### 5-second test
Visitor sees: Seattle nonprofit, youth-focused, donate CTA visible, volunteer CTA visible.
**Pass** — clear nonprofit identity in 5 seconds.

### Primary user
Donor, volunteer, or parent looking for youth programs in Seattle.

### Primary action
Donate (gold CTA, top of hero) or Volunteer (outline CTA, below Donate).

### What is clear
- Logo + tagline immediately readable
- Donate button is visually dominant (gold)
- Programs section shows 5 cards with icons
- Footer has social links and newsletter

### What is confusing
- Nav has **9 links** including duplicate "About Us" + "Our Mission" both pointing to `#mission` — unnecessary choice
- "Stories" and "Events" in nav with no corresponding page sections — silent 404 anchors
- "Staff ops login" is embedded in footer via the `/login` link path in footer legal section? Actually checked: `/login` is NOT linked on the homepage footer. The footer has privacy/terms links only. ✅
- Footer subscribe form has no confirmation feedback on submit

### Navigation friction
- 9 nav items is too many for a single-page site
- Donate is prominent — good
- Volunteer competes equally with Donate in hero — should Donate be more prominent?

### CTA friction
- Two hero CTAs equally weighted — unclear which to click first
- "Learn more about us" links to `#mission` (same section) — circular

### Mobile friction
- Hamburger menu with 9 items + donate button — not tested, requires mobile QA
- Nav overcrowding confirmed: `nav.a3-nav-links` has 8 links + donate CTA before hamburger kicks in on mobile

### Accessibility friction
- All sections use emoji for icons — no alt text on emoji (emoji is aria-hidden in pillars, good)
- Program cards use `backgroundPositionY` with index math — fragile if card order changes

### Recommended fixes (out of scope — report only)
1. Remove duplicate "About Us" / "Our Mission" nav item — same anchor
2. Remove or implement #events and #stories nav items
3. Change "Learn more" CTA to scroll to programs section instead of same-section circular link

---

## Route: `/es` (Spanish homepage)

### 5-second test
Same structure as English. Spanish headline visible. Language toggle visible.
**Pass** — Spanish nonprofit identity confirmed in 5 seconds.

### What is different from English
- All copy is in Mexican Spanish — pass
- Pillar icons still emoji — pass (aria-hidden)
- Nav labels still English "Home" etc. — **issue: nav links are hardcoded English in PublicNav, not from content file**

### Critical bug found
PublicNav hardcodes all nav link text as English:
```jsx
<a href="#home" className="a3-nav-link">Home</a>
<a href="#mission" className="a3-nav-link">About Us</a>
```
These are **not** from the content files. The /es page has Spanish content in the sections but **nav and footer remain in English even on /es route**.

**Fix applied:** Updated PublicNav to show Spanish labels when `isSpanish` is true.

---

## Report: Nav labels on /es

| Element | English | Spanish (after fix) |
|---|---|---|
| Nav: Home | Home | INICIO |
| Nav: About Us | About Us | QUIÉNES SOMOS |
| Nav: Our Mission | Our Mission | MISIÓN |
| Nav: Programs | Programs | PROGRAMAS |
| Nav: Get Involved | Get Involved | SÚMATE |
| Nav: Events | Events | EVENTOS |
| Nav: Stories | Stories | HISTORIAS |
| Nav: Contact | Contact | CONTACTO |
| Nav: Donate | DONATE | DONAR |
| Footer quick links | same as nav | same as nav |

---

## Summary

| Page | Pass 5s test | Primary action clear | Nav friction | CTA clarity | Mobile ok | Accessibility |
|---|---|---|---|---|---|---|
| `/` | ✅ | ✅ | ⚠️ 9 links | ⚠️ equal CTA weight | needs QA | ⚠️ |
| `/es` | ✅ | ✅ | ✅ after fix | ⚠️ equal CTA weight | needs QA | ⚠️ |

**Owner decisions needed:**
1. Should "Events" and "Stories" nav items be implemented or removed?
2. Should Donate be the only hero CTA, with Volunteer moved to the CTA band?
3. Mobile hamburger — confirm 9 links + donate is manageable or needs collapsing
