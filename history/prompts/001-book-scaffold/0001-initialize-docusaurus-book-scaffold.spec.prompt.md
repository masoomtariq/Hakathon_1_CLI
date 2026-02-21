---
id: 0001
title: Initialize Docusaurus Book Scaffold
stage: spec
date: 2026-02-21
surface: agent
model: claude-sonnet-4-6
feature: 001-book-scaffold
branch: 001-book-scaffold
user: N/A
command: /sp.specify
labels: ["docusaurus", "scaffold", "spec"]
links:
  spec: /specs/001-book-scaffold/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - /specs/001-book-scaffold/spec.md
  - /specs/001-book-scaffold/checklists/requirements.md
tests: []
---

## Prompt

```text
Initializing Book with Docusaurus Book Scaffold and Module & Chapter Metadata Support

Constraints, invariants, non-goals
Constraints
Module/chapter map is the single source of truth for generated docs and sidebar.
Docusaurus project root is book_source/.
Required implementation locations:
Search plugin config: book_source/docusaurus.config.ts
Theme overrides: book_source/src/css/custom.css
Homepage: book_source/src/pages/index.tsx
Fonts: book_source/static/fonts
Font setup script: book_source/scripts/setup-fonts.sh
Full setup script: book_source/scripts/setup.sh
Must run in Ubuntu 24.04 devcontainer and CI.
Invariants
100% chapter coverage from map.
0 broken internal links at build time.
All required frontmatter fields present for all chapters.
Dark mode is default (not optional-only).
Local (self-hosted) search is enabled; no external search SaaS dependency.
Non-goals
Final chapter writing completeness/quality.
Premium visual polish beyond defined six homepage sections.
External hosting/deployment architecture changes (unless separately scoped).
Success Criteria (measurable)
1) Docusaurus scaffold + map generation
 cd book_source && npm ci && npm run build passes on clean clone.
 100% modules/chapters from map generate markdown pages.
 Sidebar order matches map exactly (0 mismatches).
 Every chapter has required frontmatter:
title, slug, module_id, chapter_id, sidebar_position, description
difficulty, prerequisites, duration_minutes, code_repo_url
 Placeholder chapters are explicitly tagged (status: placeholder).
2) Metadata + learning assets
 Frontmatter validator fails CI for missing/invalid fields.
 At least 1 downloadable snippet or scaffold per module (or explicit none marker).
 All code_repo_url links pass link validation (0 broken).
3) Local search plugin (privacy-first)
 @easyops-cn/docusaurus-search-local configured and active in production build.
 Search index generated locally during build.
 No outbound search API calls in browser network log for search usage.
4) Dark mode default + custom theming
 Default initial theme is dark on first load.
 custom.css contains custom variable overrides (not only defaults).
 Contrast check passes for key text/background pairs (WCAG AA for body text).
5) Homepage (6 required sections)
 index.tsx includes all six sections, in order:
Hero
Book Summary
Learning Outcomes
Quotes
Module Cards
Reading/Learning Path (Roadmap, last)
 Each section renders without runtime errors in npm run start.
6) Fonts (self-hosted + Urdu support)
 Fonts exist under book_source/static/fonts:
Inter
JetBrains Mono
Noto Nastaliq Urdu
 setup-fonts.sh is executable and idempotent.
 CSS @font-face wiring works; Urdu sample text renders correctly without fallback breakage.
7) One-step setup automation
 book_source/scripts/setup.sh installs deps, runs font setup, and typecheck in one command.
 Script exits non-zero on failure and prints actionable error stage.
 Fresh contributor can run full setup in ≤15 minutes.
8) Blog customization
 Blog landing is minimal and book-theme oriented.
 Two authors configured:
User author with website + LinkedIn + GitHub + Twitter/X.
Claude author with GitHub + Claude Code docs.
 User’s onboarding/get-started post exists and is discoverable from blog index.
```

## Response snapshot

```text
The feature specification for "Initializing Book with Docusaurus Book Scaffold and Module & Chapter Metadata Support" has been successfully created.

- **Feature Branch**: `001-book-scaffold`
- **Specification File**: `/workspaces/Hakathon_1_CLI/specs/001-book-scaffold/spec.md`
- **Checklist File**: `specs/001-book-scaffold/checklists/requirements.md`

All items in the specification quality checklist have passed.

The specification is ready for the planning phase. You can proceed with `/sp.plan`.
```

## Outcome

- ✅ Impact: Feature specification created and validated.
- 🧪 Tests: Acceptance scenarios defined in spec.
- 📁 Files: /specs/001-book-scaffold/spec.md, /specs/001-book-scaffold/checklists/requirements.md
- 🔁 Next prompts: /sp.plan
- 🧠 Reflection: Initial Docusaurus book scaffold specification generated and validated against quality checklist.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): All PASS.
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): N/A
