const fs = require('fs');
let serverTs = fs.readFileSync('server.ts', 'utf8');

const regex = /history: \(history \|\| \[\]\)\.slice\(-10\)\.map\(\(msg: any\) => \(\{\s*role: msg\.role === 'user' \? 'user' : 'model',\s*parts: \[\{ text: msg\.content \}\],\s*\}\)\),/s;

const replacement = `history: (() => {
          let formatted = [];
          for (const msg of history || []) {
            const role = msg.role === 'user' ? 'user' : 'model';
            const parts = [{ text: msg.content || " " }];
            if (formatted.length === 0) {
              if (role === 'user') formatted.push({ role, parts });
            } else if (formatted[formatted.length - 1].role !== role) {
              formatted.push({ role, parts });
            } else {
              formatted[formatted.length - 1].parts[0].text += "\\n" + parts[0].text;
            }
          }
          return formatted;
        })(),`;

if (regex.test(serverTs)) {
  serverTs = serverTs.replace(regex, replacement);
  fs.writeFileSync('server.ts', serverTs);
  console.log("Fixed history format in server.ts");
} else {
  console.log("Could not find history regex in server.ts");
}
