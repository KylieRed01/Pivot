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

- Club-interest delivery is an in-house website form connected to Fastmail SMTP through a same-origin server endpoint. `mailto:` is not an approved release approach and must be removed; do not reopen this decision.
- Fastmail setup requires a dedicated app password named **Pivot website contact form**, created under **Settings → Privacy & Security → Connected apps & API tokens** and stored in Pivot’s password manager. Never use the normal Fastmail account password.
- Use SMTP host `smtp.fastmail.com`, port `465`, SSL/TLS, the full Fastmail login address as the username, the generated app password as the password, and `hello@pivotteamwear.com` as the recipient. Add credentials only as server/deployment secrets, including Fly secrets when Fly is the deployment target. Never place them in project files, browser code, logs or plain-text notes.
- The server endpoint must perform server-side validation, enforce submission limits and anti-spam protection, handle delivery errors safely, avoid credential or sensitive form-data logging, and return clear success or recoverable failure states to the form.
- Century Gothic and Calibri web-font licensing and availability must be confirmed before release. The current CSS requests those fonts locally and distributes no Century Gothic or Calibri files, so unlicensed redistribution is avoided but fallback rendering remains possible. Do not download, embed, self-host or substitute those brand fonts without an approved licensing and brand decision.
- The OFL-1.1 garment fonts recorded as **Evaluation** in `docs/brand/Font Register.md` are a development-only exception. They may be self-hosted in the explicitly labelled, non-production Studio trial with their licence evidence and blocking release checks. This does not approve them for production or change website brand typography.

## Delivery

- Load only the CSS and JavaScript needed by the page. Keep homepage styles separate from the Pivot Design Studio bundle.
- Prefer semantic HTML and native controls; add JavaScript only for behaviour that requires it.
- Keep local review interactions non-transactional and retain their explicit local-only status.
- Before completion, run the existing Node test suite and perform manual HTTP verification of changed routes, assets, metadata and non-indexing controls.
