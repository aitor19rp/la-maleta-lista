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

test('en vuelos no se pone la ciudad de salida; en hoteles sí el nombre del hotel', () => {
  const vuelo = { ...oferta, tipo: 'vuelo', opciones: [{ salida: 'Barcelona', fecha: '28-30 noviembre', precio: 'Desde 121€/persona' }] };
  assert.doesNotMatch(construirMensaje(vuelo, 'sofia'), /Barcelona/);
  assert.match(construirMensaje({ ...oferta, tipo: 'hotel' }, 'roma'), /🏨 Hotel Fontana · 📅 22-23 noviembre/);
});

test('en vuelos con varias salidas y las mismas fechas, el post deja solo la más barata', () => {
  const vuelo = {
    ...oferta,
    tipo: 'vuelo',
    opciones: [
      { salida: 'Madrid', fecha: '16-18 enero', precio: 'Desde 165€/persona' },
      { salida: 'Bilbao', fecha: '16-18 enero', precio: 'Desde 181€/persona' }
    ]
  };
  const texto = construirMensaje(vuelo, 'roma');
  assert.match(texto, /📅 16-18 enero · 💰 Desde 165€\/persona/);
  assert.doesNotMatch(texto, /181/);
  assert.doesNotMatch(texto, /Madrid|Bilbao/);
});

test('el post es más divertido: gancho con emojis y cierre animado, y el enlace sigue al final', () => {
  const texto = construirMensaje({ ...oferta, tipo: 'vuelo' }, 'roma');
  assert.match(texto, /^🚨✈️ ¡CHOLLAZO!/);
  assert.match(texto, /📅 22-23 noviembre/);
  assert.match(texto, /✅ Precio comprobado/);
  assert.match(texto, /🧳 ¡Corre/);
  assert.match(texto, /👉 Ver la oferta: https:\/\/\S+$/);
});

test('la nota no se repite si ya está en el subtítulo, y sí se pone si aporta algo', () => {
  const repetida = { ...oferta, tipo: 'vuelo', subtitulo: 'Vuelo directo + 2 noches de hotel', opciones: [{ salida: 'Madrid', fecha: '16-18 enero', precio: 'Desde 165€/persona', nota: 'Vuelo directo + 2 noches de hotel' }] };
  assert.doesNotMatch(construirMensaje(repetida, 'roma'), /✨/);
  assert.match(construirMensaje(oferta, 'roma'), /✨ 1 noche con desayuno/);
});

test('avisa de que en la web hay más fechas y orígenes (vuelos) o más fechas (hoteles con otras_fechas)', () => {
  assert.match(construirMensaje({ ...oferta, tipo: 'vuelo' }, 'roma'), /🔎 En la web tienes más fechas y orígenes/);
  assert.doesNotMatch(construirMensaje({ ...oferta, tipo: 'hotel' }, 'roma'), /🔎/);
  const conFechas = construirMensaje({ ...oferta, tipo: 'hotel', otras_fechas: [{ desde: '2026-12-01', hasta: '2026-12-02' }] }, 'roma');
  assert.match(conFechas, /🔎 En la web tienes más fechas para este hotel/);
  assert.doesNotMatch(conFechas, /orígenes/);
});
