# Foundation Models and LLM Agents

HUST School of Software Engineering · VIBE Lab

Syllabus draft — 29 October 2026

## Two connected courses

1. **Core Principles and Frontier Applications of Large Models**.
2. **Large Models and AI Agents: Project Design**.

Audience: second-year undergraduates in their spring semester.

Planning basis: 32 teaching hours and a two-week project course. Credits, dates, and final teaching arrangements remain to be confirmed. Students should have basic programming and elementary linear algebra; preparatory Python and tensor exercises provide a bridge to the course.

## Learning outcomes

Students will explain attention and Transformer blocks; compare language, vision, and visual generative models; choose an appropriate adaptation or retrieval approach; build a bounded agent with tools and state; and evaluate a system using observable results.

## Teaching allocation

- Foundations: 8 hours.
- Transformers: 12 hours.
- Vision & multimodal: 4 hours.
- LLM agents: 8 hours.

## Lesson sequence

Each lesson represents two teaching hours. The sequence can run as one lesson per week across a 16-week semester. This is a planning arrangement, not a confirmed timetable.

### 01. How a model learns

Foundations · 2 hours

Data, parameters, losses, and the difference between training and inference.

**Essential idea:** A model learns by updating parameters to reduce a loss on training examples. Evaluate the result on separate data.

**Learning objectives:**

- Identify inputs, targets, and trainable parameters.
- Explain one gradient update and why held-out data matters.

**Practice:** Run a supplied training loop. Change the learning rate and compare training and validation curves.

**Evidence:** An annotated learning curve and an explanation of one failed training run.

**Experiment bundle:** A · Representations & attention

**Reading:** [Learn the Basics](https://docs.pytorch.org/tutorials/beginner/basics/intro.html).

### 02. Text and images become vectors

Foundations · 2 hours

Text tokens, image patches, embeddings, and sequence length.

**Essential idea:** A text token and an image patch have different meanings, but both can be represented as a vector in a sequence.

**Learning objectives:**

- Trace text through tokenization and embedding.
- Split an image into patches and calculate the resulting sequence length.

**Practice:** Inspect tokens for Chinese, English, and code. Patchify a small image and compare two patch sizes.

**Evidence:** A diagram with tensor dimensions and a comparison of sequence lengths.

**Experiment bundle:** A · Representations & attention

**Reading:** [LLM Course](https://huggingface.co/learn/llm-course/chapter1/1); [An Image is Worth 16×16 Words](https://arxiv.org/abs/2010.11929).

### 03. Attention, one operation at a time

Transformers · 2 hours

Queries, keys, values, similarity scores, and softmax.

**Essential idea:** Attention computes a weighted combination of value vectors. The weights depend on comparisons between a query and the keys.

**Learning objectives:**

- Calculate attention on a small numerical example.
- Track the dimensions of Q, K, V, and the attention matrix.

**Practice:** Implement scaled dot-product attention and compare your output with a supplied reference.

**Evidence:** A correct numerical example and a working attention function.

**Experiment bundle:** A · Representations & attention

**Reading:** [Attention Is All You Need](https://arxiv.org/abs/1706.03762).

### 04. Masks and multiple heads

Transformers · 2 hours

Causal visibility, parallel attention heads, and cross-attention.

**Essential idea:** A mask controls which positions can contribute. Multiple heads apply different learned projections before their outputs are combined.

**Learning objectives:**

- Explain causal versus bidirectional attention.
- Distinguish self-attention from cross-attention.

**Practice:** Change future tokens and verify that earlier causal outputs stay unchanged. Inspect two attention heads.

**Evidence:** A masking check and a diagram of multi-head attention dimensions.

**Experiment bundle:** A · Representations & attention

**Reading:** [Attention Is All You Need](https://arxiv.org/abs/1706.03762).

### 05. Build a Transformer block

Transformers · 2 hours

Attention, feed-forward layers, residual paths, and normalization.

**Essential idea:** A Transformer block combines communication between positions with transformations applied to each position.

**Learning objectives:**

- Assemble a block from attention and feed-forward components.
- Explain the purpose of residual paths and normalization.

**Practice:** Complete a small block in a supplied framework and inspect its intermediate tensors.

**Evidence:** A runnable block and an annotated forward-pass diagram.

**Experiment bundle:** B · One block, two applications

**Reading:** [Attention Is All You Need](https://arxiv.org/abs/1706.03762); [Learn the Basics](https://docs.pytorch.org/tutorials/beginner/basics/intro.html).

### 06. Positions, depth, and computation

Transformers · 2 hours

Positional information, stacked blocks, and attention cost.

**Essential idea:** Models need a way to represent position. Increasing sequence length also increases the size of a full attention matrix.

**Learning objectives:**

- Explain why positional information is needed.
- Compare attention-matrix sizes for different sequence lengths.

**Practice:** Inspect a supplied positional encoding and measure attention-matrix size as token count changes.

**Evidence:** A position experiment and a small cost table with explicit assumptions.

**Experiment bundle:** B · One block, two applications

**Reading:** [Attention Is All You Need](https://arxiv.org/abs/1706.03762); [An Image is Worth 16×16 Words](https://arxiv.org/abs/2010.11929).

### 07. A Transformer that writes

Transformers · 2 hours

Causal language modeling, next-token targets, and sampling.

**Essential idea:** A language model predicts a distribution over the next token. Generation repeatedly feeds the growing sequence back into the model.

**Learning objectives:**

- Construct correctly shifted next-token targets.
- Explain how sampling temperature changes a probability distribution.

**Practice:** Use your block in a miniature language model with a supplied training loop. Compare generation settings.

**Evidence:** Held-out prediction loss, generation examples, and a clear account of limitations.

**Experiment bundle:** B · One block, two applications

**Reading:** [LLM Course](https://huggingface.co/learn/llm-course/chapter1/1); [Attention Is All You Need](https://arxiv.org/abs/1706.03762).

### 08. A Transformer that sees

Transformers · 2 hours

Vision Transformers, patch embeddings, and visual recognition.

**Essential idea:** A Vision Transformer processes image patches as a sequence. Its output head and learning target determine the task.

**Learning objectives:**

- Trace a patch sequence through a visual Transformer.
- Compare image classification with causal text generation.

**Practice:** Adapt the shared block to a small image-classification task using a supplied data and training pipeline.

**Evidence:** Held-out accuracy, error examples, and a text-versus-image architecture comparison.

**Experiment bundle:** B · One block, two applications

**Reading:** [An Image is Worth 16×16 Words](https://arxiv.org/abs/2010.11929).

### 09. Pretrain once, adapt carefully

Foundations · 2 hours

Visual self-supervision, frozen features, instruction tuning, and LoRA.

**Essential idea:** Pretraining and downstream adaptation solve different problems. A useful comparison keeps data and evaluation conditions explicit.

**Learning objectives:**

- Compare frozen-feature transfer with parameter updates.
- Distinguish prompting, instruction tuning, and efficient adaptation.

**Practice:** Fit the same linear classifier to random and pretrained visual features. Analyze supplied instruction-tuning results.

**Evidence:** A matched transfer comparison and a concise adaptation decision.

**Experiment bundle:** B · One block, two applications

**Reading:** [DINOv2](https://arxiv.org/abs/2304.07193); [LLM Course](https://huggingface.co/learn/llm-course/chapter1/1).

### 10. From noise to an image

Vision & multimodal · 2 hours

Diffusion, conditional generation, latent patches, and DiT.

**Essential idea:** A diffusion model learns a denoising-related prediction and uses repeated sampling steps to generate an image. A Transformer can serve as its backbone.

**Learning objectives:**

- Identify the training target and sampling process.
- Explain how timestep and task conditioning enter a visual generator.

**Practice:** Complete a toy denoising exercise. Compare sampling steps on a supplied image-generation service.

**Evidence:** A denoising visualization and a controlled quality–cost comparison.

**Experiment bundle:** C · Generation & multimodal alignment

**Reading:** [Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239); [Scalable Diffusion Models with Transformers](https://arxiv.org/abs/2212.09748).

### 11. Connect vision and language

Vision & multimodal · 2 hours

Image–text alignment, retrieval, visual instruction following, and grounding.

**Essential idea:** Matching an image with text and generating an answer about an image are different tasks, with different objectives and failure modes.

**Learning objectives:**

- Explain image–text similarity and cross-modal retrieval.
- Identify statements that are unsupported by visual evidence.

**Practice:** Build a small image–text retrieval demo and evaluate a supplied vision–language model on image questions.

**Evidence:** Retrieval results and an analysis of grounded and unsupported answers.

**Experiment bundle:** C · Generation & multimodal alignment

**Reading:** [Learning Transferable Visual Models](https://arxiv.org/abs/2103.00020); [Visual Instruction Tuning](https://arxiv.org/abs/2304.08485).

### 12. Give an LLM tools

LLM agents · 2 hours

Tool schemas, structured arguments, execution, and observations.

**Essential idea:** The model proposes a tool call; application code validates and executes it. The result becomes a new observation for the next decision.

**Learning objectives:**

- Define a tool with explicit inputs and outputs.
- Implement a bounded action–observation loop.

**Practice:** Connect an LLM to two simple tools using an explicit Python loop.

**Evidence:** Valid tool arguments, correct handling of tool results, and a complete execution trace.

**Experiment bundle:** D · Build and evaluate an agent

**Reading:** [ReAct](https://arxiv.org/abs/2210.03629); [AI Agents Course](https://huggingface.co/learn/agents-course/unit0/introduction).

### 13. Plan, remember, and stop

LLM agents · 2 hours

Task decomposition, working state, replanning, and termination.

**Essential idea:** An agent needs a record of what has happened and a concrete way to decide whether to continue or stop.

**Learning objectives:**

- Compare a fixed workflow with dynamic action selection.
- Separate working state from retrieved knowledge and persistent memory.

**Practice:** Add task state, a step limit, and recovery from a deliberately failed tool call.

**Evidence:** A state-transition diagram and successful termination on normal and failure cases.

**Experiment bundle:** D · Build and evaluate an agent

**Reading:** [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents).

### 14. Ground an agent in text and images

LLM agents · 2 hours

Document retrieval, visual observations, and evidence-based actions.

**Essential idea:** An agent can combine a language model with visual tools and a knowledge collection. Each observation should inform a subsequent action or conclusion.

**Learning objectives:**

- Connect retrieval and image inspection to an agent.
- Trace a recommendation back to evidence from tools.

**Practice:** Investigate a supplied screenshot using project documentation and diagnostic tools.

**Evidence:** A task trace linking the screenshot, retrieved sources, actions, and final recommendation.

**Experiment bundle:** D · Build and evaluate an agent

**Reading:** [Visual Instruction Tuning](https://arxiv.org/abs/2304.08485); [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents).

### 15. Make agents verifiable

LLM agents · 2 hours

Success criteria, retries, budgets, prompt injection, and failure recovery.

**Essential idea:** A plausible answer does not establish task completion. Check observable outcomes and account for the resources used.

**Learning objectives:**

- Define an acceptance test for a multi-step task.
- Diagnose tool-selection, execution, and evidence failures.

**Practice:** Evaluate a direct model response, fixed workflow, and agent on the same task set. Record their information access and budgets.

**Evidence:** Task-success results, tool-call counts, and at least three analyzed failure categories.

**Experiment bundle:** D · Build and evaluate an agent

**Reading:** [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents); [ReAct](https://arxiv.org/abs/2210.03629).

### 16. Evaluate, explain, and look ahead

Foundations · 2 hours

Reproducibility, individual architecture walkthroughs, and emerging applications.

**Essential idea:** A useful result includes the conditions under which it was obtained. Extend a system only after deciding how to measure the proposed benefit.

**Learning objectives:**

- Explain an architecture and an agent execution trace.
- Propose a testable extension in video, memory, or embodied interaction.

**Practice:** Reproduce one result and prepare a one-page extension proposal with an evaluation plan.

**Evidence:** A reproducible report, an individual code walkthrough, and a bounded extension proposal.

**Experiment bundle:** Final synthesis

**Reading:** [Scalable Diffusion Models with Transformers](https://arxiv.org/abs/2212.09748); [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents).

## Practical work

Individual experiments take place alongside the theory course, with a proposed total of 12–16 hours outside classroom teaching. The teaching team supplies data, training loops, and checkpoints. Students implement selected components and analyze results. The two-week project course focuses on integration and evaluation in groups of about three. The two courses assess distinct outcomes; the same deliverable should not be counted twice.

- **A: Representations and attention.** Text tokens, image patches, attention calculations, and causal masking.
- **B: One block, two applications.** A miniature language model, a small Vision Transformer, and a visual-feature transfer comparison.
- **C: Generation and multimodal alignment.** A toy denoising experiment, controlled generation examples, and image–text retrieval.
- **D: Build and evaluate an agent.** An explicit loop with tools, state, visual evidence, stopping conditions, and failure tests.

## Project tracks

Choose one integration project. The software assistant is the suggested starting point for the first offering.

### Multimodal software assistant

Given a screenshot of an application error and its documentation, investigate the problem, run a supplied diagnostic test, and explain a recommendation using the results.

**Tools:** `inspect_image`, `search_documents`, `read_project_file`, `run_diagnostic_test`.

**Deliverables:**

- A working agent in the supplied sandbox
- An action and observation trace
- A comparison with a fixed workflow
- A reproducible evaluation and individual walkthrough

**Evaluation:** Task completion · evidence support · recovery · tool calls.

**Theory connection:** Vision Transformers → visual grounding → LLM tool use → verification.

### Visual knowledge assistant

Find an item shown in a photograph, retrieve relevant instructions, and answer a question with references to the image and documentation.

**Tools:** `retrieve_images`, `inspect_image`, `search_documents`.

**Deliverables:**

- Image and text retrieval
- Answers with supporting evidence
- Handling of insufficient information
- Retrieval and answer evaluation

**Evaluation:** Retrieval recall · answer correctness · evidence support.

**Theory connection:** Visual representations → image–text alignment → retrieval → agent decisions.

### Visual creation assistant

Interpret a brief, retrieve visual references, generate an image, and perform one bounded revision using a stated evaluation rubric.

**Tools:** `retrieve_references`, `generate_image`, `inspect_result`.

**Deliverables:**

- A bounded generation and revision workflow
- Recorded prompts and generation settings
- A controlled comparison of revisions
- An evaluation using a fixed rubric

**Evaluation:** Brief adherence · visual quality · revision benefit · cost.

**Theory connection:** Conditional generation → multimodal inspection → tool use → evaluation.

## Two-week project schedule

- **Day 01: Define & baseline.** Agree on tasks, data, responsibilities, and acceptance criteria. Save a direct-response baseline.
- **Day 02–03: Retrieve & perceive.** Implement retrieval and inspect visual inputs. Check each component separately.
- **Day 04–05: Ground the answer.** Connect evidence to generated answers. Handle missing information and measure the first baseline.
- **Day 06–07: Add the agent loop.** Connect tools, state updates, recovery, and stopping conditions.
- **Day 08–09: Test & explain.** Run controlled comparisons, investigate failures, and prepare reproduction instructions.
- **Day 10: Demonstrate & defend.** Present the system, explain individual contributions, and make a small live modification.

## Assessment proposal

**Theory course:** individual experiments 30%; quizzes 20%; final assessment 50%.

**Project course:** system implementation 25%; experiments and failure analysis 25%; engineering and reproducibility 15%; individual defense and live modification 35%.

Each student should explain an architecture, trace an agent execution, and make a small live code change. AI coding assistance is allowed with disclosure; students remain responsible for their work.

For the initial project offering, the teaching team can prepare 30 development cases and 20 hidden acceptance cases. Cases should cover normal tasks, missing evidence, tool-dependent tasks, and failures. Report sample counts, task success, evidence support, and tool-call costs. Compare the direct model response, a fixed workflow, and the agent on the same task set; disclose differences in information access and resource budgets.

## Teaching preparation

Prepare a common Python environment, starter notebooks, small datasets, model checkpoints, model inference access, documented tools, and acceptance tests. Core work should be accessible from ordinary student laptops, with shared compute for larger model inference and demonstrations. Actual model selection and compute availability must be checked before teaching.

The website provides an attention calculator, a scripted agent walkthrough, and detailed study guides for Transformer fundamentals and LLM agents. Each study guide includes a runnable standard-library Python exercise, with browser execution and a downloadable file. The agent exercise uses a deterministic mock model. Full training notebooks, live model services, datasets, and the capstone sandbox remain teaching-team preparation tasks.

## References

- [Learn the Basics](https://docs.pytorch.org/tutorials/beginner/basics/intro.html) — PyTorch. Tensors, gradients, and a complete training loop.
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762) — Vaswani et al. · 2017. Read the attention equation and architecture diagram first.
- [An Image is Worth 16×16 Words](https://arxiv.org/abs/2010.11929) — Dosovitskiy et al. · 2020. Follow an image from patches to a classification output.
- [DINOv2](https://arxiv.org/abs/2304.07193) — Oquab et al. · 2023. Explore how pretrained visual features transfer to new tasks.
- [Learning Transferable Visual Models](https://arxiv.org/abs/2103.00020) — Radford et al. · 2021. Study image–text matching and zero-shot classification.
- [Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239) — Ho et al. · 2020. Focus on the training target and iterative sampling process.
- [Scalable Diffusion Models with Transformers](https://arxiv.org/abs/2212.09748) — Peebles & Xie · 2022. Connect the Transformer block to image denoising.
- [Visual Instruction Tuning](https://arxiv.org/abs/2304.08485) — Liu et al. · 2023. Trace the connection between a visual encoder and an LLM.
- [ReAct](https://arxiv.org/abs/2210.03629) — Yao et al. · 2022. Follow the interaction between model decisions and external actions.
- [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) — Anthropic · 2024. Compare predefined workflows with dynamic tool selection.
- [AI Agents Course](https://huggingface.co/learn/agents-course/unit0/introduction) — Hugging Face. Selected exercises on tools, observations, and agent construction.
- [LLM Course](https://huggingface.co/learn/llm-course/chapter1/1) — Hugging Face. Selected chapters on tokenization and model adaptation.
