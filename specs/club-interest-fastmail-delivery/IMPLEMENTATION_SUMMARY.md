# Club-interest Fastmail delivery — implementation summary

## Completed locally without deployment or credentials

- Retained the release form's same-origin `POST /api/club-interest` contract and accessible pending, success and recoverable-failure handling.
- Added a Cloudflare Pages Function for the same-origin production boundary.
- Reused the accepted bounded club-interest validation and added Pages-compatible JSON-only intake, a 16 KiB body limit, Origin checks and a neutral honeypot response.
- Added Fastmail JMAP delivery over HTTPS with an injected `fetch` boundary, an eight-second timeout and no new runtime dependency.
- Added JMAP session discovery, exact configured-identity selection, drafts-mailbox discovery, plain-text message creation and email submission.
- Added safe missing-configuration, malformed-request and provider-failure responses without logging credentials, submitted values or provider responses.
- Updated the local Node server to use the same JMAP delivery module for club-interest delivery. Nodemailer remains only for the separately approved Studio-feedback SMTP workflow.
- Preserved the existing browser form and temporary landing-page isolation.

No Cloudflare or Fastmail settings were changed. No preview or production deployment was created. No live message was sent and no credentials were used.

## Local configuration contract

Future Cloudflare configuration requires:

- `FASTMAIL_JMAP_TOKEN` as an encrypted secret;
- `FASTMAIL_JMAP_SENDER` as the approved Fastmail sending identity; and
- optional `CLUB_INTEREST_RECIPIENT`, defaulting to `hello@pivotteamwear.com`.

Never commit or paste the token into source, browser code, logs or plain-text configuration.

## Release gates

1. Separately approve and create a preview deployment without changing the live domain, DNS or temporary landing page.
2. Create a dedicated least-privilege Fastmail API token and configure it only as an encrypted Cloudflare secret.
3. Confirm a path-specific Cloudflare edge-rate-limit rule is available on the current plan and configure it before release. The function intentionally does not rely on isolate-local memory.
4. Confirm the privacy disclosure accurately covers Cloudflare and Fastmail processing, including overseas handling where required.
5. Submit the preview form from an external browser and confirm receipt at `hello@pivotteamwear.com` and the validated Reply-To address.
6. Confirm safe absent-configuration, forced-delivery-failure, body-limit and rate-limit behaviour.
7. Obtain separate approval before any production deployment or live-site change.

## Verification

Run locally:

```bash
npm run check
npm test
git diff --check
```

Browser, deployed-provider and edge-rate-limit verification remains manual. Playwright and axe-core Playwright remain prohibited.
