const fs = require('fs');
const html = fs.readFileSync('roadmap.html', 'utf8');
console.log(html.substring(0, 500));
