import fs from 'fs';
const urls = ['https://ibb.co/dsJqcxj7','https://ibb.co/4gKXLNk5','https://ibb.co/8L70XQxd','https://ibb.co/QF2JjDRr','https://ibb.co/j96YsrrK'];
Promise.all(urls.map(u => fetch(u).then(r=>r.text()).then(html => {
  const m = html.match(/<meta property="og:image"\s+content="([^"]+)"/i);
  return {url: u, img: m ? m[1] : null};
}))).then(console.log);
