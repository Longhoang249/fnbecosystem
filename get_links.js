const fs = require('fs');

const urls = [
  'https://ibb.co/dsJqcxj7', // Wazuka
  'https://ibb.co/4gKXLNk5', // Trendy
  'https://ibb.co/8L70XQxd', // iPos
  'https://ibb.co/QF2JjDRr', // Minh Hạnh
  'https://ibb.co/j96YsrrK'  // VBM
];

Promise.all(urls.map(u => fetch(u).then(r=>r.text()).then(html => {
  const m = html.match(/<meta property="og:image"\s+content="([^"]+)"/i);
  return {url: u, img: m ? m[1] : null};
}))).then(r => {
  fs.writeFileSync('temp_links.json', JSON.stringify(r, null, 2));
  console.log("Done");
});
