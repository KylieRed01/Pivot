# Tasks: Website and Pivot Design Studio Demonstrator Update

**Input**: [`spec.md`](./spec.md), [`plan.md`](./plan.md)
**Work Type**: development
**Strategy**: Execution windows with test-first delivery
**Windows**: 5
**Scope**: Existing public website, public browser-local Pivot Design Studio and explicitly simulated Phoenix workflow only

---

## Format guide

- **[P]**: May run in parallel with another marked task in the same window because files do not overlap.
- **Window N**: Fresh execution context boundary.
- **Checkpoint**: Mandatory validation gate before the next window.
- **Traceability**: `R-*` requirements and `AC-*` acceptance criteria are defined in `plan.md`.
- Every behaviour task follows red → green → refactor. A failing test must be observed before implementation.
- Supplier or production-infrastructure dependencies are recorded as blockers and left unresolved, not implemented.

## Global scope guardrails

Do not add:

- hosting/deployment/provider configuration;
- a production identity provider, database, object storage, email service or registration backend;
- supplier templates, supplier API/file transfer or manufacturing status;
- accurate 3D/UV/panel mapping;
- production PDF/proof/export/release functionality;
- malware scanning, SVG/PDF sanitisation, HEIC conversion or production upload storage;
- automatic colour extraction, background removal or completed-design conversion;
- checkout, payments, ordering, rosters, names or personalisation; or
- final Phoenix colours, logos, sponsor placement or other unresolved artwork.

---

# Execution Window 1: Public-mode and test foundation (BLOCKING)

**Intelligence cue**: Raise to **High** for browser-local isolation and browser-test architecture. Return to **Medium** only after the checkpoint passes.

**Purpose**: Establish browser-level tests and prevent the public Studio from using the simulated authenticated API.

**Estimated token budget**: 55–75k

**Dependencies**: None

**Checkpoint outcome**: A visitor can enter `#studio`, edit browser-local state and generate no `/api/admin` or `/api/designs/*` request; the old workflow remains available only as an explicitly separate simulation.

---

### T001 Add browser and accessibility test harness with failing public-boundary tests

**Window**: 1
**Phase**: Tests first
**Traceability**: `R-TRIAL-01`, `R-A11Y-01`; `AC-02`, `AC-11`
**Dependencies**: None

**Files**:

- Modify `package.json` and `package-lock.json`.
- Create `playwright.config.js`.
- Create `test/e2e/studio-public-boundary.spec.js`.
- Update `.gitignore` for Playwright artifacts if required.

**Work**:

1. Add pinned development dependencies `@playwright/test` and `@axe-core/playwright`; do not add runtime dependencies.
2. Add deterministic scripts such as `test:unit`, `test:e2e` and an expanded `check` that syntax-checks new public modules.
3. Configure Playwright to start the existing Node server and exercise Chromium initially; configure Firefox/WebKit projects for the final window.
4. Write tests that enter the public Studio from the website and record all requests.
5. Assert that public setup/editing makes no request to `/api/admin` or `/api/designs/*`, exposes no real approval action, and identifies local-only state.
6. Run the tests and record the expected failure against the current `#admin` route before implementation.

**Test command**:

```bash
npm run test:e2e -- studio-public-boundary.spec.js
```

**Completion evidence**: Browser harness starts reliably and tests fail for the intended public/API-boundary reason, not configuration errors.

---

### T002 Create tested browser-local Studio configuration and state modules

**Window**: 1
**Phase**: Foundation implementation
**Traceability**: `R-TRIAL-01`, `R-2D-01`, `R-NUMBER-01`; `AC-02`, `AC-05`, `AC-08`
**Dependencies**: T001 failing boundary test exists

**Files**:

- Create `public/studio-config.js`.
- Create `public/studio-state.js`.
- Create `test/studio-state.test.js`.

**Work**:

1. First write failing Node tests for a browser-independent initial-state factory and session-state adapter seam.
2. Define a supplier-independent placeholder configuration for one reversible basketball jersey, four 2D surfaces, a required representative number, flexible text/artwork and explicit indicative metadata.
3. Implement intent-based state operations rather than exposing nested mutations.
4. Implement safe serialization for browser session state. Exclude workflow identities, server identifiers, transient file objects and production claims.
5. Ensure reset returns a clean placeholder design and public state contains no final Phoenix artwork.
6. Keep the modules DOM-free so `node:test` can exercise them.

**Tests**:

- initial state contains dark/light × front/back surfaces;
- required number metadata exists;
- state serializes without workflow or transient upload data;
- reset is deterministic; and
- no production/supplier-ready state is representable.

**Test command**:

```bash
node --test test/studio-state.test.js
```

**Completion evidence**: New state tests pass and existing Node tests remain green.

---

### T003 Separate `#studio` from the authenticated workflow simulation

**Window**: 1
**Phase**: Public boundary implementation
**Traceability**: `R-TRIAL-01`, `R-SIM-01`; `AC-02`, `AC-10`
**Dependencies**: T001, T002

**Files**:

- Modify `public/app.js`.
- Modify `public/index.html` only if route links require it.
- Extend `test/e2e/studio-public-boundary.spec.js`.

**Work**:

1. Change public website Studio CTAs/navigation to `#studio`.
2. Route `#studio` to a public editor initialized from `studio-config.js` and `studio-state.js` without fetching `/api/admin`.
3. Keep the existing backend-backed flow under `#workflow-demo` and display a persistent “workflow simulation” notice before any action.
4. Do not create a production sign-in or alter production infrastructure.
5. Ensure public upload/edit/setup paths remain browser-only and public controls do not invoke the existing design transition endpoint.
6. Refactor only enough of the monolithic `dashboard()` to enforce the mode boundary; avoid unrelated redesign.

**Tests**:

- T001 boundary tests now pass;
- direct `#workflow-demo` still loads with a simulation notice;
- `npm test` remains green.

**Checkpoint commands**:

```bash
npm run check
npm test
npm run test:e2e -- studio-public-boundary.spec.js
```

---

## WINDOW_CHECKPOINT_1

- [ ] Public `#studio` makes no protected API/write calls.
- [ ] Public state is browser-local and resettable.
- [ ] `#workflow-demo` is separate and visibly simulated.
- [ ] New state tests and all existing Node tests pass.
- [ ] No infrastructure or supplier functionality was introduced.

**Checkpoint cue**: Return to **Medium** for Window 2.

---

# Execution Window 2: Public website and truthful entry

**Intelligence cue**: Use **Medium**.

**Purpose**: Complete and protect website, FAQ, contact, trial notice and product-entry behaviour.

**Estimated token budget**: 45–65k

**Dependencies**: Window 1 complete

**Checkpoint outcome**: Public claims and product availability are accurate, and unsupported products cannot silently open the jersey editor.

---

### T004 Write failing website and Studio-entry browser tests

**Window**: 2
**Phase**: Tests first
**Traceability**: `R-WEB-01`, `R-ENTRY-01`, `R-PLACEHOLDER-01`, `R-UNRESOLVED-01`; `AC-01`, `AC-03`, `AC-04`, `AC-12`
**Dependencies**: Window 1 checkpoint

**Files**:

- Create `test/e2e/website.spec.js`.
- Create `test/e2e/studio-entry.spec.js`.

**Work**:

1. Assert website pilot availability, Greater Bendigo service boundary, product descriptions, non-commitment and `hello@pivotteamwear.com` fallback.
2. Assert the secure registration form is not rendered while production persistence is unresolved.
3. Assert the public CTA accessible name is “Start designing with the Pivot Design Studio”.
4. Assert basketball jersey is the only active editor target.
5. Assert men’s/women’s club-polo terminology is visible but unavailable, and shorts are visibly provisional pending cost.
6. Assert supplier, final Phoenix artwork, production infrastructure, accurate 3D and manufacturing integration are disclosed before editing.
7. Assert unsupported product controls cannot load the jersey as if it were that product.
8. Run and record expected failures before implementation.

**Test command**:

```bash
npm run test:e2e -- website.spec.js studio-entry.spec.js
```

---

### T005 Implement semantic, responsive website and FAQ/contact presentation

**Window**: 2
**Phase**: Website implementation
**Traceability**: `R-WEB-01`, `R-UNRESOLVED-01`; `AC-01`, `AC-12`
**Dependencies**: T004 failing website tests

**Files**:

- Modify `public/app.js`.
- Modify `public/index.html`.
- Modify `public/style.css`.

**Work**:

1. Preserve the reconciled copy while breaking the public page into semantic, navigable sections.
2. Ensure FAQ accordions, product cards, contact fallback and CTA have clear accessible names and focus styles.
3. Do not add a registration form. Explain that secure registration is not yet available and provide the email fallback.
4. Style the public-trial notice so it is prominent without presenting unresolved work as an error.
5. Remove copy that implies products, stores, pricing, launch dates or production capability are already available.
6. Ensure content reflows on narrow screens without hiding navigation to required sections.

**Tests**: Make the website portion of T004 pass without weakening assertions.

---

### T006 Implement truthful product setup and pre-entry notice

**Window**: 2
**Phase**: Entry implementation
**Traceability**: `R-ENTRY-01`, `R-PLACEHOLDER-01`, `R-UNRESOLVED-01`; `AC-03`, `AC-04`, `AC-12`
**Dependencies**: T004, T005

**Files**:

- Modify `public/app.js`.
- Modify `public/style.css`.
- Extend `test/e2e/studio-entry.spec.js` if an uncovered regression is found.

**Work**:

1. Present basketball as the only available sport and jersey as the only active editor target.
2. Show men’s and women’s club polos with current terminology as unavailable pending valid templates.
3. Show matching shorts as provisional pending confirmed cost and unavailable in this editor.
4. Preserve internal legacy values only where required for fixture compatibility; never expose coach-polo wording.
5. Require acknowledgement of the browser-local demonstrator notice before opening the editor, without implying legal consent.
6. State that placeholders are not supplier-approved or final Phoenix artwork.

**Checkpoint commands**:

```bash
npm run check
npm test
npm run test:e2e -- website.spec.js studio-entry.spec.js
```

---

## WINDOW_CHECKPOINT_2

- [ ] Website claims satisfy `AC-01` and `AC-12`.
- [ ] No non-functional registration form is exposed.
- [ ] Jersey is the only active editor product.
- [ ] Club polos and provisional shorts are labelled accurately.
- [ ] Unsupported choices never masquerade as a jersey editor.
- [ ] Desktop and phone-width entry pages remain usable.

**Checkpoint cue**: Raise to **High** for Window 3 editor state/history.

---

# Execution Window 3: Authoritative 2D state, surfaces and history

**Intelligence cue**: Use **High** for view-independent state and history. Return to **Medium** only after checkpoint.

**Purpose**: Make the 2D experience authoritative within the demonstrator and remove reliance on the optional side/3D effect.

**Estimated token budget**: 60–80k

**Dependencies**: Window 2 complete

**Checkpoint outcome**: Four 2D surfaces, selection, browser-session restoration and undo/redo are deterministic and tested.

---

### T007 Write failing state and browser tests for surfaces, history and required number

**Window**: 3
**Phase**: Tests first
**Traceability**: `R-2D-01`, `R-3D-01`, `R-NUMBER-01`; `AC-05`, `AC-06`, `AC-08`
**Dependencies**: Window 2 checkpoint

**Files**:

- Extend `test/studio-state.test.js`.
- Create `test/e2e/studio-editor.spec.js`.

**Work**:

1. Add failing reducer tests for independent dark/light and front/back edits.
2. Add failing tests for selection, update, undo, redo and session restoration.
3. Assert the required number cannot be deleted and basketball player names are unavailable.
4. Add browser tests proving all four 2D surfaces are reachable without entering 3D.
5. Assert the side/3D effect is labelled indicative, optional and never described as proof or production authority.
6. Assert switching back from 3D does not lose or alter 2D state.

**Test commands**:

```bash
node --test test/studio-state.test.js
npm run test:e2e -- studio-editor.spec.js
```

**Completion evidence**: Tests fail for missing state/history behaviour before implementation.

---

### T008 Implement view-independent reducer, history and browser-session restoration

**Window**: 3
**Phase**: State implementation
**Traceability**: `R-TRIAL-01`, `R-2D-01`, `R-NUMBER-01`; `AC-02`, `AC-05`, `AC-08`
**Dependencies**: T007 failing unit tests

**Files**:

- Modify `public/studio-state.js`.
- Modify `public/studio-config.js` only where metadata is required.

**Work**:

1. Add intent-named operations for surface/view selection, layer selection, layer updates, undo, redo and reset.
2. Use bounded in-memory history for the current editing session; do not build visible production versions.
3. Persist serializable public state to `sessionStorage` after accepted changes.
4. Make required-layer deletion an explicit rejected transition rather than a UI-only assumption.
5. Keep 3D view state separate from the four 2D design surfaces.
6. Return structured results/errors for invalid operations so the UI can announce them.

**Tests**: Make Node portions of T007 pass, including edge cases for empty history, malformed restored state and required-number deletion.

---

### T009 Wire four 2D surfaces and working undo/redo into the editor

**Window**: 3
**Phase**: UI integration
**Traceability**: `R-2D-01`, `R-3D-01`, `R-NUMBER-01`; `AC-05`, `AC-06`, `AC-08`
**Dependencies**: T007, T008

**Files**:

- Modify `public/app.js`.
- Modify `public/style.css` as needed for state/status presentation.

**Work**:

1. Render selected surface entirely from the state module.
2. Make dark/light and front/back controls update `aria-pressed` and visible labels correctly.
3. Implement undo/redo buttons with disabled states and accessible status updates.
4. Preserve the existing side/3D CSS effect only as an optional indicative preview.
5. Disable direct editing while in indicative 3D and provide a direct return to authoritative 2D.
6. Prevent deletion of the required number in every UI path, including context menus and keyboard actions.
7. Remove any player-name control or wording from the basketball editor.

**Checkpoint commands**:

```bash
npm run check
npm test
npm run test:e2e -- studio-editor.spec.js
```

---

## WINDOW_CHECKPOINT_3

- [ ] Dark/light × front/back edits remain independent.
- [ ] 2D works without entering 3D.
- [ ] 3D is optional, indicative and non-editable.
- [ ] Undo/redo and session restoration pass unit/browser tests.
- [ ] Required basketball number cannot be removed.
- [ ] Player names are absent.

**Checkpoint cue**: Return briefly to **Medium**, then raise to **High** for Window 4 accessibility/control architecture.

---

# Execution Window 4: Supplier-independent controls and accessible alternatives

**Intelligence cue**: Use **High** for structured keyboard alternatives, transform semantics and WCAG-focused UI. Return to **Medium** at checkpoint.

**Purpose**: Complete demonstrator controls without claiming supplier/manufacturing validity, and make core editing possible without drag or colour perception.

**Estimated token budget**: 70–90k

**Dependencies**: Window 3 complete

**Checkpoint outcome**: Colours, exploratory patterns, text and ordinary raster artwork can be edited through pointer and structured keyboard-operable controls.

---

### T010 Write failing control, upload-boundary and accessibility tests

**Window**: 4
**Phase**: Tests first
**Traceability**: `R-EDIT-01`, `R-A11Y-01`, `R-PLACEHOLDER-01`; `AC-04`, `AC-07`, `AC-11`
**Dependencies**: Window 3 checkpoint

**Files**:

- Extend `test/studio-state.test.js`.
- Extend `test/e2e/studio-editor.spec.js`.
- Create `test/e2e/studio-accessibility.spec.js`.

**Work**:

1. Add failing tests for text update, colour, size/scale, position, rotation, alignment, spacing, duplication, deletion and layer ordering.
2. Add failing tests for raster artwork type/size validation, proportional resize, crop, rotation, horizontal/vertical flip, opacity, duplication, deletion and layer order.
3. Assert PNG/JPEG/WebP are the only public demonstrator upload types; SVG/PDF/HEIC/specialist formats receive a clear future-handling explanation and are not loaded.
4. Assert no upload request leaves the browser.
5. Add keyboard-only tests for layer selection and structured move/resize/rotate controls.
6. Add tests for zoom in/out, fit/reset and pan controls.
7. Add axe scans for website, setup and editor states and record expected failures before fixes.

**Test commands**:

```bash
node --test test/studio-state.test.js
npm run test:e2e -- studio-editor.spec.js studio-accessibility.spec.js
```

---

### T011 Implement text, ordinary raster artwork and layer controls

**Window**: 4
**Phase**: Editor control implementation
**Traceability**: `R-EDIT-01`, `R-NUMBER-01`; `AC-07`, `AC-08`
**Dependencies**: T010 failing editor-control tests

**Files**:

- Modify `public/studio-state.js`.
- Modify `public/studio-config.js` if control metadata is needed.
- Modify `public/app.js`.
- Modify `public/style.css`.

**Work**:

1. Route every supported edit through state operations so pointer and structured controls share invariants/history.
2. Complete supplier-independent text controls; label fonts/outlines illustrative where no production approval exists.
3. Complete ordinary raster artwork controls using browser-local object/data URLs and revoke transient object URLs when removed/reset.
4. Validate MIME/type and configured byte limit before preview; do not inspect/upload/sanitise files as if this were the production pipeline.
5. Add explicit layer-up/layer-down actions and protect fixed/required elements.
6. Keep automatic background removal, colour extraction, official-logo cleanup and completed-design conversion out of scope.

**Tests**: Make editor-control and public-upload portions of T010 pass.

---

### T012 Implement zoom/pan, non-drag alternatives and responsive accessibility

**Window**: 4
**Phase**: Accessibility implementation
**Traceability**: `R-A11Y-01`, `R-EDIT-01`; `AC-07`, `AC-11`
**Dependencies**: T010, T011

**Files**:

- Modify `public/app.js`.
- Modify `public/style.css`.
- Modify `public/index.html` only for document-level semantics if necessary.

**Work**:

1. Implement functional zoom in/out, fit/reset and pan with visible values and bounded state.
2. Provide labelled numeric/step controls for x/y position, size, rotation, crop and opacity so drag is never required.
3. Add keyboard arrow movement for selected flexible elements without replacing structured controls.
4. Ensure controls have visible focus, logical order, accessible names, group labels and state announcements.
5. Ensure colour choices expose names/codes and validation never relies on colour alone.
6. Add reduced-motion handling and responsive editor reflow for phone/tablet widths; preserve all required controls.
7. Fix axe violations within scope. Document any automated-tool limitation rather than suppressing valid findings.

**Checkpoint commands**:

```bash
npm run check
npm test
npm run test:e2e -- studio-editor.spec.js studio-accessibility.spec.js
```

---

## WINDOW_CHECKPOINT_4

- [ ] Supplier-independent text/artwork controls pass.
- [ ] Public uploads remain browser-only and raster-only.
- [ ] Required/fixed element rules apply through every input path.
- [ ] Core editing is keyboard-operable without dragging.
- [ ] Zoom/pan/fit/reset work and are announced.
- [ ] Automated axe checks have no serious/critical violations in tested states.
- [ ] Phone/tablet reflow retains required controls.

**Checkpoint cue**: Return to **Medium** for Window 5.

---

# Execution Window 5: Indicative checks, workflow containment and final verification

**Intelligence cue**: Use **Medium**. If supplier or production infrastructure becomes necessary, stop and record the blocker. Do not raise intelligence to design excluded architecture.

**Purpose**: Finish truthful design guidance, contain the workflow simulation and complete cross-browser/manual verification documentation.

**Estimated token budget**: 50–70k

**Dependencies**: Window 4 complete

**Checkpoint outcome**: All `AC-01`–`AC-12` pass within scope, with unresolved dependencies visible and no production claim.

---

### T013 Write failing tests for indicative checks, help and workflow-simulation truthfulness

**Window**: 5
**Phase**: Tests first
**Traceability**: `R-HELP-01`, `R-SIM-01`, `R-UNRESOLVED-01`; `AC-09`, `AC-10`, `AC-12`
**Dependencies**: Window 4 checkpoint

**Files**:

- Extend `test/studio-state.test.js`.
- Create `test/e2e/studio-help-workflow.spec.js`.

**Work**:

1. Add deterministic check tests for required number, empty text, indicative boundaries and unsupported upload.
2. Assert check results distinguish blocking demonstrator errors, warnings and guidance without producing “production ready”.
3. Assert contextual help names all five unresolved classes and identifies 2D as authoritative.
4. Assert the workflow-demo route persistently labels fixture identities and save/submission/approval/publication as simulations.
5. Assert no production proof, manufacture release, supplier acknowledgement or secure-auth claim appears.
6. Assert help can be opened/closed without losing editor state or focus context.
7. Run and record expected failures.

---

### T014 Implement indicative design checks, contextual help and simulation labels

**Window**: 5
**Phase**: Final scoped implementation
**Traceability**: `R-HELP-01`, `R-SIM-01`, `R-UNRESOLVED-01`; `AC-09`, `AC-10`, `AC-12`
**Dependencies**: T013 failing tests

**Files**:

- Modify `public/studio-state.js` for deterministic check results.
- Modify `public/app.js` for summary/help/simulation presentation.
- Modify `public/style.css` for status/focus presentation.
- Modify `data/state.json` only to remove stale customer-facing product names, preserving stable internal IDs.
- Update existing Node tests only if fixture wording is intentionally asserted.

**Work**:

1. Implement local checks limited to facts known by the demonstrator.
2. Show issues near relevant controls and in an accessible summary with corrective actions where possible.
3. Keep supplier dimensions, local competition completeness, production colours, final artwork, accurate 3D and manufacturing status as unresolved guidance.
4. Make Help concise and contextual; do not add a chatbot, mandatory tutorial or unsolicited pop-up.
5. Label backend-backed identities/actions as workflow simulations and prevent copy from implying production authentication or approval artifacts.
6. Rename customer-facing seeded “Coach Polo” wording to club-polo terminology without changing stable fixture IDs or adding a polo editor.

**Tests**: Make T013 pass and keep existing domain/server tests green.

---

### T015 Complete cross-browser validation and manual quickstart

**Window**: 5
**Phase**: Documentation and final verification
**Traceability**: All requirements; `AC-01`–`AC-12`
**Dependencies**: T014

**Files**:

- Expand `playwright.config.js` to final Chromium, Firefox and WebKit projects plus representative phone/tablet viewports.
- Create `specs/pivot-design-tool-baseline/quickstart.md`.
- Update `README.md` only where current run/manual-test instructions become inaccurate.
- Do not modify `spec.md` unless an implementation-discovered contradiction requires explicit user review.

**Work**:

1. Run Node tests and all browser projects.
2. Run axe checks on website, entry, 2D editor and help/workflow states.
3. Document a manual keyboard-only journey and reset procedure.
4. Document desktop/tablet precision recommendation and phone limitations without blocking phone access.
5. Add manual checklists for 200%/400% zoom, screen-reader spot checks, actual iOS/Android devices and Phoenix volunteer testing.
6. List unresolved supplier, final-artwork, infrastructure, accurate-3D and manufacturing dependencies as excluded blockers.
7. Confirm no generated screenshots, traces, reports or browser binaries are committed.

**Final commands**:

```bash
npm run check
npm test
npm run test:e2e
npm audit --omit=dev
# Also review: git diff --check
```

---

## WINDOW_CHECKPOINT_5 — FEATURE COMPLETE

- [ ] `AC-01`–`AC-12` have automated or documented manual evidence.
- [ ] Node tests pass.
- [ ] Chromium, Firefox and WebKit tests pass.
- [ ] Representative phone/tablet viewport tests pass.
- [ ] Automated accessibility checks pass within defined thresholds.
- [ ] Public Studio generates no protected API/design-write request.
- [ ] Workflow backend is visibly a simulation.
- [ ] No production infrastructure or supplier-dependent capability was added.
- [ ] `quickstart.md` documents remaining manual/device/usability checks.
- [ ] `git diff --check` passes.

**Final intelligence cue**: Stay on **Medium** for summary and handoff. Do not escalate for excluded dependencies.

---

## Execution dependency graph

```text
Window 1: Public/test foundation (BLOCKING, High)
  ↓
Window 2: Website and entry (Medium)
  ↓
Window 3: 2D state and history (High)
  ↓
Window 4: Controls and accessibility (High)
  ↓
Window 5: Checks, simulation containment and verification (Medium)
```

No window may start before the previous checkpoint passes.

## Parallel opportunities

There are no recommended parallel implementation tasks. The current UI is concentrated in `public/app.js` and `public/style.css`; parallel edits would create avoidable conflicts. Test files may be prepared separately, but each window deliberately sequences tests before implementation.

## Summary

| Window | Tasks | Intelligence | Primary output |
|---|---:|---:|---|
| 1 | T001–T003 | High → Medium | Public/browser-local boundary and browser test harness |
| 2 | T004–T006 | Medium | Truthful website and product entry |
| 3 | T007–T009 | High → Medium | Four 2D surfaces, state/history, required number |
| 4 | T010–T012 | High → Medium | Editor controls and keyboard-accessible alternatives |
| 5 | T013–T015 | Medium | Indicative checks, simulation labels and final evidence |

**Total tasks**: 15
**Estimated implementation context**: 5 fresh windows, approximately 285–380k tokens total
**Next command after review**: `implement specs/pivot-design-tool-baseline/tasks.md`
