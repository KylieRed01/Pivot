# Pivot Grill-Me Handover — Security and Infrastructure

**Date:** 2026-07-16  
**Status:** Session paused after the requested 30-minute continuation.  
**Resume command:** `grill-me Continue from specs/pivot-design-tool-baseline/grill-me-handover-security-infrastructure.md`

## Resume instructions

1. Read this file completely.
2. Read `specs/pivot-design-tool-baseline/grill-me-handover-editor-product.md` and the earlier handovers it links to.
3. Follow the linked-document reading instructions in the earliest handover.
4. This file contains the latest decisions and supersedes earlier handovers where they conflict.
5. Continue one genuinely unresolved question at a time and include a recommendation.
6. Current reasoning level is `max`; keep it at `max` for security, authentication, privacy, storage, infrastructure, supplier integration, production export, and detailed 2D-to-3D architecture.
7. Do not ask Kylie to approve standard or mandatory technical safeguards when there is only one responsible baseline. Decide and record those requirements. Ask only where:
   - multiple valid options materially affect product scope, cost, risk, or user experience;
   - Pivot must consciously accept a meaningful risk;
   - the answer depends on business facts only Kylie knows; or
   - Director authority is genuinely required.
8. Do not update implementation code yet. Finish the grill, produce reconciliation/register outputs, and update governing/specification documents together.

## Exact resume point

The latest recovery expectations were accepted:

- no acknowledged approval, release, or audit event may be lost;
- recoverable draft work may lose no more than five minutes;
- the core service should be restorable within four hours during the pilot;
- Pivot must maintain a documented manual contingency for urgent work.

Resume the `max` branch with the next unresolved storage/infrastructure decision. Recommended sequence:

1. establish data classification and prohibited/sensitive data boundaries;
2. define the production storage and backup architecture requirements;
3. define vendor-selection and Australian-data-residency evidence requirements;
4. cover logging, monitoring, incident response, privacy requests, and breach response;
5. close remaining authentication/session/recovery details that require product decisions;
6. then continue into detailed 2D-to-3D architecture, supplier integration, and production-export architecture as time/context permits.

Do not ask Kylie to choose technical vendors without first researching and comparing their documented residency, backup, subprocessor, security, export, cost, and operational characteristics.

## Meta-instruction from Kylie

At the end of the complete grill, provide:

1. a consolidated action list covering decisions/approvals, assets and information, suppliers/specialists, legal/privacy review, infrastructure validation, owners, deadlines, fallbacks, and blockers;
2. entry-ready **Decision Register** items;
3. entry-ready **Assumptions Register** items; and
4. identified risks, dependencies, and external inputs for their respective registers.

For register entries, include at least: concise title, statement, rationale/source, owner, status, validation or review trigger, and affected documents. Add deadline, fallback, and blocker fields where applicable.

The registers are external to this repository in `C:\Users\kylie\SynologyDrive\OurStuff\SynologyDrive\00 Pivot Teamwear\01 Business\Business Register.xlsx`. The workbook has been inspected read-only. At the end of the grill, provide entry-ready content using its existing schemas; do not modify the workbook unless Kylie explicitly requests it.

Relevant workbook columns:

- **Actions:** `#`, `Business Area`, `Task`, `Description`, `Owner`, `Priority`, `Due Date`, `Status`, `Waiting On`, `Evidence / Outcome`, `Notes`
- **Decisions:** `#`, `Business Area`, `Decisions`, `Decision`, `Owner`, `Date`, `Reason`
- **Assumptions:** `#`, `Business Area`, `Assumptions`, `Status`, `Owner`, `Date`, `Validation Method`
- **Risks:** currently blank and has no established column schema
- **Issues:** currently contains only an `Issue` heading

Follow the workbook rule that actions represent meaningful work outcomes (normally 30 minutes to one day), while decisions record direction; do not mix actions and decisions.

## Decisions completed in this continuation

### Text controls

Phase 1 baseline text controls are:

- editable wording;
- approved font selection;
- colour;
- size;
- proportional scaling;
- movement and rotation;
- alignment;
- letter and line spacing;
- approved outlines where production supports them;
- layer ordering, duplication, and deletion.

Curved text and other decorative effects are deferred until validated.

### Design naming and duplication

- Users assign a descriptive, editable design name.
- Names need not be unique because the internal design/version ID is authoritative.
- `Duplicate` copies the exact selected version, not implicitly the latest draft.
- It opens as an independent draft with a suggested name such as `[Original name] — Copy`.
- The user may keep or rename the suggestion.
- Approvals and workflow status never carry into the duplicate.
- Retain an internal source-design/source-version link for traceability.
- Keep the user experience to a simple `Duplicate` action followed by optional renaming; hide technical traceability details.

### Design comparison

- General arbitrary multi-version comparison is not required.
- A limited `Compare with current design` action may show a proposed replacement beside the current approved design using matching 2D views.
- This is a useful bonus/preferred enhancement, not a Phase 1 pilot blocker.

### Official-logo cleanup boundary

- An approved official logo may be moved and proportionally resized in a design.
- `Clean up logo` creates a proposed variant for background removal and trimming blank space.
- Cleanup is non-destructive and preserves the original.
- A cleaned variant requires administrator approval before becoming an official logo asset.
- Rotation, opacity changes, recolouring, mirroring, distortion, and cropping into the actual logo remain prohibited.

### Template switching

- A draft may switch only among compatible templates for the same physical-product category, such as supported jersey cuts.
- Preserve club colours, text, and artwork.
- Preserve placement only where a validated mapping exists.
- Put incompatible/unmapped content into a clear `Needs placement` state rather than deleting it.
- Preview consequences and require confirmation before switching.
- The action must be undoable.
- An approved design must first be duplicated into a new draft.

### In-editor help

- No mandatory tutorial, unsolicited pop-ups, or chatbot.
- Use clear labels and concise contextual guidance.
- Provide a visible Help control that opens guidance without losing editor state.
- Explain restrictions/errors contextually and provide corrective actions where practical.
- Include an optional short introductory video.
- A `Show me` action may highlight the relevant control where useful.

### Accessibility

- Adopt WCAG 2.2 Level AA as the formal customer-facing target, including the editor.
- Provide keyboard-operable structured alternatives to direct canvas interaction.
- Do not make designing depend solely on dragging, colour perception, motion, or 3D interaction.
- This target must be tested rather than treated as an aspirational statement.

### Browser/device support

Formal testing baseline:

- latest two supported versions of Chrome, Edge, Firefox, and Safari on desktop;
- Safari on current/recent supported iPhones and iPads;
- Chrome on current/recent supported Android phones and tablets.

Public pages, sign-in, club stores, proof review, and approvals must work on phones. Desktop/tablet remain the reliable precision-editor baseline. Full phone editing remains preferred but is not a pilot blocker. Internet Explorer and embedded social-media browsers are unsupported. Include actual Phoenix volunteer devices in pilot testing.

### Pilot usability testing

- Test with 5–8 Phoenix volunteers spanning relevant roles, technical confidence, and devices.
- Use realistic tasks: club-asset setup, create/edit, save/reopen, submit, proof review, and administrator approval.
- Observe without coaching unless a participant is blocked.
- Record task completion, errors, help required, and participant feedback.
- A problem preventing a core task must be resolved before live pilot use.

### Preferred enhancement list

The following are desirable but must not delay the core Phoenix pilot:

- reliable 3D visualisation;
- full phone editing;
- automatic logo-colour extraction;
- user-invoked automatic background removal;
- side-by-side design comparison;
- automated supplier submission and acknowledgement;
- matching shorts, pending confirmed cost.

This classification consolidates earlier locked decisions and should not be re-asked.

## Security decisions completed

### Zero-trust upload pipeline

Every upload is untrusted and must:

1. enter private quarantine;
2. have its actual content/type verified independently of its name or declared MIME type;
3. pass explicit byte-size, image-dimension, complexity, and processing-time limits;
4. be malware scanned;
5. be processed in an isolated, low-privilege, network-restricted worker;
6. have unsafe/unneeded metadata removed from display derivatives;
7. have active formats such as SVG/PDF sanitized or safely converted rather than served directly;
8. remain unusable until all required checks pass; and
9. use safe generated derivatives in the editor while retaining any required original privately under strict authorisation.

No scanner is treated as a guarantee; defence in depth is mandatory. Rejected executable content, scripts, macros, archives, and malformed/polyglot files must never enter the editor.

### Phase 1 upload-format boundary

Set the simple customer upload boundary to:

- PNG, JPEG, and WebP for ordinary raster images;
- HEIC/HEIF from phones, converted to a safe derivative;
- sanitized SVG for vector logos/artwork;
- safely processed PDF for authenticated completed-design onboarding/reference.

Specialist source formats such as AI, EPS, PSD, or archives do not open directly in the editor. Authenticated clubs may route genuinely needed specialist files through controlled Pivot assistance. Confirm actual Phoenix/supplier source formats before release; add support only through a reviewed safe pipeline.

### Club-administrator nomination/replacement

- An initial or replacement club administrator must be nominated in writing by the club's recorded President, Secretary, or equivalent authorised office bearer.
- Pivot independently verifies the request using trusted club contact details already held or obtained from an official source, not only details supplied in the request.
- Notify the outgoing administrator of replacement.
- Freeze disputed or unverifiable changes until authority is established.
- Any Director exception must be documented with evidence, reason, scope, and risk.

### Phase 1 authentication strength

A mandatory passkey for club administrators was considered and rejected as disproportionate for Phoenix Phase 1 because access is invitation-only, users are known, there is no member ordering/payment, data is limited, and Pivot independently reviews/releases production.

Phase 1 uses:

- passwordless email-link access for club users and administrators;
- short-lived, single-use links;
- fresh reauthentication before formal approvals, official-asset decisions, or access changes;
- no self-service administrator email change;
- immediate security notifications for consequential account and approval actions;
- rapid revocation and complete audit history;
- optional passkeys, not mandatory;
- mandatory strong MFA for Pivot administrators.

Reassess and likely strengthen club-administrator MFA before Phoenix Pilot Phase 2 member ordering/payment and broader club onboarding. Email compromise remains a residual Phase 1 risk mitigated by verified appointment, fresh authentication, notifications, club/Pivot separation, and independent Pivot release.

### Public and unused-upload retention

- Public-trial uploads are temporary and deleted when the session expires, with a hard maximum of 24 hours.
- An authenticated upload may be automatically deleted after 90 days only when it is not linked to a draft/design, asset proposal/library item, approval/production record, or active Pivot-assistance case.
- Give the club 14 days' warning before deleting a genuinely unused authenticated upload.
- Referenced artwork follows the relevant design/approval/production retention rule.
- Malicious/rejected bytes should not be retained merely for convenience; retain only the minimum safe security/audit metadata needed.

### Abandoned unsubmitted drafts

- Mark an unsubmitted draft inactive after 12 months without editing.
- Notify the club before deletion.
- Delete after 24 months of inactivity.
- Provide a 30-day recovery period.
- Never delete a draft under review, on hold, or linked to an active support case.
- Removing a person from a club does not delete club-owned drafts.
- Submitted/approved records remain governed by their separate immutable long-term retention requirements.

## Infrastructure facts and decisions

- Pivot currently has no preferred cloud provider, hosting account, or target monthly technology budget.
- Provider selection remains external/provisional and must operate within the constitutional rules.
- Production customer data, uploaded artwork, database backups, and audit records must be held in Australia.
- Global delivery is allowed only for static public assets.
- Selecting an `Australia` compute region is not enough: database replicas, object storage, backups, logs, authentication data, email payloads, support access, subprocessors, analytics, malware scanning, and disaster-recovery copies all require validation.
- Optimise for a low-maintenance managed platform, but do not choose solely on price. Require evidence of Australian residency, secure operation, exportability, and a viable exit path.

### Recovery targets

Accepted business targets:

- no acknowledged approval, release, or audit event may be lost;
- recoverable draft work may lose no more than five minutes;
- restore the core service within four hours during the pilot;
- maintain a documented manual contingency for urgent work.

Translate these into explicit backup, replication, point-in-time recovery, restore-testing, and incident procedures during planning. `No acknowledged event loss` requires durable transactional acknowledgement and cannot rely on periodic backups alone.

## Documents read during this continuation

Completely read or extracted and reviewed:

- `specs/pivot-design-tool-baseline/grill-me-handover-editor-product.md`
- `specs/pivot-design-tool-baseline/grill-me-handover-production-output.md`
- `specs/pivot-design-tool-baseline/grill-me-handover.md`
- `specs/pivot-design-tool-baseline/grill-me-reconstruction.md`
- `specs/pivot-design-tool-baseline/spec.md`
- `specs/pivot-design-tool-baseline/brief.md`
- `specs/pivot-design-tool-baseline/prd.md`
- `specs/pivot-design-tool-baseline/issues.md`
- `docs/Pivot Constitution.md`
- `docs/Phoenix Phase 1 PRD.md`
- `docs/brand/Brand Kit_V1.00.pdf`
- `docs/brand/Visual Design Guide_V1.00.pdf`
- `docs/Business Plan_V1.00.pdf`
- `docs/Operating Model_V1.00.pdf`
- `README.md`
- `package.json`

The current repository is a dependency-free Node.js demonstrator using `data/state.json`; it has no production identity provider, database, object storage, deployment configuration, infrastructure provider, or production security architecture. Do not let demonstrator choices constrain the permanent architecture.

## Reconciliation reminders

Do not update these piecemeal. After the grill, reconcile together:

- `docs/Business Plan_V1.00.pdf`
- `docs/Pivot Constitution.md`
- `docs/Operating Model_V1.00.pdf`
- `docs/Phoenix Phase 1 PRD.md`
- `specs/pivot-design-tool-baseline/spec.md`
- related PRD/help/FAQ copy
- external `Pilot_Phoenix.pdf`
- security/privacy/retention standards or registers that must be created

Known conflicts remain in old documents, including coach/club-polo terminology, older role counts, 3D as a hard requirement, older pilot products/timing, fixed-position editor assumptions, automatic colour extraction promises, public completed-design conversion promises, and phase terminology.

## Files changed in this continuation

- Added this handover file.
- No implementation code or baseline/governing specification was changed.
