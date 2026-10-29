import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { lessons, resources, tracks, projects } from '../dist/content.js';
import { attentionWeights, attentionExamples } from '../dist/attention.js';
import { ENABLE_PYTHON_EXERCISES } from '../dist/config.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assert.equal(lessons.length, 16);
assert.equal(new Set(lessons.map(lesson => lesson.id)).size, 16);
assert.equal(lessons.reduce((sum, lesson) => sum + lesson.hours, 0), 32);
for (const [id, track] of Object.entries(tracks)) {
  assert.equal(lessons.filter(lesson => lesson.track === id).reduce((sum, lesson) => sum + lesson.hours, 0), track.hours, `${id} hour allocation`);
}
for (const lesson of lessons) {
  assert.ok(lesson.objectives.length && lesson.practice && lesson.evidence);
  for (const id of lesson.reads) assert.ok(resources.some(resource => resource.id === id), `Missing resource ${id}`);
}
assert.equal(projects.length, 3);
for (const example of Object.values(attentionExamples)) {
  for (const causal of [false, true]) {
    for (const temperature of [0.3, 1, 2]) {
      for (let index = 0; index < example.queries.length; index++) {
        const weights = attentionWeights(example.queries[index], example.keys, { causal, queryIndex: index, temperature });
        assert.ok(Math.abs(weights.reduce((sum, value) => sum + value, 0) - 1) < 1e-12, 'Attention rows must normalize');
        assert.ok(weights.every(value => Number.isFinite(value) && value >= 0));
        if (causal) assert.ok(weights.slice(index + 1).every(value => value === 0), 'Masked positions must contribute zero');
      }
    }
  }
}
assert.deepEqual(attentionWeights([1, 0], [[1, 0], [1, 0]]), [0.5, 0.5]);
assert.throws(() => attentionWeights([1], [[1]], { temperature: 0 }));
assert.equal(typeof ENABLE_PYTHON_EXERCISES, 'boolean');
const dist = path.join(root, 'dist');
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => entry.isDirectory()
    ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]));
  return nested.flat();
}
const files = await walk(dist);
const pages = new Map();
for (const file of files.filter(file => file.endsWith('.html'))) {
  const html = await readFile(file, 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `Duplicate HTML IDs in ${file}`);
  pages.set(file, { html, ids });
}
for (const [file, { html }] of pages) {
  for (const match of html.matchAll(/(?:href|src|data-source)="([^"]+)"/g)) {
    const target = match[1];
    if (/^(https?:|mailto:)/.test(target)) continue;
    const [relative, anchor] = target.split('#');
    const pathname = relative.split('?')[0];
    const destination = pathname ? path.resolve(path.dirname(file), pathname) : file;
    await access(destination);
    if (anchor) assert.ok(pages.get(destination)?.ids.includes(anchor), `Missing anchor ${target} in ${file}`);
  }
}
for (const file of files.filter(file => file.endsWith('.js'))) {
  execFileSync(process.execPath, ['--check', file]);
}
const syllabus = await readFile(path.join(root, 'dist/syllabus.md'), 'utf8');
for (const lesson of lessons) assert.ok(syllabus.includes(lesson.title), `Download missing lesson ${lesson.id}`);
execFileSync('python3', [path.join(root, 'scripts/check_exercises.py')], { stdio: 'inherit' });
console.log(`Passed: 16 lessons, 32 hours, resource mappings, attention checks, ${pages.size} HTML pages and local links, JavaScript syntax, Python exercises, and syllabus completeness.`);
