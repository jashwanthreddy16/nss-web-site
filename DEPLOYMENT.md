# Deployment Guide - NSS RGUKT Basar Full-Stack Website

This guide walks you through deploying the complete full-stack website (React 19 + Express + MongoDB Atlas).

---

## ⚡ Pre-Deployment Step: MongoDB Atlas Network Access

Cloud platforms (Render, Railway, Vercel) use dynamic outgoing IP addresses. To allow them to connect to your MongoDB Atlas cluster:

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/).
2. In the left sidebar, click **Network Access** (under Security).
3. Click **+ Add IP Address**.
4. Select **Allow Access from Anywhere** (`0.0.0.0/0`).
5. Click **Confirm**.

---

## 🚀 Option 1: Deploy on Render (Recommended - Free & Easiest)

With the configured root scripts, Render can host both the frontend and backend together as a single Web Service. This avoids all CORS issues and gives you a single URL.

### Step 1: Push your latest code to GitHub
Ensure your latest changes are pushed to your GitHub repository:
```bash
git push origin spandana-home
# or merge to main and push:
# git checkout main
# git merge spandana-home
# git push origin main
```

### Step 2: Create a Web Service on Render
1. Go to [dashboard.render.com](https://dashboard.render.com/) and sign in with GitHub.
2. Click **New +** > **Web Service**.
3. Choose your repository: `NSS-Website`.
4. Configure the settings:
   - **Name**: `nss-rgukt-basar` (or your choice)
   - **Region**: Singapore or Frankfurt (closest to India)
   - **Branch**: `spandana-home` (or `main`)
   - **Root Directory**: *(Leave empty)*
   - **Runtime**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### Step 3: Add Environment Variables
Under the **Environment Variables** section on Render, add:

| Key | Value |
| :--- | :--- |
| `NODE_ENV` | `production` |
| `MONGO_URI` | `mongodb+srv://jashureddy1608_db_user:THEMAN%402006@cluster0.svl4kux.mongodb.net/nss_rgukt?retryWrites=true&w=majority` |
| `JWT_SECRET` | `nss_rgukt_super_secret_jwt_key_2026` |
| `ADMIN_EMAIL` | `admin@rgukt.ac.in` |
| `ADMIN_PASSWORD` | `admin123` |

### Step 4: Click Deploy!
- Render will automatically run `npm run build` (building frontend assets & installing backend dependencies) and start the server.
- Once completed, your full-stack site will be live at `https://<your-app-name>.onrender.com`!

### Step 5: (Optional) Seed Production Database
If you ever want to re-seed initial activities and default users on production:
Go to Render Dashboard > your service > **Shell** tab, and run:
```bash
npm run seed
```

---

## 🚂 Option 2: Deploy on Railway

1. Go to [railway.app](https://railway.app/) and login with GitHub.
2. Click **New Project** > **Deploy from GitHub repo**.
3. Select `NSS-Website`.
4. Under **Variables**, add:
   - `NODE_ENV`: `production`
   - `MONGO_URI`: `mongodb+srv://jashureddy1608_db_user:THEMAN%402006@cluster0.svl4kux.mongodb.net/nss_rgukt?retryWrites=true&w=majority`
   - `JWT_SECRET`: `nss_rgukt_super_secret_jwt_key_2026`
   - `ADMIN_EMAIL`: `admin@rgukt.ac.in`
   - `ADMIN_PASSWORD`: `admin123`
5. Railway will automatically detect the build and start commands from root `package.json`.
6. Under **Settings** > **Networking**, click **Generate Domain**.

---

## 🌐 Option 3: Separate Deployments (Vercel + Render)

If you prefer hosting the React frontend on Vercel and Express API on Render:

### Backend (on Render):
- Root directory: `backend`
- Build command: `npm install`
- Start command: `node server.js`
- Set environment variables as above.

### Frontend (on Vercel):
- Root directory: `frontend`
- Framework Preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- In `frontend/vite.config.js`, configure production proxy or set API URL to point to your deployed Render backend.
