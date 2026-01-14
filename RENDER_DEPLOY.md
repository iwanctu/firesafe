# Render Deployment Guide for FireSafe

This guide walks you through deploying FireSafe to Render with a managed Postgres database and optional S3 storage.

## Prerequisites

- GitHub repo pushed with all FireSafe code (including `Dockerfile`, `render.yaml`, `database-postgres.js`)
- Render account (https://render.com)
- (Optional) AWS S3 bucket or DigitalOcean Spaces for file uploads

## Step 1: Connect GitHub Repository to Render

1. Go to https://dashboard.render.com and sign in.
2. Click **New +** → **Web Service**.
3. Select **Deploy an existing repository** or **Build and deploy from GitHub**.
4. Connect your GitHub account and select the `firesafe` repository.
5. Select branch: `main`.
6. Fill in the service details:
   - **Name:** `firesafe` (or your preferred name)
   - **Region:** Choose closest to your users (e.g., `us-east-1`)
   - **Branch:** `main`
   - **Runtime:** `Docker`
   - **Build Command:** Leave blank (Dockerfile handles it)
   - **Start Command:** Leave blank (Dockerfile handles it)

7. Click **Create Web Service**. Render will start building the Docker image.

## Step 2: Create a Postgres Database on Render

1. In Render dashboard, click **New +** → **PostgreSQL**.
2. Fill in the details:
   - **Name:** `firesafe-db`
   - **Region:** Same as your Web Service
   - **PostgreSQL Version:** Latest stable (e.g., 15)
   - **Database:** `firesafe`
3. Click **Create Database**.
4. Wait for the database to be ready. Copy the **External Database URL** (starts with `postgresql://`).

## Step 3: Configure Environment Variables on Render

1. Go back to your **firesafe** Web Service.
2. Click **Environment** (in the left sidebar).
3. Add the following environment variables:

### Required Variables

| Key | Value | Notes |
|-----|-------|-------|
| `DATABASE_URL` | `postgresql://user:pass@hostname:5432/firesafe` | Paste the URL from Step 2 |
| `PORT` | `3000` | (Optional, default is 3000) |
| `NODE_ENV` | `production` | Recommended |

### Optional S3 Variables (for file uploads)

If you want uploads to go to S3 instead of local disk:

| Key | Value | Notes |
|-----|-------|-------|
| `S3_BUCKET` | `my-firesafe-bucket` | Your AWS S3 bucket name |
| `AWS_REGION` | `us-east-1` | AWS region where bucket exists |
| `AWS_ACCESS_KEY_ID` | Your AWS access key | [Get from AWS IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) |
| `AWS_SECRET_ACCESS_KEY` | Your AWS secret key | Keep secure! |
| `MAX_UPLOAD_SIZE` | `5242880` | Max bytes (5MB default) |

4. Click **Save** after adding all variables.

## Step 4: Run Database Migration

Once the Web Service is deployed and the database is ready:

1. In Render dashboard, go to your **firesafe** Web Service.
2. Click the **Shell** tab (top right).
3. Run:
   ```bash
   npm run migrate
   ```
4. This will create all required tables in Postgres. You should see: `Migration completed.`

## Step 5: Verify Deployment

1. Your Web Service will have a public URL like: `https://firesafe-xxxx.onrender.com`
2. Open it in your browser — you should see the FireSafe homepage.
3. Test creating/uploading a product from the admin panel to verify S3 or local storage.

## Step 6: Custom Domain (Optional)

1. In the Web Service settings, click **Custom Domain**.
2. Add your domain and follow DNS setup instructions.

## Troubleshooting

### Service won't start
- Check logs: Render dashboard → Web Service → Logs
- Ensure `DATABASE_URL` is set and the database is ready
- Verify all dependencies are installed (check `package.json`)

### Database connection error
- Verify `DATABASE_URL` format: `postgresql://username:password@hostname:port/database`
- Wait a few minutes for the database to be fully initialized
- Run `npm run migrate` in the Shell to initialize tables

### File uploads not working
- If using S3, verify AWS credentials and bucket name
- If using local uploads, note they won't persist after restarts (use S3 for production)

### Socket.IO real-time not working
- Render handles WebSocket by default; ensure CORS is properly configured in `server.js`
- Frontend should connect to the same domain as the backend (no localhost)

## CI/CD: Automatic Redeploy on Git Push

Render automatically redeploys when you push to `main`:

1. Make changes locally.
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update FireSafe"
   git push origin main
   ```
3. Render will detect the change and rebuild the Docker image and redeploy.

## Next: Frontend Deployment (Optional)

If you want to deploy the frontend separately to a CDN (Vercel, Netlify):

1. Extract `public/` contents or build a separate static deployment.
2. Configure the frontend to call the Render backend API URL.
3. See `DEPLOYMENT.md` for frontend-only deployment steps.

---

**You're live!** Your FireSafe app is now running on Render with a managed database. 🚀
