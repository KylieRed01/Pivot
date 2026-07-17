# Project Document Reconciliation Plan

**Status:** PROPOSAL ONLY — NO SOURCE DOCUMENT CHANGES AUTHORISED
**Purpose:** Identify every document requiring correction, its authoritative source, approval gate, owner, dependencies and coordinated update batch.

## Non-negotiable reconciliation rules

1. Do not update governing documents piecemeal.
2. Preserve original handovers/transcripts as immutable decision evidence.
3. Do not overwrite approved customer copy with policy language.
4. Distinguish the complete target product, current demonstrator slice and future production-readiness work.
5. Mark historical PRDs/specs/issues explicitly rather than silently changing their historical meaning.
6. Apply approved changes in coordinated batches and then re-run cross-document consistency checks.
7. Do not resume implementation until Batches 0–3 below are complete and verified.

## Proposed update sequence

| Batch | Purpose | Gate |
|---|---|---|
| 0 | Confirm missing external outcomes and authority rule | Kylie confirms later-decision authority; supplier/Phoenix outcomes recorded or remain explicitly pending |
| 1 | Reconcile governing business, operating, brand and Phoenix pilot documents | Director approves coordinated amendments/version changes |
| 2 | Establish canonical product/decision/copy sources | Ten decision domains and changed customer copy approved |
| 3 | Replace conflicting specification/planning authority | Canonical spec approved; historical artifacts clearly marked |
| 4 | Re-map implementation/tests and remediate | Approved spec and mismatch ledger available |
| 5 | Reconcile completion/review records and external registers | Automated checks and provenance-aware review pass |

# Batch 0 — Authority and external facts

## 1. Decision authority rule

| Field | Detail |
|---|---|
| Current problem | Governing documents and later Director handovers conflict, but no coordinated amendment was completed. |
| Recommended change | Confirm that later recorded Director decisions are current pending versioned governing-document updates; preserve every conflict and amendment reason. |
| Authority | Pivot Constitution §§2–3; chronological handover supersession statements |
| Approval required | **Yes — Kylie** |
| Owner | Kylie Stewart |
| Dependency | None; blocks all other reconciliation |

## 2. Supplier and Phoenix outcomes since the July 2026 pause

| Field | Detail |
|---|---|
| Current problem | Latest handover says supplier evaluation and Phoenix committee decisions were expected “next week”; repository does not record the outcomes. |
| Recommended change | Record current supplier status; Phoenix palette decision; final logo/wordmark/sponsor assets; administrator nomination; workflow-test user; shorts cost decision. Keep unknown items pending rather than inferring outcomes. |
| Authority | `grill-me-handover-cloud-provider-selection.md` §§ Exact resume point; Supplier and Phoenix external inputs |
| Approval required | Factual confirmation from Kylie/Phoenix, not policy reapproval |
| Owner | Kylie Stewart / Phoenix authorised representatives |
| Dependency | Blocks production-sensitive wording/assets, not the provenance audit itself |

# Batch 1 — Governing and approved business documents

## Document matrix

| Document | Current mismatch | Recommended change | Authority/source | Approval | Owner | Dependencies |
|---|---|---|---|---|---|---|
| `docs/Business Plan_V1.00.pdf` | Says no marketing or sales activity outside Phoenix until pilot validation; later decisions allow a public demonstrator and club-interest contact while still prohibiting general availability/sales. Phase terminology also differs from later Phoenix Pilot Phase 1/2/3 language. | Issue a new version clarifying permitted public demonstration/interest activity versus prohibited sales/onboarding; reconcile Business Plan growth phases with Phoenix Pilot phases; retain Phoenix-only production validation gate. | Business Plan; `grill-me-handover.md` public-page decisions; production-output phase model | **Director approval required** | Kylie Stewart | Batch 0 authority rule |
| `docs/Operating Model_V1.00.pdf` | Uses broad “predefined options”, older customer journey, live ordering/store assumptions and no later role/proof/release detail. | Update product customisation to flexible template-constrained editing; distinguish public trial, club onboarding, approval/proof/release, controlled store setup and later ordering phases; update club-user/administrator/Pivot responsibilities and club-polo terminology. | Editor/product, production-output and club-store handovers | **Director approval required** | Kylie Stewart | Business Plan phase reconciliation |
| `docs/brand/Brand Kit_V1.00.pdf` | Approved website CTA says **Game On.** while later approved Design Studio CTA is **Game On. Start Designing**. Existing penguin is approved broadly in v1.00, but later direction excludes it from Phoenix garments and says it needs refinement. | Do not alter v1.00 silently. Prepare a versioned Brand Kit amendment that either adds the extended Design Studio CTA as an approved contextual CTA and records the Phoenix garment wordmark-only rule, or keeps those rules in an approved digital/apparel standard. Replace/refine penguin only through a separate approved asset revision. | Brand Kit; `grill-me-handover.md` naming; editor/cloud penguin decisions | **Brand/Director approval required** | Kylie Stewart | Confirm desired permanent CTA/asset governance |
| `docs/brand/Visual Design Guide_V1.00.pdf` | Describes controlled predefined design options and approved/live club-store/product presentation without current demonstrator/3D boundaries. | Version update: flexible template-constrained editor; authoritative 2D/indicative 3D; placeholder presentation rules; controlled light/dark store themes; current store availability; approved wordmark use on Phoenix garments. | Visual Guide; later editor/production/cloud decisions | **Director approval required** | Kylie Stewart | Brand Kit treatment confirmed |
| `docs/Pivot Constitution.md` | Phase 1 still says U10 jerseys and coach polos; ordering/supplier API wording is outdated; role/proof/final release model is incomplete; Australian residency wording does not record the controlled manufacturing-package exception; later proportional recovery decisions are absent. | Issue a versioned constitutional amendment covering club-polo terminology/product scope, exact club/Pivot approval separation, final proof and release authority, supplier confidentiality/minimal export exception, current public-demonstrator boundary and latest proportional Phase 1 recovery direction. Correct existing grammar during controlled version update, not ad hoc. | Production/editor/security/cloud handovers | **Director approval required** | Kylie Stewart | Business/Operating Model alignment; legal/privacy review where required |
| `docs/Phoenix Phase 1 PRD.md` | Older multiple-admin/primary-approver model, coach terminology, jersey/polo scope, 3D hard requirement, live dates, store assumptions, supplier/template claims and production authentication. | Replace with a versioned Phoenix PRD reflecting one administrator + two users, independent workflow tester, current product scope, wordmark-only placeholder, authoritative 2D/optional reliable 3D, unresolved supplier/assets, exact submission/approval/proof/release flow, no live production infrastructure and updated dates/status. Preserve v1.00 as historical. | All later handovers, especially production-output and cloud selection | **Phoenix/Director validation required** | Kylie plus authorised Phoenix approver | Batch 0 external facts |
| External `Pilot_Phoenix.pdf` | Historical dates/milestones and 3–6 week language conflict with later planning; likely August-year typo noted. | Produce an updated version only after supplier, Phoenix and authoritative competition dates are confirmed. Label all unconfirmed dates and remove claims not supported by current supplier/operating decisions. | Production-output § Pilot timeline | **Director/Phoenix approval required** | Kylie Stewart / Phoenix | Supplier and Phoenix outcomes |

## Batch 1 validation

- Every amended document receives new version/date/owner/reason.
- Cross-document phase terminology is identical.
- Product names, role counts, approval authority and availability statements are identical.
- No approved v1.00 file is overwritten without retained history.
- Legal/privacy review actions are recorded rather than resolved by assumption.

# Batch 2 — Canonical product, decisions and customer copy

| Document | Current mismatch | Recommended change | Approval | Owner | Dependencies |
|---|---|---|---|---|---|
| `DECISION_REGISTER_ENTRIES.md` | New recovery output; not yet verified or entered externally. | Review 48 entries; correct only genuine classification/factual issues; enter approved rows into external workbook without replacing historical entries. | Kylie approval | Kylie Stewart | Batch 0 authority rule |
| `ASSUMPTIONS_REGISTER_ENTRIES.md` | New recovery output; assumptions were previously scattered or implicit. | Review 34 entries; update statuses with current supplier/Phoenix outcomes; enter approved rows into external workbook; preserve invalidated 5 MB storage assumption as learning. | Kylie factual validation | Kylie Stewart | Batch 0 external outcomes |
| `CANONICAL_DECISION_REGISTER_DRAFT.md` | Ten-domain compact draft; not authoritative. | Approve/change each domain. After approval, rename/status as canonical and reference exact Decision Register IDs rather than rewriting decisions differently. | Kylie approval | Kylie Stewart | Decision/assumption review |
| `APPROVED_COPY_RECONCILIATION.md` | Proposal contains necessary factual corrections but no replacement wording is approved. | Review only changed passages; unchanged Brand Kit-reviewed copy carries forward automatically. Record approval date/owner for each changed answer and CTA placement. | **Explicit copy approval required** | Kylie Stewart | Brand/availability/product decisions confirmed |
| New canonical approved-copy artifact | Approved copy currently lives inside a handover and can be flattened again. | After approval, create a dedicated versioned customer-copy source containing exact approved text by category, decision IDs, approval date and superseded-copy history. Tests reference this artifact/approved requirements. | Kylie approval | Kylie Stewart | Copy reconciliation approved |

## Batch 2 validation

- No “must”, “should”, “do not promise” or implementation instruction appears as customer-facing answer unless deliberately approved as customer language.
- Exact unchanged approved copy is byte-for-byte preserved.
- Each changed passage cites the later decision that required it.
- Customer copy, policy requirements and implementation guidance are stored separately.

# Batch 3 — Specification and historical planning authority

| Document | Current mismatch | Recommended change | Approval | Owner | Dependencies |
|---|---|---|---|---|---|
| `specs/pivot-design-tool-baseline/spec.md` | Mixes complete target product, demonstrator acceptance, policy, approved copy and implementation guidance; lost help taxonomy and changed copy without approval. | Rebuild from verified decision IDs. Separate sections: target product; current demonstrator slice; production-readiness gates; unresolved/external inputs; approved-copy references; testable acceptance criteria. Do not embed unapproved copy. Add provenance/status header. | Kylie approval after audit | Product owner / implementer | Batches 1–2 |
| `specs/pivot-design-tool-baseline/prd.md` | Declares an older MVP authoritative, including automatic extraction, durable guest draft, coordinated range and coach terminology. | Preserve historical content; add a prominent **SUPERSEDED/REFERENCE ONLY** header pointing to the canonical register/spec and listing its historical scope/date. Do not silently rewrite historical decisions. | No product reapproval; status confirmation only | Documentation owner | Canonical source approved |
| `specs/pivot-design-tool-baseline/issues.md` | Declares `prd.md` source of truth and earlier `spec.md` non-authoritative. | Mark **SUPERSEDED EXECUTION DRAFT**; point to current plan/tasks only after regeneration. Preserve issue history. | Status confirmation | Documentation owner | Canonical source approved |
| `specs/pivot-design-tool-baseline/brief.md` | Original concept includes ideas later refined/superseded; can be mistaken for requirements. | Add **ORIGINAL BRIEF — NON-NORMATIVE** header and canonical pointer. Preserve content unchanged. | Status confirmation | Documentation owner | Canonical source approved |
| `grill-me-reconstruction.md` and recovered transcript | Historical recovered decisions include later-superseded extraction, product and 3D assumptions. | Add no decision rewrites. Add an index-level pointer explaining chronological supersession; preserve evidence unchanged. | None beyond authority model | Documentation owner | Canonical source approved |
| All `grill-me-handover*.md` | Correct evidence chain but users/agents must manually follow pointers. | Preserve content. Create/maintain one provenance index with chronological order and supersession rules; avoid modifying historical decision text. | None beyond authority model | Documentation owner | Canonical source approved |
| `scope-lock.md` | Locks the prior demonstrator acceptance based on unverified spec. | Regenerate after canonical demonstrator slice is approved; distinguish target exclusions from slice deferrals. | Product owner approval | Documentation owner | New spec approved |

## Batch 3 validation

- Exactly one current source-of-truth declaration exists.
- Every historical document has an explicit status and pointer.
- Every current requirement maps to Decision Register IDs and acceptance criteria.
- Complete target-product requirements are not silently converted to demonstrator exclusions.

# Batch 4 — Planning, implementation and tests

| Document/artifact | Current mismatch | Recommended change | Approval/gate | Owner | Dependencies |
|---|---|---|---|---|---|
| `plan.md` | Architecture and exclusions derive from unverified spec; some exclusions may be slice deferrals rather than product decisions. | Regenerate traceability from verified spec. Preserve demonstrator architecture only where still valid. Explicitly map each excluded target capability as deferred, unresolved or out of scope for this slice. | Technical review | Implementer | New spec/scope lock |
| `tasks.md` | All 34 checkpoints checked despite reopened provenance and implementation mismatches. | Preserve historical completion evidence but add a new remediation/revalidation section; do not represent feature acceptance as complete until all canonical criteria pass. | Planning review | Implementer | New plan |
| `task-ledger.md` | Claims completed feature/checkpoints before provenance-aware review. | Record historical completion separately from current blocked acceptance; add new remediation tasks/findings and evidence. | Planning review | Implementer | New tasks |
| `public/app.js`, state/domain/server modules | Contains unapproved copy, stale asset choices, upload mismatch and state/workflow invariant gaps. | Do not patch piecemeal. First update tests to verified requirements, then remediate one finding at a time using TDD. | Code review | Implementer | Approved copy/spec/tests |
| Browser/unit tests | Some tests protect unapproved prose and incomplete invariants. | Replace unapproved exact-copy assertions with approved copy-contract checks after copy approval; add wordmark, workflow number, reducer control-level, submit/approve lifecycle, upload budget and navigation tests. | TDD gates | Implementer | Approved requirements |
| `data/state.json` | Contains PHOENIX artwork and legacy roles that may imply final assets/workflow. | Retain stable internal IDs only where explicitly permitted; replace/label artwork and visible fixture data as demonstrator placeholders; test no final Phoenix asset claim. | Fixture review | Implementer | Phoenix asset status confirmed |

## Batch 4 validation

- Red observed for every remediated mismatch.
- All public copy comes from approved copy requirements.
- Reducer/domain invariants do not depend solely on disabled UI controls.
- Demonstrator fixtures cannot be mistaken for final Phoenix assets, users or approvals.
- All automated and manual evidence maps to canonical acceptance criteria.

# Batch 5 — Completion, review and operational records

| Document/output | Current mismatch | Recommended change | Gate | Owner |
|---|---|---|---|---|
| `IMPLEMENTATION_SUMMARY.md` | Records completion before provenance verification. | Rewrite after remediation with canonical decision/requirement IDs, actual test counts, remaining manual checks and explicit slice boundary. | Full checks pass | Implementer |
| `CODE_REVIEW.md` | Original/fresh findings use a now-unverified spec and later provenance findings are appended. | Preserve review history; produce a new provenance-aware final review section/report against the canonical spec and complete diff. | Structured review | Reviewer |
| `.planning/.../STATE.md` | Must remain the current operational checkpoint. | Continue recording frozen/blocked status, approved artifacts, open decisions and exact resume instructions. | Continuous | Implementer |
| `quickstart.md` | Manual journey includes wording and capabilities that may change. | Reconcile after code; include approved help taxonomy, storage boundary, reset, workflow simulation and manual device/usability checks. | Post-remediation | Implementer |
| Root `README.md` | May imply current scope/completion based on old slice. | Update canonical source links, demonstrator boundary, run/test commands and unresolved production dependencies. | Post-remediation | Implementer |
| External Decision/Assumptions Register | Requested outputs not yet entered. | Enter only approved rows using existing workbook schema; do not overwrite historical records. | Kylie explicit instruction to modify workbook | Kylie Stewart |
| Actions/Risks/Issues register outputs | Still outstanding from end-of-grill request. | Prepare entry-ready Actions plus Risks/Dependencies/Issues artifacts with owners, due triggers, fallbacks and blockers; do not invent a Risks workbook schema if none exists. | User review | Kylie Stewart |

# Recommended project-document changes requiring user decisions

Only these decisions require Kylie rather than mechanical reconciliation:

1. Confirm later recorded Director decisions govern pending formal document updates.
2. Confirm how public demonstration/interest activity coexists with Business Plan “no marketing or sales outside Phoenix”.
3. Approve changed customer-copy passages and contextual CTA placement.
4. Confirm permanent Brand Kit treatment of **Game On. Start Designing**.
5. Confirm whether the penguin restriction is Phase 1 garment-only or should change broader apparel guidance in the next Brand Kit.
6. Provide current supplier/Phoenix/shorts outcomes that occurred after the historical pause.
7. Approve versioned governing-document amendments after drafting.
8. Explicitly authorise any later write to the external Business Register workbook.

Everything else is a traceable documentation or implementation correction and should not require re-deciding settled intent.

# Completion definition

Document reconciliation is complete only when:

- authority rule is approved;
- external facts are current or explicitly pending;
- governing documents agree;
- one canonical decision/specification source exists;
- approved copy is isolated and versioned;
- historical artifacts are clearly marked;
- plan/tasks/tests are regenerated from verified requirements;
- implementation mismatches are remediated with TDD;
- all checks and manual gates pass; and
- a fresh provenance-aware structured review approves the complete diff.
