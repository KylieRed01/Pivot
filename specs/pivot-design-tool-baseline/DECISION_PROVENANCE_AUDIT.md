# Decision Provenance Audit: Pivot Design Tool Baseline

**Status:** CHECKPOINT 1 — SOURCE RECOVERY COMPLETE; CONSOLIDATED BASELINE NOT YET VERIFIED
**Work type:** development
**Intelligence:** High
**Implementation status:** Frozen. This audit does not approve customer copy, specification changes, implementation, or merge.

## Purpose

Recover documented decisions from their original sources, apply explicit supersession rules, and identify where the consolidated specification or implementation lost, changed, or overclaimed those decisions.

This document is an audit index, not a replacement specification. Exact approved wording remains authoritative at its cited source until a user-approved consolidated source is created.

## Authority and supersession chain

1. `docs/Business Plan_V1.00.pdf`
2. `docs/Operating Model_V1.00.pdf`
3. `docs/brand/Brand Kit_V1.00.pdf`
4. `docs/brand/Visual Design Guide_V1.00.pdf` for application of the Brand Kit
5. Recorded Director decisions in the grill handovers, in chronological supersession order:
   1. `grill-me-reconstruction.md` / `grill-me-recovered-transcript.md`
   2. `grill-me-handover.md`
   3. `grill-me-handover-production-output.md`
   4. `grill-me-handover-editor-product.md`
   5. `grill-me-handover-security-infrastructure.md`
   6. `grill-me-handover-cloud-provider-selection.md`
6. `spec.md` only after every transfer is verified against the sources above.

`prd.md` and `issues.md` are historical planning artifacts. Their own declarations that they are authoritative conflict with the later handover chain and must not be used as current authority.

## Classification

- **CURRENT** — explicitly approved/locked and not later superseded.
- **SUPERSEDED** — replaced by a later recorded decision.
- **UNRESOLVED** — explicitly not locked or dependent on an external input.
- **TRANSFER GAP** — absent or materially changed in `spec.md`.
- **IMPLEMENTATION GAP** — current code differs from the recovered current decision.
- **SLICE-EXCLUDED** — current demonstrator intentionally does not implement the target-product capability; it must not be mistaken for a product-level rejection.

## Critical audit findings

### PA-01 — The required governing-document reconciliation did not occur before coding

**Sources:**
- `grill-me-handover-editor-product.md` § Governing-document updates required later (lines 74–86)
- `grill-me-handover-security-infrastructure.md` § Reconciliation reminders (lines 453–467)

Both sessions explicitly say the governing documents, `spec.md`, PRD/help/FAQ copy and related documents must be reconciled together before coding. Instead, implementation proceeded while:

- `docs/Phoenix Phase 1 PRD.md` still contains older role counts, coach-polo terminology, 3D as a hard requirement and older pilot assumptions;
- `prd.md` and `issues.md` still claim authority over an earlier product model;
- approved customer copy was mixed with policy constraints in `spec.md`; and
- the latest handover remained paused on external supplier and Phoenix decisions.

**Impact:** The consolidated baseline cannot be accepted as an authoritative transfer.

### PA-02 — Customer-copy approval and product-policy constraints were conflated

**Sources:**
- `grill-me-handover.md` § Working FAQ copy (lines 133–233): copy passed Brand Kit and duplicate-language review.
- `grill-me-handover-production-output.md` § 3D decision (lines 261–274): old help copy overpromises 3D.
- `grill-me-handover-editor-product.md` § Completed existing garment designs (lines 134–153): old FAQ/Studio Help overpromises public conversion.
- `grill-me-handover-cloud-provider-selection.md` § lean Phase 1 reset (lines 30–44): public work is browser-local and no provider is selected.

Later sessions invalidate specific factual claims but do not approve replacement customer wording. `spec.md` converted policy instructions such as “must not promise” and “should not be advertised” into answer text, and implementation tests then protected that text.

**Impact:** Approved voice and compliance review were lost. Final customer copy requires a minimal redline against the original approved copy, not a fresh rewrite.

### PA-03 — Multiple repository files still declare conflicting sources of truth

**Sources:**
- `prd.md`: says the earlier `spec.md` requires alignment.
- `issues.md`: declares `prd.md` the source of truth and says `spec.md` is not authoritative where conflicting.
- Current `spec.md`: declares itself the reconciliation of the latest handovers.

**Impact:** Agents can follow incompatible authorities and repeat this failure.

## Decision recovery matrix

### A. Brand, website and customer communication

| ID | Current decision | Exact source | Status in consolidated baseline |
|---|---|---|---|
| A01 | All customer touchpoints follow the Brand Kit; voice is clear, professional, approachable, practical and positive, without jargon, technical language, ambiguity or exaggeration. | Brand Kit § Brand Voice; Pivot Constitution §10; `grill-me-handover.md` lines 107–118 | **TRANSFER GAP:** policy language appears as customer FAQ copy. |
| A02 | Website hero: **Built for action. Priced to play.** Subheading: **Quality custom teamwear that helps clubs and players get in the game.** | Brand Kit § Website Messaging | CURRENT and implemented. |
| A03 | Customer-facing tool name is **Pivot Design Studio**; CTA is **Game On. Start Designing** with accessible label **Start designing with the Pivot Design Studio**. | `grill-me-handover.md` lines 120–127 | CURRENT and implemented. |
| A04 | Help areas are separately named **FAQs**, **Pivot Design Studio Help**, and **Club Help Centre**. | `grill-me-handover.md` lines 128–131 | **TRANSFER GAP:** Design Studio Help was dropped and categories flattened. Structure has been provisionally restored, but copy remains unapproved. |
| A05 | The FAQ/help text in `grill-me-handover.md` passed Brand Kit review. | `grill-me-handover.md` lines 133–233 | CURRENT as the approved-copy base, subject only to explicit later factual supersessions. |
| A06 | Registration section, consent and confirmation wording are approved, but no form may be shown until secure handling exists. | `grill-me-handover.md` lines 45–81; latest infrastructure boundary | CURRENT. Spec correctly keeps the approved future copy and email fallback. |
| A07 | Public page collects/invites club interest; it is not open pilot registration. No launch date, newsletter, pilot place or onboarding promise. | `grill-me-handover.md` lines 37–43, 84–91; current `spec.md` | CURRENT and substantially implemented. |
| A08 | Pivot supplies and delivers only within Greater Bendigo; Design Studio may be tried publicly. | `grill-me-handover.md` lines 37–43; Brand/Operating Model | CURRENT and implemented. |
| A09 | Approved public product descriptions for Playing uniforms, Club apparel and Club stores are preserved. | `grill-me-handover.md` lines 93–105 | CURRENT and implemented. |
| A10 | Club stores and teamwear are not yet available to other clubs. | Latest pilot/public boundary in current handover chain | CURRENT. Old FAQ answer beginning “Yes” is **SUPERSEDED**. |
| A11 | Contextual FAQ/Studio Help CTAs were part of the approved copy. | `grill-me-handover.md` lines 153–159, 185–191 | **TRANSFER GAP:** contextual placement was dropped. Whether general page CTAs satisfy the intent requires user confirmation. |

### B. Product and phase scope

| ID | Current decision | Exact source | Status in consolidated baseline |
|---|---|---|---|
| B01 | The target is the complete Pivot design tool, not a reduced Phoenix-specific product. | `grill-me-reconstruction.md` § Product Boundary; recovered transcript Questions 1–3 | CURRENT product direction. |
| B02 | The present implementation is only a supplier-independent website/demonstrator slice and must not be represented as the complete target product. | Current `spec.md` § Status and authority; `plan.md` § Summary/exclusions | CURRENT slice boundary, but must remain visibly distinct from B01. |
| B03 | Phase 1 core products: reversible jersey, men's club polo and women's club polo. Matching shorts are provisional pending cost. | `grill-me-handover-production-output.md` lines 276–289; `grill-me-handover-editor-product.md` lines 45–55 | CURRENT and implemented in entry labels. |
| B04 | Customer-facing **coach polo** terminology is replaced by men's/women's **club polo** and club official/volunteer apparel. Internal IDs may be retained safely. | `grill-me-handover.md` lines 388–398 | CURRENT; visible copy passes, legacy internal identifiers remain by plan. |
| B05 | Basketball is first. Other sports become available only after product, template, competition and production validation; clubs from any sport may express interest. | `grill-me-handover.md` lines 422–430 plus later no-promise constraints | CURRENT and implemented. |
| B06 | A reversible jersey is one single-layer, double-sided garment with linked dark/light compositions approved and released together. | `grill-me-handover.md` lines 278–285; `grill-me-handover-production-output.md` lines 240–244 | CURRENT; demonstrator models linked surfaces but cannot claim production construction validation. |
| B07 | The jersey leads coordinated shorts/polo starting drafts, adapted by product and independently refined. | `grill-me-handover-editor-product.md` lines 418–428 | CURRENT target-product decision; **SLICE-EXCLUDED** from this demonstrator. |
| B08 | Starting designs use curated deterministic production-tested recipes, not generative AI. | `grill-me-handover-editor-product.md` lines 430–434; no-AI direction lines 284–289 | CURRENT target-product decision; only basic placeholder patterns exist in this slice. |

### C. Public trial, persistence and entry

| ID | Current decision | Exact source | Status in consolidated baseline |
|---|---|---|---|
| C01 | Public visitors can try without joining, forced lead capture, tutorial, chatbot or popup. | `grill-me-handover.md` lines 235–250; security handover lines 129–136 | CURRENT and implemented. |
| C02 | Public artwork/design state remains browser-local and is never uploaded, retained or recoverable by Pivot. | `grill-me-handover-cloud-provider-selection.md` lines 30–44 | CURRENT and implemented at network boundary. |
| C03 | Public visitors cannot permanently save, share, submit or approve. | `grill-me-handover.md` public trial; latest cloud reset | CURRENT and implemented. |
| C04 | Public artwork can survive the documented browser-session reload boundary only if the accepted payload fits storage. | Current plan/session restoration commitment | **IMPLEMENTATION GAP F12:** advertised 5 MB files cannot reliably fit after base64 expansion; remediation in progress but not complete. |
| C05 | Entry selects sport, competition and available product. Unsupported products must not silently open the jersey. | Current spec/plan derived from handovers | CURRENT and implemented. |
| C06 | Optional pre-editor club colour/artwork setup may be offered; users may skip. | `grill-me-handover.md` lines 235–249 | CURRENT target direction; **SLICE-EXCLUDED/not implemented** in this demonstrator. |

### D. Colour and artwork

| ID | Current decision | Exact source | Status in consolidated baseline |
|---|---|---|---|
| D01 | Direct colour selection/confirmation is the reliable baseline. Volunteers need not know technical codes. | `grill-me-handover-editor-product.md` lines 88–107 | CURRENT and implemented. |
| D02 | Automatic extraction is optional assistance, deterministic, confirmable and not a pilot blocker or approval source. | `grill-me-handover-editor-product.md` lines 90–99; security preferred enhancements | CURRENT; **SLICE-EXCLUDED**. Older recovered requirement that extraction be automatic is **SUPERSEDED**. |
| D03 | Requested club colour and Pivot's internal production mapping remain separate; mapping is unresolved without supplier inputs. | `grill-me-handover-editor-product.md` lines 101–107 | CURRENT; implementation labels production mapping unresolved. |
| D04 | Public visitors may upload ordinary images for browser-local experimentation but may not be promised automatic completed-garment conversion. | `grill-me-handover-editor-product.md` lines 134–153 | CURRENT and implemented. Older public conversion copy is **SUPERSEDED**. |
| D05 | Authenticated completed-design onboarding is hybrid and may require Pivot assistance. | Same source | CURRENT target direction; simulation does not implement it. |
| D06 | Ordinary artwork supports move, proportional resize, crop, rotation, duplicate, delete, ordering, flips and opacity; proportion unlock is deliberate. | `grill-me-handover-editor-product.md` lines 211–238 | PARTIAL in demonstrator; no proportion-unlock control. Spec says “may support”, so not currently a hard acceptance blocker. |
| D07 | Background removal is user-invoked, previewed, non-destructive and preferred but not a pilot blocker. | `grill-me-handover-editor-product.md` lines 211–232 | CURRENT; **SLICE-EXCLUDED**. |
| D08 | Official logos have stricter controls and cleanup creates a proposed variant requiring administrator approval. | `grill-me-handover-security-infrastructure.md` lines 111–118 | CURRENT target direction; public demonstrator handles ordinary artwork only. |
| D09 | Every upload is untrusted in future authenticated production handling; public demonstrator must not claim this pipeline. | `grill-me-handover-security-infrastructure.md` lines 177–204 | CURRENT and correctly excluded from public browser-only implementation. |
| D10 | Phase 1 ordinary authenticated upload formats include PNG/JPEG/WebP, HEIC conversion, sanitised SVG and safely processed PDF; specialist files use controlled assistance. | Same source | CURRENT production boundary; demonstrator intentionally accepts raster formats only. |

### E. Brand assets and interface taxonomy

| ID | Current decision | Exact source | Status in consolidated baseline |
|---|---|---|---|
| E01 | Only approved logo assets may be used; wordmark artwork must not be recreated using ordinary text/font. | Brand Kit §§ Logo Usage, Wordmarks, Typography | **IMPLEMENTATION GAP:** garment currently uses ordinary “PIVOT” text and an icon asset rather than the approved light/dark wordmark artwork. |
| E02 | For Phoenix Phase 1 sponsorship, use the approved Pivot wordmark and do not use the penguin icon. | `grill-me-handover-cloud-provider-selection.md` line 56 | **IMPLEMENTATION GAP F14:** workflow garment inserts `Pivot_Icon.svg`. |
| E03 | The penguin may remain an approved application-shell/digital brand asset under the Brand Kit; garment exclusion does not ban shell use. | Brand Kit §§ Logo Icons, Digital Applications | CURRENT distinction; shell icon use is not itself a violation. |
| E04 | Uploaded artwork belongs under Images; Text naming must remain separate. | `handover-summary.md` editor reconciliation plus editor-product Images decisions | **IMPLEMENTATION DRIFT F15:** visible Text label is separate, but accessible name/panel wording still says “Text and artwork/Text and layers”. Source authority for final wording must be confirmed. |

### F. Editor state, controls and accessibility

| ID | Current decision | Exact source | Status in consolidated baseline |
|---|---|---|---|
| F01 | Structured, view-independent state; four authoritative 2D surfaces for dark/light × front/back. | Production-output § proof/reversible decisions; editor-product § canvas | CURRENT and implemented. |
| F02 | Reliable 3D is desirable, not a pilot blocker; 2D is authoritative; inaccurate 3D must not represent production. | `grill-me-handover-production-output.md` lines 261–274 | CURRENT and implemented as indicative/non-editable. Older hard-3D claims are **SUPERSEDED**. |
| F03 | Core canvas navigation includes zoom, fit, reset, pan, mouse/trackpad, touch and keyboard alternatives. | `grill-me-handover-editor-product.md` lines 334–352 | PARTIAL: structured zoom/pan controls exist; wheel/pinch and direct pan require explicit slice decision/verification. |
| F04 | Template-configured element levels are Fixed, Constrained and Flexible. | `grill-me-handover-editor-product.md` lines 354–364 | CURRENT and implemented in state metadata/invariants. |
| F05 | Baseline text controls include wording, approved font, colour, size/scale, movement, rotation, alignment, spacing, supported outlines, ordering, duplication and deletion. | `grill-me-handover-security-infrastructure.md` lines 77–92 | PARTIAL: many controls exist; approved font selection/outlines await supplier capability. Correctly unresolved if not represented as production-ready. |
| F06 | Basketball numbers are required and not removable; representative style is edited once; no player names in Phase 1; production batch run 1–40 is separate. | Editor-product lines 366–390; production-output lines 246–252 | CURRENT and implemented at demonstrator boundary. |
| F07 | Patterns may adjust permitted colours, origin, scale, rotation and continuation where manufacturing capability permits; failures are explained, not silently fixed. | `grill-me-handover-editor-product.md` lines 399–416 | PARTIAL placeholder implementation; supplier-dependent controls remain unresolved. |
| F08 | Undo/redo covers current editing session; named versions/approval checkpoints are distinct. | Editor-product lines 304–324; security naming decisions | CURRENT; browser history implemented, production versions not claimed. |
| F09 | WCAG 2.2 AA, semantic structured alternatives, keyboard operation and no dependence solely on drag/colour/motion/3D. | Security handover lines 138–153 | CURRENT; automated coverage passes, manual checks remain outstanding. |
| F10 | Latest two desktop Chrome/Edge/Firefox/Safari and current/recent iOS/Android; actual devices and 5–8 Phoenix volunteers. | Security handover lines 145–161 | CURRENT; emulation automated, actual-device/usability work remains manual. |

### G. Roles, approval, proof and production

| ID | Current decision | Exact source | Status in consolidated baseline |
|---|---|---|---|
| G01 | Up to two club users and one appointed administrator. Club users prepare; administrator formally approves; Pivot independently reviews. | `grill-me-handover.md` lines 287–321; editor-product lines 155–167 | CURRENT. Older multiple-admin/primary-approver customer model is **SUPERSEDED**. Internal legacy IDs remain in simulation by explicit plan containment. |
| G02 | Club and Pivot approvals must be different people; small-club administrator may create and club-approve the same work. | Editor-product lines 157–167; production-output lines 56–63 | CURRENT in specification; demo does not claim production enforcement. |
| G03 | Formal approvals bind exact immutable versions and evidence; history is never erased. | Production-output lines 65–99, 135–152 | CURRENT target decision; **SLICE-EXCLUDED** from demonstrator. |
| G04 | Final 2D proof is mandatory; physical sample is risk-based; 3D is never sole approval evidence. | Production-output lines 101–132 | CURRENT target decision; demonstrator explicitly creates no production proof. |
| G05 | Final club action is **Approve and authorise production**, then separate Pivot **Release to manufacture**, each two-step. | Production-output lines 56–87 | CURRENT target decision; **SLICE-EXCLUDED**. |
| G06 | Authorised, sent and supplier accepted/rejected are distinct states. | Production-output lines 182–192 | CURRENT target decision; manufacturing integration unresolved. |
| G07 | Reversible dark/light faces are approved/released together; each physical product has a separate release. | Production-output lines 229–244 | CURRENT target decision. |
| G08 | Supplier identity, raw templates and internal production mappings are Pivot-only. | Reconstruction supplier boundary; production-output lines 208–220 | CURRENT; no customer-visible supplier identity found in demonstrator. |

### H. Club store

| ID | Current decision | Exact source | Status in consolidated baseline |
|---|---|---|---|
| H01 | Store is controlled, not freeform; approved club assets produce accessible light/dark themes for administrator preview/approval. | `grill-me-handover.md` lines 323–349; Visual Design Guide § Club Store | CURRENT target decision. |
| H02 | Store light/dark themes are independent of jersey dark/light faces. | `grill-me-handover.md` lines 278–285, 323–349 | CURRENT and stated in spec. |
| H03 | Approved products appear only after their separate product/design workflow. | `grill-me-handover.md` lines 323–349 | CURRENT target decision. |
| H04 | Demonstrator does not create a live store and website must not imply general availability. | Latest public/pilot boundary | CURRENT and implemented in copy after correction. |

### I. Security, privacy and infrastructure

| ID | Current decision | Exact source | Status in consolidated baseline |
|---|---|---|---|
| I01 | Production infrastructure/provider remains unselected; demonstrator choices must not constrain permanent architecture. | Latest cloud handover lines 30–44; security handover reconciliation note | CURRENT and clearly labelled. |
| I02 | Latest lean Phase 1 target is AUD 120/year excl. GST, Director review over AUD 180/year; next-business-day restoration; up to 24 hours saved draft loss. | `grill-me-handover-cloud-provider-selection.md` lines 30–44 | CURRENT. Earlier AUD 250/month, four-hour and five-minute assumptions are **SUPERSEDED**. Current spec reflects the lean reset. |
| I03 | Phoenix sessions: 24-hour absolute, two-hour inactivity, fresh passwordless authentication before approvals/access changes. | Latest cloud handover lines 30–44 | CURRENT target decision; production auth is not implemented or claimed. |
| I04 | Known invitation-only users, no payments/member ordering, low traffic, manual fallbacks; avoid enterprise architecture. | Latest cloud handover lines 58–69 | CURRENT and respected by demonstrator scope. |
| I05 | Public data is browser-local; production customer data/storage/provider decisions remain unresolved. | Latest cloud handover | CURRENT and implemented. |
| I06 | Prohibit ordinary Phase 1 collection of payment/bank details, passwords, government IDs, health/biometric data, DOBs, rosters, children's contacts and identifiable photos. | Security handover lines 249–271 | CURRENT target constraint; public browser-local images are not collected by Pivot, but help should not imply future production acceptance without the safe pipeline. |

### J. Explicitly unresolved/external

| ID | Decision state | Source | Transfer status |
|---|---|---|---|
| J01 | Supplier, authoritative templates/geometry, production mappings, API/file formats and acknowledgements are external. | All later handovers; latest cloud lines 46–56 | Correctly unresolved. |
| J02 | Final Phoenix palette, vector logo/wordmark treatment, sponsor artwork and independent administrator/test user await Phoenix decisions. | Latest cloud lines 46–56 | Correctly unresolved; workflow fixture must remain clearly fictional. |
| J03 | Matching shorts await confirmed cost. | Production-output lines 276–289 | Correctly provisional. |
| J04 | Accurate 3D/UV/panel mapping awaits supplier inputs. | Latest cloud lines 30–44 | Correctly unresolved. |
| J05 | Background removal, colour extraction, comparison, full phone editing and supplier automation are preferred enhancements, not pilot blockers. | Security handover lines 163–175 | Correctly excluded from current slice if not promised. |
| J06 | Ordering, payments, rosters, names/personalisation and broader clubs belong to later phases. | Production/editor/cloud handovers | Correctly excluded. |

## Open provenance findings requiring action

| Finding | Severity | Required next step |
|---|---:|---|
| PA-01 governing-document reconciliation was skipped | Critical | Do not approve the baseline. Create a verified canonical decision register before further implementation. |
| PA-02 approved copy mixed with policy text | Critical | Produce a minimal redline from exact approved copy; user approves only changed lines. |
| PA-03 conflicting source-of-truth declarations | High | Mark historical PRD/issues/spec artifacts with explicit superseded/current status after user approves the new canonical structure. |
| F12 upload/session budget mismatch | High | Finish TDD remediation only after provenance checkpoint approval. |
| F13 help taxonomy/copy authority | High | Keep category structure; do not approve drafted replacement wording until redline approval. |
| F14 garment branding asset mismatch | High | Replace icon/recreated text with approved wordmark assets after audit approval. |
| F15 Text/Images taxonomy drift | Medium | Confirm source authority and align labels/tests. |
| F03 wheel/pinch/direct-pan coverage | Medium | Decide whether this demonstrator slice must implement it or explicitly document structured controls as the baseline alternative. |

## Areas that transferred consistently

The following major decisions currently show no material provenance conflict in the demonstrator boundary:

- basketball-only active editor and truthful unavailable products;
- club-polo customer terminology;
- four independent 2D surfaces;
- indicative/non-authoritative 3D;
- required basketball number and no player names;
- browser-local/no-protected-API public mode;
- supplier/final-artwork/infrastructure/manufacturing unresolved notices;
- public raster-only upload boundary without production-security claims;
- simulated workflow labelling;
- no production proof/release/manufacturing claims;
- WCAG-oriented semantic and keyboard controls; and
- explicit production/supplier scope exclusions.

## Next checkpoint

Before any implementation resumes:

1. User reviews this source hierarchy and the open-finding list.
2. Prepare the approved-copy redline as a separate proposal; do not apply it.
3. After approval, create one canonical decision register/specification and mark historical conflicting artifacts clearly.
4. Re-map implementation and tests to the verified register.
5. Only then remediate technical findings and rerun structured review.
