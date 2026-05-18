import fs from 'fs';
import path from 'path';

const cssPath = path.resolve('src/index.css');

try {
  let content = fs.readFileSync(cssPath, 'utf8');

  // Let's replace the light color overrides for the gallery section so they fall back to the default dark wine theme
  content = content.replace(/\.gallery-section\s*\.section-label\s*\{\s*color:\s*var\(--champagne\)\s*\}/g, '');
  content = content.replace(/\.gallery-section\s*\.section-title\s*\{\s*color:\s*var\(--champagne-light\)\s*\}/g, '');

  fs.writeFileSync(cssPath, content, 'utf8');
  console.log('Successfully removed gallery-section color overrides from index.css');
} catch (err) {
  console.error('Error styling CSS:', err);
}
