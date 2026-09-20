# Phi Platform — Agent Rules

## Purpose
This repository is an agent-ready working structure for Phi Platform. The current UI and behavior are the source of truth until a migration task explicitly changes them.

## Golden rules
1. Preserve the existing visual design and user-facing behavior unless the task explicitly requests a change.
2. Do not rewrite unrelated pages or modules.
3. Before editing, inspect the smallest relevant scope.
4. Prefer one agent/branch per bounded area: a page, a feature module, or a backend domain.
5. Do not edit another agent's files unless the task explicitly requires it.
6. Keep shared changes small and coordinated.
7. Run `python build.py` after source changes.
8. Verify the generated `index.html` is rebuilt successfully.
9. Do not move inline-handler function names (`navigateTo`, `showToast`, etc.) without updating every caller.
10. Do not introduce a framework migration (React/Next/etc.) as part of a feature task unless the task explicitly asks for it.

## Current architecture
- `src/pages/` — page markup only.
- `src/partials/` — shared shell markup.
- `src/css/` — global styling.
- `src/js/modules/core/` — application-wide navigation and core state.
- `src/js/modules/ui/` — reusable UI interactions.
- `src/js/modules/pages/` — page-specific interactions.
- `src/js/modules/forms/` — form behavior.
- `src/js/modules/effects/` — visual effects and animation behavior.
- `src/js/app.js` — initialization/orchestration only.
- `index.html` — generated build output; edit source files, not this file.

## Agent ownership suggestion
- Agent A: pages and content (`src/pages/`)
- Agent B: UI/effects (`src/js/modules/effects/`, `src/js/modules/ui/`)
- Agent C: page behavior (`src/js/modules/pages/`)
- Agent D: forms/backend integration (`src/js/modules/forms/`)
- Agent E: build/infrastructure/docs (`build.py`, `AGENTS.md`, `docs/`)

Avoid concurrent edits to the same file.
