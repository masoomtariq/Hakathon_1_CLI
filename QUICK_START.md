# Quick Start Guide - Physical AI & Humanoid Robotics Textbook

## 5-Minute Overview

This is an **AI-native educational platform** combining:
- 📚 Docusaurus 3 (learning platform)
- 🤖 Claude + FastAPI (intelligent backend)
- 💬 RAG chatbot (contextual Q&A)
- 🌍 Urdu translation (localization)
- 🎯 Personalization (adaptive learning)
- 🔐 Better-Auth (secure login)

---

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **Python** 3.11+
- **pnpm** or npm/yarn
- **Git**
- **OpenAI API Key** (GPT-4 access)
- **Neon PostgreSQL** account (free tier available)
- **Qdrant** local Docker or cloud instance

---

## 1. Clone & Install

```bash
# Clone repository
git clone https://github.com/masoomtariq/Hakathon_1_CLI.git
cd Hakathon_1_CLI

# Install monorepo dependencies
pnpm install

# Create .env files (see below)
cp docs/.env.example docs/.env.local
cp backend/.env.example backend/.env
```

---

## 2. Environment Setup

### Frontend (.env in `docs/`)
```
REACT_APP_API_URL=http://localhost:8000
REACT_APP_QDRANT_URL=http://localhost:6333
REACT_APP_OPENAI_KEY=sk-...
```

### Backend (`.env` in `backend/`)
```
# Database
DATABASE_URL=postgresql://user:password@db.neon.tech/dbname

# Vector DB
QDRANT_URL=http://localhost:6333
QDRANT_API_KEY=your-key-here

# LLM
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Auth
SECRET_KEY=your-secret-random-string
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24

# Server
ENVIRONMENT=development
DEBUG=true
LOG_LEVEL=DEBUG
```

---

## 3. Start Services Locally

### Option A: Docker (Recommended)

```bash
# Start all services
docker-compose -f docker/docker-compose.yml up -d

# Verify services
docker ps
# Should show: postgres, qdrant, redis (optional)
```

### Option B: Manual Setup

#### PostgreSQL (Neon)
```bash
# Create free account at https://console.neon.tech
# Connection string: postgresql://[user]:[password]@[host]/[database]
```

#### Qdrant Vector DB
```bash
# Start locally with Docker
docker run -p 6333:6333 qdrant/qdrant

# Or use Qdrant Cloud at https://cloud.qdrant.io
```

---

## 4. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
alembic upgrade head

# Start server
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Server should be running at `http://localhost:8000`

Check API docs: `http://localhost:8000/docs`

---

## 5. Frontend Setup

```bash
cd docs

# Install dependencies (if not done in step 1)
pnpm install

# Start dev server
pnpm start
```

Site should be running at `http://localhost:3000`

---

## 6. Verify Integration

### Test Authentication
```bash
# 1. Go to http://localhost:3000
# 2. Click "Sign Up"
# 3. Create account with email/password
# 4. Should redirect to dashboard

# 2. Backend check
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Test RAG Chatbot
```bash
# 1. Open http://localhost:3000/docs/chapter-1
# 2. Click "Ask AI" or RAG chatbot widget
# 3. Type question: "What is physical AI?"
# 4. Should get streaming response

# Or test via API
curl -X POST http://localhost:8000/api/rag/query \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is humanoid robotics?",
    "user_context": {
      "learning_style": "visual",
      "robotics_experience": "beginner"
    }
  }'
```

### Test Translation
```bash
# 1. Open a chapter
# 2. Click "Translate to Urdu"
# 3. Wait 2-5 seconds
# 4. Should display Urdu text

# Or test via API
curl -X POST http://localhost:8000/api/translation/urdu \
  -H "Content-Type: application/json" \
  -d '{
    "chapter_id": "intro",
    "content": "Physical AI combines robotics with artificial intelligence."
  }'
```

### Test Personalization
```bash
# 1. Login first
# 2. Answer profile questions during onboarding
# 3. Click chapter's "Personalize Content" button
# 4. See content adapted to your learning style
```

---

## 7. Project Structure

```
├── docs/                    # Docusaurus frontend
│   ├── docs/               # MDX chapter content
│   ├── src/                # React components
│   │   ├── components/     # RAGChatbot, PersonalizeButton, etc.
│   │   └── hooks/          # useAuth, usePersonalization, useRAG
│   └── package.json
│
├── backend/                # FastAPI server
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── services/       # Business logic
│   │   ├── agents/         # Claude Subagents
│   │   ├── models/         # DB schemas
│   │   └── vector/         # Qdrant integration
│   ├── main.py
│   └── requirements.txt
│
├── agents/
│   ├── personalization/    # Personalization Subagent
│   ├── urdu-translator/    # Translation Subagent
│   └── content-generator/  # Content generation Subagent
│
└── specs/                  # Spec-Kit Plus integration
```

---

## 8. Next Steps

### Add Content
```bash
# Create chapter 1
mkdir -p docs/docs/chapter-1
cat > docs/docs/chapter-1/index.mdx << 'EOF'
---
title: "Chapter 1: Introduction to Humanoid Robotics"
sidebar_label: "Introduction"
---

# Introduction to Humanoid Robotics

Content here...
EOF
```

### Index for RAG
```bash
cd backend
python -c "
from app.services.rag_service import RAGService
rag = RAGService()
rag.index_chapter('chapter-1', 'content here...')
"
```

### Deploy to GitHub Pages
```bash
cd docs
pnpm run build
pnpm run deploy  # Pushes to gh-pages branch
```

### Deploy API to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy backend
cd backend
vercel

# Configure environment variables in Vercel dashboard
```

---

## 9. Common Issues & Fixes

### Issue: "Module not found" in Python
**Fix**: Ensure you're in virtual environment
```bash
source venv/bin/activate
pip install -r requirements.txt
```

### Issue: Qdrant connection refused
**Fix**: Start Qdrant Docker container
```bash
docker run -p 6333:6333 qdrant/qdrant
```

### Issue: JWT token invalid
**Check**:
1. SECRET_KEY matches in backend .env
2. Token not expired
3. Authorization header format: `Bearer YOUR_TOKEN`

### Issue: Translation taking too long
**Check**:
1. ANTHROPIC_API_KEY is set
2. API quota not exceeded
3. Check backend logs: `docker logs <container-id>`

### Issue: Docusaurus build fails
**Fix**:
```bash
cd docs
rm -rf .docusaurus build node_modules
pnpm install
pnpm build
```

---

## 10. Key Features to Explore

### RAG Chatbot
- Location: `docs/src/components/RAGChatbot.tsx`
- Try asking context-aware questions
- Sources displayed below responses

### Personalization
- Click "Personalize Content" on any chapter
- See content depth adjust based on profile
- Examples swap to match your learning style

### Urdu Translation
- Click "Translate to Urdu" on chapters
- Instant cached translations
- Quality score displayed

### User Profiles
- Complete onboarding questionnaire
- Track learning progress
- Adjust preferences in settings

---

## 11. Architecture Visualized

```
User Browser
    ↓
Docusaurus 3 (Next.js-like SPA)
    ├─ Chapter pages (MDX)
    ├─ RAG Chatbot component
    ├─ Personalize button
    └─ Translate button
    ↓
FastAPI Backend
    ├─ /api/auth/*         (Better-Auth)
    ├─ /api/rag/*          (RAG queries)
    ├─ /api/personalization/*
    ├─ /api/translation/*
    └─ /api/chapters/*
    ↓
Neon PostgreSQL
    ├─ users
    ├─ chat_messages
    ├─ translations_cache
    └─ personalization_logs
    ↓
Qdrant Vector DB
    └─ Embedded chapters
    ↓
OpenAI + Claude
    ├─ GPT-4 for RAG responses
    └─ Claude for personalization/translation
```

---

## 12. Health Check

Run this to verify everything is connected:

```bash
cat > /tmp/health_check.sh << 'EOF'
#!/bin/bash

echo "🔍 Checking Physical AI Textbook Setup..."
echo

# Check Node.js
node -v && echo "✅ Node.js installed" || echo "❌ Node.js missing"

# Check Python
python3 -v && echo "✅ Python installed" || echo "❌ Python missing"

# Check services
echo -n "🌐 Frontend: "
curl -s http://localhost:3000 > /dev/null && echo "✅ Running" || echo "❌ Down"

echo -n "⚙️  Backend: "
curl -s http://localhost:8000/docs > /dev/null && echo "✅ Running" || echo "❌ Down"

echo -n "🔍 Qdrant: "
curl -s http://localhost:6333/health > /dev/null && echo "✅ Running" || echo "❌ Down"

echo -n "🗄️  Database: "
# Test connection
python3 << 'PYEOF'
import psycopg2
try:
    psycopg2.connect(os.getenv('DATABASE_URL'))
    print("✅ Connected")
except:
    print("❌ Not connected")
PYEOF

echo
echo "🚀 Setup ready!" || echo "⚠️  Fix issues above"
EOF

bash /tmp/health_check.sh
```

---

## 13. Support & Documentation

- **Full Architecture**: See [ARCHITECTURE.md](ARCHITECTURE.md)
- **Constitution**: See [CONSTITUTION.md](CONSTITUTION.md)
- **Deployment**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **API Docs**: http://localhost:8000/docs (Swagger UI)
- **Docusaurus Docs**: https://docusaurus.io
- **Better-Auth Docs**: https://better-auth.com
- **Claude SDK**: https://github.com/anthropics/anthropic-sdk-python

---

## 14. What to Code First

**Priority 1 (MVP)**:
1. ✅ Set up repo structure
2. 🔄 Create Docusaurus site with 2-3 chapters
3. 🔄 Connect Better-Auth
4. 🔄 RAG service with sample data
5. 🔄 RAG chatbot component

**Priority 2 (Polish)**:
1. 🔄 Urdu translation agent
2. 🔄 Personalization engine
3. 🔄 Quality improvements

**Priority 3 (Launch)**:
1. 🔄 CI/CD pipelines
2. 🔄 Deploy to GitHub Pages + Vercel
3. 🔄 Monitoring & analytics

---

## Quick Command Reference

```bash
# Development
pnpm install                          # Install all deps
cd docs && pnpm start                # Frontend dev
cd backend && python -m uvicorn main:app --reload  # Backend dev

# Building
pnpm run build                        # Build all
cd docs && pnpm build                # Build docs
cd backend && pytest                  # Test backend

# Deployment
cd docs && pnpm deploy               # GitHub Pages
vercel deploy                        # Vercel (API)

# Database
alembic upgrade head                 # Run migrations
alembic revision -m "message"        # New migration

# Docker
docker-compose up -d                 # Start services
docker-compose down                  # Stop services
```

---

**Ready to build something amazing? Let's go! 🚀**

For detailed setup, see the [docs-archive/DEPLOYMENT.md](docs-archive/DEPLOYMENT.md) file.
