// Publica una oferta en el canal de Telegram.
//   node telegram/publicar.js ofertas/roma-noviembre.md            -> solo muestra el mensaje
//   node telegram/publicar.js ofertas/roma-noviembre.md --enviar   -> lo envía al canal
const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');
const { construirMensaje, urlFoto } = require('./mensaje.js');

function leerEnv(ruta) {
  if (!fs.existsSync(ruta)) return {};
  const env = {};
  for (const linea of fs.readFileSync(ruta, 'utf8').split(/\r?\n/)) {
    const m = linea.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
    if (m && !linea.trim().startsWith('#')) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return env;
}

async function llamar(token, metodo, cuerpo) {
  const respuesta = await fetch(`https://api.telegram.org/bot${token}/${metodo}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo)
  });
  const datos = await respuesta.json();
  if (!datos.ok) throw new Error(`Telegram respondió: ${datos.description || respuesta.status}`);
  return datos;
}

async function main() {
  const [archivo, ...banderas] = process.argv.slice(2);
  if (!archivo) {
    console.error('Uso: node telegram/publicar.js ofertas/<oferta>.md [--enviar]');
    process.exit(1);
  }

  const slug = path.basename(archivo, '.md');
  const oferta = matter(fs.readFileSync(archivo, 'utf8')).data;
  const texto = construirMensaje(oferta, slug);
  const foto = urlFoto(oferta.imagen_cabecera);

  console.log('--- Vista previa del post ---');
  console.log(texto);
  console.log(foto ? `\nFoto: ${foto}` : '\n(sin foto)');
  console.log(`\nPágina de la oferta: ${texto.match(/https:\/\/\S+$/)[0]}`);

  if (!banderas.includes('--enviar')) {
    console.log('\nNo se ha enviado nada. Añade --enviar para publicarlo en el canal.');
    return;
  }

  const env = { ...leerEnv(path.join(__dirname, '..', '.env')), ...process.env };
  const token = env.TELEGRAM_BOT_TOKEN;
  const canal = env.TELEGRAM_CHAT_ID;
  if (!token || !canal) {
    console.error('Faltan TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID en el archivo .env');
    process.exit(1);
  }

  if (foto) {
    await llamar(token, 'sendPhoto', { chat_id: canal, photo: foto, caption: texto, parse_mode: 'HTML' });
  } else {
    await llamar(token, 'sendMessage', { chat_id: canal, text: texto, parse_mode: 'HTML', disable_web_page_preview: false });
  }
  console.log('\nPublicado en el canal.');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
