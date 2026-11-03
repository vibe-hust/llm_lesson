"""Lesson 6. Rank candidate copying heads in the released Python model on a CPU."""

import argparse
import json
from pathlib import Path

import numpy as np


# Zero-based indices. Change these to investigate another pair of layers.
SOURCE_LAYER = 0
SOURCE_HEAD = 5
TARGET_LAYER = 2
HEAD_WIDTH = 64
NUM_HEADS = 6


def input_projection(weights, name, layer, head):
    """Select a head's rows, apply the LayerNorm gains and center each row."""
    rows = slice(head * HEAD_WIDTH, (head + 1) * HEAD_WIDTH)
    matrix = weights[f"W_{name}.{layer}"][rows].astype(float)
    matrix *= weights[f"ln1_w.{layer}"]
    return matrix - matrix.mean(axis=1, keepdims=True)


def rank_heads(weights):
    values = input_projection(weights, "v", SOURCE_LAYER, SOURCE_HEAD)
    columns = slice(SOURCE_HEAD * HEAD_WIDTH, (SOURCE_HEAD + 1) * HEAD_WIDTH)
    output = weights[f"W_o.{SOURCE_LAYER}"][:, columns].astype(float)
    ov = (output - output.mean(axis=0, keepdims=True)) @ values

    ranking = []
    for head in range(NUM_HEADS):
        query = input_projection(weights, "q", TARGET_LAYER, head)
        key = input_projection(weights, "k", TARGET_LAYER, head)
        qk = (query.T @ key) / np.sqrt(HEAD_WIDTH)
        # sum(qk * ov.T) equals trace(qk @ ov). Normalize by both matrix norms.
        score = np.sum(qk * ov.T) / (np.linalg.norm(qk) * np.linalg.norm(ov))
        ranking.append((f"L{TARGET_LAYER}H{head}", score))
    return sorted(ranking, key=lambda pair: pair[1], reverse=True)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="also show released behavioral scores")
    args = parser.parse_args()
    with np.load("blocks.npz", allow_pickle=False) as weights:
        ranking = rank_heads(weights)

    print(f"Source L{SOURCE_LAYER}H{SOURCE_HEAD} -> layer {TARGET_LAYER}")
    print("Head       C_k")
    for name, score in ranking:
        print(f"{name}   {score: .4f}")

    if args.check:
        measured = json.loads(Path("heads.json").read_text())["python_L4_H6_d384_s0"]
        print("\nHead    Measured induction score")
        for name, _ in ranking:
            print(f"{name}    {measured[name]['induct']:.3f}")
