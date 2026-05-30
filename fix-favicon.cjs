const sharp = require('sharp');
const size = 256;
const circleSvg = `<svg width="${size}" height="${size}"><circle cx="${size/2}" cy="${size/2}" r="${size/2}" /></svg>`;

// The original image is 473x845.
// If we add 100px transparent padding to the top before cropping,
// it will push their heads down away from the top edge,
// preventing the circular mask from cutting off their heads.
sharp('public/images/couple.png')
  .extend({ top: 100, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .resize(size, size, { position: 'top', fit: 'cover' })
  .composite([{ input: Buffer.from(circleSvg), blend: 'dest-in' }])
  .png()
  .toFile('public/favicon-circle.png')
  .then(() => console.log('Favicon updated!'));
