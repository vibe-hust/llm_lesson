export function attentionWeights(query, keys, { causal = false, queryIndex = 0, temperature = 1 } = {}) {
  if (!query.length || !keys.length || !Number.isFinite(temperature) || temperature <= 0 || keys.some(key => key.length !== query.length)) {
    throw new Error('Attention requires matching, nonempty vectors and a positive temperature.');
  }
  const scores = keys.map((key, index) => causal && index > queryIndex ? -Infinity : query.reduce((sum, value, i) => sum + value * key[i], 0) / Math.sqrt(query.length) / temperature);
  const max = Math.max(...scores);
  const exponents = scores.map(score => score === -Infinity ? 0 : Math.exp(score - max));
  const total = exponents.reduce((sum, value) => sum + value, 0);
  return exponents.map(value => value / total);
}

export const attentionExamples = {
  text: { labels: ['A', 'robot', 'sees', '.'], queries: [[1, 0], [0.8, 1], [1, 1.4], [0.2, 0.7]], keys: [[1, 0.2], [0.5, 1.2], [1.1, 0.9], [0.2, 0.5]] },
  vision: { labels: ['Sky', 'Cloud', 'Tree', 'Ground'], queries: [[1.2, 0.1], [1, 0.4], [0.2, 1.3], [0.4, 1]], keys: [[1.2, 0], [1.1, 0.3], [0.1, 1.2], [0.3, 1.1]] },
};
