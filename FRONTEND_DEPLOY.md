# Frontend Deployment Guide (Vercel / Netlify)

This guide shows how to deploy the FireSafe frontend as a static site to Vercel or Netlify.

## Overview

The frontend is a single HTML file with embedded CSS/JS in `public/index.html`. Since it's a static asset (no build step needed), deployment is simple. You can:
- Deploy `public/index.html` directly to Vercel/Netlify as a static site.
- Configure the frontend to call your cloud-hosted backend API (Render, Railway, etc.).

## Option 1: Deploy to Vercel

### Prerequisites
- GitHub repo with FireSafe code pushed.
- Vercel account (https://vercel.com).

### Steps

1. **Connect GitHub to Vercel:**
   - Go to https://vercel.com and sign in or create an account.
   - Click **Add New...** → **Project**.
   - Select your GitHub repository (`iwanctu/firesafe`).
   - Click **Import**.

2. **Configure Project:**
   - **Project Name:** `firesafe-frontend` (or your preferred name)
   - **Framework Preset:** `Other` (since it's plain HTML)
   - **Root Directory:** `public` (tell Vercel to deploy from `public/` folder)
   - **Build Command:** Leave empty (no build needed)
   - **Output Directory:** `.` (default)

3. **Environment Variables (Optional):**
   - If you want to hardcode the backend API URL, set it in `public/index.html` before deploying.
   - Or add as Vercel env var and reference in deployment.

4. **Deploy:**
   - Click **Deploy**. Vercel will build and deploy your site.
   - You'll get a public URL like: `https://firesafe-frontend.vercel.app`

5. **Configure API Endpoint in Frontend:**
   - Open [public/index.html](public/index.html) and find references to `http://localhost:3000`.
   - Replace with your Render/Railway backend URL (e.g., `https://firesafe-xxxx.onrender.com`).
   - Commit and push. Vercel will auto-redeploy.

---

## Option 2: Deploy to Netlify

### Prerequisites
- GitHub repo with FireSafe code pushed.
- Netlify account (https://netlify.com).

### Steps

1. **Connect GitHub to Netlify:**
   - Go to https://app.netlify.com and sign in or create an account.
   - Click **Add new site** → **Import an existing project**.
   - Select GitHub and choose your `firesafe` repository.
   - Click **Authorize Netlify**.

2. **Configure Build Settings:**
   - **Build Command:** Leave empty (no build needed)
   - **Publish Directory:** `public`
   - Click **Deploy site**.

3. **Configure API Endpoint in Frontend:**
   - Open [public/index.html](public/index.html) and find references to `http://localhost:3000`.
   - Replace with your Render/Railway backend URL (e.g., `https://firesafe-xxxx.onrender.com`).
   - Commit and push. Netlify will auto-redeploy.

4. **Custom Domain (Optional):**
   - In Netlify dashboard, go to **Domain settings** → **Add custom domain**.
   - Follow DNS setup instructions.

---

## Updating the Backend API URL in the Frontend

The frontend currently hardcodes `localhost:3000` for API calls. To point to your cloud backend:

### Quick Method: Direct Edit

1. Open [public/index.html](public/index.html).
2. Search for `http://localhost:3000` (approximately 20+ occurrences in API helper functions).
3. Replace all with your backend URL (e.g., `https://firesafe-xxxx.onrender.com`).
4. Commit and push — Vercel/Netlify will auto-redeploy.

### Better Method: Environment Variable (Optional Advanced)

If you want to dynamically set the backend URL:

1. Create a simple `config.js` in `public/`:
   ```javascript
   // public/config.js
   const API_BASE = window.location.hostname === 'localhost'
     ? 'http://localhost:3000'
     : 'https://firesafe-xxxx.onrender.com'; // Replace with your cloud backend URL
   ```

2. In `public/index.html`, reference `API_BASE` in API calls:
   ```javascript
   // Instead of: fetch('http://localhost:3000/api/products')
   // Use: fetch(`${API_BASE}/api/products`)
   ```

---

## Testing

1. Open your Vercel/Netlify public URL in a browser.
2. Check the browser console (F12 → Console) for any errors.
3. If the frontend loads but products/API calls fail:
   - Verify the backend URL is correct.
   - Check CORS settings in your backend (`server.js`).
   - Ensure your Render/Railway service is running.

---

## CORS Configuration

Ensure your Render/Railway backend allows requests from your frontend domain.

In `server.js`, the CORS is currently:
```javascript
app.use(cors());
// OR with restrictive origin:
app.use(cors({
  origin: 'https://firesafe-frontend.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
```

To allow multiple domains, update `server.js`:
```javascript
app.use(cors({
  origin: ['https://firesafe-frontend.vercel.app', 'https://firesafe-frontend.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
```

---

## Auto-Deployment on GitHub Push

Both Vercel and Netlify automatically redeploy when you push to `main`:

```bash
git add public/index.html
git commit -m "Update backend API URL to production"
git push origin main
```

Your frontend will redeploy in ~1-2 minutes.

---

## Next Steps

1. ✅ Deploy backend to Render (see [RENDER_DEPLOY.md](RENDER_DEPLOY.md))
2. ✅ Deploy frontend to Vercel or Netlify (this guide)
3. Update frontend to call cloud backend URL
4. Test real-time features (Socket.IO) across domains

For a complete production setup, see [DEPLOYMENT.md](DEPLOYMENT.md).
