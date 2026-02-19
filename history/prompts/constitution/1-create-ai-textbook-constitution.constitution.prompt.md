---
id: 1
title: Create AI Textbook Constitution
stage: constitution
date: 2026-02-19
surface: agent
model: claude-sonnet-4-6
feature: none
branch: main
user: user
command: "/sp.constitution Create a strong constitution for an AI-native textbook with (RAG chatbot embedded in the book) project on \"Physical AI & Humanoid Robotics\" that strictly follows these principles:\n\nConstitution Rules:\n1. Always follow SDD-RI theory : Specification primacy, accumulate intelligence via reusable subagents and skills using P+Q+P pattern.\n2. For book content output in clear, testable Markdown/MDX.\n3. Ensure content covers all course modules: ROS 2, Gazebo/Unity, NVIDIA Isaac, VLA, weekly breakdown, assessments.\n4. Use atomic tasks, checkpoints for progress.\n5. No vibe coding: Everything spec-driven.\n6. Identity: Professional, educational tone for AI-native textbook.\n7. Behavior: Iterate for clarity, handle edge cases like user-selected text in chatbot.\n8. Reusable Components: Create skills for content generation, Urdu translation, RAG querying, personalization.\n9. Success Criteria: Book deploys to GitHub Pages, chatbot answers accurately, bonuses functional."
labels: ["constitution", "creation"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
---

## Prompt

Create a strong constitution for an AI-native textbook with (RAG chatbot embedded in the book) project on "Physical AI & Humanoid Robotics" that strictly follows these principles:

Constitution Rules:
1. Always follow SDD-RI theory : Specification primacy, accumulate intelligence via reusable subagents and skills using P+Q+P pattern.
2. For book content output in clear, testable Markdown/MDX.
3. Ensure content covers all course modules: ROS 2, Gazebo/Unity, NVIDIA Isaac, VLA, weekly breakdown, assessments.
4. Use atomic tasks, checkpoints for progress.
5. No vibe coding: Everything spec-driven.
6. Identity: Professional, educational tone for AI-native textbook.
7. Behavior: Iterate for clarity, handle edge cases like user-selected text in chatbot.
8. Reusable Components: Create skills for content generation, Urdu translation, RAG querying, personalization.
9. Success Criteria: Book deploys to GitHub Pages, chatbot answers accurately, bonuses functional.

## Response snapshot

The project constitution has been created at `.specify/memory/constitution.md` with version **1.0.0**. This is the initial creation of the constitution, incorporating all 9 core principles.

Files flagged for manual follow-up to ensure consistency:
*   `.specify/templates/plan-template.md`: Review and update the "Constitution Check" section to align with the new principles.
*   `.specify/templates/spec-template.md`: Review and update to ensure alignment with principles such as "Testable Content Output" and "Specification-Driven Development".
*   `.specify/templates/tasks-template.md`: Review and update task categorization to reflect any new principle-driven task types.

Suggested commit message:
`docs: create constitution v1.0.0 (initial creation + 9 core principles)`

## Outcome

- ✅ Impact: Created the initial project constitution based on user-provided rules.
- 🧪 Tests: N/A
- 📁 Files: .specify/memory/constitution.md created/modified.
- 🔁 Next prompts: User to review constitution and suggested commit message. Manual follow-up on template consistency.
- 🧠 Reflection: Successfully parsed user rules, applied to template, handled versioning, and identified dependent files for review. PHR created.

## Evaluation notes (flywheel)

- Failure modes observed: N/A
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
