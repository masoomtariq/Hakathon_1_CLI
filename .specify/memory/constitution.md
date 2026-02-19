<!--
Sync Impact Report:
Version change: None -> 1.0.0
List of modified principles: All 9 principles added/defined.
Added sections: All Core Principles (9 of them), Additional Constraints, Development Workflow, Governance.
Removed sections: None (placeholders were filled).
Templates requiring updates:
- .specify/templates/plan-template.md: ⚠ pending (Constitution Check section might need update to reflect new principles)
- .specify/templates/spec-template.md: ⚠ pending (Might need updates to ensure alignment with new principles like "Testable Content Output" and "Specification-Driven Development")
- .specify/templates/tasks-template.md: ⚠ pending (Task categorization might reflect new principle-driven task types)
- .specify/templates/commands/sp.constitution.md: ✅ updated (no specific updates needed as it's a generic command execution)
Follow-up TODOs: None
-->
# AI-native textbook with RAG chatbot embedded in the book for Physical AI & Humanoid Robotics Constitution

## Core Principles

### I. SDD-RI Theory Adherence
All development MUST strictly follow SDD-RI theory, emphasizing specification primacy and intelligence accumulation through reusable subagents and skills using the P+Q+P pattern.

### II. Testable Content Output
All book content MUST be output in clear, testable Markdown/MDX format to ensure quality and facilitate automated validation.

### III. Comprehensive Course Coverage
Content MUST comprehensively cover all specified course modules, including ROS 2, Gazebo/Unity, NVIDIA Isaac, VLA, weekly breakdowns, and assessments.

### IV. Atomic Tasks & Checkpoints
Development workflow MUST utilize atomic tasks and define clear checkpoints for measurable progress tracking and efficient iteration.

### V. Specification-Driven Development
All development MUST be specification-driven. 'Vibe coding' is explicitly forbidden; every change MUST trace back to an approved specification.

### VI. Professional & Educational Tone
The project's identity MUST maintain a professional and educational tone appropriate for an AI-native textbook.

### VII. Iterative Clarity & Edge Case Handling
Development behavior MUST prioritize iterative refinement for clarity and explicitly address edge cases, such as handling user-selected text within the RAG chatbot.

### VIII. Reusable Skills & Components
Reusable skills and components MUST be created for core functionalities including content generation, Urdu translation, RAG querying, and personalization features.

### IX. Defined Success Criteria
Project success is defined by: book deployment to GitHub Pages, accurate RAG chatbot responses, and full functionality of all bonus features.

## Additional Constraints

Technology stack requirements, compliance standards, deployment policies, etc.

## Development Workflow

Code review requirements, testing gates, deployment approval process, etc.

## Governance

This Constitution supersedes all other practices. Amendments require documentation, approval, and a migration plan. All PRs/reviews MUST verify compliance. Complexity MUST be justified.

**Version**: 1.0.0 | **Ratified**: 2026-02-19 | **Last Amended**: 2026-02-19
