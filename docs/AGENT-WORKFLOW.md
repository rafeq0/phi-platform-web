# Codex / Multi-Agent Workflow

## Before starting a task
- Read `AGENTS.md`.
- Read only the relevant page/module files.
- Identify exact acceptance criteria.
- Avoid broad rewrites.

## Recommended task format

```text
Goal:
Scope:
Files allowed to change:
Files that must not change:
Behavior that must remain identical:
Acceptance checks:
```

## Suggested ownership
- Frontend/page agent: `src/pages/` + directly related page module.
- Effects agent: `src/js/modules/effects/`.
- Dashboard agent: `src/pages/page-dashboard.html` + `src/js/modules/pages/dashboard.js`.
- Forms/integration agent: `src/js/modules/forms/` and, later, API integration.
- Build/docs agent: `build.py`, `AGENTS.md`, `docs/`.

Avoid concurrent edits to the same file. Each agent should report files changed and verification performed.
