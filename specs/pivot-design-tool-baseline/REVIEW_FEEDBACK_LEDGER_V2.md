# Version 2 Review Feedback Ledger

**Status:** ACTIVE — July feedback closed; current Studio corrections under review
**Review baseline:** `V2-REVIEW-2026-08-08-I`
**Baseline frozen:** 2026-08-08
**Authority:** Review observations do not amend `spec.md`, approved copy or recorded decisions.
**Canonical record:** This is the single operational record for current Studio review feedback, market-audit status, decisions, evidence, outstanding work and the next-session handover. Update this file at the end of each work session; do not create a parallel status or handover document.

**Purpose:** This is the active register for user review observations, decisions, requested outcomes and manual-acceptance status. It does not replace the implementation plan or task ledger.

**Screenshot evidence folder:** `C:/Users/kylie/Downloads/For Codex/`. Resolve screenshot filenames referenced by this ledger from that folder unless a record explicitly states otherwise.

## Control rules

1. The eleven current-baseline files listed below remain unchanged while Kylie reviews them.
2. Feedback is recorded as an observation first, not silently converted into a requirement or approved decision.
3. Each item receives a stable capability-prefixed identifier, such as `WEB-##`, `STORE-##`, `STUDIO-##` or `DASH-##`.
4. Ambiguous feedback returns to Kylie as one focused question.
5. A material product or cost choice requires prior discussion and Kylie's explicit approval under `NEW-54`.
6. Approved changes are implemented as small test-driven slices with evidence recorded against the same identifier.
7. No review item changes the live temporary teaser, selects infrastructure, creates ordering, or claims production readiness.
8. Superseded items remain in the ledger with their status and replacement reference; they are not deleted.
9. Pivot does not invent interface language or interaction patterns by default. First apply the Constitution, approved Director decisions and governing documents in their recorded precedence; then apply approved Pivot implementation guidance before consulting external platform and design-tool conventions. Any conflict must be surfaced rather than silently resolved, and any departure must identify the user benefit and receive explicit approval.

## Frozen baseline manifest

### Current baseline `V2-REVIEW-2026-08-08-I`

This baseline reconciles the committed website/club-store capability path moves and the current Studio correction candidate. The six isolated review files remain unchanged by the uncommitted Studio corrections; `public/app.js` and `public/style.css` identify the exact candidate Kylie is reviewing.

| File | SHA-256 |
|---|---|
| `public/website/version-2-review.html` | `b5fb56b3df6f660dc12c12481bac5c500114a66974d861d0482d6721f7e066fe` |
| `public/website/version-2-review.css` | `32f281d26ba0c41b017de7e893240dca6624b50c3f78827d66157199f946700c` |
| `public/website/version-2-review.js` | `31da638c2830f37a1a758639155a542ecaf995826990c9db35df429ec4006175` |
| `public/club-store/version-2-club-store-review.html` | `1521b9fde431aa6ab69ae8da213710b9ed90f09599426d0dd6feccfc553dc83a` |
| `public/club-store/version-2-club-store-review.css` | `caff150865fd840920f6bf6a4f246a54598b3405665106ca3074d141ff7a7b06` |
| `public/club-store/version-2-club-store-review.js` | `77e2e7146e077b433a875adda387a6bda6fde4780fea453f0bed4fb9a5d55b15` |
| `public/app.js` | `8e6180e1c953a4d7755e75db023eca2fca6196a588540fc76625854970d9c6cb` |
| `public/style.css` | `44c570d993db1c78c4d7e58ea371ea229e4f4681334df207e62331e8a6f613f8` |
| `public/studio/safe-area.js` | `ed9d54778615545cf3294fb92b95f027a464ced886657092a6a9027753f1bc43` |
| `public/website/home-entry.js` | `7e99d1ed69c2628064d07c098b65d9bcb3549f04255d0472ade0c12202a4e5b0` |
| `public/index.html` | `2b6507804b777e864eee207993c74b9fc10c58602c4ddceee945eb14216ca674` |

### Superseded baseline `V2-REVIEW-2026-08-08-H`

Baseline H used the same review-page files as current baseline I. Its `public/app.js` and `public/style.css` hashes were respectively `ad2a3788012697024068194da3b43d8861da1b3438614751a817f526363f92c4` and `4c9b811fa6e90d41b3cf7a3f24f49e2da155328bf2dabbdc8ad0cf7e32f4d21a`. It was superseded by `STUDIO-24` to `STUDIO-27`; baseline I also adds the safe-area and cache-entry files to the frozen manifest so these accepted behaviours cannot change outside reconciliation.

### Superseded baseline `V2-REVIEW-2026-08-08-G`

Baseline G is identical to current baseline H except its `public/app.js` hash was `60925808950e3307d7f17ee075e197c6b8650995f282dbfaed95ee5c4a1f2be5`. It was superseded only by approved `STUDIO-03` terminology.

### Superseded baseline `V2-REVIEW-2026-07-25-E`

Baseline E used the pre-capability-path locations shown below. It was superseded after the review pages moved to their website and club-store capability directories and the later Studio review candidate was prepared.

| File | SHA-256 |
|---|---|
| `public/version-2-review.html` | `4b749b8d04a6c4e5c73e3bf4727f36d197f0cb69389b28b3a7d6a20618c25737` |
| `public/version-2-review.css` | `6f67734c31022fb8e9203a0ef794fe00ae97bb4b508aeed1189c61e9b12d6eca` |
| `public/version-2-review.js` | `31da638c2830f37a1a758639155a542ecaf995826990c9db35df429ec4006175` |
| `public/version-2-club-store-review.html` | `0d8aaec1c70a8886f9f62424519889c3e3b53580b6e3d16916b874e2c0cee6f4` |
| `public/version-2-club-store-review.css` | `2036349e8eec6b321be9222e28bc0ae8f5bf53bc0c3b4580673ced3ba550682f` |
| `public/version-2-club-store-review.js` | `77e2e7146e077b433a875adda387a6bda6fde4780fea453f0bed4fb9a5d55b15` |
| `public/app.js` | `0f3ed52c0e5ac52d7811ed6fc1ee2ddcdc78011c1fda892c8c6459f0837cf361` |
| `public/style.css` | `0c92066997a6ee254305e01979ad66f3c5175ff1d0e88e43be6aaa23a03771ce` |

### Superseded baseline `V2-REVIEW-2026-07-25-D`

Baseline D is identical to current baseline E except its club-store HTML/CSS/JavaScript hashes were respectively `162d5c5b3ed8dcfa8f65fb720d1705e5f312de8c50495959806e95fcf953b144`, `d5633f748a15dd3a426a4703931702b671c45d7944ae1f6cb5dcf46bc747db5d` and `6b1ae7b1cd6ffd7b092e53c848b23a2e72406170afdc69c9659a9ff0585e1bce`. It was superseded only by approved `STORE-03`, `STORE-04` and Decision `NEW-56`.

### Superseded baseline `V2-REVIEW-2026-07-25-C`

Baseline C is identical to baseline D except `public/version-2-club-store-review.html`, whose C hash was `a1f76cfef75562058a89b11d06c5d7a50ec6156d5b6fbb4ad099b52ac06955bf`. It was superseded only by approved `STORE-02` / Decision `NEW-55`.

### Superseded baseline `V2-REVIEW-2026-07-25-B`

Baseline B is identical to baseline C except `public/version-2-club-store-review.css`, whose B hash was `b02934ef3dbc276906fea1319fae9b483643410d18769473123179aea13be8bc`. It was superseded only by approved `STORE-01`.

### Superseded baseline `V2-REVIEW-2026-07-18-A`

Baseline A is preserved as the original six-file manifest. It was superseded only by approved `WEB-01` and blocker correction `WEB-02`.

| File | SHA-256 |
|---|---|
| `public/version-2-review.html` | `d644320ce676ba98a0dd49b7c7711107e284a2fdffe6a21c5942de647d5d2593` |
| `public/version-2-review.css` | `db5ddc69c7c6a46f782fcea7cd8df42ab2a19732fb2b98304bd6cdbe09073905` |
| `public/version-2-review.js` | `31da638c2830f37a1a758639155a542ecaf995826990c9db35df429ec4006175` |
| `public/version-2-club-store-review.html` | `a1f76cfef75562058a89b11d06c5d7a50ec6156d5b6fbb4ad099b52ac06955bf` |
| `public/version-2-club-store-review.css` | `b02934ef3dbc276906fea1319fae9b483643410d18769473123179aea13be8bc` |
| `public/version-2-club-store-review.js` | `6b1ae7b1cd6ffd7b092e53c848b23a2e72406170afdc69c9659a9ff0585e1bce` |

If a current-baseline hash changes before the review closes, stop and reconcile the baseline before applying further feedback.

## Status vocabulary

- **Observed:** recorded but not interpreted as a requested change.
- **Clarification needed:** one focused answer is required.
- **Proposed:** recommendation prepared; not approved.
- **Approved:** Kylie explicitly approved the outcome.
- **Implementing:** approved test-driven slice is in progress.
- **Automated checks passed:** implementation checks pass, but Kylie has not yet accepted the behaviour manually.
- **Verified:** implementation checks pass and required manual acceptance is recorded.
- **Reopened:** an implemented or previously checked item failed manual review and must not be represented as fixed.
- **Deferred:** intentionally postponed with a stated checkpoint.
- **Superseded:** replaced by another identified item.
- **Rejected:** explicitly declined; must not be reintroduced.

## Feedback items

| ID | Page/device | Area | Observation | Wanted outcome | Priority | Status | Decision/test evidence |
|---|---|---|---|---|---|---|---|
| `WEB-01` | Main review / desktop screenshot context | Home-page logo | The current local home-page logo treatment is not good. The live temporary landing page is the positive reference for how it should look. | Use the temporary landing page's approved large, left-aligned hero-logo treatment without changing the live teaser. | Important | Verified | Kylie approved the treatment and confirmed on 2026-07-25 that the revised page is much better. The approved asset and established temporary-page dimensions are in the local hero; focused and full Node tests pass. |
| `WEB-02` | Design Studio / 1914×919 screenshot | Workspace layout regression | The Design Studio is pushed roughly halfway off-screen and cannot be tested. | Restore the fully visible Studio workspace without losing the truthful persistence warning. | Blocker | Verified | Screenshot `C:/Users/kylie/Downloads/For Codex/Screenshot 2026-07-25 224734.png` identified the flex-layout cause. The warning now sits inside vertical `.editor`; a structural regression test and all 43 Node tests pass. Kylie confirmed the corrected Studio layout and restored entry button on 2026-07-25. |
| `STORE-01` | Club store / 1210×580 screenshot | Decision workspace theme and contrast | The decision-workspace section does not change between light and dark themes and is hard to read. | Make the internal section theme-responsive using the existing surface/text variables and improve text contrast without changing product content. | Important | Verified | Kylie authorised the text-readability correction only on 2026-07-25. The panel uses existing theme surface/text variables with an approved orange divider; no product wording changed. The regression test and all 44 Node tests passed. Kylie directed this item to be closed on 2026-08-08 because visual confirmation was its only remaining gate; no separate visual-confirmation record was made. |
| `STORE-02` | Club store / 1746×682 screenshot | Product truthfulness and terminology | **Approved products only** is inaccurate because no products are approved. **Playing uniform** and **Alternate uniform face** do not align with the Design Studio's jersey, Dark and Light language. | Align to the higher-authority current Design Studio terminology without overriding governance; keep **Product placeholder** and withdraw the diagonal watermark suggestion. | Important | Verified | Kylie explicitly clarified the authority boundary on 2026-07-25; recorded as `NEW-55` and retained in `spec.md` v2.0.4. The concept uses **Club range preview**, **Jersey preview**, **Dark basketball jersey**, **Light basketball jersey** and **Product placeholder**. No **FOR TESTING ONLY** mark was added. All 44 Node tests passed. Kylie directed this item to be closed on 2026-08-08 because visual confirmation was its only remaining gate; no separate visual-confirmation record was made. |
| `STORE-03` | Club store / desktop review | Theme colour depth | Light and dark store themes need visual variation derived from approved club colours using opacity; this is independent of jersey Dark/Light faces. | Pivot controls fixed accessible opacity levels in the store template. Local review may select placeholder club colours, but clubs receive no opacity control and no slider is exposed. | Important | Verified | Kylie approved the controlled-default model and explicitly rejected club/user opacity controls as adding no value. Recorded as `NEW-56` and retained in `spec.md` v2.0.4. The concept has two local-review colour inputs and fixed light/dark surface mixes; no opacity control exists. All 44 Node tests passed. Kylie directed this item to be closed on 2026-08-08 because visual confirmation was its only remaining gate; no separate visual-confirmation record was made. |
| `STORE-04` | Club store / desktop review | Realistic default identity | A generic club-logo placeholder is less useful than testing the store with approved Pivot branding already used by the concept. | Use the exact approved Pivot logo and Pivot colours as the concept's realistic default identity without creating a production claim. | Important | Verified | Kylie explicitly requested the Pivot identity on 2026-07-25. Recorded under `NEW-56`. The placeholder was replaced by `/brand/Pivot_Logo_Transparent.svg`; alternate local-review colours remain testing controls only. All 44 Node tests passed. Kylie directed this item to be closed on 2026-08-08 because visual confirmation was its only remaining gate; no separate visual-confirmation record was made. |
| `STORE-05` | Club onboarding / target workflow | Minimal club identity profile | A future club administrator needs to provide a club logo and club colours, but full onboarding and a complete mini brand-kit capability is disproportionate during the initial push. | Define a shared minimal Club Identity Profile now; defer authenticated upload, persistence, review workflow, versioning, sponsor rules and brand-kit export until after the initial push and applicable infrastructure/security gates. | Scope | Verified | Kylie approved the scope split on 2026-07-25. Recorded as `NEW-57`, `spec.md` v2.0.4 `CLUB-01`, `data-model.md`, `scope-lock.md` and `plan.md`. No functional onboarding code, route, storage or upload capability was added. |

## Current Studio correction list

This list preserves the numbering and wording supplied by Kylie on 2026-08-08. New items must be appended without renumbering or silently rewriting earlier entries.

### Original items

| # | ID | Item | Current status |
|---:|---|---|---|
| 1 | `STUDIO-01` | Canvas selection | Manually accepted as Decision 1. |
| 2 | `STUDIO-02` | Colour and pattern area selection | Manually accepted as Decision 2. |
| 3 | `STUDIO-03` | Placement terminology | Verified — Kylie approved standard design-tool terminology: **Position** with **Left**, **Centre** and **Right** moves the text object; **Text alignment** with **Align left**, **Align centre** and **Align right** aligns text within its text box. Focused and full Node tests pass (174/174). |
| 4 | `STUDIO-04` | Library ownership | Pending. |
| 5 | `STUDIO-05` | Reverse artwork treatment | Pending. |
| 6 | `STUDIO-06` | Work sequence for selection, Text-panel redesign, placement and containment | Pending/requires reassessment. |

### Items added afterward

| # | ID | Item | Current status |
|---:|---|---|---|
| 7 | `STUDIO-07` | Keyboard shortcuts | Pending discussion. |
| 8 | `STUDIO-08` | Gradient positional labels | Pending discussion. |
| 9 | `STUDIO-09` | Club approved products | Implemented. |
| 10 | `STUDIO-10` | Pattern fidelity | Pending. |
| 11 | `STUDIO-11` | Contextual colour-panel placement | Pending. |
| 12 | `STUDIO-12` | Disable Left/Right side views | Pending. |
| 13 | `STUDIO-13` | Disable 3D preview with trial messaging | Pending. |
| 14 | `STUDIO-14` | Remove visible “Locked” labels | Implemented. |
| 15 | `STUDIO-15` | Repair panel close buttons | Implemented. |
| 16 | `STUDIO-16` | Correct lock colours/backgrounds | Implemented. |
| 17 | `STUDIO-17` | White rail items with orange hover/focus | Implemented. |
| 18 | `STUDIO-18` | Feedback and club-product icons | Implemented. |
| 19 | `STUDIO-19` | Rail spacing and multiline labels | Partly improved; labels unresolved. |
| 20 | `STUDIO-20` | Horizontal cyan rule | Improved and manually acknowledged as better. |
| 21 | `STUDIO-21` | Clicking empty canvas space dismisses pop-ups | Pending discussion. |
| 22 | `STUDIO-22` | Add **My designs** to the left-hand menu. This is where designs saved by a club user or Club Administrator after working with a template will be stored. A saved design is not an approved club product. | Approved; implementation pending. |
| 23 | `STUDIO-23` | Rename **Club approved products** to **Club Gear**. | Approved; implementation pending. |
| 24 | `STUDIO-24` | **Design back separately** has lost the different background colour that visually distinguished it from the surrounding view controls. | Verified — the default now uses a brand-derived light Cerulean Blue surface, with distinct hover and Midnight Blue active states. All three states have regression assertions. Screenshot: `C:/Users/kylie/Downloads/For Codex/Screenshot 2026-08-08 071907.png`. |
| 25 | `STUDIO-25` | Text still extends outside the editable design boundary. | Verified — move, resize, rotation, typography and content changes now use actual rendered text/boundary rectangles and cannot worsen or create overflow. Geometry unit tests and source integration assertions pass. Screenshot: `C:/Users/kylie/Downloads/For Codex/Screenshot 2026-08-08 072101.png`. |
| 26 | `STUDIO-26` | The Text panel has again lost the ability to change the selected text colour. | Reopened — the historical full-width **Text colour** box was reinstated without design review and is explicitly rejected. Source-regex tests protected the wrong UI rather than accepted behaviour. Replace it only after agreeing a conventional design-tool pattern; recommended benchmark is a compact labelled colour property with swatch and editable HEX value that opens the palette. Do not restore the old box again. |
| 27 | `STUDIO-27` | The **Left** and **Right** Position/alignment controls do not move or align the selected text as expected. | Reopened after failed manual review — recorded as unfixed. Return to diagnosis after the newly raised feedback has been captured and answered; do not wait for `STUDIO-28` implementation. The geometry unit test did not prove the rendered interaction. Require manual acceptance before marking fixed. |
| 28 | `STUDIO-28` | Every slider needs an adjacent editable text field with increment and decrement controls; this has not been applied consistently. | Captured; implementation deferred while current regressions are repaired — screenshots `C:/Users/kylie/Downloads/For Codex/Screenshot 2026-08-08 072413.png` and `C:/Users/kylie/Downloads/For Codex/Screenshot 2026-08-08 072529.png`. Kylie requested an editable value beside every slider with native up/down controls or visible **− / value / +**, whichever the benchmark establishes as the more universally accepted pattern. Do not treat the alternative as selected before that comparison. |
| 29 | `STUDIO-29` | Pivot should not invent interface language or interaction patterns by default; controls should follow recognised best practice. | Approved benchmark — governance comes first: (1) Constitution and approved Director decisions; (2) Business Plan, Operating Model and Brand Kit in the Constitution's recorded order of precedence, with conflicts surfaced rather than silently resolved; (3) approved Visual Design and Website Implementation guidance where consistent; then (4) native HTML/platform conventions, WCAG 2.2 AA and WAI-ARIA Authoring Practices; and (5) established design-tool conventions for domain interactions. Use approved Pivot voice and Australian English. Record sources and rationale for every departure. Return to the currently failing colour control after capturing this request. |

## Outstanding market-benchmark audit work

**Historical evidence:** `specs/studio-trial-feedback/MARKET_BENCHMARK_AUDIT.md` preserves the recovered audit. The current status and outstanding work are maintained only in this ledger.

**Scope boundary:** Continue only Design Studio market-benchmark remediation for these findings. Do not use this section to expand into Text-panel, containment, direct-editing, centring, BBA, branding or general redesign work. Do not deploy, push, configure providers or credentials, change temporary landing files, use browser automation, or claim a finding fixed without required manual confirmation.

| ID | Current local position | Outstanding work / release gate |
|---|---|---|
| `MB-01` | Open — deployment gate paused. Route hiding and “Please don’t share” are not access control; no provider or mechanism is selected. | Before invited external release, obtain a separate decision for a genuine tester-access and runtime boundary that exposes only the approved Studio and feedback surface. Keep provider selection neutral until explicitly approved. |
| `MB-02` | Local destructive-action protection is implemented and automated checks pass. | Manually accept template-change and Reset-design dialog wording, safe focus, Escape/cancel, keyboard operation and recovery behaviour. |
| `MB-03` | Persistent **Give feedback** entry is implemented outside the scrollable tool rail and automated checks pass. | Manually accept visual placement, focus transfer, responsive behaviour, keyboard and touch operation. |
| `MB-04` | Partially resolved. Design name and category are excluded. Kylie approved: “Your feedback will help us improve this trial. Garment, current view and browser details are included automatically. Add your email only if you’d like a reply.” | Decide and document feedback retention, then complete manual acceptance. The approved wording must not be silently rewritten. |
| `MB-05` | Local error handling distinguishes validation, rate limiting, unavailable configuration, delivery failure and unknown failure; entered values are preserved; automated checks pass. | Manually accept every error state, next step, value preservation, keyboard/focus behaviour and accessibility. Do not expose provider details. |
| `MB-06` | Dead Home controls are removed; the approved Pivot icon remains non-interactive branding; automated checks pass. | Manually accept visual, responsive, keyboard and accessibility behaviour. |
| `MB-07` | Club assets remains unavailable, but its explanation trigger is an active native button with pointer/hover cues and visible **Locked** labelling; automated checks pass. | Manually accept visual, keyboard, touch, focus and accessibility behaviour. |
| `MB-08` | Resolved in architecture records by commit `d69e3c7`. | No outstanding audit remediation unless the capability boundary changes again. |
| `MB-09` | Open manual verification gate. | Complete and document keyboard, focus, dialog, touch, narrow-screen, overflow, 200% and 400% zoom, print, contrast, and non-colour checks without browser automation. |
| `MB-10` | Deferred to the tester exercise. | Run the common comparative task script and measures before claiming quantitative market parity; this is not a prerequisite for local defect remediation. |

Automated evidence currently recorded by the handover includes a 164-test full Node run before the final copy-only adjustment, a passing `npm run check` afterward, passing focused feedback/repository tests, 41 passing repository guardrails against an isolated committed snapshot, and verified local HTTP assets plus `noindex,nofollow`. These results are not manual acceptance, deployment authorisation or tester readiness.

## Deferred Design Studio work — excluded from the testing-release gate

These items intentionally sit beyond the current browser-local Design Studio trial or are deferred cleanup/UX decisions. They must not block release for user testing while the trial boundary below remains truthful. Reopening an item requires its own scope, governing-document review, TDD slice and applicable approval; do not absorb it into unrelated trial remediation.

### Deferred cleanup and UX decisions

| ID | Deferred item | Boundary / future decision |
|---|---|---|
| `STUDIO-DEFER-01` | Remove obsolete Studio setup CSS | The removed setup chooser still has unused selectors in `public/style.css`; runtime searches found no current consumer. Remove separately with repository-guardrail coverage. |
| `STUDIO-DEFER-02` | Review Pattern colour 4 | No current pattern uses Colour 4, but it may remain in the main Colours target dropdown. Decide separately whether to remove it or filter colour targets dynamically. |
| `STUDIO-DEFER-03` | Review duplicate gradient concepts | The pattern catalogue contains gradient patterns while a separate **Gradient jersey base** section also exists. Decide whether these are distinct useful workflows or should be combined. |
| `STUDIO-DEFER-04` | Consider broader direct pattern hit-testing | Coordinate-based direct selection covers stripe, band, split and panel patterns. Other complex patterns may continue using explicit Pattern options colour chips; expand direct targeting only if testing demonstrates value. |
| `STUDIO-DEFER-05` | Optional required-number workflow | The seeded basketball number remains protected from deletion. Any future deletion capability must also provide an explicit **Add basketball number** action and retain blocking design checks; never remove protection by itself. |

### Deferred production dependencies

| ID | Deferred dependency | Boundary / prerequisite |
|---|---|---|
| `STUDIO-DEFER-06` | Supplier-authoritative garment geometry | Current garment shapes and editable boundaries are placeholders. Replace only when validated supplier geometry is available. |
| `STUDIO-DEFER-07` | Accurate side and 3D views | Left/right views are indicative rotated previews, not production-authoritative garment surfaces. |
| `STUDIO-DEFER-08` | Physical basketball sizing validation | Point sizes support trial interaction only and establish neither printed dimensions nor competition compliance. |
| `STUDIO-DEFER-09` | Production font approval | Development garment fonts remain evaluation-only. Licensing, supplier rendering and basketball-number suitability require approval. |
| `STUDIO-DEFER-10` | Production-ready T-shirt and hoodie templates | These remain generic testing garments. Supplier products and authoritative geometry are prerequisites. |
| `STUDIO-DEFER-11` | Authenticated approved club images | Authentication and club-scoped asset access are not connected. Real club assets must not be exposed through the public trial. |
| `STUDIO-DEFER-12` | Production save, approval and submission | Public designs remain browser-local. Durable records, authentication, approval audit history and production release are future capabilities. |

### Testing-release boundary

The deferred items may remain open provided the Studio continues to state clearly and truthfully that it is:

- a browser-local trial;
- not an order or submitted design;
- not production-ready;
- based on placeholder garment geometry; and
- unable to expose real authenticated club assets.

## Club Onboarding workflow updates

**Work type:** Development. Follow `AGENTS.md`, Pivot's governing documents, `docs/Club Onboarding Workflow.md`, `docs/Phoenix Phase 1 PRD.md` and `docs/Club Onboarding Proportionality Audit.md`. Pivot repository instructions and governing documents control this work; do not import CoachCW-specific Fastify, React, Prisma, athlete or session rules from shared material. Preserve unrelated concurrent Studio, documentation and club-interest work.

**Clarification protocol:** Review one finding at a time. First classify it as **(1) derivable from approved documents**, **(2) deliberately deferred or gated**, or **(3) a genuine unresolved business decision**. Ask Kylie only about category 3, using plain language. Do not reopen settled authority, pre-empt the Product Workflow design phase or use unexplained technical terminology.

### Clarification progress

| Finding | Classification and settled direction | Remaining work |
|---|---|---|
| Authoritative lifecycle transitions | **Approved in principle / derivable from the agreed workflow.** `docs/Club Onboarding Workflow.md` remains authoritative and its normal path must not be redesigned. A submitted Store version is locked. The Club Administrator must explicitly withdraw before editing; withdrawal prevents publication; editing creates a draft requiring resubmission; submission and withdrawal history remains immutable. Submission and withdrawal belong to the Club Administrator under the existing authority model. Concurrent withdrawal and Pivot decision resolve deterministically: the first completed authoritative action wins and the other makes no change. | Add enforceable transition requirements and requirement-to-test traceability without creating a general workflow engine. Do not ask again which role withdraws. |
| **Product approved for Store** hand-off | **Deliberately gated.** This is unrelated to the commercial agreement. The Product Workflow is separately owned and still in design. Club Onboarding may state only that it expects the future **Product approved for Store** output already named by the agreed workflow; it must not invent the output schema or internal Product Workflow. | Keep functional integration gated until the Product Workflow specification defines its authoritative output. Reconcile any onboarding requirement that currently implies an invented hand-off contract. |
| Administrator replacement | **Not yet classified as a genuine business decision.** Existing documents establish one active Club Administrator, prospective revocation/replacement without rewriting history, office-bearer appointment at commercial acceptance, and a legal-review gate for final authority wording. | Before asking Kylie anything, determine whether those controls already derive replacement authority and evidence or deliberately gate them to legal review. Do not invent replacement authority or repeat an obvious role question. |

### Remaining findings to filter

| Finding | Initial classification direction before any user question |
|---|---|
| Pending invitation and user-position accounting | Start as **derivable** from one active Club Administrator, at most two active Club Users, single-recipient invitations and atomic enforcement. Determine deterministic pending-invitation handling technically before treating anything as a business choice. |
| Concurrent automatic-save and draft conflicts | Start as **derivable** from truthful durable saving and exact-version approval. Define deterministic conflict handling without asking a product question unless approved documents leave a user-visible choice. |
| Exact Store-version composition | First derive the minimum immutable content from the exact Store setup and publication records. Do not ask Kylie for a technical data schema; surface only a genuine product-content choice. |
| Notification retries and deduplication | **Derivable implementation requirement:** delivery failures are visible and repeated processing must not create uncontrolled duplicates or falsely advance dependent workflow. |
| Deterministic alert definitions | Preserve the agreed triggers. Configurable thresholds are an operational configuration boundary, not permission for a general rules engine. Ask only if a business threshold is genuinely absent and required now. |
| Asset-upload security | **Derivable** from Constitution data protection, club isolation, minimisation, validation and provider gates. Do not turn security controls into optional UX questions. |
| Explicit Phoenix-only production restriction | **Derivable and closed:** the Phoenix PRD permits a multi-club foundation but Phoenix alone is enabled in production during the pilot. |
| Deterministic analytics | **Derivable:** structured setup events and issue codes only, no personal information or club name, stable opaque `clubId`, and authorised auditable support resolution. |
| Correction-report lifecycle | First derive the boundary that accepted commercial identity is not silently changed. Treat final commercial/legal resolution as gated; ask only if a remaining customer-facing business decision is proven. |
| Support/security restriction behaviour | **Derivable:** access may be restricted without erasing underlying state, authority history or required evidence. |
| Authoritative accessibility evidence | **Deliberately gated** to documented manual acceptance and applicable Store usability evidence; automated checks alone are insufficient. |
| Requirement-to-test traceability | **Derivable development control:** map every enforceable requirement and gate to automated or documented manual evidence. |

### Outstanding Club Onboarding work

This work has not disappeared. The finding table above records the detail; the actionable sequence is:

1. Incorporate the approved **Club dashboard** into `docs/Club Onboarding Workflow.md` rather than leaving it only in Product Workflow and this ledger.
2. Add a distinct **Club dashboard** section to the workflow. Use **Club dashboard**, not **Administrator dashboard**, because both the Club Administrator and Club Users use it; role-gated administrator authority remains explicit within that shared destination.
3. Define how onboarding leads into the dashboard and its separate **Club Gear** and **My Designs** destinations without absorbing Product Workflow internals or implying that a saved personal design is approved club gear.
4. Add the approved Store submission, withdrawal, locking, immutable-history and first-authoritative-action transition rules to the workflow and implementation specification.
5. Reconcile the **Product approved for Store** boundary so Club Onboarding expects the named future output but does not invent its schema or implementation before Product Workflow design is complete.
6. Finish the administrator-replacement authority analysis against existing authority and legal-review gates before deciding whether any genuine business question remains.
7. Work through every remaining finding in the table above, one at a time, using the three-category clarification protocol.
8. Reconcile `specs/club-onboarding/spec.md` only after each finding is settled, then add explicit requirement-to-test and manual-evidence traceability.
9. Keep provider-dependent implementation and production release blocked by the recorded legal, identity, storage, notification, analytics and accessibility gates.

**Current document state:** `docs/Club Onboarding Workflow.md`, `docs/Product Workflow.md` and `specs/club-onboarding/spec.md` already contain concurrent uncommitted changes. Do not overwrite, revert or commit those changes as part of handover consolidation. The Product Workflow now records agreed boundaries and terminology but still states that all other internal steps remain undesigned.

**Interaction lesson:** Do not treat agreed behaviour as unresolved, ask questions answered by role authority, define the Product Workflow inside Club Onboarding, or substitute technical jargon for a plain explanation. Present only the next proven category-3 decision and explain briefly why approved documents do not answer it.

## Club Stores

**Repository checkpoint:** Club Store separation was implemented in commit `6b960f6` (`feat: separate customer and club admin previews`). That commit is an ancestor of the current `pivot-v2-architecture` branch. Its committed snapshot recorded 77 passing tests and passing syntax checks. This evidence is not manual acceptance, production readiness or deployment approval.

### Approved preview boundaries

| Area | Route | Approved current state | Remaining acceptance / work |
|---|---|---|---|
| Club Stores landing | `/club-store/index.html` | One normal desktop viewport; compact Midnight Blue masthead with approved Pivot logo; H1 **Club Stores**; one **Pivot Club Store** entry; status **Preview only**; description **Explore how approved teamwear could look in a dedicated club-branded store.**; action **Explore the store →**; discreet text-link **Club login**. Kylie confirmed the one-screen approach works. | Manually confirm the homepage **Home** link scroll position. Do not turn **Club login** into a pill button without a new decision. |
| Public customer store | `/club-store/pivot/index.html` | Separate customer-facing Pivot preview with playing-uniform and club-apparel placeholders; customer-selectable light/dark themes remembered in browser `localStorage`; clearly preview-only and non-transactional; no administration, ordering, checkout or payment controls. The landing entry opens this route. | Decide public-store FAQ/help placement. Any transactional capability requires separate scope and approval. |
| Club administration preview | `/club-store/version-2-club-store-review.html` | Local preview of the future authorised Club User/Club Administrator experience: controlled light/dark theme preview, club-colour controls, placeholder products and an explicit statement that authentication, saving and approvals are not connected. No fake Save or Approve actions. | Decide the exact Club Administration information architecture and approval controls before functional implementation. The local **Club login** link currently bypasses authentication and opens this preview only for testing. |
| Future club login | `/club-login/index.html` | Retained future passwordless-login page. Its email form is disabled and clearly marked as not connected; local navigation currently bypasses it. | Functional authentication remains unapproved and unimplemented. Do not imply that this route currently protects the administration preview. |

### Settled club roles and authority

Do not reopen these decisions without an explicit Director decision:

- Each club has one appointed **Club Administrator**.
- Each club may have up to two individually identified **Club Users**.
- Club Users may prepare assets, colours, designs and store branding but cannot formally approve.
- The Club Administrator manages Club Users and approves club decisions.
- Public members, families and supporters are shoppers, not Club Users.
- Pivot independently reviews and controls publication and release to manufacture.
- Club approval alone cannot publish or release work to manufacture.

### Known fixture mismatch

Do not build functional approval or authentication capability on the current fixture model without a separately scoped correction:

- `src/domain.js` still defines the superseded `primary_approver` role.
- `data/state.json` still contains a primary-approver fixture.
- `docs/Phoenix Phase 1 PRD.md` now records the settled model of one Club Administrator and up to two Club Users; the handover statement that this PRD remained stale is superseded.

### Future secure-authentication direction

No provider or mechanism has been selected. Any future proposal must remain provider-neutral until explicitly approved and must address:

- invitation-only individual accounts;
- passwordless, short-lived, single-use email links;
- fresh authentication for approvals and access changes;
- secure server-side sessions;
- role and club isolation on every protected request;
- strong multi-factor authentication for Pivot administrators;
- audit records, notifications and rapid revocation.

### Unresolved Club Store decisions

- Exact Club Administration information architecture and approval controls.
- Public-store and administration FAQ/help placement.
- Functional authentication, durable saving and approval records.
- Whether to add a generic trial tee before using an exact AS Colour product.
- AS Colour imagery, colours and sizing resources exist, but no public supplier-approved production template has been confirmed. Do not make an exact-product or production-geometry claim without authoritative evidence and approval.
- Manual confirmation of the homepage **Home** link scroll position.

**Working protocol:** Inspect and explain current state before editing Club Stores; propose exactly one specific change; wait for explicit approval; avoid adjacent UX decisions; report exactly what changed; and do not push or deploy without explicit instruction.

## Club dashboard

| ID | Area | Observation | Wanted outcome | Priority | Status | Decision/test evidence |
|---|---|---|---|---|---|---|
| `DASH-01` | Authenticated club navigation and workspaces | Club participants need a clear home for shared club work and private design experimentation. Treating saved personal designs as approved or shared club products would blur the Club Administrator authority gate. | Provide a role-aware **Club dashboard** with separate primary destinations for **Club Gear** and **My Designs**. **Club Gear** is the shared workspace for products selected for the club through the Club Administrator authority gate and their linked templates. **My Designs** is private to the signed-in Club Administrator or Club User and may contain saved work using any template available in the Design Studio. Saving in My Designs must not create a Club Gear product, request a quote, enter approval or commit the club. A Club User has no authority or approval power; administrator-only decisions and controls must remain authority-gated and enforced beyond presentation. Reference this dashboard boundary from the Product Workflow. The Club Onboarding Workflow must incorporate this dashboard boundary and add a distinct **Club dashboard** section; that workflow update remains outstanding. | Important | Approved | Kylie approved the dashboard direction during Product Workflow design. Product behaviour is recorded in `docs/Product Workflow.md`. `STUDIO-22` and `STUDIO-23` provide the existing My Designs and Club Gear terminology decisions. The Club Onboarding Workflow integration, detailed dashboard design and implementation remain pending. |

## Easy feedback format

Kylie may provide ordinary prose or use:

```text
Page: Main review / Club store
Device: Desktop / Mobile / Tablet
Area: Header, product card, theme, form, help, etc.
Observation: What felt wrong or confusing
Wanted outcome: If known
Priority: Blocker / Important / Polish / Idea
Screenshot: Optional
```

Unstructured feedback will be organised here without adding meaning that Kylie did not provide.

## Review close procedure

1. Confirm all observations are classified.
2. Resolve one material or ambiguous item at a time.
3. Record explicit approvals and rejected alternatives.
4. Create requirement-traced implementation slices only for approved outcomes.
5. Recalculate the manifest after verified changes and assign a new baseline identifier.
6. Keep the former manifest as evidence rather than overwriting it.
