import { ENABLE_PYTHON_EXERCISES } from '../config.js';

for (const exercise of document.querySelectorAll('[data-python-exercise]')) {
  if (!ENABLE_PYTHON_EXERCISES) {
    exercise.remove();
    continue;
  }
  exercise.hidden = false;
  const editor = exercise.querySelector('textarea');
  const run = exercise.querySelector('[data-run]');
  const reset = exercise.querySelector('[data-reset]');
  const stop = exercise.querySelector('[data-stop]');
  const status = exercise.querySelector('[data-status]');
  const output = exercise.querySelector('[data-output]');
  let starter;
  let loading = false;
  let worker;
  let timer;

  // Opening the exercise loads only its tiny source file, not Python itself.
  exercise.addEventListener('toggle', async () => {
    if (!exercise.open || starter !== undefined || loading) return;
    loading = true;
    status.textContent = 'Loading the exercise…';
    try {
      const response = await fetch(exercise.dataset.source);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      starter = await response.text();
      editor.value = starter;
      editor.disabled = run.disabled = reset.disabled = false;
      status.textContent = 'Ready. Edit the code, then run it.';
    } catch {
      status.textContent = 'Could not load the code. Close and reopen to retry, or download the Python file below.';
    } finally {
      loading = false;
    }
  });

  function finish(message) {
    clearTimeout(timer);
    worker?.terminate();
    worker = undefined;
    run.disabled = reset.disabled = editor.disabled = false;
    stop.hidden = true;
    status.textContent = message;
  }

  run.addEventListener('click', () => {
    if (worker || starter === undefined) return;
    output.textContent = '';
    run.disabled = reset.disabled = editor.disabled = true;
    stop.hidden = false;
    status.textContent = 'Loading Python… The first run needs an internet connection.';
    try {
      worker = new Worker(new URL('./python-worker.js', import.meta.url), { type: 'module' });
      timer = setTimeout(() => finish('Python took too long to load. Try again, or download and run locally.'), 45000);
      worker.onmessage = ({ data }) => {
        if (data.type === 'ready') {
          clearTimeout(timer);
          status.textContent = 'Running…';
          timer = setTimeout(() => finish('Stopped after 10 seconds. Check for an infinite loop.'), 10000);
        } else if (data.type === 'done') {
          output.textContent = data.output || '(Finished with no printed output.)';
          finish('Finished.');
        } else if (data.type === 'error') {
          output.textContent = data.output;
          finish('Could not complete the run. See the output, or download and run locally.');
        }
      };
      worker.onerror = () => finish('Could not start Python. Try again, or download and run locally.');
      worker.postMessage({ code: editor.value });
    } catch {
      finish('This browser could not start Python. Download the file and run it locally.');
    }
  });
  stop.addEventListener('click', () => finish('Stopped. You can edit the code and run it again.'));
  reset.addEventListener('click', () => {
    editor.value = starter;
    output.textContent = 'Your output will appear here.';
    status.textContent = 'Original code restored.';
  });
  window.addEventListener('pagehide', () => { clearTimeout(timer); worker?.terminate(); });
}
