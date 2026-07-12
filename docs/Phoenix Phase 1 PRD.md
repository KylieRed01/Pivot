# Phoenix Phase 1 PRD

**Status:** Draft  
**Date:** 12 July 2026  
**Product:** Pivot Teamwear

## Problem Statement

Phoenix needs a simple way to review and approve its teamwear design before the sponsored pilot production run. Pivot needs to test the club design experience while retaining control of product approval and preparing for a future multi-club ordering platform.

The phase 1 pilot covers sponsor-funded U10 jerseys and coach polos. Its primary operational purpose is to validate product quality and delivery within the agreed window. The digital product must give Phoenix a realistic club-store and design-tool experience without introducing individual ordering or payment processing.

## Solution

Provide a Phoenix-branded, link-accessible club store and a guided Pivot design tool.

Phoenix administrators can work from approved product templates, use available club and sponsor artwork or upload artwork, view their design in both 2D and 3D, and submit it for approval. The club approves first; Pivot then reviews and approves before the design may be published or supplied for manufacture.

The store is non-transactional in phase 1. It displays approved products without prices and includes coach-polo sizing charts. Batch sizes and supplier orders remain manual.

## User Stories

### 1. Phoenix club administrator designs approved products

As a Phoenix club administrator, I want to customise an approved jersey or coach-polo template using guided options, so I can create a club design without using a complex freeform editor.

**Acceptance criteria**
- The administrator can work only with approved templates and permitted customisation options.
- The experience supports meaningful creative freedom without unconstrained element editing.
- The administrator can use Pivot-provided artwork and, if desired, upload club or sponsor artwork.
- Uploaded artwork is subject to Pivot review.
- The design workspace presents a controlled 2D editing view and a 3D garment preview.

### 2. Phoenix club administrator reviews the garment in 3D

As a Phoenix club administrator, I want to inspect the design on a 3D model, so I can assess how the jersey will look as a garment rather than only as a flat template.

**Acceptance criteria**
- The 3D model is available in phase 1.
- Once a supplier is selected, the model and production template use that supplier's approved garment pattern.
- The supplier-approved template is the production authority.

### 3. Phoenix approves a design before Pivot review

As Phoenix's nominated primary approver, I want to give final club approval to a design, so Pivot receives a clear approved version for operational review.

**Acceptance criteria**
- A club can have multiple administrators and one nominated primary approver.
- The club manages its own additional administrator access.
- Club approval occurs before Pivot approval.
- Approval records identify the approver, artwork version and timestamp.

### 4. Pivot reviews and approves the club-approved design

As a Pivot administrator, I want to review a club-approved design before it is published or manufactured, so Pivot maintains quality and operational control.

**Acceptance criteria**
- Pivot can access every club, design, approval record and store configuration.
- Pivot can approve or return a design for revision.
- A design cannot be published or submitted for manufacture until both club and Pivot approvals are complete.
- The system retains an audit record of design changes, store publication and approvals.

### 5. Phoenix experiences its club store

As a Phoenix representative, I want to view a branded club store, so the club can experience the intended future member journey.

**Acceptance criteria**
- The store is accessible by link and excluded from search-engine indexing.
- It displays approved Phoenix products and no prices.
- It includes sizing charts for coach polos.
- It does not accept orders, payments, expressions of interest or size submissions in phase 1.

### 6. Pivot preserves a future-ready club model

As Pivot, I want club administrators isolated to their own club while customers can later shop across clubs, so the platform can support multiple clubs without changing the core access model.

**Acceptance criteria**
- Club administrators cannot access another club's data or administration.
- Pivot retains override access.
- The product model supports customers browsing and purchasing from multiple club stores in a later phase.
- Customer accounts in a later transactional phase will show complete order history across clubs.
- Guest checkout is permitted in a later transactional phase.

## Implementation Decisions

- The phase 1 production pilot is Phoenix-only. No other club is enabled in production.
- Build a multi-club foundation, but enable Phoenix only in production during the pilot.
- Phase 1 is sponsor-funded batch production: U10 jerseys and coach polos.
- Batch sizing, order administration and supplier submission are manual in phase 1.
- No payment portal is included in phase 1.
- Supplier selection follows sample evaluation and is outside this product scope.
- Development may establish the design-tool framework before supplier selection. The selected supplier's approved 2D template and exact 3D garment model are added after selection.
- The design tool is a Pivot-owned capability. If it cannot meet the Phoenix readiness deadline, a white-label customiser may be used for the pilot, provided Pivot retains its club, design and approval records and can replace the tool later.
- Club administrator sign-in is passwordless by email link.
- Pivot administrator accounts require multi-factor authentication.
- Customer data, uploaded artwork, database backups and audit records must remain in Australia in production. Hosting decisions are deferred.
- Approval records are retained for the life of the related product and order, plus seven years.

## Testing Decisions

Test the following behaviours before Phoenix use:

- A Phoenix administrator can access only Phoenix administration.
- A primary approver can approve a version; another club administrator cannot access it from another club context.
- Pivot can review, approve or return a club-approved design.
- Publication and manufacture submission remain blocked until both approvals exist.
- The audit record captures design changes, publication and both approval events with actor, version and timestamp.
- Phoenix administrators can use preloaded artwork and upload artwork.
- The 2D template and 3D preview display the same approved design state.
- The selected supplier's template and 3D model are used before final production approval.
- The Phoenix store is accessible by link, not indexed, shows no pricing, and contains coach-polo sizing charts.
- The store has no checkout, payment, order, expression-of-interest or size-submission flow.
- Club administrators can manage their own additional administrator accounts; Pivot can override access.

## Out of Scope

- Individual member ordering.
- Payments, checkout, refunds and Stripe integration.
- Customer account creation and guest checkout implementation.
- Order-window management.
- Batch creation, automated validation, manufacturing exports and supplier API integration.
- Supplier selection, sample evaluation, product quality assessment, production, freight, QC and fulfilment operations.
- Public Pivot marketing website.
- Search-engine marketing or store indexing.
- Other clubs in production.
- Pricing display.
- A fully unconstrained freeform design editor.
- Native mobile applications.

## Further Notes

### Pilot dates

- Target season start: Monday 28 September 2026, using the earliest possible season date.
- Full production and freight allowance: four weeks from approved artwork to Bendigo delivery.
- Hard artwork approval and supplier-submission deadline: Monday 31 August 2026.
- Phoenix must have design-tool access by Monday 17 August 2026.

### Governance

- The Director has final authority to approve, amend or waive governing decisions.
- Where governing documents conflict, the conflict must be corrected.
- Governing-document hierarchy: Business Plan, Operating Model, Brand Kit.
- The research dump discussed during discovery is non-binding. It may inform future decisions but does not override governing documents or confirmed decisions.
