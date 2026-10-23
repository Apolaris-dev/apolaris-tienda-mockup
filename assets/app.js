/* Mockup de la tienda Apolaris — propuesta de diseño, no oficial. Sin backend: datos de muestra. */

const WA_NUMBER = '573137428004';
const INSTAGRAM = 'https://www.instagram.com/apolaris.24/';

const cop = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
const wa = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

const store = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v === null ? fallback : JSON.parse(v);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* sin almacenamiento: el mockup sigue funcionando */
    }
  },
};

/* ---------- Colores y productos de muestra ---------- */
const COLORS = {
  negro: { hex: '#17181c', name: 'Negro' },
  blanco: { hex: '#f4f3ef', name: 'Blanco hueso' },
  noche: { hex: '#1b2a4a', name: 'Azul noche' },
  arena: { hex: '#d8c7a5', name: 'Arena' },
  vino: { hex: '#6b1f2e', name: 'Vino' },
  gris: { hex: '#8a8f99', name: 'Gris luna' },
  cielo: { hex: '#9fd6e8', name: 'Cielo' },
};

const PRODUCTS = [
  { id: 'polaris', col: 'estrella', name: 'Polaris', desc: 'Camiseta esencial con estrella bordada', price: 89000, colors: ['negro', 'blanco', 'noche'], neck: 'redondo', sleeve: 'corta', print: 'estrella', tag: 'Nuevo' },
  { id: 'constelacion', col: 'estrella', name: 'Constelación', desc: 'Estampado de la Osa Menor', price: 99000, colors: ['noche', 'negro', 'gris'], neck: 'redondo', sleeve: 'corta', print: 'constelacion' },
  { id: 'arquero', col: 'arquero', name: 'Arquero', desc: 'El emblema Apolaris en el pecho', price: 109000, colors: ['blanco', 'arena', 'negro'], neck: 'v', sleeve: 'corta', print: 'arquero', tag: 'Icono' },
  { id: 'orbita', col: 'orbita', name: 'Órbita', desc: 'Polo de punto fino', price: 129000, colors: ['blanco', 'noche', 'vino'], neck: 'polo', sleeve: 'corta', print: 'none' },
  { id: 'nebula', col: 'nebula', name: 'Nébula', desc: 'Sublimación total degradada', price: 119000, colors: ['noche', 'cielo', 'vino'], neck: 'redondo', sleeve: 'corta', print: 'nebula', tag: 'Edición limitada' },
  { id: 'cenit', col: 'estrella', name: 'Cenit', desc: 'Manga larga para noches frías', price: 125000, colors: ['negro', 'gris', 'arena'], neck: 'redondo', sleeve: 'larga', print: 'texto' },
  { id: 'eclipse', col: 'arquero', name: 'Eclipse', desc: 'Cuello V, corte entallado', price: 95000, colors: ['negro', 'vino', 'blanco'], neck: 'v', sleeve: 'corta', print: 'eclipse' },
  { id: 'aurora', col: 'orbita', name: 'Aurora', desc: 'Línea deportiva transpirable', price: 115000, colors: ['cielo', 'blanco', 'noche'], neck: 'v', sleeve: 'larga', print: 'ondas' },
];

/* Cada colección tiene su tipografía y su fondo: en la app real serían datos del admin. */
const COLLECTIONS = [
  { id: 'estrella', name: 'Estrella del Norte', tagline: 'Esenciales que guían, para todos los días', font: "'Cormorant Garamond', serif", style: 'font-style:italic;font-weight:300', bg: 'var(--tile-1)', fg: '#fff', look: ['negro', 'estrella', 'redondo'] },
  { id: 'orbita', name: 'Órbita', tagline: 'Polos y líneas deportivas, movimiento limpio', font: "'Michroma', sans-serif", style: 'text-transform:uppercase;letter-spacing:.18em;font-size:.62em', bg: 'var(--tile-2)', fg: 'var(--ink)', look: ['blanco', 'none', 'polo'] },
  { id: 'arquero', name: 'El Arquero', tagline: 'El emblema Apolaris: actitud sin límites', font: "'Cinzel', serif", style: 'font-weight:600;letter-spacing:.06em', bg: 'var(--tile-3)', fg: '#fff', look: ['blanco', 'arquero', 'v'] },
  { id: 'nebula', name: 'Nébula', tagline: 'Sublimación total: color de borde a borde', font: "'Italiana', serif", style: 'letter-spacing:.04em', bg: 'linear-gradient(135deg,#2b1f3d,#6a3d6e 55%,#c87f7a)', fg: '#fff', look: ['noche', 'nebula', 'redondo'] },
];
const collectionTitle = (c, extra = '') => `<span style="font-family:${c.font};${c.style};${extra}">${c.name}</span>`;

/* ---------- Camiseta en SVG ---------- */
let svgSeq = 0;
function isDark(hex) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.299 * r + 0.587 * g + 0.114 * b < 140;
}
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => Math.max(0, Math.min(255, Math.round(v + amt))));
  return `#${c.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

function printArt(kind, dark) {
  const ink = dark ? '#9fe3f5' : '#1b2a4a';
  const soft = dark ? 'rgba(159,227,245,.45)' : 'rgba(27,42,74,.35)';
  switch (kind) {
    case 'estrella':
      return `<path d="M188 92 l3.2 7 7.6.8-5.7 5.1 1.6 7.5-6.7-3.9-6.7 3.9 1.6-7.5-5.7-5.1 7.6-.8z" fill="${dark ? '#e9c46a' : '#b8892b'}"/>`;
    case 'constelacion': {
      const pts = [[120, 110], [138, 122], [160, 118], [176, 134], [168, 158], [188, 168], [196, 150]];
      const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ') + ' L176,134';
      return `<path d="${line}" stroke="${soft}" stroke-width="1.2" fill="none"/>` +
        pts.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="${i === 0 ? 4 : 2.6}" fill="${ink}"/>`).join('');
    }
    case 'arquero':
      return `<image href="assets/icono-${dark ? 'blanco' : 'negro'}.png" x="112" y="92" width="76" height="76" opacity="${dark ? .85 : .9}"/>`;
    case 'nebula':
      return `<circle cx="150" cy="170" r="95" fill="url(#neb)"/>`;
    case 'texto':
      return `<text x="150" y="140" text-anchor="middle" font-family="Michroma, sans-serif" font-size="13" letter-spacing="5" fill="${ink}">APOLARIS</text>
        <text x="150" y="156" text-anchor="middle" font-family="Inter, sans-serif" font-size="6" letter-spacing="4" fill="${soft}">NORTH · STAR · 24</text>`;
    case 'eclipse':
      return `<circle cx="150" cy="135" r="26" fill="none" stroke="${ink}" stroke-width="1.4"/><circle cx="160" cy="130" r="24" fill="${dark ? shade('#000000', 0) : '#ffffff'}" opacity=".0"/><path d="M150 109 a26 26 0 0 0 0 52 a20 26 0 0 1 0 -52z" fill="${ink}"/>`;
    case 'ondas':
      return [0, 1, 2].map((i) => `<path d="M95 ${200 + i * 12} q27 -14 55 0 t55 0" stroke="${ink}" stroke-width="2" fill="none" opacity="${0.8 - i * 0.2}"/>`).join('');
    default:
      return '';
  }
}

/* `art`: diseño del cliente en unidades del viewBox (centro x/y, ancho w, alto h, rotación r).
   Se recorta con la silueta completa: puede ir en cualquier parte de la camiseta, mangas incluidas. */
function shirtSVG({ color = 'negro', neck = 'redondo', sleeve = 'corta', print = 'none', view = 'front', art = null, guide = false } = {}) {
  const id = `s${++svgSeq}`;
  const hex = COLORS[color]?.hex ?? color;
  const dark = isDark(hex);
  const seam = dark ? 'rgba(255,255,255,.10)' : 'rgba(0,0,0,.12)';
  const inner = shade(hex, dark ? -18 : -38);
  const rib = shade(hex, dark ? 14 : -16);

  const sleeves = sleeve === 'larga'
    ? { left: 'L80,40 L40,78 L16,250 L46,256 L82,128', right: 'L218,128 L254,256 L284,250 L260,78 L220,40' }
    : { left: 'L80,40 L22,94 L46,132 L82,110', right: 'L218,110 L254,132 L278,94 L220,40' };
  const armL = sleeve === 'larga' ? 128 : 110;

  const back = view === 'back';
  let neckPath;
  let neckInner = '';
  let extra = '';
  if (back) {
    neckPath = 'Q150,40 120,28';
    neckInner = '';
  } else if (neck === 'v') {
    neckPath = 'L150,84 L120,28';
    neckInner = `<path d="M120,28 Q150,38 180,28 L150,84 Z" fill="${inner}"/>`;
    extra = `<path d="M120,28 L150,84 L180,28" fill="none" stroke="${rib}" stroke-width="6" stroke-linejoin="round"/>`;
  } else if (neck === 'polo') {
    neckPath = 'L150,62 L120,28';
    neckInner = `<path d="M120,28 Q150,38 180,28 L150,62 Z" fill="${inner}"/>`;
    extra = `<path d="M120,26 L104,52 L146,62 L150,44 Z" fill="${rib}" stroke="${seam}"/><path d="M180,26 L196,52 L154,62 L150,44 Z" fill="${rib}" stroke="${seam}"/>
      <rect x="145" y="58" width="10" height="44" fill="${shade(hex, dark ? 6 : -8)}" stroke="${seam}"/>
      <circle cx="150" cy="70" r="2.2" fill="${inner}"/><circle cx="150" cy="88" r="2.2" fill="${inner}"/>`;
  } else {
    neckPath = 'Q150,66 120,28';
    neckInner = `<path d="M120,28 Q150,40 180,28 Q150,66 120,28 Z" fill="${inner}"/>`;
    extra = `<path d="M120,28 Q150,66 180,28" fill="none" stroke="${rib}" stroke-width="6" stroke-linecap="round"/>`;
  }

  const body = `M120,28 ${sleeves.left} L85,300 Q150,308 215,300 ${sleeves.right} L180,28 ${neckPath} Z`;
  const cuffs = sleeve === 'larga'
    ? `<path d="M19,232 L47,238 M281,232 L253,238" stroke="${seam}" stroke-width="2"/>`
    : `<path d="M30,104 L52,128 M270,104 L248,128" stroke="${seam}" stroke-width="2"/>`;

  return `<svg viewBox="0 0 300 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Camiseta ${COLORS[color]?.name ?? ''}">
    <defs>
      <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity="${dark ? 0.1 : 0.35}"/>
        <stop offset=".5" stop-color="#fff" stop-opacity="0"/>
        <stop offset="1" stop-color="#000" stop-opacity="${dark ? 0.35 : 0.12}"/>
      </linearGradient>
      <radialGradient id="neb"><stop offset="0" stop-color="#e86a92" stop-opacity=".85"/><stop offset=".45" stop-color="#6a5ae0" stop-opacity=".6"/><stop offset="1" stop-color="#6a5ae0" stop-opacity="0"/></radialGradient>
      <clipPath id="${id}c"><path d="${body}"/></clipPath>
    </defs>
    <path d="${body}" fill="${hex}"/>
    <g clip-path="url(#${id}c)">${back ? '' : printArt(print, dark)}${art ? `<image class="user-art" href="${art.src}" x="${art.x - art.w / 2}" y="${art.y - art.h / 2}" width="${art.w}" height="${art.h}" preserveAspectRatio="none" transform="rotate(${art.r ?? 0} ${art.x} ${art.y})" style="mix-blend-mode:${dark ? 'normal' : 'multiply'}"/>` : ''}</g>
    <path d="${body}" fill="url(#${id}g)"/>
    ${neckInner}${extra}
    <path d="M80,40 Q77,${armL - 30} 82,${armL} M220,40 Q223,${armL - 30} 218,${armL}" stroke="${seam}" stroke-width="1.5" fill="none"/>
    <path d="M88,292 Q150,300 212,292" stroke="${seam}" stroke-width="1.5" fill="none"/>
    ${cuffs}
    <path d="${body}" fill="none" stroke="${dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.18)'}" stroke-width="1"/>
    ${guide ? `<path d="${body}" fill="none" stroke="var(--glow)" stroke-width="1.2" stroke-dasharray="5 4" opacity=".9"/>` : ''}
  </svg>`;
}

/* ---------- Cards ---------- */
function productCard(p, color = p.colors[0]) {
  return `<a class="card-product" href="producto.html?p=${p.id}">
    <div class="img">
      ${p.tag ? `<span class="tag">${p.tag}</span>` : ''}
      <button class="icon-btn fav" aria-label="Guardar en favoritos" onclick="event.preventDefault();this.querySelector('i').classList.toggle('fa-solid');this.querySelector('i').classList.toggle('fa-regular')"><i class="fa-regular fa-heart"></i></button>
      ${shirtSVG({ color, neck: p.neck, sleeve: p.sleeve, print: p.print })}
      <span class="quick btn btn-light btn-sm btn-block" onclick="event.preventDefault();addToCart()"><i class="fa-solid fa-bag-shopping"></i> Agregar</span>
    </div>
    <div class="info">
      <div class="name">${p.name}</div>
      <div class="desc">${p.desc}</div>
      <div class="price">${cop.format(p.price)}</div>
      <div class="swatches">${p.colors.map((c) => `<span class="swatch" title="${COLORS[c].name}" style="background:${COLORS[c].hex}"></span>`).join('')}</div>
    </div>
  </a>`;
}

/* ---------- Carrito (contador) ---------- */
function cartCount() {
  return store.get('apolaris-cart', 2);
}
function addToCart(n = 1) {
  store.set('apolaris-cart', cartCount() + n);
  document.querySelectorAll('[data-cart-count]').forEach((el) => (el.textContent = cartCount()));
  toast('<i class="fa-solid fa-check"></i> Agregado a tu bolsa');
}
function toast(html) {
  const t = document.createElement('div');
  t.innerHTML = html;
  Object.assign(t.style, {
    position: 'fixed', left: '50%', top: '5.5rem', transform: 'translateX(-50%)', zIndex: 80,
    background: 'var(--ink)', color: 'var(--on-ink)', padding: '.8rem 1.2rem', fontSize: '.8rem', letterSpacing: '.08em',
    display: 'flex', gap: '.6rem', alignItems: 'center', boxShadow: '0 10px 25px rgba(0,0,0,.25)',
  });
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

/* ---------- Cabecera, pie y navegación móvil ---------- */
/* Logo oficial: versión negra en modo claro, blanca sobre fondos oscuros. */
const LOGO = (night = false, lg = false) => {
  const white = night || document.documentElement.dataset.mode === 'dark';
  return `<span class="brand${lg ? ' lg' : ''}${night ? ' glow' : ''}"><img data-logo${night ? '-night' : ''} src="assets/logo-${white ? 'blanco' : 'cafe'}.png" alt="Apolaris · Actitud sin límites"></span>`;
};

/* ---------- Modo claro / oscuro ---------- */
function systemMode() {
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function applyMode(mode) {
  document.documentElement.dataset.mode = mode;
  document.querySelectorAll('img[data-logo]').forEach((img) => (img.src = `assets/logo-${mode === 'dark' ? 'blanco' : 'cafe'}.png`));
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', mode === 'dark' ? '#0b1020' : '#f1ede6');
  if (document.body?.dataset.season) applySeason(document.body.dataset.season);
}
function toggleMode() {
  const next = document.documentElement.dataset.mode === 'dark' ? 'light' : 'dark';
  store.set('apolaris-mode', next);
  applyMode(next);
}
const modeFromUrl = { oscuro: 'dark', claro: 'light' }[new URLSearchParams(location.search).get('modo')];
applyMode(modeFromUrl ?? store.get('apolaris-mode', null) ?? systemMode());
addEventListener('storage', (e) => e.key === 'apolaris-mode' && applyMode(store.get('apolaris-mode', 'light')));

function header(page) {
  const link = (href, label, key) => `<a href="${href}" class="${page === key ? 'active' : ''}">${label}</a>`;
  return `
  <div class="topbar">Envíos a toda Colombia · Diseños personalizados por pedido · <a href="${wa('Hola Apolaris, quiero más información')}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> 313 742 8004</a></div>
  <header class="site-header">
    <div class="inner">
      <nav class="nav-left" aria-label="Principal">
        ${link('coleccion.html', 'Colecciones', 'coleccion')}
        ${link('personaliza.html', 'Personaliza', 'personaliza')}
        ${link('index.html#temporada', 'Temporada', 'temporada')}
        ${link('index.html#nosotros', 'Nosotros', 'nosotros')}
      </nav>
      <button class="icon-btn menu-toggle" aria-label="Menú"><i class="fa-solid fa-bars"></i></button>
      <a href="index.html" style="justify-self:center">${LOGO()}</a>
      <div class="nav-right">
        <button class="icon-btn hide-sm" aria-label="Buscar"><i class="fa-solid fa-magnifying-glass"></i></button>
        <a class="icon-btn hide-sm" href="seguimiento.html" aria-label="Seguir mi pedido" title="Seguir mi pedido"><i class="fa-solid fa-truck-fast"></i></a>
        <button class="icon-btn hide-sm" aria-label="Mi cuenta"><i class="fa-regular fa-user"></i></button>
        <button class="icon-btn mode-toggle" aria-label="Cambiar modo claro u oscuro" title="Modo claro / oscuro" onclick="toggleMode()"><i class="fa-regular fa-moon"></i><i class="fa-regular fa-sun"></i></button>
        <a class="icon-btn" href="carrito.html" aria-label="Bolsa"><i class="fa-solid fa-bag-shopping"></i><span class="badge" data-cart-count>${cartCount()}</span></a>
      </div>
    </div>
  </header>`;
}

function footer() {
  return `
  <footer class="site-footer night" id="nosotros">
    <div class="stars"></div>
    <div class="container">
      <div class="cols">
        <div>
          ${LOGO(true)}
          <p style="color:var(--night-muted);line-height:1.7;max-width:22rem;margin-top:1.4rem;font-size:.9rem">Prendas con alma de estrella del norte. Diseñamos contigo, producimos aquí y te acompañamos hasta que llega a tu puerta.</p>
          <div class="socials">
            <a href="${INSTAGRAM}" target="_blank" rel="noopener" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="${wa('Hola Apolaris')}" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
            <a href="#" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a>
            <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          </div>
        </div>
        <div><h4>Tienda</h4><ul><li><a href="coleccion.html">Colecciones</a></li><li><a href="coleccion.html">Novedades</a></li><li><a href="index.html#temporada">Temporada</a></li><li><a href="personaliza.html">Personaliza</a></li></ul></div>
        <div><h4>Ayuda</h4><ul><li><a href="seguimiento.html">Seguir mi pedido</a></li><li><a href="#">Envíos y devoluciones</a></li><li><a href="#">Guía de tallas</a></li><li><a href="${wa('Hola, quiero cotizar un pedido por cantidad')}" target="_blank" rel="noopener">Pedidos por cantidad</a></li></ul></div>
        <div><h4>Contacto</h4><ul><li><i class="fa-brands fa-whatsapp"></i> 313 742 8004</li><li><i class="fa-brands fa-instagram"></i> @apolaris.24</li><li><i class="fa-regular fa-envelope"></i> hola@apolaris.co</li><li><i class="fa-solid fa-location-dot"></i> Colombia</li></ul></div>
      </div>
      <div class="bottom">
        <span>© 2026 Apolaris · <a href="#">Política de tratamiento de datos</a> · <a href="#">Términos</a></span>
        <span class="pay-icons"><i class="fa-brands fa-cc-visa"></i><i class="fa-brands fa-cc-mastercard"></i><i class="fa-brands fa-cc-amex"></i><span class="pay-chip">PSE</span><span class="pay-chip">NEQUI</span></span>
      </div>
    </div>
  </footer>`;
}

function bottomNav(page) {
  const item = (href, icon, label, key, extra = '') =>
    `<a href="${href}" class="${page === key ? 'active' : ''}"><i class="${icon}"></i>${label}${extra}</a>`;
  return `<nav class="bottom-nav" aria-label="Navegación de la app">
    ${item('index.html', 'fa-solid fa-house', 'Inicio', 'home')}
    ${item('coleccion.html', 'fa-solid fa-shirt', 'Colección', 'coleccion')}
    ${item('personaliza.html', 'fa-solid fa-wand-magic-sparkles', 'Diseña', 'personaliza')}
    ${item('carrito.html', 'fa-solid fa-bag-shopping', 'Bolsa', 'carrito', `<span class="badge" data-cart-count>${cartCount()}</span>`)}
    ${item('seguimiento.html', 'fa-solid fa-truck-fast', 'Pedido', 'seguimiento')}
  </nav>`;
}

function installToast() {
  let seen = false;
  try { seen = sessionStorage.getItem('apolaris-install') === '1'; } catch { /* sin storage */ }
  if (seen) return '';
  return `<div class="install-toast" id="install-toast">
    <img src="assets/icono-blanco.png" alt="">
    <div><strong>Instala Apolaris</strong><br><small>Agrégala a tu pantalla de inicio y compra como en una app.</small></div>
    <button class="btn btn-glow btn-sm" onclick="dismissInstall()">Instalar</button>
    <button class="icon-btn" aria-label="Cerrar" onclick="dismissInstall()"><i class="fa-solid fa-xmark"></i></button>
  </div>`;
}
function dismissInstall() {
  document.getElementById('install-toast')?.classList.remove('show');
  try { sessionStorage.setItem('apolaris-install', '1'); } catch { /* sin storage */ }
}

/* ---------- Temas de temporada (demo del ADR 0010) ---------- */
const SEASONS = {
  base: { label: 'Base', icons: [] },
  navidad: { label: 'Navidad', icons: ['fa-snowflake', 'fa-snowflake', 'fa-star'], color: '#ffffff', colorLight: '#4f86cf', count: 34 },
  halloween: { label: 'Halloween', icons: ['fa-ghost', 'fa-spider', 'fa-moon'], color: '#f08a24', count: 16 },
};
function applySeason(key) {
  document.body.dataset.season = key;
  store.set('apolaris-season', key);
  document.querySelectorAll('.theme-switch button').forEach((b) => b.classList.toggle('on', b.dataset.s === key));
  const layer = document.querySelector('.fx-layer');
  layer.innerHTML = '';
  const s = SEASONS[key];
  if (!s.icons.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let i = 0; i < s.count; i++) {
    const el = document.createElement('i');
    el.className = `fa-solid ${s.icons[i % s.icons.length]} fx-flake`;
    el.style.left = `${Math.random() * 100}%`;
    el.style.fontSize = `${8 + Math.random() * 14}px`;
    el.style.opacity = (0.35 + Math.random() * 0.55).toFixed(2);
    el.style.color = document.documentElement.dataset.mode === 'dark' ? s.color : (s.colorLight ?? s.color);
    el.style.animationDuration = `${9 + Math.random() * 12}s`;
    el.style.animationDelay = `${-Math.random() * 20}s`;
    layer.appendChild(el);
  }
}

/* ---------- Arranque ---------- */
function mountChrome() {
  const page = document.body.dataset.page;
  document.body.insertAdjacentHTML('afterbegin', header(page));
  document.body.insertAdjacentHTML('beforeend', footer() + bottomNav(page) + installToast() + `
    <a class="wa-float" href="${wa('Hola Apolaris, vengo de la tienda web')}" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
    <div class="theme-switch" role="group" aria-label="Tema de temporada (demo)"><span class="lbl">Tema</span>
      ${Object.entries(SEASONS).map(([k, s]) => `<button data-s="${k}">${s.label}</button>`).join('')}
    </div>
    <div class="fx-layer" aria-hidden="true"></div>`);
  document.querySelectorAll('.theme-switch button').forEach((b) => b.addEventListener('click', () => applySeason(b.dataset.s)));
  const fromUrl = new URLSearchParams(location.search).get('tema');
  applySeason(SEASONS[fromUrl] ? fromUrl : store.get('apolaris-season', 'base'));
  const t = document.getElementById('install-toast');
  if (t) setTimeout(() => t.classList.add('show'), 2500);
}

document.addEventListener('DOMContentLoaded', () => {
  mountChrome();
  document.querySelectorAll('[data-shirt]').forEach((el) => {
    el.innerHTML = shirtSVG(JSON.parse(el.dataset.shirt));
  });
  document.querySelectorAll('[data-wa]').forEach((el) => {
    el.href = wa(el.dataset.wa);
    el.target = '_blank';
    el.rel = 'noopener';
  });
  window.pageInit?.();
});
