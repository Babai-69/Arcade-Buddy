const fs = require('fs');

const file1 = 'server.ts';
let content1 = fs.readFileSync(file1, 'utf8');

const regex1 = /let parsedDate = new Date\(cleanDateStr\);/g;

const replacement1 = `let parsedDate = new Date(cleanDateStr + " UTC");`;

content1 = content1.replace(regex1, replacement1);
fs.writeFileSync(file1, content1);
