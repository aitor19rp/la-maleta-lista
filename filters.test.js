const test = require('node:test');
const assert = require('node:assert');
const { slugify, utmLink, clickrefLink, sidLink, civitatisUrl, buscarFechasUrl, buscarAeropuertosUrl, opcionesValidas } = require('./filters.js');

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

test('clickrefLink appends clickref with ? when base has no query string', () => {
  assert.strictEqual(
    clickrefLink('https://www.edreams.es/viajes/praga', 'Praga'),
    'https://www.edreams.es/viajes/praga?clickref=praga'
  );
});

test('clickrefLink appends clickref with & when base already has a query string', () => {
  assert.strictEqual(
    clickrefLink('https://www.edreams.es/viajes/praga?TU_ID_AFILIADO', 'Praga'),
    'https://www.edreams.es/viajes/praga?TU_ID_AFILIADO&clickref=praga'
  );
});

test('clickrefLink returns # when baseUrl is missing', () => {
  assert.strictEqual(clickrefLink('', 'Praga'), '#');
});

test('clickrefLink leaves the URL untouched when it already has a clickref param', () => {
  assert.strictEqual(
    clickrefLink('https://www.awin1.com/cread.php?awinmid=1&clickref=Roma-23-27-enero-2027&ued=x', 'Roma'),
    'https://www.awin1.com/cread.php?awinmid=1&clickref=Roma-23-27-enero-2027&ued=x'
  );
});

test('sidLink appends sid with ? when base has no query string', () => {
  assert.strictEqual(
    sidLink('https://www.booking.com', 'Praga'),
    'https://www.booking.com?sid=praga'
  );
});

test('sidLink appends sid with & when base already has a query string', () => {
  assert.strictEqual(
    sidLink('https://www.booking.com?aid=123', 'Praga'),
    'https://www.booking.com?aid=123&sid=praga'
  );
});

test('sidLink returns # when baseUrl is missing', () => {
  assert.strictEqual(sidLink('', 'Praga'), '#');
});

test('civitatisUrl uses the override when provided', () => {
  assert.strictEqual(civitatisUrl('https://civitatis.com/custom', 'Praga'), 'https://civitatis.com/custom');
});

test('civitatisUrl falls back to a slugified city page when empty', () => {
  assert.strictEqual(civitatisUrl('', 'Praga'), 'https://www.civitatis.com/es/praga/');
});

test('buscarFechasUrl uses the override when provided', () => {
  assert.strictEqual(buscarFechasUrl('https://tuenlace.com/custom', 'Praga'), 'https://tuenlace.com/custom');
});

test('buscarFechasUrl falls back to a tracked eDreams destination search when empty', () => {
  const destinoUrl = encodeURIComponent('https://www.edreams.es/viajes/praga/');
  assert.strictEqual(
    buscarFechasUrl('', 'Praga'),
    `https://www.awin1.com/cread.php?awinmid=10573&awinaffid=1692815&clickref=praga-otras-fechas&ued=${destinoUrl}`
  );
});

test('buscarAeropuertosUrl uses the override when provided', () => {
  assert.strictEqual(buscarAeropuertosUrl('https://tuenlace.com/custom', 'Praga'), 'https://tuenlace.com/custom');
});

test('buscarAeropuertosUrl falls back to a tracked eDreams destination search when empty', () => {
  const destinoUrl = encodeURIComponent('https://www.edreams.es/viajes/praga/');
  assert.strictEqual(
    buscarAeropuertosUrl('', 'Praga'),
    `https://www.awin1.com/cread.php?awinmid=10573&awinaffid=1692815&clickref=praga-otros-aeropuertos&ued=${destinoUrl}`
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
