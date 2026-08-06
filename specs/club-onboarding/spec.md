# Club onboarding implementation specification

**Status:** Draft implementation baseline  
**Work Type: development**  
**Owner:** Club Administration  
**Source:** `docs/Club Onboarding Workflow.md`

## 1. Purpose

Implement the agreed online journey from accepted commercial package through Club Onboarding and initial Club Store publication without absorbing the separate Product Workflow.

The normal path is online. An organisation unable to use the online process is not a fit for Pivot. Human support may resolve exceptions but must not replace the online authority, approval and version records.

## 2. Scope

### Included

- online delivery and acceptance record for the current quote and agreement terms;
- appointment and invitation of the initial Club Administrator;
- administrator account activation;
- confirmation of operational and public club details;
- reusable club logo, asset-authority and Store-colour intake;
- controlled accessible Store theme generation and setup checks;
- exact-version Store setup approval;
- invitation, revocation and replacement of up to two Club Users;
- availability hand-off to the separately designed Product Workflow;
- receipt of the **Product approved for Store** output;
- initial Store submission, Pivot review and publication;
- agreed email, in-app, alert and analytics behaviour; and
- audit records required by the Constitution.

### Excluded

- legal drafting of agreement terms;
- internal Product Workflow steps;
- product design, supplier validation or production-colour mapping;
- ordering, checkout, payments, manufacturing and fulfilment;
- general campaign messaging or CRM automation;
- a general-purpose workflow, event-bus, rules or document-management platform; and
- future product publication after the initial Store publication workflow.

## 3. Roles and authority

### R-ROLE-1 — Office bearer

An authorised office bearer accepts the commercial package and appoints the initial Club Administrator. The accepted record identifies the office bearer and the evidence of authority required by the final legally reviewed terms.

### R-ROLE-2 — Club Administrator

Each club has exactly one active Club Administrator. The administrator may:

- approve club branding and Store configuration;
- approve product decisions through the separate Product Workflow;
- provide required club confirmations;
- accept quotes permitted under the standing agreement;
- submit the initial Store for publication; and
- invite, revoke or replace up to two Club Users.

### R-ROLE-3 — Club Users

A club may have up to two active Club Users. They may participate in available club workflows but cannot exercise the Club Administrator's approval authority, replace the administrator or change the standing agreement.

### R-ROLE-4 — Pivot

Authorised Pivot users have cross-club oversight, independently review submitted Store versions, publish Stores and manage exceptions. Pivot administrator access requires strong multi-factor authentication.

## 4. Commercial hand-off

### R-COM-1 — Versioned package

The quote and agreement terms remain separate versioned records but are delivered together as one online commercial package.

### R-COM-2 — Exact acceptance

Electronic acceptance records:

- exact quote identifier and version;
- exact agreement identifier and version;
- office-bearer identity and authority evidence;
- acceptance timestamp;
- whether the prefilled commercial contact or another named person is appointed Club Administrator; and
- the appointed administrator's name and email.

A changed quote or agreement requires a new package and acceptance. It must not mutate the accepted record.

### R-COM-3 — Pivot acceptance and trigger

Only acceptance by both parties with an accepted quote triggers Club Onboarding. The trigger creates the club onboarding record and sends the individual Club Administrator invitation online. Repeated delivery or callback processing must not create duplicate clubs or invitations.

### External gates

- final commercial wording and authority declaration require appropriate Australian legal review;
- the online signing/provider mechanism must preserve exact versions, actors, timestamps and evidence and requires provider approval under Constitution 1.09; and
- provider-specific integration is not authorised until selected.

## 5. Club account and isolation

### R-ACC-1 — Individual account

Every Club Administrator and Club User uses an individually authenticated account appropriate to their role. Shared club credentials are prohibited.

### R-ACC-2 — Club isolation

A club account can access only its own club's records and assets. Every server-side read and write enforces club scope independently of browser state or identifiers supplied by the client.

### R-ACC-3 — Invitation lifecycle

An invitation is single-recipient, expires, cannot be reused after activation or revocation, and does not grant access after the appointed role is replaced. Resending an invitation does not create another active account or consume another Club User position.

### R-ACC-4 — Administrator replacement

Administrator replacement preserves historical actor and approval records. It revokes the former administrator's authority prospectively and must not rewrite prior approvals.

### External gate

The production identity provider, sign-in mechanism, recovery process and invitation expiry remain provider decisions. They must satisfy the Constitution and provider assessment before implementation.

## 6. Onboarding record and states

The minimum onboarding states are:

1. `invited`
2. `in_progress`
3. `action_required`
4. `ready_for_setup_approval`
5. `complete`

A support/security exception may restrict access without erasing the underlying state.

### R-ONB-1 — Verified and editable information

Verified commercial legal-identity fields are reused and read-only. They provide **Report a correction**. Operational and public Store information remains editable until included in an approved/submitted version.

A correction report does not silently alter accepted commercial identity. Pivot resolves it through the appropriate commercial or support process.

### R-ONB-2 — Automatic progress saving

Accepted onboarding changes save automatically and survive sign-out or device change. The interface distinguishes successfully saved progress from a failed save and must not claim completion from browser-only state.

### R-ONB-3 — Setup guidance

Every setup requirement has one of the agreed statuses:

- **Complete**
- **Action required**
- **Check this**
- **In progress / not started**

Only **Action required** blocks Store setup approval. **Check this** remains visible but non-blocking.

## 7. Club identity and assets

### R-ASSET-1 — Official logo

The Club Administrator uploads the current official logo and confirms authority to provide it for the club's Store and teamwear process. Capture:

- exact file identity and checksum;
- original filename and media type;
- supplying club and administrator;
- claimed owner/source;
- permitted club use and known modification restrictions;
- supporting evidence, if supplied;
- confirmation timestamp; and
- current review state.

The declaration is not represented as proof of legal ownership. Obvious concerns or disputes follow an exception path; routine copyright or font investigation does not block Store setup.

### R-ASSET-2 — Reusable assets

The administrator may add other reusable club assets during onboarding or later. Assets remain club-owned records consumed by the Design Studio and Club Store; those capabilities do not duplicate the source asset.

### R-ASSET-3 — Store and production readiness

An asset may be Store-ready while still requiring production attention. The shared warning remains attached to the asset and is visible in onboarding and the Pivot Design Studio. Product-specific technical and supplier approval remains in the Product Workflow.

## 8. Club colours and themes

### R-COLOUR-1 — Supplied colour evidence

For each named club colour, record available HEX, RGB, CMYK and Pantone references, source, whether each value was supplied or derived, version, approval state, approving Club Administrator and date. Do not require formats the club does not hold or represent automatic conversion as authoritative.

### R-COLOUR-2 — Digital Store colours

Require only the confirmed digital colours needed to generate accessible controlled Store themes. The system may suggest colours detected from the logo, but the Club Administrator confirms the Store colours.

### R-COLOUR-3 — Controlled themes

Generate controlled accessible light and dark themes. The administrator previews themes but cannot alter layout, opacity or accessibility-managed values. Built-in checks block setup approval when the selected Store version fails an enforceable accessibility requirement.

## 9. Store setup approval

### R-SETUP-1 — Exact version

**Approve Store setup** applies to the exact Store version reviewed. Approval records Club Administrator actor, version and timestamp.

### R-SETUP-2 — Completion

Approval is accepted only when all **Action required** items are resolved. It marks onboarding complete, retains the Store in private preview and makes the Product Workflow available to the Club Administrator and active Club Users.

A later Store change creates a new draft and does not rewrite the approved setup version.

## 10. Alerts and analytics

### R-ALERT-1 — Required triggers

Pivot receives an alert for:

- seven days without onboarding progress;
- repeated blocking failures;
- an explicit help request;
- access or authority failure; and
- a security concern.

Thresholds remain configurable. Implement only these onboarding triggers behind a focused owner; do not create a general campaign or rules platform.

### R-ANALYTICS-1 — Privacy-minimised events

Product-improvement analytics contain no personal information or club name. They use a stable opaque `clubId` and structured setup event/issue codes only.

### R-ANALYTICS-2 — Support resolution

Only an authorised support view may resolve the opaque identifier to a club for assistance. Analytics remain separate from operational audit records and access to identifier resolution is auditable.

## 11. Product hand-off

### R-PRODUCT-1 — Availability

Onboarding completion makes the separate Product Workflow available. This specification does not define its internal states or actions.

### R-PRODUCT-2 — Approved output

When the Product Workflow emits **Product approved for Store**, the approved product is added to the private or published Store automatically. Processing the same approved output repeatedly must not duplicate the product.

The first approved product marks a private Store **Ready for publication** and triggers the initial publication notification. Future products added after publication do not repeat the initial publication workflow.

## 12. Initial Store publication

Minimum publication states:

1. `private_preview`
2. `ready_for_publication`
3. `submitted_for_publication`
4. `returned`
5. `published`

### R-PUB-1 — Ready notification

When the first approved product is added, email the Club Administrator and provide the same in-app notification. The message states that the Store is not public and links to private preview.

### R-PUB-2 — Exact submission

**Submit Store for publication** records and locks:

- exact Store version;
- included approved product versions;
- Club Administrator actor; and
- timestamp.

A later change creates a new draft and requires resubmission.

### R-PUB-3 — Pivot decision

Pivot reviews without repeating product approval and either publishes the exact submitted version or returns it with a clear reason while it remains private.

### R-PUB-4 — Publication record and notification

Publication records the exact version, authorised Pivot actor and timestamp. The System emails the public Store link to the Club Administrator and all active Club Users. Reprocessing must not publish a different draft or send uncontrolled duplicate notifications.

## 13. Audit and retention

Audit records include design changes where applicable, Store setup approval, Store publication actions and approvals with actor, version and timestamp. Approval records are retained for the life of the related product and order plus seven years.

Historical records retain the exact role, asset, Store and product versions used at the time. Account deletion, role replacement or asset retirement must not erase required evidence.

## 14. Notifications

Required recipients follow the agreed workflow table:

| Event | Recipients |
|---|---|
| Product approval | Club Administrator and Club Users involved in that product; office bearer only when also the administrator or explicitly opted into governance notifications |
| First product makes Store ready for publication | Club Administrator only |
| Initial Store published | Club Administrator and all active Club Users |

Delivery outcome is recorded without logging message content or credentials. A delivery failure is visible to Pivot and does not silently claim completion of a hand-off that depends on notification.

### External gate

Fastmail is Pivot's approved mail server for transactional notifications across Pivot. Secret configuration and each account, signature or system-notification workflow still require approved purposes, recipients, content, personal-data handling and release boundaries.

## 15. Security and provider controls

- Minimise collected personal and club information.
- Protect customer data, uploaded artwork, backups and audit records according to sensitivity and operational importance.
- Assess security, privacy, reliability, access controls, overseas processing and applicable legal obligations for each production provider.
- Keep provider credentials server-side in deployment secrets and out of source, browser code and logs.
- Use request limits, server-side validation, safe errors and abuse controls on public or invitation endpoints.
- Record and review privileged Pivot access.
- Do not use fixture identity, `x-demo-user`, `data/state.json`, browser storage or public asset paths as production authentication or storage.

## 16. Architecture boundary

Keep one capability-oriented modular monolith. Add a Club Administration owner only when the first vertical implementation slice begins. It should own club identity, role-scoped membership, onboarding state, Store setup drafts and approval snapshots.

Use small provider boundaries for online signing, identity, durable storage, notifications and analytics only after providers are selected. Do not create empty provider directories, speculative adapters, event buses or a general workflow engine.

## 17. Test requirements

Before production use, automated tests must demonstrate:

- exact commercial versions and administrator appointment are recorded once;
- altered or incomplete acceptance cannot trigger onboarding;
- invitation activation, expiry, resend and revocation preserve one authorised account;
- one Club Administrator and at most two active Club Users are enforced atomically;
- Club Users cannot exercise administrator approval authority;
- every club-scoped endpoint rejects cross-club access;
- legal identity correction does not silently mutate accepted commercial data;
- automatic saves report success and failure truthfully;
- only **Action required** blocks setup approval;
- asset and colour evidence retain supplied/derived provenance;
- inaccessible Store themes cannot be approved;
- setup approval locks the exact version and makes Product Workflow available;
- each required alert trigger fires without exposing personal analytics data;
- analytics uses an opaque identifier and support resolution is authorised and audited;
- duplicate product-approved events do not duplicate products;
- publication submission locks exact Store and product versions;
- Pivot can publish only the submitted version or return it with a reason;
- later edits require resubmission;
- future products do not repeat initial publication approval;
- notification recipients match the agreed table;
- provider failures are safe, visible and idempotently recoverable; and
- fixture/demo mechanisms cannot be used as production identity or storage.

Manual verification must cover keyboard and narrow-screen use, invitation email links, accessible status messaging, private/public Store boundaries and provider delivery/failure paths. Browser automation remains prohibited.

## 18. Implementation gates

Implementation may be planned provider-neutrally, but production behaviour is blocked until these authoritative inputs exist:

1. legally reviewed commercial terms and authority wording;
2. selected online signing/acceptance mechanism;
3. selected production identity and recovery mechanism;
4. approved durable data and asset storage providers with backup/retention decisions;
5. approved transactional notification workflows and templates, with Fastmail credentials configured through the approved deployment secret manager;
6. approved analytics implementation and access model;
7. separate Product Workflow specification; and
8. authoritative Store usability/accessibility acceptance evidence for generated themes.
