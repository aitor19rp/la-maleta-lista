const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Cloudflare Pages deja style.css en caché 4 horas: sin esto, un móvil puede mezclar el HTML nuevo con el CSS viejo.
module.exports = crypto
  .createHash('md5')
  .update(fs.readFileSync(path.join(__dirname, '..', 'style.css')))
  .digest('hex')
  .slice(0, 8);
