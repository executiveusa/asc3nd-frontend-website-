#!/usr/bin/env bash
# ASC3ND Disaster Recovery Database Restore Helper
# SAFETY GUARD: Requires explicit --confirm-restore flag and prevents accidental production drops.
set -euo pipefail

if [[ "${1:-}" != "--confirm-restore" ]]; then
    echo "SAFETY GUARD: To restore database, execute with explicit flag: $0 --confirm-restore <path-to-dump>"
    exit 1
fi

DUMP_FILE="${2:-}"
if [[ -z "$DUMP_FILE" || ! -f "$DUMP_FILE" ]]; then
    echo "ERROR: Valid dump file path required."
    exit 1
fi

echo "=== EXECUTING DATABASE RESTORE ==="
echo "Target Archive: $DUMP_FILE"

PGPASSWORD="${PGPASSWORD}" pg_restore \
    -h "${PGHOST}" \
    -p "${PGPORT:-5432}" \
    -U "${PGUSER:-postgres}" \
    -d "${PGDATABASE:-postgres}" \
    --clean --if-exists \
    "$DUMP_FILE"

echo "Restore completed successfully."
