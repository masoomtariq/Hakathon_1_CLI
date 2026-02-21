# Feature Tasks: Initializing Book with Docusaurus Book Scaffold and Module & Chapter Metadata Support

**Feature Branch**: `001-book-scaffold` | **Date**: 2026-02-21 | **Spec**: /workspaces/Hakathon_1_CLI/specs/001-book-scaffold/spec.md
**Plan**: /workspaces/Hakathon_1_CLI/specs/001-book-scaffold/plan.md

## Overall Goal

Initialize a Docusaurus project at `book_source/` to serve as an AI-native textbook, supporting module and chapter metadata from a central map for automatic content organization and sidebar navigation.

## Task Generation Context

This list of tasks is derived from the feature specification (`spec.md`) and implementation plan (`plan.md`). Each task is designed to be atomic, independently testable, and to advance the overall project goal. Dependencies are explicitly stated to ensure a logical execution flow.

## Implementation Strategy

We will proceed with an MVP-first approach, focusing on completing P1 user stories before moving to P2 and polish tasks. Tasks within each phase can be executed in parallel where indicated by the `[P]` tag.

---

## Phase 1: Setup

Goal: Establish the basic Docusaurus project structure and foundational scripts/directories.

### Tasks

- [ ] T001 Create Docusaurus project scaffold at `book_source/` (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: A new Docusaurus project structure exists under `book_source/`.
  - **Dependencies**: None
  - **Verifiable Output**: `book_source/` directory with `docusaurus.config.ts`, `src/`, `static/` etc.
  - **Justification**: This is the very first step, providing the necessary project files to begin configuration.

- [X] T002 Configure `docusaurus.config.ts` with initial settings, including `title`, `tagline`, `url`, `baseUrl`, `projectName`, `organizationName`, `onBrokenLinks`, `onBrokenMarkdownLinks`. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: `book_source/docusaurus.config.ts` exists and contains basic configuration.
  - **Dependencies**: T001
  - **Verifiable Output**: Modified `book_source/docusaurus.config.ts` file.
  - **Justification**: Establishes the core configuration for the Docusaurus site.

- [ ] T003 Create `book_source/scripts/setup-fonts.sh` as an executable script. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: `book_source/scripts/setup-fonts.sh` exists and is executable.
  - **Dependencies**: T001
  - **Verifiable Output**: Executable script file.
  - **Justification**: Provides a dedicated script for font setup, as per the spec.

- [ ] T004 Create `book_source/scripts/setup.sh` as an executable script. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: `book_source/scripts/setup.sh` exists and is executable.
  - **Dependencies**: T001
  - **Verifiable Output**: Executable script file.
  - **Justification**: Centralizes the full project setup process, as per the spec.

- [ ] T005 Create `book_source/src/css/custom.css` for custom styling. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: `book_source/src/css/custom.css` exists.
  - **Dependencies**: T001
  - **Verifiable Output**: Empty `custom.css` file.
  - **Justification**: Provides the entry point for custom CSS overrides.

- [ ] T006 Create `book_source/src/pages/index.tsx` for the homepage. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: `book_source/src/pages/index.tsx` exists.
  - **Dependencies**: T001
  - **Verifiable Output**: Empty `index.tsx` file.
  - **Justification**: Establishes the main entry point for the site's homepage.

- [ ] T007 Create `book_source/static/fonts` directory. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: `book_source/static/fonts` directory exists.
  - **Dependencies**: T001
  - **Verifiable Output**: Empty directory.
  - **Justification**: Prepares the location for self-hosted fonts.

---

## Phase 2: Foundational

Goal: Implement core components that are prerequisites for user story specific tasks.

### Tasks

- [ ] T008 Create initial `book_source/docs/module-chapter-map.json` (or YAML) with a sample module and chapter structure. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: `book_source/docs/module-chapter-map.json` (or YAML) exists with valid structure.
  - **Dependencies**: T001
  - **Verifiable Output**: JSON/YAML file with sample data.
  - **Justification**: This map is the single source of truth for content organization and sidebar generation.

- [X] T009 Develop a custom Docusaurus plugin for frontmatter validation. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: A Docusaurus plugin file exists and is configured in `docusaurus.config.ts` to perform frontmatter validation.
  - **Dependencies**: T002
  - **Verifiable Output**: Plugin file and updated `docusaurus.config.ts`.
  - **Justification**: Ensures all chapters adhere to required metadata fields, fulfilling `FR-004`.

---

## Phase 3: User Story 1 - Docusaurus Project Initialization (P1)

Goal: Have a functional Docusaurus site scaffold ready for content.

### Acceptance Criteria

1.  `cd book_source && npm ci && npm run build` completes successfully without errors.
2.  The default Docusaurus homepage is accessible after starting the development server.

### Tasks

- [X] T010 [US1] Ensure `cd book_source && npm ci && npm run build` passes on a clean clone. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: The command executes successfully with exit code 0.
  - **Dependencies**: T001, T002, T005, T006, T007
  - **Verifiable Output**: Successful build output.
  - **Justification**: Validates the initial Docusaurus setup, fulfilling `SC-001`.

- [ ] T011 [US1] Verify the default Docusaurus homepage is accessible by running `npm run start` in `book_source/`. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: The Docusaurus development server starts and the homepage loads in a browser.
  - **Dependencies**: T010
  - **Verifiable Output**: Accessible local web server.
  - **Justification**: Confirms the basic Docusaurus site is functional.

---

## Phase 4: User Story 2 - Module & Chapter Metadata Support (P1)

Goal: Content organization and sidebar navigation are automatically generated and consistent from a central map.

### Acceptance Criteria

1.  100% of modules and chapters from the map generate markdown pages.
2.  Sidebar order exactly matches the order defined in the map.
3.  All required frontmatter fields (`title`, `slug`, `module_id`, `chapter_id`, `sidebar_position`, `description`, `difficulty`, `prerequisites`, `duration_minutes`, `code_repo_url`) are present for every chapter.
4.  Placeholder chapters are explicitly tagged with `status: placeholder`.

### Tasks

- [ ] T012 [P] [US2] Generate Docusaurus documentation pages for all modules and chapters defined in `book_source/docs/module-chapter-map.json`. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: Markdown files are created for each module and chapter in the map.
  - **Dependencies**: T008
  - **Verifiable Output**: New markdown files in `book_source/docs/`.
  - **Justification**: This directly fulfills `FR-002` and `SC-002` by creating the content based on the map.

- [ ] T013 [US2] Configure Docusaurus sidebar navigation to precisely reflect the structure and order of `book_source/docs/module-chapter-map.json`. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: The Docusaurus sidebar renders with modules and chapters in the exact order specified by the map.
  - **Dependencies**: T012
  - **Verifiable Output**: Functional sidebar matching the map.
  - **Justification**: Fulfills `FR-003` and `SC-003`, ensuring correct content discoverability.

- [ ] T014 [US2] Integrate the frontmatter validation plugin (`T009`) into the CI/build process to fail for missing/invalid fields. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: A build process with an invalid frontmatter entry fails CI, and a valid one passes.
  - **Dependencies**: T009, T012
  - **Verifiable Output**: CI/build logs showing validation failures.
  - **Justification**: Enforces `FR-004` and `FR-017`, ensuring data integrity.

- [ ] T015 [US2] Ensure all required frontmatter fields are present for all chapters, as validated by the plugin. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: All generated/sample chapter markdown files pass frontmatter validation for all required fields.
  - **Dependencies**: T012, T014
  - **Verifiable Output**: Successful validation reports/logs.
  - **Justification**: Direct verification of `SC-004`.

- [ ] T016 [US2] Explicitly tag placeholder chapters in their frontmatter with `status: placeholder`. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: Placeholder chapters are identified and correctly tagged in frontmatter.
  - **Dependencies**: T012, T014
  - **Verifiable Output**: Verified frontmatter tags.
  - **Justification**: Fulfills `FR-005`.

---

## Phase 5: User Story 3 - Local Search Functionality (P2)

Goal: Enable privacy-first, local search for the book's content.

### Acceptance Criteria

1.  `@easyops-cn/docusaurus-search-local` is configured and active in the production build.
2.  The search index is generated locally during the build process.
3.  No outbound search API calls are observed in the browser's network log for search usage.

### Tasks

- [ ] T017 [US3] Integrate and configure `@easyops-cn/docusaurus-search-local` plugin into `book_source/docusaurus.config.ts`. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: The search plugin is correctly added to the Docusaurus configuration.
  - **Dependencies**: T002
  - **Verifiable Output**: Updated `docusaurus.config.ts`.
  - **Justification**: Enables local search functionality, fulfilling `FR-006` and `SC-005`.

- [ ] T018 [US3] Verify that the search index is generated locally during the Docusaurus build process. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: Build logs show evidence of local search index generation.
  - **Dependencies**: T010, T017
  - **Verifiable Output**: Build output confirming index generation.
  - **Justification**: Confirms `FR-007`.

- [ ] T019 [US3] Confirm no outbound search API calls in the browser network log when using search in a production build. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: Network tab in browser developer tools shows no external search API requests.
  - **Dependencies**: T010, T017, T018
  - **Verifiable Output**: Browser network tab inspection.
  - **Justification**: Ensures privacy-first search, fulfilling `SC-006`.

---

## Phase 6: Polish & Cross-Cutting Concerns

Goal: Address remaining stylistic, functional, and setup requirements.

### Tasks

- [ ] T020 Configure Docusaurus to default to dark mode on first load. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: The site loads with dark mode enabled by default.
  - **Dependencies**: T002
  - **Verifiable Output**: Default theme is dark in browser.
  - **Justification**: Fulfills `FR-008` and `SC-007`.

- [ ] T021 Apply custom CSS variable overrides in `book_source/src/css/custom.css`. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: `custom.css` contains custom variables (not only Docusaurus defaults) and these are applied.
  - **Dependencies**: T005
  - **Verifiable Output**: Updated `custom.css` and visual changes.
  - **Justification**: Fulfills `FR-009` and `SC-008`.

- [ ] T022 Implement `book_source/src/pages/index.tsx` with all six required sections in order: Hero, Book Summary, Learning Outcomes, Quotes, Module Cards, and Reading/Learning Path. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: `index.tsx` contains and renders all sections without runtime errors.
  - **Dependencies**: T006
  - **Verifiable Output**: Functional homepage with all sections.
  - **Justification**: Fulfills `FR-010` and `SC-009`.

- [ ] T023 Copy Inter, JetBrains Mono, and Noto Nastaliq Urdu fonts to `book_source/static/fonts`. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: All specified font files exist in the `static/fonts` directory.
  - **Dependencies**: T007
  - **Verifiable Output**: Font files present in directory.
  - **Justification**: Fulfills `FR-011` and `SC-010`.

- [ ] T024 Wire CSS `@font-face` rules in `book_source/src/css/custom.css` for all self-hosted fonts. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: `custom.css` includes correct `@font-face` declarations for all fonts.
  - **Dependencies**: T005, T023
  - **Verifiable Output**: Updated `custom.css` with font declarations.
  - **Justification**: Ensures fonts are correctly loaded.

- [ ] T025 Verify Urdu sample text renders correctly without fallback breakage, using the Noto Nastaliq Urdu font. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: Urdu text displays correctly with the intended font.
  - **Dependencies**: T022, T024
  - **Verifiable Output**: Visual inspection of Urdu text on the site.
  - **Justification**: Fulfills `FR-011` and `SC-012`.

- [ ] T026 Ensure `book_source/scripts/setup.sh` installs dependencies (`npm ci`), runs font setup (`./setup-fonts.sh`), and typechecks (`npm run typecheck` or equivalent) in one command, exiting non-zero on failure. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: `setup.sh` orchestrates the full setup, handles errors, and is idempotent.
  - **Dependencies**: T003, T004, T010
  - **Verifiable Output**: Successful execution of `setup.sh` and its error handling.
  - **Justification**: Fulfills `FR-013` and `SC-013`.

- [ ] T027 Configure the Docusaurus blog for a minimal, book-theme oriented landing page. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: Blog index page has a clean, simple layout consistent with the book theme.
  - **Dependencies**: T002
  - **Verifiable Output**: Visual inspection of blog index.
  - **Justification**: Fulfills `FR-014` and `SC-015`.

- [ ] T028 Configure two authors for the blog: a User author (with website, LinkedIn, GitHub, Twitter/X) and a Claude author (with GitHub, Claude Code docs). (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: Author metadata is correctly configured and displayed for blog posts.
  - **Dependencies**: T027
  - **Verifiable Output**: Author information visible on blog posts.
  - **Justification**: Fulfills `FR-015` and `SC-016`.

- [ ] T029 Include a user onboarding/get-started post discoverable from the blog index. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: A new blog post with onboarding content is accessible from the blog index.
  - **Dependencies**: T027, T028
  - **Verifiable Output**: New blog post available on site.
  - **Justification**: Fulfills `FR-016` and `SC-017`.

- [ ] T030 Implement link validation for all `code_repo_url` links in chapter frontmatter. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: A mechanism (e.g., custom plugin or build script) validates `code_repo_url` links, failing on broken links.
  - **Dependencies**: T009, T012
  - **Verifiable Output**: Validation reports/logs.
  - **Justification**: Fulfills `FR-018`.

- [ ] T031 Ensure at least 1 downloadable snippet or scaffold (as a Markdown file for direct linking) is available per module under a dedicated `assets/` subdirectory within each module's content folder. (Estimated Duration: 15-30 minutes)
  - **Acceptance Criteria**: Each module has an `assets/` subdirectory containing at least one linked Markdown snippet.
  - **Dependencies**: T012
  - **Verifiable Output**: File structure and linked snippets are present.
  - **Justification**: Fulfills `FR-019`.

---

## Dependency Graph (User Story Completion Order)

- User Story 1 (Docusaurus Project Initialization)
- User Story 2 (Module & Chapter Metadata Support) depends on User Story 1
- User Story 3 (Local Search Functionality) depends on User Story 1

## Parallel Execution Opportunities

- Within Phase 1, T003, T004, T005, T006, T007 can be executed in parallel after T001 and T002.
- Within Phase 4, T012 can be run in parallel with the setup of T014, T015, T016 (after T008 and T009).
- Within Phase 6, many tasks are independent and can be parallelized, such as T020, T021, T022, T023, T024, T027, T028, T029, T030, T031.

## Suggested MVP Scope

The Minimum Viable Product (MVP) for this feature is the completion of **User Story 1: Docusaurus Project Initialization**. This provides a foundational Docusaurus site that can be built and served, allowing for incremental content and feature development.

## Format Validation

All tasks adhere to the `- [ ] [TaskID] [P?] [Story?] Description with file path` format.
