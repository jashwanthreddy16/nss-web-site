#!/usr/bin/env bash
# Exit immediately if a command exits with a non-zero status
set -e

echo "--- Installing frontend dependencies ---"
cd frontend
npm install

echo "--- Building frontend ---"
npm run build
cd ..

echo "--- Installing backend dependencies ---"
cd backend
npm install
cd ..

echo "--- Build finished successfully ---"
