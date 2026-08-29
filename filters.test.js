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
