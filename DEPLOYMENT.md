# Deployment Guide

This guide explains quick, practical ways to deploy the FireSafe app to the cloud and make it dynamic (persistent database, uploads, and public URL).

1) Quick container deployment (Docker)

- Build image locally: 

```bash
docker build -t firesafe:latest .
```

- Run container (exposes port 3000):

```bash
docker run -p 3000:3000 -e PORT=3000 -d --name firesafe firesafe:latest
```

Visit http://<HOST_IP>:3000

2) Deploy to Render / Railway (single-service, fastest)

- Push your repo to GitHub and connect the repository to Render or Railway.
- Set the start command to `npm start` (already present in `package.json`).
- Render will persist files if you enable a persistent disk; otherwise migrate to Postgres for data and S3 for uploads (recommended).

3) Recommended production architecture (robust and scalable)

- Backend: deploy `server.js` to a managed host (Render, Railway, Fly). Use a managed Postgres DB and store uploads in S3-compatible storage.
- Frontend: deploy the `public/` folder to a static host (Vercel, Netlify, or Cloudflare Pages) and call backend APIs via the public URL.

Notes and migration pointers:

- Current `database.js` uses SQLite (`firesafe.db`) which is file-based and not suitable for most ephemeral cloud instances. Migrate to Postgres (or another managed DB) for production. Typical steps:
  - Replace `sqlite3` usage with `pg` or an ORM (Knex/Sequelize/Prisma).
  - Update `database.js` to read `DATABASE_URL` from environment variables.

- File uploads currently use local `uploads/`. For cloud:
  - Use `multer-s3` to upload to S3 (or DigitalOcean Spaces). Store returned object URLs in DB.
  - Keep local `uploads/` only for development.

  S3 environment variables (Render/Railway/host):

  - `AWS_ACCESS_KEY_ID` — your AWS access key ID
  - `AWS_SECRET_ACCESS_KEY` — your AWS secret access key
  - `AWS_REGION` — AWS region (optional, default `us-east-1`)
  - `S3_BUCKET` — target bucket name for uploads
  - `MAX_UPLOAD_SIZE` — optional max bytes for uploads (defaults to 5MB)

  The server will automatically use S3 when `S3_BUCKET` and AWS credentials are present; otherwise it uses local `uploads/`.

- Socket.IO works across hosts; ensure the frontend connects to the correct backend URL and configure CORS accordingly.

4) Quick checklist before production

- [ ] Switch to Postgres and update `database.js` to use `DATABASE_URL`.
- [ ] Configure `multer` to use S3 in production and keep local storage for development.
- [ ] Add HTTPS (managed by provider or use a reverse proxy with Let's Encrypt).
- [ ] Restrict CORS origins and enable authentication for admin endpoints.
- [ ] Add basic rate-limiting and monitoring/logging.

If you want, I can:

- Add a `Dockerfile` (done) and test a local container run.
- Add a `database-postgres.js` scaffold and example migration scripts.
- Prepare a Render service YAML or a sample `Dockerfile`-based deploy config for Railway/Render.

Tell me which of the above you'd like me to implement next.

5) Continuous delivery (optional)

- I added a GitHub Actions workflow that builds the Docker image and pushes it to Docker Hub on pushes to `main`.
- To enable it, set these repository secrets:
  - `DOCKERHUB_USERNAME` — your Docker Hub username
  - `DOCKERHUB_TOKEN` — a Docker Hub access token or password

After the workflow runs, your image will be available as `DOCKERHUB_USERNAME/firesafe:latest` and by commit SHA.

6) Quick publish + Render

- Push to GitHub. In Render, create a Web Service and connect the repo. Render will build using `render.yaml` and the `Dockerfile`.
- If you want Render to use the Docker Hub image instead, set the service to use the Docker image and provide the image name and any registry credentials.

Commands (example) to push and trigger the workflow:

```bash
# commit & push
git add .
git commit -m "Prepare for cloud deploy: Docker, Postgres scaffold, CI"
git push origin main
```

