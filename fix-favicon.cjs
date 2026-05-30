const sharp = require('sharp');
const size = 256;
const circleSvg = `<svg width="${size}" height="${size}"><circle cx="${size/2}" cy="${size/2}" r="${size/2}" /></svg>`;

sharp('public/images/couple.jpeg')
  .extend({ top: 100, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .resize(size, size, { position: 'top', fit: 'cover' })
  .composite([{ input: Buffer.from(circleSvg), blend: 'dest-in' }])
  .png()
  .toFile('public/images/favicon-circle.png')
  .then(() => console.log('Favicon updated from JPEG!'))
  .catch(err => console.error(err));
