# Skill Map + Operating Loop

This file explains how the project skills are used to harden Asc3nd Mission OS.

## 1. ICM skill

Use ICM as the architectural root. Every workflow becomes a numbered folder with a `CONTEXT.md` contract, stable references, working artifacts, and human review gates.

Applied to:

- grant workflows;
- donor follow-up;
- volunteer onboarding;
- campaign creation;
- board reports;
- second-brain ingestion;
- public website personalization;
- founder onboarding;
- system self-improvement.

## 2. AdamsReview skill

Use AdamsReview as the review pattern: multi-lens review, artifact persistence, validation gates, auto-fix loop, walkthrough for uncertain findings, and promotion of validated issues.

Project implementation:

- `scripts/adamsreview-lite.mjs`
- `reviews/adamsreview/artifact.json`
- `docs/ADAMSREVIEW-FINAL.md`

Next improvement: make the review script inspect runtime behavior, not only file presence.

## 3. Design Workflow E2E skill

Use the five-phase design loop:

1. Specification refinement.
2. Design planning.
3. Task decomposition.
4. Iterative design and scoring.
5. Development handoff.

Quality target: every major flow scores at least 8.5/10 on clarity, hierarchy, affordance, accessibility, trust, resilience, and nonprofit relevance.

## 4. Steve Krug usability lens

Use this as the plain-language audit lens:

- do not make staff think;
- one obvious next action;
- labels must be user language;
- remove avoidable choices;
- every error needs a recovery path;
- every empty state should teach the next step.

## 5. Flywheel / ACFS skill

Use ACFS as the VPS deployment and improvement flywheel. The repo must remain deployable through repeatable scripts, handoff files, doctor checks, smoke tests, and upgrade logs.

Required product loop:

```text
inspect → find gap → write test → fix → run gates → update prompt/docs → package → deploy → smoke → log learning
```

## 6. Nonprofit systems skill

Every feature must map to a real nonprofit pain:

- money: grants, donors, sponsors;
- people: volunteers, board, families, partners;
- proof: outcomes, reports, stories, compliance;
- time: calls, messages, follow-ups, tasks;
- trust: approvals, audit logs, safety policies;
- memory: founder brain, org brain, decision history.

## 7. Rust boundary skill

Use Rust for the parts where mistakes are expensive:

- public bridge validation;
- tenant isolation;
- idempotency;
- audit writing;
- ICM path validation;
- outbox worker;
- policy classification;
- webhook verification.

Do not use Rust for fast-moving copy or layout.
