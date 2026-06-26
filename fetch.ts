import fs from 'fs';

async function main() {
  try {
    const res = await fetch('https://go.cloudskillsboost.google/arcade');
    const text = await res.text();
    fs.writeFileSync('output.html', text);
    console.log('Success');
  } catch (err) {
    console.error(err);
  }
}

main();
