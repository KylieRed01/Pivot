# Pivot Grill-Me Handover — Editor and Product Decisions

**Date:** 2026-07-16  
**Status:** Session paused at approximately 45% context. Resume in a new chat.  
**Resume command:** `grill-me Continue from specs/pivot-design-tool-baseline/grill-me-handover-editor-product.md`

## Resume instructions

1. Read this file completely.
2. Read these earlier handovers completely:
   - `specs/pivot-design-tool-baseline/grill-me-handover-production-output.md`
   - `specs/pivot-design-tool-baseline/grill-me-handover.md`
3. Follow the linked-document reading instructions in the earliest handover.
4. This file records the latest session and supersedes earlier handovers where decisions conflict.
5. Continue one question at a time and include a recommendation.
6. Current reasoning level is `high`.
7. Explicitly prompt the user to switch to `max` before authentication, security, storage, infrastructure, detailed 2D-to-3D mapping, supplier-integration architecture, or production-export architecture.
8. Do not update implementation code yet. Finish grilling and reconcile specifications/governing documents first.

## Exact resume point

The latest question was asked but not answered:

### Text controls — pending question

Recommended Phase 1 text controls:

- editable wording;
- approved font selection;
- colour;
- size;
- proportional scaling;
- movement and rotation;
- alignment;
- letter and line spacing;
- approved outlines where production supports them;
- layer ordering, duplication and deletion.

More decorative effects would follow later if validated.

Resume by asking:

> Is this the right baseline text-control set?

## Pilot phase model

The latest clarification is authoritative:

### Phoenix Pilot Phase 1

- Sponsor-funded Phoenix batch.
- Reversible jersey with dark and light faces.
- Men's and women's club polos.
- Matching shorts remain provisional for Phase 1 pending cost and do not block the core pilot.
- Supplier submission/acknowledgement may be automated if ready; controlled manual fallback is acceptable.

### Phoenix Pilot Phase 2

- Phoenix-only while Pivot validates the concept, operating model and business viability.
- Phoenix families order jerseys and matching shorts through the club store.
- It tests the complete live cycle: store, ordering, payment, sizing/personalisation, club checks, consolidation, supplier handover, manufacture, status/exceptions, Pivot QC, communications, collection/delivery and reconciliation.
- No other clubs are onboarded while Phase 2 validation is still underway.

### Phoenix Pilot Phase 3

- Expand the Phoenix store and product range.
- After successful Phase 2, selected new clubs may be onboarded at the Director's discretion and only within available capacity.
- New-club onboarding is optional, not a required Phase 3 deliverable.
- No club count or growth promise is locked.
- Pivot must not compromise service, quality or fulfilment for growth.

This pilot phase model must be reconciled with the Business Plan's separate Phase 1/2/3 growth terminology.

## Governing-document updates required later

Do not update these piecemeal during the grill. Complete decisions, create a reconciliation checklist, then update them together before coding:

- `docs/Business Plan_V1.00.pdf`
- `docs/Pivot Constitution.md`
- `docs/Operating Model_V1.00.pdf`
- `docs/Phoenix Phase 1 PRD.md`
- `specs/pivot-design-tool-baseline/spec.md`
- related PRD/help/FAQ copy
- external `Pilot_Phoenix.pdf`

The supplier-validation workbook does not need duplicate supplier criteria from this grill. The Brand Kit does not need roadmap decisions added, although the Pivot penguin issue below requires a later brand-asset revision.

## Colour workflow decisions

### Extraction versus direct entry

- Direct colour entry and confirmation are the reliable baseline.
- Logo colour extraction is preferred for a fully functional Phase 1 Design Studio but is not a pilot blocker.
- Include extraction only if reliable and it does not delay the core editor.
- Extraction is optional assistance, never an approval source.
- Extracted colours are suggestions users can confirm, rename, adjust or remove.
- Only club-confirmed colours enter the approved club palette.
- Public-trial palettes remain temporary and never become official club colours.
- Use deterministic code, not AI, for extraction.

### Volunteer knowledge and production mapping

- Volunteers are not required to know HEX, Pantone, RGB or CMYK values.
- Accept precise references when available, colours selected from artwork and existing-garment references.
- Missing exact codes do not block drafting.
- Uncertain colours trigger Pivot review and may require a physical sample.
- Pivot separately maps approved club colours to production colours.

### Approval and versioning

- Club users and the administrator may prepare colours.
- The club administrator has formal authority over club decisions, including official colours.
- Official palettes are versioned.
- Palette updates do not alter, reopen or invalidate approved garments.
- Existing approved teamwear retains its exact locked colours and production mapping.
- An updated palette applies only to new designs or a garment deliberately revised through a new approval process.

## Approved-design stability decisions

- An approved garment remains the club's current design indefinitely; it is not a seasonal design and does not require annual renewal.
- It stays available for reorders while production-eligible.
- It is never automatically archived or replaced at season end.
- A club should ordinarily use it for at least one full competition season before replacing it.
- Mid-season replacement requires a documented exception, such as safety, compliance, production failure, supplier discontinuation or another material issue approved by the club administrator and Pivot.
- Club users may prepare a replacement draft at any time.
- Drafting is unrestricted; activation is controlled.
- `Approved` and `current` are separate states.
- Approval of a replacement does not immediately replace the current garment.
- The administrator proposes activation and Pivot confirms after production/store-readiness checks.
- By default, the superseded design is removed from new store orders when the replacement activates.
- Existing orders and history remain intact.
- A time-limited overlap may be approved as an exception by the administrator and Pivot, with reason and end point recorded.

## Completed existing garment designs

### Public boundary

- Completed-garment conversion is not a public-trial feature.
- Public visitors may upload individual logos/artwork for session-only experimentation.
- An uploaded image must not be described as an automatic editable garment conversion.
- Existing FAQ and Design Studio Help copy currently overpromise this and must be corrected before release.

### Club-onboarding workflow

- Completed design upload/conversion is reserved for authenticated club onboarding.
- Use a hybrid process rather than promising automatic conversion.
- The tool attempts deterministic importing, scaling, clipping and supported structured-artwork mapping where reliable.
- If conversion is unreliable, mark it `Pivot assistance required`.
- `Pivot assistance` means a Pivot staff member providing human-in-the-loop help, supported by the tool.
- Pivot fits or rebuilds the design on an approved garment template.
- The club reviews the resulting editable draft.
- It remains non-production-ready until the normal approval workflow completes.
- Do not promise perfect automatic recovery of layers from flattened images, PDFs or unknown supplier files.

## Club roles and onboarding

### Capabilities

- Club users can perform all preparation work: upload/manage proposed assets and colours, create designs and prepare store branding.
- Club users cannot provide formal club approval.
- The club administrator inherits all club-user capabilities.
- The administrator may perform the preparation work, act only as approver, or do both.
- The administrator manages nominated users and has formal authority over club decisions.
- Because some clubs are small, an administrator may create and approve the same club work.
- The audit history transparently records when creator and club approver are the same person.
- Pivot remains the independent technical, production, compliance and quality approver.
- Club and Pivot approval must still come from distinct people.

### Onboarding support

- Provide a reusable instructional onboarding video.
- Offer an optional video call for Greater Bendigo clubs needing guided onboarding.
- A live call is not mandatory.
- The nominated club user or administrator must be able to complete the full preparation workflow without requiring Pivot to do ordinary setup work.

## Uploaded artwork decisions

### Draft use and approval

- Security details are deferred, but no upload becomes draft-usable until automated security checks pass.
- After security checks, uploaded images may be used immediately in drafts.
- Upload success does not mean approval.
- Core reusable club assets receive administrator approval for the official asset library.
- Sponsor and one-off artwork may remain design-specific and be approved as part of the exact garment design.
- This avoids a separate approval step for every experimental image.
- Pivot separately confirms technical/production suitability before manufacture.

### Minimal classification

A proposed category system for every upload was rejected as unnecessary complexity.

Final model:

- Identify and specially govern official club logos and club colours.
- Treat other uploaded images as ordinary design artwork.
- Handle completed existing garment designs through the separate onboarding workflow.
- Do not force users to label every image as sponsor/decorative/reference.

### Artwork rights

Every administrator design approval must include an artwork-rights confirmation. Working wording:

> I confirm that the club is authorised to use all logos and artwork in this design and has obtained any required permission from the owners or sponsors.

- Store exact attestation wording/version, approver, design version and timestamp.
- Exact wording requires legal/customer-terms review.
- The club is responsible for sponsor/logo permissions and copyright.
- This attestation helps allocate responsibility but does not eliminate all Pivot liability.
- Copyright, safety and physically impossible constraints are never overrideable.

### Images menu controls locked so far

- move;
- proportional resize by default;
- crop;
- rotation for ordinary images;
- duplicate;
- delete;
- layer ordering;
- horizontal flip for ordinary images;
- vertical flip for ordinary images;
- adjustable opacity for ordinary images;
- user-invoked background removal;
- original-file preservation and undo.

Background removal:

- must never run automatically;
- is a user-selected `Remove background` action in the Images menu;
- shows a preview;
- preserves the original;
- is preferred for Phase 1 but is not a pilot blocker.

Aspect ratio:

- Images remain proportionally locked by default.
- Ordinary decorative artwork may deliberately unlock proportions.
- Official club logos may not be stretched or distorted.

### Official club-logo assets

- A club may have multiple administrator-approved official logo variants.
- Examples: primary full-colour, light-garment, dark-garment, team-specific or merchandise alternate.
- Each is a separate approved asset; the tool does not automatically recolour one into another.
- Give variants a simple name and optional usage guidance.
- Retain one default logo for general/store use.
- The approved source asset is immutable/versioned and cannot be silently replaced.
- Updating an official logo creates a proposed new asset version requiring administrator approval.
- Existing approved garments do not change.

Official logo placement/cleanup boundary still needs one concise final confirmation because the discussion evolved:

Clearly locked:

- users may move and proportionally resize an official logo;
- official logos may not be mirrored, distorted or recoloured;
- ordinary artwork may be flipped;
- mirror protection applies only to official club logos, not sponsor artwork;
- sponsor-logo treatment is the club/sponsor's responsibility and part of administrator design approval;
- Pivot can assist with a documented, reviewable exception but cannot override copyright/safety/physical constraints;
- background removal and crop/trim must be available during onboarding inside the Design Studio so volunteers do not need Canva or a separate editor;
- cleanup is non-destructive and preserves the original.

Still to tighten later:

- whether an already approved official logo can use free crop/opacity/rotation or whether those actions require creating a proposed cleaned variant. The user's intent is to allow background removal and cropping to remove blank space, while otherwise protecting logo integrity.

## Upload security branch deferred

The user asked whether uploads can contain viruses. The initial answer identified required protections:

- strict type allowlists and content verification;
- malware quarantine/scanning;
- SVG/PDF sanitisation or safe conversion;
- rejection of scripts, macros, archives and executable content;
- file-size, image-dimension and processing limits;
- isolated processing;
- private storage and safe download behaviour.

The user asked to return to onboarding rather than grill this branch immediately.

Before resuming detailed upload security, tell the user to switch reasoning from `high` to `max`.

## No-AI direction

- Phase 1 starting designs use curated deterministic recipes, not generative AI.
- Pivot wants to eliminate AI from operational workflows wherever deterministic code, curated assets or human review can perform the work.
- Any future AI use requires separately justified and approved consideration.
- Do not use AI for logo colour extraction or the shared asset library.

### Pivot penguin

- The Pivot penguin is not available for clubs to use.
- Kylie stated the existing penguin needs refinement because it was created using Canva AI.
- This is a separate brand-governance and asset-replacement task.
- Refinement will require approved Brand Kit and digital-asset version updates.

### Shared Design Elements library

- A curated library of animals, sport graphics, shapes, textures or other licensed/original elements is not Phase 1 scope.
- Consider it in Phoenix Pilot Phase 3.
- If introduced, use Pivot-owned or properly licensed non-AI assets and record licence/provenance.

## Draft saving and version history

### Authenticated club users

- Autosave draft changes continuously.
- Show clear saving, saved and error status.
- Designs can be named.
- Keep one current working draft rather than making every autosave a visible version.
- Maintain background recovery snapshots.
- Create user-visible versions only for:
  - named checkpoints;
  - submission;
  - approval or return;
  - duplication of an approved design into a new draft.
- Undo/redo is complete for the current editing session.
- After reopening, users restore checkpoints/recovery snapshots rather than replaying an indefinite command history.

### Public trial

- Remains session-only.
- No permanent autosave, account recovery or cross-session design saving.

## Mobile behaviour

- Full phone editing is preferred for Phase 1 but is not a pilot blocker.
- Desktop/tablet is the reliable fallback and preferred precision experience.
- The editor should still aim to support core phone editing without blocking access solely because of device type.
- Public website, sign-in, proof review, administrator approval and club-store browsing must work properly on phones even if the full editor is not yet phone-optimised.
- No native mobile app is required.

## Canvas navigation and boundaries

Core 2D editor navigation includes:

- zoom in/out;
- fit garment to view;
- reset zoom;
- pan while zoomed;
- mouse-wheel/trackpad and touch-pinch support;
- keyboard-accessible zoom controls.

Boundary guidance:

- Show relevant boundaries automatically while moving/resizing elements.
- Provide a toggle for seams, safe zones, bleed and restricted areas.
- Hide guides in clean preview/proof unless technically relevant.
- Validation continues while guides are hidden.
- Prevent placement outside physically printable material.
- Exact geometry depends on authoritative supplier templates and remains an external input.

## Editor element control levels

Use three template-configured levels:

1. **Fixed:** required and not movable/removable/restyled.
2. **Constrained:** required but editable inside approved size/colour/font/placement limits.
3. **Flexible:** optional content that can be added, moved, resized, rotated, layered and removed within printable boundaries.

- Exact classification combines supplier/manufacturing capability, sport/competition rules, Pivot product/quality controls and club choices.
- Supplier identity remains hidden.
- The supplier template may change available controls; do not hardcode one global element list.

## Number and player-name modes

### Numbers

Configure each product/template as:

1. **Required:** every produced garment has a number.
2. **Optional personalisation:** both numbered and unnumbered variants are approved; the player/family chooses when ordering.
3. **Not supported:** no number option.

- Required basketball numbers cannot be removed because competition requires them.
- Users may change the representative number and permitted styling for design review.
- Optional numbered treatments still receive the automatic `0–9` proof/quality check.
- The approved product remains one design, not separate designs per number choice.

### Player names

Use the same required/optional/not-supported modes.

- The design release defines approved name font, placement, colour, case and length rules.
- Phase 2 handles actual family-entered names and per-order validation.
- Basketball playing jerseys do not offer player names.
- Future sports/products may enable them.
- Approved name styles receive an automatic character-quality check for the permitted alphabet/case, apostrophe and hyphen.
- Actual names must be validated; unsupported characters are flagged, never silently substituted.

## Layer ordering

- Users may reorder flexible artwork, text and pattern layers.
- Protected required elements cannot be hidden behind other content.
- Template metadata determines fixed above/below relationships.
- Validation protects required number/mark visibility and legibility.

## Pattern controls

Where supplier/manufacturing capability permits, users may:

- select an approved pattern;
- change permitted colours;
- move its origin;
- adjust scale;
- rotate it;
- control continuation across supported panels.

Compliance behaviour:

- Pattern freedom cannot compromise required elements.
- Do not silently redesign when a pattern causes a contrast/compliance failure.
- Block submission and provide clear corrective options, such as changing required-element colour, applying an approved outline/backing panel or adjusting the pattern.
- Explain what failed, why it matters, which rule/production requirement applies and available fixes.
- The user chooses the correction.

## Coordinated range

- After the jersey establishes the direction, automatically generate coordinated starting drafts for matching shorts and polos.
- Use approved colours, pattern family and branding hierarchy.
- Do not blindly copy jersey artwork to different garment geometry.
- Generated products are drafts, never automatically approved.
- Each product has its own product-specific release and approval.
- Generate coordinated products from a specific jersey version.
- Later jersey edits do not silently update them.
- Offer `Update coordinated products` with a preview; applying updates requires explicit user action.
- Approved products never change automatically.

## Starting designs

- Use deterministic, production-tested design recipes rather than generative AI.
- Recipes combine the club's approved colours, selected logo, pattern family, required elements and selected garment template into controlled variations.
- Outputs must be fast, predictable, testable and supplier-safe.

## Font model

- Do not allow club users to upload arbitrary font files.
- Use a curated production-approved font library.
- A club's official brand font may be added during onboarding only after Pivot checks licensing, glyph coverage and production suitability.
- This protects reproducibility and avoids supplier substitution, unsafe font files and licensing problems.

## Remaining editor/product branches after the pending text question

Continue without supplier speculation:

1. finish text controls, including whether curved text or decorative effects are deferred;
2. design naming/duplication and comparison behaviour;
3. image opacity/official-logo cleanup boundary finalisation;
4. template switching and preservation of compatible work;
5. help/onboarding guidance inside the editor;
6. accessibility target, browsers/devices and pilot usability testing;
7. Phase 1 blocker versus preferred-enhancement matrix;
8. then switch to `max` for upload security/authentication/storage/infrastructure;
9. switch to `max` again for detailed 2D-to-3D architecture.

## Files changed in this session

- Updated `specs/pivot-design-tool-baseline/grill-me-handover-production-output.md` with the final Phase 2/Phase 3 and Director-discretion decisions.
- Added this handover file.
- No implementation code or baseline specification was changed.
