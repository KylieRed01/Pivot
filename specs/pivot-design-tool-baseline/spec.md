# Pivot Design Tool Baseline Specification

## Purpose

Define the baseline experience and technical direction for Pivot's garment design tool, informed by Playwright analysis of the BLK Design Your Own basketball configurator.

Reference inspected: `https://dyo.blksport.com/#/sport/basketball/cut/junior/color/yellow/15e9a63ffd8`

## Product Goal

Enable club users to configure supplier-safe garments visually, save versioned designs, obtain approvals, and produce a proof suitable for supplier review. The tool should provide the immediacy of a 3D configurator without allowing changes that cannot be manufactured.

## Baseline User Experience

The editor should provide:

1. A large central garment preview.
2. Real-time visual updates as options change.
3. Supplier-prepared base designs with predefined editable regions.
4. Front, back, and rotatable garment views.
5. A design-template browser.
6. A colour palette applied to the currently selected garment region.
7. Controlled logo-upload positions.
8. Player-number visibility and colour controls.
9. Save, submit, approval, publication, and proof-download actions.

## Functional Requirements

### FR-1: Garment and Template Selection

- Users must be able to select a sport, garment, cut, and supported age/category.
- Users must select from approved supplier templates rather than create unrestricted garment geometry.
- Each template must identify its editable regions and supported decoration positions.
- Changing template must update the preview without losing compatible selections where practical.

### FR-2: Real-Time Garment Preview

- The tool must display a supplier-approved 2D or 3D garment representation.
- The preview must update immediately when a user changes an option.
- Supported views must include front and back; rotation should be provided when a suitable 3D model exists.
- Placeholder models must be clearly labelled and must not be presented as production-accurate.

### FR-3: Colour Configuration

The initial basketball garment model should support independently configurable regions such as:

- Main colour
- Side panel
- Detail 1
- Detail 2
- Number colour
- Brand-mark colour
- Collar sections

Requirements:

- Available colours must come from an approved palette.
- The selected region and selected colour must be visually clear.
- Applying a colour must update only the selected region.
- Region availability must be defined by the selected template.

### FR-4: Numbers

- Users must be able to turn player numbers on or off.
- Users must be able to choose an approved number colour.
- Number font, size, and placement must use supplier-approved constraints.
- The preview should use a sample number and identify it as illustrative where relevant.

### FR-5: Logos and Artwork

- Templates must expose predefined logo positions.
- The baseline should support at least two logo-upload positions where permitted by the garment.
- Uploaded artwork must be previewed in the associated position.
- The system must validate file type, file size, resolution, and any supplier artwork requirements.
- Users must not be able to position artwork outside approved print areas.
- Production approval must remain blocked when artwork fails validation or requires supplier review.

### FR-6: Design State and Versioning

- Users must be able to save a design as a new version.
- Autosave or draft recovery should prevent accidental work loss.
- The interface must show save state, current version, and approval status.
- Users should be able to undo and redo changes during an editing session.
- A saved design must preserve the garment, template, colours, artwork references, and view-independent configuration.

### FR-7: Sharing and Routing

- Saved designs should have stable, shareable URLs or identifiers.
- URLs must not expose sensitive data.
- Opening a saved-design URL must restore the corresponding configuration, subject to access control.

### FR-8: Submission and Approval

- Users must be able to submit a saved version for approval.
- The existing club approval, Pivot approval, and publication sequence must remain enforced.
- Approval must apply to a specific immutable design version.
- Any design change after approval must create a new version and invalidate approvals where required.
- The interface must show blockers, required reviewers, and audit history.

### FR-9: Proof Generation

- Users must be able to download a PDF design proof.
- The proof should include garment views, selected options, artwork, design/version identifier, approval status, and production disclaimers.
- A proof generated from a placeholder model must be marked as non-production-ready.

### FR-10: Enquiry or Handover

- Where ordering is unavailable, users should be able to send the design to Pivot for follow-up.
- The handover should include the saved design identifier rather than relying only on free-text descriptions.
- Contact information must be validated and handled according to Pivot's privacy requirements.

## Technical Direction

The BLK reference appears to use a full-screen WebGL canvas, supplier-specific model data, SVG design layers, and texture maps including ambient occlusion, normal, fabric, and sewing textures.

Pivot should instead use:

- A WebGL canvas only for the garment preview.
- Standard semantic HTML controls around the preview.
- Supplier-prepared models and SVG/material templates.
- Structured template metadata describing editable regions and constraints.
- Server-side persistence for designs, versions, approvals, and artwork references.

The whole interface must not be drawn inside the canvas. Keeping controls in the DOM is required for accessibility, responsive behaviour, and reliable Playwright testing.

## Accessibility and Usability

- All controls must be keyboard accessible.
- Controls must have accessible names and visible focus states.
- Selected template, region, colour, and view must be programmatically exposed.
- Colour choices must include names or codes and must not rely on colour alone.
- Errors and approval blockers must be announced and displayed near the relevant action.
- The layout must support desktop and mobile use.

## Non-Functional Requirements

- The first usable editor view should load promptly on a typical broadband connection.
- Large 3D and texture assets should be lazy-loaded and cached.
- Failed model or texture loads must produce a recoverable error state.
- Uploaded files must be treated as untrusted input.
- Club data and designs must remain isolated according to existing role rules.
- Configuration updates must not require a full-page reload.

## Out of Scope for the Baseline

- Unrestricted freeform garment drawing.
- Modification of supplier garment geometry.
- Direct payments or checkout.
- Automatic confirmation that a design is manufacturable without supplier-approved assets and rules.
- Production-ready 3D output before exact supplier models are available.

## Acceptance Criteria

1. A user can open an approved basketball template and see a garment preview.
2. A user can select each supported garment region and apply an approved colour independently.
3. A user can toggle sample numbers and change their approved colour.
4. A user can upload valid artwork to predefined logo positions and see it previewed.
5. Invalid artwork receives a clear error and cannot pass production approval.
6. A user can switch between front and back views; rotation works when a 3D model is available.
7. A user can save a new immutable design version and reopen it from a stable identifier.
8. Club and Pivot reviewers can approve the same saved version in the required sequence.
9. Editing an approved design creates a new version and does not silently retain stale approvals.
10. A user can download a PDF proof containing the design identifier and production status.
11. Core editor controls can be operated with a keyboard and located by accessible role/name in Playwright.
12. Placeholder assets are visibly identified and cannot be mistaken for supplier-approved production assets.

## Test Approach

Playwright coverage should include:

- Loading the editor and selecting a template.
- Changing each editable colour region and verifying preview state.
- Switching garment views.
- Toggling numbers.
- Valid and invalid logo uploads.
- Save and reload of a design version.
- Approval sequencing and stale-approval prevention.
- PDF-proof initiation.
- Keyboard navigation and accessible control names.
- Model/asset load failure handling.
- Club access isolation.

Visual regression snapshots may be used for stable supplier-approved templates, but they should complement rather than replace state and accessibility assertions.

## Reference Findings

The Playwright investigation screenshots are currently stored in `test-results/` and include the initial configurator, colour controls, logo controls, and contact panel. These files are test artifacts and are not normative product assets.
