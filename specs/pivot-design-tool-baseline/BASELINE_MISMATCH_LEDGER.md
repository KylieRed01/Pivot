# Baseline Mismatch Ledger

**Status:** AUDIT OUTPUT — NO REMEDIATION AUTHORISED
**Basis:** `DECISION_PROVENANCE_AUDIT.md` decision groups compared with current `spec.md`, plan, tasks, implementation and automated tests.
**Implementation:** Frozen.

## Summary

| Severity | Count |
|---|---:|
| Critical | 3 |
| High | 8 |
| Medium | 5 |
| Low | 1 |
| **Total** | **17** |

Passing tests are recorded as implementation evidence only. They do not close a mismatch when the test itself derives from unverified or unapproved wording.

## Critical mismatches

### M01 — No single trustworthy source of truth

- **Recovered decision:** Governing documents and all linked help/FAQ/specification material were to be reconciled together before coding.
- **Current state:** `prd.md`, `issues.md` and `spec.md` make incompatible authority claims. Governing PRD/Constitution wording remains outdated.
- **Impact:** Every downstream plan, task, test and completion claim can select the wrong authority.
- **Disposition:** Create one user-verified canonical decision register, then explicitly mark historical artifacts as superseded/reference-only.

### M02 — Approved customer copy was replaced without approval

- **Recovered decision:** `grill-me-handover.md` lines 133–233 passed Brand Kit and duplicate-language review.
- **Current state:** `spec.md`, `public/app.js` and `test/e2e/website.spec.js` contain replacement prose, including internal policy language.
- **Impact:** Brand/compliance approval was bypassed and tests protect unapproved wording.
- **Disposition:** Use `APPROVED_COPY_RECONCILIATION.md` only as a proposal. Apply nothing until each changed passage is approved.

### M03 — Product target and demonstrator slice can be mistaken for one another

- **Recovered decision:** The target is the complete Pivot design tool, not a reduced Phoenix product.
- **Current state:** The current plan intentionally implements a narrow supplier-independent demonstrator. `IMPLEMENTATION_SUMMARY.md` and checked tasks can read as feature completion rather than completion of only that slice.
- **Impact:** Missing target-product capabilities may be incorrectly treated as rejected or complete.
- **Disposition:** Canonical documentation must maintain separate **target product**, **current demonstrator slice**, and **production-readiness gate** columns.

## High mismatches

### M04 — Help taxonomy transfer remains only partially repaired

- **Recovered decision:** FAQs, Pivot Design Studio Help and Club Help Centre are separate approved areas.
- **Current state:** Category structure has been provisionally restored, but wording and contextual CTA placement remain unapproved.
- **Files:** `spec.md`, `public/app.js`, `test/e2e/website.spec.js`
- **Disposition:** Keep structure frozen; reconcile copy through the proposal.

### M05 — Workflow garment uses an excluded Phoenix Phase 1 asset

- **Recovered decision:** Use an approved Pivot light/dark wordmark for Phase 1 sponsorship; do not use the penguin icon.
- **Current state:** `public/app.js:38-39,90` inserts `Pivot_Icon.svg` on garment surfaces.
- **Additional Brand Kit issue:** `PIVOT` text is recreated with an ordinary interface font, while the Brand Kit requires approved wordmark artwork.
- **Disposition:** Replace garment branding with approved wordmark assets after audit approval; retain icon use only in the application shell where permitted.

### M06 — Upload persistence remediation is internally inconsistent

- **Recovered decision:** Accepted public artwork restored in the documented browser session must fit the browser-local persistence boundary.
- **Current state:** `public/studio-state.js:120-121` now enforces a 1 MB aggregate budget, while `public/app.js:125` still advertises 5 MB.
- **Impact:** The UI accepts selection based on stale copy; reducer rejection can be misreported as a successful addition.
- **Disposition:** Complete F12 as one TDD slice after provenance approval.

### M07 — Cumulative upload rejection is not surfaced correctly

- **Current state:** File validation occurs before reading with no existing-byte total. The reducer can later return `UPLOAD_BUDGET_EXCEEDED`, but the upload handler ignores the failed dispatch and reports “Added …”.
- **Files:** `public/app.js:195`, `public/studio-state.js:164`
- **Disposition:** Propagate reducer errors to the upload status and add browser tests for cumulative files and near-limit persistence.

### M08 — Required-number invariant does not hold in workflow simulation

- **Recovered decision:** Basketball numbers are required and cannot be removed.
- **Current state:** Public placeholder layers carry `required`/`constrained` metadata, but workflow `defaultSides()` number layers do not. Workflow delete paths mutate arrays directly and permit number deletion while more than one layer remains.
- **Files:** `public/app.js:37-39,158,200,203`
- **Disposition:** Decide whether the workflow demo shares the reducer or receives equivalent fixture metadata/invariants; add workflow regression coverage.

### M09 — Reducer does not consistently enforce template control levels

- **Recovered decision:** Fixed, constrained and flexible metadata controls allowed operations; protected required elements cannot be hidden/reordered improperly.
- **Current state:** `reorderLayer` accepts constrained/fixed layers; `updateLayer` protects metadata keys but not control-level transform restrictions. UI disabling is doing work that the state boundary does not guarantee.
- **Files:** `public/studio-state.js:232-327`
- **Disposition:** Define the supplier-independent invariant subset and enforce it in reducer tests, not only UI state.

### M10 — Approval can bypass the demonstrated submission state

- **Recovered decision:** A club user submits an exact version, then the administrator approves that submitted version.
- **Current state:** A `submit` transition now exists, but `clubApprove` still accepts `draft` and `revision_requested` directly.
- **File:** `src/domain.js:13`
- **Impact:** Direct API use can demonstrate a lifecycle that contradicts current help/proof decisions.
- **Disposition:** Either enforce submitted-only approval in the simulation or document/test the intentional legacy exception without presenting it as the intended workflow.

### M11 — Phoenix fixture data still implies unresolved artwork

- **Recovered decision:** Final Phoenix artwork/palette are unresolved; Phase 1 uses approved Pivot wordmark placeholders only.
- **Current state:** `data/state.json` exposes `PHOENIX` artwork values for published fixture products. UI code rewrites some layer text at runtime, but the public store API can still return the fixture value.
- **Disposition:** Replace or clearly label fixture artwork as placeholder without inventing Phoenix assets.

## Medium mismatches

### M12 — Text and Images menu taxonomy drift

- **Recovered decision:** Uploaded artwork belongs under Images; Text is separate.
- **Current state:** Visible rail says Text, but accessible name is “Text and artwork”, panel says “Text and layers”, and help says “Add text or artwork”.
- **Files:** `public/app.js:119,125`
- **Disposition:** Confirm final source wording and align semantic/visible labels and tests.

### M13 — Canvas navigation target is only partially represented

- **Recovered decision:** Zoom, fit, reset, pan, mouse/trackpad, touch-pinch and keyboard alternatives.
- **Current state:** Structured zoom and numeric pan controls exist; wheel/pinch/direct pan are absent or unverified.
- **Disposition:** Classify these as required for this demonstrator or explicitly defer them while preserving structured accessible alternatives.

### M14 — Completion records are no longer valid acceptance evidence

- **Current state:** `tasks.md` has all checkpoints checked, ledger says implementation complete, and summary records remediation completion.
- **Impact:** The provenance audit has reopened baseline authority and identified further implementation gaps.
- **Disposition:** Keep historical execution evidence but change feature acceptance state to blocked/unverified after canonical reconciliation.

### M15 — Tests lock unapproved prose

- **Current state:** `test/e2e/website.spec.js` asserts replacement answers as “latest reconciled approved answers”.
- **Impact:** Automated checks can reject restoration of genuinely approved wording.
- **Disposition:** Until copy approval, test category structure, safety boundaries and required claims—not unapproved full sentences.

### M16 — Historical PRD/issues terminology remains discoverable as current guidance

- **Current state:** `prd.md` and `issues.md` retain coach-polo terminology, durable guest drafts, automatic extraction as P1 and a broader MVP while declaring authority.
- **Disposition:** Preserve for history but add explicit superseded headers and pointers after the canonical source is approved.

## Low mismatch

### M17 — Contact addresses in help are plain text rather than actionable links

- **Recovered principle:** Customer actions should be clear, simple and practical.
- **Current state:** Main contact section uses `mailto:`, categorized help answers render plain email text.
- **Disposition:** Consider consistent actionable links when approved copy is implemented.

## Verified non-mismatches

The audit found current alignment for:

- Brand Kit hero headline/subheading and primary palette/typography;
- Greater Bendigo boundary;
- pilot/unavailable product disclosure;
- basketball-only active editor;
- club-polo visible terminology;
- provisional shorts label;
- four authoritative 2D surfaces;
- indicative/non-editable 3D;
- browser-local/no-protected-API public mode;
- public raster upload type boundary;
- supplier/final-artwork/infrastructure/manufacturing unresolved notices;
- workflow simulation labelling;
- no production proof/release claims;
- required number in the public reducer;
- no basketball player-name control;
- semantic/keyboard alternatives and automated accessibility checks; and
- explicit production/supplier scope exclusions.

## Remediation order after provenance approval

1. Approve canonical source hierarchy and copy deltas.
2. Correct documentation authority/status before code.
3. Update tests to the approved baseline.
4. Fix brand assets and workflow/state invariants.
5. Complete F12 upload persistence atomically.
6. Reconcile completion records.
7. Run all checks and a fresh provenance-aware structured review.
