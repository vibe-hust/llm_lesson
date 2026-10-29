import { lessons, tracks, resources, projects, milestones } from './content.js';
import { attentionWeights, attentionExamples } from './attention.js';

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const resourceById = id => resources.find(resource => resource.id === id);
const padded = value => String(value).padStart(2, '0');

// Each explorer uses standard keyboard tab behavior, including arrow keys.
function wireTabs(selector, onSelect) {
  const buttons = $$(selector);
  const activate = button => {
    buttons.forEach(item => {
      item.setAttribute('aria-selected', String(item === button));
      item.tabIndex = item === button ? 0 : -1;
    });
    onSelect(button);
  };
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => activate(button));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      activate(buttons[next]);
      buttons[next].focus();
    });
  });
}

const pathways = {
  language: { inputType: 'TEXT TOKENS', inputs: ['The', 'model', 'learns', 'to', '…'], model: 'Transformer', description: 'Attention + feed-forward layers', badge: '× N', outputCaption: 'Read the output', outputType: 'NEXT-TOKEN PREDICTION', output: 'create', note: 'illustrative output' },
  vision: { inputType: 'IMAGE PATCHES', inputs: ['P₁', 'P₂', 'P₃', 'P₄', 'P₅'], model: 'Vision Transformer', description: 'Patch embeddings + attention', badge: 'ViT', outputCaption: 'Read the output', outputType: 'VISUAL REPRESENTATION', output: 'image features', note: 'illustrative pathway' },
  agent: { inputType: 'TASK + OBSERVATIONS', inputs: ['Goal', 'State', 'Tools', 'Result', '…'], model: 'LLM controller', description: 'Select an action using context', badge: '↻', outputCaption: 'Execute, observe, repeat', outputType: 'BOUNDED TOOL USE', output: 'search_documents()', note: 'illustrative action' },
};
wireTabs('[data-path]', button => {
  const mode = button.dataset.path;
  const path = pathways[mode];
  $('#path-panel').setAttribute('aria-labelledby', button.id);
  $('#input-type').textContent = path.inputType;
  $('#diagram-input').innerHTML = path.inputs.map(value => `<span${mode === 'vision' ? ' class="image-patch"' : ''}>${value}</span>`).join('');
  $('#model-label').textContent = path.model;
  $('#model-description').textContent = path.description;
  $('#model-badge').textContent = path.badge;
  $('#output-caption').textContent = path.outputCaption;
  $('#output-type').textContent = path.outputType;
  $('#diagram-output').innerHTML = `<span>${path.output}</span><div class="probability-bar"><i></i></div><span class="output-label">${path.note}</span>`;
});

const menuButton = $('.menu-toggle');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  $('#main-nav').classList.toggle('open', open);
});
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  $('#main-nav').classList.remove('open');
}
$$('#main-nav a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

function renderLessons(filter = 'all') {
  const selected = lessons.filter(lesson => filter === 'all' || lesson.track === filter);
  $('#lesson-count').textContent = `${selected.length} lessons · ${selected.reduce((sum, item) => sum + item.hours, 0)} teaching hours`;
  $('#lesson-grid').innerHTML = selected.map(lesson => `<button class="lesson" data-lesson="${lesson.id}" data-track="${lesson.track}" aria-haspopup="dialog" aria-label="Lesson ${lesson.id}: ${lesson.title}">
    <span class="lesson-number">${padded(lesson.id)}</span><span class="lesson-body"><span class="lesson-meta"><i class="topic-dot" aria-hidden="true"></i>${tracks[lesson.track].label.toUpperCase()}<span>· ${lesson.hours}H</span></span><h3>${lesson.title}</h3><p>${lesson.description}</p></span><span class="lesson-arrow" aria-hidden="true">↗</span></button>`).join('');
  $$('[data-lesson]').forEach(button => button.addEventListener('click', () => openLesson(Number(button.dataset.lesson))));
}
$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  $$('[data-filter]').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
  renderLessons(button.dataset.filter);
}));

let currentLesson = 1;
let dialogTrigger;
const dialog = $('#lesson-dialog');
function showLesson(id) {
  currentLesson = id;
  const lesson = lessons.find(item => item.id === id);
  $('#dialog-eyebrow').textContent = `LESSON ${padded(id)} / ${tracks[lesson.track].label.toUpperCase()} / ${lesson.hours} HOURS`;
  $('#dialog-content').innerHTML = `<h2 id="dialog-title">${lesson.title}</h2><p>${lesson.description}</p>
    <div class="dialog-section"><h3>The essential idea</h3><p>${lesson.concept}</p></div>
    <div class="dialog-section"><h3>After this lesson, you can</h3><ul>${lesson.objectives.map(item => `<li>${item}</li>`).join('')}</ul></div>
    <div class="dialog-section"><h3>Put it into practice</h3><p>${lesson.practice}</p><span class="dialog-lab">${lesson.lab}</span></div>
    <div class="dialog-section"><h3>Show that you understand</h3><p>${lesson.evidence}</p></div>
    <div class="dialog-section"><h3>Read with a purpose</h3>${lesson.reads.map(id => { const resource = resourceById(id); return `<a href="${resource.url}" target="_blank" rel="noopener noreferrer">${resource.title} ↗</a>`; }).join('')}</div>`;
  $('#dialog-counter').textContent = `${padded(id)} / 16`;
  $('#previous-lesson').disabled = id === 1;
  $('#next-lesson').disabled = id === lessons.length;
  dialog.scrollTop = 0;
}
function openLesson(id) {
  dialogTrigger = document.activeElement;
  showLesson(id);
  dialog.showModal();
  document.body.style.overflow = 'hidden';
  $('.dialog-close').focus();
}
$('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
});
dialog.addEventListener('close', () => { document.body.style.overflow = ''; dialogTrigger?.focus(); });
$('#previous-lesson').addEventListener('click', () => { if (currentLesson > 1) showLesson(currentLesson - 1); });
$('#next-lesson').addEventListener('click', () => { if (currentLesson < lessons.length) showLesson(currentLesson + 1); });
renderLessons();

let attentionMode = 'text';
let queryIndex = 2;
function renderQueries() {
  $('#query-buttons').innerHTML = attentionExamples[attentionMode].labels.map((label, index) => `<button data-query="${index}" aria-pressed="${index === queryIndex}"><span>${label}</span><span aria-hidden="true">${index === queryIndex ? '→' : '·'}</span></button>`).join('');
  $$('[data-query]').forEach(button => button.addEventListener('click', () => { queryIndex = Number(button.dataset.query); updateAttention(); }));
}
function updateAttention() {
  const example = attentionExamples[attentionMode];
  const causal = $('#causal-toggle').checked;
  const temperature = Number($('#temperature').value);
  $('#temperature-value').textContent = temperature.toFixed(1);
  $$('[data-query]').forEach(button => {
    const selected = Number(button.dataset.query) === queryIndex;
    button.setAttribute('aria-pressed', String(selected));
    button.lastElementChild.textContent = selected ? '→' : '·';
  });
  const rows = example.queries.map((query, index) => attentionWeights(query, example.keys, { causal, queryIndex: index, temperature }));
  $('#attention-matrix').innerHTML = `<div class="matrix-row" role="row"><span class="matrix-label" role="columnheader" aria-label="Query / key">Q / K</span>${example.labels.map(label => `<span class="matrix-label" role="columnheader">${label}</span>`).join('')}</div>` + rows.map((row, index) => `<div class="matrix-row${index === queryIndex ? ' selected' : ''}" role="row"><span class="matrix-label" role="rowheader">${example.labels[index]}</span>${row.map((weight, keyIndex) => {
    const masked = causal && keyIndex > index;
    return `<span class="matrix-cell${masked ? ' masked' : ''}" role="cell" ${masked ? '' : `style="background:rgba(226,140,101,${0.10 + weight * 0.8})"`} aria-label="${example.labels[index]} to ${example.labels[keyIndex]}: ${masked ? 'masked' : `${(weight * 100).toFixed(1)} percent`}">${masked ? '—' : `${Math.round(weight * 100)}%`}</span>`;
  }).join('')}</div>`).join('');
  const weights = rows[queryIndex];
  const highest = weights.indexOf(Math.max(...weights));
  const visiblePositions = causal ? queryIndex + 1 : 4;
  $('#attention-result').textContent = `“${example.labels[queryIndex]}” can attend to ${visiblePositions} ${visiblePositions === 1 ? 'position' : 'positions'}. “${example.labels[highest]}” receives the largest weight (${Math.round(weights[highest] * 100)}%). ${causal ? 'Future positions are masked.' : 'All four positions are visible.'}`;
}
$$('[data-example]').forEach(button => button.addEventListener('click', () => {
  attentionMode = button.dataset.example;
  $('#causal-toggle').checked = attentionMode === 'text';
  $$('[data-example]').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
  renderQueries(); updateAttention();
}));
$('#causal-toggle').addEventListener('change', updateAttention);
$('#temperature').addEventListener('input', updateAttention);
renderQueries(); updateAttention();

// This intentionally deterministic walkthrough demonstrates the agent protocol.
// It is labeled as a script, and never pretends to invoke an actual LLM.
const walkthrough = [
  { title: '01 / OBSERVE', text: 'Goal: find an image-classification architecture and one useful evaluation check. Available tool: search_resources.' },
  { title: '02 / ACT', code: 'search_resources({ topic: "Vision", query: "image classification" })', text: 'The controller selects a resource lookup.' },
  { title: '03 / UPDATE', code: 'result: { title: "An Image is Worth 16×16 Words", architecture: "ViT" }', text: 'Observation saved: ViT processes image patches as a sequence.' },
  { title: '04 / VERIFY', text: 'Check the source and the acceptance criteria: a named architecture, supporting evidence, and a test on held-out images.' },
  { title: '05 / STOP', text: 'Recommendation: start with a pretrained ViT. Measure accuracy on held-out images from your task and inspect failure cases.', resource: 'vit' },
];
let agentStep = 0;
$('#agent-next').addEventListener('click', () => {
  if (agentStep >= walkthrough.length) return;
  if (agentStep === 0) $('#agent-log').innerHTML = '';
  const step = walkthrough[agentStep];
  const entry = document.createElement('div'); entry.className = 'log-entry';
  entry.innerHTML = `<span class="log-title">${step.title}</span>${step.code ? `<code>${step.code}</code><br>` : ''}${step.text}${step.resource ? ` <a href="${resourceById(step.resource).url}" target="_blank" rel="noopener noreferrer"><u>Read the source ↗</u></a>` : ''}`;
  $('#agent-log').append(entry);
  $$('[data-stage]').forEach(stage => { const index = Number(stage.dataset.stage); stage.classList.toggle('current', index === agentStep); stage.classList.toggle('completed', index < agentStep); });
  agentStep += 1;
  $('#agent-progress').textContent = `${agentStep} / 5`;
  $('#agent-reset').disabled = false;
  $('#agent-next').innerHTML = agentStep === 5 ? 'Task complete <span aria-hidden="true">✓</span>' : 'Run next step <span aria-hidden="true">→</span>';
  $('#agent-next').disabled = agentStep === 5;
  $('#agent-log').scrollTop = $('#agent-log').scrollHeight;
});
$('#agent-reset').addEventListener('click', () => {
  agentStep = 0;
  $('#agent-progress').textContent = '0 / 5';
  $('#agent-log').innerHTML = '<div class="agent-empty"><span aria-hidden="true">↳</span><p>The task is ready.<br>Run the first step to inspect the workflow.</p></div>';
  $$('[data-stage]').forEach(stage => stage.classList.remove('current', 'completed'));
  $('#agent-next').innerHTML = 'Run first step <span aria-hidden="true">→</span>';
  $('#agent-next').disabled = false;
  $('#agent-reset').disabled = true;
  $('#agent-next').focus();
});

function renderProject(id) {
  const project = projects.find(item => item.id === id);
  $('#project-panel').setAttribute('aria-labelledby', `project-${id}`);
  $('#project-panel').innerHTML = `<div class="project-copy"><span class="eyebrow">${project.label.toUpperCase()}</span><h3>${project.title}</h3><p>${project.brief}</p><div class="project-connection"><span>CONNECTS THE THEORY</span>${project.theory}</div></div><div class="project-toolbox"><span class="control-label">YOUR TOOLS</span><div class="tool-list">${project.tools.map(tool => `<code>${tool}</code>`).join('')}</div><span class="control-label">WHAT YOU WILL DELIVER</span><ul>${project.deliverables.map(item => `<li>${item}</li>`).join('')}</ul><p>${project.metrics}</p></div>`;
}
wireTabs('[data-project]', button => renderProject(button.dataset.project));
renderProject('software');
$('#milestones').innerHTML = milestones.map(([day, title, description]) => `<li class="milestone"><span>${day}<small>DAY${day.includes('–') ? 'S' : ''}</small></span><div><h4>${title}</h4><p>${description}</p></div></li>`).join('');

const featuredIds = ['attention', 'vit', 'dit', 'clip', 'react', 'pytorch'];
const orderedResources = [...featuredIds.map(resourceById), ...resources.filter(item => !featuredIds.includes(item.id))];
let allResources = false;
function renderResources() {
  $('#resource-grid').innerHTML = (allResources ? orderedResources : orderedResources.slice(0, 6)).map(resource => `<a class="resource" href="${resource.url}" target="_blank" rel="noopener noreferrer" aria-label="${resource.title}, ${resource.kind}, opens in a new tab"><div class="resource-top"><span>${resource.kind.toUpperCase()} / ${resource.topic.toUpperCase()}</span><span aria-hidden="true">↗</span></div><h3>${resource.title}</h3><span class="resource-author">${resource.author}</span><p>${resource.note}</p></a>`).join('');
  $('#resource-toggle').setAttribute('aria-expanded', String(allResources));
  $('#resource-toggle').innerHTML = allResources ? 'Show selected resources <span aria-hidden="true">−</span>' : `Show all ${resources.length} resources <span aria-hidden="true">+</span>`;
}
$('#resource-toggle').addEventListener('click', () => { allResources = !allResources; renderResources(); });
renderResources();
