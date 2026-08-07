# Refactoring readiness

**Status:** Scale-aware maintenance guide
**Reviewed:** 5 August 2026

## Purpose

This guide records when structural change would reduce complexity and when it would merely create shallow modules. It is not a mandate to implement a target folder tree.

## Current baseline

| Measure | Current observation |
|---|---:|
| `public/app.js` size | Approximately 51 KB |
| `querySelector*` references in `public/app.js` | Approximately 150 |
| `workflowDemo` references | Approximately 66 |
| `localStorage` references | 13 |
| Public Studio storage boundary | One `sessionStorage`-compatible adapter |
| Automated tests | More than 70 passing Node tests |
| External runtime dependencies | One (`nodemailer`, limited to Studio-feedback SMTP/TLS delivery); club-interest JMAP uses native `fetch` |

Counts are navigation aids, not quality targets.

## Behaviour lock

Before a structural change, preserve or explicitly supersede these behaviours.

### Repository

- Node.js 20 or newer remains the runtime.
- Use the Node test suite and documented manual verification.
- Do not install or use Playwright or axe-core Playwright.
- Keep the temporary landing page isolated.

### Public Website

- Initial HTML contains essential homepage content.
- Browser enhancement does not unnecessarily rebuild server-rendered markup or lose form state.
- Homepage Studio code and styles remain deferred until needed.
- Approved copy, brand assets, navigation, metadata and accessibility behaviour do not change during structural work.

### Public Studio

- Work remains browser-local and is not sent to protected design-write endpoints.
- Four independent 2D surfaces remain represented.
- Placeholder/trial states cannot become production claims.
- Required layers, history, reset, restoration and rejected-upload behaviour remain deterministic.

### Workflow simulation

- Fixture identity and persistence remain explicitly non-production.
- Club access and publication constraints remain covered.
- Existing transition behaviour remains tested.

## Current boundaries to preserve

### Studio state engine

Preserve `public/studio/studio-state.js` as the accepted state-change boundary for public mode. Strengthen its interface before splitting its internals.

### Website feature

Keep website markup, enhancement, form behaviour and styles under `public/website/`. Keep the framework-required Pages route in `functions/api/` and reuse the Main Website's validation and JMAP delivery owners rather than duplicating their decisions. The server may consume the pure markup interface; browser-only work should execute only through explicit enhancement functions.

### Capability directories

Keep Studio, Website and Club Store code grouped by business capability. Do not add directories for unimplemented Product Catalogue, Checkout, Orders or Supplier Integration capabilities.

## Evidence-based extraction triggers

| Existing area | Extract only when |
|---|---|
| Browser routing | Another route owner appears, listeners conflict, state is lost, or route tests require both implementations |
| `public/app.js` | A coherent workflow can hide branching or gain independent reuse/testing |
| Studio state engine | A concern has a simpler stable interface or a real second consumer |
| `src/server.js` | Production adapters are approved, routes obscure one another, or fixture operations require atomic application behaviour |
| `src/domain.js` | Access, workflow or store projection grows independently enough to burden callers |
| `home.css` | Several pages need the common shell to evolve independently |
| Fixture storage | A second implementation or atomic operation exists; never merely to mimic production layering |
| Website content | Provenance or repeated independent editing requires a structured content owner |

## Routing decision

No routing change is currently required.

The homepage entry module deliberately loads the Studio application only for Studio/workflow hashes. After import, `public/app.js` handles subsequent routes. Keep this as one documented hand-off. If a trigger above occurs, prefer one small browser composition root that delegates to Website and Studio entry functions; do not create a general routing framework.

## Test-first maintenance sequence

For any justified structural slice:

1. Identify one behaviour-focused test protecting the boundary.
2. Confirm the baseline test passes.
3. Make the smallest extraction that simplifies its caller.
4. Run `npm run check`, `npm test` and `git diff --check`.
5. Complete manual verification for affected browser behaviour.
6. Confirm no copy, brand or visual output changed unless separately approved.

## Rejection test for a proposed module

Do not create the module if most answers are “no”:

- Does it hide a decision or meaningful complexity?
- Is its interface smaller than the implementation knowledge it replaces?
- Does its caller become simpler?
- Does it have an independent change driver or another consumer?
- Can its behaviour be tested without exposing private structure?

A proposed file that only forwards calls or houses a few speculative constants should remain with its current owner.
