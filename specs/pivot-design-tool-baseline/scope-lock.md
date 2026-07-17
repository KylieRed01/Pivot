# Scope Lock: Website and Pivot Design Studio Demonstrator

## Locked implementation scope

Implement only the existing public Pivot website, the public browser-local Pivot Design Studio basketball-jersey demonstrator, and clear containment of the existing Phoenix workflow simulation.

Required outcomes are `AC-01`–`AC-12` as mapped in `plan.md`:

- truthful public copy and Greater Bendigo service boundary;
- public browser-local state with no protected API/design writes;
- basketball jersey as the only active editor target;
- club-polo terminology and provisional shorts labels;
- placeholder and unresolved-dependency notices;
- authoritative front/back, dark/light 2D editing;
- optional indicative side/3D effect;
- supplier-independent colour, pattern, text and raster-artwork controls;
- required basketball number and no player names;
- contextual help and indicative checks;
- clearly simulated workflow identities/actions; and
- WCAG 2.2 AA-oriented semantic and keyboard-operable alternatives.

## Locked exclusions

Do not implement:

- cloud/provider, hosting, deployment, production storage, monitoring or backups;
- production authentication, sessions, registration persistence or email delivery;
- supplier selection, supplier templates, print geometry, production colour mapping or supplier APIs;
- production proof/PDF/export/checksum/release/manufacturing records;
- accurate 3D, UV maps, seam/panel mapping or manufacturing integration;
- malware scanning, sanitisation, quarantine, HEIC conversion or production uploads;
- automatic colour extraction, background removal or completed-design conversion;
- full polo/short templates, coordinated product generation, ordering, payments, rosters, names or personalisation; or
- final Phoenix colours, logos, sponsor placement or artwork.

## Dependency rule

If an implementation choice requires an excluded supplier or infrastructure decision, stop that slice, record the blocker in `implementation-log.md`, and retain a truthful placeholder/manual boundary. Do not speculate.

## Change-control rule

Any scope expansion requires explicit user approval and an update to `spec.md`, `plan.md`, `tasks.md`, and this scope lock before implementation.
