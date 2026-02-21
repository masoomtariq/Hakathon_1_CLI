# Feature Specification: Initializing Book with Docusaurus Book Scaffold and Module & Chapter Metadata Support

**Feature Branch**: `001-book-scaffold`
**Created**: 2026-02-21
**Status**: Draft
**Input**: User description: "Initializing Book with Docusaurus Book Scaffold and Module & Chapter Metadata Support

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
 User’s onboarding/get-started post exists and is discoverable from blog index.""

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Docusaurus Project Initialization (Priority: P1)

As a contributor, I want to initialize a Docusaurus project with the "book_source/" root, so that I have a functional documentation site scaffold ready for content.

**Why this priority**: This is the foundational step for the entire project, enabling all subsequent development. Without it, no other features can be built or tested.

**Independent Test**: Can be fully tested by running `cd book_source && npm ci && npm run build` on a clean clone, ensuring the build passes and the basic site serves content.

**Acceptance Scenarios**:

1.  **Given** a clean repository clone, **When** `cd book_source && npm ci && npm run build` is executed, **Then** the command completes successfully without errors.
2.  **Given** a successful build, **When** the Docusaurus development server is started, **Then** the default Docusaurus homepage is accessible.

---

### User Story 2 - Module & Chapter Metadata Support (Priority: P1)

As a content author, I want the Docusaurus project to support module and chapter metadata from a central map, so that content organization and sidebar navigation are automatically generated and consistent.

**Why this priority**: This directly addresses a core requirement for content structure and discoverability, ensuring the book's modularity is enforced and manageable from a single source.

**Independent Test**: Can be tested by defining a simple module/chapter map, generating the site, and verifying that all defined modules and chapters appear in the sidebar in the correct order, and that generated markdown pages exist for each.

**Acceptance Scenarios**:

1.  **Given** a module/chapter map as the single source of truth, **When** Docusaurus builds the documentation, **Then** 100% of modules and chapters from the map generate markdown pages.
2.  **Given** a module/chapter map, **When** the Docusaurus sidebar is rendered, **Then** its order exactly matches the order defined in the map.
3.  **Given** any chapter, **When** its frontmatter is validated, **Then** it contains `title`, `slug`, `module_id`, `chapter_id`, `sidebar_position`, `description`, `difficulty`, `prerequisites`, `duration_minutes`, and `code_repo_url`.
4.  **Given** a chapter designated as a placeholder, **When** its frontmatter is validated, **Then** it is explicitly tagged with `status: placeholder`.

---

### User Story 3 - Local Search Functionality (Priority: P2)

As a user, I want to search the book's content using a local, privacy-first search solution, so that I can quickly find relevant information without relying on external services.

**Why this priority**: Enhances user experience by providing a core navigation feature while adhering to privacy principles. It's important but secondary to the core content structure.

**Independent Test**: Can be tested by building the Docusaurus project for production, then using the search bar and verifying that results appear, and no external search API calls are made in the network tab.

**Acceptance Scenarios**:

1.  **Given** a production build of the Docusaurus site, **When** a search query is entered, **Then** the local search plugin provides relevant results.
2.  **Given** the Docusaurus site in a browser, **When** a search operation is performed, **Then** no outbound search API calls are observed in the browser's network log.

---

### Edge Cases

- What happens if the module/chapter map contains invalid entries or circular dependencies?
- How does the system handle missing required frontmatter fields for chapters during validation?
- What happens if `code_repo_url` links are broken?
- How does the system behave when custom fonts fail to load?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST scaffold a Docusaurus project at `book_source/`.
- **FR-002**: System MUST generate documentation pages for all modules and chapters defined in the module/chapter map.
- **FR-003**: System MUST generate Docusaurus sidebar navigation based on the module/chapter map's structure and order.
- **FR-004**: System MUST validate that all chapters include the required frontmatter fields (`title`, `slug`, `module_id`, `chapter_id`, `sidebar_position`, `description`, `difficulty`, `prerequisites`, `duration_minutes`, `code_repo_url`).
- **FR-005**: System MUST ensure placeholder chapters are explicitly tagged in frontmatter.
- **FR-006**: System MUST integrate and configure `@easyops-cn/docusaurus-search-local` for local search.
- **FR-007**: System MUST generate the search index locally during the Docusaurus build process.
- **FR-008**: System MUST configure Docusaurus to default to dark mode on first load.
- **FR-009**: System MUST apply custom CSS overrides from `book_source/src/css/custom.css`.
- **FR-010**: System MUST include a homepage at `book_source/src/pages/index.tsx` with six specific sections in order: Hero, Book Summary, Learning Outcomes, Quotes, Module Cards, and Reading/Learning Path.
- **FR-011**: System MUST include self-hosted fonts (Inter, JetBrains Mono, Noto Nastaliq Urdu) under `book_source/static/fonts`.
- **FR-012**: System MUST provide a script `book_source/scripts/setup-fonts.sh` to set up fonts.
- **FR-013**: System MUST provide a comprehensive setup script `book_source/scripts/setup.sh` that installs dependencies, sets up fonts, and runs type-checking.
- **FR-014**: System MUST configure the Docusaurus blog for a minimal, book-theme oriented landing.
- **FR-015**: System MUST configure two authors for the blog: a User author (with website, LinkedIn, GitHub, Twitter/X) and a Claude author (with GitHub, Claude Code docs).
- **FR-016**: System MUST include a user onboarding/get-started post discoverable from the blog index.
- **FR-017**: Frontmatter validator MUST fail CI for missing/invalid fields.
- **FR-017a**: System MUST utilize a custom Docusaurus plugin for frontmatter validation.
- **FR-018**: All `code_repo_url` links MUST pass link validation.
- **FR-019**: At least 1 downloadable snippet or scaffold (as a Markdown file for direct linking) MUST be available per module under a dedicated `assets/` subdirectory within each module's content folder (e.g., `book_source/docs/module-1/assets/snippet.md`), or an explicit none marker.

### Key Entities *(include if feature involves data)*

- **Module**: Represents a logical grouping of chapters within the book. Attributes include `id`, `title`, `description`.
- **Chapter**: Represents a single learning unit within a module. Attributes include `title`, `slug`, `module_id`, `chapter_id`, `sidebar_position`, `description`, `difficulty`, `prerequisites`, `duration_minutes`, `code_repo_url`, `status`.
- **Module/Chapter Map File**: A machine-readable (e.g., JSON or YAML) file located at `book_source/module-chapter-map.json` that defines the complete module and chapter structure and order for Docusaurus sidebar and page generation, adhering to guidelines in `docs/structure.md`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

-   **SC-001**: `cd book_source && npm ci && npm run build` passes on a clean clone with 0 errors.
-   **SC-002**: 100% of modules and chapters from the map generate markdown pages.
-   **SC-003**: Sidebar order matches the module/chapter map exactly (0 mismatches).
-   **SC-004**: All required frontmatter fields are present for all chapters, and validation tools confirm this.
-   **SC-005**: `@easyops-cn/docusaurus-search-local` is configured and active in the production build.
-   **SC-006**: No outbound search API calls are made in the browser network log for search usage.
-   **SC-007**: The default initial theme is dark on first load.
-   **SC-008**: Custom variable overrides are present in `custom.css` (not only defaults).
-   **SC-009**: The homepage `index.tsx` renders all six required sections in order without runtime errors during `npm run start`.
-   **SC-010**: All specified fonts (Inter, JetBrains Mono, Noto Nastaliq Urdu) exist under `book_source/static/fonts`.
-   **SC-011**: The `setup-fonts.sh` script is executable and idempotent, correctly wiring CSS `@font-face` rules.
-   **SC-012**: Urdu sample text renders correctly without fallback breakage.
-   **SC-013**: The `setup.sh` script installs dependencies, runs font setup, and typecheck in one command, exits non-zero on failure, and prints actionable error stage.
-   **SC-014**: A fresh contributor can run the full setup in ≤15 minutes.
-   **SC-015**: The blog landing page is minimal and book-theme oriented.
-   **SC-016**: Two authors are configured for the blog as specified.
-   **SC-017**: A user's onboarding/get-started post exists and is discoverable from the blog index.
