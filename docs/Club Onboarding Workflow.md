# Club onboarding journey

**Status:** Agreed process baseline

**Owner:** Pivot Teamwear

**Scope:** Commercial Agreement, Onboarding, the link to Products, and initial Club Store Publication

## Process boundaries

This document links four distinct workflows without absorbing their responsibilities:

1. **Commercial Agreement** — begins with a website expression of interest/enquiry or email and ends when commercial acceptance triggers onboarding.
2. **Onboarding** — establishes the authorised Club Administrator and approved Store foundation in private preview.
3. **Products** — links to the separate [Product Workflow](./Product%20Workflow.md). This journey records only its inputs and its **product approved for Store** output.
4. **Club Store Publication** — begins when the first approved product is added to the private Store and ends when Pivot publishes the Store.

Future product additions remain within the product workflow and do not repeat initial Store publication approval.

## Process visual

[Open the standalone swimlane visual](./Club%20Onboarding%20Workflow.svg)

![Pivot Club onboarding journey swimlane](./Club%20Onboarding%20Workflow.svg)

## Visual standard

The process visual follows the Caylios workflow standard: operational flow runs left to right, actor swimlanes have equal height, labels are concise, connectors use one direction with minimal crossings, and standard shapes retain their defined meanings. Each actor has a consistent lane and task colour so ownership is visible at a glance. **Products** uses a clickable Predefined Process shape because its workflow is owned separately.

## 1. Commercial Agreement

1. A club submits the existing website expression-of-interest/enquiry form or contacts Pivot by email.
2. Pivot holds meetings and conversations with the club.
3. Pivot and the club agree the initial service and product requirements, and Pivot confirms it can reliably support the club.
4. Pivot prepares and confirms the current quote and agreement terms as ready. They remain separate versioned records.
5. The System sends them together as one commercial package and records delivery.
6. An authorised office bearer electronically accepts the exact quote and agreement versions.
7. During acceptance, the office bearer either:
   - accepts the prefilled commercial email contact as the initial Club Administrator; or
   - nominates a different initial Club Administrator by name and email.
8. The System records the exact accepted versions, office-bearer authority and administrator selection.
9. Pivot accepts or countersigns the agreement.
10. Acceptance by both parties, together with the accepted quote, triggers Club Onboarding and the administrator invitation automatically.

If commercial changes are required before acceptance, they remain in the commercial workflow and onboarding does not begin.

### Administrator authority established by the terms

The agreement terms establish that the signing office bearer appoints the selected Club Administrator as the club's authorised operational representative. The authority includes:

- approving club branding and Store configuration;
- approving product designs;
- providing required club confirmations;
- accepting quotes for new or changed products under the standing agreement; and
- submitting the initial Store for publication.

The club remains responsible for any internal committee or financial approvals. Pivot may rely on the administrator's recorded approval until the club validly replaces or revokes that authority. Changes to the standing agreement or contracting entity remain outside the administrator's ordinary operational authority.

Final commercial wording requires appropriate Australian legal review.

## 2. Onboarding

1. The System sends the selected Club Administrator an individual account invitation.
2. The administrator activates the account.
3. Verified commercial information is reused. Legal identity fields are read-only and provide a **Report a correction** path; operational and public Store information remains editable.
4. The administrator confirms the club's operational and public details.
5. The administrator uploads the official club logo and supplies the club's Store colours.
6. The administrator may add other reusable assets now or later.
7. The System generates the controlled accessible Store themes and runs the built-in setup check.
8. The administrator reviews the private Store preview and corrects any **Action required** items.
9. The administrator selects **Approve Store setup** for the exact version reviewed.
10. The System records the administrator, Store version and timestamp, marks onboarding complete and retains the Store in private preview.
11. The administrator may invite, revoke or replace up to two Club Users during onboarding or later. User setup does not block onboarding completion.
12. Onboarding completion makes the separate product workflow available to the administrator and active Club Users.

### Store setup guidance

Use continuous built-in guidance consistent with the Pivot Design Studio:

- **Complete** — requirement satisfied.
- **Action required** — blocks onboarding completion.
- **Check this** — non-blocking concern or likely mistake.
- **In progress / not started** — neutral status.

Progress saves automatically. Pivot receives an alert after seven days without progress, repeated blocking failures, explicit help requests, access/authority failures or security concerns. Thresholds remain configurable.

### Store identity scope

- The administrator confirms the club's current logo and authority to provide it. Routine copyright or font-licensing investigations do not block onboarding; obvious concerns or disputes follow an exception path.
- The System may suggest colours detected from the logo. The administrator confirms the digital Store colours and may supply any known HEX, RGB, CMYK or Pantone references. Missing formats are not required.
- Detailed production-colour mapping and production asset checks belong to the separate product workflow.
- An asset may be Store-ready while still requiring production attention. The shared warning appears in onboarding and the Pivot Design Studio without requiring another upload.
- Controlled light and dark themes are generated from the confirmed club identity. The administrator previews them but does not control layout, opacity or accessibility-managed values. This remains subject to later Store usability testing.

### Analytics

Product-improvement analytics contain no personal information and use a stable opaque `clubId`, not the club name. Capture structured setup events and issue codes only. An authorised support view may resolve the identifier to a club when Pivot needs to provide assistance.

## 3. Products

[Open the Product Workflow](./Product%20Workflow.md)

The Product Workflow is a separate process and is not represented as an actor swimlane. This document does not define its internal steps.

**Input:** Onboarding is complete, so the Club Administrator and active Club Users can access the product workflow according to their roles.

**Output used here:** **Product approved for Store.** That status already means the product has received the required Club Administrator and Pivot approvals. The approved product is added to the Store automatically.

## 4. Club Store Publication

1. When the first approved product is added to a private Store, the System marks the Store **Ready for publication**.
2. The System emails the Club Administrator and provides the same in-app notification. The message explains that the Store is not public yet and links to the private preview.
3. The administrator reviews the complete Store, including the approved product, and corrects any Store setup issue.
4. The administrator selects **Submit Store for publication**.
5. Submission records and locks the exact Store version reviewed, its included approved products, the administrator and timestamp. Later changes create a new draft and require resubmission.
6. The System alerts Pivot and provides the submitted Store version.
7. Pivot reviews the Store for completeness and presentation without repeating product approval.
8. Pivot either:
   - publishes the exact submitted Store version; or
   - returns it with a clear reason while the Store remains private.
9. If returned, the administrator corrects the Store and resubmits an exact version.
10. After publication, the System emails the public Store link to the Club Administrator and all active Club Users and records the published version, Pivot actor and timestamp.

This workflow occurs only for the first product and initial Store publication. Future approved products are added to the published Store automatically through the product workflow.

## Notification rules

| Event | Recipients |
|---|---|
| Product approval | Club Administrator and Club Users involved in that product; office bearer only when also the administrator or explicitly opted into governance notifications |
| First product makes Store ready for publication | Club Administrator only |
| Initial Store published | Club Administrator and all active Club Users |

## Required follow-up: proportionality audit

Before implementation specification, perform the separately agreed repository-wide proportionality audit against the Business Plan and Operating Model. Review maintained requirements for enterprise-scale, speculative, duplicated or volunteer-hostile controls while preserving genuine club-isolation, authority, audit, Pivot approval and production-quality requirements.
