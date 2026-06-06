#!/bin/bash
# Скрипт деплоя marco-site на VPS рег.ру
# Запускать на сервере: bash /var/www/marco_web/deploy.sh
set -e

cd /var/www/marco_web

echo "==> Pulling latest changes..."
git pull origin main

echo "==> Installing dependencies..."
cd marco-site
npm ci --omit=dev

echo "==> Building..."
npm run build

echo "==> Copying static assets to standalone..."
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
cp .env.local .next/standalone/.env.local

echo "==> Restarting app..."
pm2 reload marco-site

echo "==> Done!"
pm2 status
