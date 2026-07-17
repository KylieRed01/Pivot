# Implementation Summary: Website and Pivot Design Studio Demonstrator

**Date:** 2026-07-17

**Branch:** `phoenix-phase-1`

**Specification:** [`spec.md`](./spec.md)

**Plan:** [`plan.md`](./plan.md)

**Tasks:** [`tasks.md`](./tasks.md)

**Status:** Implementation complete; ready for structured review

## Delivered

### Public website

- Reconciled pilot availability, Greater Bendigo service boundary, product, FAQ and contact copy.
- Added a direct `hello@pivotteamwear.com` fallback without exposing a non-functional registration form.
- Kept section navigation available at phone width.
- Corrected serious automated contrast findings.

### Public Pivot Design Studio

- Added a dedicated `#studio` route separated from the backend-backed workflow simulation.
- Public work uses browser `sessionStorage`; it does not call `/api/admin` or `/api/designs/*`.
- Added an explicit pre-entry acknowledgement of the browser-local demonstrator boundary.
- Limited the active editor to the placeholder basketball jersey.
- Shows club polos as unavailable pending templates and shorts as provisional pending cost.

### Authoritative demonstrator 2D editor

- Added four independent surfaces: dark/light × front/back.
- Added bounded undo/redo and browser-session restoration.
- Kept the CSS side/3D effect optional, indicative and non-authoritative.
- Protected required basketball numbers through the state boundary and UI paths.
- Kept basketball player names unavailable.

### Supplier-independent controls

- Colours and exploratory patterns.
- Text wording, colour, size, position, rotation, alignment and spacing.
- Flexible layer duplication, deletion and ordering.
- Browser-local PNG/JPEG/WebP artwork up to 5 MB.
- Image position, proportional scale, crop, rotation, opacity and horizontal/vertical flip.
- Clear rejection guidance for SVG, PDF, HEIC and specialist formats.
- Zoom, fit/reset and bounded pan.
- Structured controls and keyboard arrow movement as alternatives to dragging.

### Help, checks and simulation containment

- Added contextual Help that identifies 2D authority and all unresolved dependency classes.
- Added deterministic indicative errors, warnings and guidance.
- Added an accessible design-check dialog that cannot claim manufacturing readiness.
- Isolated the existing workflow at `#workflow-demo` with persistent simulation notices.
- Clarified that fixture actions do not create production authentication, proof, manufacture release or supplier acknowledgement.
- Renamed seeded customer-facing Coach Polo wording to Club Polo while preserving internal IDs.

### Accessibility and responsive behaviour

- Added semantic labels, state attributes, focus treatment and status messaging.
- Retained required editor tools at phone width.
- Added reduced-motion handling.
- Added axe scans for website, setup and editor states.
- Added desktop and mobile browser projects.

## Automated evidence

```text
npm run check     PASS
npm test          26/26 PASS
npm run test:e2e  115/115 PASS
npm audit         0 vulnerabilities
```

Playwright projects:

- Desktop Chromium
- Desktop Firefox
- Desktop WebKit
- Representative mobile Chrome viewport
- Representative mobile Safari viewport

Automated axe checks report no serious/critical violations in covered states.

## Manual evidence still required

These are pilot-readiness checks, not incomplete implementation tasks:

- actual current/recent iPhone and iPad Safari;
- actual current/recent Android Chrome devices;
- desktop Edge and Safari where available;
- screen-reader spot checks;
- 200% and 400% zoom checks; and
- realistic task testing with 5–8 Phoenix volunteers.

See [`quickstart.md`](./quickstart.md).

## Explicitly unresolved and excluded

- Supplier selection and authoritative templates
- Final Phoenix artwork
- Production infrastructure and authentication
- Accurate 3D and garment mapping
- Manufacturing integration and production exports
- Production proof/artifact/release functionality
- Production upload quarantine, scanning and sanitisation
- Registration persistence and email delivery
- Ordering, payments, rosters, names and personalisation

No excluded production or supplier-dependent capability was implemented.

## Review recommendation

Run the structured code-review workflow against `spec.md`, `plan.md`, `tasks.md` and the complete git diff before merge. Pay particular attention to public/server isolation, state-history invariants, accessibility, and the absence of production claims.
