# Phoenix Phase 1 — Execution Issues

**Source:** `docs/Phoenix Phase 1 PRD.md`  
**Target:** Phoenix has access to the design tool by 17 August 2026.  
**Constraint:** Phoenix is the only production pilot club. Phase 1 has no checkout, payment, member ordering or supplier API integration. Build without a supplier API; add supplier submission later as a separate integration without replacing the store, design or approval workflows.

## Execution window 1 — Working Phoenix store

### 1. Phoenix non-transactional club store

- **Type:** AFK
- **Blocked by:** None
- **User stories covered:** 5
- **Outcome:** A Phoenix-branded store can be accessed by link so the club can experience the future storefront without enabling commerce.
- **Acceptance criteria:**
  - Store is Phoenix-branded and accessible by link.
  - Store is excluded from search indexing.
  - It shows approved U10 jersey and coach-polo products.
  - It shows no prices.
  - It includes coach-polo sizing charts.
  - It contains no checkout, payment, order, expression-of-interest or size-submission capability.
  - Phoenix is the only enabled production club.

### 2. Club and Pivot access control

- **Type:** AFK
- **Blocked by:** 1
- **User stories covered:** 3, 4, 6
- **Outcome:** Phoenix administrators manage only Phoenix; Pivot can oversee all clubs.
- **Acceptance criteria:**
  - A multi-club data model exists, with Phoenix as the sole enabled pilot club.
  - Club administrators can access only their club's data and administration.
  - Pivot administrators can access all clubs and override club access.
  - A club has one Club Administrator and may have up to two Club Users.
  - The Club Administrator manages Club User invitations, revocation and replacement.
  - Club Users may participate but cannot exercise the Club Administrator's approval authority.
  - Club access uses individual authenticated accounts appropriate to each role; the production sign-in mechanism remains an implementation decision.
  - Pivot administrator access requires strong multi-factor authentication.

## Execution window 2 — Guided club design and approval

### 3. Guided 2D product design workspace

- **Type:** AFK
- **Blocked by:** 2
- **User stories covered:** 1
- **Outcome:** Phoenix users can create a fully customisable visual design within an approved garment product and supplier-validated production geometry.
- **Acceptance criteria:**
  - Users can select approved garment products and work within supplier-validated production geometry.
  - The workspace provides fully customisable visual design without enabling unrestricted physical garment construction.
  - Pivot can preload club and sponsor artwork.
  - Administrators can upload club and sponsor artwork for Pivot review.
  - The workspace records a versioned design state.
  - The product uses placeholder templates until supplier-approved templates are available.
  - The design and approval workflow does not depend on a supplier API.

### 4. Club-first design approval and audit trail

- **Type:** AFK
- **Blocked by:** 3
- **User stories covered:** 3, 4
- **Outcome:** Phoenix approves a specific design version before Pivot reviews it.
- **Acceptance criteria:**
  - The Club Administrator can submit final club approval for a design version; Club Users cannot exercise that authority.
  - Pivot can approve a club-approved design or return it for revision.
  - Publication and manufacture submission are blocked until both approvals are complete.
  - The system records design changes, approval events and publication events with actor, version and timestamp.
  - Approval records support retention for the life of the related product and order, plus seven years.

### 5. Publish approved designs to the Phoenix store

- **Type:** AFK
- **Blocked by:** 1, 4
- **User stories covered:** 4, 5
- **Outcome:** Only Pivot-approved designs appear in the Phoenix store.
- **Acceptance criteria:**
  - Unapproved and club-only-approved designs cannot appear in the store.
  - Pivot can publish an approved product design to the Phoenix store.
  - The store presents the current published version only.
  - A publication event is recorded in the audit trail.

## Execution window 3 — Supplier-specific design validation

### 6. Provide selected supplier production assets

- **Type:** HITL
- **Blocked by:** Supplier sample evaluation and selection
- **User stories covered:** 2
- **Outcome:** Pivot provides the production assets required to make the Phoenix design production-accurate.
- **Acceptance criteria:**
  - Selected supplier is confirmed outside this workstream.
  - Supplier-approved 2D garment template is available.
  - Exact supplier 3D garment model is available or approved for use.
  - The supplier confirms the required artwork and production-file requirements.
  - No supplier API integration is required for this issue.

### 7. Supplier-specific 3D preview and production template

- **Type:** AFK
- **Blocked by:** 3, 6
- **User stories covered:** 1, 2
- **Outcome:** Phoenix can inspect the same approved design in 2D and on the selected supplier's exact 3D garment model.
- **Acceptance criteria:**
  - The design workspace presents the selected supplier's approved 2D template.
  - The 3D preview uses the selected supplier's exact garment model.
  - Approved colours, artwork and template options remain consistent between 2D and 3D views.
  - The supplier-approved template is identified as the production authority.
  - The 3D model is available before Phoenix gives final design approval.

## Execution window 4 — Pilot release

### 8. Phoenix pilot readiness verification

- **Type:** AFK
- **Blocked by:** 5, 7
- **User stories covered:** 1–6
- **Outcome:** The Phoenix tool is verified as ready for club access by 17 August 2026.
- **Acceptance criteria:**
  - All PRD testing decisions are verified.
  - Phoenix administrators cannot access another club context.
  - Pivot can review, return, approve and publish designs.
  - Store controls prevent all phase-1 transactional behaviour.
  - Artwork upload and Pivot review are tested.
  - The final 2D and 3D supplier assets are tested before final production approval.
  - Known pilot limitations and manual operational hand-offs are documented.
  - Phoenix access is available by 17 August 2026.

## Dependency summary

`1 → 2 → 3 → 4 → 5`  
`6 → 7`  
`3 → 7`  
`5 + 7 → 8`

## Scope guardrails

Do not add individual ordering, checkout, payments, customer accounts, order windows, batch automation, supplier API integration, additional production clubs, a public marketing site, pricing, or native applications to these issues. Supplier API integration is a later, separate vertical slice; the current design, approval and publishing workflows must operate without it.

## Backlog bookmark — Club onboarding colour records

When the club onboarding process is designed, capture authoritative club colours alongside uploaded brand assets. For each named colour, record available HEX, RGB, CMYK and Pantone values, the source document, whether each value was club-supplied or derived, version, approval status, approving club administrator and date.

Do not require formats the club does not hold or treat automatic conversions as authoritative. Mark missing or derived production values as pending confirmation. Final production colours remain subject to the manufacturer’s process, material and colour profile, with a physical proof or sample used where colour accuracy is critical. Club approval does not itself release a design to manufacture.

## Backlog bookmark — Club onboarding image authority

When the customer onboarding workflow is designed, decide how Pivot captures and maintains authority for club, sponsor and other customer-supplied images before those assets can enter an approved garment design.

The onboarding discussion should consider:

- whether reusable club assets are collected during onboarding while later one-off uploads use the same authority process;
- which users may upload or experiment with pending assets, and which declarations require Club Administrator confirmation;
- separate evidence requirements for club-owned, sponsor-provided, licensed and other third-party assets;
- the claimed owner, permitted commercial garment use, modification permission, restrictions, expiry and supporting evidence;
- an immutable identity for the exact supplied file, including version or checksum, so replacement artwork requires renewed review;
- pending, confirmed, expired and rejected authority states;
- whether club approval and submission to Pivot are blocked while any included asset has incomplete or expired authority;
- how the Design Studio health check reports unresolved asset authority without representing a declaration as proof that no copyright, trademark or other rights risk exists; and
- the declarations, audit records, retention, privacy controls and Pivot review responsibilities required by the governing documents.

This bookmark records a topic for the future onboarding design discussion; it does not approve a final workflow or make a club declaration sufficient for production release.
