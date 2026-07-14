const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const regex = /id: titleLower,\n\s*title: title,\n\s*earnedDate: earnedDate,\n\s*category: category,\n\s*points: points,\n\s*validForProgram/g;

const replacement = `id: titleLower,
          title: title,
          earnedDate: earnedDate,
          category: category,
          points: points,
          validForProgram,
          _debugCleanDate: cleanDateStr,
          _debugParsedDate: parsedDate ? parsedDate.toISOString() : null,
          _debugStartDate: START_DATE ? START_DATE.toISOString() : null
`;

content = content.replace(regex, replacement);
fs.writeFileSync('server.ts', content);
