# Code Review: Pivot Design Studio Baseline

**Outcome:** BLOCKED

## Review basis

- Reviewed `spec.md`, `plan.md`, `tasks.md`, `IMPLEMENTATION_SUMMARY.md`, `.planning/pivot-design-tool-baseline/STATE.md`, and the complete available Git diff/history.
- No `main` ref exists. The review covered all 13 commits and the complete diff from `origin/phoenix-phase-1` (`17d0ca5`) to `HEAD` (`4a7b1e6`).
- The diff covered 41 files, with 5,878 insertions and 215 deletions.
- The referenced `code-review-checklist` skill was not installed. The eight sections defined by the available `code-reviewer` skill were applied.
- Review only: no implementation findings were auto-fixed.

## Automated checks

| Check | Result |
|---|---|
| `npm run check` | PASS |
| `npm test` | PASS — 26/26 |
| `npm run test:e2e` | PASS — 115/115 across five projects |
| `npm audit --omit=dev` | PASS — 0 vulnerabilities |
| TypeScript | N/A |
| `git diff --check` | **FAIL — trailing whitespace** |

`git diff --check` failed in five specification/research documents, including `cloud-provider-comparison.md` and several grill handovers. This automated-check failure blocks merge.

## Checklist results

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

**Severity:** FAIL
**Files:** `public/studio-state.js:127-133`, `public/app.js:154`

The required number layer can be edited to an empty or non-number value. Checks then report a non-blocking `EMPTY_TEXT` warning saying the layer is optional rather than reporting the required number as missing.

**Required change:** Enforce valid representative-number content and return a blocking required-number error for blank or invalid values. Add reducer and browser regression tests.

### F02 — Context menu bypasses state invariants and history

**Severity:** FAIL
**File:** `public/app.js:150`

Context-menu duplicate/delete directly mutate `sides[side].layers` instead of dispatching reducer actions. The context menu also permits duplication of the constrained required number even though the structured Duplicate control is disabled.

**Required change:** Route context-menu operations through reducer/history actions, enforce control levels, and test every context-menu path.

### F03 — Indicative 3D remains keyboard-editable

**Severity:** FAIL
**Files:** `public/style.css:4`, `public/app.js:118,171-173`

3D mode disables pointer events using CSS, but editor controls remain enabled and keyboard-focusable. A keyboard user can modify text while the supposedly non-editable 3D view is active.

**Required change:** Make editing controls semantically disabled or inert in 3D and add a keyboard regression test.

### F04 — Uploaded artwork is lost on session reload

**Severity:** FAIL
**Files:** `public/studio-state.js:96-101`, `public/app.js:187`

Uploads are represented as data URLs, but serialization deletes `layer.src`. After reloading during the same browser session, the image layer remains while its artwork source is gone.

**Required change:** Preserve artwork through the documented session boundary or explicitly remove unsupported restoration claims and stale image layers. Add an upload-and-reload test.

### F05 — Undo/redo does not cover supported edits atomically

**Severity:** FAIL
**Files:** `public/app.js:156,175-178`, `public/studio-state.js:313-325`

`setPalette` is not recorded in history. Third/fourth colour edits therefore cannot be undone. Applying one pattern dispatches four separate surface changes, so one Undo only reverses part of the user-visible action.

**Required change:** Represent compound user actions as one history transaction and include all editable colour state. Test pattern and palette undo/redo.

### F06 — Workflow “submission” invokes approval and fails for its fixture identity

**Severity:** FAIL
**Files:** `public/app.js:114,205`, `src/domain.js:8-16`

“Simulate submission” invokes `clubApprove`. The hard-coded `admin@phoenix.test` identity is not permitted to perform that action, so the control produces a role error rather than simulating submission.

**Required change:** Align the label, action, fixture role, and demonstrated transition. Test the actual button outcome, not only its presence.

### F07 — Planned public reset is not exposed or documented

**Severity:** FAIL
**Files:** `public/app.js:114-120,198`, `public/studio-state.js:347-354`, `specs/pivot-design-tool-baseline/quickstart.md`

A state reset API exists but has no public UI. “Fit” only resets the viewport. The quickstart also does not provide the reset procedure required by T015.

**Required change:** Add a clear full-session reset action and document/test its behaviour.

### F08 — Required FAQ content is incomplete

**Severity:** FAIL
**File:** `public/app.js:19`

The public FAQ omits the required “How do we register our club’s interest?” answer. The sports answer also omits that clubs from any sport may contact Pivot.

**Required change:** Reconcile the rendered FAQ with `spec.md:128-154` and protect it with tests.

### F09 — Public requests carry a workflow identity header

**Severity:** WARN
**File:** `public/app.js:9,61`

The public Studio fetches `/api/uniform-rules` through the shared `api()` helper, which always sends `x-demo-user: admin@phoenix.test`. The endpoint ignores it, but this leaks workflow identity concerns into public mode.

**Recommended change:** Use an unauthenticated fetch path for public resources and assert that the public route sends no identity header.

### F10 — Browser persistence failures are silent

**Severity:** WARN
**File:** `public/studio-state.js:314,367-373`

Storage failures return `false`, but history and UI ignore the result and continue displaying browser-local status.

**Recommended change:** Surface a recoverable local-persistence warning while retaining in-memory editing.

### F11 — Planning and completion records are inconsistent

**Severity:** FAIL
**Files:** `specs/pivot-design-tool-baseline/tasks.md`, `specs/pivot-design-tool-baseline/task-ledger.md`, `.planning/pivot-design-tool-baseline/STATE.md`

- The task ledger claims 15/15 tasks complete.
- `tasks.md` has no checked completion boxes and 34 unchecked checkpoint boxes.
- The prior state file said key files were uncommitted even though the working tree was clean.
- The ledger claims every checkpoint is complete despite `git diff --check` failing.

**Required change:** Reconcile the planning artifacts after implementation findings and automated checks are resolved.

## Tasks audit

- Task ledger: 15/15 claimed complete.
- `tasks.md`: 0 checked completion boxes and 34 unchecked checkpoint boxes.
- Completion cannot be accepted while the findings above and the failed diff check remain unresolved.

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
