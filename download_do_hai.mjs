import fs from 'fs';
fetch('https://ibb.co/sdM0Zdgf')
  .then(r => r.text())
  .then(html => {
    const match = html.match(/<meta property="og:image"\s+content="([^"]+)"/i);
    if (match) {
      const imgUrl = match[1];
      console.log('Found image URL:', imgUrl);
      return fetch(imgUrl)
        .then(res => res.arrayBuffer())
        .then(buffer => {
          fs.writeFileSync('client/public/do_hai.jpg', Buffer.from(buffer));
          console.log('Saved to client/public/do_hai.jpg');
        });
    } else {
      console.log('Image URL not found');
    }
  })
  .catch(err => console.error(err));
