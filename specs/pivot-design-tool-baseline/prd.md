# Pivot Apparel Design Tool MVP PRD

**Status:** Ready for task breakdown  
**Product:** Pivot apparel design tool  
**Initial sport:** Basketball  
**Pilot club:** Phoenix  
**Target:** Complete-product foundation with an MVP delivery slice  

## Problem Statement

Volunteer-led sporting clubs need to create coordinated, customised teamwear without starting from a blank garment, learning professional design software, or relying on repeated manual assistance from Pivot.

Existing apparel configurators provide useful visual previews but commonly restrict clubs to generic palettes, fixed logo positions, and isolated garment designs. These limitations prevent clubs from accurately representing their identity and do not provide the creative flexibility Pivot wants to offer.

At the same time, unrestricted artwork can produce designs that breach sport rules or cannot be manufactured. Clubs need freedom to experiment, but they also need clear guidance about print boundaries, number legibility, required elements, colour limitations, and approval blockers.

Pivot needs an MVP that demonstrates the intended design experience and establishes the permanent product model. It must not claim that a design is production-ready until supplier-authoritative templates, colour mappings, manufacturing constraints, and preview assets have been validated.

## Solution

Build a club-first, template-constrained apparel editor that uses the club's identity to create relevant starting designs and then gives users substantial visual control within defined garment and manufacturing boundaries.

Basketball is the first configured sport, but the product must support additional sports without treating basketball terminology, garments, rules, or journey steps as universal. Each sport has its own design journey, lead garment, product range, required design elements, governing authorities, and versioned compliance rules. For example, football begins with a football jersey and soccer begins with a soccer jersey.

The MVP begins with a reversible junior basketball jersey as the lead garment. A club can upload its logo, confirm suggested club colours, choose or import a starting direction, and directly manipulate artwork while viewing immediate visual feedback. The jersey's design direction can then be applied to junior shorts and adult men's and women's coach polos to create a coordinated range.

The editor allows non-compliant experimentation in drafts but continuously explains issues and prevents submission for approval while blocking errors remain. Operations that are physically impossible, such as placing artwork outside printable material, remain unavailable.

Until supplier assets are validated, the MVP must clearly identify templates and previews as placeholders and must not present saved designs as production-approved or manufacturable.

## User Stories

### P1 — Establish the club identity

As a club design user, I want to upload my club logo and receive a suggested colour palette so that I can begin with my club's real identity without needing formal brand documentation.

**Expected outcomes:**

- The user can upload a supported logo or artwork file.
- The system suggests colours found in the uploaded asset.
- The user can confirm, remove, rename, adjust, or add colours.
- A user who knows an exact colour can enter an available reference such as HEX, RGB, CMYK, or Pantone.
- The system distinguishes requested club colours from internal production mappings.
- Low-confidence extraction or unresolved production matching is clearly identified for later review rather than silently accepted.

### P1 — Choose a club-relevant starting design

As a club design user, I want suitable starting designs based on my club identity and garment requirements so that I do not have to design from scratch.

**Expected outcomes:**

- Starting options use the confirmed club colours, logo, selected garment template, required elements, and available pattern families.
- The user can select a generated or curated starting option.
- The user can upload existing artwork or a complete visual design as an alternative starting direction.
- Imported artwork is populated into Pivot's garment template rather than becoming a foreign garment template.
- The user can change the selected starting direction without losing the original uploaded club assets.

### P1 — Customise the reversible junior jersey

As a club design user, I want to manipulate artwork visually on a reversible junior jersey so that I can create a distinctive design while seeing the result immediately.

**Expected outcomes:**

- The user can edit the primary and light/reverse sides.
- The user can select supported garment areas and artwork layers.
- Within printable boundaries, supported artwork can be moved, scaled, rotated, cropped, duplicated, layered, and reordered.
- Direct manipulation is the primary interaction, with precise values available where useful.
- The preview updates immediately after a design change.
- Front, back, and other required garment views are available.
- The two jersey sides share the club identity and pattern family but permit independent artwork and colour refinement.
- The reverse side is intentionally designed and is not merely a white fallback or automatic colour inversion.

### P1 — Understand design restrictions

As a club design user, I want immediate and understandable validation so that I know what must be fixed without losing the freedom to experiment.

**Expected outcomes:**

- Validation distinguishes blocking errors, warnings, and manual-review items.
- Every restriction or warning explains why it applies and, where practical, offers a corrective action.
- A non-compliant design can be saved as a clearly labelled draft.
- A draft with blocking errors cannot be submitted for approval.
- Physically impossible operations are prevented.
- The applicable rule-set version is retained with any submitted or approved design version.

### P1 — Preserve design work

As a club design user, I want my work saved and versioned so that I can return to it, experiment safely, and avoid losing progress.

**Expected outcomes:**

- Draft work can be saved and reopened.
- Accidental work loss is reduced through autosave or draft recovery.
- Save state and current design version are visible.
- Undo and redo are available during an editing session.
- A submitted or approved design refers to a specific immutable version.
- Editing an approved version creates a new version and does not silently preserve stale approvals.

### P2 — Create a coordinated apparel range

As a club design user, I want the jersey's core design direction applied to the rest of the selected range so that the products look coordinated without being designed independently from scratch.

**Expected outcomes:**

- The initial range contains junior shorts, an adult men's coach polo, and an adult women's coach polo.
- The men's and women's polos remain separate garment templates.
- Club colours, pattern family, branding, and relevant artwork hierarchy can be carried from the jersey into each product.
- The system adapts the direction to each garment instead of copying jersey geometry directly.
- Each product can be refined independently within its available template capabilities.

### P2 — Support a sport-specific design journey

As Pivot expands into another sport, I want that sport to have its own lead garment, products, terminology, journey, and compliance rules so that clubs receive an experience appropriate to their sporting code rather than a renamed basketball workflow.

**Expected outcomes:**

- The selected sport determines the available design journey and product range.
- Each sport identifies its own lead garment; for example, a football jersey for football and a soccer jersey for soccer.
- Required garment elements and starting-design inputs can differ by sport.
- Each sport can define its own governing-authority hierarchy and versioned rule sets.
- Adding a sport does not alter the meaning or historical validation of existing basketball designs.
- Shared club identity, artwork, colour, draft, versioning, and approval capabilities can be reused across sports.

### P2 — Review and submit a compliant version

As an authorised club user, I want to review and submit a valid design version so that it can enter Pivot's approval process.

**Expected outcomes:**

- The user can see unresolved blockers before submission.
- Submission is rejected when blocking errors remain.
- Submission records the immutable design version and applicable validation/rule-set version.
- Existing club approval followed by Pivot approval remains enforced.
- Approval state is visible and auditable.
- Placeholder or unvalidated assets prevent production-ready approval.

### P2 — Experience the tool before lead capture

As a prospective club user, I want to try the genuine design experience before providing contact details so that I can understand its value without sales pressure.

**Expected outcomes:**

- A prospective user can begin designing without creating an account.
- No compulsory tutorial, unsolicited chatbot, intrusive popup, or immediate sales enquiry interrupts the design journey.
- Minimal contact or account details may be requested when the user chooses to save or retain the design.

## Implementation Decisions

### Product and garment model

- The MVP is the first slice of the permanent Pivot design tool, not a separate reduced Phoenix product.
- Basketball is the initial configured sport, not a universal product model.
- Sport-specific configuration determines the design journey, lead garment, available products, required elements, terminology, governing authorities, and compliance rules.
- Shared editor capabilities—club identity, artwork, colour, versioning, validation, and approval—remain reusable across sports.
- New sports must be addable without embedding their rules in shared editor behaviour or changing historical designs from another sport.
- The reversible junior basketball jersey is the MVP lead garment and first vertical slice. Future sports use their own lead garment, such as a football jersey or soccer jersey.
- Junior shorts and adult men's and women's coach polos follow as coordinated products.
- Pivot garment templates define garment geometry, editable/printable areas, supported transformations, required elements, and validation constraints.
- Clubs do not modify garment geometry.

### Editing model

- The product is a flexible, template-constrained design canvas rather than a fixed-position configurator.
- Direct visual manipulation and immediate preview feedback are core interactions.
- A production template or authoritative 2D representation remains the canonical design geometry.
- A 3D view is a customer preview and must not become the sole source of production coordinates.
- Placeholder or unvalidated previews must be visibly labelled and cannot support production-ready approval.

### Artwork model

- Uploaded logos, patterns, individual assets, and complete visual designs may provide starting material.
- Imported material becomes editable and production-capable only after placement inside Pivot's template and constraints.
- The model must preserve artwork layers, transformations, garment-side/panel association, and source asset references.
- Supplier/template capabilities determine which transformations and decoration methods are available; Pivot should not impose arbitrary creative restrictions.

### Colour model

- The system preserves the club's requested colour separately from any mapped production colour.
- Club colours may originate from uploaded artwork or precise user-entered references.
- Suggested colours require user confirmation.
- Production match confidence and review status must be representable without exposing confidential supplier information.
- Digital colour display must not be presented as a guarantee of physical fabric output.

### Compliance model

- Draft editing permits temporary non-compliance.
- Blocking compliance errors prevent approval submission.
- Physically impossible or unsupported manufacturing operations are prevented at edit time.
- Rules must identify their authority, source, effective date, verification date, status, precedence, and version.
- External rule changes are reviewed before publication and never silently change effective production rules.
- Approved designs retain the rule-set version used during approval; active drafts may be revalidated against newly published rules.

### Supplier boundary

- Pivot assigns suppliers and internal production templates.
- Supplier identity and sourcing information are confidential Pivot IP.
- Customer-facing screens, URLs, errors, proofs, and exports must not disclose supplier identity.
- Supplier-authoritative patterns, print zones, measurements, manufacturing constraints, colour profiles, and validated preview mappings are required before production readiness.
- Missing supplier assets do not block development of the editor using explicitly labelled placeholder templates.

### Existing platform capabilities

The existing prototype provides foundations that may be retained or evolved:

- club data isolation;
- saved design versions;
- club and Pivot approval sequencing;
- audit events; and
- approved-only publication controls.

The existing placeholder editor does not represent the agreed flexible editing experience and should not constrain the new editor model.

## Testing Decisions

Testing should verify observable behaviour at the domain, API, and user-interface levels. No specific browser automation framework is required by this PRD.

### Club identity and colour

- A supported logo produces suggested colours.
- The user can correct and confirm the suggested palette.
- Exact colour references are preserved without being confused with production mappings.
- Low-confidence extraction and unresolved mappings are visible.
- Invalid or unsafe uploads are rejected with a clear explanation.

### Jersey editing

- Each supported transformation updates saved design state and the visual preview.
- Artwork cannot be moved beyond authoritative printable boundaries.
- Primary and reverse sides remain linked where intended but preserve independent refinements.
- Reloading a saved draft restores artwork, transformations, colours, sides, layers, and template selection.
- Undo and redo produce consistent design state.

### Validation and approval

- Warnings do not incorrectly block draft saving.
- Blocking errors prevent submission.
- Unsupported manufacturing operations cannot be performed.
- Validation messages identify the affected element and explain the restriction.
- Approval applies to an immutable design version.
- Editing an approved design creates a new version and invalidates stale approval where required.
- Placeholder assets prevent production-ready status.

### Coordinated range

- Jersey design direction can initialise shorts and both polo templates.
- Adaptation preserves club identity without copying incompatible garment geometry.
- Changes to one refined product do not unintentionally corrupt another product.

### Access and confidentiality

- Club users cannot access another club's assets or designs.
- Unauthenticated prospective users cannot access authenticated club libraries.
- Supplier identity does not appear in customer-visible data or artifacts.
- Only authorised roles can submit, approve, or publish designs.

### Failure and recovery

- Interrupted editing does not silently lose the most recently recoverable draft.
- Failed asset or preview loads produce a recoverable state.
- Invalid design data cannot bypass server-authoritative validation.
- A rule-set update revalidates drafts without silently rewriting approved historical versions.

### Current verification baseline

The existing non-browser test suite currently passes nine tests covering club isolation, identity requirements, approval order, publication restrictions, store exposure, and disabled-club behaviour. New editor behaviour requires additional tests rather than relying on this existing coverage.

## Out of Scope

The following are intentionally excluded from the MVP:

- Customer selection or disclosure of suppliers.
- Supplier replacement and club migration operations.
- Guaranteed production-ready output before supplier assets are validated.
- Final manufacturing files or automated supplier integration before the supplier contract is known.
- Guaranteed physical colour matching without supplier profiles and physical sampling.
- Automated monitoring or publication of external sport-rule changes without Pivot review.
- Modification of garment geometry.
- Full professional vector illustration capabilities unrelated to garment composition.
- Implementing every sport, league, garment category, and decoration method in the MVP. The MVP must nevertheless preserve the sport-specific product model needed to add them later.
- Direct payments, checkout, ordering, or production scheduling.
- Individual player personalisation and roster ordering unless separately scoped.
- AI-generated artwork as a requirement; deterministic and curated starting designs are sufficient for the MVP.
- A mandatory production-quality 3D model where authoritative supplier assets are unavailable.
- A materially reduced public demo; public save/account retention may remain limited.

## Further Notes

### MVP delivery order

Recommended vertical sequence:

1. Reversible junior jersey template and durable design-state model.
2. Artwork upload, layering, and constrained transformations.
3. Club colour extraction, confirmation, and exact references.
4. Draft persistence, recovery, undo/redo, and versioning.
5. Continuous validation and approval blocking.
6. Starting-design selection and imported-design population.
7. Coordinated junior shorts and coach polo derivation.
8. Supplier-authoritative template and preview replacement when assets become available.

### Readiness statement

The product direction is sufficiently defined to begin MVP task planning and implementation. Basketball should be delivered as the first sport configuration on top of reusable design-tool capabilities, not implemented as assumptions embedded throughout the product. Final production output formats, authoritative garment assets, exact manufacturing constraints, and physical colour mappings remain supplier-dependent. These are production-readiness gates, not blockers to building and validating the MVP editor experience.

### Supporting documents

- `brief.md` — original product intent and design journey
- `grill-me-recovered-transcript.md` — recovered discussion through Question 25
- `grill-me-reconstruction.md` — consolidated decisions and baseline corrections
- `spec.md` — earlier baseline requiring alignment with this PRD before being treated as authoritative
