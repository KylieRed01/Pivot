# Pivot Website and Design Studio Demonstrator

Dependency-free Node.js demonstrator for the public Pivot website, browser-local Pivot Design Studio and isolated Phoenix workflow simulation.

## Run locally

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Run `npm test`.
4. Run `npm start`.
5. Open <http://localhost:3000>.

Routes:

- Public website: <http://localhost:3000/>
- Public browser-local Studio: <http://localhost:3000/#studio>
- Phoenix workflow simulation: <http://localhost:3000/#workflow-demo>

## Verification

```bash
npm run check
npm test
```

Full manual verification is documented in [`specs/pivot-design-tool-baseline/quickstart.md`](specs/pivot-design-tool-baseline/quickstart.md).

## Demonstrator boundaries

- Public Studio work remains in the browser session and is not a saved club design.
- `data/state.json` supports the workflow simulation only. It is not production storage.
- Demo identities and actions are not production authentication or approval.
- Current garment geometry, boundaries, artwork and side/3D effects are placeholders.
- No production proof, manufacture release or supplier acknowledgement is created.

## Unresolved

- Supplier and authoritative templates
- Final Phoenix artwork
- Production infrastructure
- Accurate 3D
- Manufacturing integration

Do not use the demonstrator as production or manufacturing authority.
