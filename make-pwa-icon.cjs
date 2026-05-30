const sharp = require('sharp');
const size = 512;

sharp('public/images/couple.jpeg')
  .extend({ top: 200, background: { r: 253, g: 251, b: 247, alpha: 1 } }) // #FDFBF7 background padding
  .resize(size, size, { position: 'top', fit: 'cover' })
  .png()
  .toFile('public/images/pwa-icon.png')
  .then(() => console.log('Solid PWA Icon generated!'))
  .catch(err => console.error(err));
