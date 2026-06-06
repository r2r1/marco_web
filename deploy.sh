#!/bin/bash
# Скрипт деплоя marco-site на VPS рег.ру
# Запускать на сервере из папки /var/www/marco_web
set -e

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

echo "==> Restarting app..."
cd ..
pm2 reload ecosystem.config.js --update-env

echo "==> Done! App is running."
pm2 status
