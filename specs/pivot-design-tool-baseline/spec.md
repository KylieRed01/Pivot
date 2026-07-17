# Pivot Design Studio Baseline Specification

## Status and authority

This specification reconciles the supplier-independent decisions settled through the latest grill handover, `grill-me-handover-cloud-provider-selection.md`, and the earlier handovers it incorporates. Later handovers supersede earlier documents where they conflict.

This baseline is limited to:

1. the existing public Pivot website; and
2. the existing Pivot Design Studio demonstrator for the Phoenix Phase 1 design journey.

It does not authorise production implementation. Existing demonstrator behaviour may lag this specification until a separate implementation phase.

## Purpose

Provide an honest public introduction to Pivot and a safe, accessible demonstrator in which people can explore a basketball garment design. The demonstrator should also illustrate the controlled club workflow Pivot intends to validate with Phoenix without presenting placeholder assets or simulated actions as production-ready.

The authoritative production evidence is always a customer-readable 2D proof. A 3D view, if retained in the demonstrator, is supporting visualisation only.

## Scope boundaries

### In scope

- Public website product, availability, service-area, FAQ and help copy.
- The existing Pivot Design Studio entry flow and basketball demonstrator.
- Public browser-local experimentation.
- Demonstration of authenticated Phoenix draft, submission and approval concepts.
- Supplier-independent editor controls, design checks, version concepts and proof expectations.
- Accessibility, browser/device and usability expectations for the website and demonstrator.

### Explicitly unresolved

The following must be labelled unresolved wherever they could otherwise be mistaken for settled or production-ready:

- **Supplier:** no Phase 1 supplier has been selected. Supplier templates, constraints, output fields, transfer mechanisms and acknowledgements remain external inputs.
- **Final Phoenix artwork:** Phoenix's official palette, final vector logo assets, approved wordmark treatment and final sponsor artwork remain pending club decisions and source files.
- **Production infrastructure:** no production cloud provider, identity service, storage platform, email service or deployment architecture has been selected. The current Node.js and local JSON implementation is a demonstrator only.
- **Accurate 3D:** no supplier-authoritative model, pattern geometry or UV mapping is available. Any current side/3D treatment is an indicative placeholder and must not be used for approval.
- **Manufacturing integration:** supplier API schemas, authentication, production files, manufacturing preparation, job states and automated handover remain unresolved. A controlled manual handover is the Phase 1 fallback.

Matching shorts are also provisional Phase 1 scope pending confirmed cost. Reliable 3D, full phone editing, automatic colour extraction, automatic background removal, side-by-side comparison, and automated supplier submission are preferred enhancements, not Phoenix Phase 1 blockers.

## Terminology

- Customer-facing name: **Pivot Design Studio**.
- Public CTA: **Game On. Start Designing**.
- Accessible CTA label: **Start designing with the Pivot Design Studio**.
- Use **teamwear** in general customer copy and **apparel** for categories.
- Use **garment** or **template** only where technical precision is needed.
- Use **men's club polo**, **women's club polo**, and **club official and volunteer apparel**. Do not use the former coach-polo terminology in customer copy.
- A **public trial** is an unauthenticated, browser-local visit.
- A **club user** prepares assets, designs and store branding but cannot give formal club approval.
- A **club administrator** may do preparation work and gives formal club approval.
- **Pivot** independently reviews technical, production, compliance and quality matters and controls release to manufacture.

## Public website requirements

### Purpose and availability

- The public page collects or invites club interest; it is not open Phoenix pilot registration.
- The Pivot Design Studio is open to try. Teamwear supply and club stores are not yet available to other clubs.
- Basketball is the first controlled pilot sport. Other sports must not be shown as available until their products, competition rules and production requirements have been validated.
- Anyone may try the Design Studio, but Pivot supplies and delivers teamwear and club stores only within Greater Bendigo.
- Do not promise a public launch date, newsletter, pilot place, product release date or club onboarding.

### Public product descriptions

**Playing uniforms**

Quality custom uniforms designed around your club's identity, sport and competition requirements.

**Club apparel**

Coordinated apparel for players, coaches, volunteers and supporters, all in one club range.

**Club stores**

A modern, club-branded place for your community to explore and access approved teamwear.

### Club-interest registration

When registration behaviour is implemented, use this approved section:

> **Be part of what comes next.**
>
> A modern teamwear experience is coming to Greater Bendigo. Explore your club's ideas from every angle with interactive design tools, quality custom apparel, club-branded stores, fair pricing and reliable local support. Register your club's interest and get in the game.

CTA: **Register Your Club's Interest**

Collect contact name, club name, email, sport, league/association, club suburb or postcode, and required privacy/marketing consent. Sport and competition options must share the Design Studio catalogues, include `Other`, and require explanatory text when `Other` is selected. Check Greater Bendigo service eligibility. Store submissions securely as well as notifying `hello@pivotteamwear.com`.

Consent copy:

> No. Registering your interest does not commit your club to purchase anything, join a pilot or open a club store. It gives us permission to contact you with relevant updates about sports and products becoming available and launch news. You can opt out at any time.

Confirmation copy:

> **You're in the game.**
>
> Thanks for registering your club's interest. We've got your details and will be in touch when it's time for the next play.

Until secure form handling and production infrastructure exist, do not present a non-functional form or imply that interest has been registered. Provide `hello@pivotteamwear.com` as the contact route.

### Public-trial notice

Before entry, explain that:

- the public experience is a demonstrator;
- public artwork and design state remain on the visitor's device for the current visit;
- Pivot does not upload, save, retain or recover public trial work;
- placeholders are not approved production templates or final Phoenix artwork; and
- trying the Studio does not submit a design or commit the visitor or club to anything.

### Customer-facing writing standard

Copy must be clear, professional, approachable, practical, positive and volunteer-focused. Help copy should be simpler and sharper than marketing copy. Avoid unnecessary jargon, exaggerated claims, stacked sporting metaphors, corporate language, em dashes and conspicuous AI-style punctuation.

## Public FAQ copy requirements

The website should answer, consistently and without production promises:

### What is currently available?

Pivot is currently in pilot. The Pivot Design Studio demonstrator is open to try, while teamwear and club stores are not yet available to other clubs.

### What sports will Pivot support?

Basketball takes the court first in our pilot, with more community sports planned only after their products and design experience meet competition and production requirements. Clubs from any sport may contact Pivot about their interest.

### Where does Pivot operate?

Pivot supplies and delivers teamwear only within Greater Bendigo.

### How can our club customise its teamwear?

The Design Studio demonstrator lets visitors explore colours and patterns, add text and artwork, and work across available 2D garment surfaces. The current garment is a placeholder, not a production template. Authenticated club onboarding may later include Pivot-assisted rebuilding of an existing completed design; the public trial must not promise automatic conversion of flattened artwork into an editable garment.

### Can our club have its own branded store?

Club stores are part of Pivot's intended controlled service but are not yet available to other clubs. A future store uses the club's approved colours, logo and approved products in an accessible controlled template rather than a freeform website editor.

### What apparel will Pivot offer?

Phoenix Phase 1 centres on a reversible basketball jersey and men's and women's club polos. Matching shorts remain provisional pending cost. Products become available only after quality, production and delivery validation.

### How much will Pivot teamwear cost?

Pivot intends to lead with quality and fair pricing. Confirmed prices will be published by product; no unconfirmed price or speculative batch rate should be advertised.

### How do we register our club's interest?

When the secure registration form is available, answer a few quick questions. Pivot will be in touch when it is time for the next play. Until then, contact `hello@pivotteamwear.com`.

### Does trying the Design Studio or registering commit our club to anything?

No. Trying the demonstrator does not submit a design, join the pilot, open a club store or commit a club to purchase. Registration consent is governed by the approved wording above.

## Club Help Centre copy requirements

Club help must describe the intended workflow without implying that production accounts or manufacture are live:

### Who can access our club account?

Each club can have up to two users and one appointed administrator at a time. Pivot appoints the administrator, who can add, remove or replace club users. Each person uses an individual account. The demonstrator's identity controls are simulations only.

### How are club designs approved?

A club user submits an exact design version to the administrator. After club approval, Pivot independently checks product, production, sport and competition requirements. Pivot then arranges the final 2D proof and any risk-required sample before the administrator gives final production authorisation. An authorised Pivot person separately releases the product to manufacture. Until supplier and manufacturing inputs are resolved, the demonstrator cannot complete this workflow.

### How is our club store set up?

Club users add approved colours and artwork to a controlled template. Accessible light and dark themes are prepared for the administrator to review. Approved products appear only after their separate design and product workflow. The demonstrator does not create a live store.

### How do we get help?

If the answer is not available in the contextual Studio help, contact `hello@pivotteamwear.com`.

## Pivot Design Studio entry and persistence

### Public visitors

- May choose an available sport, competition and apparel item and explore the demonstrator without joining Pivot.
- Public artwork and design state remain browser-local and are not uploaded to or retained by Pivot.
- Work is available only for the current visit and is not recoverable by Pivot.
- Public visitors cannot permanently save, share, submit or approve designs.
- Public experimentation never establishes official club colours or approved artwork.

### Authenticated Phoenix users

- Only invited Phoenix pilot users may save server-side drafts.
- Their sessions have a 24-hour absolute maximum and expire after two hours of inactivity.
- Fresh passwordless authentication is required before approvals or access changes.
- The existing demonstrator may simulate identities and workflow states, but must describe them as simulations until production authentication exists.

### Entry setup

- Choose sport, competition and apparel item.
- Basketball is the only available pilot sport.
- Reversible basketball jersey is core Phase 1 scope.
- Men's and women's club polos are core Phase 1 scope.
- Matching shorts must be marked provisional pending confirmed cost.
- Offer an optional club setup step for colours and artwork when implemented; users may skip and add them later.
- Placeholder designs must use approved Pivot wordmarks only. The Pivot penguin icon is not a Phoenix Phase 1 design asset.

## Colour workflow

- Direct colour selection and confirmation are the reliable baseline.
- Volunteers must not be required to know HEX, RGB, CMYK or Pantone values.
- Accept exact references when available, colours selected visually, and existing-garment references for later Pivot review.
- Missing exact codes do not block drafting.
- Automatic logo-colour extraction is optional assistance, not a blocker or approval source.
- If implemented, extraction must be deterministic and its suggestions must be confirmable, editable and removable.
- Only club-administrator-confirmed colours enter an official, versioned club palette.
- Pivot separately maps approved club colours to production colours. That mapping is unresolved pending supplier and production inputs.
- Palette updates apply to new or deliberately revised designs and never silently alter approved garments.

## Artwork and existing designs

### Public trial

- Public visitors may use ordinary image artwork for browser-local experimentation.
- Do not offer or imply automatic conversion of a completed garment image, PDF or flattened design into editable layers.
- Public files must never be represented as approved or production-ready.

### Authenticated club onboarding

- Completed-design conversion is a hybrid Pivot-assisted workflow, not a public feature.
- Deterministic import, scale, clipping or structured mapping may be attempted where reliable.
- Unreliable conversion is marked **Pivot assistance required**.
- Pivot fits or rebuilds the design on an approved garment template and the club reviews the resulting editable draft.
- It remains non-production-ready until the normal approval workflow is complete.

### Artwork controls

Ordinary flexible artwork may support move, proportional resize by default, deliberate proportion unlock, crop, rotation, duplicate, delete, layer ordering, horizontal/vertical flip and adjustable opacity.

Official club logos:

- may be moved and proportionally resized;
- may not be recoloured, mirrored, distorted, freely cropped, rotated or faded;
- may have multiple separately approved variants;
- remain immutable and versioned once approved; and
- use a **Clean up logo** action to create a proposed, non-destructive variant for background removal or trimming blank space. The cleaned variant requires administrator approval.

Background removal is user-invoked, previewed and non-destructive. It is preferred, not a pilot blocker, and must never run automatically.

### Artwork rights

Every formal administrator design approval must include a versioned rights confirmation stating, subject to legal review:

> I confirm that the club is authorised to use all logos and artwork in this design and has obtained any required permission from the owners or sponsors.

## Editor model and controls

### Authoritative 2D model

- Maintain structured, view-independent design state.
- Provide front and back 2D views for every designed garment surface.
- A reversible jersey is one single-layer garment printed on both sides, with linked dark and light compositions approved and released together. A conventional two-layer reversible is not acceptable. Fabric weight, opacity, show-through, durability, comfort and print quality remain subject to supplier/product validation.
- Show print boundaries and relevant guides while moving/resizing; permit guide toggling without disabling validation.
- Prevent placement outside physically printable material once authoritative geometry exists.
- Until supplier geometry exists, label boundaries and placement checks as indicative only.

### 3D boundary

- Reliable 3D is desirable but not a pilot blocker.
- 3D is supporting visualisation only; 2D remains authoritative.
- Do not claim that changes map accurately across seams, panels or garment geometry until supplier models and mapping are validated.
- Current side/3D effects must be labelled **Indicative preview only**.
- The pilot may proceed with a strong 2D editor and proof if reliable 3D is unavailable.

### Template control levels

Template metadata defines each element as:

1. **Fixed:** required and not movable, removable or restyled.
2. **Constrained:** required but editable inside approved limits.
3. **Flexible:** optional and editable within printable boundaries.

The exact classifications remain provisional until supplier, competition and product rules are available. Do not hardcode one universal element list.

### Patterns

Where manufacturing capability permits, users may choose an approved pattern and adjust permitted colours, origin, scale, rotation and supported panel continuation. A pattern must not obscure required content. Do not silently correct failures; explain the issue and offer valid choices.

### Starting designs and coordinated products

- Use curated deterministic, production-tested recipes rather than generative AI.
- Recipes may combine confirmed club colours, an approved logo, pattern family, required elements and the selected template into controlled starting variations.
- Do not use AI for colour extraction, artwork generation or operational decisions.
- Coordinated shorts and polo starting drafts may be generated from a specific jersey version using its colours, pattern family and branding hierarchy.
- Coordinated products are separate drafts with product-specific approval. They do not silently change after later jersey edits; any update requires preview and explicit confirmation.

### Text

Baseline controls are editable wording, approved font selection, colour, size, proportional scaling, movement, rotation, alignment, letter and line spacing, supported approved outlines, layer ordering, duplication and deletion. Curved text and decorative effects are deferred.

Arbitrary font uploads are prohibited. An official club font may be added only after Pivot checks licensing, glyph coverage and production suitability.

### Numbers and names

Each template configures numbers and player names as **required**, **optional personalisation**, or **not supported**.

- Basketball numbers are required and cannot be removed.
- Users may change the representative number and permitted styling for review.
- The product remains one design rather than one design per player number.
- Basketball playing jerseys do not offer player names in Phase 1.
- The Phase 1 sponsor-funded batch uses a manual `1–40` number run as production data, separate from the design.
- Rosters, player allocation, duplicate-number prevention, family ordering and personalisation are Phase 2 and outside this baseline.
- Every production number treatment eventually requires an automatic `0–9` inspection panel, including separate dark/light checks. Final implementation depends on production fonts and templates.

### Navigation and accessibility

- Include zoom in/out, fit to view, reset zoom and pan while zoomed.
- Support mouse, trackpad, touch and keyboard-operable alternatives.
- Never make an action depend only on drag, colour perception, motion or 3D.
- Keep controls in semantic HTML rather than drawing the whole interface in a canvas.

### Help

- No mandatory tutorial, unsolicited pop-ups or chatbot.
- Use concise labels and contextual guidance near restrictions and errors.
- A visible Help control opens guidance without losing editor state.
- An optional short introductory video and contextual **Show me** action may be added.
- Help must distinguish demonstrator capabilities from unresolved supplier, artwork, infrastructure, 3D and manufacturing dependencies.

## Drafts, naming and versions

- Designs have descriptive editable names; names need not be unique because internal IDs are authoritative.
- Authenticated drafts autosave when server persistence is eventually implemented and show saving, saved and error status.
- Unsaved changes have no server-side recovery.
- Saved work may lose up to 24 hours after a major Phase 1 failure; this is a business recovery boundary, not a customer promise.
- Maintain one current working draft with background recovery appropriate to the selected production infrastructure.
- User-visible versions are created for named checkpoints, submission, approval/return, and duplication of an approved design.
- Undo/redo covers the current editing session.
- `Duplicate` copies the exact selected version into an independent draft, carries no approval status, and retains an internal source link.
- General arbitrary comparison is not required. **Compare with current design** is an optional enhancement.
- Approved versions are immutable. Editing one creates a new draft.
- `Approved` and `current` are separate states; a replacement becomes current only after administrator proposal and Pivot production/store-readiness confirmation.

### Template switching

- Allow switching only among compatible templates for the same product category.
- Preserve colours, text and artwork; preserve placement only where validated mapping exists.
- Put unmapped content in **Needs placement** rather than deleting it.
- Preview consequences, require confirmation and make the action undoable.
- An approved design must first be duplicated into a draft.

## Validation and design checks

- Draft experimentation may be non-compliant.
- Authenticated users may continue editing and saving a non-compliant draft.
- Block submission while blocking issues remain.
- Show issues near relevant controls/elements and in a design-check summary.
- Distinguish blocking errors, warnings and guidance.
- Explain what failed, why it matters, the applicable rule/source and available corrections.
- Copyright, safety and physically impossible constraints are never overrideable.
- Supplier dimensions and current local competition rules are unresolved; the demonstrator must describe its current checks as partial and indicative.

## Submission, approval and production boundary

The demonstrator may illustrate but must not falsely claim to complete this workflow:

1. Club user submits an exact design version.
2. Club administrator approves that digital version and confirms artwork rights.
3. Pivot independently reviews product, production, sport and competition requirements.
4. Pivot prepares an immutable customer-readable 2D production proof; a physical sample is added when risk requires it.
5. Club administrator reviews the exact proof and selects **Approve and authorise production** through a two-step confirmation.
6. An authorised Pivot person performs **Release to manufacture** through a separate two-step confirmation.
7. Supplier submission and acknowledgement are recorded as distinct states.

Club and Pivot approvals must come from different people. A small club administrator may create and club-approve the same work, but cannot provide Pivot approval.

Approval records preserve actor, role, exact version, timestamp, confirmation wording and artifact checksums. Approvals and history are never erased. Holds, stop requests and supplier-confirmed outcomes remain distinct and require reasons. No new manufacture release may occur unless the authoritative system can durably record it.

## Proof boundary

- 2D views of every designed surface are mandatory approval evidence.
- The reversible jersey proof includes both dark and light faces.
- Include design/version ID, Pivot product/template name, exact text, artwork inventory, approved club colour references and every garment face.
- Include a clearly labelled number check when production fonts and templates exist.
- 3D must not be sole approval evidence.
- Exclude supplier identity, sourcing details, raw patterns, internal mappings and supplier artifacts.
- A club download is flattened and marked **Design proof: not for manufacture**.
- Placeholder proofs are demonstrator-only and not production-ready.
- Proofs and approval artifacts are immutable original bytes with checksums; later corrections create new versions rather than mutating reviewed evidence.

## Club roles represented by the demonstrator

- Each club may have up to two club users and one appointed administrator at a time.
- Each person has an individual email-linked account; shared accounts are prohibited.
- Club users prepare assets, designs and store branding but do not formally approve.
- The administrator inherits preparation capabilities, manages nominated club users and gives formal club approval.
- Pivot appoints/replaces administrators through verified written club nomination and separately performs technical, compliance, production and quality decisions.
- Phoenix's administrator and separate workflow-test user remain unresolved external nominations. Kylie and Cameron cannot act as Phoenix club administrator because of their Pivot connections.
- Demonstrator identity controls are simulations and are not production authentication.

## Club-store copy boundary

The website may describe the intended controlled store but must not imply it is generally available.

- No freeform layouts, navigation, fonts or unrestricted themes.
- Club users supply approved colours and artwork; the system creates accessible light and dark themes.
- The administrator previews and approves both.
- Approved products appear only after their separate product/design workflow.
- Store light/dark themes are independent of reversible jersey dark/light faces.
- Exact additional store content and production infrastructure remain unresolved.

## Upload security and privacy baseline for future implementation

The current browser-local public trial must not imply production-grade upload handling. If authenticated uploads are implemented, every upload is untrusted and must enter private quarantine, undergo independent content verification, limits, malware scanning and isolated processing, and remain unusable until checks pass. Active SVG/PDF content must be sanitised or safely converted; generated safe derivatives are used in the editor.

Supported customer-facing boundary:

- PNG, JPEG and WebP;
- HEIC/HEIF converted to a safe derivative;
- sanitised SVG; and
- safely processed PDF only for authenticated completed-design onboarding/reference.

AI, EPS, PSD and archives require controlled Pivot assistance rather than direct editor opening.

Phase 1 must prohibit ordinary collection of payment/bank details, passwords, government IDs, health/biometric data, dates of birth, rosters, children's contact details, unrelated sensitive information and identifiable photographs of people.

Public data remains browser-local and must not be uploaded by Pivot. For future authenticated handling:

- an unused upload may be deleted after 90 days only if it is unreferenced, with 14 days' warning;
- an unsubmitted draft becomes inactive after 12 months, may be deleted after 24 months, and receives a 30-day recovery period;
- drafts under review, on hold or linked to active support are not automatically deleted; and
- submitted/approved artifacts and the exact production record follow their immutable long-term retention requirements.

Production storage, backup mechanisms and provider remain unresolved. The latest lean Phase 1 business boundary is next-business-day restoration and potential loss of up to 24 hours of saved draft work after a major failure. Completed approvals and production releases require stronger durable protection, but the proportionate implementation must be validated within the separate infrastructure decision.

## Accessibility, device and test baseline

- Formal target: WCAG 2.2 Level AA for customer-facing website and Studio, including keyboard-operable structured alternatives to canvas interaction.
- Test latest two supported desktop versions of Chrome, Edge, Firefox and Safari.
- Test Safari on current/recent supported iPhones and iPads, and Chrome on current/recent supported Android devices.
- Public pages, sign-in, proof review, approvals and club-store browsing must work on phones.
- Desktop/tablet are the reliable precision-editor baseline. Full phone editing is preferred, not a pilot blocker.
- Internet Explorer and embedded social-media browsers are unsupported.
- Test with 5–8 Phoenix volunteers across roles, confidence levels and actual devices using realistic setup, create/edit, save/reopen, submit, proof-review and approval tasks.
- A defect preventing a core task must be resolved before live pilot use.

## Demonstrator acceptance criteria

The following describe the next implementation target; this reconciliation does not implement them:

1. Website copy accurately states pilot availability, Greater Bendigo service and non-commitment.
2. Public trial work remains browser-local and cannot be presented as saved, submitted or approved.
3. The entry flow labels basketball as available, shorts as provisional, and uses club-polo terminology.
4. Every placeholder garment, boundary and rule profile is visibly non-production-ready.
5. Front/back 2D surfaces and reversible dark/light faces can be explored without requiring 3D.
6. Any side/3D effect is labelled indicative and never used as approval evidence.
7. Users can explore supported colours, patterns, text and ordinary artwork with accessible controls.
8. Basketball numbers remain required and player names are unavailable.
9. Help copy states what is demonstrable and what remains unresolved.
10. Simulated save, submission and approval actions are identified as demonstrations until production identity and persistence exist.
11. Core controls meet WCAG 2.2 AA through semantic, keyboard-operable alternatives.
12. No supplier, final Phoenix artwork, production infrastructure, accurate 3D or manufacturing integration is represented as settled.

## Test approach for later implementation

Use state and accessibility assertions, supplemented by stable visual regression tests. Cover:

- public availability, service-area and trial notices;
- browser-local public persistence boundary;
- garment scope and terminology;
- colour, pattern, text, artwork, number and surface controls;
- placeholder and indicative-3D labelling;
- design checks and unresolved-input notices;
- simulated versus authenticated workflow messaging;
- keyboard navigation, focus, accessible names and non-drag alternatives;
- responsive website/help layouts on supported device classes; and
- prevention of stale approval or production claims in demonstrator copy.

## Reference context

The original baseline was informed by inspection of the BLK Design Your Own basketball configurator. That reference is non-normative. Pivot must not copy supplier-specific assumptions from it or let a WebGL reference dictate product authority, accessibility or manufacturing readiness.
