import fs from 'fs';
async function run() {
  try {
    const res = await fetch('https://arcadepointscalci.in/assets/index-y3S7FDvE.js');
    const text = await res.text();
    fs.writeFileSync('bundle.js', text);
  } catch (e) { console.error(e.message); }
}
run();
