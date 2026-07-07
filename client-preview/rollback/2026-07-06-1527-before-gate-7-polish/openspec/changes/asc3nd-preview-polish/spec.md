# Spec — Asc3nd Preview Polish

## Acceptance scenarios

### Brand & identity
- Every viewport, within 5 seconds, communicates: Asc3nd Collective, youth
  nonprofit, Pacific Northwest, donate path visible.
- Black/gold/white + Barlow Condensed tokens are the only palette. No generic
  gradients, glass cards, or template accents introduced.
- "ASC3ND COLLECTIVE" wordmark (gold `3`) appears in nav and footer.
- Hero line "Empowering youth. Elevating futures. Building community." present.

### Navigation
- Top nav: Home, About, Mission, Programs, Stories, Merch, Contact, Donate.
- Stories and Merch navigate to `blog.html` and `merch.html` respectively.
- Mobile menu mirrors the same set and closes on navigation.
- Sticky header gains a scrolled state; active section is highlighted.

### Language toggle
- Visible flag toggle: 🇺🇸 EN / 🇲🇽 ES. Never the label "MX".
- Persisted across pages via localStorage. Choice is honored on load.
- Translated: nav, hero, mission, programs, blog labels, store labels, contact,
  modals, footer. "Asc3nd Collective" never translated.

### Theme toggle
- Light default; dark premium (not gloomy). Persisted via localStorage.
- Both themes meet WCAG AA contrast on body text and CTAs.

### Modals
- Events, Volunteer, Privacy, Terms open modal dialogs (no route navigation).
- Each closes via X button, Close button, overlay click, and Escape.
- Focus is trapped and restored to the trigger on close.

### Stories page (blog.html)
- Real static posts backdated across the previous 30 days from build date.
- Topics drawn from: youth mentorship in Washington, education support,
  leadership development, volunteer coordination, donor trust and public
  storytelling, grant readiness for small nonprofits, AI tools for nonprofit
  operations, community sports and leadership, Pacific Northwest sponsorship.
- Each post: title, date, category, excerpt, status label, source note.
- No fake grant deadlines, awards, partnerships, statistics, or copied text.

### Merch page (merch.html)
- Seven product cards: Signature T-shirt, Crown Hat, Community Hoodie,
  Everyday Tote, Sticker Pack, Wall Print, Camp Mug / Water Bottle.
- No fake checkout, inventory, or Printify claim. "Commerce engine planned"
  note explains the honest preview state.
- Each product action opens a contact intent or coming-soon modal.

### Contact (preview mode)
- Validates name, valid email, interest type, message. Field errors inline.
- On success: shows preview-mode notice (not sent), mailto draft, copy summary.
- No backend, no fake submission.

### Donate & social
- Every Donate CTA → https://www.givelively.org/
- Social (5): IG, FB, X, TikTok, LinkedIn → exact signup URLs, SVG icons.

### Motion & accessibility
- Smooth scroll, sticky state, reveal-on-scroll, scroll progress bar.
- `prefers-reduced-motion` disables non-essential motion.
- Keyboard-reachable; visible focus states; semantic landmarks.

### Honesty rules (invariants)
- No dead links. No `href="#"`. No "lorem", "TODO", "placeholder" copy.
- No "MX" language label. No `asc3nd-preview.vercel.app` placeholder URL.
- Copyright year is 2026. EIN 99-1881891 present.
