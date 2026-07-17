# Pivot Grill-Me Handover — Security and Infrastructure

> **Later session:** Continue with `specs/pivot-design-tool-baseline/grill-me-handover-cloud-provider-selection.md`, which supersedes this file where decisions conflict.

**Date:** 2026-07-17
**Status:** Continued in a fresh chat. Candidate-provider research and the vendor evidence gate are complete. No provider is selected; the Phase 1 monthly production-technology budget is the current business question.
**Resume command:** `grill-me Continue from specs/pivot-design-tool-baseline/grill-me-handover-security-infrastructure.md`

## Resume instructions

1. Read this file completely.
2. Read `specs/pivot-design-tool-baseline/grill-me-handover-editor-product.md` and the earlier handovers it links to.
3. Follow the linked-document reading instructions in the earliest handover.
4. This file contains the latest decisions and supersedes earlier handovers where they conflict.
5. Continue one genuinely unresolved question at a time and include a recommendation.
6. Current intelligence/reasoning level is `max`; keep it at `max` for security, authentication, privacy, storage, infrastructure, supplier integration, production export, and detailed 2D-to-3D architecture. Kylie asked for explicit cues before changing intelligence: cue `Max` for those high-risk branches and `High` for lower-risk product behaviour, editor workflow, document reconciliation, register preparation, and summaries.
7. Do not ask Kylie to approve standard or mandatory technical safeguards when there is only one responsible baseline. Decide and record those requirements. Ask only where:
   - multiple valid options materially affect product scope, cost, risk, or user experience;
   - Pivot must consciously accept a meaningful risk;
   - the answer depends on business facts only Kylie knows; or
   - Director authority is genuinely required.
8. Do not update implementation code yet. Finish the grill, produce reconciliation/register outputs, and update governing/specification documents together.

## Exact resume point

Keep intelligence at `max`. Cloud-provider ownership has been resolved as described under **Cloud-provider ownership and compliance** below.

Official-evidence research is recorded in `specs/pivot-design-tool-baseline/cloud-provider-comparison.md`. AWS is the strongest provisional primary-platform candidate, but no provider has been selected.

The current unanswered question is:

> Is a Phase 1 production-technology target of up to AUD 250 per month excluding GST, with Director review before forecast recurring spend exceeds AUD 300 per month, an acceptable planning boundary?

Recommended answer:

- Yes. Use AUD 250/month as the target and AUD 300/month as a review threshold, not an automatic entitlement to spend.
- Include primary hosting, Australian recovery capacity, independent encrypted backup, ordinary logs/monitoring, minimal transactional email, and low pilot usage.
- Exclude one-off development work, domain registration already paid elsewhere, and temporary test resources that are shut down when unused.
- Validate the estimate with a small proof of concept and actual first-month billing before production approval.
- If the evidenced design cannot stay within this boundary, return with the exact requirement driving the cost and a simpler alternative; do not silently buy enterprise services.

After resolving the budget, continue the `max` branch in this order:

1. decide whether to accept AWS as the provisional provider for a bounded proof of concept, not final production approval;
2. close any remaining provider/data-residency evidence gaps exposed by that proof of concept;
3. cover logging, monitoring, incident response, privacy requests, and breach response;
4. close remaining authentication/session/recovery details that genuinely require product decisions; and
5. then continue into detailed 2D-to-3D architecture, supplier integration, and production-export architecture as time/context permits.

Do not ask Kylie to make a final technical-vendor selection until the proof of concept and evidence closure validate residency, processing locations, human access, backups, subprocessors, security, export, cost, and operational characteristics.

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

## Data classification and prohibited-data decisions

The mandatory Phase 1 classification baseline is:

- **Public:** approved website content and static public assets.
- **Club-confidential:** club contacts, branding, uploaded artwork, drafts, proofs, and club support records.
- **Pivot-restricted:** supplier identity, internal templates and production mappings, costs, internal notes, credentials, security information, and operational evidence not intended for clubs.
- **Critical/immutable:** formal approvals, attestations, releases, holds and stop outcomes, audit events, proof artifacts, production manifests, and the exact supplier packages and acknowledgements.

Phase 1 does not require and must prohibit collection through ordinary workflows of:

- payment-card or bank information;
- account passwords;
- government identifiers or identity documents;
- health or biometric data;
- dates of birth;
- player rosters;
- children's contact details; or
- unrelated sensitive personal information.

Ordinary uploads must also prohibit identifiable photographs of people, including players, and files containing embedded personal information. A future use case involving personal imagery requires a separately designed and reviewed authority, consent, child-safety, rights, retention, and privacy process.

Do not ask Kylie to approve ordinary safeguards arising from this classification. Apply data minimisation, purpose limitation, least privilege, club isolation, encryption, secure deletion, and redaction from logs and notifications as mandatory requirements. Where Australian legal applicability requires professional interpretation, establish the conservative baseline and create a legal/privacy-review action rather than asking Kylie to act as legal counsel.

## Infrastructure facts and decisions

### Phase 1 proportionality boundary

- Pivot is building a small, controlled Phoenix Phase 1 pilot with known invitation-only users, no member ordering or payments, prohibited sensitive-data categories, low expected traffic, and manual production fallbacks. It is not an enterprise platform.
- `Max` reasoning means careful risk analysis and proportionality, not maximal controls or enterprise architecture.
- Prefer the fewest low-maintenance managed components that can satisfy the accepted requirements.
- Do not introduce Kubernetes, microservices, active-active multi-cloud runtime, a 24/7 security operations centre, enterprise SIEM, a retained MSP, broad compliance certification programmes, or similar machinery unless a later requirement and evidence genuinely justify it.
- Keep safeguards that directly protect customer data, club isolation, formal approvals, exact production records, Australian handling, and the accepted recovery targets; defer scale-oriented machinery until Phase 2 or demonstrated need.
- If a safeguard would materially increase cost or ongoing work, quantify the risk, simpler alternative, and residual risk before treating it as mandatory.
- Reassess the boundary before Phase 2 ordering/payment, broader club onboarding, sensitive personalisation, or a material increase in data or operational dependence.

### Cloud-provider ownership and compliance

- Australian ownership is not mandatory for Pivot's cloud provider.
- Australian ownership and sovereign operation are favourable evidence, not substitutes for service-level validation.
- An overseas-owned provider may qualify only when every service used demonstrably satisfies Pivot's Australian storage, processing, human-access, backup, recovery, security, exportability, operational-effort, and cost requirements.
- Exclude any provider that cannot prove the complete boundary, including subprocessors and support paths.
- This is consistent with the current Constitution, which requires relevant production records to be held in Australia but does not require Australian provider ownership.
- Provider nationality alone is not determinative under the Australian Privacy Principles. Overseas access or disclosure may engage APP 8, while APP 11 requires reasonable technical and organisational safeguards and oversight of cloud providers.
- The preferred provider, service boundary, subprocessors, and contractual terms require Australian privacy/legal review before commitment or production use, including review of any customer, insurer, supplier, or future regulated-data obligations.
- This decision does not prescribe or constrain an authorised overseas manufacturer's production workflow.

### Candidate-provider research

- The official-evidence comparison is recorded in `specs/pivot-design-tool-baseline/cloud-provider-comparison.md`.
- AWS Sydney plus Melbourne is the strongest provisional primary-platform candidate because it provides the required Australian regions and managed recovery features at the lowest evidenced small managed-HA database cost among the hyperscalers compared.
- Google Cloud is a viable secondary candidate and a strong independent encrypted-backup option, but its small managed database baseline is higher, it has no native transactional email equivalent, its identity service was not in the reviewed configurable data-residency list, and its Australian support package permits personnel in five countries rather than Australia only.
- Azure is technically capable but currently disproportionate: zone-redundant PostgreSQL excludes the inexpensive Burstable tier, cross-region recovery adds another server, and reviewed Azure email documentation specifies United States data location.
- AUCyber has the strongest public sovereign-data claim and useful S3-compatible immutable backup, but is sales-led, quote-only, and oriented toward government/critical-industry IaaS; assess it only as a narrowly scoped recovery target unless evidence changes.
- Binary Lane is inexpensive and Australian-hosted but is excluded under current public terms and service evidence: no comparable managed database/recovery boundary, non-binding service levels, no provider backup obligation, immediate termination exposure, and disproportionate self-management.
- AWS still requires a proof of concept and evidence closure for SES regional fallback, identity recovery, overseas support-content controls, malware-scanning processing/opt-out, critical-event durability, actual cost, and independent Australian recovery storage.
- The vendor-selection evidence gate covers contracts/subprocessors, complete data flows, Australian configuration proof, human access, security/recovery, export, deletion, commercial terms, cost and change monitoring.
- Pivot currently has no hosting account or approved monthly technology budget.


- Provider selection remains external/provisional and must operate within the constitutional rules.
- Production customer data, uploaded artwork, database backups, and audit records under Pivot's control must be stored and processed in Australia.
- Global delivery is allowed only for static public assets.
- Selecting an `Australia` compute region is not enough: database replicas, object storage, backups, logs, authentication data, email-service payloads, support access, subprocessors, analytics, malware scanning, and disaster-recovery copies all require validation.
- Optimise for a low-maintenance managed platform, but do not choose solely on price. Require evidence of Australian residency and processing, secure operation, controlled human access, exportability, and a viable exit path.

### Australian access and controlled cross-border exceptions

- Pivot and vendor administrative/support personnel must not access production customer content from outside Australia.
- Production administration by Pivot personnel while overseas is prohibited during the pilot.
- Overseas support personnel may use non-sensitive service telemetry but may not access customer content.
- Third-party authentication, malware scanning, logging, analytics, monitoring, backup, and similar services must store and process customer data in Australia.
- Delivery of a minimal email to a user's chosen email provider is an unavoidable recipient-controlled exception. Transactional emails should contain secure links and minimal context, not artwork, proofs, or sensitive details.
- An authorised overseas manufacturer is a separate, narrow exception: after formal release, it may receive only the exact minimum immutable package needed for manufacture.
- The supplier must not receive access to Pivot's live platform, database, club libraries, drafts, unrelated proofs, audit history, or other customer records.
- Pivot retains the exact exported package and checksum in Australia and records its destination, transmission, and acknowledgement.
- Supplier terms must address authorised access, security, reuse, subprocessors, retention, deletion, incident notification, and breach handling.
- Phase 1 supplier packages contain no player personal information. Future names, individual orders, or other personalisation require separate cross-border privacy and legal review.
- The Constitution's Australian-residency wording needs clarification during final reconciliation so that it protects Pivot's authoritative platform while expressly recognising this controlled manufacturing-export exception.

### Supplier integration and production-line guardrail

- Pivot hopes to automate supplier handover through APIs, while retaining the previously agreed controlled manual Phase 1 fallback.
- `Release-scoped outbound submission` describes Pivot's authorisation and data boundary; it does not lock a network protocol.
- API push is preferred where supported, but a one-job scoped pull, secure portal/SFTP transfer, or controlled manual handover may be used depending on verified supplier capabilities.
- Status may return by authenticated webhook, polling, portal evidence, or manual acknowledgement. The exact mechanism remains provisional.
- Credentials and package access must be limited to the released job; no mechanism may grant broad access to Pivot's platform.
- Do not lock supplier API schemas, authentication protocols, file formats, job states, artwork-preparation steps, machine workflows, or status coverage before supplier requirements are known.
- Security decisions govern Pivot's platform, release, audit, and transfer boundary only. Any decision affecting the supplier's manufacturing or production line remains an external/provisional input until validated with the selected supplier.

### Recovery and service-hours decisions

Accepted business targets and interpretations are:

- no acknowledged approval, release, or audit event may be lost;
- recoverable draft work may lose no more than five minutes;
- there is no customer-facing promise of 24/7 availability or staffed support;
- the internal core-service recovery target is four **support-hours**;
- recovery support-hours are 7:00 am–7:00 pm Melbourne local time, every day;
- the recovery clock pauses outside that window—for example, an outage at 6:00 pm has a 10:00 am next-day target;
- automated monitoring and alerting continue outside support-hours, without creating a general 24/7 staffed-response promise;
- pre-declared critical approval or production windows may receive temporary extended/on-call coverage; and
- Pivot must maintain a documented manual contingency for urgent work.

The four-support-hour target applies to the authenticated core service:

- sign-in and authorised club/Pivot access;
- club designs, assets, and recoverable drafts;
- authoritative 2D editing and records;
- proofs and approval records;
- holds, stop requests/outcomes, production releases, and audit history; and
- the administration needed to operate those capabilities safely.

Public trials, 3D visualisation, videos, analytics, and optional automation may remain degraded or recover later.

During an outage:

- Pivot may communicate urgent holds and stop requests and prepare approval or production evidence;
- Pivot must not issue a new release to manufacture until the authoritative system can durably record it; and
- delaying manufacture is preferable to making an unauditable commitment.

Mandatory architecture consequences—not Director choice questions—include private Australian storage, durable transactional acknowledgement for critical events, multi-zone persistence, point-in-time recovery, private versioned/immutable artifact storage, separate encrypted Australian backups, and tested restoration. Periodic backups alone cannot satisfy `no acknowledged event loss`. The detailed backup retention, replication, restoration, and continuity procedures still need to be specified and validated.

### Complete primary-region recovery

- Complete loss or unavailability of Pivot's primary Australian cloud region remains inside the four-support-hour core-service recovery target.
- Maintain a recoverable deployment boundary in a second Australian region; active-active operation is not required by default.
- Every acknowledged critical approval, release, hold/stop outcome, and audit event must already be durably preserved outside the primary region before success is reported.
- Recoverable draft replication must remain within the five-minute loss limit.
- Validate second-region residency, processing, access, replication, recovery timing, and cost during provider selection and through timed exercises.
- Two regions from one provider do not by themselves address a catastrophic provider-wide failure.

### Provider-wide catastrophe

- A catastrophic outage affecting all usable Australian regions of the primary provider may exceed the ordinary four-support-hour target.
- The provisional Phase 1 provider-wide core recovery target is 24 support-hours.
- Active multi-cloud operation is not required for Phoenix Phase 1 solely to meet the ordinary target during this rare event.
- The no-loss requirement for acknowledged approvals, releases, hold/stop outcomes, audit events, and their referenced immutable artifacts still applies.
- Before acknowledging a critical action, preserve its immutable event receipt, exact referenced artifact or package, and checksum in an independently controlled Australian recovery store outside the primary provider's failure boundary.
- Maintain provider-independent encrypted Australian backups, portable data/artifact exports, reproducible infrastructure/configuration records, independently recoverable encryption keys, and a tested alternate-provider rebuild path.
- Use the manual contingency until the authoritative service is restored; no new manufacturing release may occur outside it.
- Reassess the provider-wide exception before Phase 2 ordering/payment and before pre-declared critical production windows.

### Production backup and restoration baseline

These are mandatory technical controls rather than Director-choice questions:

- Use synchronous multi-zone persistence for the primary transactional database and continuous transaction logging with at least 35 days of point-in-time recovery.
- Replicate recoverable drafts to the second Australian region with no more than five minutes of lag.
- Treat a consequential action as acknowledged only after its authoritative transaction/audit event and every required immutable artifact are durable across the required failure boundaries. Use unique event IDs and idempotent recovery so an uncertain response cannot create duplicate approvals or releases.
- Keep production artifacts private, checksummed, versioned, and immutable where they form part of an approval or production record. Replicate them to the second Australian region and preserve critical copies outside the primary provider.
- Create encrypted provider-independent Australian recovery backups under credentials and deletion authority separate from production. Production roles must not be able to alter or delete those copies.
- Retain ordinary full-system recovery points for no longer than necessary: daily recovery copies for 35 days and weekly recovery points for 13 weeks. Use the authoritative immutable archive—not indefinite generic backups—to meet the life-of-product/order-plus-seven-years record rule.
- Keep deleted personal information in expired backups beyond ordinary use, prevent restoration except for genuine recovery, reapply the deletion ledger after restoration, and allow those copies to age out within the 13-week maximum unless law or an active hold requires otherwise.
- Store recovery keys and sealed break-glass material separately from the primary provider, with access logging and at least two recoverable custodial paths. Losing a primary-provider key service must not make independent backups unusable.
- Monitor backup, replication, immutability, and checksum status automatically. A failed or stale protection job must alert the responsible person and cannot silently reduce the recovery boundary.
- Run automated integrity checks for every backup; a monthly isolated database/object sample restore; a quarterly isolated full-core restore and reconciliation; a timed second-region exercise at least every six months; and a provider-independent alternate rebuild before production, annually thereafter, after material recovery changes, and before Phase 2.
- Time exercises against the four- and 24-support-hour targets and retain evidence, issues, remediation owner, and completion date. An unresolved failed restore is a production-readiness blocker for affected critical work.
- Back up and test all dependencies needed for safe operation, including database schema, private artifacts, audit receipts, approved configuration, infrastructure definitions, dependency/version manifests, access policy, identity recovery configuration, and documented secret rotation—not only customer rows.

### Phase 1 recovery ownership

- Kylie is the primary recovery owner.
- Cameron, Kylie's husband and a Caylios co-founder/shareholder, is the named Phase 1 emergency recovery alternate.
- Cameron's role is exceptional continuity assistance, not routine administration, rostered support, or an employment role prescribed by this architecture.
- Use a written emergency delegation from the correct legal entity, an individual break-glass account with strong MFA, least privilege, access logging, confidentiality/privacy acknowledgement, and brief recovery familiarisation/testing.
- Cameron receives no automatic club-approval, Pivot technical-approval, or production-release authority from this recovery role.
- A retained MSP is not required by default. Obtain on-demand specialist or provider support only if an incident or later evidence requires it.
- Product/security documentation must not attempt to determine Cameron's employment or tax status; seek accounting/legal advice only if the proposed business arrangement creates a genuine question outside this architecture.

### Manual outage contingency baseline

- Maintain a minimal encrypted Australian-hosted continuity register independent of the primary failure boundary, plus a sealed offline recovery pack physically held in Australia.
- Keep current verified contacts and escalation paths for Pivot, club administrators, the supplier, hosting/authentication services, and legal/privacy response.
- Accept any credible urgent hold or stop report and issue a precautionary hold/stop request without waiting for perfect verification; independently verify identity and authority before resolving or lifting it.
- Record a unique incident/reference ID, request source, verification, exact Melbourne and UTC times, affected design/job, reason, communications, evidence, supplier response, status, and responsible Pivot actor.
- Formal approvals may be prepared as pending evidence during an outage but do not become an acknowledged platform approval or justify manufacture until durably recorded and reconciled in the authoritative service.
- Do not create a new production release, lift a hold, or claim supplier cancellation solely through the contingency process. Delaying manufacture remains the safe default.
- Reconcile every manual event into the restored authoritative history without overwriting original evidence; obtain independent review where another authorised person is available.
- Test the manual process with each six-month regional recovery exercise and before any pre-declared critical production window.

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

- Updated this handover with cloud ownership, recovery targets and controls, Phase 1 proportionality, recovery ownership, and provider-research outcomes.
- Added `specs/pivot-design-tool-baseline/cloud-provider-comparison.md` with official-source evidence, indicative costs, exclusions, evidence gaps, and the vendor-selection gate.
- No implementation code or baseline/governing specification was changed.
