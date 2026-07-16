# Pivot Grill-Me Handover — Production Output and Pilot Timeline

> **Later session:** Continue with `specs/pivot-design-tool-baseline/grill-me-handover-editor-product.md`, which supersedes this file where decisions conflict.

**Date:** 2026-07-16  
**Status:** Session paused for a break. Resume in a new chat.  
**Resume command:** `grill-me Continue from specs/pivot-design-tool-baseline/grill-me-handover-production-output.md`

## Resume instructions

1. Read this file completely.
2. Read `specs/pivot-design-tool-baseline/grill-me-handover.md` completely; it contains all earlier locked decisions.
3. Follow the linked-document reading instructions in that earlier handover.
4. This file records the later session and supersedes the earlier handover where they conflict.
5. Continue one question at a time and include a recommendation.
6. Do not modify the baseline specification until conflicts are explicitly reconciled.
7. The user reduced/paused after using `max` reasoning. Prompt for `max` again before authentication, security, storage, infrastructure, detailed 2D-to-3D mapping, supplier-integration architecture, or production-export architecture.

## Where the session stopped

The production-output branch is complete. Resume with the remaining highest-risk editor/product decision that does not require missing supplier data: reconcile automatic club-colour extraction with direct colour entry.

The phase terminology is now explicit:

- **Phoenix Pilot Phase 2 / Winter 2027 member ordering:** Phoenix families order jerseys and matching shorts through the club store. It remains Phoenix-only while Pivot validates the concept, operating model and viability.
- **Phoenix Pilot Phase 3:** Pivot expands the Phoenix store/product range. If Phase 2 succeeds, selected additional clubs may also be onboarded at the Director's discretion and only within available business capacity; new-club onboarding is optional, not a mandatory Phase 3 deliverable.
- **Business Plan Phase 2 — Controlled Growth:** broader controlled growth follows the successful validation gate and remains constrained by operational readiness.

Phoenix Pilot Phase 2 must prove the complete live cycle:

1. approved design and club store;
2. family ordering, payment, sizing, names and numbers;
3. club validation and order consolidation;
4. supplier submission and acknowledgement;
5. manufacturing status and exception handling;
6. receipt by Pivot and quality control;
7. customer communication, collection or delivery; and
8. financial and order reconciliation.

Rules-based work is automated while approvals, quality decisions and exceptions retain human oversight. Successful completion of this full cycle unlocks the option to onboard selected additional clubs. Whether and when to do so remains a Director decision based on capacity; Pivot does not promise a club count or compromise service, quality or fulfilment for growth.

## Locked production-output decisions

### Minimum traceability contract

Do not lock supplier-specific package fields or formats before supplier requirements are known.

The supplier-independent minimum is locked:

- Every manufacturing submission references an immutable, finally approved design version.
- Pivot retains the exact files/data actually sent.
- The submission records its template version, approvals, timestamp, destination and integrity checksum.
- Supplier-specific formats and automation remain provisional.
- A controlled manual handover is the Phase 1 fallback.

### Human decisions and release

- Automation may prepare, validate and recommend.
- An authorised Pivot person makes consequential decisions involving quality, compliance exceptions, supplier commitment, publication or manufacture.
- Reversible editing and ordinary controlled store-branding actions do not require a Pivot click merely for the sake of it.
- Final club approval makes a design eligible for manufacture; an authorised Pivot person must still perform **Release to manufacture**.
- Pivot may use the same authorised Pivot person for technical review and final release because the business is small.
- Club and Pivot approvals must always come from distinct people. One person acting for both sides is prohibited as unethical and invalid for audit purposes.

### Approval records

- The first club approval attaches to the exact submitted digital design version.
- Final club approval attaches to the exact immutable production proof and, where required, its physical-sample record.
- Store actor, role, exact version, timestamp, proof checksum and the exact confirmation/attestation wording shown.
- The club administrator must personally approve through their authenticated account.
- Pivot must never impersonate the club approver.
- If authenticated approval is genuinely unavailable, a signed approval document may be uploaded as an exception; record both the club signatory and the Pivot user who entered it.
- Club approval covers club-controlled matters: identity, artwork, sponsor content, spelling, colours, placement and overall appearance.
- Pivot approval covers product suitability, competition compliance, manufacturability, production specifications and quality readiness.

### Approval commitment and preventative confirmation

- Final approval is a clear commitment, not a casual status change.
- Use **Approve and authorise production** for the final club action.
- Show the exact proof/version and state that Pivot may proceed in reliance on approval; later changes or cancellation may be impossible or incur costs.
- Exact legal wording must later be reviewed as part of customer terms.
- Every formal approval and production-release action uses a two-step process:
  1. review the exact object and consequences;
  2. explicitly confirm with a clearly labelled final action.
- Do not require volunteers to type a confirmation phrase.
- Protect actions against duplicate submission.
- Apply this preventative confirmation pattern to consequential Pivot HITL actions such as approvals, publication, production release and lifting holds.

### Holds, stop requests and history

- Never erase an approval or historical event.
- If an urgent issue is reported before a package is sent, automatically place it on hold for Pivot review.
- If already sent, show **Stop requested** until Pivot confirms the supplier outcome.
- Never display **Stopped** or **Cancelled** without confirmation.
- Preserve the original approval and full history.
- Returning a design, placing a hold, requesting a stop, cancelling a release or overriding a reviewable rule requires a reason category and short explanation.
- Notes are explicitly marked customer-visible or Pivot-internal so confidential supplier details are protected.

The earlier tentative suggestion that a club could simply withdraw final approval was superseded by the commitment model above. The club can report an issue or request an urgent stop; it cannot erase or unilaterally undo the commitment.

### Proof structure

- A production proof is mandatory for every final approval.
- A physical sample supplements rather than replaces the proof.
- A physical-sample record includes its identifier, date, linked product/template version, reviewers, outcome, and supporting photos/notes as appropriate.
- The proof contains customer-readable 2D views of every designed surface.
- For the reversible jersey, both dark and light faces appear in the same proof.
- 2D is mandatory approval evidence and remains authoritative.
- 3D is supporting visualisation only and is not the sole approval evidence.
- The customer proof includes a structured summary as well as visuals: design/version ID, Pivot product/template name, exact text, artwork inventory, approved club colour references and every designed garment face.
- Confidential supplier identity, sourcing details, raw patterns, internal production mappings and supplier artifacts are excluded.

### Proof immutability and post-approval record

- Generated proofs and supplier artifacts are stored as the exact original bytes with checksums; do not regenerate them later using changed software/assets.
- A correction creates a new artifact version and fresh review where required.
- Preserve the pre-approval proof unchanged.
- After approval, generate a separate approval record or cover sheet that references the original proof ID/checksum and records the approver, role, date and attestation wording.
- Do not mutate the reviewed proof to add approval details.

### Number quality gate

This requirement was added because a prior number font made `2` and `5` look alike and rendered jerseys unusable.

- Every production number style must show `0 1 2 3 4 5 6 7 8 9` using the exact font, weight, outline, spacing, size and print treatment.
- Pivot explicitly checks distinguishability, especially `2/5`, `6/9` and `1/7`.
- A supplier must not silently substitute the approved number style.
- Any number-style change requires renewed validation.
- Every jersey proof automatically includes a `0–9` inspection panel for each distinct number treatment.
- Dark and light reversible faces each receive their own automatically generated number check using that face's actual styling/background treatment.
- The ordinary garment view still shows its representative number in the actual position.
- Volunteers do not manually create number-test panels.
- Present this as a simple, clearly labelled **Number check** section; Pivot owns the technical quality decision.

### Immutable design source and dependencies

- Retain the complete structured editable design state after approval: layers, element geometry, colours, text, artwork, garment-face relationships and other necessary state.
- The approved version remains immutable but can be copied into a new draft.
- Submitted/approved versions preserve immutable snapshots of the exact uploaded artwork bytes used, identified by checksum.
- Updating a club asset library affects only future drafts; it cannot silently alter submitted or approved designs.
- Lock immutable version identifiers for garment template, print boundaries, pattern, fonts, colour mapping and applicable validation rules.
- Later catalogue or rule updates cannot silently change what was approved.
- Preserve text/numbers both as editable semantic values and as exact approved visual glyph shapes or an equivalent immutable rendering.
- The exact supplier delivery mechanism for glyphs remains provisional, but substitution cannot change appearance.

### Approval versus production eligibility

- Historical approval and current production eligibility are separate states.
- Old approval remains immutable.
- Each release checks current product/template/process/rule eligibility.
- A relevant change blocks release for Pivot review and may require a revised design, proof or sample.
- Straightforward reorders may proceed without a new physical sample when nothing material has changed.
- A supplier/template change is never a silent migration. Existing recovered decisions require a managed discussion with affected clubs, sample review, design remediation where necessary and fresh approval.

### External rules and overrides

- Not every blocking rule is overrideable.
- Non-overridable examples include missing final approval, an unvalidated production template, physically impossible/out-of-bound artwork, missing required artifacts, and unsafe conditions.
- Only rules explicitly classified as reviewable may be accepted by an authorised Pivot person, with reason and evidence.
- Pivot cannot waive another organisation's requirement through internal judgement alone.
- Competition-rule or supplier-constraint exceptions require documented acceptance from the relevant authority/supplier, attached to the release record.

### Sampling decision

- The system applies the agreed risk criteria and recommends whether a physical sample is required.
- An authorised Pivot person must confirm both `sample required` and `sample not required` outcomes.
- Record decision, reason, actor and timestamp in the release manifest.

### Supplier-requested changes after release

- Non-visual technical production preparation may be recorded by Pivot without new club approval.
- Any supplier-requested change affecting appearance, product specification, quality or compliance creates a new version and returns through proof/approval.

### Structured internal manifest

- Every design release has a Pivot-owned, versioned, machine-readable internal manifest as well as a human-readable PDF.
- The manifest is not the supplier's format and does not pre-empt unknown supplier requirements.
- It records structured references for the immutable design, product, assets, colours, validation, proof and approvals.
- Retain the complete validation snapshot, not just `passed`: applicable rule/version, pass/warning/manual-review result, approved exceptions, evidence and Pivot reviewer.
- Later rules cannot rewrite the historical validation report.

### Production status and supplier acknowledgement

Keep distinct states for:

1. authorised by Pivot;
2. sent to supplier; and
3. received/accepted or rejected by supplier.

- Phase 1 can record acknowledgement manually and attach email/job-reference evidence.
- Do not imply acceptance merely because Pivot sent a package.
- Automation may replace manual recording when validated.

### Retention

Treat the following as part of the constitutional approval record and retain them for the life of the related product/order plus seven years:

- proof and approval record;
- exact artwork snapshots used;
- release/production manifest;
- supplier artifact actually sent;
- supplier acknowledgement;
- validation and exception evidence; and
- physical-sample record.

Unused uploads remain subject to a separate future retention policy.

### Club access and Pivot protection

- Both authorised club users and the club administrator may view/download customer proofs for their own club.
- Only the administrator may approve.
- Supplier files, internal production mappings and confidential handover details remain Pivot-only.
- Formal online proof pages require authenticated, club-restricted access.
- A club may download a flattened customer-readable PDF of what it approved.
- Mark it **Design proof — not for manufacture** and include the version ID.
- Do not provide editable source, raw garment templates, production artwork, supplier files or internal colour mappings.
- Show approver name, club role and approval date in the customer approval record, but not email/authentication details.
- Clubs may download the exact original club/sponsor assets they uploaded.
- Pivot-generated templates, converted production artwork and editable/production packages remain protected.
- Exact ownership/reuse wording still requires customer terms/legal review.

### Club account record organisation

- Store proof and approval records under the relevant design in the club account; do not rely on email or a volunteer retaining a download.
- **Current records/folder:** only the active approved design, proof and approval record.
- **History tab/folder:** superseded, rejected, withdrawn and earlier approved versions.
- A pending replacement does not remove the current approved version until the replacement completes approval.

## Product and batch structure

### Product-level design releases

- Keep one coordinated club range but separate physical-product releases:
  - reversible jersey: one release containing both dark and light faces;
  - men's club polo: separate release;
  - women's club polo: separate release;
  - matching shorts, if included: separate release.
- Product-specific changes or delays do not invalidate unrelated products.

### Reversible jersey

- It is one physical, single-layer, double-sided jersey with two linked visual compositions: dark and light.
- Dark and light may be refined independently but are approved and released together.
- Neither face can be manufactured/released separately.

### Phase 1 number run

- Phase 1 uses one approved jersey design; it does not create a design per player number.
- The sponsor-funded batch uses a manual `1–40` number run as production data.
- Phase 1 does not require player roster allocation, order matching or player names.
- The base design defines interchangeable number styling.
- Player allocation, spreadsheet import, duplicate checks, order matching and approval remain Phase 2 questions.

### Design release versus production job

- Keep the approved design release separate from production batch/job data.
- Every production batch receives its own human-approved Pivot release record, even when it reuses an unchanged approved design.
- Each batch records products, quantities, production artifacts, eligibility check, release decision and supplier acknowledgement.
- This supports safe reorders without duplicating the design or repeating unnecessary sampling.

## 3D decision

The discussion corrected an overstatement that 3D was a hard pilot requirement.

Locked direction:

- Pivot wants 3D in the Phoenix pilot and should include it if it is sufficiently reliable in time.
- Failure to deliver reliable 3D does not block the Phoenix pilot or production.
- A strong 2D editor/proof is sufficient for the pilot fallback.
- 2D remains authoritative.
- Do not let inaccurate 3D misrepresent production.
- The design state should remain view-independent so reliable 3D can be added later.

This conflicts with the current Phoenix PRD, baseline and approved help copy, which promise 3D. Reconcile those documents before coding or customer exposure. Do not simply remove 3D from the long-term Pivot Design Studio proposition.

## Phase 1 product scope

Locked:

- reversible Phoenix jersey with dark and light faces;
- men's club polo;
- women's club polo.

Matching shorts are **provisional Phase 1 scope pending confirmed cost**:

- shorts do not block the core pilot;
- if approved, they receive their own design release/proof and remain coordinated with the jersey.

This latest decision resolves the earlier jersey/short/polo inconsistency only provisionally. Update governing/specification language after the cost decision.

## Supplier automation and phase distinction

Locked:

- For Phoenix Pilot Phase 1, attempt automated supplier submission/acknowledgement if dependencies are ready.
- A controlled manual fallback is acceptable for Phase 1.
- Automation is not a Phase 1 launch blocker.
- A complete end-to-end operating capability is intended as a blocker before the Winter 2027 member-ordering stage and later controlled growth.

Also locked:

- **Phoenix Pilot Phase 2 / Winter 2027 member ordering** is the live family-ordering test for jerseys and matching shorts through the Phoenix club store.
- It must prove the complete operating model and business viability.
- Pivot does not onboard other clubs until that live cycle succeeds.
- After success, selected new-club onboarding is optional at the Director's discretion and constrained by available capacity.
- Phoenix Pilot Phase 3 expands the Phoenix store/product range and may include selected new clubs, but onboarding them is not a required Phase 3 deliverable.

Still external/provisional:

- Exact supplier API/file fields, authentication, sandbox behaviour and automated status coverage remain external supplier inputs.

## Pilot timeline decisions

### Historical visual reviewed

External file reviewed:

`C:\Users\kylie\SynologyDrive\OurStuff\SynologyDrive\00 Pivot Teamwear\05 Customers\Phoenix United Basketball Development Club - Copy\Pilot_Phoenix.pdf`

It states:

- Phoenix setup in July/August 2026;
- sample reviewed/approved July;
- store/design approval and private opening August;
- manufacture/delivery September with `3–6 weeks` to be tested;
- full jersey kit available/orders open February 2027;
- full catalogue later.

Treat it as historical/provisional. Its final `AUG 2026` milestone appears to be a likely typo for August 2027, and its February order-opening wording may differ from the newer likely March ordering window. Kylie will prepare a proper pilot timeline.

### Current operating targets

- Phoenix Winter 2027 capability should be ready in February 2027.
- Member ordering is likely in March 2027.
- Pivot's internal delivery target should be before the season/grading period where practical.
- The hard customer need is before the first post-grading game, because matched uniforms are not required during the four grading weeks.

### School-calendar dates, with BBA confirmation required

Use actual Victorian school-calendar anchors, but label every competition date **TBC by BBA**:

- Summer 2026/27 starts: Monday 5 October 2026.
- Summer finals complete by: Thursday 25 March 2027.
- Winter 2027 starts: Monday 12 April 2027.
- Four-week grading ends: Sunday 9 May 2027.
- Matched uniforms required from: Monday 10 May 2027.
- Winter finals complete by: Friday 17 September 2027.
- Summer 2027/28 starts: Monday 4 October 2027.

These are school-calendar-derived planning dates based on historical BBA behaviour, not published BBA fixtures.

BBA's public Season Dates page was checked during the session:

`https://bendigobasketball.com.au/domestic-basketball/season-dates/`

It listed Winter 2026 and Summer 2025/26 but not Summer 2026/27. A PlayHQ competition invitation had appeared for club administrators but was deleted when Kylie checked. Do not infer cancellation. Replace planning dates with official BBA dates when published.

## Explicitly discarded or not locked

- Do not add a new supplier-disqualification criterion to this specification from the brief rabbit-hole discussion. Kylie confirmed the relevant supplier requirements already exist in her supplier assessment/validation workbook. This design-tool handover only needs supplier-specific output fields marked external/provisional.
- Do not lock a Phase 2 personalisation-allocation snapshot yet.
- Do not lock spreadsheet import, individual player approval, duplicate-number prevention, roster matching or child-data handling; these remain Phase 2 decisions.
- Do not treat 3D as a production authority or a pilot blocker.
- Do not treat the school-calendar-derived competition dates as BBA-confirmed.

## Remaining production-output work

After answering the full-cycle/controlled-growth gate question, the production-output branch can be closed with a concise summary. Supplier-specific fields remain external inputs rather than more speculative questions.

Then resume the broader unresolved list from the earlier handover, prioritising:

1. reconcile the updated decisions into `spec.md`, PRD/help copy and related documents before coding;
2. exact editor behaviour that does not depend on missing supplier data;
3. automatic colour extraction versus direct colour entry;
4. completed-design import/conversion boundary;
5. authentication/security (switch reasoning to `max`);
6. storage/infrastructure/data residency (switch reasoning to `max`);
7. pilot acceptance testing, supported devices/browsers and accessibility target;
8. external Phoenix assets/approvers and supplier technical inputs.

## Files changed in this pause

- Added this handover file.
- Added a pointer from `grill-me-handover.md` to this later handover.
- No product specification or implementation code was changed.
