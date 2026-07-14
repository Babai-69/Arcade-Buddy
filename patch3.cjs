const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const regex = /let parsedDate = new Date\(cleanDateStr \+ " UTC"\);[\s\S]*?if \(!isNaN\(parsedDate\.getTime\(\)\)\) {/g;

const replacement = `let parsedDate = new Date(cleanDateStr + " UTC");
          if (!isNaN(parsedDate.getTime())) {
            console.log("title", title, "cleanDateStr", cleanDateStr, "parsedDate", parsedDate.toISOString(), "START_DATE", START_DATE.toISOString(), "parsedDate < START_DATE", parsedDate < START_DATE);
`;

content = content.replace(regex, replacement);
fs.writeFileSync('server.ts', content);
