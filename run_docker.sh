#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
IMAGE="occurrent-org-jekyll:local"
BUNDLE_VOLUME="occurrent-org-jekyll-bundle"

cd "$SCRIPT_DIR"

echo "[1/3] Building local Docker image for occurrent.org"
docker build -t "$IMAGE" .
echo

echo "[2/3] Installing gems in the container"
docker run --rm -it \
  -v "$SCRIPT_DIR":/srv/jekyll \
  -v "$BUNDLE_VOLUME":/usr/local/bundle \
  -w /srv/jekyll \
  "$IMAGE" \
  bundle install

echo

echo "[3/3] Starting Jekyll on http://localhost:4000"
exec docker run --rm -it \
  -p 4000:4000 \
  -p 35730:35730 \
  -v "$SCRIPT_DIR":/srv/jekyll \
  -v "$BUNDLE_VOLUME":/usr/local/bundle \
  -w /srv/jekyll \
  "$IMAGE" \
  bundle exec jekyll serve --host 0.0.0.0 --port 4000 --livereload --livereload-port 35730
