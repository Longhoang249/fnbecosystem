const https = require('https');
const fs = require('fs');

const fileId = '1VsO_XyBfLUn5yNZGVQV-oivdiSJPVkTY';
const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
const dest = 'client/public/ipos.jpg';

function downloadFile(url, dest) {
    https.get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303) {
            return downloadFile(res.headers.location, dest);
        }
        
        console.log('Status:', res.statusCode);
        
        const contentType = res.headers['content-type'] || '';
        if (contentType.includes('text/html')) {
            console.log('Error: Received HTML instead of an image. The file might be private or require a virus scan confirmation.');
        }
        
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log('Download completed');
        });
    }).on('error', (err) => {
        console.error('Error:', err.message);
    });
}

downloadFile(url, dest);
