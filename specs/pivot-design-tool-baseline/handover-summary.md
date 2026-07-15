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

## Current verification

- JavaScript syntax check passed before the latest pattern edits.
- Nine Node tests passed.
- Playwright must not be reintroduced.

## Recommended next step

First stabilise the editor before adding more features:

1. Finish the Pivot-branded home page.
2. Correct every pattern category and rendering rule.
3. Implement front/back plus dark/light design state.
4. Add whole-garment and panel-area selection.
5. Make pattern application default to the complete jersey.
6. Separate text, number and uploaded-image workflows.
7. Simplify and visually polish each submenu.
