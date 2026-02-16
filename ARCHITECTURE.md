# Physical AI & Humanoid Robotics - Architecture Documentation

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND LAYER                              │
│  Docusaurus 3 (TypeScript) + React + MDX + Tailwind            │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │ Chapter Viewer   │  │ RAG Chatbot     │  │ User Dashboard │  │
│  │ - TOC           │  │ - Query input   │  │ - Profile      │  │
│  │ - MDX render    │  │ - Streaming resp│  │ - Progress     │  │
│  │ - Toolbar       │  │ - Citations     │  │ - Settings     │  │
│  └──────────────────┘  └─────────────────┘  └────────────────┘  │
│         │                      │                     │            │
│         │ usePersonalization() │ useRAG()           │ useAuth()   │
│         └──────────┬───────────┴──────────────────┬─────────────┘
└──────────────────────────────────────────────────────────────────┘
                      │
         ┌────────────┼────────────┐
         │            │            │
    ┌────▼────┐  ┌───▼───┐  ┌────▼────┐
    │ REST    │  │ WS    │  │ Auth    │
    │ API     │  │ Chat  │  │ Tokens  │
    └────┬────┘  └───┬───┘  └────┬────┘
         │           │            │
┌────────▼───────────▼────────────▼─────────────┐
│          BACKEND API LAYER (FastAPI)          │
├───────────────────────────────────────────────┤
│ ┌──────────────┐  ┌──────────────────────┐  │
│ │ Auth Service │  │ RAG Service          │  │
│ │ - Register/  │  │ - Query embedding    │  │
│ │   Login      │  │ - Vector search      │  │
│ │ - Refresh    │  │ - Response gen       │  │
│ │ - SSO        │  │ - Streaming output   │  │
│ └──────────────┘  └──────────────────────┘  │
│ ┌──────────────────────────────────────────┐  │
│ │ Personalization Service                  │  │
│ │ - Fetch user profile                     │  │
│ │ - Generate personalized content          │  │
│ │ - A/B test variants                      │  │
│ └──────────────────────────────────────────┘  │
│ ┌──────────────────────────────────────────┐  │
│ │ Translation Service                      │  │
│ │ - Queue translation tasks                │  │
│ │ - Cache translations                     │  │
│ │ - Quality validation                     │  │
│ └──────────────────────────────────────────┘  │
└──────┬──────────────┬──────────────┬──────────┘
       │              │              │
    ┌──▼──┐      ┌──▼──┐       ┌──▼──┐
    │ DB  │      │Vector│      │ Task│
    │     │      │ DB   │      │Queue│
    └─────┘      └──────┘      └─────┘
```

---

## Component Deep Dives

### 1. FRONTEND ARCHITECTURE

#### A. Docusaurus Configuration (`docs/docusaurus.config.ts`)
```typescript
// Key configuration points:
- baseUrl: "https://domain.com/" for GitHub Pages
- presets: [
    {
      'classic': {
        docs: { path: 'docs', ... },
        blog: { ... },
        theme: { customCss: [...], },
      },
    },
  ]
- themes: ['@docusaurus/theme-search-algolia'] // for search
- plugins: [
    ['@docusaurus/plugin-ideal-image', {}],
    ['@docusaurus/plugin-pwa', {}],  // offline support
  ]
- markdown: {
    mermaid: true,  // for diagrams
  }
```

#### B. Custom React Components

**RAGChatbot.tsx** - Core chat interface
```typescript
Interface:
- Props: { chapterId?: string; initialContext?: string }
- State: messages[], loading, streaming
- Methods:
  - sendQuery(text): void
  - handleStream(response): void
  - exportConversation(): JSON
  - rateFeedback(messageId, rating): void

Behavior:
1. User types query
2. Component sends to /api/rag/query with context
3. Server returns streaming SSE response
4. Component appends chunks real-time
5. Citations rendered below response
6. User can rate response for training
```

**PersonalizeButton.tsx** - Per-chapter personalization
```typescript
Behavior:
1. Component checks user authentication
2. Fetches current user profile + chapter data
3. Calls Personalization Agent (Claude)
4. Returns: content filters, depth adjustment, examples
5. Stores in localStorage for session
6. Re-renders affected chapter sections
```

**TranslateButton.tsx** - Urdu translation trigger
```typescript
Behavior:
1. User clicks button on chapter
2. Check translation cache (localStorage + DB)
3. If cached, serve instantly
4. Else: Submit to /api/translation/urdu with chapter ID
5. Show loading indicator
6. Streaming translation output
7. Cache result in IndexedDB (offline support)
8. Quality score displayed to user
```

**AuthGuard.tsx** - Protects pages/features
```typescript
Props: { children, requiredRole?, fallback? }
Logic:
- Check Better-Auth session
- If expired, refresh token
- If new user, show onboarding questionnaire
- Render children or fallback
```

#### C. Custom Hooks

**useAuth.ts** - Authentication & user context
```typescript
Returns: {
  user: User | null,
  isLoading: boolean,
  login(email, password): Promise<void>,
  register(email, password, profile): Promise<void>,
  logout(): Promise<void>,
  updateProfile(data): Promise<void>,
}
```

**useRAG.ts** - RAG query handling
```typescript
Returns: {
  messages: Message[],
  loading: boolean,
  sendQuery(text): Promise<void>,
  clearHistory(): void,
  exportConversation(): JSON,
}
```

**usePersonalization.ts** - Content adaptation
```typescript
Returns: {
  userProfile: UserProfile,
  personalizedContent: Content,
  applyPersonalization(chapterId): Promise<void>,
  savePreferences(prefs): Promise<void>,
}
```

---

### 2. BACKEND ARCHITECTURE

#### A. FastAPI Application Structure (`backend/main.py`)

```python
app = FastAPI(
    title="Physical AI & Robotics API",
    version="1.0.0",
    docs_url="/docs",  # Swagger UI
)

# Middleware
app.add_middleware(CORSMiddleware, ...)  # CORS
app.add_middleware(ErrorHandlerMiddleware)  # Graceful errors
app.add_middleware(LoggingMiddleware)  # Structured logging

# Routers
app.include_router(auth_router, prefix="/api/auth")
app.include_router(rag_router, prefix="/api/rag")
app.include_router(personalization_router, prefix="/api/personalization")
app.include_router(translation_router, prefix="/api/translation")
app.include_router(chapters_router, prefix="/api/chapters")

# WebSocket for real-time chat
@app.websocket("/ws/chat/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str):
    await websocket.accept()
    # Streaming chat logic
```

#### B. Database Schema (Neon PostgreSQL)

**Users Table**
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified TIMESTAMP,
    password_hash VARCHAR(255),
    name VARCHAR(255),
    image_url VARCHAR(255),
    
    -- Personalization
    preferred_language VARCHAR(10) DEFAULT 'en',
    learning_style VARCHAR(50),
    robotics_experience VARCHAR(50),
    background_domain VARCHAR(100),
    
    -- Preferences
    enable_personalization BOOLEAN DEFAULT TRUE,
    enable_translation BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
);

CREATE TABLE user_sessions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    token VARCHAR(500),
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_profiles (
    id UUID PRIMARY KEY,
    user_id UUID UNIQUE REFERENCES users(id),
    background_answers JSONB,  -- answers to profile questions
    learning_patterns JSONB,   -- ML-derived insights
    completed_chapters JSONB,  -- array of chapter IDs
    total_study_time INT,      -- minutes
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE chat_messages (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    chapter_id VARCHAR(100),
    query TEXT NOT NULL,
    response TEXT NOT NULL,
    sources JSONB,  -- citations
    rating INT,     -- 1-5 feedback
    embedding VECTOR(1536),  -- for semantic search within sessions
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE translations_cache (
    id UUID PRIMARY KEY,
    chapter_id VARCHAR(100),
    original_text_hash VARCHAR(64),
    target_language VARCHAR(10),
    translated_text TEXT,
    quality_score FLOAT,
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP
);

CREATE TABLE personalization_logs (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    chapter_id VARCHAR(100),
    personalization_variant JSONB,  -- depth, examples, etc.
    engagement_score FLOAT,          -- calculated later from behavior
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_user_chat ON chat_messages(user_id);
CREATE INDEX idx_chapter_cache ON translations_cache(chapter_id, target_language);
CREATE INDEX idx_chat_embedding ON chat_messages USING ivfflat (embedding);
```

#### C. Authentication Flow (Better-Auth + Custom)

```
LOGIN FLOW:
User Email/Password
    ↓
[POST /api/auth/login]
    ↓
Better-Auth verifies credentials
    ↓
Generate JWT + Refresh Token
    ↓
Store session in DB
    ↓
Return tokens + user data to frontend
    ↓
Frontend stores in httpOnly cookie (secure)

REFRESH FLOW:
Expired JWT + Valid Refresh Token
    ↓
[POST /api/auth/refresh]
    ↓
Validate refresh token
    ↓
Issue new JWT
    ↓
Update session expiry
    ↓
Return new JWT

ONBOARDING (NEW USER):
Registration
    ↓
Show Background Questionnaire
    ↓
Store answers in user_profiles.background_answers
    ↓
Initialize learning preferences
    ↓
Redirect to first chapter
```

#### D. RAG Service (`backend/app/services/rag_service.py`)

```python
class RAGService:
    def __init__(self, qdrant_client, embed_model, llm):
        self.vector_db = qdrant_client
        self.embeddings = embed_model  # OpenAI Embeddings
        self.llm = llm  # OpenAI GPT-4 or Claude
    
    async def query(
        self,
        query_text: str,
        user_context: dict,
        chunk_size: int = 5
    ) -> AsyncIterator[str]:
        """
        RAG Query with streaming response.
        
        Flow:
        1. Embed query using sentence-transformers
        2. Search Qdrant for similar vectors
        3. Retrieve context chunks
        4. Build prompt with user context
        5. Stream LLM response
        """
        
        # Step 1: Embed query
        query_embedding = await self.embeddings.embed_query(query_text)
        
        # Step 2: Search vector DB
        search_results = self.vector_db.search(
            collection_name="chapters",
            query_vector=query_embedding,
            limit=chunk_size,
            score_threshold=0.7
        )
        
        # Step 3: Extract context
        context = "\n\n".join([
            result.payload["text"] 
            for result in search_results
        ])
        
        # Step 4: Build prompt
        prompt = f"""
You are an expert tutor teaching Physical AI & Humanoid Robotics.
Respond based on the context provided. Be clear, concise, and engaging.

User Learning Style: {user_context.get('learning_style')}
User Experience: {user_context.get('robotics_experience')}

Context:
{context}

Question: {query_text}

Answer:
        """
        
        # Step 5: Stream response
        async for chunk in self.llm.stream(prompt):
            yield chunk
    
    async def get_citations(self, response_id: str) -> List[dict]:
        """Retrieve sources for a response"""
        # Query DB for source mappings
        pass
```

#### E. Personalization Service

```python
class PersonalizationService:
    def __init__(self, claude_client, db):
        self.claude = claude_client
        self.db = db
    
    async def personalize_chapter(
        self,
        chapter_id: str,
        user_profile: UserProfile
    ) -> PersonalizationVariant:
        """
        Use Claude Subagent to personalize chapter.
        
        Returns:
        {
            'depth': 'overview' | 'standard' | 'deep',
            'examples': ['example1', 'example2'],
            'prerequisites': ['topic1', 'topic2'],
            'visual_aids': ['diagram1', 'video1'],
            'pace': 'slow' | 'standard' | 'fast',
        }
        """
        
        # Fetch original chapter
        chapter = await self.db.get_chapter(chapter_id)
        
        # Call Personalization Agent
        variant = await self._call_personalization_agent(
            chapter=chapter,
            user_profile=user_profile
        )
        
        # Cache result
        await self.db.save_personalization(user_profile.id, chapter_id, variant)
        
        return variant
    
    async def _call_personalization_agent(
        self,
        chapter: Chapter,
        user_profile: UserProfile
    ) -> PersonalizationVariant:
        """Call Claude Subagent for personalization"""
        
        prompt = f"""
Personalize this robotics chapter for the user:

User Profile:
- Learning Style: {user_profile.learning_style}
- Experience: {user_profile.robotics_experience}
- Background: {user_profile.background_domain}
- Preferences: {user_profile.background_answers}

Chapter Content:
{chapter.content}

Provide:
1. Recommended content depth
2. Best examples for this user
3. Prerequisite topics
4. Suggested visual aids
5. Recommended pacing

Format as JSON.
        """
        
        response = await self.claude.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=2000,
            messages=[{"role": "user", "content": prompt}]
        )
        
        return json.loads(response.content[0].text)
```

#### F. Translation Service (Urdu)

```python
class TranslationService:
    def __init__(self, claude_client, db, glossary):
        self.claude = claude_client
        self.db = db
        self.glossary = glossary  # Robotics terminology
    
    async def translate_to_urdu(
        self,
        chapter_id: str,
        content: str
    ) -> TranslationResult:
        """
        Translate chapter to Urdu with quality checks.
        """
        
        # Check cache first
        cached = await self.db.get_translation_cache(
            chapter_id=chapter_id,
            language='ur'
        )
        if cached and not cached.is_expired():
            return cached
        
        # Call Urdu Translator Agent
        translation = await self._translate_with_agent(content)
        
        # Quality check
        quality_score = await self._quality_check(translation)
        
        # Cache for 30 days
        result = TranslationResult(
            original=content,
            translated=translation,
            quality_score=quality_score,
            expires_at=now() + timedelta(days=30)
        )
        
        await self.db.save_translation_cache(chapter_id, result)
        return result
    
    async def _translate_with_agent(self, content: str) -> str:
        """Call Urdu Translator Subagent"""
        
        prompt = f"""
Translate this robotics/AI content to Urdu with high quality.

Important:
1. Use technical Urdu terminology (اردو میں فنی اصطلاحات)
2. Refer to included glossary for consistency
3. Maintain readability for Pakistani/Urdu readers
4. Keep formatting (lists, code, emphasis)
5. Add Urdu transliteration in parentheses for acronyms

Glossary:
{self._format_glossary()}

Content to Translate:
{content}

Provide ONLY the Urdu translation, no explanations.
        """
        
        response = await self.claude.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=5000,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )
        
        return response.content[0].text
    
    async def _quality_check(self, translated_text: str) -> float:
        """Validate translation quality"""
        
        checklist_prompt = f"""
Rate the quality of this Urdu translation on a 0-1 scale.

Translation:
{translated_text}

Evaluate:
1. Technical accuracy (0-1)
2. Grammar correctness (0-1)
3. Readability (0-1)
4. Terminology consistency (0-1)

Return JSON: {{"overall": 0.X, "breakdown": {{...}}}}
        """
        
        response = await self.claude.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=500,
            messages=[{"role": "user", "content": checklist_prompt}]
        )
        
        result = json.loads(response.content[0].text)
        return result['overall']
    
    def _format_glossary(self) -> str:
        """Format robotics glossary for prompt"""
        return "\n".join([
            f"- {en}: {ur}" 
            for en, ur in self.glossary.items()
        ])
```

---

### 3. CLAUDE SUBAGENTS & SKILLS

#### A. Personalization Agent

**File**: `backend/agents/personalization/agent.py`

```python
from anthropic import Anthropic

class PersonalizationAgent:
    def __init__(self, api_key: str):
        self.client = Anthropic(api_key=api_key)
    
    def personalize(
        self,
        chapter_content: str,
        user_profile: dict
    ) -> dict:
        """
        Main agent function that internally adapts content.
        """
        
        tools = [
            {
                "name": "analyze_user_profile",
                "description": "Extract key user characteristics",
                "input_schema": {...}
            },
            {
                "name": "assess_content_difficulty",
                "description": "Rate chapter difficulty",
                "input_schema": {...}
            },
            {
                "name": "select_examples",
                "description": "Choose relevant examples",
                "input_schema": {...}
            },
            {
                "name": "identify_prerequisites",
                "description": "Flag prerequisite topics",
                "input_schema": {...}
            },
        ]
        
        messages = [
            {
                "role": "user",
                "content": f"""
Personalize this chapter for a user:

User: {user_profile}
Chapter: {chapter_content}

Use the available tools to analyze and personalize.
                """
            }
        ]
        
        response = self.client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=4096,
            tools=tools,
            messages=messages
        )
        
        # Process response, handle tool calls
        return self._extract_personalization(response)
```

#### B. Urdu Translator Agent

**File**: `backend/agents/urdu-translator/agent.py`

```python
class UrduTranslatorAgent:
    def __init__(self, api_key: str, glossary_db):
        self.client = Anthropic(api_key=api_key)
        self.glossary = glossary_db
    
    def translate(self, content: str, context: dict) -> str:
        """
        Translate with quality assurance.
        """
        
        tools = [
            {
                "name": "lookup_terminology",
                "description": "Look up technical terms in Urdu glossary",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "english_term": {"type": "string"},
                    },
                    "required": ["english_term"]
                }
            },
            {
                "name": "check_consistency",
                "description": "Verify terminology consistency",
                "input_schema": {...}
            },
            {
                "name": "validate_grammar",
                "description": "Check Urdu grammar",
                "input_schema": {...}
            },
        ]
        
        response = self.client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=5000,
            tools=tools,
            system="You are an expert in translating technical robotics and AI content to Urdu...",
            messages=[
                {
                    "role": "user",
                    "content": f"Translate to Urdu:\n{content}"
                }
            ]
        )
        
        return self._process_translation(response)
```

#### C. Content Generator Agent

**File**: `backend/agents/content-generator/agent.py`

```python
class ContentGeneratorAgent:
    def __init__(self, api_key: str):
        self.client = Anthropic(api_key=api_key)
    
    def generate_variations(
        self,
        chapter_id: str,
        base_content: str,
        styles: List[str]
    ) -> Dict[str, str]:
        """
        Generate chapter variations for different audiences.
        
        Styles: ['academic', 'practical', 'story-driven', 'visual-heavy']
        """
        
        variations = {}
        
        for style in styles:
            response = self.client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=3000,
                messages=[
                    {
                        "role": "user",
                        "content": f"""
Rewrite this robotics chapter in a {style} style:

Original:
{base_content}

Requirements:
- Maintain technical accuracy
- Adapt tone and examples for {style} learners
- Keep same learning objectives
                        """
                    }
                ]
            )
            
            variations[style] = response.content[0].text
        
        return variations
    
    def generate_practice_problems(
        self,
        chapter_id: str,
        difficulty: str
    ) -> List[Problem]:
        """Generate MCQs and exercises"""
        pass
```

---

### 4. VECTOR DATABASE (Qdrant)

#### A. Collection Schema

```json
{
  "collection_name": "chapters",
  "vectors": {
    "size": 1536,
    "distance": "Cosine"
  },
  "payload_schema": {
    "chapter_id": "keyword",
    "section": "keyword",
    "text": "text",
    "metadata": {
      "type": "object",
      "properties": {
        "author": "keyword",
        "created_at": "datetime",
        "language": "keyword"
      }
    }
  }
}
```

#### B. Embedding Process

```python
async def index_chapter(chapter_id: str, content: str):
    """
    Process:
    1. Split content into semantic chunks (~500 tokens)
    2. Embed each chunk using OpenAI
    3. Store vectors + metadata in Qdrant
    4. Create BM25 index for hybrid search
    """
    
    chunks = split_into_chunks(content, chunk_size=500)
    
    points = []
    for i, chunk in enumerate(chunks):
        embedding = await openai_embed(chunk)
        
        point = PointStruct(
            id=hash(f"{chapter_id}_{i}"),
            vector=embedding,
            payload={
                "chapter_id": chapter_id,
                "section_index": i,
                "text": chunk,
                "metadata": {
                    "language": "en",
                    "created_at": now()
                }
            }
        )
        points.append(point)
    
    qdrant_client.upsert(
        collection_name="chapters",
        points=points
    )
```

---

### 5. AUTHENTICATION & SESSION MANAGEMENT

#### A. Better-Auth Integration

```typescript
// frontend/auth.ts
import { createAuthClient } from "better-auth/client";

export const auth = createAuthClient({
  baseURL: process.env.REACT_APP_API_URL,
});

// Login
const session = await auth.signIn.email({
  email: "user@example.com",
  password: "password123",
});

// Check session
const { user, session: activeSession } = await auth.getSession();

// Logout
await auth.signOut();
```

#### B. Backend Session Storage

```python
# backend/app/services/auth_service.py

class AuthService:
    def create_session(self, user: User) -> SessionToken:
        """Create JWT + Refresh token"""
        
        now = datetime.utcnow()
        jwt_payload = {
            "sub": str(user.id),
            "email": user.email,
            "iat": now,
            "exp": now + timedelta(hours=1),
        }
        
        access_token = jwt.encode(
            jwt_payload,
            settings.SECRET_KEY,
            algorithm="HS256"
        )
        
        refresh_token_id = uuid4()
        await db.create_session(
            user_id=user.id,
            token=refresh_token_id,
            expires_at=now + timedelta(days=30)
        )
        
        return SessionToken(
            access_token=access_token,
            refresh_token=str(refresh_token_id),
            expires_in=3600
        )
```

---

### 6. DATA FLOW DIAGRAMS

#### A. User Registration with Profile

```
User Registration
    ↓
[Frontend: RegisterForm]
    ├─ Email validation
    └─ Password strength check
    ↓
POST /api/auth/register
    ↓
[Backend: AuthService]
    ├─ Hash password (bcrypt)
    ├─ Create user in Neon
    └─ Create session
    ↓
Return session tokens
    ↓
Frontend stores tokens (httpOnly)
    ↓
Show Onboarding Questionnaire
    ↓
User answers background questions
    ↓
POST /api/auth/update-profile
    ↓
[Backend: UserService]
    ├─ Store answers in user_profiles.background_answers
    └─ Initialize learning preferences
    ↓
Redirect to chapter 1
```

#### B. Chapter Personalization Flow

```
User Opens Chapter
    ↓
[Frontend: ChapterViewer]
    ├─ Load base chapter from Docusaurus
    └─ Render "Personalize Content" button
    ↓
User Clicks "Personalize"
    ↓
GET /api/personalization/suggest
    ↓
[Backend: PersonalizationService]
    ├─ Fetch user profile from DB
    ├─ Call ChatPersonalizationAgent
    │   ├─ Analyze user learning style
    │   ├─ Assess chapter difficulty
    │   └─ Select relevant examples
    └─ Cache result in DB
    ↓
Return personalization variant JSON
    ↓
[Frontend: usePersonalization hook]
    ├─ Apply depth filter (show/hide sections)
    ├─ Swap examples for relevant ones
    ├─ Highlight prerequisites
    └─ Update visual aids
    ↓
User views personalized chapter
```

#### C. Urdu Translation Flow

```
User Clicks "Translate to Urdu"
    ↓
Check localStorage cache
    ├─ Cache hit? → Display cached translation
    └─ Cache miss? → Continue
    ↓
POST /api/translation/urdu?chapter_id=...
    ↓
Check DB translation cache
    ├─ Valid cached translation? → Return it
    └─ Not found/expired? → Queue translation
    ↓
[Backend: TranslationService]
    ├─ Call UrduTranslatorAgent
    │   ├─ Fetch robotics glossary
    │   ├─ Translate with terminology consistency
    │   └─ Tool handling:
    │       ├─ Lookup terminology
    │       ├─ Check consistency
    │       └─ Validate grammar
    ├─ Run quality checks (0-1 score)
    └─ Cache result (30 days)
    ↓
Stream translation back to frontend
    ↓
[Frontend]
    ├─ Cache in IndexedDB (offline)
    └─ Display with quality badge
```

#### D. RAG Chatbot Flow

```
User Types Query in Chatbot
    ↓
[Frontend: RAGChatbot]
    ├─ Append query to local messages
    └─ Show loading indicator
    ↓
POST /api/rag/query
    {
      "query": "What is dynamics in robotics?",
      "user_context": {
        "user_id": "...",
        "chapter_id": "...",
        "learning_style": "visual"
      }
    }
    ↓
[Backend: RAGService]
    ├─ Embed query using OpenAI
    │   └─ Query vector: [0.123, 0.456, ...]
    ├─ Search Qdrant similarity
    │   ├─ Hybrid: Semantic (cosine) + Lexical (BM25)
    │   └─ Return top-5 chunks with scores
    ├─ Retrieve context from payloads
    ├─ Build prompt:
    │   ├─ System prompt (tutor role)
    │   ├─ User context (learning style, etc)
    │   └─ Retrieved context chunks
    ├─ Stream LLM response (OpenAI GPT-4)
    │   └─ Use SSE for streaming
    └─ Extract citations from retrieved chunks
    ↓
Frontend receives chunks via EventSource
    ↓
[Frontend]
    ├─ Append chunks as they arrive (streaming UX)
    ├─ Once complete:
    │   ├─ Display full response
    │   ├─ Show citations below
    │   ├─ Render feedback buttons (👍 👎)
    │   └─ Save conversation to DB
    └─ User can continue conversation
```

---

### 7. SCALABILITY CONSIDERATIONS

#### A. Frontend Scaling
- **Static Generation**: Pre-build 100+ chapters as static HTML
- **Code Splitting**: Load chapters on-demand via dynamic imports
- **Image Optimization**: WebP with fallbacks, lazy loading
- **Service Worker**: Cache chapters for offline access
- **CDN**: GitHub Pages or Vercel edge network

#### B. Backend Scaling
- **Horizontal**: Vercel Functions auto-scale to 100+ concurrent
- **Database**: Neon's auto-scaling handles growing queries
- **Caching**: Redis layer for session + frequent queries (e.g., user profiles)
- **Async Tasks**: Celery queue for translations, embeddings
- **Rate Limiting**: Prevent abuse (100 req/min per IP)

#### C. Vector DB Scaling
- **Qdrant Sharding**: Distribute chapters across shards
- **Batch Indexing**: Index chapters offline, not on-demand
- **Caching Layer**: Store common queries in Redis

#### D. Real-Time Features
- **WebSocket**: For live chat streaming
- **SSE (Server-Sent Events)**: For unidirectional streaming (simpler)
- **Message Queue**: RabbitMQ for distributed messaging (optional)

---

### 8. SECURITY ARCHITECTURE

```
┌─────────────────────────────────────────────┐
│ HTTPS/TLS (All communications encrypted)    │
├─────────────────────────────────────────────┤
│ Frontend                                    │
│ ├─ httpOnly cookies (JWT tokens)            │
│ └─ CSP headers prevent XSS                  │
├─────────────────────────────────────────────┤
│ API Gateway (Vercel Functions)              │
│ ├─ Rate limiting                            │
│ ├─ Input validation                         │
│ └─ CORS filtering                           │
├─────────────────────────────────────────────┤
│ Backend Services (FastAPI)                  │
│ ├─ JWT validation on every request          │
│ ├─ Parameterized SQL queries                │
│ ├─ Password hashing (bcrypt)                │
│ └─ Secrets in environment (no code)         │
├─────────────────────────────────────────────┤
│ Databases                                   │
│ ├─ Encryption at rest (Neon)                │
│ ├─ Network isolation (private DB)           │
│ └─ Audit logging                            │
├─────────────────────────────────────────────┤
│ Vector DB                                   │
│ ├─ API key authentication                   │
│ └─ Data anonymization                       │
└─────────────────────────────────────────────┘
```

---

## Integration Checklist

- [ ] Docusaurus 3 + TypeScript setup
- [ ] Better-Auth integrated with Neon
- [ ] FastAPI backend with required services
- [ ] Qdrant vector DB operational
- [ ] OpenAI API keys configured
- [ ] Claude SDK for subagents working
- [ ] RAG pipeline end-to-end tested
- [ ] Urdu translation quality > 0.8
- [ ] Personalization engine functional
- [ ] GitHub Actions CI/CD pipelines running
- [ ] Deployed to GitHub Pages (docs)
- [ ] API deployed to Vercel Functions
- [ ] Spec-Kit Plus compatibility verified
- [ ] Monitoring/logging implemented
- [ ] Documentation complete

---

*Last Updated: February 2026*
