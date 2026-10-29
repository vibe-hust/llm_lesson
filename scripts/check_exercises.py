"""Behavioral checks for the same Python files students run and download."""

import contextlib
import importlib.util
import io
from pathlib import Path
import sys
import unittest

sys.dont_write_bytecode = True
EXERCISES = Path(__file__).resolve().parents[1] / "dist" / "exercises"


def load(name):
    spec = importlib.util.spec_from_file_location(name, EXERCISES / (name + ".py"))
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


t = load("transformer_fundamentals")
a = load("llm_agents")


class AttentionChecks(unittest.TestCase):
    def projected(self, x, causal):
        return t.attention(t.matmul(x, t.W_Q), t.matmul(x, t.W_K),
                           t.matmul(x, t.W_V), causal)

    def test_worked_example(self):
        weights, output = self.projected(t.X, True)
        self.assertAlmostEqual(weights[1][0], 0.3302384506733431)
        self.assertAlmostEqual(output[1][0], 0.6604769013466862)
        self.assertAlmostEqual(output[1][1], 0.6697615493266569)
        self.assertEqual(output[0], [2.0, 0.0])

    def test_normalization_and_mask(self):
        for causal in (False, True):
            weights, _ = self.projected(t.X, causal)
            for i, row in enumerate(weights):
                self.assertAlmostEqual(sum(row), 1.0)
                self.assertTrue(all(0 <= value <= 1 for value in row))
                if causal:
                    self.assertTrue(all(value == 0 for value in row[i + 1:]))

    def test_future_input_cannot_change_past_outputs_with_mask(self):
        changed = t.X[:-1] + [[4.0, -2.0]]
        original = self.projected(t.X, True)[1]
        modified = self.projected(changed, True)[1]
        self.assertEqual(original[:2], modified[:2])
        self.assertNotEqual(self.projected(t.X, False)[1][:2],
                            self.projected(changed, False)[1][:2])

    def test_values_change_output_but_not_attention(self):
        q, k = t.matmul(t.X, t.W_Q), t.matmul(t.X, t.W_K)
        weights, output = t.attention(q, k, [[0, 0]] * 3, True)
        self.assertEqual(weights, self.projected(t.X, True)[0])
        self.assertEqual(output, [[0.0, 0.0]] * 3)

    def test_softmax_is_stable_for_large_scores(self):
        self.assertEqual(t.softmax([10000, 10000]), [0.5, 0.5])


class AgentChecks(unittest.TestCase):
    def test_success_is_supported_by_observed_record(self):
        result = a.run_agent("vision")
        self.assertEqual(result["status"], "finished")
        self.assertEqual(len(result["trace"]), 3)
        self.assertEqual(len(result["history"]), 2)
        record = result["history"][-1]["observation"]["data"]
        self.assertIn(record["id"], result["answer"])
        self.assertIn(record["check"], result["answer"])

    def test_missing_evidence(self):
        result = a.run_agent("audio")
        self.assertEqual(result["status"], "finished")
        self.assertIn("No matching evidence", result["answer"])
        self.assertEqual(len(result["history"]), 1)

    def test_budget_stops_incomplete_and_repeating_policies(self):
        self.assertEqual(a.run_agent("vision", max_steps=1)["status"], "budget_exhausted")
        def repeat(task, history):
            return {"type": "tool", "tool": "search_models", "arguments": {"task": task}}
        result = a.run_agent("vision", model=repeat, max_steps=4)
        self.assertEqual(result["status"], "budget_exhausted")
        self.assertEqual(len(result["history"]), 4)
        self.assertNotIn("answer", result)

    def test_unknown_tool_is_an_observation(self):
        def bad_then_recover(task, history):
            if not history:
                return {"type": "tool", "tool": "unknown_tool", "arguments": {}}
            return a.mock_model(task, history)
        result = a.run_agent("vision", model=bad_then_recover)
        self.assertFalse(result["history"][0]["observation"]["ok"])
        self.assertIn("Unknown tool", result["answer"])

    def test_bad_calls_never_dispatch(self):
        for arguments in (None, {}, {"task": 42}, {"task": ""},
                          {"task": "vision", "extra": "unexpected"}):
            result = a.execute_tool({"tool": "search_models", "arguments": arguments})
            self.assertFalse(result["ok"])
            self.assertNotIn("data", result)
        self.assertFalse(a.execute_tool({"tool": ["not a name"]})["ok"])

    def test_tool_errors_are_structured(self):
        result = a.execute_tool({"tool": "inspect_model", "arguments": {"model_id": "missing"}})
        self.assertFalse(result["ok"])
        self.assertIn("not in the teaching catalog", result["error"])

    def test_invalid_model_actions_stop(self):
        for action in (None, [], {}, {"type": "finish"}, {"type": "finish", "answer": " "}):
            result = a.run_agent("vision", model=lambda task, history: action)
            self.assertEqual(result["status"], "invalid_action")
            self.assertEqual(len(result["history"]), 0)

    def test_fresh_state_between_runs(self):
        self.assertEqual(a.run_agent("vision"), a.run_agent("vision"))
        self.assertIn("toy-lm", a.run_agent("text")["answer"])


class EntryPointChecks(unittest.TestCase):
    def test_original_files_print_expected_results(self):
        for module, expected in ((t, "Checks passed"), (a, "Tool calls: 2")):
            output = io.StringIO()
            with contextlib.redirect_stdout(output):
                module.main()
            self.assertIn(expected, output.getvalue())


if __name__ == "__main__":
    unittest.main()
