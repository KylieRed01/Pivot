# Club-interest Fastmail delivery

**Status:** Approved decisions captured; implementation credential-gated  
**Work type:** Development  
**Owner:** Main Website

## Problem

The release homepage currently uses a `mailto:` form action. That is not an approved release approach because it depends on the visitor's email client and provides Pivot no reliable in-house submission result.

## Required outcome

The existing in-house club-interest form submits to a same-origin Pivot server endpoint. The server validates and limits the submission, applies proportionate anti-spam controls, delivers it through Fastmail SMTP to `hello@pivotteamwear.com`, and returns a safe result that the form presents accessibly.

## Authoritative Fastmail configuration

- Host: `smtp.fastmail.com`
- Port: `465`
- Security: SSL/TLS
- Username: full Fastmail login address
- Password: dedicated app password named **Pivot website contact form**
- Recipient: `hello@pivotteamwear.com`
- Never use the normal Fastmail account password.
- Store credentials only through the approved deployment platform's secret manager.

## Requirements

### FR-1 — In-house submission

- The form posts through JavaScript to `POST /api/club-interest` on the same origin.
- Release markup contains no `mailto:` action.
- Essential homepage markup remains server-rendered.

### FR-2 — Accepted data

- Required: contact name, club name, email address, sport, league or association, and club suburb or town.
- Conditional: other sport, association or locality when **Other** is selected.
- Values are trimmed and bounded server-side.
- Unknown fields are not included in email output.

### FR-3 — Abuse and request controls

- Accept JSON only.
- Apply a small request-body limit specific to this endpoint.
- Reject cross-origin browser submissions when an Origin header is present.
- Include a hidden honeypot field; a completed honeypot receives a neutral response without sending mail.
- Apply an in-memory per-client rate limit suitable for the current single-process application. Treat distributed rate limiting as a deployment review item if the app scales to multiple processes or Machines.

### FR-4 — Fastmail delivery

- Use authenticated SMTP over TLS.
- Send to `hello@pivotteamwear.com`.
- Set Reply-To to the validated submitter email.
- Do not place user input in SMTP envelope addresses other than validated Reply-To.
- Keep SMTP details behind a small mail-transport interface so tests send no real email.

### FR-5 — Safe handling

- Never log SMTP credentials or submitted field values.
- Log only a non-personal delivery outcome code.
- Return generic validation, rate-limit and delivery-failure responses.
- Do not claim success unless the mail transport accepts the message.

### FR-6 — Accessible form result

- Disable duplicate submission while a request is pending.
- Present success or failure in a visible status region.
- Use the existing approved success copy: “Thanks for registering your club’s interest. We’ve got your details and will be in touch when it’s time for the next play.”
- Preserve entered values after a recoverable failure.

## Environment

- `FASTMAIL_SMTP_USER` — full Fastmail login address
- `FASTMAIL_SMTP_APP_PASSWORD` — dedicated generated app password
- `CLUB_INTEREST_RECIPIENT` — optional override; defaults to `hello@pivotteamwear.com`

The server must fail closed for submissions when required SMTP configuration is absent while continuing to serve the website.

## Out of scope

- Mailing-list or campaign management
- General-purpose notification platform
- CRM integration
- Storing submissions in Pivot's fixture file or browser storage
- CAPTCHA unless observed abuse shows the proportionate controls are insufficient
- Changes to the Pivot Design Studio

## Verification

- Node tests cover validation, conditional fields, honeypot, same-origin enforcement, rate limiting, transport success/failure, absent configuration and browser form behaviour.
- `npm run check`, `npm test` and `git diff --check` pass outside concurrent Design Studio edits.
- Manual verification covers keyboard submission, pending state, visible success/failure, external Fastmail delivery and Reply-To after deployment secrets are configured.
