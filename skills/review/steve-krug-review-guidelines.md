# Steve Krug Review Guidelines

## For use when reviewing pages in this repo

Steve Krug's core usability law: **don't make users think**.

## The seven questions (per page)

1. **5-second test** — What is this page? Who is it for? What's the next thing I should do?
2. **Primary user** — Who is the most important visitor and what are they trying to accomplish?
3. **Primary action** — What is the one thing the page most wants the user to do?
4. **What is clear** — What works without explanation?
5. **What is confusing** — What requires the user to pause and figure out?
6. **Navigation friction** — How many clicks/options before the user can act?
7. **Error recovery** — If the user makes a mistake, can they recover?

## Red flags

- More than 3 choices at any decision point
- Labels that require users to think about system terminology
- Empty states that don't teach the next step
- CTAs that all look equally important (especially Donate vs. Volunteer vs. Subscribe)
- Form fields with no explanation of why they're needed
- Pages that require reading before acting

## Nonprofit-specific checks

- Outcome language (not tool names)
- Scannable — nonprofit staff are exhausted
- Clear path for each audience: donor, volunteer, family, partner
- No staff/admin terminology visible on public pages

## Format for review reports

```markdown
## Route: /example

- 5-second test: [what a first-time visitor understands in 5 seconds]
- Primary user: [persona]
- Primary action: [the one key CTA]
- Clear: [what works]
- Confusing: [what needs fixing]
- Friction: [nav/label/choice issues]
- Recovery: [can user undo mistakes?]
- Recommended fix: [concrete, specific]
- In-scope to fix now? yes/no
```
