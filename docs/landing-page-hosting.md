# Pivot Teamwear Landing Page Hosting Decision

**Status:** Approved  
**Date:** 2026-07-25  
**Scope:** Public marketing landing page only. This does not select the Pivot product host.

## Decision

Host the one-page Pivot Teamwear landing page on Cloudflare Pages at `https://pivotteamwear.com`.

- Pivot owns a dedicated Cloudflare account; it is not shared with Caylios.
- VentraIP remains the domain registrar. DNS is delegated to Cloudflare only when the page is ready.
- Fastmail remains the mail provider. The public contact address is `hello@pivotteamwear.com`.
- Cloudflare provides DNS, TLS, apex-to-`www` redirect handling, static hosting, and anonymous web analytics.
- The landing page is dependency-free HTML, CSS, SVG/assets, and small vanilla JavaScript. CSS/SVG/JavaScript animation is permitted; motion must respect `prefers-reduced-motion`.

## Routing

| Address | Purpose | Host |
|---|---|---|
| `pivotteamwear.com` | Public landing page | Cloudflare Pages |
| `www.pivotteamwear.com` | Redirect to apex | Cloudflare |
| `app.pivotteamwear.com` | Future Pivot product entry point | Future application host |
| `{club}.pivotteamwear.com` | Future club-branded store or administration portal | Future application host via wildcard DNS/TLS |

The apex landing page remains separate from the future product. Reserve the wildcard route now; final club/store routing behaviour remains a future product decision.

## Source and release workflow

Landing-page source belongs in this repository in a dedicated static directory (for example, `landing/`) and will be added only after the current landing-page work is available in the repository. Do not duplicate or recreate the unpushed landing page. Its public URL will still be the domain root: `landing/index.html` is served as `https://pivotteamwear.com/`.

1. Develop and check changes locally on a feature branch.
2. Push the branch to GitHub. Cloudflare Pages creates a preview URL for review/UAT.
3. Merge an approved pull request into protected production branch only after automated static checks, including HTML/link validation.
4. Cloudflare Pages deploys that branch automatically to production.
5. Roll back by reverting the production merge if necessary.

No manual upload to Cloudflare is part of the normal release path. A permanent UAT hostname is not required.

## DNS cutover

Before changing nameservers, deploy and verify the page at its temporary Cloudflare `pages.dev` address. During Cloudflare onboarding, import and verify every existing DNS record before delegation, especially Fastmail MX, SPF, DKIM, and DMARC records. Only then change the nameservers at VentraIP and attach the apex domain to the Pages project.

## Future product constraints

- Cloudflare is the common DNS/static/edge layer, not a commitment to use Cloudflare for product compute or storage.
- The product host remains undecided. Prefer an Australian-region managed platform that consolidates compute, database, storage, background/scheduled jobs, logs, and monitoring to minimise operational overhead.
- Pivot’s Constitution requires customer data, uploaded artwork, database backups, and audit records to remain in Australia in production. Global delivery is permitted for static public assets.
- WorkOS is the provisional shared identity-provider preference, subject to DPA/subprocessor review. Keep Pivot’s identity tenant and access administration separate from Caylios.
- Future payments will be delegated to a specialist provider. Pivot retains only provider identifiers and payment/subscription status, never card or bank details.

## Out of scope

This decision does not choose a product host, database, payment provider, final identity-provider contract, final club/store routing behaviour, or production monitoring implementation.
