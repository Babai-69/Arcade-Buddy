const fs = require('fs');
const content = fs.readFileSync('src/pages/FaqPage.tsx', 'utf8');

const c1 = content.split('const faqsCol1 = [')[1].split('];\nconst faqsCol2 = [')[0];
const c2 = content.split('const faqsCol2 = [')[1].split('];\nexport function FaqPage')[0];

console.log(c1);
console.log('---');
console.log(c2);
