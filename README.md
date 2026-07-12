# Pivot Phoenix Phase 1

Dependency-free Node.js pilot for the Phoenix club store, guided design, approvals and publication.

## Run locally

1. Install Node.js 20 or newer.
2. In this directory run `npm test`.
3. Run `npm start`.
4. Open <http://localhost:3000>.
5. Select **Design studio** to exercise role-based workflows using the demo identity selector.

Data is stored in `data/state.json`. To reset the demo, restore that file from Git. Authentication controls are demonstrators: production passwordless email and MFA require a deployment identity provider.

## Manual test path

- Store: verify two approved products, no prices/order controls, polo sizing table.
- Studio as Phoenix administrator: change colours/artwork and save a version; approval should be denied.
- Switch to Phoenix primary approver and club-approve.
- Switch to Pivot administrator, Pivot-approve, then publish.
- Return to the store and verify the newly published design appears.
- Try actions out of sequence and verify they are rejected.

## Known blockers

Supplier task 6 is HITL and unresolved. Therefore task 7's supplier-exact 2D template and 3D garment model, and task 8 final readiness verification, are not represented as production-ready. Current preview is explicitly labelled a placeholder.
