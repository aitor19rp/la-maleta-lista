const BASE_WEB = 'https://la-maleta-lista.pages.dev';

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
  const lineas = [oferta.subtitulo ? `${titulo} — ${escaparHtml(oferta.subtitulo)}` : titulo, ''];

  for (const op of oferta.opciones || []) {
    const partes = [op.salida, op.fecha, op.precio].filter(Boolean).map(escaparHtml);
    lineas.push(`• ${partes.join(' · ')}`);
    if (op.nota) lineas.push(`   ${escaparHtml(op.nota)}`);
  }

  if (oferta.precio_verificado) {
    lineas.push('', `Precio comprobado el ${escaparHtml(oferta.precio_verificado)}.`);
  }
  lineas.push('', `Ver la oferta: ${urlOferta(slug, base)}`);

  return lineas.join('\n');
}

module.exports = { BASE_WEB, escaparHtml, urlOferta, urlFoto, construirMensaje };
