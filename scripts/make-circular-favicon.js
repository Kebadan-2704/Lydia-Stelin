import fs from 'fs';
import path from 'path';

const couplePngPath = path.resolve('public/images/couple.png');
const outputSvgPath = path.resolve('public/favicon-circle.svg');

try {
  if (!fs.existsSync(couplePngPath)) {
    console.error('Error: public/images/couple.png not found!');
    process.exit(1);
  }

  const base64Data = fs.readFileSync(couplePngPath).toString('base64');
  
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <clipPath id="circleView">
      <circle cx="50" cy="50" r="48" />
    </clipPath>
  </defs>
  <!-- Background circle for a white border/frame if wanted, currently white -->
  <circle cx="50" cy="50" r="49" fill="#ffffff" stroke="#d4a574" stroke-width="2" />
  <image href="data:image/png;base64,${base64Data}" width="100" height="100" clip-path="url(#circleView)" preserveAspectRatio="xMidYMid slice" />
</svg>`;

  fs.writeFileSync(outputSvgPath, svgContent, 'utf8');
  console.log('Successfully created circular SVG favicon at public/favicon-circle.svg');
} catch (err) {
  console.error('Error generating circular favicon:', err);
  process.exit(1);
}
