# Pivot repository guardrails

## Required reading

Before changing product, brand, website or Studio behaviour, read:

1. `specs/pivot-design-tool-baseline/handover-summary.md`
2. `docs/Pivot Constitution.md`
3. `docs/Business Plan_V1.00.pdf`
4. `docs/Operating Model_V1.00.pdf`
5. `docs/brand/Brand Kit_V1.00.pdf`
6. `docs/brand/Visual Design Guide_V1.00.pdf`

Apply the governing-document precedence recorded in the Constitution.

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
