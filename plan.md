# BlupiEdit – Web Presentation Improvement Plan

All work lives in the `web/` directory. Every task is a precisely scoped
improvement to one section, one page, or one new file. Tasks are grouped by
target file / area so related work stays together.

---

## A. NEW PAGES

### A-01  `web/game-context.html` — Speedy Blupi II / Eggbert 2 Context
**New file.** Add to nav and search index.

A standalone reference page explaining the game that BlupiEdit targets:
- What is **Speedy Blupi II** and its alternative title **Eggbert 2**
- Original 1997 release history; developer / publisher credits
- How the game world is structured: worlds, user level sets, level slots
- Directory layout of a Speedy Blupi II installation (`data/`, `IMAGE16/`, `IMAGE08/`)
- Connection between BlupiEdit and the game: which files it reads vs. which it writes
- Note on the open-source **Eggbert 2** port and format compatibility

---

### A-02  `web/contributing.html` — Build & Contribution Guide
**New file.** Add to nav and search index.

Complete developer on-boarding page:
- Prerequisites: .NET Framework 4.x / Mono, Visual Studio / Rider / MonoDevelop
- Cloning the repository: `git clone` command
- Opening and building `BlupiEdit.sln`
- Running on **Linux with Mono** (`mono BlupiEdit.exe`)
- Obtaining the required `BLUPI.EXE` for testing
- Project source file map (which `.cs` file does what)
- Code style notes (no explicit style guide exists — describe observed conventions)
- How to submit a Pull Request; link to GitHub Issues

---

### A-03  `web/troubleshooting.html` — Troubleshooting Guide
**New file.** Add to nav and search index.

Practical Q&A for common problems:
- **EXE not found / wrong path**: how to locate `BLUPI.EXE` and pass it correctly
- **"Change Level" stays greyed out**: why (LoadGame must succeed first) and how to fix
- **Black / missing tiles**: IMAGE16 or IMAGE08 directory missing; case-sensitivity on Linux
- **Level files not appearing in browser**: `data/` directory absent; case-insensitive resolution
- **Linux/Mono WinForms rendering differences**: known visual quirks; workarounds
- **Save destroys game data in reserved bytes**: explanation with link to BLP Format unknown gaps
- **Background image stuttering / slow scroll**: background not cached, disk I/O on every repaint
- **Division by zero in ABSpeed/BASpeed**: items with ABTime == 0 or coincident A/B points
- **200-item limit reached silently**: items beyond slot 200 are dropped on save; how to detect
- **Saving a User level to a World slot (or vice versa)**: Save As path collision risk

---

### A-04  `web/faq.html` — Frequently Asked Questions
**New file.** Add to nav and search index.

Structured FAQ (question → answer) covering:
- Can custom levels be played in the original game? *(yes, if saved to the correct slot)*
- How do I back up the original game levels before editing? *(copy the `data/` folder)*
- Can BlupiEdit add new item types beyond the 41 defined ones? *(not currently — read-only enum)*
- Why does saving overwrite unknown bytes with zeros? *(file is re-created from scratch)*
- Does BlupiEdit work on macOS? *(not tested; Mono + WinForms theoretically possible)*
- What is the maximum number of eggs in a level? *(200 item slots total, shared with all items)*
- Can I have more than 8 user level collections? *(no — fixed by file format and game engine)*
- What does the secondary tile grid (Tiles2) do? *(unknown; preserved but not rendered)*
- Why does the Properties tab exist but contain nothing? *(placeholder for future feature)*
- Why are item IDs non-contiguous (gaps at 18, 22–23, 35–39, etc.)? *(removed/unused types)*

---

### A-05  `web/changelog.html` — Version History & Changelog
**New file.** Add to nav and search index.

Chronological record of what changed between versions:
- One entry per tagged commit / release
- Each entry: version number, date, list of changes (new features, fixes, doc improvements)
- Source: derive from `git log --oneline` on the `revival` branch
- Add a note explaining the original abandoned codebase vs. the revival branch

---

### A-06  `web/404.html` — Not Found Page
**New file.** Not in nav; referenced in GitHub Pages `404.html` convention.

Minimal page using the same header/CSS as the rest of the site:
- "Page Not Found" heading
- Brief message
- Link back to `index.html`
- Link to the GitHub repository

---

---

## B. IMPROVEMENTS TO `index.html`

### B-01  Hero section — GitHub and Download buttons
**File:** `web/index.html`, `web/css/style.css`

Add two action buttons below the badges inside the hero:
- **"View on GitHub"** → `https://github.com/openeggbert/BlupiEdit`
- **"Download"** → GitHub Releases page URL

Style them as filled / outlined button pair visually distinct from the badge pills.

---

### B-02  UI Overview section — ASCII art mockup of the application window
**File:** `web/index.html`

Add a new `<h2 id="ui-overview">UI Overview</h2>` section between "Requirements" and
"File Overview". Include a styled `<pre>` block showing an ASCII art mockup of the
MainForm window: MenuStrip, TabControl with Tiles/Objects/Properties tabs, the
SplitContainer layout, TilePanel + scrollbars on the left, TileList on the right,
and the PropertyGrid on the Objects tab.

---

### B-03  Keyboard shortcuts — add main application shortcuts
**File:** `web/index.html`

The existing keyboard shortcuts table only documents `TileList` keys.
Add a second table above it titled **"Main Application"** covering:
- `Ctrl+O` — File → Open
- `Ctrl+S` — File → Save
- `Ctrl+Shift+S` — File → Save As
- `Alt+F4` — Exit (with unsaved-level prompt)
- Tab switching (keyboard nav through the TabControl)
- `F4` / `Alt+Enter` — standard WinForms PropertyGrid behaviour

---

### B-04  "About the Game" section
**File:** `web/index.html`

Add a `<h2 id="about-game">About the Game</h2>` section below the hero card grid.
Short (3–4 paragraph) description of Speedy Blupi II / Eggbert 2 as context for why
BlupiEdit exists, with a link to the new `game-context.html` page.

---

### B-05  License / attribution section
**File:** `web/index.html`

Add a `<h2 id="license">License</h2>` section at the bottom of the page documenting:
- The open-source license used by BlupiEdit
- Attribution for the original Speedy Blupi II game (Epsitec SA)
- Note that BLUPI.EXE is a third-party binary and is never distributed with BlupiEdit
- Link to the LICENSE file in the repository

---

### B-06  Command-line usage section — more complete examples
**File:** `web/index.html`

The Quick Start tab "Open Game" already mentions the command-line argument but only shows
one example. Add a dedicated `<h2 id="cli">Command-Line Usage</h2>` section listing:
- Basic usage: `BlupiEdit.exe "C:\Games\SpeedyBlupiII\BLUPI.EXE"`
- Combined with a relative path
- Linux with Mono: `mono BlupiEdit.exe /home/user/games/SpeedyBlupiII/BLUPI.EXE`
- What happens if the path is wrong or the file is missing

---

---

## C. IMPROVEMENTS TO `architecture.html`

### C-01  Event handler wiring table
**File:** `web/architecture.html`

Add a `<h2 id="event-wiring">Event Handler Wiring</h2>` section listing every event that
MainForm registers, which control fires it, and which handler method handles it.
Covers: `tilePanel.Paint`, `objectPanel.Paint`, `objectPanel.MouseClick`,
`hScrollBar1.Scroll`, `vScrollBar1.Scroll`, `hScrollBar2.Scroll`, `vScrollBar2.Scroll`,
`tilePanel.Resize`, `Load`, `FormClosing`, menu item Click events.

---

### C-02  Tab 2 "Properties" placeholder explanation
**File:** `web/architecture.html`

The existing text says only "this tab is an empty placeholder". Expand this into a
proper explanation covering:
- What the original intended purpose presumably was (level-wide properties editor)
- Why it was not implemented (PropertyGrid was placed in the Objects tab instead)
- The design tension: PropertyGrid in Objects tab conflates two concerns
- What a future implementation might look like

---

### C-03  Drag-and-drop architecture section
**File:** `web/architecture.html`

Add a `<h2 id="drag-drop">Drag-and-Drop (Unimplemented)</h2>` section explaining:
- `TileList` fires an `ItemDrag` event when the user drags a tile
- The event is not wired to any handler in `MainForm`
- What the intended behaviour would have been: drag from TileList → drop on tilePanel
- The Draw / Select ToolStripButtons that are visible but not yet functional

---

### C-04  GDI+ render quality settings explanation
**File:** `web/architecture.html`

Expand the existing `SetOptions()` mention into a `<h3 id="render-quality">Render Quality
Settings</h3>` subsection under the tilePanel_Paint heading:
- Why `InterpolationMode.NearestNeighbor` is chosen (pixel-art style; no bilinear blur)
- Why `SmoothingMode.None` (vector shapes would be aliased — not applicable here)
- Why `PixelOffsetMode.None` (consistent pixel alignment for retro graphics)
- Performance implication: these settings disable any GPU quality processing

---

### C-05  DefaultLevel.blp embedded resource description
**File:** `web/architecture.html`

Add a `<h2 id="default-level">DefaultLevel.blp — Embedded Resource</h2>` section:
- Where it lives: `BlupiEdit/Resources/DefaultLevel.blp`
- When it is used: `LevelData(string filename)` constructor falls back to it if the file does not exist on disk
- What it contains: a blank 100×100 level with zero items, default version numbers, no name
- How it is loaded: `Assembly.GetExecutingAssembly().GetManifestResourceStream(...)`

---

### C-06  SplitContainer configuration details
**File:** `web/architecture.html`

Add a `<h3 id="splitcontainer">SplitContainer Configuration</h3>` subsection under
each tab's section, documenting:
- `SplitterDistance` value (pixels from left/top)
- Whether the splitter is fixed or user-resizable
- Which panels host which controls
- Panel minimum sizes

---

---

## D. IMPROVEMENTS TO `file-format.html`

### D-01  Annotated hex dump example
**File:** `web/file-format.html`

Add a `<h2 id="hexdump">Annotated Hex Dump</h2>` section showing the first 64 bytes
of a typical `.blp` level file as a formatted hex dump, with colour-coded annotation
overlays pointing to: version bytes, the large unknown gap, scroll flags, music/background
indices. Use a `<pre>` block with `<span>` colour classes.

---

### D-02  DefaultLevel.blp field values
**File:** `web/file-format.html`

Add a `<h2 id="default-level-values">Default Level Field Values</h2>` section listing
the exact field values found in the embedded `DefaultLevel.blp`:
- MajorVersion / MinorVersion
- HorizontalScroll / VerticalScroll
- Music / Background
- StartPositions (all four)
- LevelName (empty string or default)
- Tile grid contents (mostly −1)
- Items array (empty)

---

### D-03  Version numbers observed in practice
**File:** `web/file-format.html`

Add a `<h3 id="version-values">Version Values in Practice</h3>` subsection under the
Header section listing the MajorVersion / MinorVersion values seen in original Speedy
Blupi II world levels, user levels, and the embedded DefaultLevel.blp. Note what BlupiEdit
writes on save vs. what the original game writes.

---

### D-04  info*.blp full structure (best-effort reverse engineering)
**File:** `web/file-format.html`

Expand the existing `info*.blp` section. Currently only offset 0x0016 (the collection
name) is documented. Add a table of all 22 bytes preceding the name that are currently
unknown, noting:
- Total file size of a typical info*.blp
- Observed byte patterns at each offset (from real files if available)
- Hypothesis for what each byte range might represent (level count, version, etc.)

---

### D-05  Endianness visual examples
**File:** `web/file-format.html`

Add a `<h2 id="endianness">Little-Endian Encoding Examples</h2>` section for readers
unfamiliar with binary formats:
- Example: `MajorVersion = 2` stored as bytes `02 00` not `00 02`
- Example: `PointA.X = 1280` stored as `00 05 00 00` (little-endian int32)
- Example: `−1` (empty tile) stored as `FF FF`
- A one-paragraph explanation of why Windows binaries use little-endian

---

### D-06  Level file path collision risks
**File:** `web/file-format.html`

Add a `<h3 id="path-collision">Save As Path Collision</h3>` subsection under "Level File
Paths": what happens if the user saves a User level to a slot where a World level already
exists (or vice versa); the `FindPathCaseInsensitive` behaviour when multiple files match;
and why case-insensitive resolution returns only the first match on Linux.

---

---

## E. IMPROVEMENTS TO `items.html`

### E-01  Per-item field usage tables for all major item types
**File:** `web/items.html`

The Lift (ID 1) already has a detailed field usage table. Add equivalent tables for:
- **Bomb (2)** — which fields are relevant (PointA only; movement fields ignored)
- **Helicopter (13)** — PointA, PointB, movement fields, dual role
- **Egg (6)** — PointA only; collectible mechanic
- **Goal (7)** — PointA; activation condition (all eggs collected)
- **Bulldozer (4)** / **Jeep (19)** — PointA, PointB patrol
- **HomingBomb (96)** — spawn at PointA, tracking behavior
- **GlueTank (28)** — area-of-effect, PointA placement

---

### E-02  PointC reverse-engineering notes per item type
**File:** `web/items.html`

Add a `<h2 id="pointc-notes">PointC Field — Per-Type Notes</h2>` section.
Currently PointC is described as "purpose unclear; possibly a third control point or spawn
origin". Document which item types appear to use it (non-zero values in original levels)
vs. which always have it zero. Include any hypotheses derived from observed values.

---

### E-03  Item interaction with the tile grid
**File:** `web/items.html`

Add a `<h2 id="item-tile-interaction">Item Interaction with the Tile Grid</h2>` section:
- Items are positioned in world pixel coordinates, not tile coordinates
- Collision between items and tiles is handled by the game engine, not BlupiEdit
- Items rendered on the objectPanel share the same world space as the tilePanel
- The editor draws items at `PointA`; the game engine evaluates tile collision at runtime
- Note: BlupiEdit does not validate item positions against the tile grid

---

### E-04  Visual category badge header style
**File:** `web/items.html`, `web/css/style.css`

Each of the 5 category sections (Platforms, Enemies, Collectibles, Hazards, Special)
currently looks identical. Add a left-border coloured callout bar at the top of each
category section — a distinct colour per category — so the reader can instantly tell
which section they are in without reading the heading.

---

### E-05  Unknown field hypothesis table
**File:** `web/items.html`

Add a `<h2 id="unknown-fields">Unknown Field Observations</h2>` section with a table
listing each unknown field (`field_A`, `field_24`, `field_26`, `field_28`, `field_2E`)
and, for each: observed value range across real game levels (if known), the item types
where it is non-zero, and the current best hypothesis for its purpose.

---

---

## F. IMPROVEMENTS TO `tiles.html`

### F-01  ASCII art coordinate system diagram
**File:** `web/tiles.html`

Replace the existing text table in the "Coordinate System" section with a full ASCII
art diagram showing:
- The 6400×6400 world with (0,0) at top-left
- Tile grid lines at 64 px intervals (showing a 4×3 section)
- A sprite with a negative draw offset (extends above the tile boundary)
- The scroll window: a rectangle at (scrollX, scrollY) showing what the panel renders
- World-to-screen coordinate conversion arrow

---

### F-02  Sprite sheet layout concept explanation
**File:** `web/tiles.html`

Add a `<h2 id="sheet-layout">Sprite Sheet Layout</h2>` section explaining:
- What a "sprite sheet" is: one large BMP containing all frames packed side-by-side
- How `TileInfo.Location` (a Rectangle) selects one frame from the sheet
- Why frames are NOT on a uniform grid (variable-size sprites at arbitrary positions)
- The BMP sheet → clone → Sprite pipeline visualised as an ASCII diagram

---

### F-03  Background image (decor) reference
**File:** `web/tiles.html`

Add a `<h2 id="decor-files">Background Decor Images</h2>` section:
- Naming convention: `decor{N:000}.blp` where N is the `Background` field value
- Where they are stored: `IMAGE16/` or `IMAGE08/` (same as sprite sheets)
- Assumed dimensions: 640×480 pixels (hard-coded in the tiling loop)
- Known indices from original game levels (list which index values are used by which world levels, if determinable)
- Behaviour when the file is missing: `LoadImage` throws `FileNotFoundException`

---

### F-04  Blupi000–003 shared metadata detail
**File:** `web/tiles.html`

Add a `<h3 id="blupi-variants">Blupi Character Variants</h3>` subsection under
"TileTypes Enum" explaining:
- All four variants share the same `BlupiTiles` TileInfo array from EXE offset `0x862F0`
- All four sheets therefore have the same frame count and identical frame dimensions
- The distinction between variants is visual only (different art in each BMP)
- Which variant is used where: Blupi000 = start indicator, Blupi001–003 = items in levels

---

### F-05  Chroma-key colour precision explanation
**File:** `web/tiles.html`

Expand the transparency section with:
- The exact byte representation of the transparent colour: `R=0x00, G=0x00, B=0xFF`
- Why `Bitmap.MakeTransparent(Color.Blue)` matches this correctly
- The effect of palettised (4-bit or 8-bit) BMPs: palette entry 0 or the "blue" palette
  entry is replaced with transparent
- Anti-aliasing note: original art has no AA fringing, so exact-match is safe
- What would happen with a JPEG re-encode: near-blue pixels ≠ exact blue → visible halo

---

---

## G. IMPROVEMENTS TO `classes.html`

### G-01  Exception documentation for all methods
**File:** `web/classes.html`

For each method that can throw, add a `<p class="throws">Throws:</p>` line listing:
- `LevelData.LoadGame()` → `FileNotFoundException` if EXE not found; `InvalidDataException` if TileInfo count is malformed
- `LevelData.LoadImage()` → `FileNotFoundException` if neither IMAGE16 nor IMAGE08 contain the file
- `LevelData(string filename)` → falls back to DefaultLevel; does not throw
- `LevelItem.ABSpeed` getter → divide-by-zero if `ABTime == 0`
- `LevelData.LoadLevel()` → any IO exception from file access

---

### G-02  LevelSelectForm — full dialog documentation
**File:** `web/classes.html`

The current `LevelSelectForm` entry is very brief. Expand it to include:
- Complete list of controls in the dialog with their roles
- The mode-specific behaviour (Open vs. Save): which button label appears, whether
  `numericUpDown1` is editable for non-existent levels
- The level preview rendering algorithm (512×512 bitmap centred on Player 1 start)
- How `levelSetList` is populated (reading `info*.blp` files)
- How `levelList` is populated (enumerating `data/*.blp` files, reading level names at 0x0178)

---

### G-03  Constructor details for LevelData
**File:** `web/classes.html`

The existing table lists `LevelData()` and `LevelData(string filename)` but gives no
detail on how the constructor works. Add a `<h3>Constructor details</h3>` subsection:
- Default constructor: sets all arrays to empty state; does NOT load any file
- File constructor: parses the .blp; if file not found, loads the embedded DefaultLevel;
  all binary reads use `BinaryReader` at hard-coded offsets (list them)
- Both constructors produce a fully valid `LevelData` instance; no two-phase init

---

### G-04  TileList complete keyboard navigation table
**File:** `web/classes.html`

The existing TileList keyboard table only covers `Direction.Vertical`. Add a second
column (or a second table) for `Direction.Horizontal` navigation semantics (↑/↓ move
within column, ←/→ change column) so both directions are fully documented in one place.

---

### G-05  Method signatures — return types and parameter types visible
**File:** `web/classes.html`, `web/css/style.css`

In the method tables, the "Return" column currently shows bare type names like `void`,
`Bitmap`, `string` in plain text. Add a CSS class `.method-return` that renders them
using the same `.ty` colour (blue) as the rest of the syntax highlighting, and similarly
colour parameter type names in the "Method" column using `.ty` spans. This makes
signatures visually consistent with the code blocks elsewhere.

---

---

## H. UX / INFRASTRUCTURE IMPROVEMENTS

### H-01  Mobile hamburger navigation menu
**Files:** `web/css/style.css`, `web/js/main.js`, all HTML pages (header)

On screens narrower than 900 px the `<nav>` is hidden with `display:none`, making the
site unnavigable on phones. Add:
- A hamburger `<button>` in the header (three horizontal lines icon, pure CSS)
- A full-width overlay drawer that slides in from the top when clicked
- The same nav links in the drawer
- Clicking outside the drawer or pressing Escape closes it
- No JS library — vanilla implementation only

---

### H-02  Auto-generated "On this page" sidebar TOC
**Files:** `web/js/main.js`, all HTML pages

The "On this page" sidebar sections are hand-written HTML in every page. They get out
of sync when headings are added/changed. Replace with a JS function that:
- Runs on `DOMContentLoaded`
- Finds all `h2[id]` and `h3[id]` inside `<main>`
- Generates `<a href="#id">heading text</a>` links
- Replaces the content of `.sidebar-section:first-child` with the generated links
- Preserves the "Other pages" static section below it

---

### H-03  Light / dark theme toggle
**Files:** `web/css/style.css`, `web/js/main.js`, all HTML pages (header)

Currently only the dark theme exists. Add:
- A `☀` / `🌙` toggle button in the header (right side, before search)
- A `.light-theme` CSS class on `<html>` that overrides all CSS custom properties with
  light equivalents (white background, dark text, adjusted borders, same accent colours)
- `localStorage` persistence: key `blupiEditTheme`, value `'light'` or `'dark'`
- Auto-detect `prefers-color-scheme` on first visit; store the user's override after that

---

### H-04  Keyboard navigation for search results
**Files:** `web/js/main.js`, `web/css/style.css`

The search dropdown is mouse-only. Add:
- `ArrowDown` / `ArrowUp` while the input is focused: move a `.search-focused` highlight
  through results
- `Enter` on a highlighted result: navigate to that page
- `Escape`: close the dropdown and return focus to the input
- Add a `.search-focused` CSS class that styles the focused result differently from hover

---

### H-05  Print stylesheet
**Files:** `web/css/style.css`

Add a `@media print` block:
- White background, black text throughout
- Hide: `header`, `.sidebar`, `footer`, `#back-top`, `.copy-btn`, `#search-results`
- Un-stick: remove `position: sticky` from header and sidebar
- Show URL after links: `a::after { content: " (" attr(href) ")"; }`
- Expand `<pre>` blocks to full page width
- Avoid page breaks inside `<table>`, `.prop-item`, `.callout`

---

### H-06  `web/404.html` — Not Found Page
*(See also A-06 above — this task is specifically the file + CSS work)*
**New file:** `web/404.html`

Identical header and footer as other pages. Body:
- `<h1>404 — Page Not Found</h1>`
- One sentence description
- Links back to Overview and to GitHub

---

### H-07  Footer — expand to multi-column layout
**Files:** `web/css/style.css`, all HTML pages (footer element)

Current footer is a single text line. Replace with a 3-column footer:
- Column 1: **Navigate** — links to all 6 main pages + new pages (Troubleshooting, FAQ, Contributing, Changelog)
- Column 2: **Project** — GitHub repository, GitHub Issues, License
- Column 3: **About** — short one-liner about BlupiEdit + year

---

### H-08  Enhanced search index — add all new pages
**Files:** `web/js/main.js`

The `SEARCH_INDEX` array must be extended with entries for every new page added in
tasks A-01 through A-06, and for every major new section added to existing pages in
tasks B through G. Each entry needs: `title`, `desc`, `page`, `section`.

---

### H-09  Sidebar active-link scroll highlight — fix cross-page links
**Files:** `web/js/main.js`

`initActiveNav()` correctly marks the current page link as active, but
`initSidebarHighlight()` only watches `IntersectionObserver` for `h2[id]` and `h3[id]`
elements. On pages where the auto-generated TOC (H-02) is active, the observer must be
re-initialised after the TOC is built. Fix the initialisation order so the observer
is always set up on the final DOM state, not the pre-generation state.

---

### H-10  "Copy" button — preserve syntax-highlight spans in copied text
**Files:** `web/js/main.js`

Currently `initCopyButtons()` uses `code.innerText` which strips HTML tags and gives
the raw text. This is correct for copying code. However, the function should also
strip the trailing `\nCopy` text that `innerText` can pick up from the absolutely-
positioned Copy button sitting inside the `<pre>`. Fix by cloning the `<code>` element,
removing the button from the clone, and then reading `innerText` from the clone.

---

---

## RECOMMENDED ORDER

Work in this sequence to avoid re-editing the same file repeatedly:

```
Infrastructure first:
  H-02  (auto TOC)  →  H-01  (hamburger)  →  H-07  (footer)  →  H-03  (theme)

Content — new pages:
  A-01  (game context)  →  A-02  (contributing)  →  A-03  (troubleshooting)
  →  A-04  (faq)  →  A-05  (changelog)  →  A-06  (404)

Content — index.html:
  B-01  (hero buttons)  →  B-04  (about game)  →  B-02  (UI overview)
  →  B-03  (keyboard shortcuts)  →  B-06  (CLI usage)  →  B-05  (license)

Content — architecture.html:
  C-01  (event wiring)  →  C-05  (DefaultLevel)  →  C-04  (render quality)
  →  C-02  (Tab 2 explain)  →  C-03  (drag-drop)  →  C-06  (SplitContainer)

Content — file-format.html:
  D-01  (hex dump)  →  D-02  (default level values)  →  D-03  (version values)
  →  D-05  (endianness)  →  D-04  (info*.blp)  →  D-06  (path collision)

Content — items.html:
  E-01  (per-item field tables)  →  E-04  (category badges)  →  E-02  (PointC)
  →  E-03  (tile interaction)  →  E-05  (unknown fields)

Content — tiles.html:
  F-01  (coord diagram)  →  F-02  (sheet layout)  →  F-04  (blupi variants)
  →  F-05  (chroma precision)  →  F-03  (decor reference)

Content — classes.html:
  G-05  (method signature colours)  →  G-02  (LevelSelectForm)  →  G-03  (constructors)
  →  G-01  (exceptions)  →  G-04  (TileList horizontal table)

Polish:
  H-04  (search keyboard nav)  →  H-05  (print CSS)  →  H-08  (search index update)
  →  H-09  (sidebar fix)  →  H-10  (copy button fix)
```

**Total tasks: 40**
