const fs = require('fs');
let serverTs = fs.readFileSync('server.ts', 'utf8');

serverTs = serverTs.replace(/import dotenv from 'dotenv';/, "import dotenv from 'dotenv';\ndotenv.config();");
fs.writeFileSync('server.ts', serverTs);
