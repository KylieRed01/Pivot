# Pivot Font Register

**Version:** 0.02
**Status:** Draft — not approved for production use  
**Owner:** Director  
**Last updated:** 5 August 2026

## 1. Purpose

This register controls which fonts Pivot Teamwear may use in customer-facing interfaces, customer-created garment designs and manufacturing artwork.

A font is not approved merely because it is installed on a computer, named in the Brand Kit, available through a design application or technically capable of being printed. Each use must have recorded licence evidence and, where relevant, product and competition approval.

## 2. Governing requirements

Apply requirements in this order:

1. Business Plan
2. Operating Model
3. Brand Kit
4. Applicable sport and competition requirements
5. Supplier-validated production geometry and manufacturing requirements
6. This register

The Brand Kit specifies Century Gothic for headings and Calibri for body copy. Mokoto and Gruppo are restricted to approved logo and wordmark artwork and must not be recreated or offered as selectable fonts.

## 3. Approval states

| State | Meaning |
|---|---|
| Approved | Evidence has been reviewed and the font may be used only for the recorded uses. |
| Conditional | Use is limited by a recorded condition, such as outlining text before manufacture. |
| Evaluation | The exact files may be used only in the recorded non-production Design Studio trial. They remain blocked from publication and manufacture. |
| Pending | Evidence or a required decision is incomplete. Do not use in released garment artwork. |
| Prohibited | The font must not be used for the recorded purpose. |
| Retired | Previously approved, but unavailable for new designs. Existing records must be retained. |

Only entries marked **Approved** or **Conditional** may appear as selectable garment-design fonts in production. An **Evaluation** entry may appear only in an explicitly labelled non-production trial with a recorded release gate.

## 4. Controlled font register

| Register ID | Font or asset | Intended role | Website/UI use | Customer design use | Commercial garment printing | Production-file treatment | Current state | Evidence or decision required |
|---|---|---|---|---|---|---|---|---|
| PFR-001 | Century Gothic | Brand headings | Local system-font request only; no font files distributed | Not approved | Not approved | Not applicable until licensed | Pending | Confirm web, application/customer-generated-content and commercial merchandise rights. |
| PFR-002 | Calibri | Brand body copy | Local system-font request only; no font files distributed | Not approved | Not approved | Not applicable until licensed | Pending | Confirm web, application/customer-generated-content and commercial merchandise rights. |
| PFR-003 | Mokoto and Gruppo within approved Pivot artwork | Pivot logo and wordmark artwork only | Approved artwork assets only | Not selectable | Exact approved artwork only, subject to recorded Pivot authorisation | Supply only approved outlined/raster artwork; never provide reusable font files | Conditional | Retain the approved asset and authorisation record. Do not recreate the wordmark or expose either font in the Studio. |
| PFR-004 | Anton Regular 400, Google Fonts binary v2.116 | Development basketball-number candidate | Non-production preview only | Number layers in the trial | Prohibited from publication and manufacture until every basketball check is complete | Do not create production artwork | Evaluation | Licence and binary identity verified in `Font Candidate Research.md`; supplier-template geometry, physical rendering, current competition confirmation and Director production approval remain outstanding. |
| PFR-005 | Ten-family development font library recorded in `Font Candidate Research.md` section 4 | Names and customer-created text on tee, hoodie, polo and uniform previews | Non-production preview only | Optional text layers; also visible for basketball-number experimentation | Prohibited from publication and manufacture | Do not create production artwork | Evaluation | Exact binary identity and OFL evidence verified. Browser/export consistency, physical printing, supplier acceptance and Director production approval remain outstanding. |

## 5. Basketball numeral control

Pivot must maintain at least one separately controlled font for basketball player numbers. The selected numeral font is a production control, not merely a visual preference.

The repository adopts the BBA September 2021 baseline recorded in `docs/BBA Basketball Jersey Guidelines.md`:

- front number minimum height: 10 cm;
- back number minimum height: 20 cm;
- minimum number width: 2 cm, retaining the BBA wording without reinterpreting it as stroke width;
- logos and advertising at least 5 cm clear;
- contrasting number colour required;
- front and back numbers required; and
- permitted values: 0, 00 and 1–99.

A typeface name alone cannot establish compliance. Before PFR-004 can be approved, Pivot must record:

1. the exact font family, style, version and source;
2. a copy of the applicable licence and purchase receipt where relevant;
3. permission for web/application use, customer-generated designs and commercial garment printing;
4. permission to rasterise or convert text to outlines for production;
5. rendered samples of every digit from 0 to 9 and the two-digit value 00;
6. measured front and back number height and minimum number width on the supplier-approved production template;
7. required logo and advertising clearance;
8. acceptable colour contrast on each garment surface;
9. review against the adopted BBA baseline and any replacement rules published before production release;
10. manufacturer acceptance of the outlined production artwork; and
11. Director approval of the exact font, style, production size and treatment.

Until those checks are complete, Studio basketball numbers remain indicative and must not be represented as competition- or production-compliant.

## 6. Licence evidence checklist

Each selectable design font must have evidence addressing all applicable uses:

- website or webfont embedding;
- use within a browser-based design application;
- use by customers to create their own text;
- server-side rendering, if introduced;
- commercial merchandise and garment printing;
- rasterisation and conversion to vector outlines;
- storage in browser designs and approved design records;
- whether font files may be provided to a manufacturer;
- restrictions on editable templates, sublicensing or redistribution;
- attribution or notice requirements;
- permitted number of users, domains, page views or generated outputs;
- licence version, source URL, purchase date and renewal requirements; and
- handling of existing designs if the licence expires or is withdrawn.

Pivot should normally provide the manufacturer with outlined or rasterised artwork rather than reusable font files. This does not replace the need for a licence that permits Pivot to create and commercially print the output.

## 7. Approval record required for each font

| Field | Required value |
|---|---|
| Register ID | Unique PFR identifier |
| Family and style | Exact names |
| Font version | Version from the font metadata |
| Foundry or author | Rights holder or authorised distributor |
| Source | Authoritative download or purchase location |
| Licence | Exact licence name and version |
| Evidence location | Repository or controlled-record path |
| Approved uses | Website/UI, Studio design, basketball numbers, general garment text and/or production |
| Restrictions | Embedding, output, manufacturer sharing, attribution, seat/domain or volume limits |
| Production treatment | Live text, embedded subset, outlined vector or rasterised artwork |
| Product scope | Exact garments and competitions, if restricted |
| Approver | Director |
| Approval date | Date |
| Review date | Date or triggering event |
| Notes | Supplier, competition or legal review details |

## 8. Development evaluation authorisation

On 5 August 2026, the Director authorised the exact font artifacts recorded in `docs/brand/Font Candidate Research.md` section 4 to be downloaded, committed, self-hosted and displayed in Pivot's non-production Design Studio trial.

This authorisation is subject to all of the following controls:

- every font and style remains **Evaluation**, not Approved or Conditional;
- the Studio and font picker must state that the fonts are development-preview only and not production validated;
- all evaluation fonts may be selected on basketball number layers while Pivot is not live;
- every basketball number layer using an evaluation font must create a blocking `UNVALIDATED_BASKETBALL_FONT` release check;
- no design using an Evaluation font may be published, represented as compliant or released to manufacture;
- no font file may be sent to a club, customer or manufacturer;
- each repository font file must match the recorded SHA-256 and retain its OFL notice;
- the production launch gate requires exact font/style approval plus browser/export, physical print, supplier and applicable basketball-template validation; and
- before production launch, any font that has not passed its applicable gate must be disabled for the affected layer or removed.

## 9. Change control

- Adding a font, style or variable-font axis requires a new or amended register entry.
- A font update must not silently replace the approved version.
- Licence, supplier, product-template or competition changes trigger review.
- Existing approved designs must retain the exact font version or outlined production artwork used for approval.
- Pivot approval and club approval must be recorded separately where a design proceeds toward manufacture.
- Font files must not be committed, embedded, self-hosted or supplied to a manufacturer until the register expressly authorises that action. Section 8 is a narrow development-only repository and self-hosting authorisation; it does not authorise manufacturer sharing or production use.

## 10. Approval

This draft becomes controlled only when the Director records approval below. Approval of this document does not automatically approve Pending font entries.

| Role | Name | Decision | Date | Signature or controlled-record reference |
|---|---|---|---|---|
| Director |  |  |  |  |
