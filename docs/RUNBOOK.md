# Operations Runbook

Current version: **v0.7 Frontend Landing**.

## Daily

- Review approval queue.
- Review opportunity changes.
- Log outcomes.
- Check campaign drafts.
- Monitor public site uptime (Vercel dashboard) and public bridge submissions.

## Weekly

- Generate board/program update.
- Refresh Seattle opportunity watch.
- Export audit log.
- Review repeated edits and update ICM source files.
- Review public site analytics (traffic, form submissions, conversion paths).

## Monthly

- Backup `mission-data` and `icm`.
- Patch VPS packages.
- Run tests and smoke test.
- Review model spend.
- Rotate any exposed secrets if `.env` was ever committed or leaked.
- Update public site copy, program proof, and outcome numbers.
- Review Rust service health (once wired into production).
