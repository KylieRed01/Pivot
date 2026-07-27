# Pivot Website and Design Studio Trial

Dependency-free Node.js application for the public Pivot website, browser-local Pivot Design Studio trial and isolated Phoenix workflow simulation.

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

Browser and device behaviour requires manual verification.

## Trial boundaries

- Public Studio work remains in the browser session and is not a saved club design.
- `data/state.json` supports the workflow simulation only. It is not production storage.
- Test identities and simulated actions are not production authentication or approval.
- Current garment geometry, boundaries, artwork and side/3D effects are placeholders.
- No production proof, manufacture release or supplier acknowledgement is created.

## Unresolved

- Supplier and authoritative templates
- Final Phoenix artwork
- Production infrastructure
- Accurate 3D
- Manufacturing integration

Do not use the Design Studio trial or workflow simulation as production or manufacturing authority.
