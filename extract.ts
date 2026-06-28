import fs from 'fs';
const text = fs.readFileSync('bundle.js', 'utf-8');
const urls = text.match(/https:\/\/[^"']+/g);
if (urls) {
  const uniqueUrls = [...new Set(urls)].filter(u => u.includes('api') || u.includes('spots') || u.includes('calci') || u.includes('google'));
  console.log(uniqueUrls.join('\n'));
}
