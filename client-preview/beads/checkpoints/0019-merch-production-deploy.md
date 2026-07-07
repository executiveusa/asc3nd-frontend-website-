# Bead 0019 - Merch Production Deploy

Date: 2026-07-06
Branch: main
Local rollback commit: 544f210 Merge Asc3nd preview polish
Previous known production: https://client-preview-etlmeuas6-the-pauli-effect.vercel.app

Scope:
- Deploy the latest static preview with official watermarked merch assets.
- Preserve incoming future product photos for a later card-image replacement pass.
- Verify the public Vercel merch route after deployment before claiming success.

Rollback:
- If the production deploy fails visual verification, promote the previous known production deployment or revert to commit 544f210's parent before redeploying.
