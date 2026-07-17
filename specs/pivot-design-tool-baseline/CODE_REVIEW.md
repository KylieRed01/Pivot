# Code Review: Pivot Design Studio Baseline

**Outcome:** CHANGES REQUIRED

## Original review basis

- Reviewed `spec.md`, `plan.md`, `tasks.md`, `IMPLEMENTATION_SUMMARY.md`, `.planning/pivot-design-tool-baseline/STATE.md`, and the complete available Git diff/history.
- No `main` ref exists. The review covered all 13 commits and the complete diff from `origin/phoenix-phase-1` (`17d0ca5`) to `HEAD` (`4a7b1e6`).
- The diff covered 41 files, with 5,878 insertions and 215 deletions.
- The referenced `code-review-checklist` skill was not installed. The eight sections defined by the available `code-reviewer` skill were applied.
- Review only: no implementation findings were auto-fixed.

## Post-remediation automated checks

| Check | Result |
|---|---|
| `npm run check` | PASS |
| `npm test` | PASS — 33/33 |
| `npm run test:e2e` | PASS — 180/180 across five projects |
| `npm audit --omit=dev` | PASS — 0 vulnerabilities |
| TypeScript | N/A |
| Complete branch + working-tree `git diff --check` | PASS |

The post-remediation checks above supersede the blocked-review evidence. Fresh structured review results appear below.

## Original checklist results

| Section | Result |
|---|---|
| 1. Spec Traceability | FAIL |
| 2. Constitutional Compliance | FAIL |
| 3. Data Ownership & Auth | WARN |
| 4. Error Semantics | FAIL |
| 5. Schema & Migration Safety | PASS |
| 6. Code Quality | FAIL |
| 7. Frontend | FAIL |
| 8. Observability | WARN |

## Findings

### F01 — Required basketball numbers can be empty

**Status:** RESOLVED
**Severity:** FAIL
**Files:** `public/studio-state.js:127-133`, `public/app.js:154`

The required number layer can be edited to an empty or non-number value. Checks then report a non-blocking `EMPTY_TEXT` warning saying the layer is optional rather than reporting the required number as missing.

**Required change:** Enforce valid representative-number content and return a blocking required-number error for blank or invalid values. Add reducer and browser regression tests.

**Resolution evidence:** The reducer now rejects blank and non-numeric required-number edits, indicative checks classify malformed required numbers as blocking `REQUIRED_NUMBER` errors rather than optional-text warnings, and focused Node plus Chromium regressions pass.

### F02 — Context menu bypasses state invariants and history

**Status:** RESOLVED
**Severity:** FAIL
**File:** `public/app.js:150`

Context-menu duplicate/delete directly mutate `sides[side].layers` instead of dispatching reducer actions. The context menu also permits duplication of the constrained required number even though the structured Duplicate control is disabled.

**Required change:** Route context-menu operations through reducer/history actions, enforce control levels, and test every context-menu path.

**Resolution evidence:** Public duplicate and delete context actions now dispatch reducer/history actions, Edit selects through the reducer, and constrained layers cannot be duplicated. Focused Chromium regressions cover Edit, undoable Duplicate, undoable Delete, and required-layer control states.

### F03 — Indicative 3D remains keyboard-editable

**Status:** RESOLVED
**Severity:** FAIL
**Files:** `public/style.css:4`, `public/app.js:118,171-173`

3D mode disables pointer events using CSS, but editor controls remain enabled and keyboard-focusable. A keyboard user can modify text while the supposedly non-editable 3D view is active.

**Required change:** Make editing controls semantically disabled or inert in 3D and add a keyboard regression test.

**Resolution evidence:** Entering indicative 3D now makes the tool panel inert and disables design-name, canvas-layer, undo and redo controls while keeping the 2D return available. A focused Chromium keyboard regression verifies the semantic disabled state.

### F04 — Uploaded artwork is lost on session reload

**Status:** RESOLVED
**Severity:** FAIL
**Files:** `public/studio-state.js:96-101`, `public/app.js:187`

Uploads are represented as data URLs, but serialization deletes `layer.src`. After reloading during the same browser session, the image layer remains while its artwork source is gone.

**Required change:** Preserve artwork through the documented session boundary or explicitly remove unsupported restoration claims and stale image layers. Add an upload-and-reload test.

**Resolution evidence:** Safe PNG/JPEG/WebP data URLs are now included in browser-session serialization while transient file/object URL fields remain excluded. Node serialization coverage and a Chromium upload/reload regression confirm that artwork remains visible in the same session.

### F05 — Undo/redo does not cover supported edits atomically

**Status:** RESOLVED
**Severity:** FAIL
**Files:** `public/app.js:156,175-178`, `public/studio-state.js:313-325`

`setPalette` is not recorded in history. Third/fourth colour edits therefore cannot be undone. Applying one pattern dispatches four separate surface changes, so one Undo only reverses part of the user-visible action.

**Required change:** Represent compound user actions as one history transaction and include all editable colour state. Test pattern and palette undo/redo.

**Resolution evidence:** History now records palette edits and supports atomic non-nested batches. Whole-jersey pattern application and coupled surface/palette colour changes dispatch one batch. Node and Chromium regressions cover atomic undo/redo, pattern application, coupled colours, and third/fourth palette colours.

### F06 — Workflow “submission” invokes approval and fails for its fixture identity

**Status:** RESOLVED
**Severity:** FAIL
**Files:** `public/app.js:114,205`, `src/domain.js:8-16`

“Simulate submission” invokes `clubApprove`. The hard-coded `admin@phoenix.test` identity is not permitted to perform that action, so the control produces a role error rather than simulating submission.

**Required change:** Align the label, action, fixture role, and demonstrated transition. Test the actual button outcome, not only its presence.

**Resolution evidence:** The simulation now has an explicit `submit` transition permitted for the displayed Phoenix fixture role and returns a non-durable `submitted` result. The button invokes that action and reports “Simulated submission complete”. Domain, server and Chromium tests cover the actual outcome without mutating the fixture file.

### F07 — Planned public reset is not exposed or documented

**Status:** RESOLVED
**Severity:** FAIL
**Files:** `public/app.js:114-120,198`, `public/studio-state.js:347-354`, `specs/pivot-design-tool-baseline/quickstart.md`

A state reset API exists but has no public UI. “Fit” only resets the viewport. The quickstart also does not provide the reset procedure required by T015.

**Required change:** Add a clear full-session reset action and document/test its behaviour.

**Resolution evidence:** The public editor now exposes **Reset design** with accessible name **Reset browser session**. It clears history/session storage and returns to setup; a reload regression confirms the clean placeholder remains. `quickstart.md` documents the reset and distinguishes it from viewport Fit.

### F08 — Required FAQ content is incomplete

**Status:** RESOLVED
**Severity:** FAIL
**File:** `public/app.js:19`

The public FAQ omits the required “How do we register our club’s interest?” answer. The sports answer also omits that clubs from any sport may contact Pivot.

**Required change:** Reconcile the rendered FAQ with `spec.md:128-154` and protect it with tests.

**Resolution evidence:** The rendered FAQ now states that clubs from any sport may contact Pivot, includes the secure-registration/contact fallback answer, and uses the full non-commitment question and registration wording. A focused Chromium FAQ regression protects the required content.

### F09 — Public requests carry a workflow identity header

**Status:** RESOLVED
**Severity:** WARN
**File:** `public/app.js:9,61`

The public Studio fetches `/api/uniform-rules` through the shared `api()` helper, which always sends `x-demo-user: admin@phoenix.test`. The endpoint ignores it, but this leaks workflow identity concerns into public mode.

**Recommended change:** Use an unauthenticated fetch path for public resources and assert that the public route sends no identity header.

**Resolution evidence:** Public JSON resources now use a separate unauthenticated request path. The public-boundary Chromium test inspects every `/api/uniform-rules` request and confirms that no `x-demo-user` header is sent.

### F10 — Browser persistence failures are silent

**Status:** RESOLVED
**Severity:** WARN
**File:** `public/studio-state.js:314,367-373`

Storage failures return `false`, but history and UI ignore the result and continue displaying browser-local status.

**Recommended change:** Surface a recoverable local-persistence warning while retaining in-memory editing.

**Resolution evidence:** History dispatch, undo and redo now report persistence outcomes without rejecting accepted in-memory state. The public editor displays a recoverable warning explaining that editing may continue but reload/reset can lose work. Node and Chromium regressions simulate failed storage.

### F11 — Planning and completion records are inconsistent

**Status:** RESOLVED
**Severity:** FAIL
**Files:** `specs/pivot-design-tool-baseline/tasks.md`, `specs/pivot-design-tool-baseline/task-ledger.md`, `.planning/pivot-design-tool-baseline/STATE.md`

- The task ledger claims 15/15 tasks complete.
- `tasks.md` has no checked completion boxes and 34 unchecked checkpoint boxes.
- The prior state file said key files were uncommitted even though the working tree was clean.
- The ledger claims every checkpoint is complete despite `git diff --check` failing.

**Required change:** Reconcile the planning artifacts after implementation findings and automated checks are resolved.

**Resolution evidence:** All 34 checkpoint boxes in `tasks.md` are checked, `task-ledger.md`, `IMPLEMENTATION_SUMMARY.md` and `STATE.md` reflect remediation status and current test counts, and trailing whitespace was removed from the complete branch diff.

## Tasks audit

- Task ledger: 15/15 complete.
- `tasks.md`: 34/34 checkpoint boxes checked.
- F01–F11: confirmed resolved by fresh review.

## Fresh structured review

**Review date:** 2026-07-17

The fresh review covered the complete diff from `origin/phoenix-phase-1` through the remediation working tree. The referenced `code-review-checklist` skill remains unavailable, so the eight required sections from the installed `code-reviewer` skill were applied directly. The `Work Type: development` selector was validated against the shared Core and development constitution; CoachCW-specific framework/domain rules were treated as inapplicable as documented in `plan.md`.

### Fresh automated checks

| Check | Result |
|---|---|
| `npm run check` | PASS |
| `npm test` | PASS — 33/33 |
| `npm run test:e2e` | PASS — 180/180 across five projects |
| `npm audit --omit=dev` | PASS — 0 vulnerabilities |
| Complete branch + working-tree diff check | PASS |
| TypeScript | N/A |

### Fresh checklist results

| Section | Result |
|---|---|
| 1. Spec Traceability | FAIL |
| 2. Constitutional Compliance | PASS |
| 3. Data Ownership & Auth | PASS |
| 4. Error Semantics | PASS |
| 5. Schema & Migration Safety | PASS |
| 6. Code Quality | PASS |
| 7. Frontend | FAIL |
| 8. Observability | PASS |

### F12 — Accepted 5 MB artwork cannot reliably cross the session reload boundary

**Status:** OPEN
**Severity:** FAIL
**Files:** `public/studio-state.js:120,152-153`, `public/app.js:125`, `specs/pivot-design-tool-baseline/IMPLEMENTATION_SUMMARY.md:45`

Artwork is serialized as a base64 data URL in `sessionStorage`. A binary file near the advertised 5 MB limit expands to roughly 6.7 MB before the rest of the Studio state is included, exceeding common per-origin `sessionStorage` quotas. Multiple smaller accepted images can produce the same failure. F10 now warns after storage fails, but that does not satisfy the documented upload-and-reload restoration behaviour used to resolve F04.

**Required change:** Set and enforce an artwork/session budget that can actually be serialized within the supported browser boundary, including base64 expansion and existing state, or use another browser-local persistence mechanism within scope. Add a near-limit and/or cumulative upload persistence regression; keep the recoverable storage warning as a fallback.

### F13 — Approved help categories and customer copy were flattened during specification transfer

**Status:** OPEN — category structure restored; final reconciled copy requires user approval
**Severity:** FAIL
**Files:** `specs/pivot-design-tool-baseline/grill-me-handover.md:128-233`, `specs/pivot-design-tool-baseline/spec.md`, `public/app.js`, `test/e2e/website.spec.js`

The approved handover defines three distinct help areas: **FAQs**, **Pivot Design Studio Help**, and **Club Help Centre**. The reconciled specification retained public FAQs and Club Help copy but dropped the named Design Studio category, while the rendered page flattened some Club Help questions into the public FAQ accordion.

**Partial remediation evidence:** The source handovers and all Markdown FAQ/help references were traced for supersession. `spec.md` and the website now restore the approved three-category taxonomy, and focused Chromium tests protect category membership. However, the original Brand Kit-reviewed customer copy contains later-invalid promises, while the reconciled spec substitutes internal policy language. Final customer-facing wording and contextual CTA placement must be proposed separately for user approval rather than silently inferred.

### F14 — Workflow garment uses a superseded Pivot penguin asset

**Status:** OPEN
**Severity:** FAIL
**Files:** `specs/pivot-design-tool-baseline/grill-me-handover-cloud-provider-selection.md:56`, `specs/pivot-design-tool-baseline/spec.md` (Entry setup), `public/app.js:38-39,90`

The latest handover requires Phoenix Phase 1 placeholders to use an approved Pivot wordmark and explicitly excludes the Pivot penguin icon as a garment design asset. The workflow demo still inserts `Pivot_Icon.svg` onto garment surfaces.

**Required change:** Replace garment-use of the icon with an approved light/dark Pivot wordmark treatment while retaining the icon only in the Pivot application shell. Add a workflow garment regression.

### F15 — Text and Images menu separation drifted

**Status:** OPEN
**Severity:** WARN
**Files:** `specs/pivot-design-tool-baseline/handover-summary.md:430-431`, `public/app.js:119,125`

The later editor handover separates uploaded artwork under **Images** and says Text should no longer be named “Text and artwork”. The visible rail says Text, but its accessible name remains “Text and artwork” and its panel says “Text and layers”.

**Required change:** Confirm the final customer-facing label from the provenance chain, align visible and accessible names, and protect the menu taxonomy with a browser test.

### Fresh review summary

F01–F11 are resolved. F12, F13 and F14 remain blocking; F15 remains an open warning. Do not merge until provenance reconciliation and the upload persistence boundary are complete, all automated gates are rerun, and the structured review is repeated.

## Manual verification still required before pilot readiness

The implementation summary correctly identifies manual checks that remain outside the automated suite:

- current/recent iPhone and iPad Safari;
- current/recent Android Chrome devices;
- desktop Edge and Safari where available;
- screen-reader spot checks;
- 200% and 400% zoom checks; and
- realistic task testing with 5–8 Phoenix volunteers.

These do not replace resolution of the review findings.

## Resolution process

1. Address each FAIL finding without broadening feature scope.
2. Add focused regression tests for each corrected behaviour.
3. Resolve `git diff --check` failures.
4. Reconcile `tasks.md`, `task-ledger.md`, `IMPLEMENTATION_SUMMARY.md`, and `STATE.md` with actual status.
5. Run all automated checks.
6. Re-run the structured code review.
7. Do not merge until the outcome is APPROVED.
