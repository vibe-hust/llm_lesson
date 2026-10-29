# VIBE Course Studio

A public course website for two connected courses at HUST's School of Software Engineering:

- **Core Principles and Frontier Applications of Large Models** — 大模型核心原理与应用前沿
- **Large Models and AI Agents: Project Design** — 大模型与智能体课程设计

The proposed audience is second-year undergraduates in their spring semester. The syllabus is a draft; teaching hours, project duration, credits, and dates are not an approved institutional schedule.

## Course design

The planning basis is 32 teaching hours and a two-week project course. The 16 lessons allocate 12 hours to Transformers, 8 to LLM agents, 4 to visual generation and multimodal learning, and 8 to foundations, adaptation, and evaluation. Visual Transformers also receive dedicated coverage within the Transformer strand.

Each lesson connects objectives to an exercise and observable evidence of learning. Individual experiments lead into a group project involving perception, retrieval, tool use, and evaluation.

## Website

The website is buildless HTML, CSS, and JavaScript in `dist/`. GitHub Actions validates the content and publishes this directory to GitHub Pages when `main` changes. No API credentials, paid services, or package installation are required.

```sh
npm run check
npm run dev
```

The preview is served at `http://127.0.0.1:4173`. Python 3 and Node.js 22 or later are sufficient. Google Fonts is optional; system fonts are used if it cannot load.

## Editing

- `dist/content.js`: lessons, resources, projects, and project milestones.
- `dist/index.html`: page structure, course details, and grading proposals.
- `dist/styles.css`: responsive layout and visual design.
- `dist/app.js`: lesson filtering, accessible dialogs and tabs, project selector, and demonstrations.
- `dist/attention.js`: the mathematical attention example.
- `dist/syllabus.md`: complete downloadable syllabus; regenerate with `node scripts/export-syllabus.mjs` after editing course data.
- `scripts/check.mjs`: content, reference, link, and attention checks.

The attention example computes softmax weights from fixed illustrative Q/K vectors. The agent example is explicitly labeled as a scripted walkthrough and does not call a live model. The capstone descriptions are project briefs, not claims that those applications are already implemented.

## Accessibility and privacy

The site includes a skip link, keyboard-operable tabs, native modal dialogs with focus restoration, labeled controls, live status messages, and reduced-motion support. It has no analytics, accounts, cookies, or API secrets. External reading links open in a new tab.

All academic references link to original papers or official documentation. The course content and its proposed assessment were developed from the course-planning discussion.
