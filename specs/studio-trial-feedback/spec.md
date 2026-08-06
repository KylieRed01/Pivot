# Pivot Design Studio trial feedback

**Status:** Approved for local implementation; deployment-gated
**Work type:** Development
**Owner:** Design Studio

## Purpose

Make it easy for an invited public Design Studio tester to tell Pivot what worked, what was confusing or what they expected without leaving the Studio.

## Approved workflow

- The Studio presents one feedback message field and one optional reply-email field.
- Garment, current 2D or indicative side view and browser user-agent are added automatically and disclosed beside the form.
- Design name and category are not collected or sent.
- The browser submits to the same-origin `POST /api/studio-feedback` endpoint.
- The server validates and bounds accepted fields, applies proportionate abuse controls and emails the feedback through Fastmail to `hello@pivotteamwear.com`.
- A supplied valid email becomes Reply-To.
- Pivot does not otherwise store the feedback.
- Logs contain only non-personal delivery outcome codes, not feedback, email addresses, browser details or SMTP errors.

## Accepted data

| Field | Requirement | Maximum |
|---|---|---:|
| Feedback message | Required | 3,000 characters |
| Reply email | Optional; must be valid when present | 254 characters |
| Garment identifier | Automatic context | 40 characters |
| Current 2D or indicative side view | Automatic context | 30 characters |
| Browser user-agent | Automatic, disclosed troubleshooting context | 500 characters |
| Honeypot | Abuse control; never delivered | n/a |

Unknown fields are not included in delivery.

## Request and abuse controls

- Accept JSON only with a 16 KiB endpoint body limit.
- Reject cross-origin browser requests when an Origin header is present.
- Return a neutral success for a completed honeypot without delivering feedback.
- Permit at most ten accepted submissions per client in fifteen minutes in the current single-process runtime.
- Client attribution behind a reverse proxy must not trust a forwarding header until the approved host's runtime and trusted-proxy boundary are confirmed.

## Delivery and failure behaviour

- Use authenticated Fastmail SMTP over TLS with credentials held only in the approved deployment secret manager.
- Use `FASTMAIL_SMTP_USER` and `FASTMAIL_SMTP_APP_PASSWORD`.
- `STUDIO_FEEDBACK_RECIPIENT` may override the default `hello@pivotteamwear.com` recipient.
- Disable duplicate submission while delivery is pending.
- Show a visible pending, success or recoverable failure status.
- Preserve the message and optional email after failure; clear them only after confirmed delivery.
- Fail closed when delivery is not configured and never claim success after transport failure.

## Out of scope

- A feedback database, dashboard, ticketing system or analytics platform.
- External survey providers.
- Design-file submission or attachment.
- Permanent collection of Studio state.
- Changes to the temporary landing page.

## Release gates

- Confirm the existing Cloudflare hosting setup can run the same-origin server endpoint and securely configure secrets without approving an additional Cloudflare product by assumption.
- If the current host is static-only, return the runtime constraint to the Director for a provider/capability decision; do not expose SMTP credentials to the browser.
- Confirm the reverse-proxy client-address trust boundary before relying on per-client production rate limiting.
- Configure Fastmail secrets without committing them.
- Manually submit externally and confirm receipt, Reply-To, pending/success behaviour and recoverable forced failure.
- Keep the tester release `noindex,nofollow`.

## Automated verification

Tests cover bounded validation, unknown-field exclusion, browser payload minimisation, SMTP configuration, optional Reply-To, same-origin enforcement, honeypot handling, request bounds, rate limiting, absent configuration and safe delivery failure.
