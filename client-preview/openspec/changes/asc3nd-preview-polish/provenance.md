# Provenance — Asc3nd Preview Polish

Atomic-style audit trail. One row per phase. Updated as phases complete.

| Field | Value |
|---|---|
| Goal | Polish static Asc3nd preview to flyer-faithful, client-ready state without redesign. |
| Model | GLM 5.2 (builtin:zai/GLM-5.2) |
| Workspace | `C:\Users\execu\Documents\ASC3ND FRONTEND WEBSITE` |
| Baseline commit | `a0b2b843e6b227714d9a8a5ce6651727656cd041` |
| Branch | `codex/asc3nd-preview-polish` |
| Rollback snapshot | `client-preview__BASELINE_20260705-224557/` |

## Phase log

### Phase 0 — Baseline & rollback
- Exploration: read current index.html, app.js (694 lines), styles.css (1435
  lines), logo + flyer images; scanned Master Skills Bundle; verified Vercel
  CLI authed, Node 24, Python 3.11, Git 2.53; confirmed jcodemunch NOT
  reachable in this runtime (raised to human, cleared to proceed without).
- Commitment: baseline commit, branch, snapshot, OpenSpec artifacts.
- Verification: `git rev-parse HEAD` matches; `node --check` clean; banned-
  token scan clean.
- Patch summary: added `.gitignore`, committed full tree, created branch +
  snapshot + 6 OpenSpec files.
- Rollback: `git reset --hard a0b2b843e6b227714d9a8a5ce6651727656cd041`.
- Unresolved risks: none for this phase.
