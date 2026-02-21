# ADR-0001: Documentation Framework and Core Structure

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2026-02-21
- **Feature:** 001-book-scaffold
- **Context:** The project requires an AI-native textbook with content organized into modules and chapters. The content needs to be easily maintainable and support automatic sidebar navigation. A single source of truth for module and chapter metadata is crucial. The deployment environment is Ubuntu 24.04 devcontainer and CI, requiring a solution compatible with this setup. Local search and a default dark mode are also key requirements.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

- Framework: Docusaurus for the AI-native textbook.
- Content Structure: Central map (JSON/YAML) at `book_source/docs/module-chapter-map.json` (or YAML) for module and chapter metadata. This map will drive content organization and sidebar navigation.
- Project Structure: Single-project structure with `book_source/` as the Docusaurus root.
- Search: Local (self-hosted) search enabled using `@easyops-cn/docusaurus-search-local`.
- Theming: Dark mode set as default.
- Development/CI Environment: Ubuntu 24.04 devcontainer and CI.

<!-- For technology stacks, list all components:
     - Framework: Next.js 14 (App Router)
     - Styling: Tailwind CSS v3
     - Deployment: Vercel
     - State Management: React Context (start simple)
-->

## Consequences

### Positive

- Docusaurus provides a robust, modern framework for documentation generation, with good community support and a strong plugin ecosystem.
- Centralized metadata map simplifies content management and ensures consistency across modules and chapters.
- Automatic sidebar generation from the map reduces manual effort and improves navigation.
- Single-project structure simplifies development, deployment, and maintenance.
- Local search ensures data privacy and no external dependencies.
- Default dark mode enhances user experience for prolonged reading.
- Ubuntu 24.04 devcontainer and CI compatibility ensures consistent development and deployment environments.

<!-- Example: Integrated tooling, excellent DX, fast deploys, strong TypeScript support -->

### Negative

- Initial setup and learning curve for Docusaurus and its conventions.
- Dependency on a specific Docusaurus search plugin for local search.
- Potential complexity in managing the central metadata map as the book scales, though mitigated by its single-source-of-truth nature.
- Limited flexibility if a completely different documentation approach is needed in the future, due to framework coupling.

<!-- Example: Vendor lock-in to Vercel, framework coupling, learning curve -->

## Alternatives Considered

- **Alternative Documentation Frameworks**:
    - MkDocs: Simpler, Python-based, but potentially less flexible for complex features and custom layouts compared to Docusaurus (React-based).
    - Sphinx: Powerful, Python-based, widely used for technical documentation, but might have a steeper learning curve for web development teams and less native support for modern web features like React components.
    - Custom Static Site Generator (e.g., Next.js with MDX): Offers maximum flexibility but requires significant development effort to replicate features like sidebar generation, search, and theming that Docusaurus provides out-of-the-box.
- **Alternative Metadata Management**:
    - Frontmatter in each Markdown file: Less centralized, requires more manual consistency checks, and harder to programmatically generate sidebars or enforce global content rules.
    - Database-backed metadata: Over-engineering for a static site, introduces external dependencies and complexity for content management.

<!-- Group alternatives by cluster:
     Alternative Stack A: Remix + styled-components + Cloudflare
     Alternative Stack B: Vite + vanilla CSS + AWS Amplify
     Why rejected: Less integrated, more setup complexity
-->

## References

- Feature Spec: /workspaces/Hakathon_1_CLI/specs/001-book-scaffold/spec.md
- Implementation Plan: /workspaces/Hakathon_1_CLI/specs/001-book-scaffold/plan.md
- Related ADRs: null
- Evaluator Evidence: null <!-- link to eval notes/PHR showing graders and outcomes -->
