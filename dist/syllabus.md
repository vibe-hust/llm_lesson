# Foundation Models and AI Agents

HUST School of Software Engineering · Spring 2027

2025 AI Large Model Experimental Class · Second-year undergraduates

## Two connected courses

1. **Core Principles and Frontier Applications of Large Models:** 32 teaching hours, 2 credits.
2. **Large Models and AI Agents: Project Design:** two concentrated weeks after the core lectures, 2 credits, teams of three.

Both courses run in spring 2027. Students choose different applications under common project requirements and assessment criteria.

## Starting point and required depth

Students know Python and have studied programming, data structures, calculus, linear algebra, probability, and introductory AI. Prior neural-network training or PyTorch experience is not assumed. The first four hours introduce losses, gradients, automatic differentiation, tensor shapes, and a training loop.

The required level is understand and implement: calculate attention, trace tensor dimensions, explain training objectives, and implement core components. Use automatic differentiation for training. Lengthy mathematical derivations, diffusion training, and advanced adaptation are optional extensions.

## Computing resources

Required work runs on student laptops with teaching-provided language and vision APIs. No GPU is required. Small model experiments use supplied CPU training pipelines and datasets; image–text retrieval can use supplied pretrained embeddings. Projects record API usage alongside task success. The browser exercises use standard-library Python, and the browser agent example uses a deterministic mock model rather than a live API.

## Learning outcomes

Students will calculate and implement attention; assemble a small Transformer block; compare language, vision, retrieval, and visual question-answering systems; build a bounded agent with tools and state; and evaluate its outputs, evidence, failures, and resource use. Each student will explain the complete workflow and modify part of the implementation.

## Teaching allocation

- Neural networks & PyTorch: 4 hours.
- Transformers: 10 hours.
- Language, vision & multimodal: 8 hours.
- LLM agents: 8 hours.
- Integration & frontiers: 2 hours.

## Lesson sequence

Sixteen lessons of two teaching hours each. Each practical task contributes to one of four individual preparation exercises, rather than creating a separate assignment for every lesson. The final lesson connects the course to the team project and selected frontier examples.

### 01. How a neural network learns

Neural networks & PyTorch · 2 hours

Predictions, losses, gradients, parameter updates, and held-out data.

**Essential idea:** A model learns by updating parameters to reduce a loss on training examples. Evaluate the result on separate data.

**Learning objectives:**

- Identify inputs, targets, and trainable parameters.
- Explain one gradient update and why held-out data matters.

**Practice:** Modify a supplied small model and compare training and validation curves on a laptop.

**Evidence:** An annotated learning curve and an explanation of one failed training run.

**Preparation exercise:** A · Foundations and attention

**Connection to course design:** Separate development cases from evaluation cases when defining the project baseline.

**Reading:** [Learn the Basics](https://docs.pytorch.org/tutorials/beginner/basics/intro.html).

### 02. Tensors and training with PyTorch

Neural networks & PyTorch · 2 hours

Tensor shapes, automatic differentiation, and a complete training loop.

**Essential idea:** PyTorch records operations so gradients can be computed automatically. A training loop updates parameters; an evaluation loop measures predictions without updating them.

**Learning objectives:**

- Trace tensor shapes through a small network.
- Complete a training loop using automatic differentiation and separate evaluation data.

**Practice:** Complete a supplied CPU training loop. Inspect gradients and correct a deliberately introduced shape error.

**Evidence:** A working loop, a tensor-shape trace, and an explanation of training versus evaluation.

**Preparation exercise:** A · Foundations and attention

**Connection to course design:** Write small component checks and distinguish model inference from model training.

**Reading:** [Learn the Basics](https://docs.pytorch.org/tutorials/beginner/basics/intro.html).

### 03. Text and images become vectors

Transformers · 2 hours

Text tokens, image patches, embeddings, and sequence length.

**Essential idea:** A text token and an image patch have different meanings, but both can be represented as a vector in a sequence.

**Learning objectives:**

- Trace text through tokenization and embedding.
- Split an image into patches and calculate the resulting sequence length.

**Practice:** Inspect tokens for Chinese, English, and code. Patchify a small image and compare two patch sizes.

**Evidence:** A diagram with tensor dimensions and a comparison of sequence lengths.

**Preparation exercise:** A · Foundations and attention

**Connection to course design:** Choose document chunks and image inputs with an explicit account of context length and information loss.

**Reading:** [LLM Course](https://huggingface.co/learn/llm-course/chapter1/1); [An Image is Worth 16×16 Words](https://arxiv.org/abs/2010.11929).

### 04. Attention, one operation at a time

Transformers · 2 hours

Queries, keys, values, similarity scores, and softmax.

**Essential idea:** Attention computes a weighted combination of value vectors. The weights depend on comparisons between a query and the keys.

**Learning objectives:**

- Calculate attention on a small numerical example.
- Track the dimensions of Q, K, V, and the attention matrix.

**Practice:** Implement scaled dot-product attention and compare your output with a supplied reference.

**Evidence:** A correct numerical example and a working attention function.

**Preparation exercise:** A · Foundations and attention

**Connection to course design:** Explain how a model combines context; use task tests rather than attention weights alone to judge evidence support.

**Reading:** [Attention Is All You Need](https://arxiv.org/abs/1706.03762).

### 05. Masks and multiple heads

Transformers · 2 hours

Causal visibility, parallel attention heads, and cross-attention.

**Essential idea:** A mask controls which positions can contribute. Multiple heads apply different learned projections before their outputs are combined.

**Learning objectives:**

- Explain causal versus bidirectional attention.
- Distinguish self-attention from cross-attention.

**Practice:** Change future tokens and verify that earlier causal outputs stay unchanged. Inspect two attention heads.

**Evidence:** A masking check and a diagram of multi-head attention dimensions.

**Preparation exercise:** A · Foundations and attention

**Connection to course design:** Distinguish the model’s causal visibility from the controller’s record of actions and observations.

**Reading:** [Attention Is All You Need](https://arxiv.org/abs/1706.03762).

### 06. Build a Transformer block

Transformers · 2 hours

Attention, feed-forward layers, residual paths, and normalization.

**Essential idea:** A Transformer block combines communication between positions with transformations applied to each position.

**Learning objectives:**

- Assemble a block from attention and feed-forward components.
- Explain the purpose of residual paths and normalization.

**Practice:** Implement attention and feed-forward components inside a supplied PyTorch block and inspect its tensors.

**Evidence:** A runnable block and an annotated forward-pass diagram.

**Preparation exercise:** B · One block, text and images

**Connection to course design:** Explain the model architecture used by the system and distinguish it from the agent controller.

**Reading:** [Attention Is All You Need](https://arxiv.org/abs/1706.03762); [Learn the Basics](https://docs.pytorch.org/tutorials/beginner/basics/intro.html).

### 07. Positions, depth, and computation

Transformers · 2 hours

Positional information, stacked blocks, and attention cost.

**Essential idea:** Models need a way to represent position. Increasing sequence length also increases the size of a full attention matrix.

**Learning objectives:**

- Explain why positional information is needed.
- Compare attention-matrix sizes for different sequence lengths.

**Practice:** Inspect a supplied positional encoding and measure attention-matrix size as token count changes.

**Evidence:** A position experiment and a small cost table with explicit assumptions.

**Preparation exercise:** B · One block, text and images

**Connection to course design:** Set context and input-size limits and record their effects on API usage and task results.

**Reading:** [Attention Is All You Need](https://arxiv.org/abs/1706.03762); [An Image is Worth 16×16 Words](https://arxiv.org/abs/2010.11929).

### 08. A Transformer that writes

Language, vision & multimodal · 2 hours

Causal language modeling, next-token targets, and sampling.

**Essential idea:** A language model predicts a distribution over the next token. Generation repeatedly feeds the growing sequence back into the model.

**Learning objectives:**

- Construct correctly shifted next-token targets.
- Explain how sampling temperature changes a probability distribution.

**Practice:** Add a language-model head to your block and run a supplied tiny CPU training experiment. Compare sampling settings.

**Evidence:** Held-out prediction loss, generation examples, and a clear account of limitations.

**Preparation exercise:** B · One block, text and images

**Connection to course design:** Choose generation settings and validate structured model outputs before executing tool calls.

**Reading:** [LLM Course](https://huggingface.co/learn/llm-course/chapter1/1); [Attention Is All You Need](https://arxiv.org/abs/1706.03762).

### 09. A Transformer that sees

Language, vision & multimodal · 2 hours

Vision Transformers, patch embeddings, and visual recognition.

**Essential idea:** A Vision Transformer processes image patches as a sequence. Its output head and learning target determine the task.

**Learning objectives:**

- Trace a patch sequence through a visual Transformer.
- Compare image classification with causal text generation.

**Practice:** Add patch embeddings and a classification head to the shared block. Use a supplied tiny CPU dataset and training loop.

**Evidence:** Held-out accuracy, error examples, and a text-versus-image architecture comparison.

**Preparation exercise:** B · One block, text and images

**Connection to course design:** Explain the visual model’s inputs and limitations; use a provided vision API for the project rather than relying on the tiny teaching model.

**Reading:** [An Image is Worth 16×16 Words](https://arxiv.org/abs/2010.11929).

### 10. Align images and text

Language, vision & multimodal · 2 hours

Contrastive learning, shared embeddings, image–text similarity, and retrieval.

**Essential idea:** An image encoder and a text encoder can learn comparable representations. Similarity supports retrieval, while retrieval quality must be checked on labeled queries.

**Learning objectives:**

- Explain matched and mismatched image–text pairs in contrastive learning.
- Measure whether relevant items appear in the retrieved results.

**Practice:** Build image–text retrieval using supplied pretrained embeddings. Compare retrieval settings on a small labeled query set.

**Evidence:** Retrieval results, recall at a stated cutoff, and examples of misleading matches.

**Preparation exercise:** C · Retrieve and inspect visual evidence

**Connection to course design:** Reuse the retrieval interface and evaluation method when building an evidence lookup tool.

**Reading:** [Learning Transferable Visual Models](https://arxiv.org/abs/2103.00020).

### 11. Ask a model about an image

Language, vision & multimodal · 2 hours

Visual encoders, language-model connections, visual instructions, and grounding.

**Essential idea:** A vision–language model generates an answer from an image and text. Its answer may contain claims that are not supported by the visible evidence.

**Learning objectives:**

- Trace an image and question through a vision–language architecture.
- Identify supported, unsupported, and uncertain claims in an answer.

**Practice:** Use the teaching-provided vision API on a small set of image questions, including ambiguous images and missing information.

**Evidence:** An annotated answer set, a grounding error analysis, and recorded API usage.

**Preparation exercise:** C · Retrieve and inspect visual evidence

**Connection to course design:** Wrap image inspection as a tool that preserves the image source, observations, and uncertainty.

**Reading:** [Visual Instruction Tuning](https://arxiv.org/abs/2304.08485).

### 12. Give an LLM tools

LLM agents · 2 hours

Tool schemas, structured arguments, execution, and observations.

**Essential idea:** The model proposes a tool call; application code validates and executes it. The result becomes a new observation for the next decision.

**Learning objectives:**

- Define a tool with explicit inputs and outputs.
- Implement a bounded action–observation loop.

**Practice:** Connect a teaching-provided language-model API to two simple tools using an explicit Python loop.

**Evidence:** Valid tool arguments, correct handling of tool results, and a complete execution trace.

**Preparation exercise:** D · Build and evaluate an agent

**Connection to course design:** Reuse the tool contracts, argument checks, and controller in the team application.

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

**Preparation exercise:** D · Build and evaluate an agent

**Connection to course design:** Reuse state updates, step limits, and recovery handling in the project agent.

**Reading:** [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents).

### 14. Ground an agent in text and images

LLM agents · 2 hours

Document retrieval, visual observations, and evidence-based actions.

**Essential idea:** An agent can combine a language model with visual tools and a knowledge collection. Each observation should inform a subsequent action or conclusion.

**Learning objectives:**

- Connect retrieval and image inspection to an agent.
- Trace a recommendation back to evidence from tools.

**Practice:** Connect the earlier retrieval and visual-inspection interfaces to an agent. Link each recommendation to its sources.

**Evidence:** A task trace linking the screenshot, retrieved sources, actions, and final recommendation.

**Preparation exercise:** D · Build and evaluate an agent

**Connection to course design:** Integrate text and visual evidence for the team’s chosen task, including missing-evidence handling.

**Reading:** [Visual Instruction Tuning](https://arxiv.org/abs/2304.08485); [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents).

### 15. Make agents verifiable

LLM agents · 2 hours

Success criteria, retries, budgets, prompt injection, and failure recovery.

**Essential idea:** A plausible answer does not establish task completion. Check observable outcomes and account for the resources used.

**Learning objectives:**

- Define an acceptance test for a multi-step task.
- Diagnose tool-selection, execution, and evidence failures.

**Practice:** Compare a simpler baseline and the agent on the same cases. Record task success, evidence support, and API usage.

**Evidence:** A comparison table with sample counts, usage records, and analyzed normal and failure cases.

**Preparation exercise:** D · Build and evaluate an agent

**Connection to course design:** Reuse the evaluation harness and add cases specific to the chosen application; disclose differences in evidence access and budgets.

**Reading:** [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents); [ReAct](https://arxiv.org/abs/2210.03629).

### 16. Integrate, explain, and explore frontiers

Integration & frontiers · 2 hours

Architecture synthesis and selected examples of diffusion, efficient adaptation, and emerging applications.

**Essential idea:** A small implemented component can explain a larger system. Frontier examples extend that understanding without requiring students to reproduce large-scale training.

**Learning objectives:**

- Explain the path from model representations to agent actions and evaluation.
- Relate a selected frontier example to familiar components and a testable application.

**Practice:** Explain a complete architecture and execution trace, then prepare the team’s task definition and evaluation plan.

**Evidence:** An architecture walkthrough and a bounded project plan; no additional preparation assignment.

**Preparation exercise:** Integration

**Connection to course design:** Bring the four preparation exercises into a two-week integration project. Diffusion and advanced adaptation are optional extensions.

**Reading:** [Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239); [Scalable Diffusion Models with Transformers](https://arxiv.org/abs/2212.09748); [LLM Course](https://huggingface.co/learn/llm-course/chapter1/1).

## Four individual preparation exercises

Complete these during the theory course. Reuse components and methods during course design, but do not count the same submitted work toward both course grades.

- **A: Foundations and attention (lessons 1–5).** A short training-loop check, tensor-shape annotations, and attention and masking tests. Course-design connection: Model reasoning, component checks, and evaluation discipline.
- **B: One block, text and images (lessons 6–9).** A small Transformer block used in supplied language and image training pipelines, with results and limitations. Course-design connection: Architecture explanations and informed choices about model inputs and context.
- **C: Retrieve and inspect visual evidence (lessons 10–11).** Image–text retrieval results and an evaluation of answers from the teaching-provided vision API. Course-design connection: Retrieval and visual-inspection tools with evidence and uncertainty.
- **D: Build and evaluate an agent (lessons 12–15).** An explicit tool-use loop, state, stopping conditions, traces, and a comparison against a simpler baseline. Course-design connection: A controller and evaluation harness ready for application-specific integration.

## Common course-design requirements

- Work in teams of three. Choose an application with a measurable task and a manageable set of text and visual inputs.
- Build a working agent with at least two tools, validated inputs, explicit state, and stopping conditions. Use teaching-provided language and vision APIs; no GPU is required.
- Record actions, tool arguments, observations, sources, and stop reasons so that final answers can be checked against evidence.
- Compare with a simpler baseline on the same evaluation cases. Include normal tasks, missing evidence, and tool failures; report sample counts, task success, and API usage.
- Submit a reproducible system and report with a contribution record. Every student explains the complete workflow, defends their decisions, and makes a small live code modification.

## Example applications

Teams may choose an application beyond these examples while meeting the same requirements. These are task briefs; the system and its evaluation are student deliverables.

### Multimodal software assistant

Investigate an application error using a screenshot and documentation, run a supplied diagnostic test, and support a recommendation with results.

**Example tools:** `inspect_image`, `search_documents`, `run_diagnostic_test`.

**Evaluation:** Task completion, evidence support, failure recovery, and API usage.

**Theory connection:** Visual grounding, retrieval, tool use, and verification.

### Visual knowledge assistant

Identify an item in a photograph, retrieve relevant instructions, and answer a question using image and document evidence.

**Example tools:** `retrieve_images`, `inspect_image`, `search_documents`.

**Evaluation:** Retrieval recall, answer correctness, evidence support, and API usage.

**Theory connection:** Visual representations, image–text alignment, retrieval, and agent decisions.

### Diagram explanation assistant

Inspect a technical diagram, retrieve related course material, and explain its components and relationships with references and stated uncertainty.

**Example tools:** `inspect_diagram`, `search_documents`, `read_source`.

**Evaluation:** Component and relationship accuracy, evidence support, uncertainty handling, and API usage.

**Theory connection:** Visual question answering, grounding, retrieval, and evaluation.

## Two-week course-design sequence

The concentrated project follows the core lectures and individual preparation exercises.

- **Day 01: Define and establish a baseline.** Choose the application, divide responsibilities, define acceptance criteria, and save baseline results.
- **Day 02–03: Prepare evidence and tools.** Adapt the retrieval and visual-inspection interfaces. Test each tool and preserve its sources.
- **Day 04–06: Integrate the agent.** Connect the controller, state, tools, and stop rules. Record end-to-end traces and handle failures.
- **Day 07–09: Evaluate and reproduce.** Compare with the baseline on the same cases, analyze failures and API usage, and verify reproduction instructions.
- **Day 10: Demonstrate and defend.** Present the shared system. Each student completes an individual defense and live code modification without AI assistance.

## Assessment

The two courses receive separate grades. Preparation exercises assess individual implementation and experimental evidence. Project assessment covers application-specific integration, evaluation, reproducibility, and individual understanding; reused preparation work is not graded twice.

**Theory course:** four individual preparation exercises 30%; short quizzes 20%; individual open-book written exam 50%.

The written exam covers attention calculations, tensor shapes, code tracing, language–vision comparisons, and agent failure diagnosis. Course materials may be consulted; AI assistance is not permitted.

**Project course:** system implementation 25%; evaluation and failure analysis 25%; engineering and reproducibility 15%; individual defense and live modification 35%.

The first three components receive a shared team score, totaling 65%. Each student earns the remaining 35% individually by explaining a design decision, diagnosing a failure, and making a small live code change. Every student must understand the complete agent workflow.

Implementation is assessed against the stated task, tool contracts, state, and stop rules. Evaluation includes a simpler baseline, normal and failure cases, evidence support, sample counts, and API usage. Reproducibility includes clear setup and execution instructions, recorded settings, and contribution records. Disclose differences in evidence access and resource budgets when comparing methods.

## AI assistance policy

AI assistance is allowed in individual exercises and team projects with disclosure. State what it helped with, which parts of the submission it affected, and how its output was verified. Students remain responsible for the correctness and evidence of their submissions.

The final exam, individual defense, and live code modification are completed without AI assistance.

## Teaching preparation

Before teaching, prepare the CPU environment, starter notebooks, small datasets, pretrained embeddings, language and vision API access, tool interfaces, and evaluation cases. Publish assignment deadlines, the exam duration, and API usage limits with the teaching schedule.

The website currently includes the attention calculator, scripted agent walkthrough, and detailed Transformer and agent study guides with runnable Python exercises. The full preparation notebooks, live API access, task datasets, and capstone sandbox still need to be prepared for delivery.

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
