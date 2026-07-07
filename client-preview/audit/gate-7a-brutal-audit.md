# ASC3ND Gate 7A Brutal Visual Audit

Gate: 7A
Phase: Audit-only evidence pass plus Gate 7B safety setup
URL inspected: https://client-preview-nine.vercel.app/
Viewports tested: 390, 768, 1024, 1440, 1920
Captured at: 2026-07-06T21:24:06.839Z
Local folder: C:\Users\execu\Documents\ASC3ND FRONTEND WEBSITE\client-preview
Branch: codex/asc3nd-preview-polish
Remote: none configured

## Skills Read

- `jcodemunch_guide` v1.108.77: read and followed; indexing blocked by trusted folders.
- JDocMunch: attempted mapping; no matching docs index for this project.
- Browser plugin: documentation read; in-app Browser opened the Vercel URL and captured a screenshot, but DOM snapshot failed with `incrementalAriaSnapshot is not a function`.
- Local design references sampled: `website-design-skills.md`, `interactive-artifact-skill.md`, `skills-library-categorized-report.md`, `design-ui-ux-main`, Steve Krug EPUB path resolved. Steve Krug is used as principle guidance only, with no book text copied.

## Repos Classified

| Repo or source | Classification | Reason |
|---|---|---|
| Current `client-preview/` | Direct | Active static preview scope. |
| `MASTER SKILLS BUNDLE` local files | Direct | Required design and audit constraints. |
| `design-ui-ux-main` local copy | Conceptual | Reference library only; not copied into preview. |
| `greensock/GSAP` | Deferred | Motion candidate for Gate 7H only if CSS is insufficient. |
| `ytx-readings/design-ui-ux` | Conceptual | UX/design reference only. |
| `executiveusa/pauli-Uncodixfy` | Conceptual | Process/taste reference; no code imported. |
| `executiveusa/pauli-taste-skill` | Conceptual | Taste/evaluation reference; no code imported. |
| `ihlamury/design-skills` | Conceptual | Design reference; no code imported. |
| OpenSpec / Beads / Atomic | Conceptual | Used as safety workflow shape, not dependency code. |

## Screenshot Folder

`client-preview/audit/screenshots/gate-7a/`

Screenshots captured: 22

- Full-page and viewport captures for 390, 768, 1024, 1440, 1920.
- Desktop section captures for hero, nav, mission/programs, stories, store, contact, footer.
- Desktop modal captures for events, volunteer, privacy, terms.
- Theme-toggled desktop capture.

## Screenshot-Wrapper Regression

| Check | Result |
|---|---|
| `.frame` in deployed DOM | 0 found |
| `.preview-image` in deployed DOM | 0 found |
| Hero visible at all tested widths | Pass |
| Header/nav visible at all tested widths | Pass |
| Full-page structure present | Pass: hero, pillars, mission, programs, blog, store, get-involved, contact |

Screenshot-wrapper detected: no
Full-page structure present: yes

## Functional Audit

| Area | Element | Expected | Actual | Pass/fail |
|---|---|---|---|---|
| Top nav | Home | Hero/top | `#home` present | Pass |
| Top nav | About / Mission | Mission | `#mission` present | Pass |
| Top nav | Programs | Programs | `#programs` present | Pass |
| Top nav | Stories | Stories page | `./blog.html` 200 | Pass |
| Top nav | Merch | Merch page | `./merch.html` 200 | Pass |
| Top nav | Contact | Contact | `#contact` present | Pass |
| CTA | Donate | GiveLively | `https://www.givelively.org/` | Pass |
| Footer | AI-readable | `/llms.txt` | 200, no local paths/secrets | Pass |
| Metadata | robots | `/robots.txt` | 200, no local paths/secrets | Pass |
| Metadata | sitemap | `/sitemap.xml` | 200, no local paths/secrets | Pass with note |
| Social | Instagram | Signup link | configured | Pass |
| Social | Facebook | Signup link | configured | Pass |
| Social | X | Signup link | configured | Pass |
| Social | TikTok | Signup link | configured | Pass |
| Social | LinkedIn | Signup link | configured | Pass |
| Modals | Events | Open/close X | Opens, closes, focus returns | Pass |
| Modals | Volunteer | Open/close button | Opens, closes, focus returns | Pass |
| Modals | Privacy | Open/Escape | Opens, closes, focus returns | Pass |
| Modals | Terms | Open/overlay | Opens, closes, focus returns | Pass |
| Language | EN/ES | `es-MX` copy | `lang` changes to `es-MX` | Pass |
| Theme | Light/dark | Toggle theme | `data-theme` changed light to dark | Pass |
| Contact | Required validation | Blocks empty form | Invalid fields reported | Pass |
| Contact | Email validation | Blocks bad email | Email invalid reported | Pass |
| Contact | Success state | Preview only | Shows not-sent preview summary | Pass |
| Contact | Mailto | Draft generated | `mailto:` generated | Pass |
| Contact | Copy summary | Clipboard feedback | Toast says summary copied | Pass |

Note: sitemap and robots point to `asc3nd-frontend-website.vercel.app`, not `client-preview-nine.vercel.app`; acceptable for preview, but should be corrected before final production handoff.

## Steve Krug Law-By-Law Audit

| Law | Current finding | Violation | Fix direction | Priority |
|---|---|---|---|---|
| Do not make users think | Mission and Donate are clear; Stories/Merch are understandable. | Some nav labels duplicate About/Mission and create extra cognition. | Consolidate or differentiate labels. | P1 |
| Make the page self-evident | Hero answers what this is and who it serves. | Contact/offer path is less obvious than Donate. | Add a sharper approval/next-step offer block later. | P1 |
| Obvious visual hierarchy | Hero has strong hierarchy. | Lower sections flatten into similar card grids. | Increase section contrast and pacing. | P1 |
| Clickable things obvious | Buttons are clear; social icons have aria labels. | Some footer buttons look similar to links. | Normalize button/link treatment. | P2 |
| Remove visual noise | Flyer identity is strong. | Repeated icons, dense nav, and heavy all-caps reduce scanning. | Reduce repeated decoration and tighten rhythm. | P1 |
| Use conventions | Sticky header, donate CTA, footer links work. | Events is only in footer, not top nav. | Add or clarify Events path if it matters. | P2 |
| Make scanning easy | Section headings and cards scan. | Blog cards are text-heavy for homepage. | Shorten teaser density visually, not copy yet. | P1 |
| Next action obvious | Donate and Volunteer are visible. | Approval/client offer action is missing. | Gate 7F offer artifact. | P1 |
| Forms short and clear | Contact form is short and honest. | Error feedback relies mostly on native validation. | Add visible inline errors in later gate. | P2 |
| Mobile effortless | Mobile loads and hero/nav are present. | Large hero typography still demands careful viewport polish. | Audit mobile screenshots before visual gate. | P1 |
| Trust cues visible | EIN and preview honesty exist in content. | Trust cues are not prominent enough above the fold. | Surface nonprofit status and preview honesty more elegantly. | P1 |
| Avoid needless words | Most copy is direct. | Story excerpts and status notes create density. | Improve visual compression before rewriting copy. | P2 |
| Recover gracefully | Modals and contact preview avoid dead ends. | Subscribe is preview-like but less documented in audit evidence. | Clarify subscribe behavior or modalize. | P2 |
| Home explains whole site | Home includes mission, programs, stories, merch, contact. | Store/blog teasers compete with core nonprofit story. | Rebalance section pacing. | P1 |
| Do not bury primary task | Donate is visible in nav and hero. | Volunteer/contact path is secondary but important. | Keep Donate primary; make Volunteer next-best clear. | P1 |

## Awwwards / Webflow Visual Audit

| Area | Score | Finding | Required fix |
|---|---:|---|---|
| Art direction | 7.0 | Flyer identity survives and feels distinct. | Sharpen from recovered preview to intentional campaign system. |
| Hero composition | 7.5 | Strong type/photo/CTA first impression. | Tune mobile and wide framing; avoid over-darkening faces. |
| Logo usage | 8.0 | Logo visible top-left and brand anchor works. | Ensure spacing remains premium at all breakpoints. |
| Color palette | 7.0 | Black/gold/white is on-brand. | Light mode needs more warmth and less default white feel. |
| Typography | 7.0 | Condensed headline has energy. | Reduce all-caps fatigue in body/card areas. |
| Spacing rhythm | 6.5 | Sections are functional but visually even. | Add stronger pacing and breathing room. |
| Section pacing | 6.5 | Everything is present. | Create better peaks/valleys between mission, programs, stories, merch. |
| Card design | 6.5 | Cards work but feel templated. | Redesign card proportions, imagery, and hierarchy. |
| Image system | 5.5 | Hero uses youth image; product cards are generic image treatments. | Build coherent image family and real merch placeholders later. |
| Motion readiness | 7.0 | Reveal/theme/nav motion exists with reduced-motion support. | Keep motion subtle; consider CSS before GSAP. |
| Footer design | 6.5 | Complete and functional. | Improve hierarchy and reduce utility clutter. |
| CTA hierarchy | 7.5 | Donate is obvious. | Make Volunteer/Contact second path clearer. |
| Mobile composition | 6.5 | Works, but needs visual polish proof beyond pass/fail. | Gate 7C mobile hero/nav and Gate 7E cards. |
| Store quality | 6.0 | Seven-product concept exists. | Product visuals must become more credible and less placeholder. |
| Blog/story quality | 6.5 | Editorial archive is real and honest. | Improve visual trust engine feeling; reduce wall-of-text energy. |
| Nonprofit credibility | 7.0 | Preview honesty, EIN, and no fake backend are good. | Promote trust cues earlier and more elegantly. |
| Accessibility | 7.0 | Skip link, focus trap, aria labels, reduced motion exist. | Add stronger inline form errors and verify contrast after polish. |
| Light/dark readiness | 6.5 | Toggle works. | Light theme needs brand-grade paper/photo treatment. |

Scores below 7 are blockers for visual implementation acceptance.

## Image System Audit

| Image use | Current state | Needed image | Priority |
|---|---|---|---|
| Hero youth group | Present and brand-aligned | Keep, but tune crop/contrast | P1 |
| Mentorship / coaching | Not distinct | Real or generated same-family mentorship scene | P1 |
| Education / learning | Not distinct | Same-family tutoring/learning image | P1 |
| Sports / leadership | Not distinct | Same-family sports/team leadership image | P2 |
| Community / family | Not distinct | Same-family family/community support image | P1 |
| Merchandise lifestyle | Placeholder treatment | Branded lifestyle product image | P1 |
| Store products | CSS/photo treatment only | Product mockups for seven merch items | P1 |

Image law: no fake testimonials, no unrelated stock feel, no exploitative youth imagery, no repeated exact image use as a substitute for a system.

## Motion Audit

| Motion candidate | Need | Library | Risk | Priority |
|---|---|---|---|---|
| Sticky nav state | Useful | CSS/vanilla | Low | P2 |
| Smooth scroll | Useful | CSS/vanilla | Low | P2 |
| Section reveal | Present | CSS/vanilla | Medium if overused | P2 |
| CTA hover/tap | Useful | CSS/vanilla | Low | P1 |
| Card hover lift | Useful | CSS/vanilla | Low | P2 |
| Modal transition | Present | CSS/vanilla | Low | P2 |
| Hero image rotation | Optional | CSS or GSAP | Medium; must not hide CTA | P2 |
| Language toggle state | Useful | CSS/vanilla | Low | P2 |
| Contact feedback | Useful | CSS/vanilla | Low | P1 |

GSAP classification: deferred until Gate 7H; current needs can be met with CSS/vanilla unless hero image sequencing becomes more complex.

## Light/Dark Audit

| Theme | Current state | Required fix | Priority |
|---|---|---|---|
| Dark | Strong black/gold campaign look | Preserve; improve lower-section polish | P1 |
| Light | Works and toggles | Make it warm paper/black/gold, not bland white | P1 |
| Toggle | Functional | Make obvious without stealing Donate attention | P2 |

## Store Audit

| Product | Present | Design quality | CTA | Issue |
|---|---|---:|---|---|
| Asc3nd Signature T-shirt | Yes | 6 | Request merch info | Needs product mockup |
| Asc3nd Crown Hat | Yes | 6 | Request merch info | Needs product mockup |
| Asc3nd Community Hoodie | Yes | 6 | Request merch info | Needs product mockup |
| Asc3nd Everyday Tote | Yes | 6 | Request merch info | Needs product mockup |
| Asc3nd Sticker Pack | Yes | 6 | Request merch info | Needs product mockup |
| Asc3nd Wall Print | Yes | 6 | Sponsor merch launch | Needs credible preview art |
| Asc3nd Camp Mug or Water Bottle | Yes | 6 | Request merch info | Needs product mockup |

Store rule: no fake checkout, no fake Printify claim. Current preview honors that.

## Blog / Stories Audit

| Requirement | Current state | Pass/fail | Fix |
|---|---|---|---|
| 8 seeded posts | Present | Pass | Keep content, improve card design. |
| Category labels | Present | Pass | Keep. |
| Dates | Present | Pass | Keep as editorial previews. |
| Excerpts | Present | Pass | Improve visual density. |
| Status labels | Present | Pass | Style with less clutter. |
| Source notes | Present | Pass | Keep honest source note. |
| English/Spanish parity | Present in app data | Pass | Re-test after visual gates. |
| No fake grant deadlines | No hard fake deadlines found | Pass | Continue. |
| No fake partnerships | No fake partnership claims found | Pass | Continue. |

## Offer Artifact Recommendation

Recommended artifact type: compact interactive approval card in Gate 7F.

Content sections:
- What Asc3nd gets now: static flyer-faithful preview, donation path, stories, merch concept, bilingual UI.
- What comes after approval: real email workflow, real merch engine, final legal/privacy review, production metadata.
- Donation path: GiveLively remains primary.
- Merch engine: concept now, Printify/server adapter later.
- Blog engine: seeded editorial now, CMS/backend later.
- Contact workflow: preview validation now, live intake later.
- AI-readable site: current `llms.txt`, robots, sitemap.
- Implementation phases: Gates 7B-7J.
- Down-payment trigger: begin production wiring only after approval.
- Clear next step: Donate / Contact Asc3nd / Approve next phase.

Preview-mode items: contact send, checkout, Printify, subscribe, production legal pages.
Live after payment/approval: backend/email workflow, real product images, production privacy/terms, final deployment path.

## Accessibility Audit

- Pass: skip link, semantic sections, dialog role, modal focus trap, Escape close, aria labels on social icons, reduced-motion CSS, native required/email validation.
- Needs work: inline validation messages, contrast re-check after visual polish, social icon visible text could be improved for non-visual fallback, mobile modal fit should be re-tested after every gate.

## Link/Button Failures

- No broken required links found in deployed proof.
- Sitemap/robots point to `asc3nd-frontend-website.vercel.app` instead of inspected `client-preview-nine.vercel.app`; fix before production.
- In-app Browser DOM snapshot failed, though Browser title/screenshot proof succeeded.

## Copy-Change Risk

High. Copy is already legally cautious about preview mode, no fake backend, no fake checkout, and no fake partnerships. Do not rewrite copy in visual gates unless a specific audit item requires wording clarity.

## Design Violations

- Lower sections feel like recovered functional grids, not final art direction.
- Store visuals are placeholders.
- Blog/story cards are credible but dense.
- Light theme is functional, not yet brand-grade.
- Trust cues exist but are too quiet.

## P0 Fixes

- None for screenshot-wrapper regression: `.frame` and `.preview-image` are absent.
- Process P0: do not claim Browser DOM QA until Browser snapshot error is repaired or a supported Browser method replaces it.

## P1 Fixes

- Hero/nav polish at desktop and mobile.
- Store product card visual upgrade.
- Blog/story card trust-engine polish.
- Light theme brand polish.
- Trust/offer artifact.
- Section pacing and card hierarchy.

## P2 Fixes

- Footer hierarchy cleanup.
- Subscribe behavior clarification.
- Inline form error polish.
- Optional GSAP/hero image motion exploration.

## OpenSpec Plan

- `client-preview/openspec/changes/gate-7-polish/proposal.md`
- `client-preview/openspec/changes/gate-7-polish/design.md`
- `client-preview/openspec/changes/gate-7-polish/tasks.md`
- `client-preview/openspec/changes/gate-7-polish/acceptance.md`

## Beads Plan

- `client-preview/beads/checkpoints/0014-gate-7-visual-audit.md`
- `client-preview/beads/checkpoints/0015-gate-7-rollback-proof.md`
- `client-preview/beads/checkpoints/0016-gate-7-polish-plan.md`
- `client-preview/beads/checkpoints/0017-gate-7-link-audit.md`
- `client-preview/beads/checkpoints/0018-gate-7-visual-approval.md`

## Atomic Rollback Plan

- Rollback folder: `client-preview/rollback/2026-07-06-1527-before-gate-7-polish/`
- Required files present: `index.html`, `styles.css`, `app.js`, `llms.txt`, `robots.txt`, `sitemap.xml`, `vercel.json`, `README-CLIENT-PREVIEW.md`, `BLOCKERS-FOR-LATER.md`
- Atomic log: `client-preview/rollback/atomic-log.md`

## Strict Implementation Gates

| Gate | Scope | Status |
|---|---|---|
| 7A | Brutal audit only | Complete |
| 7B | OpenSpec / Beads / rollback only | Complete |
| 7C | Hero and nav polish only | Not started |
| 7D | Program card design only | Not started |
| 7E | Blog/store card design only | Not started |
| 7F | Contact/offer artifact only | Not started |
| 7G | Light/dark mode only | Not started |
| 7H | Motion only | Not started |
| 7I | Final link QA and screenshots only | Not started |
| 7J | Deploy preview after approval only | Blocked pending approval |

Ready for Gate 7B setup? yes, completed
Ready for visual implementation? no
