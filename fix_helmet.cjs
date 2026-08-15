const fs = require('fs');

let serverCode = fs.readFileSync('server.ts', 'utf8');

const oldHelmet = `  app.use(helmet({
    contentSecurityPolicy: false, // disabled for Vite to work properly in dev
  }));`;

const newHelmet = `  app.use(helmet({
    contentSecurityPolicy: false, // disabled for Vite to work properly in dev
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
    crossOriginEmbedderPolicy: false
  }));`;

serverCode = serverCode.replace(oldHelmet, newHelmet);
fs.writeFileSync('server.ts', serverCode, 'utf8');

