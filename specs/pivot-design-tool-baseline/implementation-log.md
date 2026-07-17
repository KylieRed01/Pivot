# Implementation Log: Website and Pivot Design Studio Demonstrator

## 2026-07-17 — Initialization

- Accepted work type: development.
- Active branch `phoenix-phase-1` matches the branch explicitly declared in `plan.md`.
- Workflow is non-Linear; no Linear status transition applies.
- Loaded the shared constitution core and development routing document.
- Confirmed test-first delivery, five execution windows and three tasks per window.
- Locked exclusions for production infrastructure and supplier-dependent functionality.
- Existing uncommitted specification and copy reconciliation changes will be preserved.
- Window 1 is initialized and awaiting explicit start confirmation.

## Evidence

- Feature specification: `spec.md`
- Implementation plan: `plan.md`
- Execution tasks: `tasks.md`
- Scope lock: `scope-lock.md`
- State: `.planning/pivot-design-tool-baseline/STATE.md`

## 2026-07-17 — Window 1 complete

### T001 — Test harness

- Added exact development dependencies `@playwright/test` 1.61.1 and `@axe-core/playwright` 4.12.1.
- Added Playwright configuration, Chromium project, server lifecycle and artifact ignores.
- Observed the required red state: public CTA navigated to `#admin`, and `#workflow-demo` had no simulation notice.

### T002 — Browser-local state foundation

- Added DOM-free placeholder configuration and state modules.
- Added four passing unit tests covering four 2D surfaces, required numbers, safe serialization, session storage, reset and fail-closed restoration.

### T003 — Mode boundary

- Public CTAs now enter `#studio`.
- Public Studio uses `sessionStorage` and never calls protected admin/design endpoints.
- Existing backend-backed behaviour is isolated under `#workflow-demo` (with `#admin` retained as a legacy alias) and visibly identified as simulation.
- Public editor controls do not expose simulated save/submission actions.

### Window 1 checkpoint evidence

- `npm run check`: pass.
- `npm test`: 15/15 pass.
- `npm run test:e2e -- studio-public-boundary.spec.js`: 2/2 pass in Chromium.
- `git diff --check`: pass (line-ending notices only).
- Scope check: no production infrastructure or supplier-dependent functionality added.
