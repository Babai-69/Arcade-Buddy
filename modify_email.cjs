const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');
content = content.replace('to: smtpUser, // Send to the admin', 'to: [smtpUser, userEmail].filter(Boolean).join(", "),');
fs.writeFileSync('server.ts', content);
