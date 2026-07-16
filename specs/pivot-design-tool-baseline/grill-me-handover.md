# Pivot Grill-Me Handover

> **Later session:** Continue with `specs/pivot-design-tool-baseline/grill-me-handover-production-output.md`, which supersedes this file where decisions conflict.

**Date:** 2026-07-16  
**Status:** Session paused for a break. Resume the grill before architecture-sensitive implementation.  
**Resume command:** `grill-me Continue from specs/pivot-design-tool-baseline/grill-me-handover.md`

## Resume instructions

1. Read this file completely.
2. Read the linked baseline documents before changing specifications:
   - `specs/pivot-design-tool-baseline/grill-me-reconstruction.md`
   - `specs/pivot-design-tool-baseline/spec.md`
   - `specs/pivot-design-tool-baseline/brief.md`
   - `docs/Pivot Constitution.md`
   - `docs/Phoenix Phase 1 PRD.md`
   - `docs/brand/Brand Kit_V1.00.pdf`
   - `docs/brand/Visual Design Guide_V1.00.pdf`
3. Treat this file as the record of decisions made in the latest session. Where it conflicts with an older specification, flag and reconcile the conflict before coding.
4. Continue asking one question at a time with a recommendation.
5. Prompt the user to increase AI reasoning before authentication, security, storage, infrastructure, 2D-to-3D mapping, supplier validation architecture, or production-export architecture.
6. Do not restart the FAQ exercise. The copy below is good enough to take into coding and may be refined during usability testing.

## Session goal and status

The session began with a large list of information and assets still needed. The user requires every item eventually to have one of:

- a final decision;
- a provisional decision pending validation; or
- an externally required input with an owner, fallback, deadline, and explicit blockers.

This session resolved brand, landing-page, FAQ, public trial, club-store setup, role, and approval decisions. Many supplier, editor, infrastructure, launch, and production-output questions remain unresolved.

## Brand and content decisions

### Landing-page purpose

- The public page collects club interest. It is not open Phoenix pilot registration.
- It may later support launch invitations, previews, announcements, and early relationships, without promising any of them.
- Do not publicly over-explain the Phoenix pilot in the registration section.
- The public service area is Greater Bendigo only.
- Anyone may try the Pivot Design Studio, but Pivot supplies and delivers products and club stores only within Greater Bendigo.

### Approved registration section

> **Be part of what comes next.**  
> A modern teamwear experience is coming to Greater Bendigo. Explore your club’s ideas from every angle with interactive design tools, quality custom apparel, club-branded stores, fair pricing and reliable local support. Register your club’s interest and get in the game.

CTA: **Register Your Club’s Interest**

### Registration fields

- Contact name
- Club name
- Email address
- Sport
- League or association
- Club suburb or postcode
- Required privacy/marketing consent

Behaviour:

- Sport options use the same shared catalogue as the Design Studio.
- League or association options depend on the selected sport and use the same shared competition catalogue.
- Both selectors include `Other`.
- Selecting `Other` reveals a required free-text field.
- The form and Design Studio must not maintain separate sport or competition lists.
- Suburb/postcode checks Greater Bendigo service eligibility.
- All notifications go to `hello@pivotteamwear.com`; Pivot does not want multiple public inboxes.
- Store submissions securely as well as sending email, so registrations do not depend on email delivery alone.

### Registration consent language

> No. Registering your interest does not commit your club to purchase anything, join a pilot or open a club store. It gives us permission to contact you with relevant updates about sports and products becoming available and launch news. You can opt out at any time.

### Registration confirmation

> **You’re in the game.**  
> Thanks for registering your club’s interest. We’ve got your details and will be in touch when it’s time for the next play.

### Contact and launch decisions

- A launch event is likely around August or September 2027, before the 2027–28 summer season, but it is not promised publicly.
- Do not commit to a newsletter.
- Registrants may receive relevant announcements, availability updates, or event news.
- Phoenix remains the formal controlled pilot.
- Trusted clubs may be approached after Phoenix validation, but timing and method depend on business capacity and are not promised.
- Founding-club selection criteria and broader onboarding are deferred because they do not block the Design Studio.

### Public product categories and approved descriptions

**Playing uniforms**  
Quality custom uniforms designed around your club’s identity, sport and competition requirements.

**Club apparel**  
Coordinated apparel for players, coaches, volunteers and supporters, all in one club range.

**Club stores**  
A modern, club-branded place for your community to explore and access approved teamwear.

### Customer-facing writing standard

The Brand Kit is authoritative. Copy must be:

- clear, professional, approachable, practical, positive, modern, clean, and volunteer-focused;
- simpler and sharper in help areas than in marketing FAQs;
- free from unnecessary jargon, corporate language, and exaggerated claims;
- written mostly as `we`/`our`; use `Pivot` for the company name or named product;
- consistent in sporting metaphors rather than stacking multiple metaphors in one passage;
- free from unnecessary colons, em dashes, and conspicuous AI-style punctuation in customer copy.

Use `teamwear` in general customer copy, `apparel` for categories, and `garment/template` only where technical precision is needed.

## Naming decisions

- Customer-facing tool name: **Pivot Design Studio**.
- Design Studio CTA: **Game On. Start Designing**.
- CTA accessible label: **Start designing with the Pivot Design Studio**.
- Review CTA length, hierarchy, responsiveness, and clarity in usability testing.
- Do not build white-label or licensing features now.
- Keep branding reasonably configurable through clean architecture so it can be changed later if a genuine sale or licensing opportunity appears.
- Help-area names:
  1. **FAQs**
  2. **Pivot Design Studio Help**
  3. **Club Help Centre**

## Working FAQ copy

This copy passed a Brand Kit and duplicate-language review. It is approved as good enough for coding, with further refinements allowed during testing.

### FAQs

#### What is currently available?

Pivot is currently in pilot. The Pivot Design Studio is open to try, while teamwear and club stores are not yet available to other clubs.

#### What sports will Pivot support?

Basketball takes the court first in our pilot, with more community sports coming soon. Before adding each sport, we make sure the products and design experience meet its competition and production requirements. We take care of this work to make the process easier for club volunteers.

Whatever your sport, register your club’s interest to get in the game.

#### Where does Pivot operate?

Pivot supplies and delivers teamwear only within the Greater Bendigo area.

#### How can our club customise its teamwear?

Have an idea or an existing design? We’ve got you covered. Use our interactive design tool to build your teamwear or upload an existing design. Explore colours and patterns, add club and sponsor branding, include text, and customise the player number included on jersey templates.

**Want to see how it works? Try the Pivot Design Studio and see your ideas in action.**

CTA: **Game On. Start Designing**

#### Can our club have its own branded store?

Yes. Your club store brings together your approved colours, logo, teamwear and supporter apparel in one modern experience branded for your club. We take care of setting up the store and its products. Your community gets one clear place to find the approved club range.

#### What apparel will Pivot offer?

Our basketball pilot puts players first with jerseys and shorts, followed by apparel to kit out the whole club. Families and fans will have more ways to wear their colours and cheer their club on.

Quality comes first. Every product will be reviewed for comfort, performance and reliable delivery before it becomes available.

#### How much will Pivot teamwear cost?

We lead with quality and keep pricing fair for community sport. Once confirmed, prices for each teamwear item will be published in our product catalogue. This will make it easy for clubs and families to know what things cost.

#### How do we register our club’s interest?

Complete the registration form by answering a few quick questions. We’ll be in touch when it’s time for the next play.

#### Does registering commit our club to anything?

No. Registering your interest does not commit your club to purchase anything, join a pilot or open a club store. It gives us permission to contact you with relevant updates about sports and products becoming available and launch news. You can opt out at any time.

### Pivot Design Studio Help

#### Can I try the Design Studio without joining Pivot?

Yes. Choose your sport, competition and teamwear item to get started. You can add your club colours and artwork before entering the Design Studio or skip that step and add them later.

With our interactive design tool, you can change colours and patterns, add text and artwork, and view your design in 2D and 3D. This gives you the freedom to create teamwear that is unique to your club.

CTA: **Game On. Start Designing**

#### How do club colours and artwork work?

Add your club colours, logos and sponsor artwork. Your club colours appear in the colour palette, and your artwork becomes available to place on your teamwear.

If you already have a completed design, upload the full design instead. We will fit it to your chosen teamwear template so you can continue working with it in the Design Studio. Your club colours give you a starting point without limiting what you can explore.

#### What can I change?

You can change colours and patterns, add text and artwork, and move, resize or rotate elements within the available print areas. The Design Studio guides you through placement, sizing and design requirements while you work.

#### How do the 2D and 3D views work?

Edit your design in 2D, then switch to 3D to view it from every angle. Changes appear in both views as you work.

#### Can I save my design?

During the pilot, public trial designs are available only for your current visit. Invited club users can sign in to save drafts and return to them later.

### Club Help Centre

#### Who can access our club account?

Each club can have up to two users and one appointed administrator at a time. We set up the administrator, who can then add, remove or replace the club’s users.

Users can create designs and prepare the club store. The administrator approves their work before it moves forward. Contact us if the club needs to appoint a new administrator.

#### How are club designs approved?

Club users submit designs to the administrator for approval. Once the administrator approves the digital design, we check the product, production, sport and competition requirements.

We then arrange a final design proof for production and, where required, a physical sample. We complete our quality checks before reviewing the proof or sample with the club administrator for final approval.

Once approved, the design is ready to be made and added to the club store.

#### How is our club store set up?

A club user adds the club logo, artwork and approved colours. The store automatically creates accessible light and dark themes for the administrator to preview and approve. Approved teamwear appears in the store when it becomes available.

#### How do we get help?

If you cannot find the answer here, contact us at hello@pivotteamwear.com and we will help you get back in the game.

## Public trial and Design Studio entry

- Public visitors can try the Pivot Design Studio without joining Pivot.
- During the pilot, public trials are session-only.
- Public visitors cannot save, share, submit, or recover trial designs.
- Show a clear notice before entry that public trial work is available only for the current visit.
- Only invited authenticated club users can save drafts permanently and submit designs.
- Guest/public saving is deferred until after the pilot and must be justified by demand.
- Public trial users choose sport, competition, and teamwear item.
- Add an optional club setup step before the editor:
  - add club colours and artwork; or
  - choose **Skip for now** and add them later.
- Provided colours and assets carry into the editor.
- Default Pivot colours/design elements load when club assets are skipped, but the customer copy does not need to explain this.
- The editor supports colour and pattern changes, text, artwork, and 2D/3D views.
- Only approved supplier templates may appear as live production choices. Internal placeholders may be used for development but must not be customer-selectable production templates.

## Uploaded artwork and existing designs

- Users can upload individual club logos, sponsor artwork, and other assets.
- Users can upload an existing completed teamwear design.
- A completed design must be fitted/adapted to Pivot’s approved teamwear template and then remain editable in the Design Studio.
- An uploaded image is not automatically production-ready.
- Exact automatic-versus-assisted conversion behaviour still needs technical planning.
- There is an unresolved conflict to reconcile with `grill-me-reconstruction.md`: that document proposes automatic colour extraction from logos, while this session often assumed users enter approved club colours. Decide whether extraction is optional assistance, required behaviour, or deferred.

## Design behaviour decisions

- Club colours provide a starting palette, not an arbitrary creative lock.
- Public trial users may experiment freely.
- Official club colours may later be locked for official designs by the club administrator; exact controls remain to be specified.
- Jersey templates include a representative player number by default for styling and compliance review.
- The design is not duplicated for every player number.
- Player ordering, number selection, duplicate-number prevention, rosters, and club approval of player allocations are unresolved Phase 2 questions. Do not treat the speculative discussion as a locked design.
- The Design Studio permits colour/pattern changes and adding/moving/resizing/rotating text and artwork within available print areas.
- The tool guides placement, sizing, sport, competition, and production requirements.
- Draft experimentation may be non-compliant.
- Users can continue editing and, if authenticated, saving non-compliant drafts.
- The tool blocks submission while blocking issues remain.
- Show issues near the relevant control or design element and in a design-check summary.
- Distinguish blocking errors from non-blocking guidance.
- Do not duplicate this as a generic FAQ when contextual guidance can explain it in the tool.

## Reversible jersey and product requirement

- The Phoenix basketball jersey must use a single garment layer printed on both sides.
- A conventional reversible jersey made from two sewn garment layers is unacceptable.
- This is a non-negotiable supplier/product requirement. Pivot should not proceed with a jersey product or supplier that cannot meet it with acceptable quality.
- Validate fabric weight, opacity, show-through, colour, durability, comfort, and print quality.
- Once validated, a possible product message is `Reversible without the bulk`, but do not publish the production claim before validation.
- Keep uniform dark/light design decisions separate from digital store light/dark themes, even though both may use the approved club colours.

## Roles, accounts, and access

- Each club has up to two club users and one appointed club administrator at a time.
- This is a controlled account allowance, not an ever-growing user list.
- Pivot creates/appoints the club administrator.
- The club administrator can add, remove, and replace the two club users.
- If the administrator changes, Pivot verifies and appoints the replacement.
- Each person uses an individual email-linked account; shared accounts are prohibited.
- Replacing a person revokes their access and creates a separate account for the replacement.
- Historical audit actions remain attributed to the original person.
- The privacy framing is accountability and security, not broad monitoring.
- Detailed authentication, MFA, invitation, recovery, privacy, and account-review decisions are parked until after FAQ work. Prompt for higher AI reasoning before resuming them.

### Role capabilities

**Club users**

- create and edit designs;
- prepare club branding/store setup;
- cannot give formal club approval.

**Club administrator**

- manages club-user access;
- approves club branding/store setup;
- approves submitted designs on behalf of the club;
- provides final approval of production proofs/physical samples.

**Pivot**

- appoints/replaces the club administrator;
- reviews apparel/design changes after club approval;
- performs production, sport, competition, and product checks;
- performs quality checks;
- does not need to manually approve ordinary controlled store branding if automated checks and club approval are sufficient.

## Club-store setup

The pilot does not include a general freeform store editor.

Setup flow:

1. Pivot creates the club and invites the nominated administrator.
2. The administrator adds up to two club users.
3. A club user, such as a uniform coordinator, uploads the club logo/artwork and enters approved club colours.
4. The controlled store template automatically applies the branding.
5. The system automatically creates accessible light and dark store themes.
6. The administrator previews and approves both themes and the store branding.
7. Store visitors can switch between light and dark themes; remember the preference on that device.
8. Approved products appear automatically after completing their separate product/design approval workflow.

Store constraints:

- No custom layouts, fonts, navigation, or unrestricted themes.
- Volunteers provide assets once; the system creates themes rather than asking volunteers to design them.
- Both themes must meet accessibility contrast requirements.
- Store theme choice is independent of reversible uniform sides.
- Use a logo container with protected padding so one supplied club logo can work across light/dark themes.
- Do not recolour, distort, outline, or alter the logo.
- Automatically choose a light or dark container background for clarity.
- Let the administrator preview it.
- If neither treatment works, Pivot reviews the source asset manually.
- Exact additional store content beyond branding and approved products remains unresolved.

## Approval, proof, sample, and publication workflow

1. A club user creates and submits a compliant design version.
2. The club administrator approves that exact digital design on behalf of the club.
3. Pivot reviews product, production, sport, and competition requirements.
4. Pivot arranges a final design/production proof and, when required, a physical sample.
5. Pivot completes quality checks before club final approval.
6. Pivot reviews the final proof or physical sample with the club administrator. A physical sample review is expected to be an in-person meeting.
7. The club administrator gives final approval.
8. The design becomes ready for production and can appear in the club store.

Version behaviour:

- Approved versions are immutable and remain in place.
- Editing an approved design creates a new draft and never alters or invalidates the approved design.
- A replacement becomes official only after completing the required approval path.
- Approval events must record actor, exact version, and timestamp internally, even when customer copy does not mention recording.

Risk-based sampling:

Physical samples are required when:

- a product/template is used for the first time;
- a new fabric, print method, or production process is introduced;
- digital colour accuracy is uncertain;
- a design change creates production risk; or
- Pivot or the club requests a sample due to identified risk.

A design/production proof may be sufficient when:

- product and process are already validated;
- approved colours and placement rules are used;
- there is no new production risk; and
- Pivot confirms another physical sample is unnecessary.

Exact approved products may be reordered without repeated physical sampling.

## Product naming and catalogue

### Polo terminology change

Replace customer-facing terms everywhere:

- `Men’s coach polo` → **Men’s club polo**
- `Women’s coach polo` → **Women’s club polo**
- `Coach garment` → **Club official and volunteer apparel**

Men’s and women’s club polos may be used by coaches, committee members, and volunteers. Update the Design Studio selector, product catalogue, club store, specifications, tests, and seed data. Preserve/migrate internal identifiers safely where saved data depends on them.

### Catalogue model

- Maintain one product catalogue rather than separate catalogues by sport.
- Filter by sport, product category, and audience.
- A product supports one or more sports.
- Sport-specific products appear only under relevant filters.
- Universal products such as beanies may appear under multiple sport filters.
- Each product record includes price, availability, supported sports, options, and category.
- Published product prices appear once confirmed.

## Pricing and community support

- Lead with quality and fair pricing.
- Publish prices for each teamwear item in the product catalogue once confirmed.
- Use the same published pricing structure for every club.
- Build normal MOQ exposure, small-order freight, and operating risk into published prices.
- Genuine batch orders may be assessed separately where consolidated production/freight changes cost, but do not advertise speculative batch rates.
- Do not include club kickbacks, commissions, or hidden fundraising margins in the initial model.
- Pivot may provide practical in-kind community support, such as spare playing garments, fundraising items, or player prizes.
- In-kind support should follow a fair internal allowance tied to qualifying teams/orders and be financially measured.
- Do not advertise the support programme yet or create an entitlement before the model is validated.

## Sports and apparel rollout

- Basketball is first in the controlled pilot.
- Add sports only after validating products/templates and building their competition/production requirements into the experience.
- More sports may be visible as coming later, but only validated sports can be selected as available.
- Clubs from any sport may register interest.
- Pilot playing essentials are jerseys and shorts.
- Men’s and women’s club polos are also part of the pilot but do not need emphasis in the public apparel FAQ.
- Future club/training/supporter product specifics remain flexible and should not be promised prematurely.

## Deferred post-pilot concept

Community design submissions are deferred:

- Players and community members may eventually create concepts and submit them to their club.
- Concepts must not automatically enter Pivot’s formal approval workflow.
- Club-authorised users choose whether to adopt and develop a concept.
- If children can participate, child safety, parental consent, privacy, moderation, identity, and club-routing controls must be designed first.
- This is not part of the Phoenix pilot.

## Decisions explicitly not locked

- Exact Phase 2 player ordering, roster, number allocation, duplicate prevention, and number approval behaviour.
- Automatic colour extraction versus direct club colour entry.
- Exact conversion pipeline for a completed uploaded design.
- General guest saving after the pilot.
- Exact public launch event/date.
- Exact method and timing for onboarding clubs after Phoenix.
- Full list/release order of future sports and products.
- Additional club-store content beyond approved branding and products.
- Authentication provider, MFA, recovery, and detailed account security.
- Storage, retention beyond already-governed approval records, hosting, email delivery, analytics, monitoring, backup, legal terms, and production domain.
- Exact production export contract and supplier handover format.

## Original list still requiring answers

Continue through the original information list. Major unresolved areas include:

### Phoenix and supplier inputs

- Official Phoenix logos, approved colours, branding, sponsor assets/permissions/positions, front/back content, competition/age/division, player-name requirements, and approval contacts.
- Supplier selection/contact and all authoritative jersey, shorts, and polo templates.
- Panel geometry, dimensions, scale, print boundaries, safe zones, seams, bleed, trim, restrictions, detail limits, fonts, production zones, fabric/colour limits, reversible construction, and handover format.

### Editor details

- Exact deletable versus mandatory/locked elements.
- Exact number-editing rules.
- Layer ordering, upload approval, upload size/types, background removal, opacity/flipping, multiple versions, naming, undo/redo, zoom, and mobile behaviour.
- The broad direction remains high creative freedom inside supplier/manufacturing and competition constraints.

### 3D details

- Generic visualisation-only mesh policy during development.
- Technology selection.
- Supplier geometry/UV maps.
- Side-panel wrapping.
- Rotation/zoom behaviour.
- Final visualisation disclaimer.

### Infrastructure and operations

- Permanent storage, uploaded-artwork storage, general retention, authentication, hosting/domain, email service, privacy, terms, artwork ownership/permissions, backup/recovery, analytics/error monitoring.

### Launch and production

- Pilot acceptance criteria, test participants, feedback method, supported browsers/devices, accessibility target, final launch timing, production-readiness owner, proof/sign-off details, order/enquiry handover, and final export contents/format.

## Recommended resume point

Resume with the remaining highest-risk product decision that does not require unavailable supplier data: the **production output contract**. Determine what exact immutable design data, customer proof, audit information, and supplier/manufacturing artifact the completed system must eventually produce. Mark supplier-specific fields provisional where necessary.

Before that architecture-sensitive branch, prompt the user to increase AI reasoning as previously requested.
