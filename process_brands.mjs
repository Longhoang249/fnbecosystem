import fs from 'fs';
import path from 'path';

const mdContent = fs.readFileSync('Thương Hiệu.md', 'utf-8');

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

const exhibitors = [];
const lines = mdContent.split('\n');

for (const line of lines) {
  if (!line.trim().startsWith('|')) continue;
  if (line.includes('Tên Thương Hiệu')) continue;
  if (line.includes(':----')) continue;

  const parts = line.split('|').map(s => s.trim());
  if (parts.length >= 4) {
    const name = parts[1];
    let desc = parts[2].replace(/\*\*/g, '').replace(/\\/g, ''); // basic cleanup
    const imgPart = parts[3];

    if (!name) continue;

    let imagePath = '';
    const imgMatch = imgPart.match(/!\[\]\[image(\d+)\]/);
    if (imgMatch) {
      const imageKey = `image${imgMatch[1]}`;
      if (imageMap[imageKey]) {
        // Sanitize name for filename
        const safeName = name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
        const filename = `${safeName}.${imageMap[imageKey].ext}`;
        const fullPath = path.join('client', 'public', filename);
        
        try {
          fs.writeFileSync(fullPath, Buffer.from(imageMap[imageKey].data, 'base64'));
          imagePath = `/${filename}`;
        } catch (e) {
          console.error("Failed to write image for", name, e);
        }
      }
    } else if (name.toLowerCase() === "nobita food") {
      imagePath = "https://placehold.co/600x400/1B4332/D4A853?text=NOBITA+FOOD";
      desc = "Nhà cung cấp nguyên liệu và giải pháp kinh doanh cho ngành đồ uống.";
    }

    exhibitors.push({
      name,
      description: desc,
      products: [],
      image: imagePath || "https://placehold.co/600x400/1B4332/D4A853?text=" + encodeURIComponent(name)
    });
  }
}

const outPath = 'parsed_exhibitors.json';
fs.writeFileSync(outPath, JSON.stringify(exhibitors, null, 2));
console.log(`Successfully parsed ${exhibitors.length} brands and saved to ${outPath}`);
