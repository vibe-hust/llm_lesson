"""A bounded agent loop with real Python tools and a MOCK model.

Run: python3 llm_agents.py
No model, network call, API key, or third-party package is required.
Change TASK or MAX_STEPS. Replace mock_model later with a real model adapter
that returns the same action dictionaries; keep validation in Python.
"""

TASK = "vision"  # Try "text" or "audio" (no matching evidence).
MAX_STEPS = 4   # Try 1 to observe a budget stop.

# Fictional records for learning control flow, not model recommendations.
CATALOG = {
    "toy-vit": {"task": "vision", "check": "test on held-out image patches"},
    "toy-lm": {"task": "text", "check": "test on held-out token sequences"},
}


def search_models(task):
    return [name for name, record in CATALOG.items() if record["task"] == task]


def inspect_model(model_id):
    if model_id not in CATALOG:
        raise ValueError("Model ID is not in the teaching catalog")
    return {"id": model_id, **CATALOG[model_id]}


# The allowed argument names form a small, explicit tool contract.
TOOLS = {
    "search_models": (search_models, {"task"}),
    "inspect_model": (inspect_model, {"model_id"}),
}


def execute_tool(action):
    name, arguments = action.get("tool"), action.get("arguments")
    if not isinstance(name, str) or name not in TOOLS:
        return {"ok": False, "error": "Unknown tool"}
    function, required = TOOLS[name]
    if not isinstance(arguments, dict) or set(arguments) != required:
        return {"ok": False, "error": "Invalid argument names"}
    if not all(isinstance(value, str) and 0 < len(value) <= 100
               for value in arguments.values()):
        return {"ok": False, "error": "Arguments must be short, nonempty strings"}
    try:
        return {"ok": True, "data": function(**arguments)}
    except ValueError as error:
        return {"ok": False, "error": str(error)}


def mock_model(task, history):
    """Deterministic policy for testing; this is the part an LLM replaces."""
    if not history:
        return {"type": "tool", "tool": "search_models", "arguments": {"task": task}}
    latest = history[-1]
    observation = latest["observation"]
    if not observation["ok"]:
        return {"type": "finish", "answer": "Cannot verify a result: " + observation["error"]}
    if latest["action"]["tool"] == "search_models":
        matches = observation["data"]
        if not matches:
            return {"type": "finish", "answer": "No matching evidence in the teaching catalog."}
        return {"type": "tool", "tool": "inspect_model", "arguments": {"model_id": matches[0]}}
    record = observation["data"]
    return {"type": "finish", "answer": f"{record['id']}: {record['check']}. Source: inspect_model."}


def run_agent(task, model=mock_model, max_steps=MAX_STEPS):
    if not isinstance(max_steps, int) or max_steps < 1:
        raise ValueError("max_steps must be a positive integer")
    history, trace = [], []
    for step in range(1, max_steps + 1):
        action = model(task, history)
        trace.append({"step": step, "action": action})
        if not isinstance(action, dict):
            return {"status": "invalid_action", "trace": trace, "history": history}
        if action.get("type") == "finish":
            answer = action.get("answer")
            if not isinstance(answer, str) or not answer.strip():
                return {"status": "invalid_action", "trace": trace, "history": history}
            return {"status": "finished", "answer": answer, "trace": trace, "history": history}
        if action.get("type") != "tool":
            return {"status": "invalid_action", "trace": trace, "history": history}
        observation = execute_tool(action)
        trace[-1]["observation"] = observation
        history.append({"action": action, "observation": observation})
    return {"status": "budget_exhausted", "trace": trace, "history": history}


def main():
    result = run_agent(TASK)
    print("MOCK model; real Python tools; fictional teaching data.")
    for event in result["trace"]:
        action = event["action"]
        print(f"Step {event['step']}: {action.get('tool', action['type'])}")
        if "observation" in event:
            print("  Observation:", event["observation"])
    print("Status:", result["status"])
    print("Answer:", result.get("answer", "No final answer within the step budget."))
    print("Tool calls:", len(result["history"]))


if __name__ == "__main__":
    main()
