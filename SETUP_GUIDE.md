# Project Setup & Implementation Guide

This document provides step-by-step instructions for implementing the complete Physical AI & Humanoid Robotics textbook project.

---

## Phase 1: Project Initialization (Week 1)

### Step 1.1: Create Project Structure

```bash
cd /workspaces/Hakathon_1_CLI

# Create root configuration files (already done above)
# Constitution, Architecture, Deployment, and Spec guides created

# Create directory structure
mkdir -p docs/{docs,src/{components,hooks,css,pages},static,speckit}
mkdir -p backend/{app/{api/routes,models,services,agents,db,vector,middleware},tests}
mkdir -p agents/{content-generator,urdu-translator,personalization}
mkdir -p scripts
mkdir -p specs
mkdir -p docker
mkdir -p .github/workflows
```

### Step 1.2: Create Root Package Files

**File**: `/workspaces/Hakathon_1_CLI/package.json`

```json
{
  "name": "physical-ai-textbook",
  "version": "0.1.0",
  "description": "AI-native textbook on Physical AI & Humanoid Robotics",
  "private": true,
  "author": "Your Team",
  "license": "Apache-2.0",
  "workspaces": [
    "docs",
    "agents/*"
  ],
  "scripts": {
    "install-all": "pnpm install",
    "dev": "pnpm -r --parallel dev",
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "lint": "pnpm -r lint",
    "format": "prettier --write '**/*.{ts,tsx,md,json}'",
    "validate": "pnpm run validate:metadata && pnpm run test",
    "validate:metadata": "ts-node scripts/validate-metadata.ts"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "typescript": "^5.0.0",
    "ts-node": "^10.0.0"
  }
}
```

**File**: `/workspaces/Hakathon_1_CLI/.gitignore`

```
# Dependencies
node_modules/
venv/
__pycache__/
.Python
*.egg-info/

# Environment
.env
.env.local
.env.*.local

# Build outputs
dist/
build/
docs/build/
docs/.docusaurus/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Testing
.coverage/
htmlcov/
.pytest_cache/

# Logs
*.log
npm-debug.log*

# Optional npm cache
.npm

# OS
.DS_Store
Thumbs.db

# Archives
*.zip
*.tar.gz
```

---

## Phase 2: Frontend Setup (Week 1-2)

### Step 2.1: Initialize Docusaurus

```bash
cd docs

# Create package.json
cat > package.json << 'EOF'
{
  "name": "@physical-ai/docs",
  "version": "0.1.0",
  "private": true,
  "description": "Documentation site",
  "homepage": "https://masoomtariq.github.io/Hakathon_1_CLI/",
  "scripts": {
    "dev": "docusaurus start --port 3000",
    "start": "docusaurus start",
    "build": "docusaurus build",
    "serve": "docusaurus serve",
    "deploy": "docusaurus deploy",
    "validate:metadata": "ts-node ../scripts/validate-metadata.ts",
    "lint": "eslint . --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@docusaurus/core": "3.x",
    "@docusaurus/preset-classic": "3.x",
    "@docusaurus/plugin-ideal-image": "3.x",
    "@docusaurus/plugin-pwa": "3.x",
    "@docusaurus/theme-search-algolia": "3.x",
    "@mdx-js/react": "^2.x",
    "clsx": "^2.x",
    "prism-react-renderer": "^2.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "better-auth": "^1.x",
    "@tanstack/react-query": "^5.x",
    "axios": "^1.x"
  },
  "devDependencies": {
    "@types/react": "^18.x",
    "@types/react-dom": "^18.x",
    "@typescript-eslint/eslint-plugin": "^6.x",
    "@typescript-eslint/parser": "^6.x",
    "eslint": "^8.x",
    "prettier": "^3.x",
    "typescript": "^5.x",
    "tailwindcss": "^3.x"
  }
}
EOF
```

### Step 2.2: Create Docusaurus Configuration

**File**: `docs/docusaurus.config.ts`

```typescript
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'An AI-Native Educational Platform',
  favicon: 'img/favicon.ico',
  url: 'https://masoomtariq.github.io',
  baseUrl: '/Hakathon_1_CLI/',
  organizationName: 'masoomtariq',
  projectName: 'Hakathon_1_CLI',
  deploymentBranch: 'gh-pages',
  
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/masoomtariq/Hakathon_1_CLI/tree/main/docs',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    navbar: {
      title: 'Physical AI',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          label: 'Learn',
          position: 'left',
        },
        {
          href: 'https://github.com/masoomtariq/Hakathon_1_CLI',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/masoomtariq/Hakathon_1_CLI',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Physical AI. CC-BY-4.0`,
    },
    prism: {
      theme: require('prism-react-renderer').themes.github,
      darkTheme: require('prism-react-renderer').themes.dracula,
      additionalLanguages: ['python', 'bash', 'json'],
    },
  },

  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        disableInlineGeneration: false,
      },
    ],
  ],
};

export default config;
```

### Step 2.3: Create TypeScript Configuration

**File**: `docs/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "build", ".docusaurus"]
}
```

### Step 2.4: Create Initial Components

**File**: `docs/src/hooks/useAuth.ts`

```typescript
import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  preferences?: {
    learning_style?: string;
    robotics_experience?: string;
  };
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check session on mount
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/me`,
        { credentials: 'include' }
      );
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (err) {
      console.error('Session check failed:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(email: string, password: string) {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        }
      );
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setError('Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    await fetch(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
  }

  return { user, isLoading, error, login, logout, checkSession };
}
```

**File**: `docs/src/hooks/useRAG.ts`

```typescript
import { useState, useCallback } from 'react';

interface Message {
  id: string;
  query: string;
  response: string;
  citations: { title: string; url: string }[];
  timestamp: string;
}

export function useRAG(chapterId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendQuery = useCallback(
    async (query: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/rag/query`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              query,
              chapter_id: chapterId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error('RAG query failed');
        }

        const data = await response.json();
        const newMessage: Message = {
          id: Date.now().toString(),
          query,
          response: data.response,
          citations: data.citations || [],
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, newMessage]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    },
    [chapterId]
  );

  return {
    messages,
    isLoading,
    error,
    sendQuery,
    clearHistory: () => setMessages([]),
  };
}
```

### Step 2.5: Create Initial Content

**File**: `docs/docs/intro.mdx`

```mdx
---
title: "Welcome to Physical AI & Humanoid Robotics"
sidebar_label: "Welcome"
id: "intro"
slug: "/"
audience: ["beginner", "intermediate", "advanced"]
duration_minutes: 10
language: "en"
last_updated: "2026-02-16"
learning_objectives:
  - "Understand what this course covers"
  - "Get started with the platform"
keywords: ["robotics", "AI", "learning"]
personalization_enabled: true
translation_enabled: true
---

# Welcome to Physical AI & Humanoid Robotics

This is an **AI-native educational platform** combining learner intelligence with cutting-edge robotics content.

## What You'll Learn

- 🤖 Fundamentals of humanoid robotics
- 🧠 AI integration in robotic systems
- 🔧 Practical hands-on implementations
- 🌍 Real-world applications

## Course Features

✨ **Adaptive Learning** - Content personalizes to your experience level
🌐 **Multi-Language** - Available in English and Urdu
💬 **AI Tutor** - Ask questions anytime (RAG-powered chatbot)
📊 **Progress Tracking** - Track your learning journey

Get started with [Chapter 1: Introduction](/docs/chapter-1).
```

---

## Phase 3: Backend Setup (Week 2-3)

### Step 3.1: Python Project Setup

**File**: `backend/pyproject.toml`

```toml
[build-system]
requires = ["setuptools>=65.0"]
build-backend = "setuptools.build_meta"

[project]
name = "physical-ai-api"
version = "0.1.0"
description = "FastAPI backend for Physical AI textbook"
requires-python = ">=3.11"
authors = [
  {name = "Team", email = "team@example.com"},
]
dependencies = [
  "fastapi==0.104.1",
  "uvicorn[standard]==0.24.0",
  "sqlalchemy==2.0.23",
  "psycopg2-binary==2.9.9",
  "pydantic==2.5.0",
  "pydantic-settings==2.1.0",
  "python-jose[cryptography]==3.3.0",
  "passlib[bcrypt]==1.7.4",
  "python-multipart==0.0.6",
  "aiohttp==3.9.1",
  "anthropic==0.7.0",
  "openai==1.3.0",
  "qdrant-client==2.7.0",
  "alembic==1.12.1",
  "python-dotenv==1.0.0",
  "structlog==23.2.0",
  "httpx==0.25.2",
]

[project.optional-dependencies]
dev = [
  "pytest==7.4.3",
  "pytest-asyncio==0.21.1",
  "pytest-cov==4.1.0",
  "black==23.12.0",
  "ruff==0.1.8",
  "mypy==1.7.1",
]
```

**File**: `backend/requirements.txt`

```
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
pydantic==2.5.0
pydantic-settings==2.1.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
aiohttp==3.9.1
anthropic==0.7.0
openai==1.3.0
qdrant-client==2.7.0
alembic==1.12.1
python-dotenv==1.0.0
structlog==23.2.0
httpx==0.25.2
```

### Step 3.2: Create FastAPI Main App

**File**: `backend/main.py`

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
import os

app = FastAPI(
    title="Physical AI & Robotics API",
    description="AI-native textbook backend",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://masoomtariq.github.io",
        os.getenv("FRONTEND_URL", "http://localhost:3000"),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "0.1.0"}

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Physical AI & Robotics API",
        "docs": "/docs",
        "version": "0.1.0"
    }

# Error handlers
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logging.error(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
```

### Step 3.3: Configuration

**File**: `backend/config.py`

```python
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Environment
    environment: str = "development"
    debug: bool = True
    
    # Database
    database_url: str
    
    # Vector DB
    qdrant_url: str
    qdrant_api_key: Optional[str] = None
    
    # LLM
    openai_api_key: str
    anthropic_api_key: str
    
    # Auth
    secret_key: str
    jwt_algorithm: str = "HS256"
    jwt_expiration_hours: int = 24
    
    # Server
    api_url: str = "http://localhost:8000"
    frontend_url: str = "http://localhost:3000"
    
    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()
```

**File**: `backend/.env.example`

```
ENVIRONMENT=development
DEBUG=true

DATABASE_URL=postgresql://user:password@localhost/physical_ai
QDRANT_URL=http://localhost:6333
QDRANT_API_KEY=

OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

SECRET_KEY=your-secret-key-here
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24

API_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
```

---

## Phase 4: Database Setup (Week 2)

### Step 4.1: Alembic Migrations

```bash
cd backend
alembic init migrations
```

**File**: `backend/migrations/env.py`

```python
from sqlalchemy import engine_from_config, pool
from alembic import context
import os
from config import settings

config = context.config
config.set_main_option("sqlalchemy.url", settings.database_url)

def run_migrations_online():
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata={})
        
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
```

### Step 4.2: Database Models

**File**: `backend/app/models/user.py`

```python
from sqlalchemy import Column, String, DateTime, Boolean, UUID
from sqlalchemy.orm import declarative_base
from datetime import datetime
import uuid

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID, primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    name = Column(String, nullable=True)
    
    # Preferences
    preferred_language = Column(String, default="en")
    learning_style = Column(String, nullable=True)
    robotics_experience = Column(String, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)
```

---

## Phase 5: Documentation & README

**File**: `/workspaces/Hakathon_1_CLI/README.md`

```markdown
# Physical AI & Humanoid Robotics - AI-Native Textbook

An intelligent educational platform combining Docusaurus 3, FastAPI, Claude AI, and advanced personalization.

## 📚 Documentation

- **[CONSTITUTION.md](CONSTITUTION.md)** - Project mission, principles, and vision
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical architecture and components
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment guides for all platforms
- **[SPEC_KIT_PLUS_INTEGRATION.md](SPEC_KIT_PLUS_INTEGRATION.md)** - Spec-Kit validation
- **[QUICK_START.md](QUICK_START.md)** - Get started in 5 minutes

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start dev servers
pnpm dev

# Build for production
pnpm build
```

## 📋 Project Structure

```
├── docs/                 # Docusaurus frontend
├── backend/             # FastAPI backend
├── agents/             # Claude Subagents
├── specs/              # Spec-Kit Plus integration
└── .github/workflows/  # CI/CD pipelines
```

## 🎯 Key Features

- 📖 AI-native educational platform
- 🤖 RAG-powered chatbot
- 🎯 Adaptive personalization
- 🌍 Urdu translation
- 🔐 Secure authentication
- 📊 Progress tracking

## 🛠 Tech Stack

**Frontend**: Docusaurus 3, React, TypeScript, Tailwind CSS
**Backend**: FastAPI, PostgreSQL, Qdrant, OpenAI, Claude
**Infrastructure**: GitHub Pages, Vercel, Neon, Docker

## 📖 Learning Path

1. Read [CONSTITUTION.md](CONSTITUTION.md) for project overview
2. Follow [QUICK_START.md](QUICK_START.md) to set up locally
3. Explore [ARCHITECTURE.md](ARCHITECTURE.md) for technical details
4. Check [DEPLOYMENT.md](DEPLOYMENT.md) for production rollout

## 🤝 Contributing

- Follow [CONSTITUTION.md](CONSTITUTION.md) principles
- Ensure Spec-Kit Plus compliance
- Pass CI/CD checks before merge
- Update documentation with changes

## 📝 License

- **Code**: Apache 2.0
- **Content**: CC-BY-4.0
- See [LICENSE](LICENSE) for details

## 📧 Support

For questions about:
- **Architecture**: See [ARCHITECTURE.md](ARCHITECTURE.md)
- **Deployment**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Setup**: See [QUICK_START.md](QUICK_START.md)
- **Spec**: See [SPEC_KIT_PLUS_INTEGRATION.md](SPEC_KIT_PLUS_INTEGRATION.md)

---

**Built with ❤️ by the AI-Native Education Team**
```

---

## Phase 6: GitHub Actions CI/CD

**File**: `.github/workflows/deploy-docs.yml`

[See DEPLOYMENT.md for full workflow]

**File**: `.github/workflows/test.yml`

[See DEPLOYMENT.md for full workflow]

---

## Phase 7: Docker Setup

**File**: `docker/docker-compose.yml`

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: ${DB_USER:-postgres}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-postgres}
      POSTGRES_DB: ${DB_NAME:-physical_ai}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"
    volumes:
      - qdrant_storage:/qdrant/storage

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
  qdrant_storage:
```

---

## Next Steps

1. **Phase 1**: ✅ Complete (structure created)
2. **Phase 2**: Create React components (RAGChatbot, Personalize, Translate buttons)
3. **Phase 3**: Implement FastAPI endpoints (routes for auth, RAG, translation)
4. **Phase 4**: Connect Neon PostgreSQL and run migrations
5. **Phase 5**: Integrate Qdrant vector DB
6. **Phase 6**: Test locally, then deploy to GitHub Pages + Vercel
7. **Phase 7**: Add content chapters and validate with Spec-Kit

---

## Success Criteria

- ✅ All documentation files created
- ✅ Project structure initialized
- ⏳ Frontend components implemented
- ⏳ Backend API working
- ⏳ Database connected
- ⏳ Deployed to production

See [CONSTITUTION.md](CONSTITUTION.md) for complete success criteria.

```

