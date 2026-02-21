const https = require('https');
const fs = require('fs');
const file = 'src/services/mockData.ts';

let data = fs.readFileSync(file, 'utf8');
const urlRegex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?[^']+/g;
const urls = [...new Set(data.match(urlRegex))];

console.log(`Found ${urls.length} unique URLs. Testing...`);

async function testUrl(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            resolve({ url, status: res.statusCode });
            res.resume();
        }).on('error', (e) => {
            resolve({ url, status: 500 });
        });
    });
}

async function main() {
    const results = await Promise.all(urls.map(testUrl));
    const badUrls = results.filter(r => r.status !== 200 && r.status !== 302);

    if (badUrls.length > 0) {
        console.log('Bad URLs found:');
        badUrls.forEach(b => console.log(b.url, b.status));
    } else {
        console.log('All URLs are good!');
    }
}
main();
