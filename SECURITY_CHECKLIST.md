# FireSafe Production Security Checklist

Before deploying FireSafe to production, verify all items below.

## Environment & Secrets

- [ ] **Secrets Management:**
  - [ ] `DATABASE_URL` stored as Render/Railway environment variable (never in code)
  - [ ] AWS credentials (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) stored as secrets
  - [ ] No `.env` file committed to GitHub
  - [ ] All API keys and tokens in environment variables only

- [ ] **Node Environment:**
  - [ ] `NODE_ENV=production` set on deployment host
  - [ ] `PORT` set appropriately (default 3000)

## Database Security

- [ ] **Postgres (recommended for production):**
  - [ ] Database user has minimal permissions (read/write only, no admin)
  - [ ] Strong password (20+ chars, mixed case, numbers, symbols)
  - [ ] Database accessible only from your backend service (no public IP)
  - [ ] Backups enabled and tested for recovery
  - [ ] SSL/TLS required for connections

- [ ] **Data Persistence:**
  - [ ] Migrations run successfully (`npm run migrate`)
  - [ ] Tables created with proper constraints and indexes
  - [ ] No sensitive data in logs or error messages

## API & Network Security

- [ ] **CORS Configuration:**
  - [ ] Only allow requests from your frontend domain(s)
  - [ ] Do not use `origin: "*"` in production
  - [ ] Example: `origin: ['https://firesafe-frontend.vercel.app']`

- [ ] **HTTPS/TLS:**
  - [ ] All traffic encrypted (HTTP to HTTPS redirects)
  - [ ] SSL certificate valid and non-expired
  - [ ] Render/Netlify/Vercel provide automatic HTTPS ✅

- [ ] **Rate Limiting:**
  - [ ] Add rate limiting middleware to prevent brute force/DDoS
  - [ ] Example: `npm install express-rate-limit`
  - [ ] Apply to `/api/auth/login` and file upload endpoints

- [ ] **Input Validation:**
  - [ ] All user inputs validated on backend
  - [ ] File uploads restricted by type and size (e.g., max 5MB, images only)
  - [ ] SQL injection prevention (use parameterized queries — already done via `pg` library)
  - [ ] XSS prevention (sanitize HTML output in frontend)

## File Uploads & Storage

- [ ] **S3 Configuration (if using S3):**
  - [ ] Bucket policy restricts public write access (read-only for downloads)
  - [ ] Uploaded files have predictable, non-guessable names (timestamp + random)
  - [ ] Virus scanning enabled (optional AWS antivirus service)
  - [ ] Bucket versioning enabled for accidental deletion recovery
  - [ ] Lifecycle policies delete old/expired uploads

- [ ] **Local Upload Fallback:**
  - [ ] `/uploads` directory has restricted permissions (not world-readable)
  - [ ] Uploads served with correct MIME types (prevent browser execution)
  - [ ] Files validated before serving (no arbitrary file access)

## Authentication & Authorization

- [ ] **Admin Access:**
  - [ ] Admin panel (`/api/products`, `/api/categories` POST/PUT/DELETE) protected
  - [ ] Role-based access control: only `admin` users can create/edit products
  - [ ] Consider adding JWT or session tokens (currently basic email auth)
  - [ ] Add admin password/API key authentication (not just email)

- [ ] **User Sessions:**
  - [ ] Session timeout enforced (log out after inactivity)
  - [ ] Secure session cookie settings (if using cookies)

## Frontend Security

- [ ] **CSP (Content Security Policy):**
  - [ ] Add CSP header in backend to prevent XSS attacks
  - [ ] Example: `X-Content-Security-Policy: default-src 'self'`

- [ ] **API URL Hardcoding:**
  - [ ] Backend URL correctly set to production domain
  - [ ] No `localhost:3000` references in production code

## Monitoring & Logging

- [ ] **Error Handling:**
  - [ ] No sensitive data in error messages (e.g., SQL errors)
  - [ ] Stack traces hidden from users (visible only in logs)
  - [ ] Implement structured logging (`winston` or similar)

- [ ] **Monitoring:**
  - [ ] Render/Railway/host provides monitoring/alerting
  - [ ] CPU, memory, disk usage monitored
  - [ ] Uptime monitoring and alerts configured
  - [ ] Error logs reviewed regularly

## Dependencies & Updates

- [ ] **Dependency Audit:**
  - [ ] Run `npm audit` and fix all high/critical vulnerabilities
  - [ ] Review `package.json` versions (no wildcards like `*`)
  - [ ] Keep dependencies up-to-date (especially security packages)

- [ ] **Automated Updates:**
  - [ ] Enable Dependabot or Snyk for GitHub security alerts

## Deployment Checklist

- [ ] **Pre-Deploy:**
  - [ ] All tests pass locally
  - [ ] No secrets in code (scan with `git-secrets` or similar)
  - [ ] Code reviewed by team member

- [ ] **Deployment:**
  - [ ] Deployed to production environment (not staging)
  - [ ] GitHub Actions CI passes (Docker build successful)
  - [ ] All environment variables set on Render/Railway
  - [ ] Database migrations run after first deployment
  - [ ] Backups configured before go-live

- [ ] **Post-Deploy:**
  - [ ] Test product CRUD operations in production
  - [ ] Test file uploads to S3/local storage
  - [ ] Test real-time Socket.IO across frontend/backend domains
  - [ ] Monitor logs for errors in first 24 hours
  - [ ] Performance baseline established

## Hardening (Optional Advanced)

- [ ] **WAF (Web Application Firewall):**
  - [ ] Cloudflare or similar WAF in front of your service
  - [ ] DDoS protection enabled

- [ ] **API Gateway:**
  - [ ] Consider Kong or AWS API Gateway for additional protection

- [ ] **Database Encryption:**
  - [ ] Transparent data encryption (TDE) enabled in Postgres
  - [ ] Encryption at rest for S3 uploads

- [ ] **Secrets Rotation:**
  - [ ] Rotate AWS access keys quarterly
  - [ ] Rotate database passwords periodically

---

## Quick Reference: Security Headers (Optional)

Add to `server.js` for additional protection:

```javascript
const helmet = require('helmet');
app.use(helmet()); // Recommended: npm install helmet

// Custom headers
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY'); // Clickjacking protection
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000'); // HSTS
  next();
});
```

---

**Before going live, ensure all critical items (first 3 sections) are checked.**

For questions, refer to [DEPLOYMENT.md](DEPLOYMENT.md) or [RENDER_DEPLOY.md](RENDER_DEPLOY.md).
