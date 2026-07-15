# Pivot Teamwear Design Tool — Handover Summary

## Product direction

Build a generic **Pivot-branded teamwear design tool**, initially validated through the Phoenix pilot.

- The application shell must always use Pivot branding.
- Club branding appears only after a club is attached or its design is opened.
- Generic designs use Pivot colours and artwork.
- Current garment assets are placeholders and must not be described as production-ready.

## Brand requirements

Source files:

- `docs/brand/Brand Kit_V1.00.pdf`
- `docs/brand/Visual Design Guide_V1.00.pdf`
- `docs/brand/Pivot_Icon.svg`
- Other logo variants under `docs/brand/`

Approved colours:

- Midnight Blue: `#092C71`
- Cerulean Blue: `#0096D6`
- Orange: `#F4951D`
- White and black

Typography:

- Century Gothic headings
- Calibri body text
- Logo typefaces only inside official artwork

The previous forest-green styling must be removed throughout.

## UX direction

Use familiar conventions from tools such as Canva rather than creating a new interaction language.

- Persistent vertical menu on the left
- Colours near the top
- Designs/patterns
- Text
- Uploads
- Details/help
- One focused submenu at a time
- Undo and redo at the top-left
- Zoom and preview controls on the right
- Keep the main workspace calm and uncluttered
- No grid background
- Remove duplicated controls

The interface title should be:

> Pivot Teamwear Design Tool

## Colour system

Keep the colour swatch pack along the bottom.

It contains grouped shades:

- Blues
- Reds
- Oranges
- Greens
- Purples
- Neutrals
- Yellows

Users select what they are colouring:

- Jersey base
- Pattern
- Neckline
- Sleeves/side panels
- Selected text or number

The side menu also needs precise HEX editing, while the bottom remains the primary visual colour picker.

## Pattern system

Pattern families should be presented as categories with submenus:

- Gradients
- Stripes
- Diagonals
- Dots
- Geometric
- Plain

Required variations include:

- Two- and three-colour gradients
- Linear, diagonal and radial gradients
- Horizontal and vertical stripes
- Thin, wide and mixed stripe widths
- Sashes and repeating diagonals
- Fine, large, halftone and fading dots
- Panels, chevrons and geometric designs

Known issue: some pattern menu options were added without complete CSS rendering rules. They currently need implementation and verification.

Latest intended behaviour:

- Selecting a pattern applies it to the whole jersey by default.
- It should coordinate dark/light and front/back.
- Users can refine individual sides, views and garment areas afterward.
- The latest code applies the selected pattern to both currently modelled reversible sides, but full independent front/back state is not implemented yet.

## Garment structure

The tool should support:

### Garment side

- Dark
- Light/reverse

### View

- Front
- Back
- Side in 3D preview only

This ultimately creates four editable 2D compositions:

1. Dark front
2. Dark back
3. Light front
4. Light back

The side view is a preview, not another editable surface.

## Selectable garment areas

Planned placeholder areas:

- Whole garment
- Front upper
- Front lower
- Front side panels
- Back upper
- Back lower
- Back side panels
- Neck trim
- Arm trim

Patterns should initially apply to the whole jersey. Users can then override individual areas.

These zones must eventually come from supplier template metadata because sublimation still has restrictions involving:

- Cut-panel geometry
- Seams and bleed
- Cross-seam alignment
- Safe artwork zones
- Separate trim materials
- Stitching distortion
- Minimum printable detail
- Competition number requirements

## Artwork and text

Implemented or partially implemented:

- Multiple artwork layers
- Add, duplicate and delete text
- Edit text
- Resize and rotate layers
- Drag layers around the jersey
- Quick left, centre and right placement
- Independent reversible-side layers
- Pivot logo as default sample artwork
- Default Pivot colours

Still needed:

- Proper uploaded-image layer creation
- Layer ordering controls
- Reliable printable-boundary enforcement
- Separate front/back compositions
- Number-specific controls
- Better panel selection
- Official wordmark placement where appropriate

## Number rules

The repository does not contain authoritative numerical size or placement values.

Existing documentation says:

- Number size and placement must be constrained.
- Numbers need suitable contrast and referee legibility.
- Rules should follow the configured authority hierarchy.
- Supplier-approved garment constraints are required.

Do not invent production values. Exact requirements need verification against:

1. Bendigo Basketball Association
2. Basketball Victoria
3. Basketball Australia
4. FIBA
5. Supplier garment specifications

Current number `24` is illustrative only.

## 3D preview

The current “3D” mode is a CSS perspective visualisation, not a true garment model.

A proper future preview needs:

- Generic placeholder mesh
- Front/reverse texture projection
- Rotation and zoom
- 2D fallback
- Clear “visualisation only” labelling

Production-ready 3D requires supplier geometry and UV mappings.

## Home page

The home page must:

- Be fully Pivot-branded
- Use the official Pivot tagline: **Built for action. Priced to play.**
- Remove remaining Phoenix-first content
- Remove forest green
- Use a larger Pivot penguin icon
- Place the transparent icon directly on Midnight Blue
- Include more energy while remaining clean and professional

The home-page rewrite was started but is not complete.

## Phoenix decision

Recommended model:

- Pivot-branded application shell
- Phoenix used as pilot club content only
- Phoenix branding loaded only when Phoenix is selected/opened
- Generic guest mode uses Pivot sample branding

Full club name:

> Phoenix United Basketball Development Club

Official Phoenix artwork should be uploaded rather than scraped.

## Cloudflare and Playwright

Playwright was fully removed:

- Package uninstalled
- Scripts removed
- Configuration removed
- E2E directory removed
- Generated reports removed
- References removed from README and `.gitignore`

The Cloudflare 520 HTML shown in chat is from the AI/API infrastructure, not the Pivot application. It contains the OpenAI logo and cannot be fixed from this repository.

## Main files changed

- `public/app.js`
- `public/style.css`
- `public/index.html`
- `public/brand/Pivot_Icon.svg`
- `public/brand/Pivot_Wordmark.svg`
- `package.json`
- `package-lock.json`
- `README.md`
- `.gitignore`

## Run locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000/#admin
```

## Latest checkpoint

### Landing page

- Uses the approved transparent Pivot logo artwork.
- Uses the approved headline, subheading and CTA: **Built for action. Priced to play.**, **Quality custom teamwear that helps clubs and players get in the game.**, and **Game On.**
- Phoenix-first landing content was removed.
- Products, FAQs and Contact sections were added as pilot placeholders.
- The CTA is rounded and has no shadow.
- Messaging below the hero still requires a later product/brand decision about pilot, coming-soon and registration language.
- Contact email confirmed as `hello@pivotteamwear.com`; a contact form is preferred over a chatbot for the pilot but is not implemented.

### Design Studio changes

- Left menu now contains Colours, Patterns, Text, Images and Help.
- The colour palette was moved from the bottom dock into the Colours submenu.
- Pivot colours are grouped as Midnight Blue, Cerulean Blue, Orange, White and Black.
- Pattern rendering rules and thumbnails were added for all listed pattern families.
- Pattern colour controls now expose four colour slots; the fourth defaults to white.
- Dark and Light are modelled separately, with Midnight Blue and Cerulean Blue defaults.
- Front and Back compositions are stored separately in local storage.
- Side remains a CSS 3D preview, not an editable composition or real mesh.
- Back numbers are made visually larger as an illustrative default only.
- Direct artwork dragging and corner-handle resizing were added.
- Images has upload, size, crop zoom, crop position, duplicate and delete controls.
- Clicking empty canvas space deselects artwork.
- Design name is editable and stored locally.
- Help now opens an in-tool instruction panel.
- Warning bar uses an orange warning treatment rather than blue.

### Known issues requiring morning verification

Do not assume these interactions are complete until manually checked in the browser:

1. Verify Dark/Light and Front/Back/Side controls and their selected-state styling.
2. Verify independent artwork and patterns persist across all four editable compositions.
3. Verify clicking body, sleeves and neck trim selects the intended colour target.
4. Implement supplier-backed upper/lower/side-panel hit zones; only coarse body, sleeve and neck targeting exists now.
5. Verify pattern application across the whole garment and subsequent sleeve/trim overrides.
6. Verify all four pattern colours affect patterns as expected; some patterns use fewer than four colours.
7. Verify image upload, direct resize, crop zoom and crop positioning, including local-storage limits.
8. Confirm Pivot penguin and PIVOT text remain present on all four default compositions.
9. Remove any remaining visual shadows and standardise practical control corner radii.
10. Reconsider moving design name and view controls into a dedicated right-side panel; this was requested but not implemented.
11. Research current official number and uniform rules from Bendigo Basketball Association, Basketball Victoria, Basketball Australia and FIBA, recording URLs and document versions.
12. Obtain supplier template geometry before claiming production readiness.

### Important implementation limitations

- Design state is currently browser-local and uses `localStorage`; it is not fully persisted by the server.
- Uploaded image data URLs may exceed browser local-storage capacity for larger files.
- Undo, redo and zoom controls remain visual placeholders.
- The 3D preview is CSS perspective only.
- Exact garment panels, seams, print areas and legal number dimensions are not yet authoritative.
- Automated tests cover server/domain behaviour, not browser interactions.

## Current verification

- `node --check public/app.js` passes at this checkpoint.
- All nine Node tests pass.
- `git diff --check` passes apart from harmless LF/CRLF conversion warnings on Windows.
- Playwright must not be reintroduced.

## Recommended next step

Stabilise and manually verify the editor before adding more features:

1. Test every control at `http://localhost:3000/#admin` using a hard refresh.
2. Fix runtime and interaction failures one behaviour at a time.
3. Complete garment-area selection and state isolation.
4. Finish the right-side design/view panel decision.
5. Research and document governing uniform rules.
6. Only then continue visual polish and production constraints.
