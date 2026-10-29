export const tracks = {
  "foundations": {
    "label": "Neural networks & PyTorch",
    "hours": 4
  },
  "transformer": {
    "label": "Transformers",
    "hours": 10
  },
  "models": {
    "label": "Language, vision & multimodal",
    "hours": 8
  },
  "agents": {
    "label": "LLM agents",
    "hours": 8
  },
  "integration": {
    "label": "Integration & frontiers",
    "hours": 2
  }
};

export const resources = [
  { id: 'pytorch', title: 'Learn the Basics', author: 'PyTorch', kind: 'Tutorial', topic: 'Foundations', url: 'https://docs.pytorch.org/tutorials/beginner/basics/intro.html', note: 'Tensors, gradients, and a complete training loop.' },
  { id: 'attention', title: 'Attention Is All You Need', author: 'Vaswani et al. · 2017', kind: 'Paper', topic: 'Transformers', url: 'https://arxiv.org/abs/1706.03762', note: 'Read the attention equation and architecture diagram first.' },
  { id: 'vit', title: 'An Image is Worth 16×16 Words', author: 'Dosovitskiy et al. · 2020', kind: 'Paper', topic: 'Vision', url: 'https://arxiv.org/abs/2010.11929', note: 'Follow an image from patches to a classification output.' },
  { id: 'dino', title: 'DINOv2', author: 'Oquab et al. · 2023', kind: 'Paper', topic: 'Vision', url: 'https://arxiv.org/abs/2304.07193', note: 'Explore how pretrained visual features transfer to new tasks.' },
  { id: 'clip', title: 'Learning Transferable Visual Models', author: 'Radford et al. · 2021', kind: 'Paper', topic: 'Multimodal', url: 'https://arxiv.org/abs/2103.00020', note: 'Study image–text matching and zero-shot classification.' },
  { id: 'diffusion', title: 'Denoising Diffusion Probabilistic Models', author: 'Ho et al. · 2020', kind: 'Paper', topic: 'Generation', url: 'https://arxiv.org/abs/2006.11239', note: 'Focus on the training target and iterative sampling process.' },
  { id: 'dit', title: 'Scalable Diffusion Models with Transformers', author: 'Peebles & Xie · 2022', kind: 'Paper', topic: 'Generation', url: 'https://arxiv.org/abs/2212.09748', note: 'Connect the Transformer block to image denoising.' },
  { id: 'llava', title: 'Visual Instruction Tuning', author: 'Liu et al. · 2023', kind: 'Paper', topic: 'Multimodal', url: 'https://arxiv.org/abs/2304.08485', note: 'Trace the connection between a visual encoder and an LLM.' },
  { id: 'react', title: 'ReAct', author: 'Yao et al. · 2022', kind: 'Paper', topic: 'Agents', url: 'https://arxiv.org/abs/2210.03629', note: 'Follow the interaction between model decisions and external actions.' },
  { id: 'effective-agents', title: 'Building Effective Agents', author: 'Anthropic · 2024', kind: 'Guide', topic: 'Agents', url: 'https://www.anthropic.com/engineering/building-effective-agents', note: 'Compare predefined workflows with dynamic tool selection.' },
  { id: 'hf-agents', title: 'AI Agents Course', author: 'Hugging Face', kind: 'Tutorial', topic: 'Agents', url: 'https://huggingface.co/learn/agents-course/unit0/introduction', note: 'Selected exercises on tools, observations, and agent construction.' },
  { id: 'hf-llm', title: 'LLM Course', author: 'Hugging Face', kind: 'Tutorial', topic: 'Language', url: 'https://huggingface.co/learn/llm-course/chapter1/1', note: 'Selected chapters on tokenization and model adaptation.' },
];

export const preparations = [
  {
    "id": "A",
    "title": "Foundations and attention",
    "lessons": [
      1,
      2,
      3,
      4,
      5
    ],
    "deliverable": "A short training-loop check, tensor-shape annotations, and attention and masking tests.",
    "projectUse": "Model reasoning, component checks, and evaluation discipline."
  },
  {
    "id": "B",
    "title": "One block, text and images",
    "lessons": [
      6,
      7,
      8,
      9
    ],
    "deliverable": "A small Transformer block used in supplied language and image training pipelines, with results and limitations.",
    "projectUse": "Architecture explanations and informed choices about model inputs and context."
  },
  {
    "id": "C",
    "title": "Retrieve and inspect visual evidence",
    "lessons": [
      10,
      11
    ],
    "deliverable": "Image–text retrieval results and an evaluation of answers from the teaching-provided vision API.",
    "projectUse": "Retrieval and visual-inspection tools with evidence and uncertainty."
  },
  {
    "id": "D",
    "title": "Build and evaluate an agent",
    "lessons": [
      12,
      13,
      14,
      15
    ],
    "deliverable": "An explicit tool-use loop, state, stopping conditions, traces, and a comparison against a simpler baseline.",
    "projectUse": "A controller and evaluation harness ready for application-specific integration."
  }
];

export const lessons = [
  {
    "id": 1,
    "track": "foundations",
    "title": "How a neural network learns",
    "description": "Predictions, losses, gradients, parameter updates, and held-out data.",
    "concept": "A model learns by updating parameters to reduce a loss on training examples. Evaluate the result on separate data.",
    "objectives": [
      "Identify inputs, targets, and trainable parameters.",
      "Explain one gradient update and why held-out data matters."
    ],
    "practice": "Modify a supplied small model and compare training and validation curves on a laptop.",
    "evidence": "An annotated learning curve and an explanation of one failed training run.",
    "reads": [
      "pytorch"
    ],
    "preparation": "A",
    "projectUse": "Separate development cases from evaluation cases when defining the project baseline."
  },
  {
    "id": 2,
    "title": "Tensors and training with PyTorch",
    "track": "foundations",
    "description": "Tensor shapes, automatic differentiation, and a complete training loop.",
    "concept": "PyTorch records operations so gradients can be computed automatically. A training loop updates parameters; an evaluation loop measures predictions without updating them.",
    "objectives": [
      "Trace tensor shapes through a small network.",
      "Complete a training loop using automatic differentiation and separate evaluation data."
    ],
    "practice": "Complete a supplied CPU training loop. Inspect gradients and correct a deliberately introduced shape error.",
    "evidence": "A working loop, a tensor-shape trace, and an explanation of training versus evaluation.",
    "preparation": "A",
    "reads": [
      "pytorch"
    ],
    "projectUse": "Write small component checks and distinguish model inference from model training."
  },
  {
    "id": 3,
    "track": "transformer",
    "title": "Text and images become vectors",
    "description": "Text tokens, image patches, embeddings, and sequence length.",
    "concept": "A text token and an image patch have different meanings, but both can be represented as a vector in a sequence.",
    "objectives": [
      "Trace text through tokenization and embedding.",
      "Split an image into patches and calculate the resulting sequence length."
    ],
    "practice": "Inspect tokens for Chinese, English, and code. Patchify a small image and compare two patch sizes.",
    "evidence": "A diagram with tensor dimensions and a comparison of sequence lengths.",
    "reads": [
      "hf-llm",
      "vit"
    ],
    "preparation": "A",
    "projectUse": "Choose document chunks and image inputs with an explicit account of context length and information loss.",
    "guide": "transformer-fundamentals"
  },
  {
    "id": 4,
    "track": "transformer",
    "title": "Attention, one operation at a time",
    "description": "Queries, keys, values, similarity scores, and softmax.",
    "concept": "Attention computes a weighted combination of value vectors. The weights depend on comparisons between a query and the keys.",
    "objectives": [
      "Calculate attention on a small numerical example.",
      "Track the dimensions of Q, K, V, and the attention matrix."
    ],
    "practice": "Implement scaled dot-product attention and compare your output with a supplied reference.",
    "evidence": "A correct numerical example and a working attention function.",
    "reads": [
      "attention"
    ],
    "preparation": "A",
    "projectUse": "Explain how a model combines context; use task tests rather than attention weights alone to judge evidence support.",
    "guide": "transformer-fundamentals"
  },
  {
    "id": 5,
    "track": "transformer",
    "title": "Masks and multiple heads",
    "description": "Causal visibility, parallel attention heads, and cross-attention.",
    "concept": "A mask controls which positions can contribute. Multiple heads apply different learned projections before their outputs are combined.",
    "objectives": [
      "Explain causal versus bidirectional attention.",
      "Distinguish self-attention from cross-attention."
    ],
    "practice": "Change future tokens and verify that earlier causal outputs stay unchanged. Inspect two attention heads.",
    "evidence": "A masking check and a diagram of multi-head attention dimensions.",
    "reads": [
      "attention"
    ],
    "preparation": "A",
    "projectUse": "Distinguish the model’s causal visibility from the controller’s record of actions and observations.",
    "guide": "transformer-fundamentals"
  },
  {
    "id": 6,
    "track": "transformer",
    "title": "Build a Transformer block",
    "description": "Attention, feed-forward layers, residual paths, and normalization.",
    "concept": "A Transformer block combines communication between positions with transformations applied to each position.",
    "objectives": [
      "Assemble a block from attention and feed-forward components.",
      "Explain the purpose of residual paths and normalization."
    ],
    "practice": "Implement attention and feed-forward components inside a supplied PyTorch block and inspect its tensors.",
    "evidence": "A runnable block and an annotated forward-pass diagram.",
    "reads": [
      "attention",
      "pytorch"
    ],
    "preparation": "B",
    "projectUse": "Explain the model architecture used by the system and distinguish it from the agent controller.",
    "guide": "transformer-fundamentals"
  },
  {
    "id": 7,
    "track": "transformer",
    "title": "Positions, depth, and computation",
    "description": "Positional information, stacked blocks, and attention cost.",
    "concept": "Models need a way to represent position. Increasing sequence length also increases the size of a full attention matrix.",
    "objectives": [
      "Explain why positional information is needed.",
      "Compare attention-matrix sizes for different sequence lengths."
    ],
    "practice": "Inspect a supplied positional encoding and measure attention-matrix size as token count changes.",
    "evidence": "A position experiment and a small cost table with explicit assumptions.",
    "reads": [
      "attention",
      "vit"
    ],
    "preparation": "B",
    "projectUse": "Set context and input-size limits and record their effects on API usage and task results.",
    "guide": "transformer-fundamentals"
  },
  {
    "id": 8,
    "track": "models",
    "title": "A Transformer that writes",
    "description": "Causal language modeling, next-token targets, and sampling.",
    "concept": "A language model predicts a distribution over the next token. Generation repeatedly feeds the growing sequence back into the model.",
    "objectives": [
      "Construct correctly shifted next-token targets.",
      "Explain how sampling temperature changes a probability distribution."
    ],
    "practice": "Add a language-model head to your block and run a supplied tiny CPU training experiment. Compare sampling settings.",
    "evidence": "Held-out prediction loss, generation examples, and a clear account of limitations.",
    "reads": [
      "hf-llm",
      "attention"
    ],
    "preparation": "B",
    "projectUse": "Choose generation settings and validate structured model outputs before executing tool calls."
  },
  {
    "id": 9,
    "track": "models",
    "title": "A Transformer that sees",
    "description": "Vision Transformers, patch embeddings, and visual recognition.",
    "concept": "A Vision Transformer processes image patches as a sequence. Its output head and learning target determine the task.",
    "objectives": [
      "Trace a patch sequence through a visual Transformer.",
      "Compare image classification with causal text generation."
    ],
    "practice": "Add patch embeddings and a classification head to the shared block. Use a supplied tiny CPU dataset and training loop.",
    "evidence": "Held-out accuracy, error examples, and a text-versus-image architecture comparison.",
    "reads": [
      "vit"
    ],
    "preparation": "B",
    "projectUse": "Explain the visual model’s inputs and limitations; use a provided vision API for the project rather than relying on the tiny teaching model."
  },
  {
    "id": 10,
    "title": "Align images and text",
    "track": "models",
    "description": "Contrastive learning, shared embeddings, image–text similarity, and retrieval.",
    "concept": "An image encoder and a text encoder can learn comparable representations. Similarity supports retrieval, while retrieval quality must be checked on labeled queries.",
    "objectives": [
      "Explain matched and mismatched image–text pairs in contrastive learning.",
      "Measure whether relevant items appear in the retrieved results."
    ],
    "practice": "Build image–text retrieval using supplied pretrained embeddings. Compare retrieval settings on a small labeled query set.",
    "evidence": "Retrieval results, recall at a stated cutoff, and examples of misleading matches.",
    "preparation": "C",
    "reads": [
      "clip"
    ],
    "projectUse": "Reuse the retrieval interface and evaluation method when building an evidence lookup tool."
  },
  {
    "id": 11,
    "title": "Ask a model about an image",
    "track": "models",
    "description": "Visual encoders, language-model connections, visual instructions, and grounding.",
    "concept": "A vision–language model generates an answer from an image and text. Its answer may contain claims that are not supported by the visible evidence.",
    "objectives": [
      "Trace an image and question through a vision–language architecture.",
      "Identify supported, unsupported, and uncertain claims in an answer."
    ],
    "practice": "Use the teaching-provided vision API on a small set of image questions, including ambiguous images and missing information.",
    "evidence": "An annotated answer set, a grounding error analysis, and recorded API usage.",
    "preparation": "C",
    "reads": [
      "llava"
    ],
    "projectUse": "Wrap image inspection as a tool that preserves the image source, observations, and uncertainty."
  },
  {
    "id": 12,
    "track": "agents",
    "title": "Give an LLM tools",
    "description": "Tool schemas, structured arguments, execution, and observations.",
    "concept": "The model proposes a tool call; application code validates and executes it. The result becomes a new observation for the next decision.",
    "objectives": [
      "Define a tool with explicit inputs and outputs.",
      "Implement a bounded action–observation loop."
    ],
    "practice": "Connect a teaching-provided language-model API to two simple tools using an explicit Python loop.",
    "evidence": "Valid tool arguments, correct handling of tool results, and a complete execution trace.",
    "reads": [
      "react",
      "hf-agents"
    ],
    "preparation": "D",
    "projectUse": "Reuse the tool contracts, argument checks, and controller in the team application.",
    "guide": "llm-agents"
  },
  {
    "id": 13,
    "track": "agents",
    "title": "Plan, remember, and stop",
    "description": "Task decomposition, working state, replanning, and termination.",
    "concept": "An agent needs a record of what has happened and a concrete way to decide whether to continue or stop.",
    "objectives": [
      "Compare a fixed workflow with dynamic action selection.",
      "Separate working state from retrieved knowledge and persistent memory."
    ],
    "practice": "Add task state, a step limit, and recovery from a deliberately failed tool call.",
    "evidence": "A state-transition diagram and successful termination on normal and failure cases.",
    "reads": [
      "effective-agents"
    ],
    "preparation": "D",
    "projectUse": "Reuse state updates, step limits, and recovery handling in the project agent.",
    "guide": "llm-agents"
  },
  {
    "id": 14,
    "track": "agents",
    "title": "Ground an agent in text and images",
    "description": "Document retrieval, visual observations, and evidence-based actions.",
    "concept": "An agent can combine a language model with visual tools and a knowledge collection. Each observation should inform a subsequent action or conclusion.",
    "objectives": [
      "Connect retrieval and image inspection to an agent.",
      "Trace a recommendation back to evidence from tools."
    ],
    "practice": "Connect the earlier retrieval and visual-inspection interfaces to an agent. Link each recommendation to its sources.",
    "evidence": "A task trace linking the screenshot, retrieved sources, actions, and final recommendation.",
    "reads": [
      "llava",
      "effective-agents"
    ],
    "preparation": "D",
    "projectUse": "Integrate text and visual evidence for the team’s chosen task, including missing-evidence handling.",
    "guide": "llm-agents"
  },
  {
    "id": 15,
    "track": "agents",
    "title": "Make agents verifiable",
    "description": "Success criteria, retries, budgets, prompt injection, and failure recovery.",
    "concept": "A plausible answer does not establish task completion. Check observable outcomes and account for the resources used.",
    "objectives": [
      "Define an acceptance test for a multi-step task.",
      "Diagnose tool-selection, execution, and evidence failures."
    ],
    "practice": "Compare a simpler baseline and the agent on the same cases. Record task success, evidence support, and API usage.",
    "evidence": "A comparison table with sample counts, usage records, and analyzed normal and failure cases.",
    "reads": [
      "effective-agents",
      "react"
    ],
    "preparation": "D",
    "projectUse": "Reuse the evaluation harness and add cases specific to the chosen application; disclose differences in evidence access and budgets.",
    "guide": "llm-agents"
  },
  {
    "id": 16,
    "title": "Integrate, explain, and explore frontiers",
    "track": "integration",
    "description": "Architecture synthesis and selected examples of diffusion, efficient adaptation, and emerging applications.",
    "concept": "A small implemented component can explain a larger system. Frontier examples extend that understanding without requiring students to reproduce large-scale training.",
    "objectives": [
      "Explain the path from model representations to agent actions and evaluation.",
      "Relate a selected frontier example to familiar components and a testable application."
    ],
    "practice": "Explain a complete architecture and execution trace, then prepare the team’s task definition and evaluation plan.",
    "evidence": "An architecture walkthrough and a bounded project plan; no additional preparation assignment.",
    "preparation": null,
    "reads": [
      "diffusion",
      "dit",
      "hf-llm"
    ],
    "projectUse": "Bring the four preparation exercises into a two-week integration project. Diffusion and advanced adaptation are optional extensions."
  }
].map(lesson => ({
  ...lesson,
  hours: 2,
  lab: lesson.preparation ? `${lesson.preparation} · ${preparations.find(item => item.id === lesson.preparation).title}` : 'Integration',
}));

export const projectRequirements = [
  "Work in teams of three. Choose an application with a measurable task and a manageable set of text and visual inputs.",
  "Build a working agent with at least two tools, validated inputs, explicit state, and stopping conditions. Use teaching-provided language and vision APIs; no GPU is required.",
  "Record actions, tool arguments, observations, sources, and stop reasons so that final answers can be checked against evidence.",
  "Compare with a simpler baseline on the same evaluation cases. Include normal tasks, missing evidence, and tool failures; report sample counts, task success, and API usage.",
  "Submit a reproducible system and report with a contribution record. Every student explains the complete workflow, defends their decisions, and makes a small live code modification."
];

export const projects = [
  {
    "id": "software",
    "title": "Multimodal software assistant",
    "brief": "Investigate an application error using a screenshot and documentation, run a supplied diagnostic test, and support a recommendation with results.",
    "tools": [
      "inspect_image",
      "search_documents",
      "run_diagnostic_test"
    ],
    "metrics": "Task completion, evidence support, failure recovery, and API usage.",
    "theory": "Visual grounding, retrieval, tool use, and verification."
  },
  {
    "id": "knowledge",
    "title": "Visual knowledge assistant",
    "brief": "Identify an item in a photograph, retrieve relevant instructions, and answer a question using image and document evidence.",
    "tools": [
      "retrieve_images",
      "inspect_image",
      "search_documents"
    ],
    "metrics": "Retrieval recall, answer correctness, evidence support, and API usage.",
    "theory": "Visual representations, image–text alignment, retrieval, and agent decisions."
  },
  {
    "id": "diagrams",
    "title": "Diagram explanation assistant",
    "brief": "Inspect a technical diagram, retrieve related course material, and explain its components and relationships with references and stated uncertainty.",
    "tools": [
      "inspect_diagram",
      "search_documents",
      "read_source"
    ],
    "metrics": "Component and relationship accuracy, evidence support, uncertainty handling, and API usage.",
    "theory": "Visual question answering, grounding, retrieval, and evaluation."
  }
];

export const milestones = [
  [
    "01",
    "Define and establish a baseline",
    "Choose the application, divide responsibilities, define acceptance criteria, and save baseline results."
  ],
  [
    "02–03",
    "Prepare evidence and tools",
    "Adapt the retrieval and visual-inspection interfaces. Test each tool and preserve its sources."
  ],
  [
    "04–06",
    "Integrate the agent",
    "Connect the controller, state, tools, and stop rules. Record end-to-end traces and handle failures."
  ],
  [
    "07–09",
    "Evaluate and reproduce",
    "Compare with the baseline on the same cases, analyze failures and API usage, and verify reproduction instructions."
  ],
  [
    "10",
    "Demonstrate and defend",
    "Present the shared system. Each student completes an individual defense and live code modification without AI assistance."
  ]
];
