#!/usr/bin/env bash
# ASC3ND Backup Integrity & Source Verification Tool
set -euo pipefail

BACKUP_DIR="/opt/backups/asc3nd/database"
LATEST_DUMP=$(ls -1t "${BACKUP_DIR}"/asc3nd-community-cuts-*.dump | head -n1)

if [[ -z "$LATEST_DUMP" || ! -f "$LATEST_DUMP" ]]; then
    echo "ERROR: No dump file found in $BACKUP_DIR"
    exit 1
fi

echo "=== VERIFYING LATEST BACKUP ==="
echo "File: $LATEST_DUMP"
echo "Size: $(stat -c%s "$LATEST_DUMP") bytes"

SHA_FILE="${LATEST_DUMP}.sha256"
if [[ -f "$SHA_FILE" ]]; then
    echo "Checksum Verification:"
    (cd "$BACKUP_DIR" && sha256sum -c "$SHA_FILE")
fi

echo "TOC Verification:"
pg_restore --list "$LATEST_DUMP" | head -n 10
echo "TOC Total Entries: $(pg_restore --list "$LATEST_DUMP" | wc -l)"
