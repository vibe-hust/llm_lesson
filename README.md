# VIBE Courses

A public course website for two connected courses at HUST's School of Software Engineering:

- **Core Principles and Frontier Applications of Large Models**
- **Large Models and AI Agents: Project Design**

The courses serve the 2025 AI Large Model Experimental Class in spring 2027. Both run in the second-year spring semester: 32 theory hours (2 credits), followed by a concentrated two-week course-design project (2 credits). Teams have three students.

## Course design

The 16 lessons allocate 4 hours to neural networks and PyTorch, 10 to Transformer fundamentals, 8 to language, vision, and multimodal models, 8 to LLM agents, and 2 to integration and frontier examples. Students know Python but are not assumed to have neural-network or PyTorch experience. The required depth is understand and implement; automatic differentiation is used for training and lengthy derivations are optional.

Each lesson connects objectives, practical work, evidence, and a specific use in course design. Four individual preparation exercises lead into a team project involving perception, retrieval, tool use, and evaluation. Teams choose different applications under common requirements. Required work uses laptops and teaching-provided language and vision APIs; no GPU is required.

Theory grading is 30% individual exercises, 20% quizzes, and 50% an individual open-book written exam. Project grading is 25% implementation, 25% evaluation and failure analysis, 15% reproducibility, and 35% individual defense and live modification. Preparation work is not graded twice. AI assistance is allowed in exercises and projects with disclosure; the final exam, defense, and live modification are completed without it.

The course structure and policies were settled in the teaching discussion on 29 October 2026. Assignment deadlines, exam duration, and API limits remain operational scheduling details. The full preparation notebooks, live API access, datasets, and capstone sandbox still need to be prepared; only the two detailed browser exercises are currently implemented.

## Website

The website is buildless HTML, CSS, and JavaScript in `dist/`. GitHub Actions validates the content and publishes this directory to GitHub Pages when `main` changes. The website and its mock browser exercises need no API credentials or paid services. Live model access for coursework is provided separately by the teaching team.

```sh
npm run check
npm run dev
```

The preview is served at `http://127.0.0.1:4173`. Python 3 and Node.js 22 or later are sufficient. The design follows the restrained academic style of the [CMU Robotics Institute faculty page](https://www.ri.cmu.edu/ri-faculty/jun-yan-zhu/): a white background, burgundy links, Open Sans body text, and Roboto headings. Body text is 16px; the homepage title is 30px, lesson titles are 28px, and section headings are 22–24px. Google Fonts is optional; Arial and Helvetica are used if it cannot load. Python code remains monospaced.

## Detailed lessons and Python exercises

- [Transformer fundamentals](https://vibe-hust.github.io/llm_lesson/lessons/transformer-fundamentals.html): representations, Q/K/V, a worked attention calculation, causal masking, Transformer blocks, and the connection between language and vision.
- [LLM agents](https://vibe-hust.github.io/llm_lesson/lessons/llm-agents.html): tools, a bounded controller, state, failure cases, and the transition to a multimodal project.

Each lesson includes one collapsible exercise. Students can edit and run it in the browser. The agent exercise uses a clearly labeled deterministic mock model and fictional data; its controller and tools are real Python code.

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

## Page structure

The homepage puts course information first, followed by lecturer profiles, a table connecting each theory lesson to project preparation, assessment, and readings. The small attention and agent demonstrations remain inside a collapsed disclosure near the end of the page. On mobile, syllabus rows stack vertically so the theory and practical task remain together.

Detailed study guides are accessible from the corresponding syllabus entries. Lesson pages use the same header and navigation, a contents column on desktop, and compact text links above the lesson on smaller screens. The Python exercise flag controls only the Python sections.

Lecturer titles, research interests, and public email addresses are based on the academic profiles of [Tao Hu](https://taohu.me/) and [Dingkang Liang](https://dk-liang.github.io/), checked on 29 October 2026.

## Editing

- `dist/content.js`: lessons, preparation exercises, course-design requirements, example applications, and milestones.
- `dist/index.html`: page structure, course details, and assessment policies.
- `dist/styles.css`: responsive layout and visual design.
- `dist/app.js`: syllabus filtering, accessible dialogs, resource lists, and demonstrations.
- `dist/attention.js`: the mathematical attention example.
- `dist/config.js`: the global Python exercise flag.
- `dist/lessons/*.html` and `lesson.css`: the detailed lesson pages and reading layout.
- `dist/lessons/lesson.js` and `python-worker.js`: on-demand Python editor and runner.
- `dist/exercises/*.py`: the source loaded by the browser exercises.
- `dist/syllabus.md`: complete syllabus in Markdown; regenerate with `node scripts/export-syllabus.mjs` after editing course data.
- `scripts/check.mjs`: content, reference, link, and attention checks; also runs the Python exercise tests.
- `scripts/check_exercises.py`: numerical attention checks and agent success/failure cases.

The attention example computes softmax weights from fixed illustrative Q/K vectors. The agent example is explicitly labeled as a scripted walkthrough and does not call a live model. The capstone descriptions are project briefs, not claims that those applications are already implemented.

## Accessibility and privacy

The site includes a skip link, keyboard-operable tabs, native modal dialogs with focus restoration, labeled controls, live status messages, and reduced-motion support. It has no analytics, accounts, cookies, or API secrets. External reading links open in a new tab.

All academic references link to original papers or official documentation. The course content and assessment reflect the teaching decisions for spring 2027.
