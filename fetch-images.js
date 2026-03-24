const fs = require('fs');
const urls = [
  'https://ibb.co/wZNVCVdF',
  'https://ibb.co/DmgPpDg',
  'https://ibb.co/nMmv7kQd'
];
Promise.all(urls.map(u => fetch(u).then(r => r.text()))).then(texts => {
  const result = texts.map((text, i) => {
    const match = text.match(/<meta property="og:image"\s+content="([^"]+)"/i);
    return urls[i] + ' -> ' + (match ? match[1] : 'not found');
  });
  fs.writeFileSync('img-links.txt', result.join('\n'));
});
