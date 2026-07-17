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

## 2026-07-17 — Window 2 complete

### T004 — Website and entry tests

- Added website and Studio-entry Playwright suites.
- Observed five expected red failures covering the missing mail contact, hidden phone navigation, selectable unsupported garments, hidden unresolved notice and missing acknowledgement gate.

### T005 — Website presentation

- Added visible pilot/service notices and a mail contact fallback without adding a registration form.
- Preserved reconciled product/FAQ copy and added accessible focus presentation.
- Kept public section navigation available at phone width.

### T006 — Truthful entry

- Basketball jersey remains the only enabled editor product.
- Men's/women's club polos are visible but disabled pending valid templates.
- Shorts are disabled and marked provisional pending cost.
- All five unresolved dependency classes and non-supplier-approved placeholders are disclosed before editing.
- Public visitors must acknowledge the browser-local demonstrator boundary before entry.

### Window 2 checkpoint evidence

- `npm run check`: pass.
- `npm test`: 15/15 pass.
- `npm run test:e2e -- website.spec.js studio-entry.spec.js`: 7/7 pass in Chromium.
- Public boundary regression suite also passed after acknowledgement flow update.
- `git diff --check`: pass (line-ending notices only).
- Scope check: no registration backend, production infrastructure or supplier functionality added.

## 2026-07-17 — Window 3 complete

### T007 — 2D/history/number tests

- Added reducer/history unit coverage and complete public-editor browser journeys.
- Observed the required red state: missing state exports, non-functional undo/redo, hidden 3D disclaimer and enabled number deletion.

### T008 — State, history and session restoration

- Added intent-based surface/view/layer actions with structured rejection errors.
- Added bounded undo/redo history and session-store persistence.
- Required/fixed layer deletion fails closed at the state boundary.

### T009 — 2D editor integration

- Wired dark/light and front/back controls to four independent 2D surfaces.
- Added functional undo/redo and browser-session design-name restoration.
- Kept the side/3D effect optional, non-editable and visibly non-authoritative.
- Protected the required number through the text controls and context menu.
- Kept player names unavailable.

### Window 3 checkpoint evidence

- `npm run check`: pass.
- `npm test`: 19/19 pass.
- `npm run test:e2e`: 14/14 pass in Chromium.
- `git diff --check`: pass (line-ending notices only).
- Scope check: no supplier geometry, accurate 3D, production proof or infrastructure added.

## 2026-07-17 — Window 4 complete

### T010 — Controls, uploads and accessibility tests

- Added supplier-independent text/image/viewport state tests and browser journeys.
- Added automated axe scans for website, entry and editor states plus phone tool-access coverage.
- Observed the required red state for missing controls, unsafe public format acceptance, hidden phone tools and contrast/ARIA failures.

### T011 — Text and raster artwork controls

- Added structured text position, rotation, alignment, letter-spacing and line-spacing controls.
- Added browser-local PNG/JPEG/WebP validation with a 5 MB limit and clear rejection guidance for active/specialist formats.
- Added image crop, opacity, horizontal/vertical flip, duplication, deletion and layer ordering.
- Routed public layer and surface changes through the tested state/history boundary.

### T012 — Accessible alternatives and responsive editor

- Added zoom, fit/reset and bounded pan controls.
- Added structured position inputs and keyboard arrow movement as alternatives to drag.
- Retained all required tool controls at phone width and added reduced-motion handling.
- Corrected serious colour-contrast and ARIA findings identified by axe.

### Window 4 checkpoint evidence

- `npm run check`: pass.
- `npm test`: 23/23 pass.
- `npm run test:e2e`: 20/20 pass in Chromium.
- Website, entry, editor and phone accessibility tests report no serious/critical axe violations.
- `git diff --check`: pass (line-ending notices only).
- Scope check: no production upload pipeline, supplier constraints, accurate 3D or infrastructure added.

## 2026-07-17 — Window 5 complete

### T013 — Checks, help and workflow-truth tests

- Added deterministic indicative-check unit tests and Help/workflow browser journeys.
- Observed the required red state for the missing check engine/dialog and incomplete workflow consequence notice.

### T014 — Indicative checks and simulation containment

- Added error, warning and guidance results for required numbers, empty text, indicative boundaries, upload validity and unresolved dependencies.
- Added an accessible design-check dialog that never establishes manufacturing readiness.
- Expanded persistent workflow notices to exclude production authentication, proof, manufacture release and supplier acknowledgement.
- Updated seeded customer-facing Coach Polo wording to Club Polo while retaining stable IDs.

### T015 — Cross-browser verification and documentation

- Added desktop Chromium, Firefox and WebKit projects plus representative Android and iPhone projects.
- Added `quickstart.md` with public, keyboard, workflow, accessibility, device and volunteer-usability checklists.
- Updated `README.md` for the public Studio and workflow simulation routes.
- Corrected mobile contrast findings and reduced cross-browser test concurrency for reliable execution.

### Window 5 and final checkpoint evidence

- `npm run check`: pass.
- `npm test`: 26/26 pass.
- `npm run test:e2e`: 115/115 pass across Chromium, Firefox, WebKit, mobile Chrome and mobile Safari projects.
- `npm audit`: zero vulnerabilities.
- `git diff --check`: pass (line-ending notices only).
- Scope check: no production infrastructure, supplier-dependent functionality, accurate 3D, final Phoenix artwork or manufacturing integration added.
- Manual checks on actual devices and the 5–8 person Phoenix usability exercise remain documented pilot-readiness activities.
