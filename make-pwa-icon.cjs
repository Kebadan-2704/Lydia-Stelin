const sharp = require('sharp');
const size = 512;

sharp('public/images/couple.jpeg')
  .resize(size, size, { position: 'top', fit: 'cover' })
  .png()
  .toFile('public/images/pwa-icon.png')
  .then(() => console.log('Solid PWA Icon generated!'))
  .catch(err => console.error(err));
