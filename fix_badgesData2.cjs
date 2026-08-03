const fs = require('fs');
let code = fs.readFileSync('src/data/badgesData.ts', 'utf-8');

code = code.replace(/"name": "Arcade Base Camp Aug 2026"/g, '"name": "Arcade Base Camp"');
code = code.replace(/"name": "Arcade Trail Aug 2026"/g, '"name": "Arcade Trail"');
code = code.replace(/"name": "Arcade Adventure Aug 2026"/g, '"name": "Arcade Adventure"');
code = code.replace(/"name": "Arcade Voyage Aug 2026"/g, '"name": "Arcade Voyage"');

fs.writeFileSync('src/data/badgesData.ts', code);
console.log("Success");
