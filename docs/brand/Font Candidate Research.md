# Pivot Design Studio font candidate research

**Status:** Research only — no font is approved for production use  
**Date:** 5 August 2026  
**Owner:** Director  
**Related register:** `docs/brand/Font Register.md`

## 1. Decision summary

All ten candidates now covered by this report are distributed by their copyright holders and Google Fonts under the **SIL Open Font License, Version 1.1 (OFL-1.1)**. Subject to compliance with that licence, the licence permits Pivot to use the fonts in a browser design application, let customers create designs, embed webfonts, rasterise or outline text, and commercially print the resulting designs on uniforms and merchandise. The licence does not require attribution on a rendered garment.

On 5 August 2026, with Director permission, the exact candidate binaries were downloaded temporarily from pinned official sources. Their internal names, versions, weight/variable metadata, ASCII character coverage, digits `0`–`9` and SHA-256 values were inspected. The temporary binaries were then deleted; no font was committed, embedded or exposed in the Studio. Browser/export testing, physical print testing, supplier acceptance and Director approval remain outstanding.

Recommended smallest practical general-text set for evaluation:

1. **League Spartan Regular 400, version 2.220** — default names and words; and
2. **League Spartan Bold 700, version 2.220** — stronger short text.

This is one family with two controlled static styles, rather than multiple visually overlapping display families. If all-lowercase fidelity or broader mixed-case testing is important, League Spartan is materially safer than the all-caps Bebas Neue.

Recommended separate basketball numeral candidate for measured evaluation:

- **Anton Regular 400, Google Fonts binary version 2.116**.

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
| Reserved Font Names | OFL clause 3 applies only to names declared after the copyright statement. The selected League Spartan v2.220 package reserves “League Spartan”, Graduate reserves “Graduate”, and Bitter reserves “Bitter Pro”. This does not restrict unmodified use or garment output, but a modified font must not use the applicable reserved name without permission. Recheck every acquired package and do not use author/foundry names to endorse a modified version. |
| Withdrawal/expiry | OFL-1.1 is not a subscription and states no expiry. Preserve the exact approved version, source, licence, checksum and outlined production output; do not silently track upstream updates. |
| Disclaimer | OFL fonts are supplied “as is”, without warranty, including non-infringement. Director/legal review may still be appropriate; this report is operational licence research, not legal advice. |

Authoritative licence guidance:

- OFL-1.1 text and FAQ: <https://openfontlicense.org/> and <https://openfontlicense.org/ofl-faq/>
- Google Fonts licensing explanation: <https://fonts.google.com/knowledge/glossary/licensing>

## 3. Candidate comparison

“Version evidence” distinguishes a named upstream release from a moving family page. Binary metadata and checksums below were checked from the pinned artifacts, but this remains research rather than approval.

| Candidate artifact | Author/foundry | Exact source and licence evidence | Styles, axes and coverage | Names, words and numbers | Garment readability and production risk | Research disposition |
|---|---|---|---|---|---|---|
| **Anton Regular 400, binary v2.116** (`Anton-Regular`) | Vernon Adams; current copyright: The Anton Project Authors | Pinned Google Fonts artifact and metadata: <https://github.com/google/fonts/tree/cee74d7ca45d66d5c1878c828645c862f2788d2d/ofl/anton>; upstream: <https://github.com/googlefonts/AntonFont/tree/beb92fcad87808357123bb66881b4032dc96efe7>; licence: <https://github.com/googlefonts/AntonFont/blob/beb92fcad87808357123bb66881b4032dc96efe7/OFL.txt> | One upright 400 style; no variable axis. Latin, Latin Extended, Vietnamese and upstream African Latin expansion; required ASCII and digits verified. | Strong, compact display words and digits; supports mixed case, but visually forceful and less suitable for long text. | Heavy, open-counter display construction is promising at distance. Width and counter closure at small front-number geometry remain unmeasured. | **General apparel candidate and numeral test candidate**, not approved. The upstream README says “V3.116” while the distributed binary identifies itself as 2.116; Pivot must identify the artifact by binary version and checksum. |
| **Bebas Neue Regular 400, v2.000** (`BebasNeue-Regular`) | Ryoichi Tsunekawa / Dharma Type | Upstream snapshot: <https://github.com/dharmatype/Bebas-Neue/tree/686d14af640c17af3691c597778f121d840d9051>; version/FONTLOG: <https://github.com/dharmatype/Bebas-Neue/blob/686d14af640c17af3691c597778f121d840d9051/FONTLOG.txt>; licence: <https://github.com/dharmatype/Bebas-Neue/blob/686d14af640c17af3691c597778f121d840d9051/OFL.txt>; Google metadata: <https://github.com/google/fonts/blob/61f595f96445e9c2316b50d1ba3d79ef91f72b0a/ofl/bebasneue/METADATA.pb> | One upright 400 style in the reviewed open-source family; Latin and Latin Extended. Do not confuse it with the commercial Bebas Neue Pro or older Fontfabric family. | Effective for short uppercase names, words and digits. Version 2.000 is intentionally all-caps; lowercase input does not provide true lowercase forms. | Narrow economical fit, but relatively thin strokes and condensed counters require print-size testing. Poor default for customers expecting case distinction. | **Reserve**, not in smallest default set. Useful only if an explicit all-caps condensed option is needed. |
| **Oswald variable upright v4.103, `wght` 200–700** (`Oswald[wght].ttf`) | Vernon Adams, Kalapi Gajjar and Cyreal; The Oswald Project Authors | Pinned Google Fonts artifact and metadata: <https://github.com/google/fonts/tree/8b0a1d0f5983c89bc2b93f1b5fb55f9e252744b5/ofl/oswald>; upstream snapshot: <https://github.com/googlefonts/OswaldFont/tree/89795261ac9eeb9aa8cd99f43982c4e4b0e53261>; licence: <https://github.com/googlefonts/OswaldFont/blob/89795261ac9eeb9aa8cd99f43982c4e4b0e53261/OFL.txt> | Upright variable weight 200–700; Latin, Latin Extended, Vietnamese, Cyrillic and Cyrillic Extended; required ASCII and digits verified. | Versatile condensed mixed-case family with useful figures. Better general-purpose range than Anton or Bebas Neue. | Readable and space-efficient, but thin weights are unsuitable for many garment applications. Variable-axis output may differ across browser, canvas, server and manufacturer software. | **General apparel candidate.** Expose only locked Regular 400 and SemiBold 600 choices initially, not a continuous customer axis. |
| **League Spartan Regular 400 and Bold 700, v2.220** | Matt Bailey and Tyler Finck / The League of Moveable Type; The League Spartan Project Authors | Exact release: <https://github.com/theleagueof/league-spartan/releases/tag/2.220>; licence at release tag: <https://github.com/theleagueof/league-spartan/blob/2.220/OFL.md>; Google metadata/current source relationship: <https://github.com/google/fonts/blob/e2332cf862ac3145c0ee5f24f04f4c1819b2410b/ofl/leaguespartan/METADATA.pb> | Release 2.220 provides static styles and a variable family. Use the exact static 400 and 700 files. Broad Latin/Latin Extended and Vietnamese support; required ASCII and digits verified. | True mixed case, geometric forms and a useful weight contrast make it a strong general family. Figures are clear for ordinary garment text, but this does not make it the controlled basketball numeral. | Good short-name and word readability. Bold may close counters at small print sizes; Regular may need a minimum physical size. Both require sample testing. | **General apparel candidate.** Exact TTF and WOFF2 release files, internal versions and checksums were verified. |
| **Barlow Condensed Regular 400, SemiBold 600 and Bold 700, Google Fonts binary v1.408** | Jeremy Tribby / The Barlow Project Authors | Pinned Google Fonts artifacts and metadata: <https://github.com/google/fonts/tree/60824dce48f7dd28fe7d65559f2da1f6e04e585b/ofl/barlowcondensed>; upstream project/licence: <https://github.com/jpt/barlow> | Condensed family has nine upright and nine italic static styles, weights 100–900. The three selected upright binaries identify as v1.408; Latin, Latin Extended, Vietnamese, required ASCII and digits verified. | Friendly, readable mixed case and figures. | Useful for longer names, but low-contrast/light styles should be excluded. Do not mix these Google v1.408 binaries with upstream release v1.422. | **General apparel candidate.** Keep the initial choices to Regular, SemiBold and Bold. |

## 4. Expanded tee and hoodie font library

The following is the proposed **Pending** general-apparel library. All ten families may be shown on tee, hoodie, polo and ordinary uniform text layers after approval. Basketball numeral eligibility is a separate flag; none is currently enabled for a basketball number layer.

| Category | Exact family/styles proposed | Author/foundry | Binary and OFL-1.1 evidence | General-apparel notes |
|---|---|---|---|---|
| Condensed display | Anton Regular 400, binary v2.116 | Vernon Adams / The Anton Project Authors | SHA-256 `a4ba3a92350ebb031da0cb47630ac49eb265082ca1bc0450442f4a83ab947cab`; 978 mapped characters; pinned source/licence in section 3 | Short bold statements; also the first separately controlled numeral test candidate. |
| Condensed all-caps | Bebas Neue Regular 400, v2.000 | Ryoichi Tsunekawa / Dharma Type | SHA-256 `08e4623805102d819f58601e46e345648846075e363b2ceb23313c2d1c83ec73`; 461 mapped characters; pinned source/licence in section 3 | Clearly label as all-caps; do not confuse with commercial Bebas Neue Pro. |
| Condensed sans | Oswald Regular 400 and SemiBold 600 from variable v4.103 | Vernon Adams, Kalapi Gajjar and Cyreal / The Oswald Project Authors | SHA-256 `5b38c246e255a12f5712d640d56bcced0472466fc68983d2d0410ec0457c2817`; `wght` 200–700; 850 mapped code points; pinned source/licence in section 3 | Lock the two weights in Studio; no continuous axis initially. |
| Geometric sans | League Spartan Regular 400 and Bold 700, release v2.220 | Matt Bailey and Tyler Finck / The League of Moveable Type | TTF SHA-256 Regular `126a3986553c3868a0caf7ac0c9449739ec20be2586c6457fcffc26361054a49`, Bold `6addf9b681be124851edcbf800c2a440900ad275523f0e755fffd3519f72ab00`; release includes WOFF2; pinned source/licence in section 3 | Strong general names and words. |
| Friendly condensed sans | Barlow Condensed Regular 400, SemiBold 600 and Bold 700, binary v1.408 | Jeremy Tribby / The Barlow Project Authors | SHA-256 Regular `583cec5da3b84bc4dc7c9c72e2a565c94d34e431518b19d7e250b7830ad5f996`, SemiBold `7b619d14bc2327509a9ef32b0890f709626f7ecc9ff61191c2a4314c5499d2d9`, Bold `e476562ec9c1e16cf16475895b511f08c804f438cc9a9f80a44ea50a0eeb5b65`; 525 mapped characters each; pinned source/licence in section 3 | Useful for longer wording; exclude thin styles. |
| Broad geometric sans | Montserrat Medium 500 and Bold 700 from variable v9.000 | Julieta Ulanovsky, Sol Matas, Juan Pablo del Peral and Jacques Le Bailly / The Montserrat Project Authors | Pinned source/licence: <https://github.com/google/fonts/tree/8b0a1d0f5983c89bc2b93f1b5fb55f9e252744b5/ofl/montserrat>; SHA-256 `0f7b311b2f3279e4eef9b2f968bcdbab6e28f4daeb1f049f4f278a902bcd82f7`; `wght` 100–900; 1,312 mapped characters | Highly versatile mixed-case option; lock two weights. |
| Heavy display sans | Archivo Black Regular 400, v1.006 | Omnibus-Type / The Archivo Black Project Authors | Pinned source/licence: <https://github.com/google/fonts/tree/94a7d81318e438525a5285e07ab72c050fdfeb44/ofl/archivoblack>; SHA-256 `dd9a89a019b4849f66ab75455fe7bdf931311042cbb0f0f97acc061539703180`; 423 mapped characters | Large headlines and short statements; counters need small-size testing. |
| Slab serif | Bitter Regular 400 and Bold 700 from variable v3.021 | Sol Matas / The Bitter Project Authors | Pinned source/licence: <https://github.com/google/fonts/tree/b6380fac8e94cdc92aa045cf44d80a7743dde8d6/ofl/bitter>; SHA-256 `ef2b9a711fb02f1e5823b34da1b7450e0fc76793b7d733a8b41006e24916d4a7`; `wght` 100–900; 977 mapped characters | Robust serif contrast; “Bitter Pro” is a Reserved Font Name for modifications. |
| Collegiate display | Graduate Regular 400, v1.100 | Eduardo Tunni / The Graduate Project Authors | Pinned source/licence: <https://github.com/google/fonts/tree/c1eda9233c33ad7775b27efd794f931095cf6133/ofl/graduate>; SHA-256 `971222b309851d86f2513f89b510dc52d52ef7798b5f43af2c6f58d43df568e5`; 402 mapped characters | Appropriate for large athletic/college-style apparel text; “Graduate” is a Reserved Font Name for modifications. |
| Brush script | Pacifico Regular 400, v3.001 | Vernon Adams, Jacques Le Bailly, Botjo Nikoltchev and Ani Petrova / The Pacifico Project Authors | Pinned source/licence: <https://github.com/google/fonts/tree/8b0a1d0f5983c89bc2b93f1b5fb55f9e252744b5/ofl/pacifico>; SHA-256 `5b6c0d5334a7bf77dea52b975c5a0c408878c0f7115ed5b6fb151f634b7bf701`; 805 mapped characters | Decorative wording only; set a larger minimum size and test joins, counters and descenders. Never a basketball numeral. |

Every inspected binary contains digits `0`–`9`, upper- and lowercase ASCII letters, apostrophe and hyphen. That confirms basic character presence, not visual quality for every name or language. WOFF2 packaging and Studio/browser/export consistency must be checked when the approved files are integrated.

## 5. Smallest practical general-text set

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

## 6. Separate basketball numeral recommendation

### Candidate

**Anton Regular 400, Google Fonts binary v2.116** should be the first numeral candidate rendered for supplier-template measurement.

Why it is the first test candidate:

- single static style with exact pinned binary metadata and SHA-256;
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

Anton must remain Pending until Pivot and the selected supplier complete and record:

1. retain the verified binary metadata and SHA-256 for Anton Regular v2.116 in the controlled record;
2. render the verified glyphs `0 1 2 3 4 5 6 7 8 9` and the composed value `00` at the locked production settings;
3. actual visible glyph height—not CSS box or nominal font size—of at least 10 cm front and 20 cm back;
4. minimum numeral stroke/element width of at least 2 cm at both placements, clarifying the by-law's “numbers ... at least 2 cm wide” measurement with BBA if necessary;
5. at least 5 cm clearance from every logo and advertisement, measured on the curved/seamed supplier template;
6. plain, solid number colour with documented contrast on every underlying garment panel; “looks contrasting” is not enough;
7. no clipping, seam collision, panel distortion, illegible counter or ambiguous digit in sizes used by the U10 cohort;
8. supplier acceptance of the exact outlined geometry and colour treatment;
9. current written confirmation from Bendigo Basketball Association and, where applicable, Basketball Victoria/Basketball Australia or the actual competition organiser; and
10. separate club and Pivot/Director approvals of the rendered production version.

There is currently **no selected supplier or supplier-approved production template** in the PRD. Production compliance therefore cannot yet be established.

## 7. Evidence and unresolved risks

### Evidence retained by URL

No font packages or binaries were retained after temporary inspection. The pinned repository/release URLs and recorded hashes preserve the identity of the reviewed artifacts, version statements, copyright notices and licence text. On approved repository acquisition, Pivot should retain locally:

- the unmodified source package or exact approved files;
- copyright notice and `OFL.txt` from the same package;
- source URL, acquisition date, upstream release/tag and commit;
- SHA-256 for each TTF/OTF/WOFF2;
- extracted family, subfamily, PostScript name and internal version;
- character-map report and rendered specimen;
- static/variable status and all axes; and
- supplier-template measurements and approved outlined output.

### Open risks

- Binary metadata, basic character maps and checksums are verified, but visual glyph specimens, browser/export consistency and physical print behaviour remain unverified.
- Google Fonts can update a family without changing its public specimen URL; use pinned artifacts, not a moving CSS endpoint, for production.
- Anton's upstream README says V3.116 while the pinned distributed binary says v2.116. Use the binary version and SHA-256; do not describe it as v3.116.
- League Spartan's tagged 2.220 static files and Google's later variable artifact are different artifacts. The proposal intentionally selects static 400/700 files from tagged release 2.220.
- Barlow's latest upstream release and Google's v1.408 files differ; do not mix them.
- Bebas Neue has similarly named open and commercial relatives. Only the exact v2.000 open-source Regular artifact is covered by this entry.
- OFL permission does not establish rights in customer-entered words, club marks or sponsor assets.
- OFL permission does not establish legibility, colour, competition, supplier or manufacturing compliance.
- The BBA by-laws located are dated September 2021 and are no longer linked from the current Forms & Information page. Obtain current written BBA confirmation before production.
- No separate current uniform specification was located from Basketball Victoria or Basketball Australia that overrides the competition/FIBA geometry. Confirm the exact competition pathway rather than assuming their general endorsement.

## 8. Proposed Font Register updates

Do not apply these as approvals. After review, amend `docs/brand/Font Register.md` as follows:

1. Replace the unnamed PFR-005 entry with **Pending** general-apparel entries for the exact ten-family/style library in section 4, including each source, internal version, SHA-256, locked weight and any all-caps/minimum-size restriction.
2. Replace the unnamed PFR-004 candidate text with **Anton Regular 400, pinned Google Fonts binary v2.116 — Pending measurement and approval**, while retaining every existing basketball gate.
3. Add a source commit/release, SHA-256 and internal-version field to the approval record.
4. Add an “accepted character set and unsupported-glyph behaviour” field.
5. Add a fixed/static-instance field and prohibit silent variable-axis or upstream version changes.
6. Record the BBA September 2021 by-law as the source of the stricter 10/20/2/5 baseline, flag it for current written confirmation, and note FIBA 2024's 16/8/2/4 baseline.
7. Add FIBA 2026's 1 October 2026 effective date as a mandatory review trigger.
8. Record that manufacturer font-file sharing is licence-permitted only with OFL notices but operationally prohibited unless expressly authorised; outlined immutable artwork remains the default.
9. Keep all ten families **Pending**. Do not expose them in Studio until the Director changes each exact entry to Approved or Conditional.

## 9. Director approval checklist

- [ ] Decide whether to approve the proposed ten-family tee/hoodie library or a smaller subset.
- [ ] Confirm the exact listed styles and locked variable weights.
- [ ] Confirm Anton Regular 400, pinned Google Fonts binary v2.116, for numeral testing only.
- [ ] Review the exact package copyright and OFL-1.1 files.
- [x] Verify candidate binary internal names, versions, basic glyph maps and SHA-256 values; repeat against repository copies before commit.
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

## 10. Repository recommendation

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
