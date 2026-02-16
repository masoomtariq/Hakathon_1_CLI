# Deployment Guide - Physical AI & Humanoid Robotics Textbook

## Deployment Architecture

```
GitHub Repository
    ↓
    ├─ Trigger: Push to main
    ├─ CI/CD: GitHub Actions
    │   ├─ Run tests
    │   ├─ Build checks
    │   └─ Deployment approval
    ↓
Frontend (Docusaurus)        Backend (FastAPI)
    ↓                              ↓
GitHub Pages                    Vercel Functions
(Static CDN)                    (Serverless)
    ↓                              ↓
    └──────────────┬──────────────┘
                   ↓
            Neon PostgreSQL
            Qdrant Cloud
            OpenAI API
```

---

## 1. Frontend Deployment (GitHub Pages)

### 1.1 Configure Repository

```bash
# In your GitHub repo settings:
# 1. Go to Settings → Pages
# 2. Source: GitHub Actions
# 3. Branch: main (or your default)
```

### 1.2 Create CI/CD Workflow

**File**: `.github/workflows/deploy-docs.yml`

```yaml
name: Deploy Docs to GitHub Pages

on:
  push:
    branches: [main]
    paths:
      - 'docs/**'
      - '.github/workflows/deploy-docs.yml'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install pnpm
        run: npm install -g pnpm
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build documentation
        run: cd docs && pnpm build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: docs/build
  
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

### 1.3 Configure Docusaurus for GitHub Pages

**File**: `docs/docusaurus.config.ts`

```typescript
export default {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'AI-Native Educational Platform',
  url: 'https://masoomtariq.github.io',  // Your GitHub pages domain
  baseUrl: '/Hakathon_1_CLI/',            // Repo name
  
  // API endpoints for production
  customFields: {
    apiUrl: process.env.API_URL || 'https://api.yourdomain.com',
  },
  
  // Build settings
  trailingSlash: true,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
} as Config;
```

### 1.4 Build & Deploy

```bash
# Local test build
cd docs
pnpm build
pnpm serve  # Test locally

# Commit and push
git add .
git commit -m "docs: update content"
git push origin main

# GitHub Actions will automatically deploy to GitHub Pages
# Check: https://masoomtariq.github.io/Hakathon_1_CLI/
```

---

## 2. Backend Deployment (Vercel + FastAPI)

### 2.1 Install Vercel CLI

```bash
npm i -g vercel
# or
pnpm add -g vercel
```

### 2.2 Create Vercel Config

**File**: `backend/vercel.json`

```json
{
  "buildCommand": "pip install -r requirements.txt",
  "outputDirectory": ".",
  "env": {
    "PYTHONUNBUFFERED": "1"
  },
  "functions": {
    "main.py": {
      "runtime": "python3.11"
    }
  },
  "env": {
    "DATABASE_URL": "@database_url",
    "QDRANT_URL": "@qdrant_url",
    "OPENAI_API_KEY": "@openai_key",
    "ANTHROPIC_API_KEY": "@anthropic_key",
    "SECRET_KEY": "@secret_key",
    "JWT_ALGORITHM": "HS256",
    "ENVIRONMENT": "production"
  }
}
```

### 2.3 Create API Handler

**File**: `backend/api/index.py`

```python
# Vercel serverless function entry point
import sys
from pathlib import Path

# Add project root to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from main import app
from fastapi.middleware.cors import CORSMiddleware

# Configure CORS for Vercel deployed frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://masoomtariq.github.io",
        "https://yourdomain.com",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Vercel handler
from mangum import Mangum
handler = Mangum(app)
```

### 2.4 Initialize & Deploy

```bash
# Login to Vercel
vercel login

# Link project
cd backend
vercel link
# Follow prompts to select/create project

# Set environment variables
vercel env add DATABASE_URL  # Paste Neon connection string
vercel env add OPENAI_API_KEY
vercel env add ANTHROPIC_API_KEY
vercel env add QDRANT_URL
vercel env add SECRET_KEY  # Generate: openssl rand -hex 32

# Deploy
vercel deploy --prod

# Get deployment URL: https://api-name.vercel.app
```

### 2.5 Verify Deployment

```bash
# Test API
curl https://api-name.vercel.app/health

# Check logs
vercel logs
```

---

## 3. Database Setup (Neon PostgreSQL)

### 3.1 Create Neon Project

```bash
# Visit https://console.neon.tech
# 1. Sign up / Login
# 2. Create new project
# 3. Select PostgreSQL version
# 4. Copy connection string
```

### 3.2 Get Connection String

```
postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

### 3.3 Set Database Secrets

**In Vercel Dashboard**:
```
Settings → Environment Variables → Add
key: DATABASE_URL
value: postgresql://...
```

**Locally** (`.env`):
```
DATABASE_URL="postgresql://user:pass@host/dbname?sslmode=require"
```

### 3.4 Run Migrations

```bash
# Local
cd backend
alembic upgrade head

# On Vercel (run once)
vercel env pull  # Fetch env vars
alembic upgrade head
```

---

## 4. Vector Database (Qdrant)

### 4.1 Option A: Qdrant Cloud (Recommended)

```bash
# Visit https://cloud.qdrant.io
# 1. Sign up
# 2. Create cluster
# 3. Copy API key and URL
```

### 4.2 Set Qdrant Secrets

**Vercel**:
```
QDRANT_URL: https://xxxxx.qdrant.io
QDRANT_API_KEY: xxx
```

**Local `.env`**:
```
QDRANT_URL="https://xxxxx.qdrant.io"
QDRANT_API_KEY="xxx"
```

### 4.3 Option B: Self-Hosted Qdrant

**Using Fly.io (free tier available)**:

```bash
# Install Fly CLI
curl https://fly.io/install.sh | sh

# Create Qdrant app
fly launch --image qdrant/qdrant

# Get public URL
fly status

# Use in backend:
# QDRANT_URL=https://app-name.fly.dev
```

### 4.4 Index Content

```bash
python backend/scripts/seed-qdrant.sh
```

---

## 5. CI/CD Pipeline Setup

### 5.1 Testing Workflow

**File**: `.github/workflows/test.yml`

```yaml
name: Test & Lint

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3
      
      # Frontend tests
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install pnpm
        run: npm install -g pnpm
      
      - name: Install frontend deps
        run: pnpm install
      
      - name: Lint frontend
        run: pnpm run lint
      
      - name: Build frontend
        run: cd docs && pnpm build
      
      # Backend tests
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
          cache: 'pip'
      
      - name: Install backend deps
        run: pip install -r backend/requirements.txt
      
      - name: Lint backend
        run: ruff check backend/
      
      - name: Type check backend
        run: mypy backend/app
      
      - name: Test backend
        run: pytest backend/tests -v
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost/test
```

### 5.2 Deploy Workflow

**File**: `.github/workflows/deploy.yml`

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      # ... (see deploy-docs.yml)
  
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Vercel CLI
        run: npm install -g vercel
      
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
        run: cd backend && vercel deploy --prod

  notify:
    needs: [deploy-frontend, deploy-backend]
    runs-on: ubuntu-latest
    steps:
      - name: Notify Slack
        uses: slackapi/slack-github-action@v1
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK }}
          payload: |
            {
              "text": "✅ Deployment successful",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "Frontend: https://masoomtariq.github.io/Hakathon_1_CLI\nAPI: https://api-name.vercel.app"
                  }
                }
              ]
            }
```

---

## 6. Secret Management

### 6.1 GitHub Secrets

```bash
# Add to: Settings → Secrets and variables → Actions → New repository secret

# Frontend
REACT_APP_API_URL=https://api-name.vercel.app

# Backend
DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
QDRANT_URL=https://...
QDRANT_API_KEY=...
SECRET_KEY=... (generate: openssl rand -hex 32)

# Vercel
VERCEL_TOKEN=... (from https://vercel.com/account/tokens)
VERCEL_ORG_ID=...
VERCEL_PROJECT_ID=...
```

### 6.2 Local Development

**Never commit secrets!**

```bash
# Create .env files (already in .gitignore)
cat > docs/.env.local << 'EOF'
REACT_APP_API_URL=http://localhost:8000
EOF

cat > backend/.env << 'EOF'
DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-...
# ... etc
EOF

# Verify not committed
git status
# Should not show .env files
```

---

## 7. Monitoring & Analytics

### 7.1 Vercel Analytics

```bash
# Built-in (automatic)
vercel analytics

# View at: https://vercel.com/dashboard/[project]/analytics
```

### 7.2 Sentry Error Tracking

**Backend setup**:

```python
# backend/main.py
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration

sentry_sdk.init(
    dsn=os.getenv("SENTRY_DSN"),
    integrations=[FastApiIntegration()],
    environment=os.getenv("ENVIRONMENT", "development"),
    traces_sample_rate=0.1,
)
```

**Frontend setup**:

```typescript
// docs/src/index.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});
```

### 7.3 Custom Metrics

```python
# backend/middleware/logging.py
import structlog

logger = structlog.get_logger()

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    
    logger.info(
        "request",
        method=request.method,
        path=request.url.path,
        status=response.status_code,
        duration_ms=duration * 1000,
    )
    
    return response
```

---

## 8. Scaling Checklist

### 8.1 Before 1,000 Users
- ✅ CI/CD automated
- ✅ Monitoring setup
- ✅ Error tracking active
- ✅ Database backups enabled

### 8.2 Before 10,000 Users
- ✅ Caching layer (Redis)
- ✅ CDN configuration
- ✅ Database connection pooling
- ✅ Rate limiting enabled

### 8.3 Before 100,000 Users
- ✅ Database sharding strategy
- ✅ Vector DB optimization
- ✅ Multi-region deployment
- ✅ Load testing completed

---

## 9. Security Deployment Checklist

- [ ] HTTPS enforced (Vercel auto)
- [ ] Secrets not in code or git
- [ ] Rate limiting configured
- [ ] CORS restricted to known domains
- [ ] SQL injection prevention (ORM used)
- [ ] XSS protection (CSP headers)
- [ ] CSRF protection on state-changing ops
- [ ] Authentication tokens encrypted
- [ ] Database backups automated
- [ ] Audit logging implemented
- [ ] Security headers configured

```nginx
# Example security headers (Vercel config)
{
  "headers": [
    {
      "source": "/:path*",
      "headers": [
        {"key": "X-Content-Type-Options", "value": "nosniff"},
        {"key": "X-Frame-Options", "value": "DENY"},
        {"key": "X-XSS-Protection", "value": "1; mode=block"},
        {"key": "Referrer-Policy", "value": "strict-origin-when-cross-origin"},
        {"key": "Content-Security-Policy", "value": "default-src 'self'"}
      ]
    }
  ]
}
```

---

## 10. Troubleshooting Deployment

### Issue: Build fails on Vercel
```
Error: Module not found
```
**Fix**: Add dependencies to requirements.txt
```bash
pip freeze > backend/requirements.txt
```

### Issue: Database connection timeout
```
psycopg2.OperationalError: connection timeout
```
**Fix**: 
1. Check DATABASE_URL in Vercel env vars
2. Verify Neon project is started
3. Whitelist Vercel IP ranges in Neon

### Issue: Qdrant not reachable
```
ConnectionError: Cannot connect to http://localhost:6333
```
**Fix**: 
1. For production, use Qdrant Cloud (not localhost)
2. Check API key in console

### Issue: GitHub Pages shows 404
```
404 Page Not Found
```
**Fix**: 
1. Check baseUrl in docusaurus.config.ts
2. Verify gh-pages branch created
3. Settings → Pages → Source = GitHub Actions

---

## 11. Rollback Strategy

### Rollback Frontend
```bash
# GitHub Pages auto-maintains history
# Revert commit
git revert HEAD
git push origin main

# Or deploy specific commit
git checkout <commit-hash>
git push origin main
```

### Rollback Backend
```bash
# Vercel
vercel rollback
# Or
vercel deploy --archive=snapshot-name
```

### Rollback Database
```bash
# Neon automated backups
# In Neon console:
# 1. Project → Backups
# 2. Select restore point
# 3. Restore to new branch
# 4. Test, then merge main
```

---

## 12. Post-Deployment

### 12.1 Verification

```bash
# Frontend
curl -I https://masoomtariq.github.io/Hakathon_1_CLI/
# Should return 200 OK

# Backend
curl https://api-name.vercel.app/health
# Should return {"status": "healthy"}

# Authentication
curl -X POST https://api-name.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "test123"}'

# RAG
curl -X POST https://api-name.vercel.app/api/rag/query \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"query": "What is physical AI?"}'
```

### 12.2 Performance Baseline

Run before launch to establish baseline metrics:

```bash
# Frontend page load time
curl -w "@curl-format.txt" -o /dev/null -s https://masoomtariq.github.io/Hakathon_1_CLI/

# API response time
time curl https://api-name.vercel.app/api/rag/query -d '...'

# Database query time
psql $DATABASE_URL -c "SELECT COUNT(*) FROM users;" -t
```

---

## 13. Deployment Checklist (Go Live)

- [ ] CONSTITUTION.md reviewed
- [ ] ARCHITECTURE.md understood
- [ ] Docusaurus builds locally without errors
- [ ] Backend tests pass (pytest)
- [ ] All env vars set in GitHub Secrets & Vercel
- [ ] Database migrations applied
- [ ] Vector DB indexed with sample content
- [ ] GitHub Pages working
- [ ] Vercel API working
- [ ] Better-Auth signup/login tested
- [ ] RAG queries returning responses
- [ ] Urdu translation functional
- [ ] Personalization engine active
- [ ] CORS properly configured
- [ ] SSL/HTTPS enforced
- [ ] Monitoring + logging running
- [ ] Backups automated
- [ ] Team notified of deployment
- [ ] Domain DNS configured (if custom)
- [ ] Analytics collection started

---

## 14. Support

- **Vercel Docs**: https://vercel.com/docs
- **Neon Docs**: https://neon.tech/docs
- **Qdrant Docs**: https://qdrant.tech/documentation
- **Docusaurus Docs**: https://docusaurus.io/docs

---

**Deployment successful! You're live! 🚀**

For issues, check logs:
- Frontend: GitHub Actions → deploy-docs
- Backend: Vercel → Logs
- Database: Neon → Activity

