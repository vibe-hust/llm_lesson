"""One attention head, using only the Python standard library.

Run: python3 transformer_fundamentals.py
Try: change CAUSAL to False, then change the final row of X.
These are hand-chosen vectors, not a trained language or vision model.
"""

import math

CAUSAL = True

# Three positions, two features per position. Imagine tokens OR image patches.
X = [[1.0, 0.0], [0.0, 1.0], [1.0, 1.0]]
W_Q = [[1.0, 0.0], [0.0, 1.0]]
W_K = [[1.0, 0.0], [0.0, 1.0]]
W_V = [[2.0, 0.0], [0.0, 1.0]]


def matmul(a, b):
    """[rows, inner] @ [inner, columns] -> [rows, columns]."""
    assert a and b and len(a[0]) == len(b), "Incompatible matrix shapes"
    assert all(len(row) == len(a[0]) for row in a), "Ragged matrix A"
    assert all(len(row) == len(b[0]) for row in b), "Ragged matrix B"
    return [[sum(x * y for x, y in zip(row, column))
             for column in zip(*b)] for row in a]


def softmax(scores):
    """Subtract the maximum to avoid overflow; exp(-inf) is zero."""
    largest = max(scores)
    values = [math.exp(score - largest) for score in scores]
    total = sum(values)
    return [value / total for value in values]


def attention(q, k, v, causal=False):
    """Self-attention: softmax(Q K^T / sqrt(d_k) + mask) V."""
    assert len(q) == len(k) == len(v), "This example uses self-attention"
    assert all(len(row) == len(q[0]) for row in q + k)
    scores = matmul(q, list(zip(*k)))
    weights = []
    for i, row in enumerate(scores):
        scaled = [value / math.sqrt(len(q[0])) for value in row]
        if causal:
            scaled = [value if j <= i else -math.inf
                      for j, value in enumerate(scaled)]
        weights.append(softmax(scaled))
    return weights, matmul(weights, v)


def show_matrix(label, matrix):
    print(label)
    for row in matrix:
        print("  [" + ", ".join(f"{value:.3f}" for value in row) + "]")


def main():
    q, k, v = matmul(X, W_Q), matmul(X, W_K), matmul(X, W_V)
    weights, output = attention(q, k, v, causal=CAUSAL)
    print(f"Causal mask: {CAUSAL}")
    show_matrix("Attention weights (3 x 3):", weights)
    show_matrix("Output vectors (3 x 2):", output)

    # These properties hold for any finite input vectors, not just our example.
    for i, row in enumerate(weights):
        assert abs(sum(row) - 1.0) < 1e-9
        assert all(0.0 <= weight <= 1.0 for weight in row)
        if CAUSAL:
            assert all(weight == 0.0 for weight in row[i + 1:])
    print("Checks passed: rows sum to 1; masked positions receive 0.")


if __name__ == "__main__":
    main()
