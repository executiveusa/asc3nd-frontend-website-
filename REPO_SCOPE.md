# ASC3ND Repository Scope Law

**Repository:** `executiveusa/asc3nd-frontend-website-`

## Sole purpose

This repository owns the production ASC3ND public web experience:

- the evergreen ASC3ND public website;
- the Community Cuts for Kids event application;
- public, server-side API boundaries required by those frontends;
- frontend tests, accessibility, localization, performance, and deployment configuration.

## Explicitly out of scope

Do not add or promote any of the following here:

- canonical client interview answers, contract records, or strategy-workbook state;
- master logo, QR, print, or social-template source files;
- reusable cross-client agent runtimes, ICM workflows, Postiz orchestration, or nonprofit operating-system code;
- experimental redesigns or side-by-side demonstrations;
- a second RSVP database or competing production event application;
- raw interview video, transcripts, Descript projects, or publishing calendars.

## Required routing

When a requested change is outside this repository, stop before editing and route it:

| Work type | Correct repository |
|---|---|
| Client answers, paid scope, strategy workbook | `executiveusa/asce3nd-interactive-document` |
| Brand masters, QR, campaign templates | `executiveusa/asc3nd-brand-kit-` |
| Reusable agents, approvals, Postiz and operations | `executiveusa/ascend-social-purpose-agentic-systems-` |
| Design experiments and before/after concepts | `executiveusa/ascend-demonstration-page` |
| Legacy event implementations | audit, port unique value here, then archive the duplicate |

Agent response when routing:

```text
REPOSITORY_BOUNDARY_STOP
Requested work: <summary>
Current repository: executiveusa/asc3nd-frontend-website-
Reason it does not belong here: <reason>
Correct destination: <repository>
Safe next action: create a scoped issue/PR in the destination repository; do not copy unrelated code here.
```

## Non-spillover laws

1. One repository has one authoritative purpose.
2. Never duplicate canonical records to make a feature easier.
3. Cross-repository integration must use a documented API, schema, package, or artifact manifest.
4. Never silently copy secrets, databases, client records, build configuration, or deployment IDs between repositories.
5. Experimental code cannot become production code without an explicit port and review.
6. A repository name containing ASC3ND is not proof that it owns the requested behavior.
7. Every agent must read `repo-boundary.json` and run `npm run guard:repo` before build or deployment work.

## Production authority

The root Vercel configuration currently owns the Community Cuts event build. The evergreen site and event app must never be deployed interchangeably. Deployment is permitted only when all checks in `deployment-lock.json` pass.
