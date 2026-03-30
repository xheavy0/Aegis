#!/usr/bin/env bash
# Aegis GRC deploy/update script for EC2.
set -Eeuo pipefail

APP_DIR="${APP_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
BRANCH="${BRANCH:-main}"
ENV_FILE="$APP_DIR/backend/.env"
ENV_TEMPLATE="$APP_DIR/backend/.env.production"

echo "==> Aegis deploy started at $(date)"
echo "==> App directory: $APP_DIR"

if ! command -v docker >/dev/null 2>&1; then
  echo "ERROR: docker is not installed or not in PATH."
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "ERROR: docker compose is not available."
  exit 1
fi

cd "$APP_DIR"

if [ ! -f "$ENV_FILE" ]; then
  echo "ERROR: $ENV_FILE not found."
  echo "Create it first. You can start from:"
  echo "  cp $ENV_TEMPLATE $ENV_FILE"
  exit 1
fi

echo "==> Pulling latest code from branch '$BRANCH'..."
git pull origin "$BRANCH"

echo "==> Rebuilding and starting containers..."
docker compose up -d --build --remove-orphans

echo "==> Cleaning unused images..."
docker image prune -f

echo "==> Current container status:"
docker compose ps

echo "==> Verifying deployment health..."
MAX_RETRIES=12
RETRY_INTERVAL=5
for i in $(seq 1 $MAX_RETRIES); do
  if curl -sf http://localhost/api/health >/dev/null; then
    echo "==> Health check passed."
    break
  fi
  if [ "$i" -eq "$MAX_RETRIES" ]; then
    echo "ERROR: Health check failed after $((MAX_RETRIES * RETRY_INTERVAL))s. Check logs:"
    docker compose logs --tail=50
    exit 1
  fi
  echo "    Waiting for app to be ready... ($i/$MAX_RETRIES)"
  sleep "$RETRY_INTERVAL"
done

echo "==> Deploy complete at $(date)"
