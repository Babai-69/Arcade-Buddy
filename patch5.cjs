const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

content = content.replace(/let validForProgram = true;/g, `let validForProgram = true;\n        let cleanDateStr = "";\n        let parsedDate = null;`);
content = content.replace(/let cleanDateStr = dateText/g, `cleanDateStr = dateText`);
content = content.replace(/let parsedDate = new Date/g, `parsedDate = new Date`);

fs.writeFileSync('server.ts', content);
