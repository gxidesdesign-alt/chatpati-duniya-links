#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")"

branch="$(git branch --show-current)"

if [[ -z "$branch" ]]; then
  echo "Error: Git is not currently on a branch." >&2
  exit 1
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  echo "Error: This repository does not have an 'origin' remote." >&2
  exit 1
fi

git add --all

if git diff --cached --quiet; then
  echo "No new changes to commit. Pushing existing commits..."
else
  git commit -m "Update website $(date '+%Y-%m-%d %H:%M:%S')"
fi

git push --set-upstream origin "$branch"
