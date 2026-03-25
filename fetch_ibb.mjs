import fs from 'fs';
fetch('https://ibb.co/gMQ2KkKF').then(r=>r.text()).then(html=>{
  const m=html.match(/<meta property="og:image"\s+content="([^"]+)"/i);
  if(m) console.log('IMG_URL:',m[1]);
});
