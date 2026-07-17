# Implementation Plan: Website and Pivot Design Studio Demonstrator Update

**Branch**: `phoenix-phase-1`
**Date**: 2026-07-17
**Spec**: [`spec.md`](./spec.md)
**Work Type**: development

## Summary

Update the existing dependency-free website and Pivot Design Studio demonstrator so their behaviour, not only their copy, matches the reconciled supplier-independent baseline.

The implementation will:

1. separate the public browser-local Studio from the existing authenticated-workflow simulation;
2. make the public website and Studio truthful about pilot availability and unresolved dependencies;
3. strengthen the authoritative 2D editing experience with tested state, history, keyboard alternatives and responsive controls;
4. retain only supplier-independent design checks and explicitly label them indicative;
5. keep the existing workflow backend as a demonstrator rather than treating it as production authentication, storage, approval or manufacture; and
6. add browser-level accessibility and behaviour tests around the existing Node test suite.

The implementation will not select or build production infrastructure, supplier templates, production exports, accurate 3D mapping, manufacturing integration, secure registration persistence, production authentication, or production upload processing.

## Intelligence cues

Use explicit cues during execution:

| Execution area | Intelligence | Cue |
|---|---:|---|
| Frontend state boundary, public/private routing and test-harness design | **High** | “Raise to High for browser-local isolation and test architecture.” |
| Website copy, FAQ, product entry and routine styling | **Medium** | “Return to Medium for content and routine UI work.” |
| Editor reducer/history, keyboard alternatives and accessibility structure | **High** | “Raise to High for editor state and accessibility.” |
| Help, warning copy, workflow labels, documentation and final verification | **Medium** | “Return to Medium for reconciliation and polish.” |
| Production infrastructure or supplier integration | **Stop** | “Out of scope. Record the dependency; do not escalate or implement it.” |
| Max reasoning | **Not planned** | Use only if an unusually complex issue emerges and the user explicitly approves it. |

Each execution-window checkpoint in `tasks.md` repeats the appropriate cue.

## Technical context

- **Language/runtime**: Node.js 20+, ECMAScript modules, browser-native JavaScript, HTML and CSS.
- **Runtime dependencies**: Keep the application runtime dependency-free.
- **Development dependencies**: Add `@playwright/test` and `@axe-core/playwright` for browser behaviour and automated accessibility checks.
- **Server**: Existing `node:http` static/API server in `src/server.js`.
- **Persistence**:
  - Public Studio: browser-only session state; no authenticated API or server write.
  - Existing club workflow: `data/state.json` remains a clearly labelled simulation fixture.
  - No production database, object store or identity provider.
- **Testing**:
  - Existing `node:test` suite for pure state/domain/server behaviour.
  - Playwright for browser journeys, network-boundary assertions, keyboard operation, responsive layouts and cross-browser checks.
  - axe-core for automated WCAG checks, supplemented by manual keyboard/device verification.
- **Target platform**: Modern desktop and mobile web browsers.
- **Performance goal**: Preserve the current small static bundle; do not introduce a UI framework or production service dependency.
- **Scale/scope**: One public marketing page, one basketball-jersey public demonstrator and one explicitly simulated Phoenix workflow.

## Current-state findings

- `public/app.js` is a large browser module containing website rendering, Studio setup, design state, editor rendering and event handling.
- Public navigation currently enters `#admin`, and `dashboard()` immediately calls `/api/admin` using a hard-coded demo identity.
- Most editing state is already in `localStorage`, but save/submission controls call the demo backend and can mutate `data/state.json`.
- Uploads are read in the browser, but the public/workflow boundary is not explicit.
- Front/back and dark/light views exist; the side/3D effect is CSS-based and is not accurate geometry.
- Undo/redo, zoom and design-check controls are present visually but are not complete behaviours.
- Direct canvas dragging lacks a complete keyboard-operable structured alternative.
- Product selectors can choose shorts and polos even though the editor always displays the jersey.
- Public/FAQ/help copy has begun reconciliation, but automated tests do not protect the claims.
- The existing domain model still uses the older `primary_approver` terminology. This plan does not redesign production roles; any retained role controls must be labelled as workflow simulation.

## Traceability map

The numbered demonstrator acceptance criteria in `spec.md` are referenced as `AC-01` through `AC-12`.

| Plan requirement | Specification source | Acceptance criteria |
|---|---|---|
| `R-WEB-01` Truthful public website, Greater Bendigo boundary and contact fallback | Public website requirements; Public FAQ copy | AC-01, AC-12 |
| `R-TRIAL-01` Public Studio uses browser-local session state and no protected API/write | Public visitors; Public-trial notice | AC-02 |
| `R-ENTRY-01` Basketball-only active editor; club-polo naming; shorts provisional | Entry setup; Terminology | AC-03 |
| `R-PLACEHOLDER-01` Placeholder garment, guides and rules are visibly indicative | Authoritative 2D model; Validation | AC-04, AC-12 |
| `R-2D-01` Front/back and dark/light 2D views work independently of 3D | Authoritative 2D model | AC-05 |
| `R-3D-01` Existing side/3D effect remains optional, indicative and non-authoritative | 3D boundary | AC-06 |
| `R-EDIT-01` Supplier-independent colours, patterns, text and artwork controls work | Colour workflow; Artwork; Editor controls | AC-07 |
| `R-NUMBER-01` Basketball number remains required; player names are unavailable | Numbers and names | AC-08 |
| `R-HELP-01` Contextual help and design checks explain limits and corrections | Help; Validation | AC-09 |
| `R-SIM-01` Workflow actions and identities are explicitly simulations | Authenticated Phoenix users; Club roles | AC-10 |
| `R-A11Y-01` Semantic, keyboard-operable alternatives and responsive layouts target WCAG 2.2 AA | Navigation and accessibility; Test baseline | AC-11 |
| `R-UNRESOLVED-01` Five unresolved dependency classes are never represented as settled | Explicitly unresolved | AC-12 |

## Architecture and technical approach

### 1. Explicit mode boundary

Introduce two routes/modes inside the existing single-page application:

- `#studio`: public browser-local Design Studio. It must not call `/api/admin` or `/api/designs/*` and must not expose save, submit or approval as real actions.
- `#workflow-demo`: existing Phoenix role/approval simulation. It may use the current demo API and JSON fixture but must display a persistent simulation notice.

Public website CTAs point to `#studio`. The workflow demonstration is not presented as a production account.

### 2. Browser-local public state

Extract view-independent public design state from `public/app.js` into a focused module, for example:

- `public/studio-config.js`: supplier-independent placeholder catalogue and initial state.
- `public/studio-state.js`: state transitions, history, serialization and session-storage adapter.

Use `sessionStorage`, not server persistence, for public draft continuity within the tab/session. Uploaded raster artwork remains represented by browser-local data/object URLs and is never sent to the server. Include a clear reset action.

The state model should contain:

- setup selection;
- front/back and dark/light surface state;
- selected 2D/indicative-3D mode;
- colours and pattern controls;
- text/image/required-number layers with control level metadata;
- selected layer;
- viewport zoom/pan;
- undo/redo history; and
- local indicative check results.

### 3. Scope-safe product entry

Basketball jersey is the only active editor target. Men's and women's club polos remain visible with correct terminology but unavailable until valid templates exist. Shorts remain visible and explicitly provisional pending cost. Selecting unavailable products must not silently load the jersey editor.

Internal legacy identifiers may remain unchanged where changing them risks existing fixture compatibility; only customer-facing names must change.

### 4. Supplier-independent editor behaviour

Implement and test only controls that do not claim manufacturing validity:

- front/back and dark/light 2D views;
- colours and exploratory patterns;
- required representative basketball number;
- text wording, colour, size, proportional scale, movement, rotation, alignment, spacing, layer order, duplication and deletion where allowed;
- ordinary raster artwork move, proportional resize, crop, rotation, flip, opacity, layer order, duplication and deletion;
- zoom in/out, fit/reset and pan;
- undo/redo for the current session; and
- structured numeric/button controls as alternatives to dragging.

Do not add supplier-approved fonts, print geometry, panel mapping, production colour mapping, automated background removal, completed-garment conversion, accurate 3D, number proof generation or manufacturing validation.

For the public browser-local demonstrator, accept only formats that the browser can safely display without a production sanitisation pipeline (PNG, JPEG and WebP). Explain that SVG, PDF, HEIC/HEIF and specialist files require future reviewed handling or Pivot assistance. Do not claim this is the future authenticated upload pipeline.

### 5. Indicative design checks

Add a local, deterministic check summary limited to demonstrator facts:

- required number exists and cannot be deleted;
- text is non-empty where a text layer exists;
- flexible elements remain inside the demonstrator's indicative boundary;
- uploaded artwork has an allowed raster type and configured size limit; and
- unresolved supplier/final-artwork/3D/manufacturing dependencies remain visible.

Checks must be described as indicative and cannot produce “production ready”. There is no public submit action to gate.

### 6. Accessibility and responsive behaviour

Keep interactive controls in semantic DOM. Add:

- labelled buttons, inputs, groups and status regions;
- visible focus treatment and logical focus order;
- `aria-pressed`, `aria-selected`, live save/local-state status and announced validation summaries where appropriate;
- keyboard layer selection and position/transform controls;
- named colour swatches and non-colour status cues;
- reduced-motion support;
- reflowing mobile/tablet layout without hiding required controls; and
- a clear desktop/tablet precision recommendation without blocking phones.

Automated axe checks are a guard, not proof of complete WCAG conformance. Manual keyboard and actual Phoenix-device checks remain required.

### 7. Workflow simulation containment

Do not build production passwordless authentication, MFA, session expiry, durable approval artifacts, proof generation or manufacturing release.

Retain the existing demo API only where needed to show the current workflow. Update visible role/product terminology and persistent notices so users understand:

- identities are fixtures;
- save/submission/approval/publication actions are simulations;
- no production proof or release is created; and
- supplier/manufacturing steps remain unresolved.

Avoid a broad domain migration in this scope. If old internal role/action identifiers remain, keep them internal and remove stale customer-facing terminology.

## Constitution check

The selected shared development constitution contains CoachCW-specific rules that do not match this repository's product/domain. Applicable cross-project principles are followed; inapplicable Fastify, Prisma, athlete/session and React-specific rules are not introduced into Pivot.

| Principle | Result | Application |
|---|---|---|
| User outcomes first | PASS | Scope maps directly to observable `AC-01`–`AC-12`. |
| Test-first reliability | PASS | Each behaviour window starts with failing Node/Playwright tests. |
| Incremental slices | PASS | Public boundary, website/entry, editor core, accessibility and polish are separately gated. |
| Text-first traceability | PASS | Plan/tasks use deterministic requirement IDs and command-based checks. |
| Change safety | PASS | Public mode is isolated; workflow demo remains available as rollback/containment. |
| Backend authority | PASS with scope note | Public trial has no server-side domain truth. Existing workflow invariants remain server-owned. |
| Lifecycle/test rules | N/A | Repository uses `node:http`, not Fastify or a database connection manager. Existing server test lifecycle remains unchanged. |
| Cross-feature consistency | PASS | Uses existing ESM, `node:test`, public module and CSS structure. |
| Deep modules | PASS | Browser state/config are extracted from the monolithic renderer behind intent-based functions. No framework is added. |

No constitutional override is required.

## Project structure

Planned structure (exact split may be adjusted to keep modules cohesive):

```text
public/
├── index.html                 # semantic shell/navigation
├── app.js                     # route orchestration and rendering
├── studio-config.js           # placeholder catalogue and initial state
├── studio-state.js            # reducer/history/session persistence
└── style.css                  # responsive and accessible presentation

src/
├── server.js                  # existing demo API/static server; minimal changes only
├── domain.js                  # existing workflow simulation invariants
└── uniform-rules.js           # current partial rule profile

data/
└── state.json                 # workflow simulation fixture, not production data

test/
├── studio-state.test.js       # pure public-state unit tests
├── domain.test.js             # existing workflow invariant tests
├── server.test.js             # public/protected API boundary tests
└── e2e/
    ├── website.spec.js
    ├── studio-entry.spec.js
    ├── studio-editor.spec.js
    └── studio-accessibility.spec.js

playwright.config.js
package.json
specs/pivot-design-tool-baseline/
├── spec.md
├── plan.md
├── tasks.md
└── quickstart.md              # created during final documentation task
```

## Phased delivery

### Phase 1: Test harness and public-mode boundary

- Add Playwright/axe development tooling and scripts.
- Create failing browser tests proving the public Studio avoids protected API and server writes.
- Extract browser-local state/configuration.
- Route public CTAs to `#studio`; retain an explicit `#workflow-demo` route.

**Intelligence cue:** Raise to **High**, then return to **Medium** after the mode/network boundary passes.

### Phase 2: Website and entry truthfulness

- Protect reconciled website/FAQ/contact claims with tests.
- Finish semantic and responsive public sections.
- Make only the jersey selectable; label polos and shorts accurately.
- Add the pre-entry browser-local and unresolved-dependency notice.

**Intelligence cue:** **Medium**.

### Phase 3: Authoritative 2D state and navigation

- Add tested front/back, dark/light, selection and history transitions.
- Make 2D independent of the optional side/3D effect.
- Implement working undo/redo and state restoration for the browser session.

**Intelligence cue:** Raise to **High** for state/history; return to **Medium** at checkpoint.

### Phase 4: Supplier-independent controls and accessibility

- Complete text and ordinary raster artwork controls.
- Protect the required number.
- Implement zoom, pan, fit/reset and non-drag transform alternatives.
- Improve responsive reflow, focus, announcements and reduced motion.

**Intelligence cue:** Raise to **High** for keyboard/accessibility architecture; return to **Medium** at checkpoint.

### Phase 5: Design checks, workflow containment and final verification

- Add local indicative checks and contextual help.
- Clearly mark workflow identities/actions as simulations.
- Update fixture-facing product terminology without changing supplier/manufacturing behaviour.
- Run Node, Chromium, Firefox, WebKit, mobile viewport and axe checks.
- Document manual browser/device and usability verification.

**Intelligence cue:** **Medium**. Stop rather than implementing any supplier or infrastructure dependency discovered here.

## Testing strategy

### Unit tests (`node:test`)

Test pure state functions before UI wiring:

- initial placeholder state contains required number and four 2D surfaces;
- reducer changes only the selected surface/layer;
- undo/redo is deterministic;
- required number cannot be deleted;
- public serialization excludes transient file objects and workflow identity;
- indicative checks return deterministic error/warning/guidance results; and
- session reset returns to a clean placeholder design.

### Server/integration tests (`node:test`)

- public HTML/static assets load without identity;
- protected demo API still returns 401 without a demo identity;
- public route operation does not require a new server endpoint;
- existing club isolation and transition tests remain green; and
- no production registration/upload/manufacturing route is added.

### Browser tests (Playwright)

- website claims, FAQs, Greater Bendigo boundary, contact fallback and CTA;
- public entry notice and product availability states;
- no `/api/admin` or `/api/designs/*` request during public editing;
- uploaded raster artwork remains client-side;
- dark/light and front/back 2D editing;
- required number protection;
- undo/redo, zoom, fit/reset and structured layer movement;
- indicative 3D and unresolved-dependency labels;
- workflow simulation notices;
- keyboard-only core journey;
- responsive desktop/tablet/phone layouts; and
- axe scans on website, setup and editor states.

### Manual checks

- latest two supported versions of desktop Chrome, Edge, Firefox and Safari where available;
- Safari on current/recent supported iPhone/iPad;
- Chrome on current/recent supported Android phone/tablet;
- actual Phoenix volunteer devices;
- screen-reader spot checks and 200%/400% zoom;
- 5–8 volunteer usability sessions remain a pilot-readiness activity, not an automated task.

## Rollback and disable strategy

- Keep the existing `#workflow-demo` isolated from the new `#studio` route.
- Public Studio state is disposable and resettable; no migration is required.
- New frontend modules can be reverted without changing server data contracts.
- If the optional side/3D effect causes confusion or accessibility failures, remove/disable that control while retaining authoritative 2D.
- If a browser-specific editor control is unreliable, preserve the structured input alternative and disable only the direct-manipulation enhancement.

## Explicit exclusions

Do not implement in this plan:

- cloud/provider selection, hosting, deployment, production monitoring or backups;
- production database/object storage or production authentication;
- secure club-interest form persistence or email delivery;
- supplier selection, supplier templates, exact print boundaries or production colour mapping;
- supplier APIs, SFTP/portal handover, acknowledgements or job statuses;
- production proofs, PDF artifacts, checksums, immutable production records or release to manufacture;
- accurate 3D models, UV maps, seam/panel wrapping or production rendering;
- manufacturing validation, production export packages or number-run files;
- SVG/PDF sanitisation, malware scanning, HEIC conversion or authenticated upload quarantine;
- automatic colour extraction, background removal or completed-design conversion;
- coordinated product generation, full polo/short editor templates or family ordering;
- payment, checkout, rosters, names, personalisation or Phase 2 workflows; and
- final Phoenix palette, logo variants, wordmark treatment or sponsor placement.

## Complexity tracking

| Complexity | Why accepted | Simpler alternative rejected |
|---|---|---|
| Two explicit SPA modes | Required to prove public work does not touch simulated authenticated APIs while preserving the existing workflow demo. | Relabelling the current `#admin` route would leave a false persistence/security boundary. |
| Pure state module/reducer | Hides history, multi-surface state and invariants behind testable intent-based operations. | Continuing to mutate nested objects inside the renderer would make undo/redo and keyboard alternatives fragile. |
| Playwright + axe dev dependencies | Required for observable browser/network/accessibility acceptance criteria. | String-based Node tests cannot validate DOM behaviour, keyboard journeys or client-only network boundaries. |

No production architecture complexity is introduced.

## Supporting artifacts

- `research.md`: not required; no unresolved technology selection is needed for this scoped update.
- `data-model.md`: not required; public state is disposable browser state and no production persistence is being designed.
- `contracts/`: not required; no new production API contract is planned.
- `quickstart.md`: useful and scheduled in the final execution window for manual verification.
