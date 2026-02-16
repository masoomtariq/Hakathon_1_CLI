# Physical AI & Humanoid Robotics - AI-Native Textbook Constitution

## Mission Statement
To create a revolutionary, AI-native educational platform that teaches Physical AI & Humanoid Robotics through intelligent personalization, multi-language support, and seamless human-AI interaction.

---

## Core Principles

### 1. **AI-Native Architecture**
- Every feature is designed with AI at the center, not as an afterthought
- Intelligent content adaptation based on user profile, learning patterns
- Real-time personalization powered by Claude and specialized agents
- RAG system for context-aware, accurate responses

### 2. **User-Centric Design**
- Better-Auth for secure, frictionless authentication
- Contextual user profiling via background questions
- Per-chapter personalization and translation controls
- Accessible to diverse learning styles and language preferences

### 3. **Production Excellence**
- Enterprise-grade security and scalability
- Zero technical debt in core systems
- Comprehensive error handling and monitoring
- Deployable to multiple platforms without code changes

### 4. **Open & Extensible**
- Clean, well-documented APIs
- Reusable Claude Subagents and Skills
- Modular architecture supporting future enhancements
- Community contributions ready structure

---

## Technical Stack

### Frontend
- **Framework**: Docusaurus 3.x with TypeScript
- **Styling**: Tailwind CSS (or theme specified by Spec-Kit Plus)
- **MDX**: For interactive content and React components
- **UI Components**: Custom components for personalization controls
- **State Management**: React Context + TanStack Query

### Backend
- **Core API**: FastAPI (Python 3.11+)
- **Database**: Neon PostgreSQL (serverless)
- **Vector Store**: Qdrant (self-hosted or cloud)
- **AI Models**: OpenAI (GPT-4/3.5), ChatKit SDK
- **Authentication**: Better-Auth with custom user schema
- **Task Queue**: Celery + Redis (for async processing)

### AI/ML Pipeline
- **LLM Orchestration**: Claude SDK + Subagents
- **RAG Framework**: LangChain or proprietary RAG pipeline
- **Vector Embeddings**: OpenAI embedding API
- **Content Generation Agent**: Custom agent with templates
- **Translation Agent**: Specialized Urdu translation with quality checks

### Infrastructure & DevOps
- **Frontend Hosting**: GitHub Pages (static) or Vercel (advanced)
- **API Hosting**: Vercel Functions, Fly.io, or Railway
- **Database**: Neon PostgreSQL (managed)
- **Vector DB**: Qdrant Cloud or self-hosted
- **CI/CD**: GitHub Actions
- **Monitoring**: Vercel analytics + custom logging
- **Version Control**: Git (GitHub)

---

## Project Structure

```
hakathon-1-cli/
├── CONSTITUTION.md                 # This file
├── ARCHITECTURE.md                 # Detailed technical architecture
├── DEPLOYMENT.md                   # Deployment guides
│
├── docs/                           # Docusaurus website
│   ├── docusaurus.config.ts        # Main config
│   ├── package.json                # Frontend dependencies
│   ├── tsconfig.json
│   ├── src/
│   │   ├── components/             # Custom React components
│   │   │   ├── RAGChatbot.tsx      # Embedded chatbot
│   │   │   ├── PersonalizeButton.tsx
│   │   │   ├── TranslateButton.tsx
│   │   │   ├── UserProfile.tsx
│   │   │   └── AuthGuard.tsx
│   │   ├── pages/                  # Custom pages
│   │   │   ├── index.tsx           # Homepage
│   │   │   ├── learn.tsx
│   │   │   └── chat.tsx
│   │   ├── css/                    # Styling
│   │   └── hooks/                  # Custom React hooks
│   │       ├── usePersonalization.ts
│   │       ├── useAuth.ts
│   │       └── useRAG.ts
│   ├── docs/                       # Content (MDX)
│   │   ├── intro.mdx
│   │   ├── chapter-1/
│   │   │   ├── index.mdx
│   │   │   └── advanced.mdx
│   │   ├── ... (chapter structure)
│   │   └── resources/
│   ├── static/                     # Static assets
│   └── speckit/                    # Spec-Kit Plus integration
│       ├── spec.json               # Spec definition
│       └── components.json         # Component mapping
│
├── backend/                        # FastAPI backend
│   ├── pyproject.toml
│   ├── requirements.txt
│   ├── .env.example
│   ├── main.py                     # FastAPI app
│   ├── config.py                   # Configuration
│   ├── app/
│   │   ├── __init__.py
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── auth.py
│   │   │   │   ├── rag.py
│   │   │   │   ├── personalization.py
│   │   │   │   ├── translation.py
│   │   │   │   └── chapters.py
│   │   │   └── deps.py             # Dependencies
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── chat.py
│   │   │   ├── personalization.py
│   │   │   └── schemas.py
│   │   ├── services/
│   │   │   ├── rag_service.py
│   │   │   ├── translation_service.py
│   │   │   ├── personalization_service.py
│   │   │   └── claude_agent_service.py
│   │   ├── agents/
│   │   │   ├── content_generator.py
│   │   │   ├── urdu_translator.py
│   │   │   └── personalization_agent.py
│   │   ├── db/
│   │   │   ├── database.py
│   │   │   ├── migrations/
│   │   │   └── schemas/
│   │   ├── vector/
│   │   │   ├── qdrant_client.py
│   │   │   └── embedding_service.py
│   │   └── middleware/
│   │       ├── auth.py
│   │       └── error_handler.py
│   └── tests/
│       ├── test_rag.py
│       ├── test_auth.py
│       └── test_agents.py
│
├── agents/                         # Claude Subagents & Skills
│   ├── content-generator/
│   │   ├── README.md
│   │   ├── agent.py
│   │   └── tools.py
│   ├── urdu-translator/
│   │   ├── README.md
│   │   ├── agent.py
│   │   └── quality_checker.py
│   └── personalization/
│       ├── README.md
│       ├── agent.py
│       └── profile_analyzer.py
│
├── .github/
│   ├── workflows/
│   │   ├── deploy-docs.yml          # Deploy docs to GitHub Pages
│   │   ├── deploy-api.yml           # Deploy API to Vercel
│   │   ├── test.yml                 # Run tests
│   │   └── build.yml                # Build checks
│   └── CODEOWNERS
│
├── docker/
│   ├── Dockerfile.backend
│   ├── Dockerfile.qdrant
│   └── docker-compose.yml
│
├── specs/                          # Spec-Kit Plus compliance
│   ├── spec-definition.json
│   ├── deployment-targets.json
│   └── integration-checklist.md
│
├── docs-archive/
│   ├── QUICK_START.md
│   ├── API_REFERENCE.md
│   ├── AGENT_DEVELOPMENT.md
│   ├── URDU_TRANSLATION_GUIDE.md
│   ├── PERSONALIZATION_SYSTEM.md
│   ├── RAG_IMPLEMENTATION.md
│   ├── SPEC_KIT_PLUS_INTEGRATION.md
│   └── DEPLOYMENT_CHECKLIST.md
│
├── scripts/
│   ├── setup-project.sh
│   ├── migrate-db.sh
│   ├── index-content.sh
│   └── seed-qdrant.sh
│
├── .env.example
├── .gitignore
├── package.json                    # Root monorepo config
├── pnpm-workspace.yaml             # PNPM workspace
└── README.md
```

---

## Core Feature Specifications

### 1. **RAG Chatbot System**
- **Location**: `backend/app/services/rag_service.py`
- **Frontend**: `docs/src/components/RAGChatbot.tsx`
- **Capabilities**:
  - Context-aware Q&A on chapter content
  - Real-time streaming responses
  - Source attribution
  - Multi-turn conversation
  - User session persistence
  - Feedback mechanism for quality improvement

### 2. **User Authentication & Profiling**
- **Tech**: Better-Auth (Postgres store in Neon)
- **User Model**: Extends base auth with:
  - `preferred_language` (English, Urdu)
  - `learning_style` (visual, kinesthetic, reading, etc.)
  - `robotics_experience` (beginner, intermediate, advanced)
  - `background_domain` (software, mechanical, AI, etc.)
  - `personalization_preferences` (Boolean flags)
  - `completed_chapters` (array of IDs)
  - `learning_journey` (JSON for ML insights)

### 3. **Personalization Engine**
- **Agent**: Claude Subagent in `agents/personalization/`
- **Triggers**:
  - Per-chapter button: "Personalize Content"
  - First-time setup: Background questionnaire
  - Every 5 chapters: Profile refresh
- **Personalization Dimensions**:
  - Content depth adjustment (overview → detailed)
  - Example selection (academic vs. industry)
  - Pace and difficulty
  - Visual aids selection
  - Prerequisite flagging

### 4. **Urdu Translation System**
- **Agent**: Claude Subagent + specialized prompt engineering
- **Workflow**:
  1. User clicks "Translate to Urdu" button
  2. Request sent to backend translation service
  3. Claude Subagent translates with context awareness
  4. Quality checker validates terminology consistency
  5. Cached result served to user
  6. Glossary updated for term consistency
- **Quality Assurance**:
  - Technical term verification against glossary
  - Cultural appropriateness checking
  - Readability score validation
  - Caching for performance

### 5. **Content Generation Pipeline**
- **Agent**: Content generator Subagent
- **Uses**: Raw subject matter expert input → RAG index
- **Capabilities**:
  - Generate chapter variations for different audiences
  - Create practice problems aligned to content
  - Generate MCQs with difficulty levels
  - Create visual descriptions for markdown
  - Generate glossary terms automatically

### 6. **Spec-Kit Plus Integration**
- **Spec Definition**: `specs/spec-definition.json`
- **Deployment Targets**:
  - GitHub Pages (static export)
  - Vercel (full stack)
- **Structure Compliance**:
  - Consistent metadata for all pages
  - Built-in analytics hooks
  - SEO-friendly structure
  - Theme variable system

---

## Development Workflow

### 1. **Local Development**
```bash
# Install dependencies
pnpm install

# Start Docusaurus dev server
cd docs && pnpm dev

# In another terminal, start FastAPI server
cd backend && python -m uvicorn main:app --reload

# Start Qdrant locally (Docker)
docker run -p 6333:6333 qdrant/qdrant
```

### 2. **Content Addition**
- Add MDX files to `docs/docs/`
- Use predefined components for interactive elements
- Ensure proper frontmatter metadata
- Validate with build process

### 3. **Agent Development**
- Clone agent template
- Implement custom tools using Claude SDK
- Test with mock data
- Deploy as Vercel Function or FastAPI endpoint

### 4. **Database Migrations**
```bash
cd backend
alembic revision --autogenerate -m "description"
alembic upgrade head
```

---

## Deployment Strategy

### Frontend (Docs)
- **Primary**: GitHub Pages (static, fast, free)
- **Alternative**: Vercel (with ISR, previews, edge functions)
- **Build Trigger**: Every merge to `main`

### Backend (API)
- **Primary**: Vercel Functions or Railway.app
- **Database**: Neon PostgreSQL (serverless, auto-scaling)
- **Vector DB**: Qdrant Cloud managed service
- **Hot Reload**: Instant without downtime

### Environment Management
- `.env.local` for development
- `.env.production` for production
- Secrets in GitHub Actions
- No credentials in code ever

---

## Quality Assurance Standards

### Code Quality
- **Linting**: ESLint (TS/React), Ruff (Python)
- **Formatting**: Prettier, Black
- **Type Checking**: TypeScript strict mode, Mypy
- **Testing**: 
  - Unit: Jest (frontend), pytest (backend)
  - Integration: Testing Library (React), httpx (API)
  - E2E: Playwright

### Content Quality
- **Review**: SME review before publication
- **Accuracy**: Fact-checked against latest research
- **Accessibility**: WCAG 2.1 AA compliance
- **Urdu**: Native speaker review + quality metrics

### Performance Targets
- **Docs Build**: < 60 seconds
- **Page Load**: < 2 seconds (First Contentful Paint)
- **API Response**: < 500ms (p95)
- **RAG Search**: < 1000ms
- **Translation**: < 3000ms (with caching ~200ms)

---

## Security Policies

### Authentication & Authorization
- Better-Auth for JWT + refresh tokens
- Role-based access control (Student, Instructor, Admin)
- HTTPS everywhere
- CORS configured per environment

### Data Privacy
- User data encrypted at rest in Neon
- PII minimal collection (email + profile)
- GDPR-compliant data deletion
- Audit logs for sensitive operations

### API Security
- Rate limiting (100 req/min per IP)
- Input validation on all endpoints
- SQL injection prevention (parameterized queries)
- CSRF protection on state-changing operations

---

## Performance Optimization

### Frontend
- Static site generation (Docusaurus)
- Code splitting by chapter
- Image optimization (WebP)
- Service Worker for offline chapters
- CDN caching (GitHub Pages/Vercel)

### Backend
- Database query optimization (indexes, caching)
- Redis layer for session + frequent queries
- Async processing for heavy tasks
- Batch embedding generation
- Vector similarity search optimization (Qdrant)

### RAG System
- Pre-computed embeddings (offline)
- Hybrid search (lexical + semantic)
- Result caching (Redis)
- Adaptive retrieval (top-k based on query quality)

---

## Monitoring & Analytics

### Logging
- Structured logging (JSON format)
- Sentry for error tracking
- Request tracing (unique IDs)
- Audit trail for user actions

### Metrics
- Page view analytics
- Engagement per chapter
- RAG query success rate
- Translation request volume
- User retention cohort analysis
- API endpoint performance

### Alerting
- API downtime notifications
- Error rate thresholds
- Database connection pool warnings
- Qdrant disk space monitoring

---

## Maintenance & Updates

### Content Updates
- Rolling content updates (no full rebuild)
- Version history for chapters
- Deprecation warnings for outdated sections
- Changelog maintained

### Dependencies
- Monthly security updates
- Quarterly major version reviews
- Changelogs documented
- Breaking changes tested in staging

### Scaling
- Horizontal scaling for API (Vercel auto)
- Database optimization for growing data
- Vector DB sharding strategy
- CDN configuration for traffic spikes

---

## Success Metrics

### Educational Effectiveness
- User completion rate > 70%
- RAG chatbot helpfulness rating > 4.5/5
- Pre/post quiz score improvement > 20%
- User retention after 30 days > 60%

### Technical Performance
- 99.9% API uptime SLA
- Page load time < 2s (p95)
- RAG response quality score (BLEU) > 0.70
- Translation accuracy score > 0.85

### Business Metrics
- Monthly active users tracking
- Feature adoption rates
- User NPS score > 50
- Cost per active user < $0.01

---

## Governance & Contribution

### Decision Making
- Technical decisions: RFCs in GitHub Discussions
- Content approvals: SME + pedagogical review
- Infrastructure: DevOps team + lead approval
- Breaking changes: Stakeholder consensus

### Contribution Guidelines
- Pull requests with detailed descriptions
- Commits following Conventional Commits
- Review requirement: 2 approvals for main
- CI/CD must pass before merge

### License & Attribution
- Project: Apache 2.0
- Content: Creative Commons CC-BY-4.0
- Third-party: Properly attributed in docs
- Contributor recognition: In CONTRIBUTORS.md

---

## Success Criteria for MVP

- [ ] Docusaurus 3 site with TypeScript builds successfully
- [ ] Better-Auth integrated with user profiling
- [ ] FastAPI backend with Neon PostgreSQL connected
- [ ] Qdrant vector DB operational with sample embeddings
- [ ] RAG chatbot functional in docs with streaming responses
- [ ] Content generator agent creating variations
- [ ] Urdu translator agent with quality checks
- [ ] Personalization engine functioning
- [ ] Chapter buttons (Personalize, Translate) working
- [ ] Spec-Kit Plus compatibility verified
- [ ] GitHub Actions CI/CD pipeline running
- [ ] Deployable to GitHub Pages + Vercel
- [ ] Comprehensive README and developer documentation
- [ ] Zero production console errors

---

## Next Steps

1. **Environment Setup** → QUICK_START.md
2. **Architecture Deep Dive** → ARCHITECTURE.md
3. **Agent Development** → AGENT_DEVELOPMENT.md
4. **Deployment** → DEPLOYMENT.md
5. **Go Live Checklist** → Deployment CHECKLIST.md

---

*Last Updated: February 2026*
*Maintained by: AI-Native Textbook Team*
