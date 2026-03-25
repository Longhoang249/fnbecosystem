import fs from 'fs';
import path from 'path';

const mdContent = fs.readFileSync('logo.md', 'utf-8');

// Ensure logos directory exists
const dir = path.join('client', 'public', 'logos');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Parse base64 images
const imageMap = {};
const imgRegex = /\[image(\d+)\]:\s*<data:image\/([^;]+);base64,([^>]+)>/g;
let match;
while ((match = imgRegex.exec(mdContent)) !== null) {
  imageMap[`image${match[1]}`] = {
    ext: match[2],
    data: match[3]
  };
}

const lines = mdContent.split('\n');
const parsedLogos = {};

for (const line of lines) {
  if (!line.trim().startsWith('|')) continue;
  if (line.includes(':----')) continue;

  const parts = line.split('|').map(s => s.trim());
  if (parts.length >= 3) {
    const name = parts[1];
    const imgPart = parts[2];

    if (!name) continue;

    const imgMatch = imgPart.match(/!\[\]\[image(\d+)\]/);
    if (imgMatch) {
      const imageKey = `image${imgMatch[1]}`;
      if (imageMap[imageKey]) {
        const safeName = name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
        const filename = `${safeName}.${imageMap[imageKey].ext}`;
        const fullPath = path.join(dir, filename);
        
        try {
          fs.writeFileSync(fullPath, Buffer.from(imageMap[imageKey].data, 'base64'));
          parsedLogos[name] = `/logos/${filename}`;
        } catch (e) {
          console.error("Failed to write image for", name, e);
        }
      }
    }
  }
}

fs.writeFileSync('parsed_logos.json', JSON.stringify(parsedLogos, null, 2));
console.log(`Successfully parsed ${Object.keys(parsedLogos).length} logos.`);
