# Asc3nd Client Preview

This folder is a standalone static recovery preview for Asc3nd Collective.

What it is:
- A flyer-faithful HTML/CSS/JS preview.
- Based on the black/gold Asc3nd reference image and logo.
- Bilingual English / Mexican Spanish.
- Working modals, smooth scroll, mobile nav, blog cards, store cards, and contact validation.

What is real:
- Static page structure.
- Donate links to GiveLively.
- Social links to signup URLs.
- Local contact validation.
- Mailto draft generation.
- Copyable contact summary.
- AI-readable `llms.txt`.

What is simulated:
- Contact submission.
- Newsletter signup.
- Merch checkout.
- Printify integration.
- Live event calendar.
- Production legal/privacy review.

How to view locally:
- From the parent folder, run:
  `python -m http.server 4173 --directory client-preview`
- Open:
  `http://localhost:4173/`

Deploy target:
- Vercel static deployment from `client-preview/`.
- Do not use `--prod` unless production deployment is explicitly approved.

Next phase after visual approval:
- Generate real merch/product mockup images.
- Reconcile this approved static preview into the real Next app.
- Wire real contact backend and commerce integration.
- Run final accessibility, legal, metadata, and deployment QA.
