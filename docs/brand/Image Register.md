# Pivot Image Register

**Version:** 0.01  
**Status:** Draft — not approved for production use  
**Owner:** Director  
**Last updated:** 5 August 2026

## 1. Purpose

This register controls which images Pivot Teamwear may display in the Pivot Design Studio, make available to customers, include in approved garment designs and provide for manufacture.

An image is not approved merely because it is publicly viewable, downloadable, described as free, held by a museum or library, uploaded by a club, or technically available in the Design Studio. Each asset requires an asset-level rights review and recorded Pivot approval for its exact use.

## 2. Governing requirements

Apply requirements in this order:

1. Business Plan
2. Operating Model
3. Brand Kit
4. Applicable legal, cultural, sport and competition requirements
5. Club and sponsor authority
6. Supplier-validated production and manufacturing requirements
7. This register

The Brand Kit controls use of Pivot-owned brand assets. A club retains ownership of its club logo, colours and branding assets. Availability of an asset in the Design Studio does not itself grant production or licensing rights.

## 3. Asset classes

| Class | Description | Public availability |
|---|---|---|
| Pivot-approved open image | An image with verified rights permitting Pivot's recorded commercial uses. | May be available in the public image library after approval. |
| Approved club image | Club logo, branding, sponsor or other asset approved for a specific club. | Never publicly exposed; available only to signed-in, authorised users of that club, its club administrators and authorised Pivot administrators. |
| Pivot brand asset | Approved Pivot logo, penguin, wordmark or other controlled brand artwork. | Only as permitted by the Brand Kit and the asset's approval record. |
| Customer upload | An image supplied by a customer for review. | Browser-local or club-scoped; never automatically approved. |
| Restricted reference | An asset retained only as evidence or for internal review. | Not selectable and not permitted in released artwork. |

## 4. Approval states

| State | Meaning |
|---|---|
| Approved | Rights and suitability evidence has been reviewed. The exact file may be used only for its recorded purposes. |
| Conditional | Use is limited by recorded conditions, such as attribution, club scope or no recolouring. |
| Pending | Evidence or a required decision is incomplete. Do not use in released garment artwork. |
| Prohibited | The asset must not be displayed, selected, printed or supplied for manufacture. |
| Retired | Previously approved but unavailable for new designs. Existing design and approval records must be retained. |

Only exact asset versions marked **Approved** or **Conditional** may appear in the applicable Design Studio library.

## 5. Controlled image register

| Register ID | Asset | Class | Studio availability | Garment printing | Current state | Required evidence or decision |
|---|---|---|---|---|---|---|
| PIR-001 | Current Pivot penguin (`Pivot_Icon.svg`) | Pivot brand asset | Approved for public Design Studio experimentation so customers have an image to explore placement, scaling and layering | Prohibited by default; printing or making a product requires separate recorded Pivot authorisation for the exact asset, design version, placement, size, approved colour treatment, garment, club and sponsorship context | Conditional | Use only the current approved, unmodified Brand Kit asset. Studio availability grants no production, merchandise or licensing rights. |
| PIR-002 | Pivot Logo and Wordmarks | Pivot brand asset | Controlled Pivot artwork only | Requires recorded Pivot authorisation for the exact use | Conditional | Use approved artwork without modification and retain exact-use authorisation. |
| PIR-003 | Public open-image library | Pivot-approved open images | No assets approved yet | Not approved until each asset has its own register entry | Pending | Review and register each exact image separately. |
| PIR-004 | Approved club images | Approved club images | Locked for public visitors; club-scoped authenticated access only | Requires club authority, Pivot approval and any sponsor or third-party permission | Pending | Authentication and club-scoped asset controls are not yet connected. No real club images may be exposed publicly. |
| PIR-005 | Customer-uploaded images | Customer upload | Browser-local trial upload only | Not automatically approved | Conditional | Pivot must review rights, content, technical quality, placement and manufacturing suitability before release. |

Category entries do not approve individual images. Every approved open, club, sponsor or third-party asset requires its own PIR entry.

## 6. Open museum, gallery and library images

Pivot may consider images from museums, galleries, archives and public collections, but must check the rights statement attached to the individual asset. An institution's general open-access programme or the ability to download a file is not sufficient evidence.

### Preferred initial rights categories

For the initial public image library, accept only assets explicitly identified at asset level as:

- **CC0 1.0**; or
- **Public Domain**, supported by a clear source statement.

A **No Known Copyright Restrictions** statement is not equivalent to a guarantee that no rights exist. Such assets require additional review before approval.

### Do not approve without separate review

- in-copyright works;
- non-commercial, educational, personal or editorial-use-only licences;
- licences prohibiting modification or derivative works;
- unclear, missing or conflicting rights statements;
- assets requiring permission that Pivot has not recorded;
- assets where the supplied file is independently protected even if the underlying work is public domain;
- trademarks, crests, insignia or commercial branding;
- recognisable people where publicity, privacy or performer rights may apply;
- culturally sensitive, sacred, secret or restricted material;
- Indigenous Cultural and Intellectual Property where authority or appropriate use is unresolved;
- material that could imply endorsement by an artist, collection, institution or depicted person; or
- material that is unsuitable for community sport or garment production.

Pivot must not imply that a museum, library, artist, creator or collection endorses Pivot or a garment.

## 7. Rights and suitability checklist

Before approving an image, record and review:

### Rights

- exact asset title;
- creator or artist, including life dates where relevant;
- institution, collection and asset identifier;
- authoritative asset-page URL;
- exact rights statement or licence and version;
- whether commercial use is permitted;
- whether modification, cropping, recolouring and derivative works are permitted;
- attribution, notice or link requirements;
- copyright status of both the underlying work and the supplied digital file;
- trademark, publicity, privacy, moral-rights and design-right concerns;
- cultural authority, sensitivity or Indigenous Cultural and Intellectual Property concerns;
- geographic or duration restrictions;
- source access and download date; and
- a retained copy or controlled record of the rights evidence.

### Content and brand

- suitability for community sport and Pivot's clear, professional and approachable brand;
- absence of unlawful, misleading, discriminatory, violent, sexual, hateful or otherwise inappropriate material;
- no unsupported association with a club, sponsor, sport body or institution;
- no alteration of Pivot brand assets outside approved rules; and
- any club, sponsor or Pivot approval required for the exact context.

### Production

- exact approved source file and checksum;
- sufficient resolution or suitable vector quality;
- permitted colour treatment and modifications;
- print method and supplier acceptance;
- placement and size constraints;
- legibility and interaction with numbers, names, logos and advertising;
- final production-artwork treatment;
- whether attribution must appear and whether garment use can satisfy it; and
- confirmation that only the minimum immutable manufacturing package will be supplied after formal Pivot release.

## 8. Individual asset record

Create one record for every exact approved image.

| Field | Required value |
|---|---|
| Register ID | Unique PIR identifier |
| Asset title | Exact title |
| File name | Controlled file name |
| File checksum | SHA-256 or approved equivalent |
| Asset class | Open image, club image, Pivot asset, upload or restricted reference |
| Creator | Name and relevant dates if known |
| Institution or source | Rights holder, collection or authorised provider |
| Asset identifier | Institution or provider identifier |
| Source URL | Authoritative asset page, not only a direct download URL |
| Rights statement | Exact statement and licence version |
| Rights evidence location | Controlled-record path |
| Permitted uses | Studio display, customer design, modification, commercial garment printing and/or marketing |
| Required attribution | Exact wording and placement, or none |
| Modifications | Permitted and prohibited changes |
| Access scope | Public, named club, Pivot administrator or internal only |
| Club/sponsor scope | Exact club, sponsor and context where applicable |
| Production requirements | Resolution, colour, size, placement and supplier conditions |
| Approval state | Approved, Conditional, Pending, Prohibited or Retired |
| Approver | Director or authorised reviewer |
| Approval date | Date |
| Review trigger/date | Date or triggering event |
| Notes | Legal, cultural, club, sponsor, supplier or competition review details |

## 9. Pivot penguin experimentation

The current approved Pivot penguin may be included in the public Design Studio image library as a play and experimentation asset.

- Customers may add, move, resize and layer the penguin within a browser-local trial design.
- The asset must be labelled **Play with the Pivot penguin** and **Studio use only — not approved for printing or products**.
- The approved asset must not be redrawn, recoloured, distorted, separated into components or otherwise modified.
- Availability does not grant copyright, trademark, sponsorship, merchandise, production or licensing rights.
- A trial design containing the penguin must remain blocked from production unless Pivot separately records authorisation for the exact asset, design version, placement, size, approved colour treatment, garment, club and sponsorship context.
- Club approval cannot replace Pivot authorisation.
- Removing or replacing the current penguin in a later Brand Kit version triggers review of this entry and the Studio library asset.

## 10. Approved club-image access

Approved club images must be protected by club-scoped authentication and authorisation.

- Public and unsigned users may see only a locked **Approved club images** section and a link to **Club login**.
- Sign-in alone does not grant access; the account must be an authorised user of the relevant club, a club administrator for that club, or an authorised Pivot administrator.
- A club user or club administrator must not access another club's images.
- Sponsor assets require recorded authority for the exact club and use.
- Locked presentation in the current trial must not claim that authentication is connected when it is not.
- Real club assets must not be included in public HTML, JavaScript, CSS or publicly enumerable asset paths as a substitute for access control.
- Asset access and use must be auditable when production authentication is introduced.

## 11. Customer uploads

Customer uploads remain unapproved until reviewed by Pivot. The uploader must not be treated as proof that the customer owns or may use the image.

Before production release, Pivot must obtain or record an appropriate customer declaration and complete rights, content, club, sponsor, technical and manufacturing review. Rejected or superseded assets must not remain selectable.

## 12. Change control

- Replacing, editing, recolouring or cropping a registered image creates a new controlled version unless the approval expressly covers that transformation.
- A rights-statement, licence, source, club, sponsor, supplier or product change triggers review.
- Approval applies only to the exact file checksum and recorded uses.
- Existing approved designs must retain the exact asset version used for approval.
- Pivot and club approvals remain separate.
- Public-domain or open-licensed files must not be committed to the product library until their entries are approved.
- Removing an asset from new use must not remove historical design, approval or manufacturing records that Pivot is required to retain.

## 13. Approval

This draft becomes controlled only when the Director records approval below. Approval of this document does not automatically approve Pending categories or individual images.

| Role | Name | Decision | Date | Signature or controlled-record reference |
|---|---|---|---|---|
| Director |  |  |  |  |
