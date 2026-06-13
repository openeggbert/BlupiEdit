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
];

/* ── Search ── */
function initSearch() {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    results.innerHTML = '';
    if (q.length < 2) { results.classList.remove('visible'); return; }

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
        div.innerHTML = `<div class="result-title">${item.title}</div>
          <div class="result-desc">${item.desc}</div>
          <div class="result-page">${item.page}</div>`;
        div.addEventListener('click', () => { window.location.href = item.page; });
        results.appendChild(div);
      });
    }
    results.classList.add('visible');
  });

  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !results.contains(e.target))
      results.classList.remove('visible');
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
      const text = code ? code.innerText : pre.innerText;
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1800);
      });
    });
    pre.appendChild(btn);
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
function initSidebarHighlight() {
  const sections = Array.from(document.querySelectorAll('main h2[id], main h3[id]'));
  if (!sections.length) return;
  const links = document.querySelectorAll('.sidebar-section a[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
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

/* ── Boot ── */
document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initTabs();
  initCopyButtons();
  initBackTop();
  initActiveNav();
  initSidebarHighlight();
  initFadeIn();
});
