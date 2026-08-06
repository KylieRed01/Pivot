# Club-interest Fastmail delivery — implementation summary

## Completed without live credentials

- Replaced the release form's `mailto:` action with the same-origin `/api/club-interest` endpoint.
- Added accessible pending, success and recoverable failure handling while preserving values after failure.
- Added server-side required and conditional validation, field bounds and control-character rejection.
- Added a 16 KiB endpoint body limit, JSON-only intake and Origin checks.
- Added a neutral honeypot response and per-client five-submission/fifteen-minute in-memory rate limit.
- Added safe malformed-request and SMTP-failure responses without logging submitted values or provider errors.
- Added Fastmail SMTP/TLS delivery through Nodemailer using host `smtp.fastmail.com`, port `465` and an injected sender boundary.
- Added environment-based configuration and fail-closed submission behaviour when credentials are absent.
- Removed `mailto:` from the form CSP permission.
- Updated website and architecture documentation.

## Verification

- `npm run check` — passing
- `npm test` — 116/116 passing
- `node --test test/club-interest-delivery.test.js` — 8/8 passing
- `npm audit --audit-level=high` — zero vulnerabilities
- `git diff --check` — passing

No live Fastmail message was sent and no credentials were used.

## External credential gate

Live delivery requires:

- `FASTMAIL_SMTP_USER`
- `FASTMAIL_SMTP_APP_PASSWORD`
- optional `CLUB_INTEREST_RECIPIENT` (defaults to `hello@pivotteamwear.com`)

The app password must be the dedicated Fastmail password named **Pivot website contact form**, not the normal account password. Add the values through the deployment secret manager/Fly secrets; never commit them.

## Live verification remaining

1. Configure deployment secrets.
2. Submit the deployed form from an external browser.
3. Confirm receipt at `hello@pivotteamwear.com`.
4. Confirm Reply-To addresses the validated submitter.
5. Confirm a forced delivery failure presents the safe recoverable form state.
