#!/bin/bash
# ═══════════════════════════════════════════════════════
# Aegis GRC Platform — VM First-Time Setup Script
# Run manually after SSH into the VM
# Tested on Ubuntu 22.04 / Debian 12
# ═══════════════════════════════════════════════════════
set -e

APP_USER="${APP_USER:-$(whoami)}"
APP_DIR="${APP_DIR:-/home/${APP_USER}/aegis}"
REPO_URL="${REPO_URL:-https://github.com/xheavy0/Aegis.git}"

echo "▶ Updating system..."
apt-get update -y && apt-get upgrade -y

echo "▶ Installing Docker..."
apt-get install -y ca-certificates curl gnupg git
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  > /etc/apt/sources.list.d/docker.list
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

echo "▶ Enabling Docker..."
systemctl enable docker
systemctl start docker
usermod -aG docker "$APP_USER"

echo "▶ Cloning repository..."
mkdir -p "$(dirname "$APP_DIR")"
git clone "$REPO_URL" "$APP_DIR"
cd "$APP_DIR"

echo "▶ Creating .env from production template..."
cp backend/.env.production backend/.env

# Generate random secret key and strong DB password
SECRET=$(openssl rand -hex 32)
DB_PASS=$(openssl rand -hex 24)
sed -i "s/REPLACE_WITH_RANDOM_64_CHAR_STRING/$SECRET/" backend/.env
sed -i "s/CHANGE_ME_STRONG_PASSWORD/${DB_PASS}/g" backend/.env

# Set POSTGRES_PASSWORD for docker-compose (root .env for docker-compose.yml)
echo "POSTGRES_PASSWORD=${DB_PASS}" > .env

echo "▶ Starting application..."
docker compose up -d --build

# Wait and verify deployment
echo "▶ Waiting for services to be ready..."
sleep 20
if curl -sf http://localhost/api/health >/dev/null; then
    echo ""
    echo "✅ Setup complete!"
    echo "   App is running at: http://$(hostname -I | awk '{print $1}')"
    echo "   Login with the credentials set in backend/.env (FIRST_ADMIN_EMAIL / FIRST_ADMIN_PASSWORD)"
    echo "   IMPORTANT: Change the admin password immediately after first login!"
else
    echo "⚠ Health check failed. Check logs with: docker compose logs"
    exit 1
fi
