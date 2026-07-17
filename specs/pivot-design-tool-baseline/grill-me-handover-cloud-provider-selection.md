# Pivot Grill-Me Handover — Proportionate Cloud Selection

**Date:** 2026-07-17  
**Status:** Paused at Kylie's request to continue in a fresh chat. The Phase 1 monthly production-technology budget question is unanswered.  
**Resume command:** `grill-me Continue from specs/pivot-design-tool-baseline/grill-me-handover-cloud-provider-selection.md`

## Resume instructions

1. Read this file completely.
2. Read these files completely:
   - `specs/pivot-design-tool-baseline/grill-me-handover-security-infrastructure.md`
   - `specs/pivot-design-tool-baseline/cloud-provider-comparison.md`
3. Follow the linked handover/document-reading instructions in `grill-me-handover-security-infrastructure.md`.
4. This file records the latest decisions and supersedes earlier handovers where they conflict.
5. Continue one genuinely unresolved question at a time and include a recommendation.
6. Keep intelligence at **Max** for the current infrastructure/security branch. Explicitly cue **High** only when moving to lower-risk product behaviour, editor workflow, reconciliation, register preparation, or summaries; cue **Max** again before returning to security, privacy, authentication, storage, supplier integration, production export, or detailed 2D-to-3D architecture.
7. `Max` means careful reasoning and proportionality—not maximum controls. Pivot is a small, controlled pilot, not an enterprise platform.
8. Do not ask Kylie to approve ordinary safeguards when there is one responsible baseline. Ask only about material scope/cost/experience choices, meaningful risk acceptance, business facts only Kylie knows, or genuine Director decisions.
9. Do not update implementation code yet. Complete the grill and then reconcile governing/specification documents together.

## Exact resume point

The current unanswered question is:

> Is a Phase 1 production-technology target of up to **AUD 250 per month excluding GST**, with Director review before forecast recurring spend exceeds **AUD 300 per month**, an acceptable planning boundary?

Recommended answer:

- Yes.
- Treat AUD 250/month as the target and AUD 300/month as a review threshold, not an automatic entitlement to spend.
- Include primary hosting, Australian recovery capacity, independent encrypted backup, ordinary logs/monitoring, minimal transactional email, and low pilot usage.
- Exclude one-off development, domain registration paid elsewhere, and temporary test resources that are shut down when not needed.
- Validate with a bounded proof of concept, provider calculators, budget alerts, and actual first-month billing.
- If the evidenced design cannot fit, identify the exact requirement driving cost and return with a simpler alternative rather than silently introducing enterprise services.

Ask this one question first.

## Latest Director direction — proportionality

Kylie explicitly corrected the discussion when it began treating an emergency recovery role like enterprise operational staffing.

Locked direction:

- Phoenix Phase 1 has known invitation-only club users, no member ordering or payments, prohibited sensitive-data categories, low expected traffic, and controlled manual production fallbacks.
- Build the smallest low-maintenance managed solution that satisfies the accepted business requirements.
- Do not introduce Kubernetes, microservices, active-active multi-cloud runtime, a retained MSP, 24/7 SOC, enterprise SIEM, broad certification programmes, or similar machinery without evidence of genuine need.
- Keep safeguards directly tied to club isolation, customer data, formal approvals, exact production records, Australian handling, and accepted recovery targets.
- Quantify cost and operational effort before treating a materially burdensome control as mandatory.
- Reassess before Phase 2 ordering/payment, broader club onboarding, sensitive personalisation, or materially increased dependence.

## Decisions locked in this continuation

### Cloud-provider ownership and legal/compliance screening

- Australian ownership is **not mandatory**.
- Australian ownership and sovereign operation are favourable evidence, not substitutes for service-level validation.
- An overseas-owned provider may qualify only when every service used can demonstrate the required Australian storage, processing, human-access, backup, recovery, security, exportability, operational-effort, and cost boundary.
- Exclude providers that cannot prove the complete boundary, including support routes and subprocessors.
- This is consistent with the current Constitution, which requires relevant production records to be held in Australia but does not require Australian provider ownership.
- OAIC APP 8 and APP 11 guidance was checked. Provider nationality alone is not determinative; overseas disclosure/access and reasonable cloud-provider safeguards are what matter.
- Final preferred-provider services, subprocessors and terms require Australian privacy/legal review before commitment or production use.
- This decision does not constrain the authorised overseas manufacturer's production workflow.

### Complete Australian-region outage

- Complete loss/unavailability of the primary Australian region remains inside the four-support-hour core recovery target.
- Maintain a recoverable boundary in a second Australian region; active-active operation is not required.
- Critical acknowledged events and their required immutable artifacts must already be durably protected outside the failed primary region.
- Draft recovery lag remains no more than five minutes.
- Validate timing and cost through provider evidence and exercises.

### Catastrophic provider-wide outage

- A catastrophe affecting all usable Australian regions of the primary provider may exceed four support-hours.
- Phase 1's provisional provider-wide target is **24 support-hours**.
- Do not fund active multi-cloud runtime solely for this rare event.
- Do not weaken the no-loss rule for acknowledged approvals, releases, hold/stop outcomes, audit events, and referenced immutable artifacts.
- Maintain an independently controlled Australian recovery copy, portable exports/configuration, recoverable keys, and a tested alternate rebuild path.
- Reassess before Phase 2 and declared critical production windows.

### Backup, restore and manual continuity

The fuller mandatory baseline is in `grill-me-handover-security-infrastructure.md`. Key points are:

- managed multi-zone transactional persistence;
- at least 35 days of point-in-time database recovery;
- private versioned/immutable critical artifacts;
- encrypted independent Australian recovery copies separated from production deletion authority;
- ordinary daily recovery copies for 35 days and weekly points for 13 weeks, with long-term critical records retained in the authoritative immutable archive rather than indefinite generic backups;
- automatic protection monitoring and tested restores;
- recovery evidence and remediation of failed tests;
- a minimal independent Australian continuity register and sealed offline recovery material;
- credible urgent holds/stops are acted on conservatively;
- no new release to manufacture, hold lifting, or unconfirmed cancellation solely through the outage process; and
- all manual events are reconciled into the restored authoritative history.

Keep implementation proportionate. Exact mechanisms remain subject to proof-of-concept evidence and cost validation.

### Recovery ownership — Cameron

- Kylie is the primary recovery owner.
- Cameron is the named Phase 1 **emergency recovery alternate**.
- Cameron is Kylie's husband and a Caylios co-founder/shareholder; he is not an employee, director, or officeholder.
- Kylie clarified this is exceptional emergency assistance, not routine operations or rostered work.
- Cameron may use a formally delegated, individual, strong-MFA, least-privilege break-glass path for recovery/testing, with access logging and confidentiality/privacy acknowledgement.
- The role does not grant club approval, Pivot technical approval, or production-release authority.
- Do not require a retained MSP by default.
- Product/security documentation must not attempt to determine Cameron's tax or employment status. Seek business advice only if a genuine issue arises outside the architecture.

## Completed official-evidence provider comparison

Full evidence, sources, calculations, limitations and the vendor-selection gate are in:

`specs/pivot-design-tool-baseline/cloud-provider-comparison.md`

No provider is selected.

### AWS — strongest provisional primary candidate

Positive evidence:

- Sydney and Melbourne are Australian regions with three availability zones each.
- RDS PostgreSQL, Lambda, ECS/Fargate, S3, CloudWatch, KMS and Cognito are documented in both Australian regions.
- Amazon SES is documented in Sydney.
- Small RDS burstable instances support Multi-AZ and cross-region replication at substantially lower public list cost than the comparable managed-HA configurations found for Azure or Google Cloud.
- RDS supports 35-day automated backup retention; S3 supports cross-region replication and Object Lock.
- AWS states customer content remains in chosen regions unless movement is customer-initiated or legally required.
- AWS says customer-initiated support entities do not process customer data unless the customer agrees to share it.
- Standard PostgreSQL and S3 interfaces support exit.

Open evidence/PoC items:

- SES's regional-outage fallback because it was documented in Sydney, not Melbourne;
- Cognito/customer-identity recovery across regions;
- strict avoidance of customer content in overseas support cases;
- GuardDuty malware-processing opt-out or an isolated Australian scanner;
- critical-event/artifact durability beyond asynchronous regional replication;
- independent Australian recovery storage; and
- actual monthly cost and restore timing.

Indicative AWS Phase 1 production envelope: approximately **AUD 150–300/month excluding GST**, not a quote.

### Google Cloud — viable secondary and backup candidate

- Sydney/Melbourne Cloud Run and Cloud SQL are available.
- Australia Data Boundary is available without a surcharge.
- Australian configurable dual-region Cloud Storage and immutable retention are strong for independent encrypted backup.
- Cloud SQL provides synchronous zonal HA and asynchronous cross-region replicas.
- Regional logging requires deliberate setup; defaults can be global.
- Identity Platform was not listed in the reviewed configurable data-residency service list.
- No native transactional email equivalent was identified.
- The Australia support package allows personnel in Australia, NZ, UK, US and Canada rather than Australia only.
- Indicative envelope: approximately **AUD 250–450/month excluding GST**.

### Microsoft Azure — capable but currently disproportionate

- Australia East/Southeast, managed PostgreSQL HA, cross-region replicas, Blob replication/immutability, Lockbox and paid Entra External ID Australia Go-Local are available.
- PostgreSQL zone HA excludes the inexpensive Burstable tier and requires a separately billed standby; regional recovery adds another server.
- Reviewed Azure Communication Services email documentation specified United States data location.
- Indicative envelope: approximately **AUD 700–1,000+ per month excluding GST**.

### AUCyber — possible narrow sovereign recovery target

- Publicly promises Australian workload, account, support and metadata handling; offers local support, S3-compatible storage and immutable backup/Object Lock.
- It is sales-led, quote-only and oriented toward government/critical-industry IaaS rather than a small managed application platform.
- Its general privacy notice mentions some overseas corporate service providers, requiring contractual clarification.
- Consider only a narrowly scoped encrypted-backup quote unless evidence changes.

### Binary Lane — excluded under current public evidence

- Australian provider with Sydney, Melbourne, Brisbane and Perth facilities and very low VM prices.
- It would require disproportionate self-managed database/security/recovery work.
- Public terms make service levels non-binding, disclaim provider backup preservation, allow immediate termination, and cap liability very narrowly.
- It is not a valid like-for-like managed-platform saving.

## Vendor-selection evidence gate

Before final production selection, retain evidence for:

1. contracting entity, law, DPA/privacy/service terms, subprocessors and change notices;
2. every customer/auth/log/email/scanning/backup/support data flow and its storage, processing and access location;
3. configured Australian regions, replicas, backups and logs;
4. provider human access, approval/transparency, legal-demand handling and the prohibition on sending customer content to overseas support;
5. encryption, keys, isolation, MFA, audit, failover lag, immutability, incident terms and tested restore;
6. standard exports, deletion/return, egress/support costs, termination terms and a proof-of-concept invoice; and
7. revalidation before production, after material change, annually in Phase 1, and before Phase 2.

IRAP evidence is supporting assurance only. Pivot is not a government workload, and IRAP does not itself make Pivot compliant.

## Sequence after the budget answer

Continue at **Max**:

1. decide whether AWS should be the **provisional provider for a bounded proof of concept**, not final production approval;
2. specify the proof-of-concept evidence and close provider/residency gaps;
3. define proportionate logging, monitoring and alerting;
4. define incident response, privacy requests and eligible-data-breach handling;
5. close remaining authentication, session and recovery decisions;
6. continue into detailed 2D-to-3D architecture;
7. continue supplier integration and production-export architecture; and
8. later cue **High** for reconciliation, register preparation and summaries.

## End-of-grill outputs still required

At the end of the complete grill, provide:

- a consolidated action list with owners, deadlines, fallbacks and blockers;
- entry-ready Decision Register items;
- entry-ready Assumptions Register items; and
- entry-ready risks, dependencies and external inputs.

Use the existing schemas previously recorded in `grill-me-handover-security-infrastructure.md`. Do not modify the external Business Register workbook unless Kylie explicitly requests it.

## Documents changed in this continuation

- Updated `specs/pivot-design-tool-baseline/grill-me-handover-security-infrastructure.md`.
- Added `specs/pivot-design-tool-baseline/cloud-provider-comparison.md`.
- Added this latest handover.
- No implementation code or governing/baseline specification was changed.
