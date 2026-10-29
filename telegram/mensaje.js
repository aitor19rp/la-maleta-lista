const { masBarata } = require('../filters.js');

const BASE_WEB = 'https://lamaletalista.site';

function escaparHtml(texto) {
  return String(texto).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function urlOferta(slug, base = BASE_WEB) {
  return `${base}/ofertas/${slug}/`;
}

function urlFoto(imagen, base = BASE_WEB) {
  return imagen ? `${base}${imagen}` : '';
}

// Texto del post para el canal. Telegram limita el pie de una foto a 1024 caracteres.
function construirMensaje(oferta, slug, base = BASE_WEB) {
  const titulo = [oferta.emoji, `<b>${escaparHtml(oferta.destino)}</b>`].filter(Boolean).join(' ');
  const esHotel = oferta.tipo === 'hotel';
  const gancho = esHotel ? '🚨🏨 ¡CHOLLAZO! 🏨🚨' : '🚨✈️ ¡CHOLLAZO! ✈️🚨';
  const lineas = [gancho, '', oferta.subtitulo ? `${titulo} — ${escaparHtml(oferta.subtitulo)}` : titulo, ''];

  // En vuelos, `salida` es la ciudad de origen y no se pone en el post; en hoteles es el nombre del hotel.
  let opciones = oferta.opciones || [];
  // Sin la ciudad, varias salidas con las mismas fechas serían líneas idénticas, y listar todas las fechas alarga el post:
  // en vuelos se deja solo la opción más barata (el resto está en la web).
  if (oferta.tipo !== 'hotel' && opciones.length) {
    opciones = [masBarata(opciones) || opciones[0]];
  }

  for (const op of opciones) {
    const partes = [
      esHotel && op.salida ? `🏨 ${escaparHtml(op.salida)}` : '',
      op.fecha ? `📅 ${escaparHtml(op.fecha)}` : '',
      op.precio ? `💰 ${escaparHtml(op.precio)}` : ''
    ].filter(Boolean);
    lineas.push(partes.join(' · '));
    // La nota se omite si ya está dicha en el subtítulo (p. ej. «Vuelo directo + 2 noches de hotel»).
    const subtitulo = (oferta.subtitulo || '').toLowerCase();
    if (op.nota && !subtitulo.includes(op.nota.toLowerCase())) lineas.push(`✨ ${escaparHtml(op.nota)}`);
  }

  if (oferta.precio_verificado) {
    lineas.push('', `✅ Precio comprobado el ${escaparHtml(oferta.precio_verificado)}.`);
  }
  // En la web los vuelos traen el buscador de Skyscanner (otras fechas y otros orígenes) y los hoteles, botones de otras fechas.
  if (!esHotel) lineas.push('', '🔎 En la web tienes más fechas y orígenes para buscar');
  else if ((oferta.otras_fechas || []).length) lineas.push('', '🔎 En la web tienes más fechas para este hotel');
  lineas.push('', '🧳 ¡Corre, que estos precios vuelan! 🛫', '', `👉 Ver la oferta: ${urlOferta(slug, base)}`);

  return lineas.join('\n');
}

module.exports = { BASE_WEB, escaparHtml, urlOferta, urlFoto, construirMensaje };
