# Spec-Kit Plus Integration Guide

## Overview

This document outlines how the Physical AI & Humanoid Robotics textbook integrates with **Spec-Kit Plus**, ensuring 100% compatibility with:
- Deployment targets (GitHub Pages, Vercel)
- Component structure specification
- Metadata standards
- Build and optimization pipeline

---

## 1. Spec-Kit Plus Principles

### Core Concept
Spec-Kit Plus is a specification framework that standardizes:
1. **Component Contract**: Every component has defined inputs/outputs
2. **Deployment Pipeline**: Single source of truth for build targets
3. **Metadata Standard**: Consistent metadata across all content
4. **Performance Targets**: Measurable, enforced constraints

### Our Implementation
```
Docusaurus Content (MDX)
    ↓
Spec-Kit Parser
    ├─ Validates metadata
    ├─ Checks component signatures
    └─ Verifies performance budget
    ↓
Build Pipeline
    ├─ GitHub Pages static export
    └─ Vercel edge optimizations
```

---

## 2. Spec Configuration Files

### 2.1 Deployment Specification

**File**: `specs/deployment-targets.json`

```json
{
  "version": "1.0.0",
  "project": "physical-ai-textbook",
  "targets": {
    "github-pages": {
      "name": "GitHub Pages (Static)",
      "type": "static",
      "url": "https://masoomtariq.github.io/Hakathon_1_CLI",
      "build_command": "cd docs && pnpm build",
      "build_output": "docs/build",
      "performance": {
        "max_page_size_kb": 500,
        "target_fcp_ms": 2000,
        "target_lcp_ms": 2500
      },
      "ci_trigger": {
        "branch": "main",
        "paths": ["docs/**", "*.md"]
      }
    },
    "vercel-api": {
      "name": "Vercel API (Serverless)",
      "type": "serverless",
      "url": "https://api-name.vercel.app",
      "build_command": "pip install -r requirements.txt",
      "build_output": ".",
      "performance": {
        "max_function_duration_ms": 30000,
        "target_cold_start_ms": 1000,
        "target_p95_response_ms": 500
      },
      "ci_trigger": {
        "branch": "main",
        "paths": ["backend/**", "*.md"]
      }
    },
    "local-development": {
      "name": "Local Dev",
      "type": "local",
      "frontend_port": 3000,
      "backend_port": 8000,
      "vector_db_port": 6333
    }
  }
}
```

### 2.2 Component Specification

**File**: `specs/component-spec.json`

```json
{
  "version": "1.0.0",
  "components": {
    "RAGChatbot": {
      "path": "docs/src/components/RAGChatbot.tsx",
      "type": "interactive",
      "props": {
        "chapterId": {
          "type": "string",
          "required": false,
          "description": "Optional chapter context"
        },
        "initialContext": {
          "type": "string",
          "required": false,
          "description": "Initial prompt context"
        },
        "theme": {
          "type": "enum",
          "values": ["light", "dark"],
          "default": "light"
        }
      },
      "outputs": {
        "onMessage": "Fired when user sends message",
        "onRating": "Fired when user rates response",
        "onExport": "Fired when user exports conversation"
      },
      "performance": {
        "bundle_size_kb": 50,
        "render_time_ms": 100
      },
      "accessibility": {
        "wcag_level": "AA",
        "aria_roles": ["dialog", "log"]
      }
    },
    "PersonalizeButton": {
      "path": "docs/src/components/PersonalizeButton.tsx",
      "type": "action",
      "props": {
        "chapterId": {
          "type": "string",
          "required": true
        },
        "isLoading": {
          "type": "boolean",
          "default": false
        }
      },
      "outputs": {
        "onPersonalize": "Fired after personalization completes"
      }
    },
    "TranslateButton": {
      "path": "docs/src/components/TranslateButton.tsx",
      "type": "action",
      "props": {
        "chapterId": {
          "type": "string",
          "required": true
        },
        "targetLanguage": {
          "type": "enum",
          "values": ["ur"],
          "default": "ur"
        }
      },
      "outputs": {
        "onTranslate": "Fired after translation completes"
      }
    }
  }
}
```

### 2.3 Content Metadata Specification

**File**: `specs/content-metadata-schema.json`

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "name": "Chapter Metadata",
  "type": "object",
  "required": [
    "title",
    "sidebar_label",
    "id",
    "audience",
    "duration_minutes"
  ],
  "properties": {
    "title": {
      "type": "string",
      "description": "Full chapter title",
      "maxLength": 100
    },
    "sidebar_label": {
      "type": "string",
      "description": "Short label for sidebar",
      "maxLength": 50
    },
    "id": {
      "type": "string",
      "pattern": "^[a-z0-9-]+$",
      "description": "Unique chapter identifier"
    },
    "audience": {
      "type": "array",
      "items": {
        "enum": ["beginner", "intermediate", "advanced"]
      },
      "description": "Recommended experience levels"
    },
    "duration_minutes": {
      "type": "integer",
      "minimum": 5,
      "maximum": 120,
      "description": "Estimated reading time"
    },
    "learning_objectives": {
      "type": "array",
      "items": {"type": "string"},
      "description": "What students will learn"
    },
    "prerequisites": {
      "type": "array",
      "items": {"type": "string"},
      "description": "Chapter IDs required before this one"
    },
    "keywords": {
      "type": "array",
      "items": {"type": "string"},
      "description": "SEO keywords"
    },
    "has_interactive": {
      "type": "boolean",
      "description": "Contains interactive components"
    },
    "has_quiz": {
      "type": "boolean",
      "description": "Contains assessment"
    },
    "personalization_enabled": {
      "type": "boolean",
      "default": true,
      "description": "Can be personalized"
    },
    "translation_enabled": {
      "type": "boolean",
      "default": true,
      "description": "Can be translated to Urdu"
    }
  }
}
```

---

## 3. MDX Frontmatter Standard

### 3.1 Required Format

Every chapter MDX file must include this frontmatter:

```mdx
---
title: "Chapter Title: Subtitle"
sidebar_label: "Short Title"
id: "chapter-1-intro"
slug: "/chapter-1"
audience: ["beginner", "intermediate"]
duration_minutes: 30
language: "en"
last_updated: "2026-02-16"

learning_objectives:
  - "Objective 1"
  - "Objective 2"

prerequisites:
  - "background-knowledge"

keywords:
  - "robotics"
  - "AI"
  - "humanoid"

personalization_enabled: true
translation_enabled: true
rag_enabled: true

authors:
  - "Author Name"

difficulty: "intermediate"

next_chapter: "chapter-2-kinematics"
prev_chapter: "intro"
---
```

### 3.2 Validation Script

**File**: `scripts/validate-metadata.ts`

```typescript
import fs from 'fs';
import matter from 'gray-matter';
import Ajv from 'ajv';

const ajv = new Ajv();
const metadataSchema = JSON.parse(
  fs.readFileSync('specs/content-metadata-schema.json', 'utf-8')
);

const validate = ajv.compile(metadataSchema);

function validateChapter(filePath: string): {valid: boolean; errors?: string[]} {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(content);
  
  const valid = validate(data);
  
  if (!valid) {
    return {
      valid: false,
      errors: validate.errors?.map(e => `${e.instancePath}: ${e.message}`)
    };
  }
  
  return { valid: true };
}

// Run validation on all chapters
const chapters = fs.readdirSync('docs/docs').filter(f => f.endsWith('.mdx'));
let allValid = true;

for (const chapter of chapters) {
  const result = validateChapter(`docs/docs/${chapter}`);
  if (!result.valid) {
    console.error(`❌ ${chapter}:`, result.errors);
    allValid = false;
  } else {
    console.log(`✅ ${chapter}`);
  }
}

process.exit(allValid ? 0 : 1);
```

---

## 4. Component Integration Points

### 4.1 Chapter Components

Each chapter should include these standard components:

```mdx
---
# ... frontmatter
---

# Chapter Title

<TOCInline toc={toc} />

## Overview Section

[Main content...]

## Learning Path

<PersonalizeButton chapterId="chapter-1-intro" />

## Practice & Test

[Interactive content...]

## Q&A Section

<RAGChatbot 
  chapterId="chapter-1-intro" 
  initialContext="Ask questions about..."
/>

## Localization

<TranslateButton 
  chapterId="chapter-1-intro"
  targetLanguage="ur"
/>

## Next Steps

- Next: [[Chapter 2](docs/chapter-2)]
- Back: [[Introduction](docs/intro)]
```

### 4.2 Component Props Contract

```typescript
// ComponentProps must match spec

interface RAGChatbotProps {
  chapterId?: string;           // Spec: string, optional
  initialContext?: string;       // Spec: string, optional
  theme?: 'light' | 'dark';     // Spec: enum
  onMessage?: (msg: string) => void;  // Output: onMessage
  onRating?: (rating: 1|2|3|4|5) => void; // Output: onRating
}

interface PersonalizeButtonProps {
  chapterId: string;             // Spec: string, required
  isLoading?: boolean;           // Default: false
  onPersonalize?: () => void;    // Output: onPersonalize
}

interface TranslateButtonProps {
  chapterId: string;             // Spec: string, required
  targetLanguage?: 'ur';         // Spec: enum, default 'ur'
  onTranslate?: () => void;      // Output: onTranslate
}
```

---

## 5. Build Pipeline Specification

### 5.1 Build Validation

**File**: `.github/workflows/validate-spec.yml`

```yaml
name: Validate Spec-Kit Plus Compliance

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      
      # Validate metadata
      - name: Validate chapter metadata
        run: |
          cd docs
          pnpm run validate:metadata
      
      # Validate components
      - name: Validate component signatures
        run: |
          cd docs
          tsc --noEmit
      
      # Check bundle size
      - name: Check bundle size
        run: |
          cd docs
          pnpm run build
          npm run analyze:bundle
      
      # Performance budget
      - name: Check performance budget
        run: |
          pnpm run test:performance

  compliance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to staging
        run: |
          # Deploy to staging environment
          # Run Lighthouse CI
          lhci --config=lighthouserc.json
```

### 5.2 Lighthouse Configuration

**File**: `lighthouserc.json`

```json
{
  "ci": {
    "collect": {
      "url": ["https://staging.example.com/"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.85 }],
        "categories:seo": ["error", { "minScore": 0.9 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

---

## 6. Performance Specifications

### 6.1 Frontend Budgets

```javascript
// webpack.config.js or build config
{
  performance: {
    maxAssetSize: 512000,      // 500 KB
    maxEntrypointSize: 512000,
    assetFilter: (assetFilename) => {
      return /\.(js|css)$/.test(assetFilename);
    },
    hints: "error",  // Fail build if exceeded
  }
}
```

### 6.2 API Response Budgets

From `specs/deployment-targets.json`:
```
- Max cold start: 1000ms
- Max function duration: 30 seconds
- Target p95 response: 500ms
- Max database query: 100ms
```

### 6.3 Content Size Budgets

```
- Chapter HTML: < 200 KB
- Chapter with Interactive: < 500 KB
- Total page load: < 2 seconds (FCP)
- RAG response streaming: < 3 seconds
```

---

## 7. SEO & Metadata Compliance

### 7.1 Sitemap Generation

**File**: `docs/static/sitemap.xml` (auto-generated)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://domain.com/docs/intro</loc>
    <lastmod>2026-02-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- ... one entry per chapter -->
</urlset>
```

### 7.2 Open Graph Metadata

Every chapter generates OG tags:

```typescript
// docs/src/theme/Root.tsx
function Head() {
  return (
    <>
      <Meta name="description" content={chapter.description} />
      <Meta property="og:title" content={chapter.title} />
      <Meta property="og:description" content={chapter.description} />
      <Meta property="og:image" content={chapter.image} />
      <Meta property="og:type" content="article" />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="keywords" content={chapter.keywords.join(', ')} />
    </>
  );
}
```

---

## 8. Accessibility Compliance

### 8.1 WCAG 2.1 AA Targets

From component spec:
- All interactive components: WCAG AA compliant
- Color contrast: ≥ 4.5:1 (normal text)
- Focus indicators: Visible outline, ≥ 3px
- Skip links: Present on all pages
- ARIA labels: All interactive elements labeled

### 8.2 Automated Testing

**File**: `scripts/test-accessibility.ts`

```typescript
import { injectAxe, checkA11y } from 'axe-playwright';

test('Chapter page accessibility', async ({ page }) => {
  await page.goto('http://localhost:3000/docs/chapter-1');
  await injectAxe(page);
  
  await checkA11y(page, null, {
    detailedReport: true,
    detailedReportOptions: {
      html: true
    }
  });
});
```

---

## 9. Deployment Target Mapping

### 9.1 GitHub Pages Deployment

```json
{
  "target": "github-pages",
  "conditions": [
    "push to main",
    "changes in docs/**",
    "validation passed"
  ],
  "build": "cd docs && pnpm build",
  "output": "docs/build",
  "deploy": {
    "branch": "gh-pages",
    "folder": "docs/build"
  },
  "post_deploy": "Purge CDN cache, ping search engines"
}
```

### 9.2 Vercel Deployment

```json
{
  "target": "vercel-api",
  "conditions": [
    "push to main",
    "changes in backend/**",
    "tests passed"
  ],
  "build": "pip install -r requirements.txt",
  "env": {
    "DATABASE_URL": "from-secrets",
    "OPENAI_API_KEY": "from-secrets"
  },
  "post_deploy": "Run smoke tests, notify team"
}
```

---

## 10. Version Control Integration

### 10.1 Spec Version

```json
{
  "spec_version": "1.0.0",
  "compatible_versions": ["1.0.0"],
  "deprecations": []
}
```

Update spec version when:
- New required component props
- New metadata fields
- Breaking deployment changes

### 10.2 Breaking Change Process

```
1. Create RFC (Request for Comments) in GitHub Discussions
2. Implement behind feature flag
3. Deprecation period: 1 month
4. Announce sunrise: deprecated API still works with warning
5. Release with breaking change in major version
6. Sunset after 3 months
```

---

## 11. Monitoring Compliance

### 11.1 Spec Compliance Dashboard

Track metrics:
- ✅ All chapters have valid metadata
- ✅ All components match spec contract
- ✅ Performance budgets met
- ✅ Build times under threshold
- ✅ Lighthouse scores > 90%

### 11.2 CI/CD Gates

```
Spec Validation → Unit Tests → Integration Tests → 
  → Performance Tests → Lighthouse CI → Deploy
```

If any gate fails: Block deployment, notify team

---

## 12. Integration Checklist

- [ ] Created `specs/` directory with all config files
- [ ] Validated all chapters against metadata schema
- [ ] All components implement spec contract
- [ ] Build validation added to GitHub Actions
- [ ] Lighthouse CI configured and passing
- [ ] Performance budgets set and enforced
- [ ] Accessibility tests added to CI/CD
- [ ] SEO metadata auto-generated
- [ ] Deployment targets configured
- [ ] Version control for spec established
- [ ] Team documentation published
- [ ] Monitoring dashboard created

---

## 13. Example: Spec-Compliant Chapter

**File**: `docs/docs/chapter-1/index.mdx`

```mdx
---
title: "Chapter 1: Introduction to Humanoid Robotics"
sidebar_label: "Introduction"
id: "chapter-1-intro"
slug: "/docs/chapter-1"
audience: ["beginner", "intermediate"]
duration_minutes: 25
language: "en"
last_updated: "2026-02-16"
learning_objectives:
  - "Understand what humanoid robotics is"
  - "Learn key components of humanoid robots"
  - "Explore applications in real world"
prerequisites: []
keywords: ["robotics", "humanoid", "AI", "introduction"]
personalization_enabled: true
translation_enabled: true
rag_enabled: true
authors: ["Dr. Expert"]
difficulty: "beginner"
next_chapter: "chapter-2-mechanics"
prev_chapter: null
---

# Introduction to Humanoid Robotics

## Overview

[Content with < 200 KB total size]

<TOCInline toc={toc} />

## Key Concepts

[Learning content...]

## Interactive Learning

<PersonalizeButton 
  chapterId="chapter-1-intro"
  onPersonalize={() => console.log('Personalizing...')}
/>

This content can be personalized for your learning style above.

## Q&A with AI Tutor

<RAGChatbot 
  chapterId="chapter-1-intro"
  theme="light"
/>

## Translation Support

<TranslateButton 
  chapterId="chapter-1-intro"
  targetLanguage="ur"
/>

[Rest of content...]
```

---

## 14. Support & Resources

- Check `CONSTITUTION.md` for project principles
- Check `ARCHITECTURE.md` for technical details
- Spec files in `specs/` directory
- GitHub Actions in `.github/workflows/`
- Component documentation in `docs/src/components/`

---

**Spec-Kit Plus compliance ensures production-ready,** **scalable, and maintainable infrastructure! ✅**

