# Pivot Design Studio font candidate research

**Status:** Research only — no font is approved for production use  
**Date:** 5 August 2026  
**Owner:** Director  
**Related register:** `docs/brand/Font Register.md`

## 1. Decision summary

All five candidates are distributed by their copyright holders and Google Fonts under the **SIL Open Font License, Version 1.1 (OFL-1.1)**. Subject to compliance with that licence, the licence permits Pivot to use the fonts in a browser design application, let customers create designs, embed webfonts, rasterise or outline text, and commercially print the resulting designs on uniforms and merchandise. The licence does not require attribution on a rendered garment.

That legal conclusion does **not** approve any font, version, style, garment treatment or basketball geometry. Binary metadata, rendered output, supplier acceptance and Director approval remain outstanding. No font files were downloaded or added during this research.

Recommended smallest practical general-text set for evaluation:

1. **League Spartan Regular 400, version 2.220** — default names and words; and
2. **League Spartan Bold 700, version 2.220** — stronger short text.

This is one family with two controlled static styles, rather than multiple visually overlapping display families. If all-lowercase fidelity or broader mixed-case testing is important, League Spartan is materially safer than the all-caps Bebas Neue.

Recommended separate basketball numeral candidate for measured evaluation:

- **Anton Regular 400, version 3.116**.

Anton is only a candidate. It must not be described as basketball-, competition- or production-compliant until all digits and `00` are rendered and measured on the selected supplier's approved front and back garment templates.

## 2. Common OFL-1.1 rights and obligations

The following applies to every candidate below because each candidate's retained authoritative licence is OFL-1.1.

| Question | Research conclusion |
|---|---|
| Webfont embedding | Permitted. The OFL expressly permits embedding and bundling. A self-hosted WOFF2 may be used after approval. If Pivot redistributes a font file, the copyright notice and OFL must accompany it in a readily viewable form. |
| Browser design-application use | Permitted. There is no seat, user, domain, page-view or generated-output limit in OFL-1.1. |
| Customer-generated designs | Permitted. Customers may compose text and Pivot may retain/render their designs. The resulting document or artwork is not required to be licensed under the OFL. |
| Commercial uniforms and merchandise | Permitted. The font may be used to produce and sell garments; the font file must not be sold by itself. |
| Rasterisation and vector outlining | Permitted. Rendered raster/vector output is a document/artwork, not redistributed Font Software. Outlining is the preferred manufacturing treatment. |
| Sharing font files with a manufacturer | Legally permitted as redistribution if the exact copyright notice and OFL accompany every copy and the file is not sold by itself. Operationally, do **not** share reusable font files unless the register and manufacturing workflow expressly authorise it; supply outlined or rasterised artwork normally. |
| Attribution/notice on garments | No garment attribution is required. Notices are required when Font Software itself is redistributed or bundled. Retain the copyright and OFL beside repository or manufacturer copies. |
| Modification and conversion | Permitted, including subsetting and format conversion, but modified Font Software must remain entirely under OFL-1.1 and carry the notices. It may not be sold alone. |
| Reserved Font Names | OFL clause 3 applies only to names declared after the copyright statement. The reviewed licence files declare no Reserved Font Name. Recheck the exact acquired package; do not use author/foundry names to endorse a modified version. |
| Withdrawal/expiry | OFL-1.1 is not a subscription and states no expiry. Preserve the exact approved version, source, licence, checksum and outlined production output; do not silently track upstream updates. |
| Disclaimer | OFL fonts are supplied “as is”, without warranty, including non-infringement. Director/legal review may still be appropriate; this report is operational licence research, not legal advice. |

Authoritative licence guidance:

- OFL-1.1 text and FAQ: <https://openfontlicense.org/> and <https://openfontlicense.org/ofl-faq/>
- Google Fonts licensing explanation: <https://fonts.google.com/knowledge/glossary/licensing>

## 3. Candidate comparison

“Version evidence” distinguishes a named upstream release from a moving family page. The exact acquired binary must still be checked with font metadata tools before approval.

| Candidate artifact | Author/foundry | Exact source and licence evidence | Styles, axes and coverage | Names, words and numbers | Garment readability and production risk | Research disposition |
|---|---|---|---|---|---|---|
| **Anton Regular 400, v3.116** (`Anton-Regular`) | Vernon Adams; current copyright: The Anton Project Authors | Upstream snapshot used by Google Fonts: <https://github.com/googlefonts/AntonFont/tree/beb92fcad87808357123bb66881b4032dc96efe7>; version statement: <https://github.com/googlefonts/AntonFont/blob/beb92fcad87808357123bb66881b4032dc96efe7/README.md>; licence: <https://github.com/googlefonts/AntonFont/blob/beb92fcad87808357123bb66881b4032dc96efe7/OFL.txt>; Google metadata: <https://github.com/google/fonts/blob/cee74d7ca45d66d5c1878c828645c862f2788d2d/ofl/anton/METADATA.pb> | One upright 400 style; no variable axis. Google metadata records Latin, Latin Extended and Vietnamese; upstream notes African Latin expansion. | Strong, compact display words and digits; supports mixed case, but visually forceful and less suitable for long text. | Heavy, open-counter display construction is promising at distance. Width and counter closure at small front-number geometry remain unmeasured. | **Shortlist as numeral test candidate**, not approved. Also usable as an optional display face only if a later need justifies a second family. |
| **Bebas Neue Regular 400, v2.000** (`BebasNeue-Regular`) | Ryoichi Tsunekawa / Dharma Type | Upstream snapshot: <https://github.com/dharmatype/Bebas-Neue/tree/686d14af640c17af3691c597778f121d840d9051>; version/FONTLOG: <https://github.com/dharmatype/Bebas-Neue/blob/686d14af640c17af3691c597778f121d840d9051/FONTLOG.txt>; licence: <https://github.com/dharmatype/Bebas-Neue/blob/686d14af640c17af3691c597778f121d840d9051/OFL.txt>; Google metadata: <https://github.com/google/fonts/blob/61f595f96445e9c2316b50d1ba3d79ef91f72b0a/ofl/bebasneue/METADATA.pb> | One upright 400 style in the reviewed open-source family; Latin and Latin Extended. Do not confuse it with the commercial Bebas Neue Pro or older Fontfabric family. | Effective for short uppercase names, words and digits. Version 2.000 is intentionally all-caps; lowercase input does not provide true lowercase forms. | Narrow economical fit, but relatively thin strokes and condensed counters require print-size testing. Poor default for customers expecting case distinction. | **Reserve**, not in smallest default set. Useful only if an explicit all-caps condensed option is needed. |
| **Oswald variable upright, `wght` 200–700** (`Oswald[wght].ttf`) | Vernon Adams, Kalapi Gajjar and Cyreal; The Oswald Project Authors | Upstream snapshot used by Google Fonts: <https://github.com/googlefonts/OswaldFont/tree/89795261ac9eeb9aa8cd99f43982c4e4b0e53261>; licence: <https://github.com/googlefonts/OswaldFont/blob/89795261ac9eeb9aa8cd99f43982c4e4b0e53261/OFL.txt>; Google metadata: <https://github.com/google/fonts/blob/8b0a1d0f5983c89bc2b93f1b5fb55f9e252744b5/ofl/oswald/METADATA.pb> | Upright variable weight 200–700 with named ExtraLight, Light, Regular, Medium, SemiBold and Bold instances; Latin, Latin Extended, Vietnamese, Cyrillic and Cyrillic Extended. | Versatile condensed mixed-case family with useful figures. Better general-purpose range than Anton or Bebas Neue. | Readable and space-efficient, but thin weights are unsuitable for many garment applications. Variable-axis output may differ across browser, canvas, server and manufacturer software. | **Reserve pending exact version evidence.** Official text evidence reviewed here does not establish the current binary's internal version, so it does not yet satisfy the register. If selected later, freeze static 400/600 instances rather than exposing a continuous axis. |
| **League Spartan Regular 400 and Bold 700, v2.220** | Matt Bailey and Tyler Finck / The League of Moveable Type; The League Spartan Project Authors | Exact release: <https://github.com/theleagueof/league-spartan/releases/tag/2.220>; licence at release tag: <https://github.com/theleagueof/league-spartan/blob/2.220/OFL.txt>; Google metadata/current source relationship: <https://github.com/google/fonts/blob/e2332cf862ac3145c0ee5f24f04f4c1819b2410b/ofl/leaguespartan/METADATA.pb> | Release 2.220 provides static styles and a variable family. Upstream records eight styles from ExtraLight 200 to Black 900; Google’s later variable artifact records 100–900. Use only the exact release's static 400 and 700. Broad Latin/Latin Extended and Vietnamese support; upstream lists supported European and Latin-script languages. | True mixed case, geometric forms and a useful weight contrast make it the strongest one-family general set. Figures are clear for ordinary garment text, but this does not make it the controlled basketball numeral. | Good short-name and word readability. Bold may close counters at small print sizes; Regular may need a minimum physical size. Both require supplier sample testing. | **Preferred general-text evaluation set**, pending binary metadata, glyph, browser/canvas, sample-print and Director checks. |
| **Barlow Condensed Regular 400, SemiBold 600 and Bold 700, upstream v1.422** | Jeremy Tribby / The Barlow Project Authors | Exact upstream release: <https://github.com/jpt/barlow/releases/tag/1.422>; licence in the project: <https://github.com/jpt/barlow/blob/master/OFL.txt>; Google Fonts' reviewed static snapshot is sourced from older commit `b4726d…` (tag `v1.408`): <https://github.com/google/fonts/blob/60824dce48f7dd28fe7d65559f2da1f6e04e585b/ofl/barlowcondensed/METADATA.pb> | Condensed family has nine upright and nine italic static styles, weights 100–900; upstream also provides variable fonts. Google metadata records Latin, Latin Extended and Vietnamese. | Friendly, readable mixed case and figures; broad choice creates more control and QA burden than Pivot presently needs. | Less severe than the display faces and useful for longer names, but low-contrast/light styles should be excluded. There is a source-version mismatch between the latest upstream release and Google's recorded snapshot. | **Do not shortlist now.** Reconsider only if user testing shows League Spartan is too geometric; then choose one exact source/version and no more than two upright weights. |

## 4. Smallest practical general-text set

### Proposed pending set

| Role | Exact candidate | Studio control |
|---|---|---|
| General names and words | League Spartan Regular 400, v2.220 | Static style only; no variable-axis control; establish minimum physical print size after supplier testing. |
| Emphasised short names and words | League Spartan Bold 700, v2.220 | Static style only; inspect counters and joins at minimum size. |

Reasons:

- one family minimises licence records, files, rendering tests and manufacturer QA;
- true mixed case handles names more predictably than Bebas Neue;
- two weights provide useful choice without exposing a large family;
- static instances avoid variable-font axis drift in previews and production; and
- the choice remains visually separate from Mokoto and Gruppo, which stay restricted to exact approved Pivot artwork.

Before approval, test representative content including `PHOENIX`, `Phoenix`, `O'NEILL`, `McDONALD`, hyphens, spaces, accented names, `0/O`, `1/I`, `5/S`, and all digits. Define accepted characters and fallback/rejection behaviour; do not silently substitute another font for an unsupported glyph.

## 5. Separate basketball numeral recommendation

### Candidate

**Anton Regular 400, v3.116** should be the first numeral candidate rendered for supplier-template measurement.

Why it is the first test candidate:

- single static style and exact upstream version statement;
- bold condensed construction suitable for large display use;
- open counters compared with many heavy condensed faces; and
- separate control from the general text family reduces accidental production changes.

### Applicable rule baseline

The repository's 10/20/2/5 baseline is traceable to the publicly available **Bendigo Basketball Association General By-Laws, September 2021**, section 20(f)–(l): plain solid contrasting front/back numbers; back at least 20 cm; front at least 10 cm; numbers at least 2 cm wide; values 0, 00 and 1–99; unique within a team; advertising/logo at least 5 cm away.

Authoritative/local source: <https://bendigobasketball.com.au/wp-content/uploads/2021/09/BBA_By-Laws-2021-September.pdf>

The currently applicable **FIBA Official Basketball Rules 2024**, article 4.3.2, use lower minimums: 16 cm back, 8 cm front, 2 cm number width and 4 cm logo/advertising clearance, with plain contrasting numbers and values 0, 00 and 1–99. The stricter recorded BBA dimensions should therefore remain Pivot's working baseline unless BBA supplies a newer controlling rule.

FIBA 2024 source: <https://assets.fiba.basketball/image/upload/documents-corporate-fiba-official-rules-2024-v10a.pdf>

FIBA has also published 2026 rules, version 1.1, **valid from 1 October 2026**. Article 4.3.2 retains 16/8/2/4 cm. They are not yet applicable to the Phoenix target season start on 28 September 2026, but become a review trigger on 1 October.

FIBA 2026 source: <https://assets.fiba.basketball/image/upload/documents-corporate-fiba-official-rules-2026-v1-1.pdf>

### Mandatory measurement gate

Anton must remain Pending until Pivot and the selected supplier record:

1. binary metadata and checksum for Anton Regular v3.116;
2. glyph renders for `0 1 2 3 4 5 6 7 8 9` and the composed value `00`;
3. actual visible glyph height—not CSS box or nominal font size—of at least 10 cm front and 20 cm back;
4. minimum numeral stroke/element width of at least 2 cm at both placements, clarifying the by-law's “numbers ... at least 2 cm wide” measurement with BBA if necessary;
5. at least 5 cm clearance from every logo and advertisement, measured on the curved/seamed supplier template;
6. plain, solid number colour with documented contrast on every underlying garment panel; “looks contrasting” is not enough;
7. no clipping, seam collision, panel distortion, illegible counter or ambiguous digit in sizes used by the U10 cohort;
8. supplier acceptance of the exact outlined geometry and colour treatment;
9. current written confirmation from Bendigo Basketball Association and, where applicable, Basketball Victoria/Basketball Australia or the actual competition organiser; and
10. separate club and Pivot/Director approvals of the rendered production version.

There is currently **no selected supplier or supplier-approved production template** in the PRD. Production compliance therefore cannot yet be established.

## 6. Evidence and unresolved risks

### Evidence retained by URL

No font packages or binaries were retained. The pinned repository/release URLs above preserve the reviewed source, version statements, copyright notices and licence text. On authorised acquisition, Pivot should retain locally:

- the unmodified source package or exact approved files;
- copyright notice and `OFL.txt` from the same package;
- source URL, acquisition date, upstream release/tag and commit;
- SHA-256 for each TTF/OTF/WOFF2;
- extracted family, subfamily, PostScript name and internal version;
- character-map report and rendered specimen;
- static/variable status and all axes; and
- supplier-template measurements and approved outlined output.

### Open risks

- None of the binaries was acquired, so internal metadata and checksums remain unverified.
- Google Fonts can update a family without changing its public specimen URL; use pinned artifacts, not a moving CSS endpoint, for production.
- League Spartan's tagged 2.220 range and Google's later 100–900 variable artifact are not identical records. The proposal intentionally selects static 400/700 files from tagged release 2.220.
- Barlow's latest upstream release and Google's recorded source snapshot differ; do not mix them.
- Bebas Neue has similarly named open and commercial relatives. Only the exact v2.000 open-source Regular artifact is covered by this entry.
- OFL permission does not establish rights in customer-entered words, club marks or sponsor assets.
- OFL permission does not establish legibility, colour, competition, supplier or manufacturing compliance.
- The BBA by-laws located are dated September 2021 and are no longer linked from the current Forms & Information page. Obtain current written BBA confirmation before production.
- No separate current uniform specification was located from Basketball Victoria or Basketball Australia that overrides the competition/FIBA geometry. Confirm the exact competition pathway rather than assuming their general endorsement.

## 7. Proposed Font Register updates

Do not apply these as approvals. After review, amend `docs/brand/Font Register.md` as follows:

1. Split PFR-005 into two **Pending** candidate style entries:
   - League Spartan Regular 400, v2.220; and
   - League Spartan Bold 700, v2.220.
2. Replace the unnamed PFR-004 candidate text with **Anton Regular 400, v3.116 — Pending measurement and approval**, while retaining every existing basketball gate.
3. Add a source commit/release, SHA-256 and internal-version field to the approval record.
4. Add an “accepted character set and unsupported-glyph behaviour” field.
5. Add a fixed/static-instance field and prohibit silent variable-axis or upstream version changes.
6. Record the BBA September 2021 by-law as the source of the stricter 10/20/2/5 baseline, flag it for current written confirmation, and note FIBA 2024's 16/8/2/4 baseline.
7. Add FIBA 2026's 1 October 2026 effective date as a mandatory review trigger.
8. Record that manufacturer font-file sharing is licence-permitted only with OFL notices but operationally prohibited unless expressly authorised; outlined immutable artwork remains the default.
9. Keep Anton, League Spartan and every reserve candidate **Pending**. Do not expose them in Studio until the Director changes the exact entries to Approved or Conditional.

## 8. Director approval checklist

- [ ] Confirm one-family/two-style general set is sufficient.
- [ ] Confirm League Spartan Regular 400 and Bold 700, exact v2.220 release, for acquisition and testing.
- [ ] Confirm Anton Regular 400, exact v3.116 snapshot, for numeral testing only.
- [ ] Review the exact package copyright and OFL-1.1 files.
- [ ] Verify binary internal names, versions, glyph maps and SHA-256 values.
- [ ] Approve accepted characters and unsupported-glyph handling.
- [ ] Approve static files only; reject continuous variable controls for initial release.
- [ ] Review browser, canvas/export and server-rendering consistency tests.
- [ ] Review physical sample prints at defined minimum sizes.
- [ ] Obtain current BBA/competition confirmation of uniform requirements.
- [ ] Obtain supplier-approved template and written production geometry.
- [ ] Review all numeral glyphs and `00` at measured front/back sizes, strokes, clearances and colours.
- [ ] Confirm supplier accepts outlined immutable artwork.
- [ ] Decide whether any manufacturer may receive font files; if yes, require minimum access and accompanying copyright/OFL notices.
- [ ] Approve exact register entries, uses, garments, production treatment, review trigger and evidence paths.
- [ ] Only after register approval, authorise repository addition and Studio exposure as separate changes.

## 9. Repository recommendation

**Not yet.** The current register expressly prohibits committing, embedding or self-hosting font files before authorisation, and all candidates remain Pending.

After exact entries are approved, OFL-1.1 permits repository storage and webfont embedding. Prefer this controlled arrangement:

- commit only the approved production webfont/static files, not entire families;
- keep each family/version in a clearly versioned path;
- include the package's unaltered copyright notice and `OFL.txt` beside it;
- record source release/commit and SHA-256 in the Font Register;
- use WOFF2 for Studio delivery and retain the exact approved static source/production file in controlled records if required;
- do not fetch mutable Google Fonts CSS at runtime for production-critical rendering;
- do not expose source/desktop files publicly unless needed; and
- never replace a file in place when upstream changes—create and approve a new versioned entry.
