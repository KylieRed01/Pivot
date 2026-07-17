# Pivot Design Studio Baseline Implementation State

- Feature: Website and Pivot Design Studio demonstrator update
- Feature directory: `specs/pivot-design-tool-baseline/`
- Active branch: `phoenix-phase-1` (explicitly declared by `plan.md`)
- Work type: development
- Workflow: non-Linear
- Intelligence: Medium for review remediation handoff
- Current window: recovery handover prepared
- Current tasks: resume in a new chat with Actions and Risks/Dependencies/Issues register outputs; implementation remains frozen
- Status: BLOCKED — implementation frozen pending provenance checkpoint approval
- Completed implementation windows: Window 1 (T001–T003), Window 2 (T004–T006), Window 3 (T007–T009), Window 4 (T010–T012), Window 5 (T013–T015)
- Review report: `specs/pivot-design-tool-baseline/CODE_REVIEW.md`
- Provenance audit: `specs/pivot-design-tool-baseline/DECISION_PROVENANCE_AUDIT.md`
- Copy proposal (not approved): `specs/pivot-design-tool-baseline/APPROVED_COPY_RECONCILIATION.md`
- Baseline mismatch ledger: `specs/pivot-design-tool-baseline/BASELINE_MISMATCH_LEDGER.md`
- Canonical register draft: `specs/pivot-design-tool-baseline/CANONICAL_DECISION_REGISTER_DRAFT.md`
- Decision Register entries: `specs/pivot-design-tool-baseline/DECISION_REGISTER_ENTRIES.md`
- Assumptions Register entries: `specs/pivot-design-tool-baseline/ASSUMPTIONS_REGISTER_ENTRIES.md`
- Project document reconciliation plan: `specs/pivot-design-tool-baseline/PROJECT_DOCUMENT_RECONCILIATION_PLAN.md`
- New-chat handover: `specs/pivot-design-tool-baseline/RECOVERY_HANDOVER.md`
- Automated evidence: `npm run check` passes; 33 Node tests pass; 180 Playwright tests pass across five projects; npm audit is clean; complete branch plus working-tree diff check passes
- Scope exclusions: production infrastructure, supplier-dependent functionality, accurate 3D, manufacturing integration, final Phoenix artwork

## Window checkpoints

- Window 1: implementation complete; review findings remain
- Window 2: implementation complete; review findings remain
- Window 3: implementation complete; review findings remain
- Window 4: implementation complete; review findings remain
- Window 5: implementation complete; final verification is blocked by review findings and `git diff --check`

## Review status

The original structured review found nine FAIL findings and two WARN findings. F01–F11 are resolved. The provenance audit confirmed that the approved **FAQs**, **Pivot Design Studio Help**, and **Club Help Centre** taxonomy was flattened, Brand Kit-reviewed copy was mixed with internal policy wording, the workflow garment still uses the superseded Pivot penguin asset, and the Text/Images menu naming drifted. F12–F14 and warning F15 remain open. Merge remains blocked pending user-approved copy reconciliation, focused remediation and re-review. The authoritative record is `specs/pivot-design-tool-baseline/CODE_REVIEW.md`.

Do not mark review findings resolved until implementation, focused regression tests, automated verification, and re-review are complete.

## Resume instructions

1. Read this file and `specs/pivot-design-tool-baseline/CODE_REVIEW.md` first.
2. Read `spec.md`, `plan.md`, `tasks.md`, `IMPLEMENTATION_SUMMARY.md`, `scope-lock.md`, and `task-ledger.md`.
3. Work through findings F01–F11 without broadening scope.
4. Keep the review report and state current as findings are resolved.
5. Re-run all automated checks and the structured code review before merge.
