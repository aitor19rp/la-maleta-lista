const test = require('node:test');
const assert = require('node:assert');
const { construirMensaje, urlOferta, urlFoto, escaparHtml } = require('./mensaje.js');

const oferta = {
  destino: 'Roma',
  emoji: '⛲',
  subtitulo: 'Hotel Fontana',
  imagen_cabecera: '/img/roma-trevi-hero.jpg',
  opciones: [
    { salida: 'Hotel Fontana', fecha: '22-23 noviembre', precio: 'Desde 91€/persona', nota: '1 noche con desayuno' }
  ],
  precio_verificado: '9 de septiembre de 2026'
};

test('el mensaje incluye destino, precio, fecha de comprobación y enlace a la web', () => {
  const texto = construirMensaje(oferta, 'roma-noviembre');
  assert.match(texto, /<b>Roma<\/b> — Hotel Fontana/);
  assert.match(texto, /Desde 91€\/persona/);
  assert.match(texto, /Precio comprobado el 9 de septiembre de 2026/);
  assert.match(texto, /https:\/\/la-maleta-lista\.pages\.dev\/ofertas\/roma-noviembre\//);
});

test('el mensaje nunca lleva un enlace de afiliado directo', () => {
  const texto = construirMensaje({ ...oferta, link_afiliado: 'https://tc.tradetracker.net/?x=1' }, 'roma-noviembre');
  assert.doesNotMatch(texto, /tradetracker|awin1|tpo\.lu/);
});

test('escapa los caracteres que rompen el HTML de Telegram', () => {
  assert.strictEqual(escaparHtml('A & B <c>'), 'A &amp; B &lt;c&gt;');
});

test('sin foto devuelve cadena vacía y con foto devuelve la URL completa', () => {
  assert.strictEqual(urlFoto(''), '');
  assert.strictEqual(urlFoto('/img/x.jpg'), 'https://la-maleta-lista.pages.dev/img/x.jpg');
});

test('la URL de la oferta usa el nombre del archivo', () => {
  assert.strictEqual(urlOferta('milan-diciembre'), 'https://la-maleta-lista.pages.dev/ofertas/milan-diciembre/');
});
