import argparse
import json
import os
import shutil
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List

try:
    import requests
except ImportError:
    requests = None

SYSTEM_CLARIFY = """You are a senior solution analyst.
Return STRICT JSON with keys:
- clarified_goal: string
- assumptions: string[]
- constraints: string[]
- success_criteria: string[]
- questions_for_user: string[]
No markdown.
"""

SYSTEM_PLAN = """You are a technical project planner.
Based on clarified requirement, return STRICT JSON:
{
  "workstreams": [{"name": string, "objective": string}],
  "tasks": [
    {
      "id": "T1",
      "title": string,
      "description": string,
      "depends_on": string[],
      "deliverable": string,
      "suggested_role": "execute_tasks"
    }
  ],
  "risks": string[],
  "qa_checklist": string[]
}
No markdown.
"""

SYSTEM_EXECUTE = """You are an execution worker.
Given one task and relevant context, return STRICT JSON:
{
  "task_id": string,
  "summary": string,
  "artifacts": [{"name": string, "content": string}],
  "risks": string[],
  "next_actions": string[]
}
No markdown.
"""

SYSTEM_REVIEW = """You are a principal reviewer.
Merge worker outputs and return STRICT JSON:
{
  "quality_score": number,
  "accepted_tasks": string[],
  "rework_tasks": [{"task_id": string, "reason": string}],
  "conflicts": string[],
  "final_summary": string,
  "final_artifacts": [{"name": string, "content": string}],
  "handover_notes": string[]
}
No markdown.
"""


@dataclass
class Worker:
    name: str
    base_url: str
    api_key_env: str
    model: str
    role: str


class Orchestrator:
    def __init__(self, config_path: Path, dry_run: bool = False):
        self.config = json.loads(config_path.read_text(encoding="utf-8"))
        self.workers = [Worker(**w) for w in self.config["workers"]]
        self.settings = self.config.get("settings", {})
        self.dry_run = dry_run

    def _call_worker(self, worker: Worker, system: str, user: str) -> Dict[str, Any]:
        if self.dry_run:
            return {"dry_run": True, "worker": worker.name, "echo": user[:500]}

        if requests is None:
            raise RuntimeError("requests is not installed. Run: pip install requests")

        api_key = os.getenv(worker.api_key_env)
        if not api_key:
            raise RuntimeError(f"Missing env var: {worker.api_key_env} for worker {worker.name}")

        url = worker.base_url.rstrip("/") + "/chat/completions"
        payload = {
            "model": worker.model,
            "messages": [
                {"role": "system", "content": system},
                {"role": "user", "content": user},
            ],
            "temperature": self.settings.get("temperature", 0.2),
            "max_tokens": self.settings.get("max_tokens", 2200),
            "response_format": {"type": "json_object"},
        }
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        }
        timeout = self.settings.get("timeout_seconds", 120)

        resp = requests.post(url, headers=headers, json=payload, timeout=timeout)
        resp.raise_for_status()
        data = resp.json()
        text = data["choices"][0]["message"]["content"]
        return json.loads(text)

    def _pick_worker(self, role: str) -> Worker:
        for w in self.workers:
            if w.role == role:
                return w
        return self.workers[0]

    def run(self, brief: str, out_dir: Path) -> None:
        out_dir.mkdir(parents=True, exist_ok=True)
        (out_dir / "00_brief.md").write_text(brief, encoding="utf-8")

        planner = self._pick_worker("clarify_and_plan")

        clarified = self._call_worker(
            planner,
            SYSTEM_CLARIFY,
            f"User brief:\n{brief}\n\nPlease clarify requirement.",
        )
        (out_dir / "10_clarified.json").write_text(
            json.dumps(clarified, ensure_ascii=False, indent=2), encoding="utf-8"
        )

        plan = self._call_worker(
            planner,
            SYSTEM_PLAN,
            "Input clarified JSON:\n" + json.dumps(clarified, ensure_ascii=False),
        )
        (out_dir / "20_plan.json").write_text(
            json.dumps(plan, ensure_ascii=False, indent=2), encoding="utf-8"
        )

        assignments = []
        worker_outputs = []
        done = set()

        tasks = plan.get("tasks", [])
        # Topological-ish simple scheduler
        while len(done) < len(tasks):
            progressed = False
            for t in tasks:
                tid = t["id"]
                if tid in done:
                    continue
                deps = set(t.get("depends_on", []))
                if not deps.issubset(done):
                    continue

                worker = self._pick_worker(t.get("suggested_role", "execute_tasks"))
                assignments.append({"task_id": tid, "worker": worker.name})

                context = {
                    "task": t,
                    "plan": plan,
                    "clarified": clarified,
                    "completed_outputs": [o for o in worker_outputs if o.get("task_id") in deps],
                }
                output = self._call_worker(
                    worker,
                    SYSTEM_EXECUTE,
                    json.dumps(context, ensure_ascii=False),
                )
                worker_outputs.append(output)
                done.add(tid)
                progressed = True

            if not progressed:
                raise RuntimeError("Dependency deadlock detected in tasks")

        (out_dir / "30_assignments.json").write_text(
            json.dumps(assignments, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        (out_dir / "40_worker_outputs.json").write_text(
            json.dumps(worker_outputs, ensure_ascii=False, indent=2), encoding="utf-8"
        )

        reviewer = self._pick_worker("review_and_merge")
        review_input = {
            "clarified": clarified,
            "plan": plan,
            "worker_outputs": worker_outputs,
        }
        review = self._call_worker(
            reviewer,
            SYSTEM_REVIEW,
            json.dumps(review_input, ensure_ascii=False),
        )
        (out_dir / "50_review.json").write_text(
            json.dumps(review, ensure_ascii=False, indent=2), encoding="utf-8"
        )

        report = self._make_report(clarified, plan, assignments, review)
        (out_dir / "final_report.md").write_text(report, encoding="utf-8")

    def _make_report(self, clarified, plan, assignments, review) -> str:
        lines = []
        lines.append("# Final Orchestration Report")
        lines.append("")
        lines.append("## Clarified Goal")
        lines.append(clarified.get("clarified_goal", ""))
        lines.append("")
        lines.append("## Task Assignment")
        for a in assignments:
            lines.append(f"- {a['task_id']}: {a['worker']}")
        lines.append("")
        lines.append("## Review Summary")
        lines.append(f"- Quality score: {review.get('quality_score', 'n/a')}")
        lines.append(f"- Accepted tasks: {', '.join(review.get('accepted_tasks', []))}")
        if review.get("rework_tasks"):
            lines.append("- Rework:")
            for rw in review["rework_tasks"]:
                lines.append(f"  - {rw.get('task_id')}: {rw.get('reason')}")
        lines.append("")
        lines.append("## Final Summary")
        lines.append(review.get("final_summary", ""))
        lines.append("")
        lines.append("## Handover Notes")
        for n in review.get("handover_notes", []):
            lines.append(f"- {n}")
        lines.append("")
        return "\n".join(lines)


def cmd_init_config():
    src = Path(__file__).with_name("providers.template.json")
    dst = Path.cwd() / "providers.json"
    if dst.exists():
        raise SystemExit("providers.json already exists")
    shutil.copyfile(src, dst)
    print(f"Created: {dst}")


def cmd_run(brief_file: Path, config: Path, dry_run: bool):
    brief = brief_file.read_text(encoding="utf-8")
    ts = datetime.now().strftime("%Y%m%d-%H%M%S")
    out_dir = Path.cwd() / "runs" / ts
    orch = Orchestrator(config, dry_run=dry_run)
    orch.run(brief, out_dir)
    print(f"Done. Output: {out_dir}")


def main():
    p = argparse.ArgumentParser(description="AI Orchestrator Toolkit")
    sub = p.add_subparsers(dest="cmd", required=True)

    sub.add_parser("init-config", help="Create providers.json from template")

    runp = sub.add_parser("run", help="Run orchestration")
    runp.add_argument("--brief-file", required=True, type=Path)
    runp.add_argument("--config", required=True, type=Path)
    runp.add_argument("--dry-run", action="store_true")

    args = p.parse_args()

    if args.cmd == "init-config":
        cmd_init_config()
    elif args.cmd == "run":
        cmd_run(args.brief_file, args.config, args.dry_run)


if __name__ == "__main__":
    main()
