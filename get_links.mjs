import fs from 'fs';

const urls = [
  'https://ibb.co/zWgLq2F5', // NLPC
  'https://ibb.co/4gKXLNk5'  // Trendy
];

Promise.all(urls.map(u => fetch(u).then(r=>r.text()).then(html => {
  const m = html.match(/<meta property="og:image"\s+content="([^"]+)"/i);
  return {url: u, img: m ? m[1] : null};
}))).then(r => {
  fs.writeFileSync('temp_links.json', JSON.stringify(r, null, 2));
  console.log("Done");
});
