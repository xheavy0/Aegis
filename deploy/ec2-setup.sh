#!/bin/bash
# ═══════════════════════════════════════════════════════
# Aegis GRC Platform — EC2 First-Time Setup Script
# Run this as EC2 User Data (or manually after SSH)
# Ubuntu 22.04 LTS
# ═══════════════════════════════════════════════════════
set -e

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
usermod -aG docker ubuntu

echo "▶ Cloning repository..."
cd /home/ubuntu
git clone https://github.com/xheavy0/Aegis_GRC_PLATFORM.git aegis
cd aegis

echo "▶ Creating .env from production template..."
cp backend/.env.production backend/.env

# Generate random secret key and strong DB password
SECRET=$(openssl rand -hex 32)
DB_PASS=$(openssl rand -hex 24)
sed -i "s/REPLACE_WITH_RANDOM_64_CHAR_STRING/$SECRET/" backend/.env
sed -i "s|postgresql://aegis:CHANGE_ME_STRONG_PASSWORD@|postgresql://aegis:${DB_PASS}@|" backend/.env

# Set POSTGRES_PASSWORD for docker-compose
echo "" >> backend/.env
echo "POSTGRES_PASSWORD=${DB_PASS}" >> backend/.env

echo "▶ Starting application..."
docker compose up -d --build

# Wait and verify deployment
echo "▶ Waiting for services to be ready..."
sleep 15
if curl -sf http://localhost/api/health >/dev/null; then
    echo ""
    echo "✅ Setup complete!"
    echo "   App is running at: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
    echo "   Login with the credentials set in backend/.env (FIRST_ADMIN_EMAIL / FIRST_ADMIN_PASSWORD)"
    echo "   IMPORTANT: Change the admin password immediately after first login!"
else
    echo "⚠ Health check failed. Check logs with: docker compose logs"
    exit 1
fi
