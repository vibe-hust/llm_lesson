// A fresh worker per run keeps the page responsive and makes Stop reliable.
// Python is fetched only after Run is clicked. No additional packages are used.
const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.mjs';
const MAX_OUTPUT = 16000;

self.onmessage = async ({ data: { code } }) => {
  let output = '';
  const append = line => {
    if (output.length < MAX_OUTPUT) output += (line + '\n').slice(0, MAX_OUTPUT - output.length);
  };
  try {
    const { loadPyodide } = await import(PYODIDE_URL);
    const pyodide = await loadPyodide();
    pyodide.setStdout({ batched: append });
    pyodide.setStderr({ batched: append });
    pyodide.setStdin({ error: true });
    self.postMessage({ type: 'ready' });
    await pyodide.runPythonAsync(code);
    if (output.length >= MAX_OUTPUT) output += '\n[Output limited to 16,000 characters.]';
    self.postMessage({ type: 'done', output });
  } catch (error) {
    self.postMessage({ type: 'error', output: output + '\n' + String(error) });
  }
};
