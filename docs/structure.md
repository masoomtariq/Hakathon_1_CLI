## Course Content Structure (Specs/Requirements)

### 1) Global Content Rules

- Add a pre-course chapter before Module 1:
	- **Chapter 0: Home / Preface / Thesis**
	- Must include: introduction, overall learning objectives, prescribed reading and learning paths, suggested exercises.
	- Target length: **1,200 to 1,800 words**.
	- Target time: **30 to 60 minutes**.
- Every chapter must include:
	- **Learning Objectives** (3 to 5 measurable outcomes).
	- **Core Content** (theory + architecture diagram).
	- At least one practical paragraph (example workflow, pseudo-steps, or short code block where relevant, e.g., Python/ROS 2 snippets).
- Not every chapter must include a full lab or assessment.
- If a chapter exceeds **2,500 words** or **90 minutes**, split it into smaller sections.
- At end of high-complexity chapters (especially deep technical chapters), add a practical lab if needed.
- Every module must include:
	- One **Guided Lab** (step-by-step, 45 to 90 minutes).
	- One **Module-End Assessment** (quiz, practical, or rubric artifact).
	- One mini-project or integrated lab checkpoint at module end.
- Program end must include one **Final Capstone Project**.

### 2) Chapter Type and Length Bands (Words)

- Intro/overview chapter: **1,000 to 1,500 words**.
- Hands-on tutorial chapter: **1,500 to 2,500 words**.
- Conceptual deep dive chapter: **2,000 to 3,500 words** (split when needed).
- Capstone/project chapter: **3,000 to 5,000+ words** (split into parts if necessary).

### 3) Required Chapter Blueprint

Each chapter should follow this sequence:

1. Chapter title + estimated time + target word count.
2. Learning Objectives (3 to 5 measurable outcomes).
3. Core Content (theory + architecture diagram).
4. Practical Segment (short practical paragraph and/or code block).
5. Optional Lab (include when complexity requires it).
6. Optional Assessment item (quick quiz/checkpoint if appropriate).
7. Summary + transition to next chapter.

### 4) Course Chapter Map (Recommended)

#### Chapter 0 (Pre-Module)

- **Chapter 0: Home / Preface / Thesis** — **1,200 to 1,800 words**
	- Introductory framing of Physical AI and embodied intelligence.
	- Full-course learning objectives and roadmap.
	- Prescribed reading/learning paths (prepared for future personalization).
	- Suggested warm-up exercises.

#### Module 1: The Robotic Nervous System (ROS 2)

- **1.1 Physical AI Foundations for Robotics** — **1,200 to 1,500 words**
- **1.2 ROS 2 Architecture: Nodes, Topics, Services** — **1,800 to 2,300 words**
- **1.3 Building ROS 2 Packages with Python (rclpy)** — **1,800 to 2,500 words**
- **1.4 URDF for Humanoid Robot Description** — **1,800 to 2,400 words**
- **Module 1 Guided Lab (Required)** — **700 to 1,200 words** (lab sheet)
- **Module 1 Mini-Project/Assessment (Required)** — **400 to 800 words** (brief + rubric)

#### Module 2: The Digital Twin (Gazebo & Unity)

- **2.1 Gazebo Simulation Fundamentals** — **1,500 to 2,100 words**
- **2.2 Physics, Collisions, and Sensor Simulation** — **2,000 to 2,500 words**
- **2.3 Unity-Based Interaction and Visualization** — **1,800 to 2,400 words**
- **Module 2 Guided Lab (Required)** — **700 to 1,200 words** (lab sheet)
- **Module 2 Mini-Project/Assessment (Required)** — **400 to 800 words** (brief + rubric)

#### Module 3: The AI-Robot Brain (NVIDIA Isaac)

- **3.1 Isaac Sim and Synthetic Data Pipeline** — **2,000 to 2,500 words**
- **3.2 Isaac ROS + VSLAM + Navigation (Nav2)** — **2,300 to 2,500 words**
- **3.3 Sim-to-Real Deployment on Jetson** — **2,000 to 2,500 words**
- **Module 3 Guided Lab (Required)** — **800 to 1,400 words** (lab sheet)
- **Module 3 Mini-Project/Assessment (Required)** — **500 to 900 words** (brief + rubric)

#### Module 4: Vision-Language-Action (VLA)

- **4.1 Voice-to-Action with Whisper** — **1,800 to 2,500 words**
- **4.2 LLM Cognitive Planning to ROS 2 Action Sequences** — **2,200 to 2,500 words**
- **4.3 Multi-Modal Perception and Interaction Loop** — **2,000 to 2,500 words**
- **Module 4 Guided Lab (Required)** — **900 to 1,500 words** (lab sheet)
- **Module 4 Mini-Project/Assessment (Required)** — **500 to 1,000 words** (brief + rubric)

### 5) Final Capstone (Program-End Requirement)

- **Final Capstone: The Autonomous Humanoid**
	- Target length: **3,500 to 5,000+ words** (split into parts if needed).
	- Must integrate: voice command input, LLM planning, navigation, obstacle handling, object identification, and manipulation.
	- Must include:
		- Capstone brief and success criteria.
		- Build phases and milestones.
		- Evaluation rubric (technical correctness, reliability, safety, explainability, presentation).

### 6) Assessment and Lab Distribution Requirements

- Chapter-level:
	- Every chapter includes practical content.
	- Full chapter lab/assessment is optional based on complexity and length.
- Module-level:
	- Exactly one required guided lab per module.
	- Exactly one required module-end assessment (can be combined with mini-project).
- Program-level:
	- Final capstone is mandatory and serves as terminal integrative assessment.
