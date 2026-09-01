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

function opcionesValidas(opciones) {
  if (!Array.isArray(opciones)) return [];
  return opciones.filter((o) => o && o.salida && o.fecha && o.precio);
}

module.exports = { slugify, utmLink, clickrefLink, sidLink, civitatisUrl, buscarFechasUrl, buscarAeropuertosUrl, opcionesValidas };
