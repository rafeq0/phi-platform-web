# Architecture

## Current phase: agent-ready static frontend

The project is intentionally still a browser-native HTML/CSS/JavaScript application. This phase separates responsibilities so coding agents can work in bounded scopes without forcing a framework migration.

```text
phi_platform_split/
├── AGENTS.md
├── build.py
├── index.html                 # generated output
├── docs/
│   ├── ARCHITECTURE.md
│   └── AGENT-WORKFLOW.md
├── tasks/
├── src/
│   ├── css/main.css
│   ├── js/
│   │   ├── app.js             # initialization only
│   │   ├── tailwind-config.js
│   │   └── modules/
│   │       ├── core/navigation.js
│   │       ├── ui/feedback.js
│   │       ├── pages/{products,services,dashboard}.js
│   │       ├── forms/forms.js
│   │       └── effects/{scroll,counters,particles,cursor,typing,navbar,loading,tilt,spotlight,confetti}.js
│   ├── pages/                 # 8 existing page fragments
│   └── partials/              # shared shell fragments
```

## Dependency direction

```text
pages ──> browser DOM
modules/pages ──> DOM + GSAP
modules/effects ──> DOM + GSAP where needed
modules/core ──> DOM + page/effect functions
app.js ──> initializes modules
build.py ──> assembles source into index.html
```

JavaScript remains classic scripts because the existing HTML uses inline event handlers such as `onclick="navigateTo('home')"`. This avoids a behavioral rewrite during the structural split.

## Future production migration
When the project is ready to become a full application, use a separate migration task. A likely target is:

```text
apps/
├── web/                       # frontend
└── api/                       # backend
packages/
├── ui/                        # shared components/tokens
└── config/                    # shared configuration
infra/                         # deployment/infrastructure
```

Migrate incrementally: establish the target build, migrate one page/feature at a time, add tests, verify parity, then remove the legacy layer.
