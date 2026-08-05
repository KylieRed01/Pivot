# Current module catalogue

## Assessment scale

- **Deep:** a small, coherent interface hides substantial complexity.
- **Developing:** a useful boundary exists, with some information still shared with callers.
- **Adequate at current scale:** responsibilities are visible and manageable; splitting now would probably add shallow interfaces.
- **Watch point:** acceptable now, with explicit evidence that would justify change.

File length alone is not a reason to extract a module.

## Summary

| ID | Module | Primary path | Assessment | Main observation |
|---|---|---|---|---|
| M01 | Workflow policy | `src/domain.js` | Developing | Useful transition/access boundary; several small policies remain together |
| M02 | Uniform rules | `src/uniform-rules.js` | Developing | Coherent profile, but Studio checks duplicate part of the rule meaning |
| M03 | Node application | `src/server.js` | Adequate at current scale | One visible composition root for a small dependency-free server |
| M04 | Workflow fixture | `data/state.json` plus server load/save functions | Adequate for simulation | Explicitly non-production whole-file persistence |
| M05 | Studio configuration | `public/studio/studio-config.js` | Developing | One placeholder factory appropriately keeps defaults together |
| M06 | Studio state engine | `public/studio/studio-state.js` | Deep | Hides normalisation, commands, history, persistence and checks |
| M07 | Studio/workflow browser application | `public/app.js` | Watch point | Large composition module with two design representations |
| M08 | Main Website | `public/website/*` | Developing | Cohesive rendering, enhancement and form modules |
| M09 | Club Store presentation | `public/club-store/*` | Adequate at current scale | Capability is clearly grouped and intentionally reuses the website shell |
| M10 | Presentation styles | `public/website/home.css`, `public/style.css` | Adequate at current scale | Homepage and Studio bundles are separated |
| M11 | Temporary landing page | `public/temporary-landing.*` | Isolated | Correctly separate from release-page work |
| M12 | Automated tests | `test/*.test.js` | Developing | Strong behavioural coverage with some deliberate governance checks |

## M01 — Workflow policy

`src/domain.js` owns demo role/status vocabulary, club access, transition order, audit events and store visibility. `transition()` hides the transition table effectively. Access, workflow and store projection may gain separate change drivers later, but their current size does not justify splitting them.

**Extraction trigger:** one policy grows independently, gains another consumer, or forces callers to understand unrelated policy details.

## M02 — Uniform rules

`src/uniform-rules.js` records the partial basketball baseline and validates configured numbers. The browser consumes profile metadata through the API, while `public/studio/studio-state.js` independently enforces number syntax and required-layer checks.

**Watch point:** avoid adding the same new enforceable rule in both places. A shared policy becomes justified when a real rule must be enforced by both server and Studio.

## M03 — Node application

`src/server.js` owns the demonstrator's HTTP entry point, static delivery, security/cache headers, compression, fixture API and homepage markup injection. These are multiple responsibilities, but the implementation remains small, dependency-free and directly testable through `createApp()`.

Splitting transport, static delivery and application operations now would create more interfaces than the repository needs.

**Extraction triggers:** route growth makes the handler hard to navigate; fixture operations need independent tests or atomicity; production adapters are approved; or static delivery changes independently enough to obscure API behaviour.

## M04 — Workflow fixture

`data/state.json` and the server's load/save functions provide labelled simulation storage. The schema is intentionally direct and whole-document based.

Do not evolve this into production storage. Introduce a repository interface only when another storage implementation or atomic application operation actually exists.

## M05 — Studio configuration

`public/studio/studio-config.js` centralises the four placeholder surfaces, initial layers, palette, viewport and storage key. With one placeholder template, one factory is clearer than separate template, document and session modules.

**Extraction trigger:** authoritative product templates arrive and immutable template data must change independently from session defaults.

## M06 — Studio state engine

`public/studio/studio-state.js` is the strongest deep module. Its callers issue behaviour-oriented actions and receive explicit results without implementing normalisation, protected-layer rules, history or persistence mechanics.

Preserve this boundary. Do not split history, validation or storage merely because the file is sizeable; extract only when a concern can expose a simpler stable interface or has another real consumer.

## M07 — Studio/workflow browser application

`public/app.js` composes setup, preview, editing controls, browser APIs and the workflow simulation. The public trial delegates accepted changes to M06. Workflow mode still mutates a separate `primary`/`reverse` model and persists additional keys in `localStorage`.

The file is a complexity hotspot, but arbitrary component extraction would not solve the duplicated design meaning. Keep it intact until a specific change can hide a complete decision or workflow.

**Extraction triggers:** a third mode is added; public/workflow branching causes a defect; a view needs independent reuse/testing; or an approved canonical design model can replace both representations.

## M08 — Main Website

- `home-entry.js` keeps homepage startup light and lazy-loads Studio assets.
- `home-page.js` provides reusable initial markup and browser enhancement.
- `club-interest-form.js` owns form interaction and its controlled reference options.
- `home.css` owns the website shell and homepage presentation.

These boundaries are proportionate. The server's use of pure markup from `home-page.js` avoids duplicating customer-facing content.

## M09 — Club Store presentation

The Club Store landing and review pages are grouped under `public/club-store/`. The landing page reuses `public/website/home.css` for the common shell and adds capability-specific rules in `club-stores.css`.

This dependency is acceptable while the shell remains stable and small. A shared shell module is warranted only if several pages need to evolve it independently.

## M10 — Presentation styles

The homepage no longer loads the large Studio stylesheet. `home.css` and `style.css` therefore represent a useful delivery boundary. Their internal class structure is an implementation detail unless a selector encodes an approved accessibility or brand invariant.

## M11 — Temporary landing page

`public/temporary-landing.html` and `.css` remain isolated as required by repository guardrails.

## M12 — Automated tests

The tests use Node's built-in runner and exercise meaningful public interfaces. Some repository-guardrail tests intentionally inspect exact files or CSS because they protect approved implementation constraints. New tests should prefer behaviour and stable outputs over private arrangement unless the arrangement itself is governed.
