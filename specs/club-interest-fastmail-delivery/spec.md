# Club-interest Fastmail delivery

**Status:** Local Cloudflare-compatible implementation complete; deployment and credential gated
**Work type:** Development  
**Owner:** Main Website

## Problem

The release homepage currently uses a `mailto:` form action. That is not an approved release approach because it depends on the visitor's email client and provides Pivot no reliable in-house submission result.

## Required outcome

The existing in-house club-interest form submits to a same-origin Cloudflare Pages Function. The function validates and limits the submission, applies proportionate anti-spam controls, delivers it through Fastmail JMAP over HTTPS to `hello@pivotteamwear.com`, and returns a safe result that the form presents accessibly.

The Director approved local implementation of Cloudflare Pages Functions and Fastmail JMAP for this form on 7 August 2026. This does not approve a preview or production deployment, Cloudflare/Fastmail configuration, secret creation or release.

## Authoritative provider configuration

- Runtime: the existing Cloudflare Pages project with a same-origin Pages Function at `/api/club-interest`
- Fastmail protocol: JMAP over HTTPS
- Credential: dedicated Fastmail API token with only the permissions required to discover the sending identity and drafts mailbox, create the message and submit it
- Sending identity: approved full Fastmail address
- Recipient: `hello@pivotteamwear.com`
- Never use the normal Fastmail account password.
- Store the token only as an encrypted Cloudflare secret and keep preview and production configuration separate.

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
- Apply a path-specific Cloudflare edge rate limit before function execution. The exact rule and current-plan availability are release gates.
- Do not rely on in-memory function state because Cloudflare isolates do not share it.
- Retain the hidden honeypot, bounded intake and same-origin checks as defence in depth. CAPTCHA or durable state remains out of scope unless observed abuse justifies separate approval.

### FR-4 — Fastmail delivery

- Use authenticated Fastmail JMAP requests over HTTPS.
- Discover and require the configured approved Fastmail identity and drafts mailbox rather than selecting an arbitrary identity.
- Send to `hello@pivotteamwear.com`.
- Set Reply-To to the validated submitter email.
- Do not place user input in address fields other than validated Reply-To or in provider URLs and credentials.
- Keep JMAP session discovery, message creation and submission behind a small delivery interface so tests send no real email.
- Use bounded request timeouts and treat missing or rejected JMAP results as delivery failure.

### FR-5 — Safe handling

- Never log JMAP credentials, submitted field values or provider response bodies.
- Log only a non-personal delivery outcome code.
- Return generic validation, rate-limit and delivery-failure responses.
- Do not claim success unless the mail transport accepts the message.

### FR-6 — Accessible form result

- Disable duplicate submission while a request is pending.
- Present success or failure in a visible status region.
- Use the existing approved success copy: “Thanks for registering your club’s interest. We’ve got your details and will be in touch when it’s time for the next play.”
- Preserve entered values after a recoverable failure.

## Environment

- `FASTMAIL_JMAP_TOKEN` — encrypted secret containing the dedicated Fastmail API token
- `FASTMAIL_JMAP_SENDER` — approved Fastmail sending identity
- `CLUB_INTEREST_RECIPIENT` — optional override; defaults to `hello@pivotteamwear.com`

The function must fail closed for submissions when required JMAP configuration is absent while static website delivery continues.

## Out of scope

- Mailing-list or campaign management
- General-purpose notification platform
- CRM integration
- Storing submissions in Pivot's fixture file or browser storage
- CAPTCHA unless observed abuse shows the proportionate controls are insufficient
- Changes to the Pivot Design Studio

## Verification

- Node tests cover validation, conditional fields, Pages Function body limits, honeypot, same-origin enforcement, JMAP discovery and submission, provider failure, absent configuration and browser form behaviour.
- Cloudflare edge-rate-limit behaviour is verified manually because no Cloudflare deployment or browser automation is authorised in the local implementation.
- `npm run check`, `npm test` and `git diff --check` pass outside concurrent Design Studio edits.
- Before release, manually verify keyboard submission, pending state, visible success/failure, external Fastmail delivery, Reply-To, edge rate limiting, secret handling and the approved privacy disclosure.
