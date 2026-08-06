# Club onboarding proportionality audit

**Status:** Draft findings for Director review  
**Date:** 6 August 2026  
**Scope:** Maintained repository requirements relevant to Commercial Agreement, Club Onboarding, Product access and initial Club Store publication

## Purpose

This audit completes the proportionality review required by `docs/Club Onboarding Workflow.md` before an implementation specification is prepared. It tests maintained requirements against the Business Plan and Operating Model without changing approved product or operational decisions.

The audit gives precedence to the Business Plan, then the Operating Model, then the Brand Kit, as required by the Pivot Constitution. It also preserves the Constitution's explicit controls for club isolation, authorised club decisions, independent Pivot approval, production quality, audit records and role-appropriate authentication.

## Executive finding

The agreed onboarding journey is suitable as an end-to-end process baseline, but it is not yet a proportionate implementation specification for the Phoenix pilot.

The agreed online commercial, onboarding, notification, analytics and publication journey remains the implementation direction. Proportionality must be achieved through small capability-owned modules and a focused specification, not by replacing agreed online behaviour with manual or offline work.

Older Phoenix documents contain stale requirements that must be corrected, but they do not reopen decisions already recorded in the agreed onboarding workflow and Capability Map.

## Controls that must be preserved

These controls are proportionate and trace directly to governing requirements:

- one club cannot access another club's administration, records or assets;
- club access uses individually authenticated accounts appropriate to each role;
- an authorised club representative approves club decisions;
- Pivot retains cross-club oversight and independently controls publication and release to manufacture;
- approval and Store publication records identify actor, version and timestamp;
- uploaded assets remain club-scoped and pending until the required authority and Pivot review are complete;
- supplier-validated product and production controls remain outside Store setup;
- the initial Store remains private until the authorised club submission and Pivot publication decision are complete;
- customer information is minimised and service providers are assessed proportionately to its sensitivity and operational importance; and
- production-quality and legal exceptions retain human review.

These requirements do not imply enterprise identity infrastructure, event sourcing, a general workflow engine or automated supplier integration.

## Maintained-document corrections

### P1 — Resolved club authority model reconciled

**Status:** Corrected  
**Evidence:** `docs/Club Onboarding Workflow.md`, `docs/Capability Map.md`, `docs/Phoenix Phase 1 PRD.md`, `tasks.md`

The resolved production model is **one Club Administrator supported by up to two Club Users**. The Phoenix PRD and execution issues now reflect that model. This decision is closed and must not be asked again or inferred from the current simulation roles.

### P2 — Superseded data-location requirement reconciled

**Status:** Corrected  
**Evidence:** Constitution 1.09 replaced the former Australian-only requirement with risk-based provider and overseas-processing controls.

The Phoenix PRD now uses the Constitution 1.09 provider-assessment, minimisation, disclosure and oversight requirement. Provider selection remains an explicit production decision.

### P3 — Design-control language reconciled

**Status:** Corrected  
**Evidence:** The Operating Model and Constitution require fully customisable visual designs within approved garment products and supplier-validated production geometry.

The Phoenix PRD and execution issues now preserve that visual freedom while retaining controlled physical garment construction and production geometry.

### P4 — Phoenix execution and onboarding specification remain separate

**Status:** Boundary clarified  

`tasks.md` remains the Phoenix Phase 1 execution plan and retains its current pilot dates. Its corrected role and design requirements do not make it the Club Onboarding implementation plan. The onboarding baseline is now owned by `specs/club-onboarding/spec.md`.

## Proportionate implementation boundaries

### P5 — Commercial acceptance and onboarding initiation are online requirements

The normal customer path must remain online. The System sends the commercial package, captures electronic acceptance of the exact quote and agreement versions, records the authorised office bearer and selected Club Administrator, captures Pivot acceptance or countersignature, and triggers onboarding and the administrator invitation online.

An exception may receive human support, but an offline or manually initiated normal path is not an acceptable substitute. The implementation should keep Commercial Agreement separate from Club Administration and avoid a general-purpose workflow engine, while still delivering the agreed online hand-off. Final commercial wording requires appropriate Australian legal review.

### P6 — Agreed notifications remain in scope

The workflow's email and in-app notifications, recipient rules and publication hand-offs are retained requirements. Implement them behind one small notification owner rather than introducing a general communications platform. Delivery failures must be visible to Pivot and must not silently advance a workflow that depends on the message.

### P7 — Inactivity and failure alerting remains in scope

The seven-day inactivity alert, repeated blocking failures, explicit help requests, access or authority failures and security concerns remain part of onboarding. Thresholds remain configurable as agreed.

Implement only the stated onboarding triggers and a small configuration boundary. Do not expand this into a general rules engine, campaign system or unrelated reminder framework.

### P8 — Privacy-minimised onboarding analytics remains in scope

The agreed product-improvement analytics remain part of onboarding: structured setup events and issue codes, no personal information in analytics, and a stable opaque `clubId` rather than the club name. The authorised support resolution path also remains required.

Keep analytics separate from operational audit records and collect only the fields required by the agreed learning and support purpose. Do not introduce broad behavioural tracking.

### P9 — Exact-version records do not require enterprise versioning architecture

Version-specific approval is a genuine requirement for Store setup and publication. It can be met with a small immutable snapshot or versioned record and an append-only approval/publication event. It does not justify event sourcing, a general document-management system or universal record versioning.

**Proportionate pilot boundary:** version only records whose later mutation would make an approval ambiguous: accepted commercial references, approved Store setup and submitted/published Store versions.

### P10 — Asset authority should be captured once, with production review deferred

The Image Register contains extensive controls designed for many asset classes, including the now-abandoned open-image initiative. Applying its complete research checklist to a volunteer uploading an official club logo would be burdensome and would mix Store readiness with production approval.

**Proportionate pilot boundary:** for a club-supplied reusable asset, capture the exact file identity, supplying club, claimed owner/source, permitted club use and modification restrictions, administrator confirmation, status, date and any supporting evidence. Pivot can triage obvious concerns. Product-specific technical, supplier, placement and print review remains in the Product Workflow. A declaration must not be represented as proof of legal ownership.

### P11 — Colour capture should accept the club's existing evidence

The `tasks.md` colour bookmark is proportionate where it records supplied values and distinguishes supplied from derived information. It would become volunteer-hostile if every club had to provide HEX, RGB, CMYK and Pantone values or approve automatic conversions as authoritative.

**Proportionate pilot boundary:** require only digital Store colours needed to produce accessible controlled themes. Record any other club-supplied references without requiring missing formats. Keep physical production matching and proofing in the Product Workflow.

## Repository and architecture outcome

The current modular-monolith architecture is proportionate. The approved onboarding slice may add focused notification and analytics owners where they hide the agreed behaviour, but it must not introduce event buses, general workflow engines, campaign platforms or speculative infrastructure.

The first implementation specification should introduce the smallest coherent Club Administration owner for club identity, role-scoped access, Store setup state and exact approval snapshot. Existing fixture storage and `x-demo-user` identity are explicitly non-production and must not be evolved silently into production services.

Production identity, persistence, email delivery and hosting/provider decisions require explicit approval because they handle customer records and establish operational dependencies.

## Fastmail dependency — resolved delivery direction

The club-interest experience is an in-house Pivot website form with server-side delivery through Fastmail. **`mailto:` is not an approved release approach and must be removed. This decision is closed and must not be asked again.**

The current `mailto:hello@pivotteamwear.com` action is only an unconnected placeholder. The approved connection is Fastmail SMTP with these exact requirements:

- create a dedicated app password named **Pivot website contact form** under **Fastmail Settings → Privacy & Security → Connected apps & API tokens**;
- store the generated app password in Pivot’s password manager, not in project files or a plain-text note;
- never use the normal Fastmail account password;
- SMTP host: `smtp.fastmail.com`;
- SMTP port: `465`;
- transport security: SSL/TLS;
- SMTP username: the full Fastmail login address;
- SMTP password: the generated dedicated app password;
- recipient: `hello@pivotteamwear.com`; and
- add the SMTP username and app password only as server/deployment secrets, including Fly secrets when Fly is the deployment target.

The in-house form requires a same-origin server endpoint with server-side field validation, request and submission limits, anti-spam protection, safe delivery-error handling and clear success or recoverable failure states. Credentials must never enter browser code, source control or logs. Sensitive submitted values must not be unnecessarily logged.

Before release, verify external delivery, failure handling and the reply path. Fastmail access is enough to create the app password; separate access is required to configure Fly or another deployment secret manager.

## Recorded Director decisions

1. The production role model is one Club Administrator plus up to two Club Users.
2. The commercial agreement and onboarding path must be online; clubs unable to use the online process are not a fit for Pivot.
3. The agreed inactivity/failure alerts and privacy-minimised analytics are not deferred.
4. Club-interest delivery is an in-house form connected server-side to Fastmail. `mailto:` is prohibited for release.
