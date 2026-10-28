// Texto de una oferta para pegar a mano en la comunidad de WhatsApp (WhatsApp no tiene API para publicar).
//   node telegram/whatsapp.js ofertas/roma-noviembre.md            -> lo muestra
//   node telegram/whatsapp.js ofertas/roma-noviembre.md --copiar   -> lo muestra y lo copia al portapapeles (Windows)
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const matter = require('gray-matter');
const { construirMensaje } = require('./mensaje.js');

// Mismo mensaje que Telegram, con el formato de WhatsApp: negrita con *…* y sin entidades HTML.
function mensajeWhatsapp(oferta, slug) {
  return construirMensaje(oferta, slug)
    .replace(/<b>(.*?)<\/b>/g, '*$1*')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function main() {
  const [archivo, ...banderas] = process.argv.slice(2);
  if (!archivo) {
    console.error('Uso: node telegram/whatsapp.js ofertas/<oferta>.md [--copiar]');
    process.exit(1);
  }
  const slug = path.basename(archivo, '.md');
  const oferta = matter(fs.readFileSync(archivo, 'utf8')).data;
  const texto = mensajeWhatsapp(oferta, slug);
  console.log(texto);
  if (banderas.includes('--copiar')) {
    const r = spawnSync('clip', { input: texto, encoding: 'utf8', shell: true });
    console.log(r.status === 0 ? '\n(Copiado al portapapeles)' : '\n(No se pudo copiar al portapapeles)');
  }
}

if (require.main === module) main();

module.exports = { mensajeWhatsapp };
