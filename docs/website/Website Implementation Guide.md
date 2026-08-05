# Website Implementation Guide

**Scope:** Pivot website, club-store and local review pages

## Authority

Read the Pivot Constitution and current approved governing documents before changing website behaviour or presentation. Apply governing requirements in this order: Business Plan, Operating Model, then Brand Kit. The Visual Design Guide translates the Brand Kit for customer-facing experiences; the Brand Kit remains primary for brand decisions. Stop and resolve any conflict rather than choosing silently.

## Content and brand

- Use approved messaging, product facts, assets and claims only.
- Write in clear, professional, approachable and practical Australian English.
- Use the approved logo artwork without alteration. Supply useful `alt`, `width` and `height` attributes.
- Use Century Gothic for headings and Calibri for body copy, with the documented fallbacks.
- Use Midnight Blue `#092C71` as the dominant colour, Cerulean Blue `#0096D6` as support, Orange `#F4951D` sparingly for action or emphasis, and White `#FFFFFF` or Black `#000000` for contrast. Derive supporting surfaces with traceable `color-mix()` values.
- Keep repeated cards visually consistent unless a real state or meaning requires a difference.
- Keep internal review, placeholder and availability labels visible on local/testing pages.

## Page baseline

- Set `lang="en-AU"`, a useful title and description, responsive viewport metadata, and the approved SVG favicon.
- Keep unreleased and local/testing pages excluded with `noindex,nofollow`.
- Use one clear `h1`, logical heading order, semantic landmarks, and a visible-on-focus skip link to a focusable main landmark.
- Give links, buttons and form controls clear labels, pointer feedback and high-contrast `:focus-visible` feedback.
- Make navigation wrap rather than requiring horizontal page controls on narrow screens.
- Preserve readable content order and single-column fallbacks at small widths.
- Respect `prefers-reduced-motion: reduce` by removing non-essential animation, transition and smooth scrolling.

## Release dependencies

- Club-interest form delivery is waiting on Kylie’s Fastmail setup. Treat this as an external dependency; do not redesign or reopen the agreed form approach.
- Century Gothic and Calibri web-font licensing and availability must be confirmed before release. The current CSS requests locally installed fonts and distributes no font files, so unlicensed redistribution is avoided but fallback rendering remains possible. Do not download, embed, self-host or substitute these fonts without an approved licensing and brand decision.

## Delivery

- Load only the CSS and JavaScript needed by the page. Keep homepage styles separate from the Pivot Design Studio bundle.
- Prefer semantic HTML and native controls; add JavaScript only for behaviour that requires it.
- Keep local review interactions non-transactional and retain their explicit local-only status.
- Before completion, run the existing Node test suite and perform manual HTTP verification of changed routes, assets, metadata and non-indexing controls.
