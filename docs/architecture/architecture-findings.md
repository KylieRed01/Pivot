# Architecture findings

## Executive assessment

The repository is organised appropriately for its current scale. Capability folders make the Main Website, Design Studio and Club Store easy to locate without introducing speculative layers or empty containers.

The strongest deep module remains `public/studio/studio-state.js`. The main unresolved architecture risk is not file count: it is the different design meanings used by public Studio and workflow simulation modes. Other observations below are watch points, not instructions to split small modules.

## Findings

### F1 — Capability organisation is clear and proportionate

**Assessment:** Positive

Recent work is placed under coherent owners:

- Main Website: `public/website/`
- Design Studio: `public/studio/`
- Club Store: `public/club-store/`
- Temporary page: dedicated temporary files

This makes changes discoverable while avoiding technical-layer folders with little or no code.

### F2 — The Studio state engine is a deep module

**Assessment:** Positive

`public/studio/studio-state.js` hides normalisation, accepted state transitions, protected layers, history, serialization, persistence and checks behind behaviour-oriented functions. It is DOM-independent and extensively tested.

Keep related logic together unless an extracted concern gains a genuinely simpler interface or another consumer.

### F3 — Public and workflow Studio modes still use different design models

**Priority:** High when either mode next changes materially
**Evidence:** `public/app.js`, `public/studio/studio-state.js`, `sessionStorage`, `localStorage`

Public mode uses four named surfaces and state-engine actions. Workflow mode builds separate primary/reverse front/back objects, mutates them directly and stores additional browser keys.

This is currently visible and contained, but fixes or rules can diverge between modes. Do not add a third design representation. Move toward one model only when product/workflow authority and a concrete implementation slice justify it.

### F4 — `public/app.js` is a watch point, not a file-splitting target

**Priority:** Monitor

`public/app.js` composes most Studio and workflow UI behaviour. Its size means maintainers need broad context, but extracting buttons, panels or generic controllers without a simpler interface would create shallow modules.

Refactor only around a complete hidden decision—for example, one canonical Studio command boundary, an independently reusable renderer, or a mode capability that removes branching from callers.

### F5 — Rule meaning is partly duplicated

**Priority:** Monitor before adding enforceable rules
**Evidence:** `src/uniform-rules.js`, `public/studio/studio-state.js`

The server module owns the documented uniform profile and configured-number validation. The Studio separately owns syntax and required-number checks. This is manageable for the current partial baseline.

If a new authoritative rule must be enforced in both places, give it one shared owner rather than implementing it twice.

### F6 — The Node server remains acceptable at demonstrator scale

**Priority:** Monitor

`src/server.js` combines static delivery, the fixture API, club-interest and Studio-feedback endpoints, but remains small and testable through one `createApp()` interface. The Cloudflare-compatible club-interest boundary is isolated in the framework-required Pages Function and injects the focused Fastmail JMAP sender; Studio-feedback retains its separate SMTP sender. Creating general transport, application and repository directories would add structure without hiding enough complexity.

A new boundary becomes justified when production adapters are approved, route growth obscures behaviour, fixture writes need atomic operations, or a concern requires independent reuse/testing.

### F7 — Website rendering and enhancement have useful boundaries

**Assessment:** Positive

The website now owns its markup, browser enhancement and club-interest interaction under `public/website/`. The server reuses the same markup owner for the initial response, preventing customer-facing content duplication. Studio code and styles are deferred until a Studio route is selected.

### F8 — Routing hand-off is acceptable but should remain singular

**Priority:** Monitor

`home-entry.js` starts the lightweight homepage. When a Studio route is selected, it imports `app.js`, which owns subsequent route changes. This is slightly unusual but explicit and keeps the initial bundle small.

No routing refactor is needed now. Reconsider only if:

- another router or route family appears;
- duplicate listeners cause behaviour;
- navigation loses page/form state;
- loading or error handling becomes inconsistent; or
- tests must coordinate both routers to verify ordinary navigation.

### F9 — Shared website-shell styling does not yet need another module

**Priority:** Monitor

The Club Store landing reuses `public/website/home.css` and adds its own stylesheet. At current scale this is simpler than a mostly empty shared-style container.

Extract common shell styles only when multiple consumers need independent changes or homepage-specific edits repeatedly affect the Club Store.

### F10 — Architecture documentation must track the current tree

**Assessment:** Addressed by this refresh

The catalogue now uses current `public/studio/` and `public/website/` paths, current governing-document versions, the separated website/Studio delivery shape and the present scale-aware extraction policy.

## Decision rule for future organisation

Create a module or directory only when at least one is true:

1. It owns a coherent decision or workflow.
2. It hides meaningful complexity behind a smaller interface.
3. It has an independent change driver or real second consumer.
4. It establishes one owner for an invariant currently duplicated.
5. It enables behaviour-focused testing that the existing boundary cannot provide.

Do not create one solely because a file is long, a larger architecture commonly contains that layer, or future code might eventually need it.
