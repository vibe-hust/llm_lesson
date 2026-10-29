# VIBE Course Studio

A public course website for two connected courses at HUST's School of Software Engineering:

- **Core Principles and Frontier Applications of Large Models**
- **Large Models and AI Agents: Project Design**

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

## Detailed lessons and Python exercises

- [Transformer fundamentals](https://vibe-hust.github.io/llm_lesson/lessons/transformer-fundamentals.html): representations, Q/K/V, a worked attention calculation, causal masking, Transformer blocks, and the connection between language and vision.
- [LLM agents](https://vibe-hust.github.io/llm_lesson/lessons/llm-agents.html): tools, a bounded controller, state, failure cases, and the transition to a multimodal project.

Each lesson includes one collapsible exercise. Students can edit and run it in the browser or download the original Python file. The agent exercise uses a clearly labeled deterministic mock model and fictional data; its controller and tools are real Python code.

### Open or close Python exercises

Change **one flag** in `dist/config.js`:

```js
export const ENABLE_PYTHON_EXERCISES = true;  // show exercises, initially collapsed
// Set to false to hide all Python exercise sections.
```

Commit and push the change to `main` to publish it. When the flag is false, the lesson text remains visible, exercise sections are removed, and neither the exercise source nor the Python runtime is fetched by the lesson page. This is a presentation switch; published `.py` files remain accessible by their direct URLs.

When enabled, opening a section loads its source file. Clicking **Run Python** loads Pyodide 314.0.7 from jsDelivr in a web worker; the first run requires internet access. No code is submitted to an execution server. Each run starts with a fresh worker, supports Stop, and is limited to 10 seconds of execution after runtime initialization. Output is limited to 16,000 characters. No model API keys, Python packages, or GPU are needed.

The same files run locally with Python 3.9 or later, using only the standard library:

```sh
python3 dist/exercises/transformer_fundamentals.py
python3 dist/exercises/llm_agents.py
```

## Editing

- `dist/content.js`: lessons, resources, projects, and project milestones.
- `dist/index.html`: page structure, course details, and grading proposals.
- `dist/styles.css`: responsive layout and visual design.
- `dist/app.js`: lesson filtering, accessible dialogs and tabs, project selector, and demonstrations.
- `dist/attention.js`: the mathematical attention example.
- `dist/config.js`: the global Python exercise flag.
- `dist/lessons/*.html` and `lesson.css`: the detailed lesson pages and reading layout.
- `dist/lessons/lesson.js` and `python-worker.js`: on-demand Python editor and runner.
- `dist/exercises/*.py`: the exact source used by both the browser and downloads.
- `dist/syllabus.md`: complete downloadable syllabus; regenerate with `node scripts/export-syllabus.mjs` after editing course data.
- `scripts/check.mjs`: content, reference, link, and attention checks; also runs the Python exercise tests.
- `scripts/check_exercises.py`: numerical attention checks and agent success/failure cases.

The attention example computes softmax weights from fixed illustrative Q/K vectors. The agent example is explicitly labeled as a scripted walkthrough and does not call a live model. The capstone descriptions are project briefs, not claims that those applications are already implemented.

## Accessibility and privacy

The site includes a skip link, keyboard-operable tabs, native modal dialogs with focus restoration, labeled controls, live status messages, and reduced-motion support. It has no analytics, accounts, cookies, or API secrets. External reading links open in a new tab.

All academic references link to original papers or official documentation. The course content and its proposed assessment were developed from the course-planning discussion.
