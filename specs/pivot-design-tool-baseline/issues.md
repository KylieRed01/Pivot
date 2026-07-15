# Pivot Apparel Design Tool MVP — Execution Issues

**Source of truth:** `specs/pivot-design-tool-baseline/prd.md`  
**Supporting context:** `brief.md`, `grill-me-reconstruction.md`  
**Important:** `spec.md` describes an earlier fixed-position baseline and is not authoritative where it conflicts with the PRD.

## MVP outcome

A prospective club user can enter a basketball-specific design journey, establish a club identity, choose a starting direction, customise both sides of a placeholder reversible junior jersey, recover and reopen the draft, understand compliance problems, and submit an immutable valid version for club/Pivot review. The experience must not claim that placeholder assets or unresolved production mappings are production-ready.

## Agent execution rules

- Work in dependency order; do not begin a blocked issue.
- Each issue is a complete vertical slice: add domain behaviour, persistence/API behaviour, UI behaviour, and tests needed for its outcome.
- Use test-driven development and keep all existing tests passing.
- Keep shared concepts sport-neutral. Basketball terminology, garments, journey steps, and rules belong in basketball configuration.
- Treat server-side validation as authoritative; client-side controls are not a security or compliance boundary.
- Preserve club isolation and the existing club-approval-then-Pivot-approval sequence.
- Use visibly labelled placeholder garment assets until supplier-authoritative assets are supplied.
- Never expose supplier identity in customer-facing screens, URLs, errors, proofs, or API responses.
- Do not add checkout, ordering, payments, supplier integration, garment-geometry editing, player rosters, or production-file generation.
- Complete and verify one issue before moving to the next.

---

## Execution window 1 — Enter the real design journey

### 1. Basketball journey and placeholder reversible jersey

- **Type:** AFK
- **Blocked by:** None
- **User stories covered:** Support a sport-specific design journey; Customise the reversible junior jersey
- **Outcome:** A visitor can enter a basketball-specific journey and see both sides of the MVP lead garment without basketball assumptions leaking into shared editor code.
- **Acceptance criteria:**
  - Sport configuration defines the journey, lead garment, terminology, products, required elements, authorities, and active rule-set reference.
  - Basketball configuration selects a reversible junior jersey as its lead garment.
  - The editor exposes front/back views for primary and light/reverse sides.
  - The primary and reverse sides have independent design state while sharing club identity and pattern-family references.
  - Placeholder templates/previews are visibly labelled non-production-ready.
  - Placeholder assets cannot acquire production-ready or production-approved status.
  - A second fixture sport can be configured in tests without changing shared editor behaviour or historical basketball state.
  - Domain, API, and UI tests cover configuration selection, side/view switching, and placeholder gating.

### 2. Guest design session with recoverable identity

- **Type:** AFK
- **Blocked by:** 1
- **User stories covered:** Experience the tool before lead capture; Preserve design work
- **Outcome:** A prospective user can begin genuine design work without an account and retain a stable draft identity.
- **Acceptance criteria:**
  - A visitor can start editing without entering contact details or creating an account.
  - No compulsory tutorial, chatbot, popup, or sales enquiry interrupts entry to the editor.
  - The session receives an opaque draft identifier that exposes no sensitive data.
  - Unauthenticated sessions cannot access authenticated club asset libraries or another guest's draft.
  - Refreshing or reopening the session restores the latest recoverable draft shell.
  - Contact/account capture is requested only when the user explicitly chooses durable retention or submission.
  - Tests cover guest entry, isolation, restoration, and absence of forced lead capture.

---

## Execution window 2 — Establish club identity

### 3. Safe logo upload and colour suggestions

- **Type:** AFK
- **Blocked by:** 2
- **User stories covered:** Establish the club identity
- **Outcome:** A user can upload real club artwork and receive clearly identified colour suggestions.
- **Acceptance criteria:**
  - Supported raster/vector formats, size limits, and validation rules are explicit and enforced server-side.
  - Invalid, unsafe, or malformed uploads are rejected with an actionable explanation.
  - Accepted assets are scoped to the current guest or club and cannot be fetched across that boundary.
  - The system extracts a deterministic suggested palette from supported artwork.
  - Every suggestion records confidence and remains unconfirmed until the user acts.
  - Low-confidence extraction is visibly marked for review rather than silently accepted.
  - Failed processing leaves the editor recoverable and permits retry/removal.
  - Tests cover valid, invalid, unsafe, low-confidence, failed-processing, and cross-club access cases.

### 4. Confirmed club palette and exact colour references

- **Type:** AFK
- **Blocked by:** 3
- **User stories covered:** Establish the club identity
- **Outcome:** A user can turn suggestions and known references into an explicit club palette without confusing requested colours with production colours.
- **Acceptance criteria:**
  - Suggested colours can be confirmed, removed, renamed, and adjusted.
  - Users can add HEX, RGB, CMYK, or Pantone references with format validation.
  - Original user-entered references are preserved without lossy replacement.
  - Requested club colour and internal production mapping are separate fields and states.
  - Missing or low-confidence production mapping is visibly unresolved/manual-review, not silently accepted.
  - The UI states that digital colour is not a guarantee of physical fabric output.
  - Palette changes persist and are restored with the draft.
  - Tests cover each reference type, edits, invalid values, unresolved mapping, and persistence.

---

## Execution window 3 — Create and manipulate a jersey design

### 5. Club-relevant starting directions

- **Type:** AFK
- **Blocked by:** 1, 4
- **User stories covered:** Choose a club-relevant starting design
- **Outcome:** A user can select a relevant, deterministic starting direction instead of beginning from a blank garment.
- **Acceptance criteria:**
  - Starting options consume confirmed club colours, logo, jersey template, required elements, and available pattern families.
  - At least two curated/deterministic options are shown with immediate previews.
  - Selecting or changing an option populates Pivot's template and does not discard original uploaded assets.
  - A user may import complete visual artwork as an alternative direction.
  - Imported artwork becomes a source asset placed within Pivot's template; it never replaces garment geometry.
  - Unsupported or unprocessable imports produce an actionable, recoverable error.
  - Tests verify deterministic inputs, option switching, asset preservation, and imported-design containment.

### 6. Constrained direct artwork manipulation

- **Type:** AFK
- **Blocked by:** 5
- **User stories covered:** Customise the reversible junior jersey
- **Outcome:** A user can directly compose each jersey side while physically impossible operations remain unavailable.
- **Acceptance criteria:**
  - Users can select supported garment areas and artwork layers.
  - Supported layers can be moved, scaled, rotated, cropped, duplicated, reordered, and removed within template capabilities.
  - Direct manipulation updates the preview immediately; precise values are available where useful.
  - Layer state preserves source asset, side/panel association, crop, transform, order, and visibility.
  - Printable boundaries and supported transformations come from template metadata rather than hard-coded UI rules.
  - Operations outside printable material or unsupported by the template are rejected both client- and server-side.
  - Primary/reverse sides share identity and pattern family but retain independent colours, artwork, and transforms.
  - The reverse side is an intentional editable composition, not an automatic inversion or white fallback.
  - Keyboard-accessible controls and visible focus states exist for every manipulation capability.
  - Tests cover every transform, ordering, side independence, preview update, boundary enforcement, accessibility, and tampered requests.

---

## Execution window 4 — Make editing durable

### 7. Autosave, recovery, undo/redo, and durable reopen

- **Type:** AFK
- **Blocked by:** 6
- **User stories covered:** Preserve design work
- **Outcome:** A user can experiment without losing the recoverable design state.
- **Acceptance criteria:**
  - Autosave persists garment, template, palette, assets, layers, transforms, sides, views, and validation context.
  - Save status and current draft/version identity are visible.
  - Interrupted or failed saves preserve the last recoverable state and provide retry feedback.
  - Undo and redo cover editing-session design mutations and remain internally consistent after autosave.
  - Reopening a stable, authorised identifier restores the same observable design.
  - Concurrent/stale updates cannot silently overwrite newer state.
  - Corrupt or invalid persisted state fails safely and cannot bypass domain validation.
  - Tests cover reload equivalence, interrupted save, retry, undo/redo, stale writes, access control, and invalid state.

### 8. Immutable design versions and approval-safe editing

- **Type:** AFK
- **Blocked by:** 7
- **User stories covered:** Preserve design work; Review and submit a compliant version
- **Outcome:** Saved milestones and approvals always refer to immutable design content.
- **Acceptance criteria:**
  - A user can create an immutable version from the current draft.
  - Version identity and creation time are visible and auditable.
  - Mutating a version is rejected; editing continues in a draft/new version.
  - Editing an approved design creates a new unapproved version and never carries stale approval forward.
  - Existing club approval followed by Pivot approval remains enforced against one exact version.
  - Authorised roles and club isolation are enforced server-side for version and approval actions.
  - Audit events identify actor, action, design, version, and timestamp.
  - Tests cover immutability, stale-approval prevention, approval order, role enforcement, and club isolation.

---

## Execution window 5 — Explain restrictions and submit safely

### 9. Continuous versioned validation

- **Type:** AFK
- **Blocked by:** 1, 6, 7
- **User stories covered:** Understand design restrictions
- **Outcome:** A user can knowingly save imperfect work while seeing what blocks submission and why.
- **Acceptance criteria:**
  - Validation distinguishes blocking errors, warnings, and manual-review items.
  - Each result identifies the affected element, reason, authority/source, and a correction where practical.
  - Drafts with warnings, review items, or blocking errors can still be saved with a clear draft label.
  - Unsupported/physically impossible operations remain edit-time rejections rather than ordinary warnings.
  - Validation runs after relevant edits and is repeated authoritatively on the server.
  - Rule sets record authority, source, effective date, verification date, status, precedence, and version.
  - Publishing a new rule set can revalidate active drafts without rewriting immutable historical versions.
  - Tests cover severity behaviour, explanations, correction links/actions, server authority, precedence, and historical stability.

### 10. Submit a valid immutable version for approval

- **Type:** AFK
- **Blocked by:** 8, 9
- **User stories covered:** Review and submit a compliant version; Experience the tool before lead capture
- **Outcome:** An authorised user can submit exactly one valid version into Pivot's approval workflow, while invalid or placeholder-based work cannot be represented as production-ready.
- **Acceptance criteria:**
  - Submission shows all unresolved blockers before confirmation.
  - Blocking errors reject submission; warnings and manual-review items remain visible and auditable.
  - Submission captures an immutable design version and exact validation/rule-set version.
  - A guest is asked for only the minimum retention/contact information when choosing to retain or submit work.
  - Club approval must precede Pivot approval for the same immutable version.
  - Approval status, required next reviewer, and audit history are visible.
  - Placeholder templates, previews, unresolved production colour mappings, or missing supplier validation prevent production-ready approval.
  - Customer-visible output contains no supplier identity.
  - Tests cover successful submission, each blocking gate, guest retention transition, approval order, exact-version binding, placeholder gate, and confidentiality.

---

## Execution window 6 — Complete the MVP range

### 11. Derive and independently refine the coordinated range

- **Type:** AFK
- **Blocked by:** 6, 7
- **User stories covered:** Create a coordinated apparel range
- **Outcome:** A club can carry its jersey direction into junior shorts and separate men's and women's coach polos without copying incompatible jersey geometry.
- **Acceptance criteria:**
  - Basketball configuration contains junior shorts, men's coach polo, and women's coach polo as separate templates.
  - A user can derive each product from the jersey's club colours, pattern family, branding, and artwork hierarchy.
  - Derivation maps semantic design intent to each garment's capabilities rather than copying coordinates.
  - Unsupported elements are reported and omitted or flagged for review without corrupting source designs.
  - Each product can be refined and saved independently.
  - Changes to one product do not mutate the jersey or another product.
  - All range assets remain visibly placeholder/non-production-ready until validated.
  - Tests cover all three derivations, semantic adaptation, unsupported elements, isolation, persistence, and placeholder gating.

### 12. MVP accessibility, recovery, security, and journey verification

- **Type:** AFK
- **Blocked by:** 10, 11
- **User stories covered:** All MVP stories
- **Outcome:** The complete MVP journey is demonstrably usable and safe at its declared placeholder level.
- **Acceptance criteria:**
  - An end-to-end test covers guest entry through identity, starting direction, two-sided editing, save/reopen, validation, versioning, and submission.
  - A second end-to-end test covers coordinated-range derivation and independent refinement.
  - Core controls are keyboard operable, have accessible names, expose selected state programmatically, and do not rely on colour alone.
  - Failed artwork/template/preview loads produce recoverable states.
  - Club and guest isolation is tested across assets, drafts, versions, and approvals.
  - Customer-visible screens, URLs, errors, and artifacts are checked for supplier-identity leakage.
  - The UI consistently distinguishes draft, submitted, approved, placeholder, and production-ready states.
  - MVP limitations and manual production-readiness gates are documented in the repository.
  - The full automated test suite passes.

---

## Post-MVP production-readiness gate

### 13. Supply authoritative garment and production assets

- **Type:** HITL
- **Blocked by:** Supplier selection and contract
- **User stories covered:** Production-readiness dependency only
- **Outcome:** Pivot supplies the authoritative data needed to replace placeholder claims safely.
- **Acceptance criteria:**
  - Authoritative patterns, print zones, measurements, supported transformations, and manufacturing constraints are provided and versioned.
  - Validated 2D/3D preview mappings are provided for each in-scope garment.
  - Production colour profiles/mappings and their review process are documented.
  - Required production output formats and supplier review requirements are confirmed.
  - Supplier identity remains internal and is represented through non-sensitive identifiers at customer-facing boundaries.

### 14. Replace placeholders and verify production readiness

- **Type:** AFK
- **Blocked by:** 12, 13
- **User stories covered:** Review and submit a compliant version
- **Outcome:** Validated assets replace placeholders without changing historical design meaning or weakening approval gates.
- **Acceptance criteria:**
  - Authoritative template versions can be introduced without mutating historical designs.
  - Active drafts are explicitly migrated or revalidated; failures are reported rather than silently altered.
  - Preview mappings are validated against canonical 2D production geometry.
  - Production-ready status requires all authoritative asset, colour, rule, and approval gates.
  - Regression tests prove placeholder designs never become production-ready automatically.
  - Customer-visible behaviour continues to conceal supplier identity.

---

## Dependency summary

```text
1 → 2 → 3 → 4 → 5 → 6 → 7 → 8
                    └────→ 9
8 + 9 → 10
6 + 7 → 11
10 + 11 → 12
13 + 12 → 14 (post-MVP)
```

## Scope guardrails

Do not add supplier selection/disclosure, supplier APIs, production files, guaranteed physical colour matching, garment-geometry modification, unrestricted vector illustration, AI artwork generation, checkout, payment, ordering, production scheduling, player personalisation, roster ordering, or every sport. The architecture must permit future sport configurations, but only basketball and the listed MVP garments are delivered here.

## Completion definition

The MVP is complete when issues 1–12 meet their acceptance criteria and all tests pass. Issues 13–14 are explicit production-readiness work and do not block evaluation of the placeholder MVP. No Linear issues have been created from this draft.
