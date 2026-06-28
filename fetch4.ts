import fs from 'fs';
async function run() {
  const res = await fetch('https://go.qwiklabs.com/arcade');
  const text = await res.text();
  fs.writeFileSync('arcade.html', text);
}
run();
