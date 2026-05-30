const sharp = require('sharp');
const size = 256;
const circleSvg = `<svg width="${size}" height="${size}"><circle cx="${size/2}" cy="${size/2}" r="${size/2}" /></svg>`;
sharp('public/images/couple.png')
  .resize(size, size, { position: 'top' })
  .composite([{ input: Buffer.from(circleSvg), blend: 'dest-in' }])
  .png()
  .toFile('public/images/favicon-circle.png')
  .then(() => console.log('Done'))
  .catch(err => console.error(err));
