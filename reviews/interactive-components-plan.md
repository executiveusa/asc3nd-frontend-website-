# Interactive Components Plan — Asc3nd Frontend Website
**Date:** 2026-07-01
**Policy:** Do not build. Plan only.

---

## Component 1: Donation Impact Calculator

| Field | Value |
|---|---|
| **Page** | `/` (hero or dedicated section) |
| **User problem solved** | Shows donors exactly what their money does — transforms abstract "donate" into concrete impact |
| **Data needed** | Per-dollar impact figures (e.g., $25 = 1 hour tutoring, $100 = supplies for 1 youth) |
| **Risk** | Low — calculator only, no money moves |
| **Build later?** | ✅ Yes — high value, low risk |

**Description:** Slider ($10–$1,000) + impact display. Each tier shows a specific output.
Example: $25 → "funds 1 hour of tutoring." $100 → "provides academic supplies for 1 student for a semester."

---

## Component 2: Program Matcher

| Field | Value |
|---|---|
| **Page** | `/` or `/programs` section |
| **User problem solved** | Families/youth confused about which program fits their situation |
| **Data needed** | Program eligibility criteria, age ranges, commitment levels |
| **Risk** | Low — informational only |
| **Build later?** | ✅ Yes — reduces intake confusion |

**Description:** 3-question wizard (age, need, time commitment) → recommended program card.

---

## Component 3: Volunteer Pathway Selector

| Field | Value |
|---|---|
| **Page** | `#get-involved` section |
| **User problem solved** | Potential volunteer unsure what volunteering actually involves |
| **Data needed** | Volunteer role descriptions, time commitments, required skills |
| **Risk** | Low — informational routing to volunteer form |
| **Build later?** | ✅ Yes — increases volunteer form quality |

**Description:** "What do you want to do?" → shows matching volunteer roles → pre-fills volunteer form.

---

## Component 4: Youth Journey Timeline

| Field | Value |
|---|---|
| **Page** | `/programs` or dedicated `/journey` |
| **User problem solved** | Youth and families want to see what "joining" actually looks like over time |
| **Data needed** | Real program timeline/steps, testimonials from current participants |
| **Risk** | Medium — needs accurate, verified content |
| **Build later?** | ⚠️ After content is verified and testimonials are collected |

**Description:** Visual timeline (Month 1 → Month 6 → Year 1) showing what a participant experiences.

---

## Component 5: Sponsor Pathway Explorer

| Field | Value |
|---|---|
| **Page** | `/es` and `/` — partner/donor section |
| **User problem solved** | Potential corporate sponsors don't know what sponsorship involves |
| **Data needed** | Sponsorship tiers, benefits, current partner logos |
| **Risk** | Medium — needs accurate benefit claims and legal review |
| **Build later?** | ⚠️ After sponsorship tiers are confirmed with Asc3nd leadership |

**Description:** Tiers (Bronze/Silver/Gold) with impact descriptions and "Start conversation" CTA.

---

## Component 6: Bilingual Audience Selector

| Field | Value |
|---|---|
| **Page** | Homepage hero, sticky header |
| **User problem solved** | Spanish-speaking families land on English site and leave |
| **Data needed** | None — just routing |
| **Risk** | Low — purely navigational |
| **Build later?** | ✅ Already implemented as `/es` route + language toggle |

**Status:** ✅ Implemented in this build.

---

## Summary

| Component | Status | Priority | Data needed |
|---|---|---|---|
| Donation Impact Calculator | Planned | High | Impact $/outcome data |
| Program Matcher | Planned | High | Program eligibility data |
| Volunteer Pathway Selector | Planned | Medium | Role descriptions |
| Youth Journey Timeline | Planned | Medium | Real timeline + testimonials |
| Sponsor Pathway Explorer | Planned | Low | Sponsorship tiers confirmed |
| Bilingual Audience Selector | ✅ Implemented | Done | — |

**Recommendation:** Start with Donation Impact Calculator — highest conversion potential, lowest data/compliance risk. Collect impact-per-dollar figures from Asc3nd staff before building.
