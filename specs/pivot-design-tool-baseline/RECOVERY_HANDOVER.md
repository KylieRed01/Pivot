# Pivot Design Tool Baseline — Provenance Recovery Handover

**Date:** 2026-07-17
**Work type:** development
**Branch:** `phoenix-phase-1`
**Status:** BLOCKED — implementation frozen pending decision/document provenance recovery
**Merge:** Do not merge
**Recommended intelligence:** High for provenance/register/document reconciliation; Medium only for one-decision-at-a-time user verification or copy review; High again for technical remediation

## Why this recovery exists

The implementation was remediated against `spec.md`, but the user identified that the rendered FAQs were not the approved categorized copy. Investigation confirmed this was not an isolated UI mistake:

- the approved help taxonomy was flattened;
- Brand Kit-reviewed copy was replaced with internal policy language without user approval;
- `prd.md`, `issues.md` and `spec.md` contain conflicting source-of-truth declarations;
- handovers explicitly required coordinated governing/spec/help reconciliation before coding, but that reconciliation did not occur; and
- further implementation mismatches were discovered during provenance review.

The user is understandably frustrated by wasted time/tokens and must not be asked to redo settled decisions. Recover exact documented decisions and ask only about genuine conflicts, missing external facts or changed customer wording.

## Mandatory operating rules for the next chat

1. Read this file first.
2. Do not treat current `spec.md`, plan, tasks, tests or passing checks as authoritative acceptance evidence.
3. Do not modify implementation or customer-facing copy until provenance/domain/copy approval gates are complete.
4. Do not paraphrase approved copy and call it approved.
5. Preserve original handovers/transcripts as historical evidence.
6. Do not modify the external `Business Register.xlsx` unless Kylie explicitly asks.
7. Do not delete, revert or alter unrelated untracked landing-page/Canva work.
8. Work in small checkpoints and state intelligence changes explicitly.

## Source authority and read order

Read these recovery artifacts first:

1. `specs/pivot-design-tool-baseline/DECISION_PROVENANCE_AUDIT.md`
2. `specs/pivot-design-tool-baseline/BASELINE_MISMATCH_LEDGER.md`
3. `specs/pivot-design-tool-baseline/CANONICAL_DECISION_REGISTER_DRAFT.md`
4. `specs/pivot-design-tool-baseline/APPROVED_COPY_RECONCILIATION.md`
5. `specs/pivot-design-tool-baseline/DECISION_REGISTER_ENTRIES.md`
6. `specs/pivot-design-tool-baseline/ASSUMPTIONS_REGISTER_ENTRIES.md`
7. `specs/pivot-design-tool-baseline/PROJECT_DOCUMENT_RECONCILIATION_PLAN.md`
8. `.planning/pivot-design-tool-baseline/STATE.md`

Original authority/evidence chain:

1. `docs/Business Plan_V1.00.pdf`
2. `docs/Operating Model_V1.00.pdf`
3. `docs/brand/Brand Kit_V1.00.pdf`
4. `docs/brand/Visual Design Guide_V1.00.pdf`
5. `grill-me-reconstruction.md` / `grill-me-recovered-transcript.md`
6. `grill-me-handover.md`
7. `grill-me-handover-production-output.md`
8. `grill-me-handover-editor-product.md`
9. `grill-me-handover-security-infrastructure.md`
10. `grill-me-handover-cloud-provider-selection.md`

Explicit later handovers supersede earlier sessions where they conflict. `prd.md` and `issues.md` are historical planning artifacts despite their old authority declarations.

## Recovery artifacts completed

### `DECISION_PROVENANCE_AUDIT.md`

- 78 decision groups across brand/content, product, public trial, editor, artwork/colour, assets, roles/approval/proof, club store, infrastructure/security and unresolved inputs.
- Establishes authority/supersession chain.
- Identifies three critical provenance failures.

### `BASELINE_MISMATCH_LEDGER.md`

17 mismatches:

- 3 critical
- 8 high
- 5 medium
- 1 low

Includes source-of-truth conflict, unapproved copy, target-vs-slice confusion, branding assets, upload persistence, workflow number invariant, reducer control levels, approval lifecycle, fixture artwork, navigation coverage and stale completion evidence.

### `CANONICAL_DECISION_REGISTER_DRAFT.md`

Compact 10-domain user-verification surface:

1. authority/document status;
2. brand/website/help;
3. product target/current slice;
4. public trial/persistence;
5. editor model;
6. colours/artwork/text/numbers/patterns;
7. roles/approval/proof/manufacture;
8. club store;
9. security/privacy/infrastructure; and
10. external/provisional/excluded decisions.

This is draft only and not yet approved.

### `APPROVED_COPY_RECONCILIATION.md`

- Proposal only; not approved or implemented.
- Exact approved copy baseline is `grill-me-handover.md` lines 133–233.
- Preserves unchanged copy and isolates only later-required factual changes.
- Do not infer that the user's instruction to continue approved any proposed replacement wording.

### `DECISION_REGISTER_ENTRIES.md`

- 48 entry-ready proposed rows.
- Uses workbook columns: `#`, `Business Area`, `Decisions`, `Decision`, `Owner`, `Date`, `Reason`.
- External workbook not modified.

### `ASSUMPTIONS_REGISTER_ENTRIES.md`

- 34 entry-ready proposed rows.
- Uses workbook columns: `#`, `Business Area`, `Assumptions`, `Status`, `Owner`, `Date`, `Validation Method`.
- Includes invalidated 5 MB browser-storage assumption and pending supplier/Phoenix facts.
- External workbook not modified.

### `PROJECT_DOCUMENT_RECONCILIATION_PLAN.md`

- Five coordinated batches from authority/external facts through governing docs, canonical product/copy, specification/planning, implementation and final review.
- Covers Business Plan, Operating Model, Brand Kit, Visual Design Guide, Pivot Constitution, Phoenix PRD, external Pilot PDF, spec/PRD/issues/brief/handovers, plan/tasks/tests/code, summaries/reviews and external registers.
- Lists eight decisions genuinely requiring user input.

## Explicit outstanding deliverables

These were requested in the original grill and are still outstanding:

1. Entry-ready **Actions Register** rows using exact workbook columns:
   - `#`
   - `Business Area`
   - `Task`
   - `Description`
   - `Owner`
   - `Priority`
   - `Due Date`
   - `Status`
   - `Waiting On`
   - `Evidence / Outcome`
   - `Notes`
2. Entry-ready **Risks, Dependencies and Issues** output.
   - The Risks workbook tab has no established schema; do not invent a workbook schema as authoritative.
   - Provide a repository proposal with clearly labelled suggested fields or use concise entry-ready statements pending schema approval.
3. User verification of the 10 canonical domains.
4. User approval/change decisions for only the changed customer-copy passages.
5. Current outcomes of supplier evaluation, Phoenix palette/assets, administrator/test-user nominations and shorts cost decision.
6. Coordinated governing-document drafts and approvals.
7. Rebuilt canonical specification and explicit historical-status headers.
8. Provenance-aware code/test remediation and fresh review.

## Safe next task

Continue document-only recovery at **High** intelligence:

1. Write `specs/pivot-design-tool-baseline/ACTION_REGISTER_ENTRIES.md` using the exact Actions workbook columns.
2. Write `specs/pivot-design-tool-baseline/RISK_DEPENDENCY_ISSUE_ENTRIES.md`, clearly separating risks, dependencies and issues and noting that no external Risks schema exists.
3. Update only `.planning/pivot-design-tool-baseline/STATE.md` to reference those outputs.
4. Stop for user review. Do not modify source documents, copy, implementation or external workbook.

## Current implementation state — important

The working tree contains implementation remediation performed before the provenance freeze. It is not currently verified against an approved canonical baseline.

### Earlier remediation

F01–F11 were technically addressed against the then-current spec, including required numbers, context menus, 3D inert controls, session artwork, atomic history, simulated submission, reset, FAQ omissions, unauthenticated public resource fetches, storage warnings and planning records.

Those fixes are not automatically invalid, but their product acceptance must be rechecked after canonical recovery.

### Partial/inconsistent work present

- F12 storage remediation is incomplete:
  - `public/studio-state.js` now uses a 1 MB aggregate artwork budget;
  - `public/app.js` still advertises 5 MB;
  - upload UI can ignore reducer budget rejection and report success.
- Help categories were provisionally restored, but replacement customer wording is unapproved.
- `spec.md` contains provisional help-copy additions that must not be treated as approved.
- Tests currently lock some unapproved copy.

### Known open technical/provenance findings

- Approved help copy/taxonomy and contextual CTA placement.
- Pivot penguin/recreated PIVOT text used on workflow garments instead of approved wordmark assets.
- Text/Images menu naming drift.
- Workflow simulation required number can be deleted because fixture layers lack required/control metadata.
- Reducer control levels are not consistently enforced for reorder/update paths.
- Club approval transition may bypass submission.
- `data/state.json` exposes PHOENIX artwork despite unresolved final Phoenix assets.
- Mouse/trackpad/touch-pinch/direct-pan target coverage is absent or unverified.
- Completion checkboxes/summary cannot be treated as current acceptance.

## Automated evidence status

Earlier, before provenance/category/storage changes:

- `npm run check`: PASS
- `npm test`: 33/33 PASS
- `npm run test:e2e`: 180/180 PASS
- `npm audit --omit=dev`: PASS
- complete diff whitespace check: PASS

After later provisional category/copy and partial F12 changes:

- focused categorized-help Chromium tests passed;
- focused artwork-budget unit test passed;
- `git diff --check` passed;
- **the complete automated suite has not been rerun and current acceptance is unverified**;
- concurrent work subsequently deleted `playwright.config.js` and the tracked `test/e2e` suites, so do not attempt to restore or reinterpret browser-test status without first identifying that work's owner/purpose.

Do not quote 33/180 as current final evidence.

## Working-tree safety

Branch was previously 14 commits ahead of `origin/phoenix-phase-1`; remediation/recovery work remains uncommitted. Do not merge.

The working tree changed concurrently during recovery and includes work not owned by this provenance task. At handover time this includes:

- modified `.gitignore`, `README.md`, `package.json`, `package-lock.json`, `public/app.js`, `public/style.css`, planning/spec files and tests;
- deleted `playwright.config.js` and the tracked `test/e2e/*.spec.js` suites;
- untracked `AGENTS.md` and `test/repository-guardrails.test.js`;
- untracked `public/images/landing/`, `public/temporary-landing.css`, and `public/temporary-landing.html`;
- untracked `specs/phoenix-phase-1/canva-exports/`.

Some earlier files (including `test/e2e/temporary-landing.spec.js`) appeared and then changed/disappeared while this recovery was active. Assume another user/process is modifying the same working tree. Re-run `git status` before every action. Do not restore deleted files, delete untracked files, edit/stage concurrent work, or assume ownership without explicit instruction.

## User-context guidance

- The user has spent substantial time approving copy and decisions and is frustrated by the failed transfer and token cost.
- Do not ask the user to repeat prior sessions or reapprove unchanged decisions.
- Present only compact, decision-ready deltas.
- Acknowledge uncertainty rather than inventing an answer.
- State intelligence level/cues when increasing or decreasing it.
- Keep responses concise and concrete.

## Resume prompt for the next chat

```text
Work Type: development

Continue Pivot provenance recovery.

Read first:
- specs/pivot-design-tool-baseline/RECOVERY_HANDOVER.md
- .planning/pivot-design-tool-baseline/STATE.md

Then read only the recovery artifacts referenced by the handover as needed.

Implementation and customer copy are frozen. Do not modify the external Business Register workbook. Do not touch unrelated temporary landing/Canva files.

Next tasks:
1. Create ACTION_REGISTER_ENTRIES.md using the exact workbook Actions columns.
2. Create RISK_DEPENDENCY_ISSUE_ENTRIES.md without inventing an authoritative Risks schema.
3. Update STATE.md and stop for review.

Use High intelligence for register and provenance work, and provide explicit intelligence-change cues.
```
