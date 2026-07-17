# Quickstart: Website and Pivot Design Studio Demonstrator

## Scope

This quickstart verifies the existing website, public browser-local Pivot Design Studio and Phoenix workflow simulation. It does not verify production infrastructure, supplier templates, accurate 3D, final Phoenix artwork or manufacturing integration.

## Start locally

```bash
npm install
npm start
```

Open:

- Website: <http://localhost:3000/>
- Public Studio: <http://localhost:3000/#studio>
- Workflow simulation: <http://localhost:3000/#workflow-demo>

## Automated verification

```bash
npm run check
npm test
```

Browser and device behaviour must be verified manually using the journeys below.

## Public website journey

- [ ] Pilot availability and Greater Bendigo service boundary are visible.
- [ ] The website does not imply teamwear or club stores are available to other clubs.
- [ ] `hello@pivotteamwear.com` is available as a mail contact.
- [ ] There is no registration form while secure persistence is unresolved.
- [ ] Public navigation remains available at phone width.
- [ ] The Design Studio CTA opens `#studio`.

## Public Studio journey

1. Choose Basketball.
2. Choose Bendigo Basketball Association.
3. Confirm that only the basketball jersey is enabled.
4. Confirm that club polos are unavailable pending templates and shorts are provisional pending cost.
5. Read and acknowledge the browser-local demonstrator notice.
6. Enter the Studio.

Verify:

- [ ] No sign-in is required.
- [ ] Work is described as browser-local and unrecoverable by Pivot.
- [ ] Dark/light and front/back 2D surfaces work independently.
- [ ] The side/3D effect is optional and clearly indicative.
- [ ] The required basketball number cannot be deleted.
- [ ] Basketball player names are unavailable.
- [ ] Text can be changed, positioned, rotated, aligned and spaced using structured controls.
- [ ] PNG, JPEG and WebP artwork can be added without a network upload.
- [ ] SVG/PDF/HEIC and specialist formats are rejected with future-handling guidance.
- [ ] Image crop, opacity, flip, duplication, deletion and ordering work.
- [ ] Undo/redo, zoom, fit/reset and pan work.
- [ ] Help opens without losing design state.
- [ ] Design checks are explicitly indicative and never claim manufacturing readiness.

### Reset the public session

1. In the public editor, select **Reset design** (accessible name: **Reset browser session**).
2. Confirm that the product setup screen returns.
3. Enter the Studio again and confirm the untitled placeholder design is restored with no prior edits or uploaded artwork.

This clears the current tab's public Studio state. **Fit** resets only zoom and pan; it does not clear the design.

## Keyboard-only journey

- [ ] Use Tab/Shift+Tab to reach sport, competition, product and acknowledgement controls.
- [ ] Enter the editor without a pointer.
- [ ] Reach Colours, Patterns, Text, Images and Help from the tool navigation.
- [ ] Select layers from the layer list.
- [ ] Change x/y position, size and rotation with labelled inputs.
- [ ] Move a selected flexible canvas element with arrow keys.
- [ ] Operate dark/light, front/back, undo/redo, zoom and fit/reset controls.
- [ ] Open and close the design-check dialog; focus returns to its opener.

## Workflow simulation journey

Open `#workflow-demo` and verify:

- [ ] A persistent Workflow simulation notice is visible before and inside the editor.
- [ ] Fixture identities are not presented as production authentication.
- [ ] Save and submission controls are labelled as simulations.
- [ ] The page states that no production proof, manufacture release or supplier acknowledgement is created.
- [ ] Seeded customer-facing product wording uses Club Polo, not Coach Polo.

## Accessibility and device checks

Automated axe tests block serious/critical findings, but manual checks remain required:

- [ ] Navigate every core journey using only a keyboard.
- [ ] Check visible focus and logical focus order.
- [ ] Check browser zoom at 200% and 400%.
- [ ] Spot-check with a screen reader on the intended operating system.
- [ ] Verify current/recent Safari on an actual iPhone and iPad.
- [ ] Verify current/recent Chrome on an actual Android phone and tablet.
- [ ] Verify desktop Chrome, Edge, Firefox and Safari where available.
- [ ] Include actual Phoenix volunteer devices in pilot testing.

## Pilot usability check

Run realistic tasks with 5–8 Phoenix volunteers across roles, technical confidence and devices:

- setup;
- create/edit;
- browser-session restore;
- contextual help;
- workflow submission/approval simulation; and
- design-check review.

Record completion, errors, help required and feedback. Resolve any problem that prevents a core task before live pilot use.

## Unresolved blockers

The demonstrator is not production-ready because these remain unresolved:

- supplier and authoritative templates;
- final Phoenix artwork;
- production infrastructure;
- accurate 3D; and
- manufacturing integration.
