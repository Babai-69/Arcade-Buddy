const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

code = code.replace(
  'titleLower.includes("monthly game") ||',
  'titleLower.includes("monthly game") ||\n          titleLower.includes("simulator") ||\n          titleLower.includes("spans and plans") ||'
);

fs.writeFileSync('server.ts', code);
console.log("Success");
