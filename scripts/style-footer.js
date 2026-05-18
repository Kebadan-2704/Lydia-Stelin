import fs from 'fs';
import path from 'path';

const cssPath = path.resolve('src/index.css');

try {
  let content = fs.readFileSync(cssPath, 'utf8');

  const target = `.wedding-footer{background:var(--wine-deep);text-align:center;border-top:1px solid #d4a57426;padding:60px 20px}`;
  const replacement = `.wedding-footer{background:var(--wine-deep);text-align:center;border-top:1px solid #d4a57426;padding:60px 20px;position:relative;overflow:hidden}.wedding-footer:before{content:"";opacity:.04;background:url(/images/floral-pattern.png) 50%/400px;position:absolute;inset:0;pointer-events:none}`;

  if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(cssPath, content, 'utf8');
    console.log('Successfully added the floral pattern background overlay to the wedding footer!');
  } else {
    console.error('Error: Target footer CSS block not found!');
  }
} catch (err) {
  console.error('Error styling CSS:', err);
}
