function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
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

// Awin (eDreams, lastminute.com ES, Rumbo ES) reads its own &clickref= parameter —
// this is what shows up as a filterable column in the Awin dashboard, unlike generic UTM tags.
function clickrefLink(baseUrl, destino) {
  if (!baseUrl) return '#';
  if (baseUrl.includes('clickref=')) return baseUrl;
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}clickref=${slugify(destino)}`;
}

// CJ Affiliate (Booking.com) reads its own &sid= parameter, same purpose as Awin's clickref.
function sidLink(baseUrl, destino) {
  if (!baseUrl) return '#';
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}sid=${slugify(destino)}`;
}

function civitatisUrl(civitatisUrlOverride, destino) {
  if (civitatisUrlOverride && civitatisUrlOverride.trim() !== '') return civitatisUrlOverride;
  return `https://www.civitatis.com/es/${slugify(destino)}/`;
}

// eDreams' own Awin merchant/affiliate IDs, reused to build tracked deep links
// to a destination's generic (non-session-bound) search page.
const EDREAMS_AWIN_MID = '10573';
const EDREAMS_AWIN_AFFID = '1692815';

function buscarFechasUrl(buscarFechasUrlOverride, destino) {
  if (buscarFechasUrlOverride && buscarFechasUrlOverride.trim() !== '') return buscarFechasUrlOverride;
  const destinoUrl = `https://www.edreams.es/viajes/${slugify(destino)}/`;
  const clickref = `${slugify(destino)}-otras-fechas`;
  return `https://www.awin1.com/cread.php?awinmid=${EDREAMS_AWIN_MID}&awinaffid=${EDREAMS_AWIN_AFFID}&clickref=${clickref}&ued=${encodeURIComponent(destinoUrl)}`;
}

function buscarAeropuertosUrl(buscarAeropuertosUrlOverride, destino) {
  if (buscarAeropuertosUrlOverride && buscarAeropuertosUrlOverride.trim() !== '') return buscarAeropuertosUrlOverride;
  const destinoUrl = `https://www.edreams.es/viajes/${slugify(destino)}/`;
  const clickref = `${slugify(destino)}-otros-aeropuertos`;
  return `https://www.awin1.com/cread.php?awinmid=${EDREAMS_AWIN_MID}&awinaffid=${EDREAMS_AWIN_AFFID}&clickref=${clickref}&ued=${encodeURIComponent(destinoUrl)}`;
}

// For offers that are hotel-only (e.g. sourced from Trivago), this points readers to
// eDreams' Vuelo+Hotel landing page for the destination (same page as buscarFechasUrl) —
// it has a "Vuelos" tab where the destination is prefilled and the reader fills their own
// origin/dates. eDreams has no static per-destination flights-only URL (/vuelos/{slug}/
// 404s), and its live flights results page needs internal numeric city IDs that can't be
// derived from a slug, so this landing page is the only reliable destination-prefilled entry point.
function buscarVuelosUrl(buscarVuelosUrlOverride, destino) {
  if (buscarVuelosUrlOverride && buscarVuelosUrlOverride.trim() !== '') return buscarVuelosUrlOverride;
  const destinoUrl = `https://www.edreams.es/viajes/${slugify(destino)}/`;
  const clickref = `${slugify(destino)}-vuelos`;
  return `https://www.awin1.com/cread.php?awinmid=${EDREAMS_AWIN_MID}&awinaffid=${EDREAMS_AWIN_AFFID}&clickref=${clickref}&ued=${encodeURIComponent(destinoUrl)}`;
}

function opcionesValidas(opciones) {
  if (!Array.isArray(opciones)) return [];
  return opciones.filter((o) => o && o.salida && o.fecha && o.precio);
}

// Extracts just the amount ("Desde 236€/persona" -> "236€") for compact price badges.
function precioCorto(precio) {
  const match = (precio || '').match(/\d+(?:[.,]\d+)?\s?€/);
  return match ? match[0].replace(/\s/g, '') : (precio || '');
}

// Returns the option with the lowest price (first one on ties), or null when none has a parseable amount.
function masBarata(opciones) {
  if (!Array.isArray(opciones)) return null;
  let mejor = null;
  let mejorPrecio = Infinity;
  for (const opcion of opciones) {
    const match = ((opcion && opcion.precio) || '').match(/\d+(?:[.,]\d+)?/);
    if (!match) continue;
    const valor = parseFloat(match[0].replace(',', '.'));
    if (valor < mejorPrecio) { mejorPrecio = valor; mejor = opcion; }
  }
  return mejor;
}

// Text after the amount ("Desde 91€/persona" -> "por persona"), or "" when there is none.
function precioUnidad(precio) {
  const match = (precio || '').match(/\d+(?:[.,]\d+)?\s?€\s*\/\s*([^\s]+(?:\s+[^\s]+)*)/);
  return match ? `por ${match[1].trim()}` : '';
}

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

// First month named in a date text ("30 diciembre - 1 enero" -> "dic"); this is the departure month.
function mesSalida(fecha) {
  const texto = (fecha || '').toString().toLowerCase();
  let mejor = -1;
  let mejorPos = Infinity;
  MESES.forEach((mes, i) => {
    const pos = texto.indexOf(mes);
    if (pos !== -1 && pos < mejorPos) { mejorPos = pos; mejor = i; }
  });
  return mejor === -1 ? '' : MESES[mejor].slice(0, 3);
}

module.exports = { precioUnidad, mesSalida, masBarata, precioCorto, slugify, utmLink, clickrefLink, sidLink, civitatisUrl, buscarFechasUrl, buscarAeropuertosUrl, buscarVuelosUrl, opcionesValidas };
