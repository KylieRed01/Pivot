# Pivot repository guardrails

## Required reading

Before changing product, brand, website or Studio behaviour, read:

1. `docs/Pivot Constitution.md`
2. `docs/Business Plan_V1.01.pdf`
3. `docs/Operating Model_V1.02.pdf`
4. `docs/brand/Brand Kit_V1.01.pdf`
5. `docs/brand/Visual Design Guide_V1.01.pdf`
6. `docs/website/Website Implementation Guide.md`

Apply the governing-document precedence recorded in the Constitution.

## Architecture and project scale

Before changing repository structure, module ownership or dependency direction, read:

- `docs/Capability Map.md`
- `docs/architecture/README.md`

Keep Pivot as a capability-oriented modular monolith proportionate to its current scale. Do not create speculative directories, empty architectural containers or shallow forwarding modules. Extract a boundary only when it hides meaningful complexity, establishes one owner for a decision or invariant, or has a demonstrated independent change driver or consumer.

Preserve existing deep modules unless a simpler interface results, and update the architecture catalogue when module responsibility, public interface or dependency direction changes.

## Non-negotiable vendor and provider authority

The coding assistant has no authority to select, allocate or assume approval of any external vendor or provider.

- Keep hosting, deployment, identity, storage, email, analytics, payments, signing, monitoring and other provider-dependent requirements provider-neutral until the user explicitly approves the named provider and its scope.
- Do not create provider accounts, applications or projects; install provider CLIs, SDKs or dependencies; add provider-specific configuration, secrets, headers, adapters or documentation; or deploy to a provider before that explicit approval.
- Tool availability, examples, conditional documentation, existing account access and prior use are not approval.
- Approval for one provider use is limited to that recorded scope and must not be extended to another capability. Fastmail is approved as Pivot's mail server across Pivot. That vendor approval does not itself approve the purpose, recipients, content, personal-data handling or release of a particular email workflow.
- Cloudflare is Pivot's approved web host and currently serves `pivotteamwear.com` until the user explicitly approves a change. This approval does not extend to additional Cloudflare products or services. Do not allocate or migrate to another web host because a requirement is unsupported or the incumbent platform is not yet understood; first establish its capabilities and present any constraint for decision.
- Present options and their costs, risks, data handling and operational implications for decision; do not present an option as selected or required before approval.

## Non-negotiable tooling rule

**Do not install, use or reintroduce Playwright or axe-core Playwright.**

This includes:

- Playwright dependencies or package scripts
- `playwright.config.*`
- Playwright E2E test directories
- Playwright-generated reports or result directories
- Browser automation for project verification

Use the existing Node test suite and documented manual verification instead.

## Landing-page isolation

- The Design Studio release home page is `public/index.html` plus its existing app and stylesheet.
- Temporary landing-page work must remain isolated in `public/temporary-landing.html` and `public/temporary-landing.css`.
- Do not change shared release-page files while working on the temporary page unless the user explicitly requests it.

## Brand implementation

Do not invent slogans, claims, logo arrangements, colours, fonts, tone or product promises. Use approved project documents and approved assets exactly.
