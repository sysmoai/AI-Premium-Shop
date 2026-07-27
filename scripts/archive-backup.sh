#!/usr/bin/env bash
# Create full local backups (git bundle + working-tree tar.gz) of the
# secondary AIPS repos before archiving them on GitHub.
# Usage: ./scripts/archive-backup.sh [output-dir]
set -euo pipefail

OUT="${1:-./repo-backups-$(date +%Y%m%d)}"
mkdir -p "$OUT"

REPOS=(
  "sysmoai/aips-website"
  "sysmoai/aipremiumshop-frontend"
  "sysmoai/Aipswebsitev2"
)

for slug in "${REPOS[@]}"; do
  name="${slug#*/}"
  tmp="$OUT/$name.git"
  echo "==> $slug"
  git clone --mirror "https://github.com/$slug.git" "$tmp"
  # Bundle preserves ALL branches, tags, and history in one restorable file.
  git -C "$tmp" bundle create "$OUT/$name.bundle" --all
  git clone "$OUT/$name.bundle" "$OUT/$name-worktree" >/dev/null 2>&1
  tar -czf "$OUT/$name.tar.gz" -C "$OUT" "$name-worktree"
  rm -rf "$tmp" "$OUT/$name-worktree"
  echo "    -> $OUT/$name.bundle (full history), $OUT/$name.tar.gz (files)"
done

echo "Done. Restore any repo with: git clone <name>.bundle"
