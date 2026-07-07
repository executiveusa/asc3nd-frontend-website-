# Rollback — Asc3nd Preview Polish

## Baseline (good known state)
- Commit: `a0b2b843e6b227714d9a8a5ce6651727656cd041`
- Branch when committed: `master`
- Working tree snapshot: `client-preview__BASELINE_20260705-224557/`

## Restore command (full rollback to baseline)
```
cd "C:\Users\execu\Documents\ASC3ND FRONTEND WEBSITE"
git checkout master
git reset --hard a0b2b843e6b227714d9a8a5ce6651727656cd041
```

## Per-phase rollback (preferred when only one phase is bad)
Each phase ends with its own commit. To revert a single phase:
```
git log --oneline
git revert <bad-phase-commit>
```

## File-level restore (if a single file is corrupted)
The baseline snapshot directory mirrors the file layout. Copy a known-good
file back:
```
cp "client-preview__BASELINE_20260705-224557/<file>" "client-preview/<file>"
```

## Files this change is allowed to modify
- `client-preview/index.html`
- `client-preview/blog.html` (new)
- `client-preview/merch.html` (new)
- `client-preview/styles.css`
- `client-preview/app.js`
- `client-preview/llms.txt`
- `client-preview/robots.txt`
- `client-preview/sitemap.xml`
- `client-preview/screenshots/*`
- `client-preview/README-CLIENT-PREVIEW.md`
- `client-preview/BLOCKERS-FOR-LATER.md`

Anything outside `client-preview/` is out of scope and should not be touched.
