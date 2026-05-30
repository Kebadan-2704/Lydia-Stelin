const sharp = require('sharp');
const size = 256;
const circleSvg = `<svg width="${size}" height="${size}"><circle cx="${size/2}" cy="${size/2}" r="${size/2}" /></svg>`;

sharp('public/images/couple.jpeg')
  // Removed the 'extend' padding because the new JPEG already has plenty of space above the heads
  .resize(size, size, { position: 'top', fit: 'cover' })
  .composite([{ input: Buffer.from(circleSvg), blend: 'dest-in' }])
  .png()
  .toFile('public/images/favicon-circle.png')
  .then(() => console.log('Favicon updated!'))
  .catch(err => console.error(err));
