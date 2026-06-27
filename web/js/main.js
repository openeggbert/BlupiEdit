/* BlupiEdit Docs — shared JS */
'use strict';

/* ── Search index ── */
const SEARCH_INDEX = [
  { title:'Overview', desc:'What is BlupiEdit, how to install and use it', page:'index.html', section:'' },
  { title:'Getting Started', desc:'Open game EXE, load level, save level', page:'index.html#getting-started', section:'index' },
  { title:'Architecture', desc:'Project structure, class diagram, data flow', page:'architecture.html', section:'' },
  { title:'MainForm', desc:'Main window, tile panel, object panel, scrollbars', page:'architecture.html#mainform', section:'architecture' },
  { title:'LevelData', desc:'Level loading, saving, BLP file parsing, static members', page:'architecture.html#leveldata', section:'architecture' },
  { title:'LevelItem', desc:'Game object in a level — item type, movement, art', page:'architecture.html#levelitem', section:'architecture' },
  { title:'LevelViewModel', desc:'Read-only view model for PropertyGrid display', page:'architecture.html#levelviewmodel', section:'architecture' },
  { title:'TileList', desc:'Custom scrollable tile picker user control', page:'architecture.html#tilelist', section:'architecture' },
  { title:'LevelSelectForm', desc:'Level browser dialog with preview', page:'architecture.html#levelselectform', section:'architecture' },
  { title:'BLP File Format', desc:'Binary level file format specification, byte offsets', page:'file-format.html', section:'' },
  { title:'Header Section', desc:'Version, scroll flags, music, background bytes 0x00–0x12', page:'file-format.html#header', section:'format' },
  { title:'Start Positions', desc:'Up to 4 player start X/Y coordinates at offset 0x148', page:'file-format.html#start-positions', section:'format' },
  { title:'Tile Grid', desc:'100×100 tile index array at offset 0x364', page:'file-format.html#tile-grid', section:'format' },
  { title:'Items Array', desc:'Up to 200 level items, each 48 bytes, at offset 0x9FA4', page:'file-format.html#items-array', section:'format' },
  { title:'Item Types', desc:'All 50+ item/enemy/object enum values with IDs', page:'items.html', section:'' },
  { title:'Lift', desc:'Item type 1 — moving platform', page:'items.html#lift', section:'items' },
  { title:'Bomb', desc:'Item type 2 — stationary bomb', page:'items.html#bomb', section:'items' },
  { title:'Goal', desc:'Item type 7 — level exit', page:'items.html#goal', section:'items' },
  { title:'Egg', desc:'Item type 6 — collectible egg', page:'items.html#egg', section:'items' },
  { title:'Helicopter', desc:'Item type 13 — flying enemy/vehicle', page:'items.html#helicopter', section:'items' },
  { title:'Tile Types', desc:'TileTypes enum: Object, Blupi000-003, Element, Explo', page:'tiles.html', section:'' },
  { title:'Sprite Structure', desc:'Sprite struct: Bitmap image + Point offset', page:'tiles.html#sprite', section:'tiles' },
  { title:'TileInfo', desc:'12-byte tile rectangle and draw offset record read from BLUPI.EXE', page:'tiles.html#tileinfo', section:'tiles' },
  { title:'TileInfo Binary Layout', desc:'TileInfo byte layout: X,Y,OffX,OffY,Width,Height — all int16 LE', page:'tiles.html#tileinfo-memory', section:'tiles' },
  { title:'EXE Extraction', desc:'How tile data is extracted from BLUPI.EXE at fixed offsets 0x862F0 0x872B8 0x88768 0x894F8', page:'tiles.html#extraction', section:'tiles' },
  { title:'Chroma-Key Transparency', desc:'Pure blue #0000FF made transparent using Bitmap.MakeTransparent', page:'tiles.html#transparency', section:'tiles' },
  { title:'Tile Grid Rendering', desc:'View-frustum culling, column-major Tiles array, DrawSprite offset math', page:'tiles.html#grid', section:'tiles' },
  { title:'Background Rendering', desc:'Parallax background at half scroll speed, decor reloaded per repaint', page:'tiles.html#background', section:'tiles' },
  { title:'LevelItem Binary Layout', desc:'48-byte LevelItem: Type, ABTime, BATime, AWait, BWait, PointA, PointB, PointC, ArtFile, Tile', page:'items.html#levelitem-struct', section:'items' },
  { title:'Item Movement System', desc:'WaitA→MoveToB→WaitB→MoveToA state machine, ABTime BATime AWait BWait', page:'items.html#item-movement', section:'items' },
  { title:'Missing Item IDs', desc:'Gaps in ItemTypes enum: IDs 18, 22-23, 35-39, 56-95, 97-199 unused', page:'items.html#id-gaps', section:'items' },
  { title:'200-Slot Limit', desc:'BLP file always stores exactly 200 item slots; extras are zero-filled', page:'items.html#slot-limit', section:'items' },
  { title:'Class Reference', desc:'Full API documentation for all public types', page:'classes.html', section:'' },
  { title:'LevelViewModel', desc:'Read-only PropertyGrid adapter with 12 properties across Level/Scroll/Version categories', page:'classes.html#levelviewmodel', section:'classes' },
  { title:'TileList UserControl', desc:'Custom scrollable tile picker: Direction, ImageSize, keyboard nav, drag events', page:'classes.html#tilelist', section:'classes' },
  { title:'Extensions', desc:'Graphics.DrawSprite, Graphics.SetOptions, BinaryReader.ReadString, BinaryWriter.WriteString', page:'classes.html#extensions', section:'classes' },
  { title:'ItemTypes enum', desc:'Full enumeration of all 50+ item IDs (0–203), non-contiguous', page:'classes.html#itemtypes', section:'classes' },
  { title:'TileTypes enum', desc:'Art file identifiers mapped to enum values 0,1,2,9,10,11,12,13', page:'classes.html#tiletypes', section:'classes' },
  { title:'Game Context', desc:'Speedy Blupi II / Eggbert 2 history, world structure, installation layout', page:'game-context.html', section:'' },
  { title:'What is Speedy Blupi II', desc:'2D platformer by Epsitec SA 1997, also known as Eggbert 2', page:'game-context.html#about', section:'context' },
  { title:'Release History', desc:'Timeline from 1997 original release to openeggbert revival', page:'game-context.html#history', section:'context' },
  { title:'World Structure', desc:'World levels, User 1-8 sets, 20 slots each, 100x100 tile grid', page:'game-context.html#world-structure', section:'context' },
  { title:'Installation Directory Layout', desc:'BLUPI.EXE, data/ levels, IMAGE16/ IMAGE08/ sprite sheets', page:'game-context.html#directory-layout', section:'context' },
  { title:'BlupiEdit and the Game', desc:'Which files BlupiEdit reads vs writes — EXE read-only, .blp read-write', page:'game-context.html#blupit-edit-connection', section:'context' },
  { title:'openeggbert Port', desc:'Open-source Eggbert 2 port, format compatible with original .blp files', page:'game-context.html#openeggbert', section:'context' },
  { title:'Contributing', desc:'Build guide, prerequisites, source file map, how to submit a PR', page:'contributing.html', section:'' },
  { title:'Prerequisites', desc:'.NET Framework 4.x, Mono, Visual Studio or Rider, Git, BLUPI.EXE', page:'contributing.html#prerequisites', section:'contributing' },
  { title:'Clone and Build', desc:'git clone, MSBuild on Windows, xbuild/mono on Linux', page:'contributing.html#clone-build', section:'contributing' },
  { title:'Source File Map', desc:'Which .cs file does what: Program, MainForm, LevelData, TileList etc.', page:'contributing.html#source-map', section:'contributing' },
  { title:'Code Style', desc:'PascalCase, Allman braces, no regions, UTF-8 BOM conventions', page:'contributing.html#code-style', section:'contributing' },
  { title:'Submitting a Pull Request', desc:'Fork, branch, commit, push, open PR against master', page:'contributing.html#pull-requests', section:'contributing' },
  { title:'Troubleshooting', desc:'Common problems: missing EXE, greyed menu, black tiles, Mono quirks', page:'troubleshooting.html', section:'' },
  { title:'EXE Not Found', desc:'BLUPI.EXE path wrong or missing — LoadGame fails, Change Level greyed', page:'troubleshooting.html#exe-not-found', section:'troubleshooting' },
  { title:'Change Level Greyed Out', desc:'LoadGame must succeed first; verify File→Open completed without error', page:'troubleshooting.html#change-level-greyed', section:'troubleshooting' },
  { title:'Black or Missing Tiles', desc:'IMAGE16/ or IMAGE08/ directory missing or inaccessible', page:'troubleshooting.html#black-tiles', section:'troubleshooting' },
  { title:'Level Files Not Appearing', desc:'data/ directory missing or empty; case-insensitive path lookup on Linux', page:'troubleshooting.html#levels-not-appearing', section:'troubleshooting' },
  { title:'Linux Mono Rendering Differences', desc:'WinForms on Mono uses GTK; font metrics and control sizing differ', page:'troubleshooting.html#mono-rendering', section:'troubleshooting' },
  { title:'Saving Corrupts Unknown Bytes', desc:'Unknown gap 0x000A-0x0177 is zeroed on save; keep backups', page:'troubleshooting.html#reserved-bytes', section:'troubleshooting' },
  { title:'200-Item Limit Silent Drop', desc:'Items beyond slot 200 are silently dropped on save', page:'troubleshooting.html#item-limit', section:'troubleshooting' },
  { title:'FAQ', desc:'Frequently asked questions about BlupiEdit and Speedy Blupi II', page:'faq.html', section:'' },
  { title:'Custom Levels Playable', desc:'Yes — save to correct User slot; game reads same data/ directory', page:'faq.html#custom-levels-playable', section:'faq' },
  { title:'Backup Game Levels', desc:'Copy data/ folder before editing; xcopy or cp -r', page:'faq.html#backup-levels', section:'faq' },
  { title:'Max Eggs Per Level', desc:'200 item slots total shared across all item types', page:'faq.html#max-eggs', section:'faq' },
  { title:'Tiles2 Secondary Grid', desc:'Unknown purpose — preserved on save but never rendered by BlupiEdit', page:'faq.html#tiles2', section:'faq' },
  { title:'Non-Contiguous Item IDs', desc:'Gaps at 18, 22-23, 35-39 are removed or unused item types', page:'faq.html#non-contiguous-ids', section:'faq' },
  { title:'Changelog', desc:'Version history and commit log for the BlupiEdit revival branch', page:'changelog.html', section:'' },
  { title:'UI Overview', desc:'ASCII mockup of MainForm: MenuStrip, TabControl, TilePanel, TileList, ObjectPanel, PropertyGrid', page:'index.html#ui-overview', section:'index' },
  { title:'Command-Line Usage', desc:'Pass BLUPI.EXE path as argument; Windows and Linux/Mono examples', page:'index.html#cli', section:'index' },
  { title:'License', desc:'BlupiEdit open-source license; BLUPI.EXE attribution; Epsitec SA', page:'index.html#license', section:'index' },
  { title:'About the Game', desc:'Speedy Blupi II / Eggbert 2 context, world structure, openeggbert', page:'index.html#about-game', section:'index' },
  { title:'Keyboard Shortcuts — Main App', desc:'Ctrl+O Open, Ctrl+S Save, Ctrl+Shift+S Save As, Alt+F4 Exit, F4 PropertyGrid', page:'index.html#keyboard-app', section:'index' },

  /* ── tiles.html new sections ── */
  { title:'Sprite Sheet Layout', desc:'Variable-frame sprite sheets, non-uniform grid, BMP to Sprite pipeline diagram', page:'tiles.html#sheet-layout', section:'tiles' },
  { title:'Sprite Pipeline Diagram', desc:'BMP sheet → MakeTransparent → Clone per TileInfo → Sprite array', page:'tiles.html#sheet-pipeline', section:'tiles' },
  { title:'Frame Access at Render Time', desc:'O(1) array lookup: TileImages[ArtFile][Tile] with bounds check', page:'tiles.html#sheet-frame-access', section:'tiles' },
  { title:'Blupi000–003 Shared Metadata', desc:'All four Blupi variants share same BlupiTiles TileInfo array from EXE offset 0x862F0', page:'tiles.html#blupi-variants', section:'tiles' },
  { title:'Chroma-Key Colour Precision', desc:'Exact R=0 G=0 B=255 match only; promoted to 32-bit ARGB; no anti-aliasing', page:'tiles.html#chroma-precision', section:'tiles' },
  { title:'Background Decor Reference', desc:'Decor images vs sprite sheets: no cache, no chroma-key, tiled at 640x480 steps', page:'tiles.html#decor-reference', section:'tiles' },
  { title:'Coordinate System', desc:'World space 6400×6400 px, tile 64px, screenX = worldX − scrollX', page:'tiles.html#coordinate-system', section:'tiles' },
  { title:'Memory Model', desc:'TileImages dictionary holds all sprites for the session; sheet BMPs disposed after loading', page:'tiles.html#memory-model', section:'tiles' },
  { title:'Image Directories', desc:'IMAGE16/ preferred over IMAGE08/ fallback for sprite sheet BMPs', page:'tiles.html#image-dirs', section:'tiles' },
  { title:'Rendering Pipeline', desc:'Paint sequence: SetOptions, decor background, tile grid, Blupi start, items', page:'tiles.html#rendering', section:'tiles' },

  /* ── classes.html new sections ── */
  { title:'LevelData Constructor Details', desc:'Default constructor vs load constructor; DefaultLevel.blp fallback when file missing', page:'classes.html#leveldata-constructors', section:'classes' },
  { title:'LevelData Exception Behaviour', desc:'Which methods throw FileNotFoundException, IOException, or silently fall back', page:'classes.html#leveldata-exceptions', section:'classes' },
  { title:'TileList Horizontal Navigation', desc:'Keyboard nav for Direction.Horizontal: → moves column, ↓ moves one tile', page:'classes.html#tilelist-keynav', section:'classes' },
  { title:'LevelSelectForm Dialog Layout', desc:'ASCII mockup of level browser: tabs, grid, name field, confirm/cancel', page:'classes.html#levelselectform-layout', section:'classes' },
  { title:'LevelSelectForm Usage Pattern', desc:'ShowDialog pattern: only read UserID/LevelNum when DialogResult==OK', page:'classes.html#levelselectform-usage', section:'classes' },

  /* ── file-format.html new sections ── */
  { title:'DefaultLevel.blp Field Values', desc:'Embedded blank level: MajorVersion=2, all tiles -1, StartPositions[0]=(64,64)', page:'file-format.html#defaultlevel-values', section:'format' },
  { title:'Save As Path Collision', desc:'File.Create silently overwrites; world levels at risk; no undo; no backup', page:'file-format.html#path-collision', section:'format' },
  { title:'info*.blp File Structure', desc:'info001–info008: 22 unknown bytes then 40-byte CP1252 collection name at 0x16', page:'file-format.html#info-blp-structure', section:'format' },
  { title:'Little-Endian Encoding Examples', desc:'MajorVersion=2 → 02 00; PointA.X=64 → 40 00 00 00; Tile=-1 → FF FF', page:'file-format.html#endianness', section:'format' },
  { title:'Annotated Hex Dump', desc:'Colour-annotated raw bytes of DefaultLevel.blp header region', page:'file-format.html#hexdump', section:'format' },
  { title:'Version Values in Practice', desc:'All known .blp files have MajorVersion=2 MinorVersion=0', page:'file-format.html#version-values', section:'format' },
  { title:'Save Semantics', desc:'File.Create from scratch; unknown gaps zero-filled; original game data lost on save', page:'file-format.html#save-semantics', section:'format' },
  { title:'Level File Paths', desc:'World: data/world{N:000}.blp; User N: data/u{N:000}-{M:000}.blp', page:'file-format.html#level-paths', section:'format' },

  /* ── items.html new sections ── */
  { title:'PointC Field Per-Type Notes', desc:'PointC hypotheses: unused for stationary items, possible 3rd waypoint for platforms', page:'items.html#pointc-usage', section:'items' },
  { title:'Unknown Field Hypotheses', desc:'field_A field_24 field_26 field_28 field_2E — observed values and reverse-engineering guesses', page:'items.html#unknown-fields', section:'items' },
  { title:'Bulldozer / Jeep Field Usage', desc:'Item types 4 and 19: ground patrol PointA–PointB, ABTime BATime, ArtFile Element', page:'items.html#bulldozer-jeep', section:'items' },
  { title:'HomingBomb Field Usage', desc:'Item type 96: spawns at PointA, tracks Blupi; ABTime may control pursuit speed', page:'items.html#homing-bomb', section:'items' },
  { title:'GlueTank Field Usage', desc:'Item type 28: stationary at PointA; slows Blupi on contact', page:'items.html#glue-tank', section:'items' },
  { title:'Art File Mapping', desc:'ArtFile → TileTypes: Object=1, Element=10, Explo=9, Blupi000–003=2,11,12,13', page:'items.html#art-files', section:'items' },
  { title:'Computed Speed Properties', desc:'ABSpeed = Distance(A,B)/ABTime; BASpeed = Distance(B,A)/BATime; division-by-zero risk', page:'items.html#computed-speed', section:'items' },
];

/* ── Search ── */
function initSearch() {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  let focusedIndex = -1;

  function getItems() { return results.querySelectorAll('.search-result-item[data-href]'); }

  function setFocus(idx) {
    const items = getItems();
    if (!items.length) return;
    focusedIndex = Math.max(-1, Math.min(idx, items.length - 1));
    items.forEach((el, i) => el.classList.toggle('search-focused', i === focusedIndex));
    if (focusedIndex >= 0) items[focusedIndex].scrollIntoView({ block: 'nearest' });
  }

  function closeResults() {
    results.classList.remove('visible');
    focusedIndex = -1;
  }

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    results.innerHTML = '';
    focusedIndex = -1;
    if (q.length < 2) { closeResults(); return; }

    const hits = SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q)
    ).slice(0, 8);

    if (!hits.length) {
      results.innerHTML = '<div class="search-result-item"><div class="result-desc">No results found</div></div>';
    } else {
      hits.forEach(item => {
        const div = document.createElement('div');
        div.className = 'search-result-item';
        div.dataset.href = item.page;
        div.innerHTML = `<div class="result-title">${item.title}</div>
          <div class="result-desc">${item.desc}</div>
          <div class="result-page">${item.page}</div>`;
        div.addEventListener('click', () => { window.location.href = item.page; });
        results.appendChild(div);
      });
    }
    results.classList.add('visible');
  });

  input.addEventListener('keydown', e => {
    if (!results.classList.contains('visible')) return;
    const items = getItems();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocus(focusedIndex < items.length - 1 ? focusedIndex + 1 : 0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocus(focusedIndex > 0 ? focusedIndex - 1 : items.length - 1);
    } else if (e.key === 'Enter' && focusedIndex >= 0 && items[focusedIndex]) {
      e.preventDefault();
      window.location.href = items[focusedIndex].dataset.href;
    } else if (e.key === 'Escape') {
      closeResults();
      input.blur();
    }
  });

  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !results.contains(e.target))
      closeResults();
  });
}

/* ── Tabs ── */
function initTabs() {
  document.querySelectorAll('.tab-bar').forEach(bar => {
    bar.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const panel = btn.dataset.tab;
        bar.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const wrap = bar.closest('.tabs');
        wrap.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        const target = wrap.querySelector(`[data-panel="${panel}"]`);
        if (target) target.classList.add('active');
      });
    });
  });
}

/* ── Copy buttons ── */
function initCopyButtons() {
  document.querySelectorAll('pre').forEach(pre => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.addEventListener('click', () => {
      const code = pre.querySelector('code');
      const source = code || pre;
      const clone = source.cloneNode(true);
      clone.querySelectorAll('.copy-btn').forEach(b => b.remove());
      const text = clone.innerText;
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1800);
      });
    });
    pre.appendChild(btn);
  });
}

/* ── Theme toggle ── */
function initTheme() {
  const stored = localStorage.getItem('blupiEditTheme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored !== null ? stored : (prefersDark ? 'dark' : 'light');
  if (theme === 'light') document.documentElement.classList.add('light-theme');

  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.textContent = theme === 'light' ? '☾' : '☀';

  btn.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle('light-theme');
    localStorage.setItem('blupiEditTheme', isLight ? 'light' : 'dark');
    btn.textContent = isLight ? '☾' : '☀';
  });
}

/* ── Back to top ── */
function initBackTop() {
  const btn = document.getElementById('back-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Active nav link ── */
function initActiveNav() {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a, .sidebar-section a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === current || href.startsWith(current + '#')) {
      a.classList.add('active');
    }
  });
}

/* ── Sidebar scroll highlight ── */
/* Must be called after initAutoTOC() so the TOC links are in the DOM. */
function initSidebarHighlight() {
  const sections = Array.from(document.querySelectorAll('main h2[id], main h3[id]'));
  if (!sections.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        /* Query links dynamically so auto-TOC generated anchors are always found. */
        const links = document.querySelectorAll('.sidebar-section a[href^="#"]');
        links.forEach(l => l.classList.remove('active'));
        const match = document.querySelector(`.sidebar-section a[href="#${entry.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -75% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ── Fade in content ── */
function initFadeIn() {
  document.querySelectorAll('.card, .prop-item, .enum-item').forEach((el, i) => {
    el.style.animationDelay = `${i * 30}ms`;
    el.classList.add('fade-in');
  });
}

/* ── Hamburger / mobile nav ── */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const desktopNav = document.querySelector('header nav');
  if (!hamburger || !desktopNav) return;

  const overlay = document.createElement('div');
  overlay.className = 'mobile-nav-overlay';
  document.body.appendChild(overlay);

  const drawer = document.createElement('div');
  drawer.className = 'mobile-nav';
  drawer.setAttribute('aria-hidden', 'true');

  const mobileNav = document.createElement('nav');
  desktopNav.querySelectorAll('a').forEach(link => {
    const a = link.cloneNode(true);
    mobileNav.appendChild(a);
  });
  drawer.appendChild(mobileNav);
  document.querySelector('header').insertAdjacentElement('afterend', drawer);

  function openMenu() {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeMenu();
  });

  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && drawer.classList.contains('open')) closeMenu();
  });
}

/* ── Auto-generated "On this page" TOC ── */
function initAutoTOC() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  const firstSection = sidebar.querySelector('.sidebar-section');
  if (!firstSection) return;

  const h4 = firstSection.querySelector('h4');
  if (!h4 || h4.textContent.trim().toLowerCase() !== 'on this page') return;

  const headings = Array.from(document.querySelectorAll('main h2[id], main h3[id]'));
  if (!headings.length) return;

  Array.from(firstSection.querySelectorAll('a')).forEach(a => a.remove());

  headings.forEach(heading => {
    const a = document.createElement('a');
    a.href = '#' + heading.id;
    a.textContent = heading.textContent;
    if (heading.tagName === 'H3') a.classList.add('toc-h3');
    firstSection.appendChild(a);
  });
}

/* ── Boot ── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSearch();
  initTabs();
  initCopyButtons();
  initBackTop();
  initActiveNav();
  initHamburger();
  initAutoTOC();
  initSidebarHighlight();
  initFadeIn();
});
