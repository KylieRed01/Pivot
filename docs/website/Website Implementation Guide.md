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

- Cloudflare is Pivot's approved web host and currently serves `pivotteamwear.com` until the Director approves a change. On 7 August 2026 the Director approved local implementation of a narrowly scoped Pages Function for the club-interest form; deployment, secret configuration, edge-rate-limit configuration and live-site changes remain separately gated. The current static deployment and temporary landing page must remain unchanged until those gates are approved.
- Fastmail is Pivot's approved mail server across Pivot. Each email workflow must still have an approved purpose, recipients, content, personal-data handling and release boundary.
- Studio trial feedback is an approved in-house workflow for invited testers. Collect one required feedback message, an optional reply email and disclosed automatic garment, current-view and browser details. Do not collect the design name or store submissions outside the Fastmail message. Deliver to `hello@pivotteamwear.com` through the same-origin server endpoint and preserve entered values after recoverable failure.
- Club-interest delivery is an in-house website form connected through a same-origin Cloudflare Pages Function to Fastmail JMAP over HTTPS. `mailto:` is not an approved release approach; do not reopen this decision.
- Club-interest Fastmail setup requires a dedicated least-privilege API token created under **Settings → Privacy & Security → Connected apps & API tokens** and retained in Pivot’s password manager. Store it only as the encrypted `FASTMAIL_JMAP_TOKEN` Cloudflare secret. Configure the approved sending identity as `FASTMAIL_JMAP_SENDER`; the recipient remains `hello@pivotteamwear.com`. Never use the normal Fastmail account password or place the token in project files, browser code, logs or plain-text configuration.
- Studio-feedback delivery remains on its separately approved SMTP implementation until a separate provider-scope and implementation decision changes it. Its dedicated app-password handling must not be conflated with the club-interest JMAP token.
- The server endpoint must perform server-side validation, enforce submission limits and anti-spam protection, handle delivery errors safely, avoid credential, provider-response or sensitive form-data logging, and return clear success or recoverable failure states to the form. The Pages Function must use a path-specific Cloudflare edge rate limit before release because isolate-local in-memory limits are not dependable.
- Century Gothic and Calibri web-font licensing and availability must be confirmed before release. The current CSS requests those fonts locally and distributes no Century Gothic or Calibri files, so unlicensed redistribution is avoided but fallback rendering remains possible. Do not download, embed, self-host or substitute those brand fonts without an approved licensing and brand decision.
- The OFL-1.1 garment fonts recorded as **Evaluation** in `docs/brand/Font Register.md` are a development-only exception. They may be self-hosted in the explicitly labelled, non-production Studio trial with their licence evidence and blocking release checks. This does not approve them for production or change website brand typography.

## Delivery

- Load only the CSS and JavaScript needed by the page. Keep homepage styles separate from the Pivot Design Studio bundle.
- Prefer semantic HTML and native controls; add JavaScript only for behaviour that requires it.
- Keep local review interactions non-transactional and retain their explicit local-only status.
- Before completion, run the existing Node test suite and perform manual HTTP verification of changed routes, assets, metadata and non-indexing controls.
