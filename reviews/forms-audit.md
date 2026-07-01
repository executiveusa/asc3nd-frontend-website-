# Public Forms Audit — Asc3nd Frontend Website
**Date:** 2026-07-01

---

## Current State

### Forms component: `Asc3ndPublicForms.jsx`

Three form lanes:
1. **Volunteer** — "Give time" / "Volunteer with us"
2. **Program Application** — "Youth + families" / "Ask about programs"
3. **Donation Intent** — "Donors + sponsors" / "Support the mission"

### Missing lanes (from desired 5 lanes per briefing)

The briefing documents 5 desired form lanes. Current implementation has 3:
- ✅ Volunteer
- ✅ Program Application
- ✅ Donation Intent
- ❌ Sponsor inquiry
- ❌ Contact / general inquiry

### Form connection status

Forms check for `NEXT_PUBLIC_MISSION_PUBLIC_KEY`. If missing:
```
"This public form is designed for Mission OS. Add NEXT_PUBLIC_MISSION_PUBLIC_KEY to enable live submissions."
```
✅ Appropriate demo-mode message — not a blocker.

---

## Scope Assessment

The briefing says:
> "Public form lanes are only 3. Report mismatch with desired 5 lanes. Do not expand unless explicitly approved."

**Action taken:** Documented. No expansion applied.

---

## Form Accessibility

| Check | Status |
|---|---|
| All inputs have labels | ✅ |
| Labels are programmatically associated | ✅ (using `<label>` wrapping `<input>`) |
| Submit button has accessible name | ✅ |
| Error states are announced | ✅ (class-based, no aria-live) |
| Loading state on submit | ✅ "Sending…" text |
| Honeypot field present | ✅ `companyWebsite` honeypot |
| Consent checkbox for program form | ✅ |

**Note:** Error messages use class-based color styling. For screen readers, consider adding `role="alert"` to status messages. Low priority.

---

## Report Only

| Issue | Owner decision needed |
|---|---|
| Only 3 form lanes (Sponsor + Contact missing) | Approve expansion to 5 lanes? |
| Mission OS public key not configured | Add NEXT_PUBLIC_MISSION_PUBLIC_KEY to .env for live submissions |
| No spam protection beyond honeypot | Consider adding a timing check (form submitted < 3s = likely bot) |

---

## Forms on `/es`

The `/es` page uses the same `Asc3ndPublicForms` component as English. Form labels and button text remain in English. 
**Issue:** Form labels are not localized.
**Fix applied:** `Asc3ndPublicForms` not modified — form field labels (Name, Email, Phone, etc.) are hardcoded English.
**Recommendation:** Localize `Asc3ndPublicForms` form text using a prop or context for the `/es` route. Low priority, owner decision.
