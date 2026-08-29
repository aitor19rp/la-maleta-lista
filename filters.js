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
