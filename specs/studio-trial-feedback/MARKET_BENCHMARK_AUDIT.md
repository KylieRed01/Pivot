# Pivot Design Studio market benchmark audit

**Status:** Recovered historical audit; use `AUDIT_STATUS.md` for current finding status  
**Original audit date:** 6 August 2026  
**Recovered:** 7 August 2026 from the original Pi session transcript  
**Preservation note:** The audit below is preserved as written. Historical provider references do not represent current approval or authority.

## Outcome: **Changes required before tester release**

Pivot has a credible, unusually transparent trial editor. Its core editing capability compares reasonably well with established configurators. The main gaps are not missing design features—they are release isolation, destructive-action protection, feedback discoverability, privacy disclosure, and mobile validation.

This was a desk benchmark using current public product material and Pivot’s implementation. Dynamic competitor editors still need a consistent hands-on task comparison for quantitative results.

## Market benchmark

| Area | Pivot | Market-leading pattern | Assessment |
|---|---:|---|---|
| Core editing | 4/5 | Direct manipulation, text, images, colours, layers, undo | Competitive for a trial |
| Teamwear context | 4/5 | Front/back, numbers, product constraints, design review | Strong foundation |
| Getting started | 3/5 | Guided starting points and obvious first action | Needs validation |
| Recovery and status | 4/5 | Undo, draft recovery, visible save state | Strong trial treatment |
| Error prevention | 2/5 | Confirmation or recovery for destructive changes | Material gap |
| Review output | 3/5 | Save, share, team voting, proofs | Appropriate trial print, but limited |
| Feedback journey | 3/5 | Persistent in-service feedback entry | Good form, poor discovery |
| Mobile usability | 2/5 | Purpose-designed compact editor | Not demonstrated yet |
| Accessibility | 3/5 | WCAG-aligned controls and keyboard paths | Promising but incomplete |
| Release privacy | 1/5 | Gated testing environment with minimal exposed surface | Blocking gap |
| Governance transparency | 4/5 | Clear product, approval and production boundaries | Better than many competitors |

## What the market leaders demonstrate

### Custom Ink

Strong self-service conventions:

- Obvious **Save** and **Next** progression
- Low-friction editing language
- Design assistance alongside self-service
- Clear transition from design to the next commercial step

Pivot should adopt the clarity and progression, but not imply ordering or permanent saving in the public trial.

### owayo

The strongest direct teamwear comparison:

- Product and options separated from visual design
- Dedicated colour, text and logo workflows
- Draft saving and design sharing
- Team names and player numbers handled distinctly
- Pricing and delivery estimates
- Explicit specialist review before production
- Upload conversion and low-resolution assistance

Pivot already follows the most important governing pattern: the visual design is not itself a production release.

### spized

Demonstrates mature club collaboration:

- Drafts
- Team lists
- Team voting
- Team shops
- Quote and sample workflows
- A faster template-led starting path

These are relevant future authenticated-club features, not requirements for the public trial.

### Kit Builder

Demonstrates the longer-term production benchmark:

- Real-time 3D visualisation
- Brand-controlled templates
- Production outputs
- Reduced manual proofing and design revisions
- Integration from configuration to fulfilment

Pivot must not copy production-output functionality until authoritative supplier geometry and manufacturing controls exist.

### Canva

Sets the general editing-usability benchmark:

- Fast drag-and-drop interaction
- Strong templates and examples
- Editing from different devices
- Simple upload handling
- Easy download and sharing
- Mock-up review

Pivot should target Canva’s learnability, but not its unrestricted artwork model.

---

# Priority findings

## 1. Blocker: the tester deployment is not actually isolated

Removing `#workflow-demo` and `#admin` from navigation only hides those routes.

The same server still exposes:

- The full homepage and other static pages
- Fixture administration APIs
- Design workflow APIs
- A hard-coded demonstration identity in browser source

Relevant locations:

- `public/app.js:9`
- `src/server.js:54–57`
- `public/index.html:1`

An invited tester could inspect or call simulation endpoints directly. This conflicts with controlled-pilot discipline and the planned hidden release.

### Required before deployment

Create a genuine tester-release boundary that:

- Requires approved tester access
- Serves the Studio and feedback endpoint only
- Does not expose workflow, administration, fixture design-write, or club-store simulation APIs
- Does not rely on `noindex` or obscure URLs for privacy

## 2. High: template changes and Reset design destroy work immediately

Both operations clear the current session without confirmation:

- Template switch: `public/app.js:164`
- Reset design: `public/app.js:201`

Market-leading editors protect users from accidental loss through confirmation, version recovery, or undo.

### Recommendation

Require explicit confirmation describing what will be lost, or make the operation undoable. This directly supports Pivot’s customer-first and simple-experience principles.

## 3. High: feedback is too easy to miss

The form itself is a good improvement, but Feedback is the final item in an eight-item tool rail. On mobile, that rail scrolls horizontally, placing Feedback potentially off-screen.

GOV.UK’s service guidance recommends allowing feedback from any page and at multiple stages. For a usability trial, feedback collection is a primary action rather than another design tool.

### Recommendation

Provide a persistent, clearly labelled **Give feedback** action outside the scrollable tool rail. Keep the form in context and preserve the automatic garment/view information.

## 4. High: feedback data disclosure is incomplete

The form says garment, view and browser details are included. It also transmits the design name:

- `public/app.js:111`
- `public/app.js:163`

There is no concise privacy statement explaining:

- What is sent
- Why it is sent
- Whether an optional email will be used only for a reply
- How feedback will be handled or retained

The Constitution requires data minimisation and appropriate provider assessment.

### Recommendation

Either stop transmitting the design name or disclose it. Add a short, plain-language privacy statement before submission. Confirm Fastmail/Fly handling remains covered by Pivot’s provider assessment.

## 5. Medium: feedback failure is not recoverable enough

Every failure produces:

> We could not send your feedback. Please try again.

This does not distinguish temporary delivery failure, missing deployment configuration, validation, or rate limiting.

### Recommendation

Give a specific recoverable response. If delivery remains unavailable, show the approved email address as a copyable fallback without introducing a `mailto:` workflow.

## 6. Medium: disabled Home controls are confusing

The controls remain visually present but cannot be used. Native disabled buttons generally do not reliably expose their tooltip explanation to keyboard or touch users.

- `public/app.js:107`

### Recommendation

For the isolated release, remove the “Return to home” control rather than presenting a dead destination. Retain the Pivot logo as non-interactive branding.

## 7. Medium: the Club assets control behaves unlike its appearance

It uses a not-allowed cursor but is intentionally clickable to explain the lock. That gives conflicting interaction cues.

### Recommendation

Treat it as an active explanatory control labelled **Club assets — locked**, with a normal pointer. The feature remains unavailable, but its explanation remains accessible.

## 8. Medium: architecture records are now stale

The architecture catalogue does not record:

- `src/studio-feedback.js`
- `src/studio-feedback-delivery.js`
- `/api/studio-feedback`
- The reduced Studio hash set

The current-state map still describes the old routing boundary.

This documentation should be coordinated with the architecture-document owner rather than changed over concurrent work.

---

# Governing-document alignment

## Passes

- Uses approved Pivot name, assets, colours and typography.
- Public trial saving is not represented as durable Pivot saving.
- Club assets and permanent saving remain authenticated-club capabilities.
- Trial output is clearly not an order or production-ready design.
- Pivot and club approval authority are not simulated for testers.
- Design checks preserve human review and production control.
- Feedback uses a same-origin form, bounded server validation, anti-spam protection and safe logging.
- No SMTP credentials or sensitive feedback content are logged.
- Browser-session recovery reduces unnecessary tester administration.
- The tone is predominantly clear, practical and professional.

## Partial alignment

- **Customer first/simple:** undermined by immediate destructive actions and hidden feedback.
- **Controlled pilot:** deployment isolation is not yet sufficient.
- **Continuous improvement:** feedback capability exists but needs better visibility.
- **Data protection:** collection disclosure and retention treatment need clarification.
- **Consistent documentation:** architecture records need coordinated updating.
- **Accessibility:** implementation is promising, but manual keyboard, touch, zoom and responsive checks remain outstanding.

## No conflict found

Pivot does **not** need to add public permanent saving, ordering, pricing, unrestricted sharing, AI artwork, production files, or team voting to make this tester release best practice. Those would exceed the approved public-trial boundary.

# Recommended release gate

Resolve these before inviting testers:

1. True tester access and runtime isolation.
2. Confirmation or recovery for template changes and Reset design.
3. Persistent, non-scrolling feedback entry.
4. Complete feedback privacy disclosure.
5. Recoverable feedback-delivery errors.
6. Manual mobile, keyboard, zoom and print verification.
7. Live feedback delivery test on the deployed environment.

# Quantitative comparative test

For a defensible market benchmark, run the same tasks in Pivot, owayo, Custom Ink and one general editor:

1. Start a basketball design.
2. Change the main and trim colours.
3. Apply and adjust a pattern.
4. Edit team text and player number.
5. Upload and position a logo.
6. Change front/back and colourway.
7. Recover from a mistake.
8. Produce a review copy and find feedback/help.

Measure:

- Unassisted task completion
- Time to first meaningful change
- Errors and backtracking
- Help required
- First-click accuracy
- Single Ease Question after each task
- Overall System Usability Scale
- Desktop and mobile completion

Suggested Pivot tester targets:

- At least **80% unassisted core-task completion**
- No unrecoverable accidental data loss
- First meaningful design change within **60 seconds**
- Feedback discovered by at least **80%** of testers
- Median task-ease score of at least **5.5/7**
- No critical keyboard, touch or zoom blocker

**Overall conclusion:** Pivot’s design model is directionally strong and well aligned with its governing documents. It should not chase competitor feature breadth. The best-practice opportunity is to make the trial safer, easier to understand, easier to comment on, and genuinely isolated.
