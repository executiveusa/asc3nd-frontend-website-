# Verification — Asc3nd Preview Polish

## Static checks (run before browser QA)
- `node --check client-preview/app.js` — must exit 0.
- `rg -n "EN / MX|\.frame|\.preview-image|asc3nd-preview\.vercel\.app|lorem|TODO|placeholder text|href=\"#" client-preview` — must return zero hits (the `placeholder` attribute on inputs is allowed; `placeholder` as filler copy is not).

## Local server (no npm)
```
python -m http.server 4173 --directory "C:\Users\execu\Documents\ASC3ND FRONTEND WEBSITE\client-preview"
```
URLs to open:
- http://localhost:4173/
- http://localhost:4173/blog.html
- http://localhost:4173/merch.html
- http://localhost:4173/llms.txt
- http://localhost:4173/robots.txt
- http://localhost:4173/sitemap.xml

## Interaction matrix
| Check | Expected |
|---|---|
| Nav logo / Home | scroll to #home |
| About / Mission / Programs | anchor scroll |
| Stories | navigate to blog.html |
| Merch | navigate to merch.html |
| Events | modal |
| Volunteer | modal |
| Privacy / Terms | modal |
| Donate (nav, hero, CTA, footer) | https://www.givelively.org/ new tab |
| Language toggle | switches EN/ES, persists across pages |
| Theme toggle | switches light/dark, persists |
| Social icons (5) | exact signup URLs, new tab |
| Contact required validation | inline errors |
| Contact email validation | inline error on bad email |
| Contact success | preview-mode notice + mailto + copy |
| Merch "Request info" | prefills contact + toast |
| Modal close: X / Close / overlay / Escape | all four work |
| Mobile menu open/close | works, closes on nav |
| Reveal-on-scroll | sections fade in |
| Active nav section | updates on scroll |

## Screenshots (capture to client-preview/screenshots/)
Desktop: home, stories, merch, contact, modal-open, dark-mode
Mobile: home, nav-menu, stories, merch, modal-open, footer

## Pass/fail rule
A phase passes only if every static check exits clean AND every interaction in
its matrix behaves as expected. Failures are logged, not papered over.
