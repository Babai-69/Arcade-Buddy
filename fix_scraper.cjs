const fs = require('fs');

let code = fs.readFileSync('server.ts', 'utf8');

const regex = /else if \(link\.includes\('7396'\) \|\| img\.includes\('trail'\)\) {/g;

const replacement = `else if (link.includes('7426') || link.includes('retrail')) {
               title = "Arcade Re-Trail";
               finalImg = "https://cdn.qwiklabs.com/eEC4APNIAxpy40bcPc0lLR5bM4amNO3Zl%2Fcw73e%2B7LQ%3D";
           } else if (link.includes('7396') || img.includes('trail')) {`;

code = code.replace(regex, replacement);
fs.writeFileSync('server.ts', code, 'utf8');
