const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// Replace fetch(url) with fetch(url, { signal: AbortSignal.timeout(15000) }) 
// to ensure it fails gracefully if still timing out.

code = code.replace('const response = await fetch(url);', 'const response = await fetch(url, { signal: AbortSignal.timeout(20000) });');

fs.writeFileSync('server.ts', code, 'utf8');
console.log("Added timeout");
