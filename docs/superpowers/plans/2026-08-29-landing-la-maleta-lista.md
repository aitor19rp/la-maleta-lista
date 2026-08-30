# Landing y plantilla de ofertas — La Maleta Lista Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a static Eleventy site for "La Maleta Lista" with a presentation home page and a reusable, data-driven template for travel-offer pages (one per TikTok video/offer), including affiliate link tracking (UTM) and multi-monetization cross-sell links (insurance, car rental, activities).

**Architecture:** Eleventy (11ty) static site generator, no client-side JS framework. A shared Nunjucks layout provides header/logo/social links/Telegram capture. Offer pages are markdown files with structured front matter, rendered through a shared offer template. Pure JS helper functions (in `filters.js`) handle UTM link generation and fallback URLs, unit-tested with Node's built-in test runner. Deployed as static files to Netlify via `netlify.toml`.

**Tech Stack:** Node.js, @11ty/eleventy ^2.0.0, Nunjucks templating, plain CSS (no preprocessor), `node:test` for unit tests, Netlify for hosting.

**Spec:** [docs/superpowers/specs/2026-08-29-landing-la-maleta-lista-design.md](../specs/2026-08-29-landing-la-maleta-lista-design.md)

## Global Constraints

- Free hosting only for this phase — no paid domain, use the Netlify-provided subdomain (from spec: "sin dominio propio de entrada").
- No client-side JS framework — output must be plain static HTML/CSS (from spec: "Sin framework de frontend, sin JS pesado para el visitante").
- Brand palette: azul vuelo `#1B4B66`, coral atardecer `#FF6B4A`, arena cálida `#F7F1E8`, verde brújula `#3E7C74`, tinta noche `#1B2430` (from spec: "Marca aplicada").
- Typography: Fraunces for headings, Work Sans for body text (from spec: "Marca aplicada").
- Home page has no offer listing in this phase (from spec: "Decisiones explícitamente diferidas").
- Every offer page must include: header photo, dated/priced options, primary affiliate CTA with UTM, a "search other dates" fallback link, three cross-sell cards (insurance/car/activities), and a Telegram capture block (from spec: "Página de oferta").
- Publish at least 3 example offers before requesting affiliate program approval (from spec conversation: seed content for review credibility).

---

## Task 1: Project scaffolding & Eleventy install

**Files:**
- Create: `package.json`
- Create: `.eleventy.js`
- Create: `.gitignore`

**Interfaces:**
- Produces: Eleventy config object with `dir.input = "."`, `dir.output = "_site"`, `dir.includes = "_includes"`, `dir.data = "_data"` — later tasks add passthrough copies and filters to this same config function.

- [ ] **Step 1: Initialize git repository**

Run: `git init`
Expected: `Initialized empty Git repository in C:/Users/Usuario/Desktop/viajes/.git/`

- [ ] **Step 2: Create package.json**

```json
{
  "name": "la-maleta-lista",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "eleventy",
    "serve": "eleventy --serve",
    "test": "node --test"
  },
  "devDependencies": {
    "@11ty/eleventy": "^2.0.0"
  }
}
```

- [ ] **Step 3: Install dependencies**

Run: `npm install`
Expected: `@11ty/eleventy` installed into `node_modules/`, `package-lock.json` created.

- [ ] **Step 4: Create .gitignore**

```
node_modules/
_site/
```

- [ ] **Step 5: Create minimal Eleventy config**

```js
module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};
```

- [ ] **Step 6: Verify the build runs with no content**

Run: `npx @11ty/eleventy`
Expected: Command exits with code 0 and creates an empty `_site/` directory (output may say "Wrote 0 files").

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json .eleventy.js .gitignore
git commit -m "chore: scaffold Eleventy project"
```

---

## Task 2: Brand assets — stylesheet + logo passthrough

**Files:**
- Create: `style.css`
- Modify: `.eleventy.js`
- Create: `logo/horizontal.png`, `logo/apilado.png`, `logo/icono.png` (copy from the already-generated brand assets)

**Interfaces:**
- Consumes: Eleventy config function from Task 1.
- Produces: CSS custom properties (`--azul-vuelo`, `--coral-atardecer`, `--arena-calida`, `--verde-brujula`, `--tinta-noche`, `--font-titulares`, `--font-cuerpo`) and CSS classes (`.site-header`, `.logo-horizontal`, `.hero`, `.tagline`, `.redes`, `.boton-red`, `.boton-cta`, `.telegram-cta`, `.site-footer`, `.oferta-cabecera`, `.opciones-lista`, `.cta-principal`, `.buscar-fechas`, `.extras`, `.extra-card`) consumed by templates in Tasks 4 and 5. `/style.css`, `/logo/*.png` available at build output root.

- [ ] **Step 1: Create style.css**

```css
:root {
  --azul-vuelo: #1B4B66;
  --coral-atardecer: #FF6B4A;
  --arena-calida: #F7F1E8;
  --verde-brujula: #3E7C74;
  --tinta-noche: #1B2430;
  --font-titulares: 'Fraunces', Georgia, serif;
  --font-cuerpo: 'Work Sans', Arial, sans-serif;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--arena-calida);
  color: var(--tinta-noche);
  font-family: var(--font-cuerpo);
  line-height: 1.6;
}

.site-header {
  padding: 24px 20px;
  text-align: center;
}

.logo-horizontal {
  max-width: 280px;
  height: auto;
}

.hero {
  max-width: 640px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
}

.hero h1,
h2 {
  font-family: var(--font-titulares);
  font-weight: 600;
  color: var(--azul-vuelo);
}

.tagline {
  font-size: 18px;
}

.redes {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 20px;
  flex-wrap: wrap;
}

.boton-red,
.boton-cta {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  background: var(--coral-atardecer);
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
}

.telegram-cta {
  max-width: 480px;
  margin: 0 auto 40px;
  padding: 24px;
  background: #ffffff;
  border: 1px solid var(--verde-brujula);
  border-radius: 12px;
  text-align: center;
}

.site-footer {
  text-align: center;
  padding: 20px;
  font-size: 13px;
  color: var(--verde-brujula);
}

.oferta-cabecera {
  position: relative;
  height: 320px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
}

.oferta-cabecera h1 {
  color: #ffffff;
  background: rgba(27, 36, 48, 0.55);
  padding: 12px 20px;
  margin: 0;
  width: 100%;
  font-family: var(--font-titulares);
}

.opciones-lista {
  list-style: none;
  margin: 0 auto;
  padding: 0 20px;
  max-width: 560px;
}

.opciones-lista li {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--verde-brujula);
}

.cta-principal {
  display: block;
  text-align: center;
  margin: 24px auto;
  max-width: 320px;
  padding: 16px 24px;
  background: var(--azul-vuelo);
  color: #ffffff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 18px;
}

.buscar-fechas {
  display: block;
  text-align: center;
  margin: 12px auto 32px;
  color: var(--azul-vuelo);
}

.extras {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 20px;
  max-width: 720px;
  margin: 0 auto;
}

.extra-card {
  background: #ffffff;
  border: 1px solid var(--verde-brujula);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  color: var(--tinta-noche);
  flex: 1;
  min-width: 160px;
}
```

- [ ] **Step 2: Add the logo files**

Copy the three already-generated PNG logo files (horizontal, apilado/stacked, icono/icon-only — all transparent background, navy `#1B4B66` + coral `#FF6B4A`) from wherever they were downloaded into a new `logo/` folder at the project root, named `logo/horizontal.png`, `logo/apilado.png`, `logo/icono.png`.

- [ ] **Step 3: Add passthrough copy to Eleventy config**

Modify `.eleventy.js`:

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("logo");

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};
```

- [ ] **Step 4: Verify passthrough copy works**

Run: `npx @11ty/eleventy`
Expected: `_site/style.css` and `_site/logo/horizontal.png` (and the other two PNGs) exist after the build.

- [ ] **Step 5: Commit**

```bash
git add style.css logo/ .eleventy.js
git commit -m "feat: add brand stylesheet and logo assets"
```

---

## Task 3: URL/UTM helper filters (unit tested)

**Files:**
- Create: `filters.js`
- Test: `filters.test.js`
- Modify: `.eleventy.js`

**Interfaces:**
- Produces: `slugify(text) -> string`, `utmLink(baseUrl, destino) -> string`, `civitatisUrl(civitatisUrlOverride, destino) -> string`, `buscarFechasUrl(buscarFechasUrlOverride, destino) -> string`, `opcionesValidas(opciones) -> array` — consumed as Nunjucks filters `utmLink`, `civitatisUrl`, `buscarFechasUrl`, `opcionesValidas` in the offer template (Task 5).

- [ ] **Step 1: Write the failing tests**

```js
const test = require('node:test');
const assert = require('node:assert');
const { slugify, utmLink, civitatisUrl, buscarFechasUrl, opcionesValidas } = require('./filters.js');

test('slugify removes accents and spaces', () => {
  assert.strictEqual(slugify('Praga'), 'praga');
  assert.strictEqual(slugify('São Paulo'), 'sao-paulo');
});

test('utmLink appends utm params with ? when base has no query string', () => {
  assert.strictEqual(
    utmLink('https://tuenlace.com/praga', 'Praga'),
    'https://tuenlace.com/praga?utm_source=tiktok&utm_medium=social&utm_content=praga'
  );
});

test('utmLink appends utm params with & when base already has a query string', () => {
  assert.strictEqual(
    utmLink('https://tuenlace.com/praga?ref=abc', 'Praga'),
    'https://tuenlace.com/praga?ref=abc&utm_source=tiktok&utm_medium=social&utm_content=praga'
  );
});

test('utmLink returns # when baseUrl is missing', () => {
  assert.strictEqual(utmLink('', 'Praga'), '#');
});

test('civitatisUrl uses the override when provided', () => {
  assert.strictEqual(civitatisUrl('https://civitatis.com/custom', 'Praga'), 'https://civitatis.com/custom');
});

test('civitatisUrl falls back to a slugified city page when empty', () => {
  assert.strictEqual(civitatisUrl('', 'Praga'), 'https://www.civitatis.com/es/praga/');
});

test('buscarFechasUrl falls back to a Google Flights search when empty', () => {
  assert.strictEqual(
    buscarFechasUrl('', 'Praga'),
    'https://www.google.com/travel/flights?q=' + encodeURIComponent('Vuelos a Praga')
  );
});

test('opcionesValidas filters out rows missing salida, fecha, or precio', () => {
  const input = [
    { salida: 'Madrid', fecha: '12-15 nov', precio: '49€' },
    { salida: 'Barcelona', fecha: '', precio: '39€' },
    {}
  ];
  const result = opcionesValidas(input);
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0].salida, 'Madrid');
});

test('opcionesValidas returns an empty array when opciones is not an array', () => {
  assert.deepStrictEqual(opcionesValidas(undefined), []);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test filters.test.js`
Expected: FAIL — `Cannot find module './filters.js'`

- [ ] **Step 3: Write the implementation**

```js
function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function utmLink(baseUrl, destino) {
  if (!baseUrl) return '#';
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}utm_source=tiktok&utm_medium=social&utm_content=${slugify(destino)}`;
}

function civitatisUrl(civitatisUrlOverride, destino) {
  if (civitatisUrlOverride && civitatisUrlOverride.trim() !== '') return civitatisUrlOverride;
  return `https://www.civitatis.com/es/${slugify(destino)}/`;
}

function buscarFechasUrl(buscarFechasUrlOverride, destino) {
  if (buscarFechasUrlOverride && buscarFechasUrlOverride.trim() !== '') return buscarFechasUrlOverride;
  return `https://www.google.com/travel/flights?q=${encodeURIComponent('Vuelos a ' + destino)}`;
}

function opcionesValidas(opciones) {
  if (!Array.isArray(opciones)) return [];
  return opciones.filter((o) => o && o.salida && o.fecha && o.precio);
}

module.exports = { slugify, utmLink, civitatisUrl, buscarFechasUrl, opcionesValidas };
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test filters.test.js`
Expected: PASS — 9 tests passing, 0 failing.

- [ ] **Step 5: Wire the filters into Eleventy**

Modify `.eleventy.js`:

```js
const { utmLink, civitatisUrl, buscarFechasUrl, opcionesValidas } = require('./filters.js');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("logo");

  eleventyConfig.addFilter("utmLink", utmLink);
  eleventyConfig.addFilter("civitatisUrl", civitatisUrl);
  eleventyConfig.addFilter("buscarFechasUrl", buscarFechasUrl);
  eleventyConfig.addFilter("opcionesValidas", opcionesValidas);
  eleventyConfig.addShortcode("anioActual", () => new Date().getFullYear());

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};
```

- [ ] **Step 6: Verify the build still succeeds**

Run: `npx @11ty/eleventy`
Expected: Command exits with code 0 (no content yet, but no config errors either).

- [ ] **Step 7: Commit**

```bash
git add filters.js filters.test.js .eleventy.js
git commit -m "feat: add UTM and fallback URL helper filters with unit tests"
```

---

## Task 4: Site data & home page

**Files:**
- Create: `_data/site.js`
- Create: `_includes/layout.njk`
- Create: `index.njk`

**Interfaces:**
- Consumes: `.eleventy.js` config from Task 3, CSS classes from Task 2.
- Produces: global data object `site` (`site.nombre`, `site.tagline`, `site.redes.tiktok`, `site.redes.instagram`, `site.redes.facebook`, `site.telegram`) and the `layout.njk` template (consumes a `content` variable and an optional `title` front-matter key) — both consumed by the offer template in Task 5.

- [ ] **Step 1: Create the site data file**

```js
module.exports = {
  nombre: "La Maleta Lista",
  tagline: "Cada semana busco las mejores ofertas de vuelos, hoteles y escapadas por Europa para que tú solo tengas que hacer la maleta.",
  redes: {
    tiktok: "https://www.tiktok.com/@TU_USUARIO_TIKTOK",
    instagram: "https://www.instagram.com/TU_USUARIO_INSTAGRAM",
    facebook: "https://www.facebook.com/TU_PAGINA_FACEBOOK"
  },
  telegram: "https://t.me/TU_CANAL_TELEGRAM"
};
```

Note: replace the three `redes` URLs and `telegram` URL with the real profile/channel links once the accounts exist.

- [ ] **Step 2: Create the shared layout**

```njk
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ title or site.nombre }}</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600&family=Work+Sans:wght@400;500&display=swap">
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <header class="site-header">
    <a href="/" class="logo-link">
      <img src="/logo/horizontal.png" alt="{{ site.nombre }}" class="logo-horizontal">
    </a>
  </header>

  <main>
    {{ content | safe }}
  </main>

  <section class="redes">
    <a href="{{ site.redes.tiktok }}" class="boton-red" target="_blank" rel="noopener">TikTok</a>
    <a href="{{ site.redes.instagram }}" class="boton-red" target="_blank" rel="noopener">Instagram</a>
    <a href="{{ site.redes.facebook }}" class="boton-red" target="_blank" rel="noopener">Facebook</a>
  </section>

  <section class="telegram-cta">
    <h2>Recibe los chollos antes que nadie</h2>
    <p>Únete al canal y entérate de las ofertas en cuanto salen.</p>
    <a href="{{ site.telegram }}" class="boton-cta" target="_blank" rel="noopener">Unirme a Telegram</a>
  </section>

  <footer class="site-footer">
    <p>&copy; {% anioActual %} {{ site.nombre }}</p>
  </footer>
</body>
</html>
```

- [ ] **Step 3: Create the home page**

```njk
---
layout: layout.njk
title: La Maleta Lista — Ofertas de viaje por Europa
---
<section class="hero">
  <h1>{{ site.nombre }}</h1>
  <p class="tagline">{{ site.tagline }}</p>
</section>
```

- [ ] **Step 4: Build and verify the home page renders correctly**

Run: `npx @11ty/eleventy`
Expected: `_site/index.html` is created. Verify with:

`grep -o "La Maleta Lista" _site/index.html`

Expected output: at least one match. Also manually open `_site/index.html` in a browser and confirm the logo, tagline, three social buttons, and the Telegram block all appear.

- [ ] **Step 5: Commit**

```bash
git add _data/site.js _includes/layout.njk index.njk
git commit -m "feat: add site data and home page"
```

---

## Task 5: Oferta template, directory data, and first sample offer

**Files:**
- Create: `_data/afiliados.js`
- Create: `_includes/oferta.njk`
- Create: `ofertas/ofertas.json`
- Create: `ofertas/praga-noviembre.md`
- Create: `img/praga-hero.jpg`

**Interfaces:**
- Consumes: `layout.njk` (Task 4), `site` global data (Task 4), filters `utmLink`/`civitatisUrl`/`buscarFechasUrl`/`opcionesValidas` (Task 3).
- Produces: global data object `afiliados` (`afiliados.seguro`, `afiliados.coche`) and the offer front-matter schema (`destino`, `imagen_cabecera`, `opciones` (array of `{salida, fecha, precio}`), `link_afiliado`, `civitatis_url`, `buscar_fechas_url`) — this schema is what every future offer markdown file must follow.

- [ ] **Step 1: Create the affiliate data file**

```js
module.exports = {
  seguro: "https://www.heymondo.es/TU_ENLACE_AFILIADO_HEYMONDO",
  coche: "https://www.discovercars.com/es?affiliate=TU_ID_AFILIADO_DISCOVERCARS"
};
```

Note: replace both URLs with the real affiliate links once approved in the Heymondo and DiscoverCars affiliate programs.

- [ ] **Step 2: Create the offer directory data file**

```json
{
  "layout": "oferta.njk",
  "tags": "ofertas"
}
```

This makes every markdown file inside `ofertas/` use `oferta.njk` as its layout automatically, without repeating it in each file's front matter.

- [ ] **Step 3: Create the offer template**

```njk
---
layout: layout.njk
---
<article class="oferta">
  <header class="oferta-cabecera" style="background-image: url('{{ imagen_cabecera }}');">
    <h1>{{ destino }}</h1>
  </header>

  <ul class="opciones-lista">
    {% for opcion in opciones | opcionesValidas %}
    <li>
      <span>{{ opcion.salida }}</span>
      <span>{{ opcion.fecha }}</span>
      <span>{{ opcion.precio }}</span>
    </li>
    {% endfor %}
  </ul>

  <a href="{{ link_afiliado | utmLink(destino) }}" class="cta-principal" target="_blank" rel="noopener sponsored">Ver oferta</a>

  <a href="{{ buscar_fechas_url | buscarFechasUrl(destino) }}" class="buscar-fechas" target="_blank" rel="noopener">¿No te encajan estas fechas? Busca otras fechas para {{ destino }} →</a>

  <section class="extras">
    <a href="{{ afiliados.seguro | utmLink(destino) }}" class="extra-card" target="_blank" rel="noopener sponsored">Seguro de viaje</a>
    <a href="{{ afiliados.coche | utmLink(destino) }}" class="extra-card" target="_blank" rel="noopener sponsored">Alquiler de coche</a>
    <a href="{{ civitatis_url | civitatisUrl(destino) }}" class="extra-card" target="_blank" rel="noopener sponsored">Actividades en {{ destino }}</a>
  </section>
</article>
```

- [ ] **Step 4: Add the header photo**

Download a free-license photo of Prague (from Unsplash or Pexels, per the licensing rule agreed for this project — never an unverified Google Images result) and save it as `img/praga-hero.jpg`, at least 1200px wide.

- [ ] **Step 5: Create the first sample offer**

```markdown
---
destino: "Praga"
imagen_cabecera: "/img/praga-hero.jpg"
opciones:
  - salida: "Madrid"
    fecha: "12-15 noviembre"
    precio: "49€"
  - salida: "Barcelona"
    fecha: "10-13 noviembre"
    precio: "39€"
link_afiliado: "https://www.edreams.es/viajes/praga?TU_ID_AFILIADO"
civitatis_url: ""
buscar_fechas_url: ""
---
```

Note: replace `link_afiliado` with the real eDreams (or Booking) affiliate link once the account is approved.

- [ ] **Step 6: Add the image passthrough copy**

Modify `.eleventy.js` — add one line inside the config function, alongside the existing passthrough copies:

```js
eleventyConfig.addPassthroughCopy("img");
```

- [ ] **Step 7: Build and verify the offer page**

Run: `npx @11ty/eleventy`
Expected: `_site/ofertas/praga-noviembre/index.html` is created. Verify with:

```bash
grep -o "Praga" _site/ofertas/praga-noviembre/index.html
grep -o "49€" _site/ofertas/praga-noviembre/index.html
grep -o "utm_source=tiktok" _site/ofertas/praga-noviembre/index.html
grep -o "civitatis.com/es/praga/" _site/ofertas/praga-noviembre/index.html
grep -o "google.com/travel/flights" _site/ofertas/praga-noviembre/index.html
```

Expected: each command prints at least one match, confirming the destination name, price, UTM-tagged CTA, Civitatis fallback link, and Google Flights fallback link all render correctly.

- [ ] **Step 8: Commit**

```bash
git add _data/afiliados.js _includes/oferta.njk ofertas/ img/ .eleventy.js
git commit -m "feat: add offer template and first sample offer (Praga)"
```

---

## Task 6: Two more sample offers

**Files:**
- Create: `ofertas/marrakech-diciembre.md`
- Create: `ofertas/tenerife-diciembre.md`
- Create: `img/marrakech-hero.jpg`
- Create: `img/tenerife-hero.jpg`

**Interfaces:**
- Consumes: the offer schema and template from Task 5. No new interfaces produced — this task only adds content.

- [ ] **Step 1: Add the header photos**

Download free-license photos (Unsplash/Pexels) of Marrakech and Tenerife, save as `img/marrakech-hero.jpg` and `img/tenerife-hero.jpg`, at least 1200px wide.

- [ ] **Step 2: Create the Marrakech offer**

```markdown
---
destino: "Marrakech"
imagen_cabecera: "/img/marrakech-hero.jpg"
opciones:
  - salida: "Madrid"
    fecha: "5-8 diciembre"
    precio: "65€"
  - salida: "Málaga"
    fecha: "6-9 diciembre"
    precio: "58€"
link_afiliado: "https://www.edreams.es/viajes/marrakech?TU_ID_AFILIADO"
civitatis_url: ""
buscar_fechas_url: ""
---
```

- [ ] **Step 3: Create the Tenerife offer**

```markdown
---
destino: "Tenerife"
imagen_cabecera: "/img/tenerife-hero.jpg"
opciones:
  - salida: "Madrid"
    fecha: "20-27 diciembre"
    precio: "89€"
  - salida: "Barcelona"
    fecha: "22-29 diciembre"
    precio: "97€"
link_afiliado: "https://www.edreams.es/viajes/tenerife?TU_ID_AFILIADO"
civitatis_url: ""
buscar_fechas_url: ""
---
```

- [ ] **Step 4: Build and verify all three offers exist**

Run: `npx @11ty/eleventy`
Expected:

```bash
ls _site/ofertas/
```

Output includes `praga-noviembre/`, `marrakech-diciembre/`, and `tenerife-diciembre/`, each containing an `index.html`.

- [ ] **Step 5: Commit**

```bash
git add ofertas/ img/
git commit -m "feat: add two more sample offers (Marrakech, Tenerife)"
```

---

## Task 7: Netlify deployment configuration

**Files:**
- Create: `netlify.toml`

**Interfaces:**
- Consumes: `npm run build` script (Task 1), `_site` output directory (Task 1).
- Produces: none consumed by other tasks — this is the final, deployable state of the project.

- [ ] **Step 1: Create the Netlify build configuration**

```toml
[build]
  command = "npm run build"
  publish = "_site"
```

- [ ] **Step 2: Verify the full build one final time**

Run: `rm -rf _site && npm run build`
Expected: command exits with code 0, `_site/index.html` and all three `_site/ofertas/*/index.html` files exist.

- [ ] **Step 3: Verify locally with the dev server**

Run: `npm run serve`
Expected: a local server starts (typically `http://localhost:8080`); open it in a browser and click through: home page → each social button → Telegram button → visit one offer page → click "Ver oferta" (confirm the URL in the browser address bar or a new tab includes `utm_source=tiktok`) → click "¿No te encajan estas fechas?" → click each of the three extras cards. Stop the server with Ctrl+C when done.

- [ ] **Step 4: Commit**

```bash
git add netlify.toml
git commit -m "chore: add Netlify build configuration"
```

- [ ] **Step 5: Deploy**

Push this repository to GitHub (create a new repo and `git remote add origin <url>` then `git push -u origin main` if not already done), then in Netlify: "Add new site" → "Import an existing project" → select the repo. Netlify reads `netlify.toml` automatically and deploys `_site` on every push. Note the resulting `*.netlify.app` URL — this is the URL to use when applying to Civitatis, Booking, Heymondo/IATI, and DiscoverCars affiliate programs.

---

## Self-Review Notes

- **Spec coverage:** Arquitectura (Task 1, 3), marca aplicada (Task 2), landing (Task 4), página de oferta con las 6 secciones y campos opcionales (Task 5), flujo de publicar oferta nueva (demonstrated by Task 6 reusing the schema), testing/verificación manual (Task 7 Step 3), 2-3 ofertas de ejemplo antes del alta en afiliados (Tasks 5-6, three total). Listado tipo agregador, dominio propio, chat IA, comparador — explicitly out of scope, no task needed.
- **Placeholder scan:** No TBD/TODO steps. Configuration values that are inherently account-specific (social media URLs, Telegram channel, affiliate links) are written as concrete placeholder strings with an explicit note on what to replace them with and when — not left as unimplemented logic.
- **Type consistency:** `utmLink(baseUrl, destino)`, `civitatisUrl(civitatisUrlOverride, destino)`, `buscarFechasUrl(buscarFechasUrlOverride, destino)`, `opcionesValidas(opciones)` signatures match between `filters.js` (Task 3), their unit tests (Task 3), their Eleventy filter registration (Task 3), and their usage in `oferta.njk` (Task 5) — same parameter order and argument count throughout.
