#!/usr/bin/env bash
# ASC3ND Canonical Automated PostgreSQL Backup Script
set -euo pipefail

ENV_FILE="/opt/asc3nd-backup.env"
if [[ -f "$ENV_FILE" ]]; then
    # shellcheck disable=SC1090
    source "$ENV_FILE"
fi

BACKUP_DIR="/opt/backups/asc3nd/database"
mkdir -p "$BACKUP_DIR"

TIMESTAMP=$(date -u +%Y%m%d-%H%M%S)
DUMP_FILE="${BACKUP_DIR}/asc3nd-community-cuts-${TIMESTAMP}.dump"
SHA_FILE="${DUMP_FILE}.sha256"
HISTORY_FILE="${BACKUP_DIR}/backup-history.jsonl"

echo "=== ASC3ND AUTOMATED NATIVE POSTGRESQL BACKUP ==="
echo "Timestamp: ${TIMESTAMP}"
echo "Target Host: ${PGHOST:-db.sxkemnqvxlgewrjplcag.supabase.co}"

# 1. Run native PostgreSQL 17 pg_dump -Fc
STARTED=$(date +%s)
PGPASSWORD="${PGPASSWORD}" pg_dump \
    -h "${PGHOST:-db.sxkemnqvxlgewrjplcag.supabase.co}" \
    -p "${PGPORT:-5432}" \
    -U "${PGUSER:-postgres}" \
    -d "${PGDATABASE:-postgres}" \
    -Fc \
    -f "$DUMP_FILE"

ELAPSED=$(( $(date +%s) - STARTED ))
chmod 600 "$DUMP_FILE"

# 2. Generate SHA-256 Checksum
SHA256=$(sha256sum "$DUMP_FILE" | awk '{print $1}')
(cd "$BACKUP_DIR" && echo "$SHA256  $(basename "$DUMP_FILE")" > "$SHA_FILE")
chmod 600 "$SHA_FILE"

# 3. Verify Archive with pg_restore --list
TOC_ENTRIES=$(pg_restore --list "$DUMP_FILE" | wc -l)
if [[ "$TOC_ENTRIES" -lt 50 ]]; then
    echo "ERROR: Backup TOC verification failed (entries: ${TOC_ENTRIES})"
    exit 1
fi

SIZE_BYTES=$(stat -c%s "$DUMP_FILE")
if [[ "$SIZE_BYTES" -le 1000 ]]; then
    echo "ERROR: Backup size too small (${SIZE_BYTES} bytes)"
    exit 1
fi

echo "Backup verified: ${SIZE_BYTES} bytes, SHA-256: ${SHA256}, TOC entries: ${TOC_ENTRIES} (Elapsed: ${ELAPSED}s)"

# 4. Log to history
RECORD=$(jq -n \
    --arg ts "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
    --arg file "$(basename "$DUMP_FILE")" \
    --arg sha "$SHA256" \
    --arg size "$SIZE_BYTES" \
    --arg toc "$TOC_ENTRIES" \
    --arg elapsed "$ELAPSED" \
    '{timestamp: $ts, file: $file, sha256: $sha, size_bytes: ($size|tonumber), toc_entries: ($toc|tonumber), elapsed_seconds: ($elapsed|tonumber), status: "VERIFIED"}')
echo "$RECORD" >> "$HISTORY_FILE"

# 5. Execute True 7-Daily / 4-Weekly / 3-Monthly Retention Engine
node /opt/asc3nd-staging-preflight/ops/backup/retention-prune.mjs "$BACKUP_DIR" --apply

# 6. Execute Pluggable Offsite Adapter
/opt/asc3nd-staging-preflight/ops/backup/offsite-adapter.sh "$DUMP_FILE" || true

echo "=== BACKUP CYCLE COMPLETE ==="
