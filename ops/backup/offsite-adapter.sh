#!/usr/bin/env bash
# ASC3ND Pluggable Offsite Backup Adapter
set -euo pipefail

DUMP_FILE="${1:-}"
if [[ -z "$DUMP_FILE" || ! -f "$DUMP_FILE" ]]; then
    echo "Usage: $0 <path-to-dump-file>"
    exit 1
fi

SHA_FILE="${DUMP_FILE}.sha256"
LOCAL_SIZE=$(stat -c%s "$DUMP_FILE")
DUMP_NAME=$(basename "$DUMP_FILE")

echo "=== ASC3ND OFFSITE REPLICATION ADAPTER ==="
echo "Artifact: $DUMP_NAME ($LOCAL_SIZE bytes)"

# 1. Cloudflare R2 / S3 Target (Executed ONLY when credentials & bucket are present)
if [[ -n "${R2_BUCKET:-}" && -n "${R2_ACCESS_KEY_ID:-}" && -n "${R2_SECRET_ACCESS_KEY:-}" && -n "${R2_ENDPOINT:-}" ]]; then
    echo "Uploading to Cloudflare R2 bucket: ${R2_BUCKET}..."
    
    if ! command -v aws &>/dev/null; then
        echo "ERROR: aws CLI tool is not installed for R2 upload."
        exit 1
    fi
    
    AWS_ACCESS_KEY_ID="$R2_ACCESS_KEY_ID" \
    AWS_SECRET_ACCESS_KEY="$R2_SECRET_ACCESS_KEY" \
    aws s3 cp "$DUMP_FILE" "s3://${R2_BUCKET}/asc3nd/database/${DUMP_NAME}" \
        --endpoint-url "$R2_ENDPOINT"
        
    AWS_ACCESS_KEY_ID="$R2_ACCESS_KEY_ID" \
    AWS_SECRET_ACCESS_KEY="$R2_SECRET_ACCESS_KEY" \
    aws s3 cp "$SHA_FILE" "s3://${R2_BUCKET}/asc3nd/database/${DUMP_NAME}.sha256" \
        --endpoint-url "$R2_ENDPOINT"

    # Verify remote object existence and size
    REMOTE_SIZE=$(AWS_ACCESS_KEY_ID="$R2_ACCESS_KEY_ID" AWS_SECRET_ACCESS_KEY="$R2_SECRET_ACCESS_KEY" \
        aws s3api head-object --bucket "$R2_BUCKET" --key "asc3nd/database/${DUMP_NAME}" --endpoint-url "$R2_ENDPOINT" \
        --query "ContentLength" --output text 2>/dev/null || echo "0")
        
    if [[ "$REMOTE_SIZE" -ne "$LOCAL_SIZE" ]]; then
        echo "ERROR: Remote R2 verification failed. Remote size ($REMOTE_SIZE) != Local size ($LOCAL_SIZE)"
        exit 1
    fi

    echo "OFFSITE STATUS: R2_REPLICATION_VERIFIED (Remote object verified: $REMOTE_SIZE bytes)"
    exit 0

# 2. Google Drive Target via rclone
elif command -v rclone &>/dev/null && rclone listremotes | grep -q "gdrive:"; then
    echo "Uploading to Google Drive via rclone..."
    rclone copy "$DUMP_FILE" "gdrive:ASC3ND/Backups/Database/$(date +%Y)/$(date +%m)/"
    rclone copy "$SHA_FILE" "gdrive:ASC3ND/Backups/Database/$(date +%Y)/$(date +%m)/"
    
    REMOTE_SIZE=$(rclone size "gdrive:ASC3ND/Backups/Database/$(date +%Y)/$(date +%m)/${DUMP_NAME}" --json 2>/dev/null | jq '.bytes' || echo "0")
    if [[ "$REMOTE_SIZE" -ne "$LOCAL_SIZE" ]]; then
        echo "ERROR: Remote Google Drive verification failed."
        exit 1
    fi
    echo "OFFSITE STATUS: GDRIVE_REPLICATION_VERIFIED"
    exit 0

# 3. Unconfigured / Disabled State
else
    echo "OFFSITE STATUS: NOT ACTIVE"
    exit 0
fi
