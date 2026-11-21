#!/usr/bin/env bash
# Exit immediately if a command exits with a non-zero status
set -e

echo "--- Installing frontend dependencies (including build tools) ---"
cd frontend
npm install --include=dev

echo "--- Building frontend ---"
npm run build
cd ..

echo "--- Installing backend dependencies ---"
cd backend
npm install --include=dev
cd ..

echo "--- Build finished successfully ---"
