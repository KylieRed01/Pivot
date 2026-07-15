# Pivot Design Tool — Reconstructed Grill-Me Decisions

**Status:** Recovered through Question 25  
**Source:** `grill-me-recovered-transcript.md`  
**Recovery method:** Direct JSONL parsing only. No Playwright or browser automation.

## Product Boundary

- The target is the complete Pivot design tool, not a reduced Phoenix-specific product.
- The Phoenix pilot deadline (approximately mid-August 2026) only determines whether Pivot's tool or a contingency is used for the pilot.
- This design discussion is strictly about the design tool; broader supplier operations and platform concerns should not displace editor decisions.

## Pilot Product Scope

The initial coordinated range contains:

1. Junior playing jersey
2. Junior playing shorts
3. Adult men's coach polo
4. Adult women's coach polo

The men's and women's polos are distinct garment templates because their cuts may differ.

The junior jersey leads the design direction for the coordinated range.

The Phoenix jersey is double-sided/reversible. The tool should generate a coordinated light reverse from the primary dark design and then allow independent refinement. Both sides remain linked through club identity and pattern family, but have separate artwork, contrast, number-legibility, and compliance validation. The reverse must not be a plain white fallback or simple colour inversion.

## Starting Designs and Imported Artwork

- Clubs should not start from scratch.
- The tool generates starting options from the club logo, club colours, approved patterns, selected template, required garment elements, and applicable constraints.
- A club may also upload an existing complete garment design, artwork, individual logos, patterns, or other visual material as its starting point.
- Imported material is populated into Pivot's authoritative garment template.
- The source artwork itself is not treated as a foreign editable garment template.
- The result becomes editable and production-capable only inside Pivot's template and constraints.

## Creative Model

This is a highly flexible, template-constrained design canvas—not a fixed-position configurator.

Within printable areas and supplier-supported capabilities, users should be able to:

- move artwork;
- scale it up or down;
- rotate it;
- crop it;
- layer and reorder it;
- duplicate and repeat it;
- extend it across supported panels; and
- manipulate it directly with immediate visual feedback.

Precise numeric controls for position, scale, and rotation should supplement direct manipulation.

Pivot should not impose arbitrary creative restrictions. Available operations are determined by the actual capabilities of the internal supplier/template and manufacturing method.

## Intended Editor Experience

The BLK reference establishes the interaction pattern, while Pivot improves its limitations.

The editor should provide:

- a large central 3D garment preview;
- pattern/template choices beside the garment;
- contextual controls for the selected area;
- visible colour controls and codes;
- immediate visual updates;
- front, back, and rotational views;
- direct artwork manipulation on the visual garment;
- clear print boundaries and compliance overlays; and
- simple controls around the garment rather than a conventional form-heavy workflow.

Pivot's improvements over the reference are:

- start from club identity;
- generate relevant starting designs;
- support exact club colours rather than an unexplained generic palette;
- provide substantially greater artwork freedom;
- coordinate jersey-led designs across shorts and polos;
- enforce and explain compliance;
- avoid fixed logo slots; and
- avoid forced lead capture before users experience the tool.

## 2D and 3D Authority

- A 3D view is part of the intended customer experience.
- If the supplier cannot provide ready-made 3D models, Pivot may create them from authoritative supplier production patterns.
- Supplier onboarding must provide authoritative 2D patterns, print boundaries, seams, and garment measurements, and the supplier must validate Pivot's 3D mapping.
- The supplier's 2D production pattern remains authoritative.
- The 3D model is the customer-facing visual preview.
- An unvalidated placeholder may support development but cannot support production approval.

## Compliance Model

The design tool should combine creative flexibility with hard production and governance controls.

### During editing

- Users may experiment with non-compliant arrangements.
- Validation updates continuously.
- Non-compliant work may be saved as a clearly marked draft.
- Blocking issues prevent submission for approval, not ordinary experimentation.
- Physically or technically impossible operations remain unavailable—for example, positioning artwork beyond the printable material.

### Rule hierarchy

Rules may come from multiple authorities, such as:

1. Bendigo Basketball Association
2. Basketball Victoria
3. Basketball Australia
4. FIBA

The more specific applicable authority may supplement or override broader rules.

Each rule set should be versioned and record:

- issuing authority;
- source document or URL;
- effective date;
- review or verification date;
- status; and
- precedence within the hierarchy.

External changes must not silently alter production rules. Changes should enter a review queue, be verified by Pivot, then be published as a new effective rule-set version. Existing approved designs retain the rule version against which they were approved; drafts are revalidated and affected users are notified.

## Colour Workflow

CMYK alone is insufficient to guarantee colour output on fabric.

The system should preserve:

1. The club's requested colour, which may be represented as HEX, RGB, CMYK, Pantone, another brand reference, or a colour extracted from uploaded artwork.
2. The internally mapped production colour appropriate to the fabric, ink, print process, and internal supplier profile.

To minimise workload for volunteer-run clubs and Pivot:

1. The club uploads its logo.
2. The tool extracts embedded vector colours or dominant raster colours.
3. It filters backgrounds, shadows, compression noise, and near-duplicate shades.
4. It presents a suggested palette: “We found these colours.”
5. The club confirms, removes, renames, or adjusts the colours.
6. Confirmed colours are mapped automatically to reproducible production colours.
7. Only low-confidence extraction or poor production matches require Pivot review.

The interface should show confidence and production-match status without exposing supplier details. A physical sample is required when colour accuracy cannot be guaranteed digitally.

## Supplier Confidentiality Relevant to the Tool

- Pivot assigns the internal supplier/template.
- Clubs do not choose or see the supplier.
- Supplier identity and sourcing details are confidential Pivot IP.
- Customer screens, URLs, exports, proofs, and errors must not expose supplier identity.
- The editor exposes garment capabilities and constraints, not their confidential source.

Supplier replacement and club communication were recognised as significant but are outside this design-tool grilling scope.

## Corrections Required in the Existing Baseline Spec

The existing `spec.md` conflicts with the recovered decisions and must be revised before implementation planning:

- Replace fixed/predefined logo positions with flexible artwork manipulation inside authoritative printable boundaries.
- Replace approved-palette-only colour selection with exact club colour capture, extraction, confirmation, and production mapping.
- Replace the “no unrestricted freeform garment drawing” wording with the clearer boundary: freeform artwork composition is allowed within Pivot garment geometry and supplier/manufacturing constraints.
- Add imported complete artwork/design population into Pivot templates.
- Add generated club-specific starting designs.
- Add coordinated range propagation led by the jersey.
- Add linked but independently refinable reversible jersey sides.
- Add draft-time non-compliance with approval-time blocking.
- Add versioned, governed sport-rule sources and revalidation behaviour.
- Preserve supplier confidentiality throughout customer-visible artifacts.

## Recovery Point and Next Decision

The grill completed Question 25. The last confirmed decision was:

> Generate a coordinated light reverse from the primary dark jersey design, then allow it to be refined independently, with separate validation for each side.

The original session failed immediately after this confirmation. No later product decisions were recovered.

The next highest-risk design branch should be the **production output contract**: what exact editable design data, approval proof, and supplier/manufacturing artifact must the completed tool produce, while supplier capabilities are still being vetted.
